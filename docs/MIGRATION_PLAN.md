# MIGRATION_PLAN — Next.js 14 → TanStack Start

Source conversation context: current `drf-web/` was a Next.js 14 App Router app with `next-intl`, NextAuth, RTK Query (mutex-guarded refresh), Tailwind + Panda + shadcn, Zod + react-hook-form, `next-safe-action` server actions, locale-prefixed routes (`app/[locale]/auth/*`, `app/[locale]/(protected)/*`), static export build, leftover `basePath: "/ynex-js/preview"` from a template.

> **Status as of 2026-05-20**: Migration is **complete**. `drf-web/` now contains the TanStack Start app (committed as `f8c4c618`). The `drf-web-tanstack/` sibling directory is the source of truth until Phase 7 cleanup is done.

## Key decisions locked in

1. **Auth replacement for NextAuth** → **Better Auth** (modern, framework-agnostic, plays well with TanStack Start). Shadow-user pattern with Django JWT bridge.
2. **i18n replacement for next-intl** → **Paraglide JS** (type-safe, tree-shaken, router-agnostic). URL strategy activated server-side via custom `src/server.ts` entry.
3. **Data layer** → **kept RTK Query as-is**. The `baseQueryWithReauth` mutex/refresh logic is non-trivial and unrelated to the router. Migrating to TanStack Query is a separate task.
4. **Migration style** → **side-by-side rewrite** in `drf-web-tanstack/`, cut over by replacing `drf-web/` contents via rsync (preserves 1027-commit git history).
5. **Production output** → TanStack Start with Vite. Static `basePath`/`assetPrefix` template leftovers removed. Multi-stage Dockerfile targeting port 3000.

---

## Phase 0 — Spike ✅ (completed 2026-05-14)

**Goal:** Before committing, prove the riskiest end-to-end slice:
- Scaffold a TanStack Start app: `npm create @tanstack/start@latest`.
- Wire Better Auth + Django JWT: login → store tokens → call protected Django endpoint → 401 → refresh → retry.
- Add one locale-prefixed protected route to validate i18n + auth-guard composition.

**Result: PASS.** Stack is viable. Spike code lives at `drf-web-tanstack/`.

### What was validated end-to-end (via HTTP probes)

- Login page renders at `/en/auth/login` with form (react-hook-form + zod)
- Unauthed access to `/en/dashboard` → 307 → `/en/auth/login` (`beforeLoad` guard on `_authed.tsx` works)
- Better Auth API mount works (`GET /api/auth/ok` → `{ok:true}`)
- Better Auth shadow-user pattern works: `POST /api/auth/sign-up/email` creates a user with `djangoId`/`djangoUuid` custom fields; subsequent `POST /api/auth/sign-in/email` with derived password returns session + cookies
- Cookied request to `/en/dashboard` returns 200
- Custom session fields `djangoAccess`/`djangoRefresh` round-trip through Better Auth's schema

### All 5 verification scenarios confirmed

1. ✅ Happy login — `/en/auth/login` → Django `/auth/token/` → BA session → `/en/dashboard` renders with user info.
2. ✅ Browser refresh while logged in — session persists.
3. ✅ Unauthed `/en/dashboard` → 307 → `/en/auth/login`.
4. ✅ 401 → mutex-guarded refresh. Django logs confirm the full retry chain: `account → 401`, `refresh → 200`, `account → 200`.
5. ✅ Sign-out clears BA cookie; subsequent navigation bounces to login.

### Bugs surfaced during spike

**1. Reactive refresh checks the wrong status code.**
`drf-web/shared/redux/apiSlice.ts:42` checked `result.error.status === 403`, but Django/SimpleJWT returns **401** for expired tokens. Fixed: status check changed to 401.

**1a. Retry after refresh uses the stale access token.**
`getAccessTokenValue()` was captured once at `baseQueryWithReauth` call time. Fix: moved the read **inside** `prepareHeaders` so it reads fresh on every request.

**2. Dual-auth-state desync** — FIXED.
- `signInWithDjango` passes Django tokens to Better Auth via `x-django-access` / `x-django-refresh` custom request headers.
- A `databaseHooks.session.create.before` hook in `src/lib/auth.ts` reads those headers and writes them onto the BA session row.
- `getDjangoTokensFromSession` server fn exposes them back to the client.
- `_authed.tsx` loader fetches the tokens and synchronously rehydrates `localStorage` during render.
- `input: false` on `djangoAccess`/`djangoRefresh` blocks `/api/auth/update-session` from accepting client-supplied values (closes a token-planting escalation hole).

**3. Paraglide URL strategy doesn't activate server-side** — FIXED.
`src/server.ts` created as a custom TanStack Start entry that calls `overwriteGetLocale(...)` reading from `getRequestUrl()` (AsyncLocalStorage-scoped). Avoided `paraglideMiddleware()` because it tries to delocalize the URL, which conflicts with the `$locale` route param.

### Open questions from the spike

- The deterministic-password pattern (`bridge:<djangoUuid>:<BETTER_AUTH_SECRET>`) means rotating `BETTER_AUTH_SECRET` invalidates all shadow users. Acceptable for now; revisit if rotation becomes a real requirement.
- TanStack Start's server-function compiler renames the route file path into the server-fn ID. `.functions.ts` / `.server.ts` are the canonical naming conventions.

---

## Phase 1 — Scaffold ✅ (completed 2026-05-14)

- Created `drf-web-tanstack/` with TanStack Start + Vite.
- Ported `tsconfig.json` paths (`#/*`), ESLint config.
- **Tailwind v4 CSS-first config** in `src/styles.css` — `@theme` block ports drf-web's custom screens, fonts, full color palette (rgb-channel `--primary` palette + shadcn HSL semantic palette), animations, shadows. Light + dark mode tokens.
- `@tailwindcss/forms` installed via `@plugin` directive.
- All 14 shadcn components copied to `src/components/ui/`, imports rewritten from `@/shared/shadcn/lib/utils` → `#/lib/cn`. `cn()` helper at `src/lib/cn.ts`.
- Custom `.dir-ltr` / `.dir-rtl` utilities ported via `@utility`.
- Panda CSS skipped — dead code in drf-web (zero imports).

---

## Phase 2 — Foundations ✅ (completed 2026-05-14)

| Concern | Next.js (was) | TanStack Start (now) |
|---|---|---|
| Routing | `app/[locale]/(protected)/...` | `routes/$locale/_authed/...` |
| Auth guard | `middlewares/authentication-middleware.ts` | `_authed` layout's `beforeLoad` |
| Locale routing | `next-intl` middleware redirect | `$locale` param + Paraglide |
| Session | NextAuth `getToken()` | Better Auth `getServerSession()` |
| Server actions | `actions/` + `next-safe-action` | `createServerFn` |
| API proxy routes | `app/api/auth/[...nextauth]` | Better Auth handler route |
| Refresh token | RTK `baseQueryWithReauth` | **unchanged** (with 401 + fresh-read fixes) |
| Token storage | `utils/functions.ts` | `src/shared/token-storage.ts` (verbatim port) |

Build order: auth → locale routing → protected layout → RTK provider → toast/theme/redux providers.

---

## Phase 3 — Layout & providers ✅ (completed 2026-05-15)

- `src/components/layout/Sidebar.tsx` — collapsible, active-link detection via `useRouterState`, grouped nav with chevron expand/collapse, lucide-react icons. Plain `<a>` tags for dynamic nav paths (TanStack Router `Link` requires statically-typed `to` strings).
- `src/components/layout/Header.tsx` — hamburger toggle, locale switcher, dark-mode toggle, cart badge from Redux, profile dropdown via shadcn DropdownMenu, sign-out.
- `src/components/layout/nav-items.ts` — Dashboard, Products, Users, Cart, Wishlist.
- `_authed.tsx` layout wires collapse state. Provider stack: Redux → Paraglide → root layout.

---

## Phase 4 — Route-by-route migration ✅ (completed 2026-05-15)

### Auth routes (login, register, forgot-password, logout)

- All four routes built with `CForm`/`FormInput`/`FormButton` components + react-hook-form + Zod.
- `register` uses `registerUser` server function (`src/lib/register-server.ts`): posts to Django `/auth/users/create/`, surfaces field-level backend validation errors.
- `forgot-password` posts to Django `/auth/users/forgot-password/` via `useForgotPasswordMutation`.
- `logout` — clears BA cookie + localStorage + bounces to login.
- All buttons show `Loader2` spinner while `isSubmitting`.
- Groups dropdown on register uses `useGetAllGroupsQuery` filtering out ADMIN group.

### Products

- Product search (`/products/search`) — search input, category/brand/size checkbox filters with count badges and "Show all N" expand, client-side sort-by dropdown, responsive card grid, prev/next pagination.
- Product detail (`/products/$uuid`) — ImageGallery (thumbnail strip), StarRating, ProductInfo, CommentsSection, SimilarProductsSection.
- Product create/edit — shared `ProductForm` component with drag-and-drop image upload, Zod v4 schema, `toProductFormData` (builds multipart FormData).

**Django backend fixes** (applied to `drf/products/models.py::fts_search`):
- `__search` → `__icontains` for partial-word matching.
- `self.filter(...)` → `qs.filter(...)` in every branch so filters AND together.
- Trailing `.distinct()` to dedupe M2M `categories__in` joins.

### Users

- User search + detail + create pages.
- Profile picture upload (camera-icon overlay, own profile only).
- Change password card (own profile only).
- Social networks card (full CRUD: list/save-batch/delete-one/delete-all).

### Cart & Wishlist

- Cart: RTK Query, add/remove/clear, quantity controls.
- Wishlist: add/remove, links back to product detail.

---

## Phase 5 — Server functions ✅ (completed 2026-05-14–15)

`next-safe-action` server actions replaced with TanStack Start's `createServerFn`:
- `src/lib/register-server.ts` — `registerUser` server fn (Django `/auth/users/create/`)
- `src/lib/django-bridge.ts` — `signInWithDjango` (Django JWT → Better Auth session)
- `src/lib/session-server.ts` — `getServerSession`, `getDjangoTokensFromSession`
- `src/lib/forgot-password-server.ts` — `forgotPassword` server fn

---

## Phase 6 — Cutover ✅ (artifacts complete 2026-05-20)

Docker artifacts:
- `Dockerfile` — multi-stage build (node:22-alpine → node:22-alpine), `npm ci --omit=dev`, runs `node .output/server/index.mjs` on port 3000.
- `docker-compose.yml` — builds and runs the TanStack Start container.
- `vite.config.prod.ts` — production Vite config.
- `.dockerignore` — excludes `node_modules`, `dist`, `.env`, `.git`.

**Content swap** (2026-05-20):
- `drf-web/` cleared (preserving `.git/`), TanStack app rsynced in from `drf-web-tanstack/`.
- Committed as `f8c4c618` — 14,051 files changed. Full 1027-commit git history preserved.

**Remaining human steps:**
1. Run `npm install` in `drf-web/` (node_modules not in git).
2. Manual browser smoke-test: register → login → browse products → add to cart/wishlist → user profile → logout, in both `en` and `gr`.
3. Proxy flip — stop old Next.js container, start new TanStack container. nginx needs no changes.

---

## Phase 7 — Cleanup (deferred post-cutover)

- Delete `drf-web-tanstack/` sibling directory.
- Update root `CLAUDE.md` — describes `drf-web/` as Next.js 14 with NextAuth/next-intl; needs updating to TanStack Start/Better Auth/Paraglide.

---

## Deferred work (post-cutover)

- **Checkout / orders flow** — cart "Checkout" button is dead. Django `orders/` app exists. Design + implement.
- **Logout backend invalidation** — currently client-side only. Django refresh token stays valid until natural expiry. Add a blacklist endpoint and call it from the logout flow.
- **Toast notifications** — `react-toastify` (or sonner) not installed. Wire in for cart add, profile update, etc.
- **`tailwind-clip-path` plugin** — not installed. Verify whether any class is actually used.

---

## Custom form component library (ported 2026-05-15)

`src/components/form/` — `CForm`, `FormLabel`, `FormError`, `FormInput` (with Eye/EyeOff password toggle), `FormTextArea`, `FormSelect` (react-select with CSS-variable theme), `FormButton` (CVA variants, Loader2 spinner), `PasswordStrength`. Barrel export at `src/components/form/index.ts`.

---

## Auth visual parity (fixed 2026-05-20)

Auth pages (login/register/forgot-password) were functional but visually blank. Fixed:
- Added Spruko template CSS classes to `src/styles.css`: `.box`, `.box-body`, `.authentication`, `.authentication-barrier` (OR divider with gradient lines), `.form-check`.
- Fixed `body` background from `--color-defaultbackground` → `--color-bodybg` (`rgb(240 241 247)`).
- Added dark mode body: `rgb(var(--dark-bg))` (`rgb(37 39 41)`).
- Created `src/components/auth/SocialButtons.tsx` with inline SVG Facebook/Google/Twitter icons.
- Register groups dropdown — fixed trailing slash on `groups/` URL (Django `APPEND_SLASH` was causing 301), fixed `AllowedUrls` to use endpoint **name** (`getAllGroups`) not URL string.
