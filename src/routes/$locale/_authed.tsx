import { Outlet, createFileRoute, redirect, useParams } from '@tanstack/react-router'
import { useLayoutEffect, useState } from 'react'
import { getDjangoTokensFromSession, getServerSession } from '#/lib/session-server'
import {
  decodeJwtPayload,
  getAccessTokenValue,
  setLoginResponseInStorage,
} from '#/shared/token-storage'
import { Sidebar } from '#/components/layout/Sidebar'
import { Header } from '#/components/layout/Header'
import { unreadCountQueryOptions } from '#/features/notifications/api'

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

function getIsAdminFromToken(): boolean {
  try {
    const token = getAccessTokenValue()
    if (!token) return false
    const payload = decodeJwtPayload(token)
    const groups = payload.groups as string[] | undefined
    return groups?.includes('ADMIN') ?? false
  } catch {
    return false
  }
}

function AuthedLayout() {
  const { djangoTokens } = Route.useLoaderData()
  const { locale } = useParams({ from: '/$locale/_authed' })
  const [collapsed, setCollapsed] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useLayoutEffect(() => {
    if (!djangoTokens) return
    // Only overwrite localStorage if it lacks a valid token. The reauth mechanism
    // can refresh tokens independently of the session, so if localStorage has a
    // fresh token we must not replace it with the (potentially stale) session token.
    if (isJwtExpiredOrMissing(getAccessTokenValue())) {
      setLoginResponseInStorage(djangoTokens)
    }
    setIsAdmin(getIsAdminFromToken())
  }, [djangoTokens])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar locale={locale} collapsed={collapsed} isAdmin={isAdmin} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header locale={locale} onToggleSidebar={() => setCollapsed((c) => !c)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
