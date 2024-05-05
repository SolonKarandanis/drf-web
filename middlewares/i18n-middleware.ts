import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";
import { locales ,defaultLocale} from '@/utils/locales'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import createMiddleware from "next-intl/middleware";

const nextIntlMiddleware= createMiddleware({
    // A list of all locales that are supported
    locales: locales,
   
    // Used when no locale matches
    defaultLocale: defaultLocale,
});


function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  
    // @ts-ignore locales are readonly
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  
    const locale = matchLocale(languages, locales, defaultLocale)
    return locale
}

export function middleware(request: NextRequest) {
    return nextIntlMiddleware(request); 
}

export function withI18nMiddleware(middleware: CustomMiddleware) {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
      ) => {
        const pathname = request.nextUrl.pathname
        const isAsset = pathname.startsWith('/asset');
        if(!isAsset){
            const pathnameIsMissingLocale = locales.every(
                locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
            )
            
            // Redirect if there is no locale
            if (pathnameIsMissingLocale) {
                const locale = getLocale(request)
                
                return NextResponse.redirect(
                    new URL(
                        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                        request.url
                    )
                )
            }
        }
        return middleware(request, event, nextIntlMiddleware(request));
      }
}