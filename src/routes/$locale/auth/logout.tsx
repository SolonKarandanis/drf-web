import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { authClient } from '#/lib/auth-client'
import { getAccessTokenValue, getRefreshTokenValue, removeLoginResponseFromStorage } from '#/shared/token-storage'
import { m } from '#/paraglide/messages'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/$locale/auth/logout')({
  component: LogoutPage,
})

function LogoutPage() {
  const { locale } = useParams({ from: '/$locale/auth/logout' })
  const navigate = useNavigate()
  const [pending, setPending] = useState(false)

  const handleSignOut = async () => {
    setPending(true)
    try {
      const refresh = getRefreshTokenValue()
      const access = getAccessTokenValue()
      if (refresh && access) {
        const base = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000/api/'
        await fetch(`${base}auth/logout/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access}` },
          body: JSON.stringify({ refresh }),
        }).catch(() => {})
      }
      await authClient.signOut()
      removeLoginResponseFromStorage()
    } finally {
      navigate({ to: '/$locale/auth/login', params: { locale } })
    }
  }

  const handleCancel = () => {
    navigate({ to: '/$locale/dashboard', params: { locale } })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-md bg-card p-8 text-center shadow-defaultshadow">
        <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-warning/10 text-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </span>
        <h1 className="mb-2 text-2xl font-bold text-card-foreground">
          {m.logout_title()}
        </h1>
        <p className="text-muted-foreground">{m.logout_confirm()}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="destructive" onClick={handleSignOut} disabled={pending}>
            {m.logout_yes()}
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={pending}>
            {m.logout_cancel()}
          </Button>
        </div>
      </div>
    </div>
  )
}
