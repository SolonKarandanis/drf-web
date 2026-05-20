import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { auth } from './auth'
import { decodeJwtPayload } from '#/shared/token-storage'

export const getServerSession = createServerFn({ method: 'GET' }).handler(async () => {
  const req = getRequest()
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.user) return null
  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    },
  }
})

// Returns the Django access/refresh tokens stashed on the Better Auth session.
// Used by the protected layout to re-hydrate localStorage when the browser
// has lost the tokens but the BA session is still valid.
export const getDjangoTokensFromSession = createServerFn({ method: 'GET' }).handler(async () => {
  const req = getRequest()
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.session) return null
  const s = session.session as { djangoAccess?: string | null; djangoRefresh?: string | null }
  if (!s.djangoAccess || !s.djangoRefresh) return null
  return { access: s.djangoAccess, refresh: s.djangoRefresh }
})

// Returns true when the authenticated user's Django JWT contains the ADMIN group.
// Used in beforeLoad guards to protect admin-only routes server-side.
export const getIsAdmin = createServerFn({ method: 'GET' }).handler(async () => {
  const req = getRequest()
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.session) return false
  const s = session.session as { djangoAccess?: string | null }
  if (!s.djangoAccess) return false
  try {
    const payload = decodeJwtPayload(s.djangoAccess)
    const groups = payload.groups as string[] | undefined
    return groups?.includes('ADMIN') ?? false
  } catch {
    return false
  }
})
