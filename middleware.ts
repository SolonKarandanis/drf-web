import { chain } from '@/middlewares/chain'
import { withAuthenticationMiddleware } from '@/middlewares/authentication-middleware'
import { withI18nMiddleware } from '@/middlewares/i18n-middleware'

export default chain([ withAuthenticationMiddleware,withI18nMiddleware])

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)']
}