import { Outlet, createFileRoute, redirect, useParams } from '@tanstack/react-router'
import { useLayoutEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getDjangoTokensFromSession, getServerSession } from '#/lib/session-server'
import {
  decodeJwtPayload,
  getAccessTokenValue,
  setLoginResponseInStorage,
} from '#/shared/token-storage'
import { Sidebar } from '#/components/layout/Sidebar'
import { Header } from '#/components/layout/Header'
import { unreadCountQueryOptions } from '#/features/notifications/api'
import { useNotificationSocket } from '#/features/notifications/hooks/useNotificationSocket'
import { accountQueryOptions } from '#/features/users/account'
import {ADMIN, BUYER} from "#/shared/constants.ts";

export const Route = createFileRoute('/$locale/_authed')({
  beforeLoad: async ({ params }) => {
    const session = await getServerSession()
    if (!session) {
      throw redirect({
        to: '/$locale/auth/login',
        params: { locale: params.locale },
      })
    }
    return { session }
  },
  loader: async ({ context }) => {
    if (typeof window !== 'undefined') {
      context.queryClient.prefetchQuery(unreadCountQueryOptions())
    }
    return { djangoTokens: await getDjangoTokensFromSession() }
  },
  component: AuthedLayout,
})

function isJwtExpiredOrMissing(token: string | null): boolean {
  if (!token) return true
  try {
    const payload = decodeJwtPayload(token)
    // 30-second buffer so we proactively refresh tokens close to expiry
    return typeof payload.exp !== 'number' || (payload.exp as number) * 1000 < Date.now() + 30_000
  } catch {
    return true
  }
}

function getUserIdFromToken(token: string | null): number | null {
  if (!token) return null
  try {
    const payload = decodeJwtPayload(token)
    return typeof payload.user_id === 'number' ? payload.user_id : null
  } catch {
    return null
  }
}


function AuthedLayout() {
  const { djangoTokens } = Route.useLoaderData()
  const { locale } = useParams({ from: '/$locale/_authed' })
  const queryClient = useQueryClient()
  const [collapsed, setCollapsed] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isBuyer, setIsBuyer] = useState(false)
  const { data: account } = useQuery(accountQueryOptions())
  useNotificationSocket(account?.uuid)

  useLayoutEffect(() => {
    if (!djangoTokens) return
    const localToken = getAccessTokenValue()
    // Write session tokens when: (a) localStorage has no valid token, OR (b) the
    // stored token belongs to a different user (user switch). Case (b) is what
    // breaks supplier login after a buyer session — the buyer's unexpired token
    // stays in localStorage because it passes the expiry check, so all requests
    // go out as the buyer. Comparing user_id catches this without touching the
    // reauth path (same user, refreshed token keeps the same user_id).
    const sessionUserId = getUserIdFromToken(djangoTokens.access)
    const localUserId = getUserIdFromToken(localToken)
    if (isJwtExpiredOrMissing(localToken) || localUserId !== sessionUserId) {
      setLoginResponseInStorage(djangoTokens)
      // Drop the cached account so useNotificationSocket gets undefined UUID
      // until the fresh fetch resolves with the new user's data. Without this,
      // the socket connects with the old user's UUID and the new user's token,
      // causing Django to reject the handshake.
      queryClient.removeQueries({ queryKey: ['user', 'account'] })
    }
    // Always read groups from the authoritative session token, not localStorage.
    // A same-user role change (e.g. Supplier → Buyer) keeps the same user_id so
    // the localStorage write above is skipped, but groups in the stored token are
    // stale. djangoTokens.access is always fresh from the server session.
    try {
      const payload = decodeJwtPayload(djangoTokens.access)
      const groups = (payload.groups as string[] | undefined) ?? []
      setIsAdmin(groups.includes(ADMIN))
      setIsBuyer(groups.includes(BUYER))
    } catch {
      // keep defaults (false)
    }
  }, [djangoTokens])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar locale={locale} collapsed={collapsed} isAdmin={isAdmin} isBuyer={isBuyer} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header locale={locale} onToggleSidebar={() => setCollapsed((c) => !c)} isBuyer={isBuyer} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
