import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { ShieldX } from 'lucide-react'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/$locale/_authed/denied')({
  component: DeniedPage,
})

function DeniedPage() {
  const { locale } = useParams({ from: '/$locale/_authed/denied' })

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <ShieldX className="w-16 h-16 text-destructive" />
      <h1 className="text-4xl font-bold">Access Denied</h1>
      <p className="text-muted-foreground text-lg max-w-md">
        You are logged in, but you do not have the required access level to view this page.
      </p>
      <Button asChild>
        <Link to="/$locale/dashboard" params={{ locale }}>
          Return to Dashboard
        </Link>
      </Button>
    </div>
  )
}
