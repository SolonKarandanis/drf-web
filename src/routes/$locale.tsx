import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { setLocale, locales, type Locale } from '#/paraglide/runtime'

const SUPPORTED: ReadonlyArray<string> = ['en', 'gr']

export const Route = createFileRoute('/$locale')({
  beforeLoad: ({ params }) => {
    if (!SUPPORTED.includes(params.locale)) {
      throw notFound()
    }
    // Paraglide's runtime exposes the URL-strategy locale already; this call
    // keeps message lookups in sync when navigating client-side.
    if (locales.includes(params.locale as Locale)) {
      setLocale(params.locale as Locale, { reload: false })
    }
  },
  component: LocaleLayout,
})

function LocaleLayout() {
  return <Outlet />
}
