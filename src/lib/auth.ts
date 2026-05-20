import pg from 'pg'
import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: 'better_auth_user',
    additionalFields: {
      djangoId: { type: 'string', required: false, input: false },
      djangoUuid: { type: 'string', required: false, input: false },
    },
  },
  session: {
    modelName: 'better_auth_session',
    additionalFields: {
      // input:false blocks API-level writes via /update-session so clients
      // can't plant a different user's JWT in their own session. The
      // databaseHooks.session.create.before path below bypasses parseSessionInput
      // and writes directly through the adapter, so the hook still works.
      djangoAccess: { type: 'string', required: false, input: false },
      djangoRefresh: { type: 'string', required: false, input: false },
    },
  },
  databaseHooks: {
    session: {
      create: {
        // Pull Django tokens off custom request headers set by `signInWithDjango`
        // and persist them on the session row. We can't pass them via the standard
        // signInEmail body (BA validates against the user table only), so the
        // header→hook trick is the cleanest way to carry per-sign-in data through.
        before: async (session, context) => {
          const reqHeaders = context?.request?.headers
          const ctxHeaders = (context as { headers?: Headers })?.headers
          const readHeader = (name: string): string | undefined =>
            reqHeaders?.get?.(name) ?? ctxHeaders?.get?.(name) ?? undefined
          const djangoAccess = readHeader('x-django-access')
          const djangoRefresh = readHeader('x-django-refresh')
          if (djangoAccess && djangoRefresh) {
            return { data: { ...session, djangoAccess, djangoRefresh } }
          }
          return
        },
      },
    },
  },
  account: {
    modelName: 'better_auth_account',
  },
  verification: {
    modelName: 'better_auth_verification',
  },
  plugins: [tanstackStartCookies()],
})
