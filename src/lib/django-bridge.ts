import { createServerFn } from '@tanstack/react-start'
import { getRequest, setResponseHeader } from '@tanstack/react-start/server'
import { z } from 'zod'
import { auth } from './auth'

// Server-only env. `DJANGO_BACKEND_URL` must NOT have the `VITE_` prefix.
const DJANGO_URL = process.env.DJANGO_BACKEND_URL ?? 'http://localhost:8000/api/'

const credentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

// Stable, secret-derived password for the shadow Better Auth user. The user
// never sees or types this — it just satisfies Better Auth's email/password
// flow so we can mint a session cookie.
function derivePassword(djangoUuid: string): string {
  const secret = process.env.BETTER_AUTH_SECRET ?? 'dev-only-fallback'
  return `bridge:${djangoUuid}:${secret}`
}

type DjangoTokenResponse = { access: string; refresh: string }
type DjangoAccount = {
  id: number
  uuid: string
  email: string
  username: string
}

export const signInWithDjango = createServerFn({ method: 'POST' })
  .inputValidator(credentialsSchema)
  .handler(async ({ data }) => {
    // 1. Validate creds against Django, capture JWT pair
    const tokenRes = await fetch(`${DJANGO_URL}auth/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!tokenRes.ok) {
      throw new Error('Invalid credentials')
    }
    const tokens = (await tokenRes.json()) as DjangoTokenResponse

    // 2. Fetch the user's account from Django (needed for email + uuid)
    const accountRes = await fetch(`${DJANGO_URL}auth/users/account/`, {
      headers: { Authorization: `Bearer ${tokens.access}` },
    })
    if (!accountRes.ok) {
      throw new Error('Failed to load Django account')
    }
    const dUser = (await accountRes.json()) as DjangoAccount

    // 3. Ensure a shadow user exists in Better Auth's store. Ignore the
    //    "already exists" error path so this stays idempotent.
    const derivedPassword = derivePassword(dUser.uuid)
    try {
      await auth.api.signUpEmail({
        body: {
          email: dUser.email,
          name: dUser.username,
          password: derivedPassword,
        },
      })
    } catch {
      // User exists already — fall through to sign-in below.
    }

    // 4. Sign the shadow user in to mint a Better Auth session cookie.
    //    Pass the Django tokens as custom headers so `databaseHooks.session.create.before`
    //    in auth.ts can persist them onto the session row.
    const incoming = getRequest()
    const headersWithTokens = new Headers(incoming.headers)
    headersWithTokens.set('x-django-access', tokens.access)
    headersWithTokens.set('x-django-refresh', tokens.refresh)
    const signInResponse = await auth.api.signInEmail({
      body: { email: dUser.email, password: derivedPassword },
      headers: headersWithTokens,
      asResponse: true,
    })
    if (!signInResponse.ok) {
      throw new Error(`Better Auth sign-in failed: ${signInResponse.status}`)
    }

    // 5. Propagate Better Auth's Set-Cookie header(s) onto the response
    //    that TanStack Start will send back to the browser.
    const setCookies =
      typeof signInResponse.headers.getSetCookie === 'function'
        ? signInResponse.headers.getSetCookie()
        : ([signInResponse.headers.get('set-cookie')].filter(Boolean) as Array<string>)
    if (setCookies.length > 0) {
      setResponseHeader('set-cookie', setCookies)
    }

    // 6. Return Django tokens so the client can mirror them into localStorage
    //    for RTK Query's existing baseQueryWithReauth flow.
    return {
      access: tokens.access,
      refresh: tokens.refresh,
      user: {
        username: dUser.username,
        email: dUser.email,
        uuid: dUser.uuid,
      },
    }
  })
