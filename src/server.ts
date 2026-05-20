import {
  createStartHandler,
  defaultStreamHandler,
  getRequestUrl,
} from '@tanstack/react-start/server'
import { overwriteGetLocale, locales, baseLocale, type Locale } from './paraglide/runtime'

// Paraglide's URL strategy can't extract the locale on the server without its
// own middleware setting up AsyncLocalStorage. We don't run that middleware —
// it would also try to delocalize the URL, which conflicts with our `$locale`
// route param.
//
// Instead, override getLocale() server-side to read the URL straight from
// TanStack Start's request context. `getRequestUrl()` is itself AsyncLocalStorage-
// scoped, so concurrent requests stay isolated.
overwriteGetLocale(() => {
  try {
    const url = getRequestUrl()
    const first = url.pathname.split('/').filter(Boolean)[0]
    if (first && (locales as ReadonlyArray<string>).includes(first)) {
      return first as Locale
    }
  } catch {
    // No active request context (module-load time, idle worker) — fall through.
  }
  return baseLocale
})

const fetch = createStartHandler(defaultStreamHandler)

export default { fetch }
