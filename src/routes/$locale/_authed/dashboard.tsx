import { Link, createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { authClient } from '#/lib/auth-client'
import { removeLoginResponseFromStorage } from '#/shared/token-storage'
import { accountQueryOptions } from '#/shared/query/user'
import { m } from '#/paraglide/messages'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/$locale/_authed/dashboard')({
  loader: async ({ context }) => {
    if (typeof window !== 'undefined') {
      await context.queryClient.ensureQueryData(accountQueryOptions())
    }
  },
  component: Dashboard,
})

function Dashboard() {
  const { locale } = useParams({ from: '/$locale/_authed/dashboard' })
  const navigate = useNavigate()
  const { data, isLoading, error } = useQuery(accountQueryOptions())

  const handleSignOut = async () => {
    await authClient.signOut()
    removeLoginResponseFromStorage()
    navigate({ to: '/$locale/auth/login', params: { locale } })
  }

  if (isLoading) return <div className="p-8">…</div>
  if (error)
    return (
      <div className="p-8 text-red-600">
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    )

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-foreground">
        {m.dashboard_welcome({ name: data?.username ?? 'user' })}
      </h1>
      <p className="text-sm text-muted-foreground">
        Locale: <code>{locale}</code> · Email: <code>{data?.email}</code>
      </p>
      <div className="flex gap-2">
        <Button asChild>
          <Link to="/$locale/products/search" params={{ locale }}>
            {m.dashboard_browse_products()}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/$locale/users/search" params={{ locale }}>
            {m.users_search_title()}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/$locale/cart" params={{ locale }}>
            {m.cart_title()}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/$locale/wishlist" params={{ locale }}>
            {m.wishlist_title()}
          </Link>
        </Button>
        <Button variant="outline" onClick={handleSignOut}>
          {m.dashboard_signout()}
        </Button>
      </div>
    </div>
  )
}
