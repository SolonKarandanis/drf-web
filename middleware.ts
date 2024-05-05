import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
 
// const nextIntlMiddleware= createMiddleware({
//   // A list of all locales that are supported
//   locales: ['en', 'gr'],
 
//   // Used when no locale matches
//   defaultLocale: 'en'
// });

// export default function(req:NextRequest): NextResponse{
//     return nextIntlMiddleware(req);
// }
 
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(gr|en)/:path*']
// };

import { chain } from '@/middlewares/chain'
import { withAuthMiddleware } from '@/middlewares/auth-middleware'
import { withI18nMiddleware } from '@/middlewares/i18n-middleware'

export default chain([ withAuthMiddleware,withI18nMiddleware])

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}