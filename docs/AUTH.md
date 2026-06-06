# Authentication: Django + Better Auth bridge

This app uses **two cooperating auth systems**. Knowing which one does what is the most important thing for debugging.

| System          | Owns                                              | Lives in                                          |
| --------------- | ------------------------------------------------- | ------------------------------------------------- |
| **Django + SimpleJWT** | Real user accounts, business permissions, JWT access/refresh tokens | The `drf` backend (port 8000)                     |
| **Better Auth** | Browser session cookie, route-guard truth         | TanStack Start server + Postgres (`better_auth_*` tables) |
| **TanStack Query** | Authenticated API calls to Django, refresh retries | Browser only                                      |

Django is the source of truth for **who the user is**. Better Auth is the source of truth for **whether this browser is logged in right now**. The two are kept in sync through a shadow-user pattern (see below).

## Architecture at a glance

```
┌────────────┐         ┌──────────────────────────────────┐         ┌────────────┐
│   Browser  │◄────────│    TanStack Start (Node SSR)     │◄────────│   Django   │
│            │  cookie │   - Better Auth handler          │  JWT    │            │
│ localStorage│        │   - signInWithDjango server fn   │  fetch  │  SimpleJWT │
│   access   │         │   - Postgres (better_auth_*)     │         │  (port 8000)│
│   refresh  │         └──────────────────────────────────┘         └────────────┘
│  + BA cookie│
└────────────┘
```

Two persistence layers in the browser:
- **`localStorage.access` + `localStorage.refresh`** — Django JWT tokens, used by RTK Query to call the Django API.
- **`better-auth.session_token` cookie** — set by Better Auth, used by TanStack Router's `beforeLoad` guards to gate protected routes.

## Login flow (the critical path)

```
[Browser]                    [TanStack Start]                  [Django]
   │                                │                              │
   │ Submit form (username,         │                              │
   │  password)                     │                              │
   ├────────────────────────────────►                              │
   │  call signInWithDjango()       │                              │
   │  (TanStack server function)    │                              │
   │                                │ POST /api/auth/token/        │
   │                                ├──────────────────────────────►
   │                                │                              │ Validates creds
   │                                │ ◄────────────────────────────┤ Returns {access, refresh}
   │                                │                              │
   │                                │ GET /api/auth/users/account/ │
   │                                ├──────────────────────────────► (with Bearer)
   │                                │ ◄────────────────────────────┤ Returns user info
   │                                │   (id, uuid, email, username)│
   │                                │                              │
   │                                │ Better Auth signUpEmail()    │
   │                                │ (idempotent — ignores 'user  │
   │                                │  exists' error)              │
   │                                │                              │
   │                                │ Better Auth signInEmail()    │
   │                                │ with derived password        │
   │                                │ → produces Set-Cookie         │
   │                                │                              │
   │ ◄──────────────────────────────┤  Response includes:          │
   │   Set-Cookie: BA session       │  - Set-Cookie header          │
   │   Body: {access, refresh, user}│  - Django tokens in body      │
   │                                │                              │
   │ Client stores tokens in        │                              │
   │ localStorage                   │                              │
   │ Navigate to /en/dashboard      │                              │
```

**Key insight**: the user's real password is sent only to Django. Better Auth gets a **derived password** (`bridge:<djangoUuid>:<BETTER_AUTH_SECRET>`) that's stable for that user. The user never types or sees it.

## Authenticated request flow

After login, the browser has:
- A `better-auth.session_token` cookie (sent automatically with same-origin requests)
- `localStorage.access` and `localStorage.refresh`

```
Page load → TanStack Router beforeLoad on _authed.tsx
  → getServerSession() server fn reads BA cookie, calls auth.api.getSession()
  → if no session: redirect to /$locale/auth/login
  → if session exists: render dashboard

Route loader → ensureQueryData(accountQueryOptions()) (TanStack Query)
  → fetchWithAuth reads localStorage.access
  → GET http://localhost:8000/api/auth/users/account/
    Authorization: Bearer <access>
  → result stored in TanStack Query cache

Dashboard mounts → useQuery(accountQueryOptions())
  → cache hit → data displayed immediately
```

The two auth signals work independently. The BA cookie unlocks the route; the localStorage token unlocks the Django API call.

## Refresh flow (when access token is invalid/expired)

```
fetchWithAuth call → Django returns 401 with code "token_not_valid"
  → fetchWithAuth catches it
  → Acquires mutex (so only one refresh fires even with concurrent requests)
  → POST /api/auth/token/refresh/ with body { refresh }
  → Django returns { access: <new> }
  → Write new access to localStorage via setStorageValue('access', access)
  → Retry the original call → 200 OK
```

If the refresh itself fails (refresh token expired or invalid), the user is effectively logged out — they'll see a 401 until they log in again. There's no automatic bounce-to-login on refresh failure yet; that's a Phase 1 task.

## Sign-out flow

```
Dashboard sign-out button → authClient.signOut()
  → POST /api/auth/sign-out → BA clears its session row + cookie
  → removeLoginResponseFromStorage() → clears localStorage.access/refresh
  → navigate to /$locale/auth/login
```

On sign-out, the frontend POSTs `{ refresh }` to Django's `POST /api/auth/logout/` (with the access token as Bearer) **before** calling `authClient.signOut()`. Django calls `RefreshToken(token).blacklist()`, which writes to the `token_blacklist` tables so that token can never be used again. The BA cookie and `localStorage` are then cleared.

## Key files

| File                                          | Role                                                        |
| --------------------------------------------- | ----------------------------------------------------------- |
| `src/lib/auth.ts`                             | Better Auth server config (Postgres pool, custom fields, secret, `better_auth_*` table names) |
| `src/lib/auth-client.ts`                      | Better Auth client (`authClient.signOut`, `useSession`, …) |
| `src/lib/django-bridge.ts`                    | `signInWithDjango` — the bridge server function             |
| `src/lib/session-server.ts`                   | `getServerSession` — used by route guards                   |
| `src/routes/api/auth/$.ts`                    | Catchall route that mounts Better Auth's HTTP handlers      |
| `src/routes/$locale/_authed.tsx`              | Protected layout. `beforeLoad` checks BA session.           |
| `src/routes/$locale/auth/login.tsx`           | Login form. Calls `signInWithDjango`.                       |
| `src/shared/query/client.ts`                  | `fetchWithAuth` + `fetchPublic`. **Refresh logic lives here.**  |
| `src/shared/token-storage.ts`                 | `localStorage` helpers (`getAccessTokenValue`, …) + `decodeJwtPayload` |
| `.env`                                        | `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `DATABASE_URL`, `DJANGO_BACKEND_URL`, `VITE_BACKEND_URL` |

## Inspecting state when something's broken

**Better Auth's view (server side)**
```bash
# What sessions exist? What shadow users?
PGPASSWORD=drf psql -h 192.168.1.6 -U drf -d drf -c "SELECT id, email, name, \"djangoUuid\" FROM better_auth_user;"
PGPASSWORD=drf psql -h 192.168.1.6 -U drf -d drf -c "SELECT id, \"userId\", \"expiresAt\" FROM better_auth_session;"
```

**Browser cookies**
DevTools → Application → Cookies → http://localhost:3000. Look for `better-auth.session_token`.

**Browser localStorage**
DevTools → Application → Local Storage → http://localhost:3000. Should have `access` and `refresh` (both JSON-stringified — i.e. quoted strings).

**The session as Better Auth sees it from the browser**
```bash
curl http://localhost:3000/api/auth/get-session -b cookies.txt
# Returns {session, user} or null
```

**Django's view of the access token**
```bash
curl -i http://localhost:8000/api/auth/users/account/ \
  -H "Authorization: Bearer <access-token>"
# 200 → token good
# 401 with code "token_not_valid" → expired/invalid
# 401 "Authentication credentials were not provided." → no token sent
```

## Debugging playbook

### "Login button does nothing / form just errors"
1. Open Network tab. Look for the POST to the server function (path includes `_serverFn/...signInWithDjango...`).
2. If it 500s, look at the dev server console — the bridge logs the exception there.
3. Most common cause: Django not running on port 8000. `curl localhost:8000/api/auth/token/` should not connect-refuse.

### "Logged in but dashboard shows {detail: 'Authentication credentials were not provided.'}"
Localstorage tokens are missing AND the BA session's `djangoAccess`/`djangoRefresh` are null. This shouldn't happen in normal flow — `signInWithDjango` populates the BA session via a `databaseHooks.session.create.before` hook (see `src/lib/auth.ts`), and `_authed.tsx`'s loader rehydrates localStorage from the session on every protected page render.

Diagnose:
```bash
PGPASSWORD=drf psql -h 192.168.1.6 -U drf -d drf -c \
  "SELECT \"djangoAccess\" IS NOT NULL, \"djangoRefresh\" IS NOT NULL FROM better_auth_session LIMIT 1;"
```
- `(1,1)` — session has tokens but rehydrate isn't running. Check `_authed.tsx`'s loader runs and `getDjangoTokensFromSession()` returns non-null. The localStorage write happens in `AuthedLayout`'s `useLayoutEffect` (fires after every commit on the authed layout). Also check `isJwtExpiredOrMissing` — if the stored token is still fresh, the write is intentionally skipped.
- `(0,0)` — session was created before the hook was wired (pre-fix sessions). Sign out and back in.
- Hook not firing? Check that the request headers `x-django-access` / `x-django-refresh` make it through `auth.api.signInEmail` (they're set in `src/lib/django-bridge.ts`).

### "Logged in but dashboard shows {detail: 'Given token not valid for any token type'}"
Your access token is invalid/expired. If you ALSO see in Network/Django logs that `/auth/token/refresh/` was called and the retry succeeded, this is just the expected first-frame error and you can ignore it.

If you see NO refresh call:
- Check that `localStorage.refresh` is set. If not, the refresh path is skipped (it requires a refresh token).
- Check the dev console for the fetchWithAuth path. The check is `response.status === 401 && refresh` (`src/shared/query/client.ts`).

If the refresh call fires but the retry STILL fails with 401:
- Check that `getAccessTokenValue()` is read fresh inside `fetchWithAuth` on the retry, not captured before the refresh. (This was a real bug in the original `drf-web` — see `MIGRATION_PLAN.md` finding #1a.)
- Manually inspect `localStorage.access` after the refresh — it should be the new token, not the bad one.

### "Protected route doesn't bounce me to login"
The BA session cookie still exists. Either:
- Sign out properly (clears the cookie)
- Manually delete `better-auth.session_token` from DevTools → Cookies
- Or invalidate the session row in Postgres:
  ```bash
  PGPASSWORD=drf psql -h 192.168.1.6 -U drf -d drf -c "DELETE FROM better_auth_session;"
  ```

### "Profile edit controls / upload button don't appear on my own profile"

The `isMe` check in the user detail page decodes the JWT `user_id` claim from `localStorage.access`. If `decodeJwtPayload` throws (e.g. localStorage is empty or the token is malformed), `isMe` stays `false` and every edit control is hidden.

Diagnose in the browser console:
```js
const raw = JSON.parse(localStorage.getItem('access'))   // should be a JWT string
// Apply decodeJwtPayload logic manually:
const part = raw.split('.')[1]
const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
JSON.parse(atob(padded))   // should show { user_id: <number>, email: ..., exp: ... }
```

If `localStorage.access` is null/undefined, the `_authed.tsx` rehydration didn't run — navigate away and back to a protected route to trigger it, or check that `getDjangoTokensFromSession()` returns non-null.

### "Sign-up failed for a user that should be new"
Better Auth's `signUpEmail` throws when the email already exists. The bridge swallows this error intentionally (idempotency). If this is happening for a brand-new user, check for a leftover row:
```bash
PGPASSWORD=drf psql -h 192.168.1.6 -U drf -d drf -c "SELECT id, email FROM better_auth_user WHERE email = '<email>';"
```

### "After rotating BETTER_AUTH_SECRET, no one can log in"
Expected. The derived password `bridge:<djangoUuid>:<BETTER_AUTH_SECRET>` changes when the secret changes, so existing shadow users have the wrong password row. Options:
- Rotate back
- Delete all rows in `better_auth_user`, `better_auth_session`, `better_auth_account` and let users sign in again to be re-shadowed
- Pin the secret in production and never rotate (acceptable for this pattern)

### "Greek (/gr/...) pages render English"
Server entry (`src/server.ts`) installs an `overwriteGetLocale(...)` resolver that reads the URL from TanStack Start's request context. If this regresses:
- Check `src/server.ts` still has the override
- Check the URL pattern still parses `/gr/` correctly — `Locale` type is generated by Paraglide; if locales change in `project.inlang/settings.json` the override needs the new locale in its check
- Hit `/gr/auth/login` and grep the HTML for `<html lang="gr"` — if missing, the resolver isn't firing

## Why this design (instead of pure Better Auth or pure JWT)?

- **Pure Better Auth**: would need BA to own users. Django already does. Maintaining two user stores would mean syncing user creation, password changes, deactivations, etc. — large surface area for bugs.
- **Pure JWT (no BA)**: works fine for client-side auth, but TanStack Start's SSR layer would need a custom session cookie to know whether to server-render protected routes. Better Auth gives us that cookie + a typed client SDK + a clean sign-out path.
- **The hybrid**: lets each side do what it's good at. Django owns the user lifecycle; BA owns the browser session. The price is the shadow-user pattern and the dual-state coordination — neither is free, both are documented above.

## Token rehydration on every protected-page render

`_authed.tsx`'s `loader` fetches `djangoTokens` from the Better Auth session server-side. `AuthedLayout` writes them to `localStorage` inside a `useLayoutEffect` — but **only** when `localStorage.access` is missing or within 30 seconds of expiry:

```ts
// src/routes/$locale/_authed.tsx
useLayoutEffect(() => {
  if (!djangoTokens) return
  if (isJwtExpiredOrMissing(getAccessTokenValue())) {
    setLoginResponseInStorage(djangoTokens)
  }
}, [djangoTokens])
```

`isJwtExpiredOrMissing` decodes the JWT's `exp` claim via `decodeJwtPayload()` (see below). If the stored token is fresh, the session token is **never written** — ensuring `fetchWithAuth`'s refresh-cycle tokens (which are newer than the BA session snapshot) are not clobbered on navigation.

### `decodeJwtPayload` — why it exists

JWT headers and payloads use **base64url** encoding (RFC 4648 §5): `+` → `-`, `/` → `_`, padding `=` stripped. The browser's `atob()` only understands standard base64. On any real-world payload (this one includes email, username, groups, permissions), the raw bytes almost certainly map to characters that differ between the two encodings, so plain `atob(token.split('.')[1])` throws or silently produces garbage.

`decodeJwtPayload` in `src/shared/token-storage.ts` performs the conversion before calling `atob()`:

```ts
export function decodeJwtPayload(token: string): Record<string, unknown> {
  const part = token.split('.')[1]
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  return JSON.parse(atob(padded))
}
```

**Use this function everywhere you need to read a JWT claim client-side.** Never call `atob(token.split('.')[1])` directly — it will silently fail on production-sized payloads.

## Useful constants and conventions

- Django JWT access lifetime: **2h30m** (`drf/cfehome/settings.py:237`).
- Django JWT refresh tokens are **blacklisted on use** — `CustomTokenRefreshView` calls `refresh.blacklist()` after issuing a new access token, and `POST /api/auth/logout/` blacklists the token on sign-out. Rotating `BETTER_AUTH_SECRET` also requires clearing the `better_auth_*` shadow tables.
- Better Auth session expiry: default 7 days.
- The bridge's derived password format: `bridge:<djangoUuid>:<BETTER_AUTH_SECRET>` — do not change this format without invalidating all shadow users.
- `localStorage` values are **JSON-stringified** (i.e. tokens are stored as `"eyJ..."` with quotes, not raw). The helpers in `src/shared/token-storage.ts` handle this.
