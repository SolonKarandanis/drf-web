import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'
import { CustomMiddleware } from './chain'
import { Locale,locales } from '@/utils/locales'

const loginUrl = '/auth/login/';
const allowedPaths = [loginUrl,'/auth/register/','/auth/forgot-password/']

function getAllowedRoutes(allowedPaths: string[], locales: Locale[]) {
    let allowedPathsWithLocale = [...allowedPaths]
  
    allowedPaths.forEach(route => {
      locales.forEach(
        locale =>
          (allowedPathsWithLocale = [
            ...allowedPathsWithLocale,
            `/${locale}${route}`
          ])
      )
    })
  
    return allowedPathsWithLocale
}

export function withAuthenticationMiddleware(middleware: CustomMiddleware){
    return async (request: NextRequest, event: NextFetchEvent) =>{
        // Create a response object to pass down the chain
        const response = NextResponse.next()

        const token = await getToken({ req: request })
        // @ts-ignore
        request.nextauth = request.nextauth || {}
        // @ts-ignore
        request.nextauth.token = token
        const pathname = request.nextUrl.pathname

        const allowedPathsWithLocale = getAllowedRoutes(allowedPaths, [
            ...locales
        ])
        const isPathAllowed =allowedPathsWithLocale.includes(pathname)
        if (!token && !isPathAllowed) {
            const signInUrl = new URL(loginUrl, request.url)
            signInUrl.searchParams.set('callbackUrl', pathname)
            return NextResponse.redirect(signInUrl)
        }
    
        return middleware(request, event, response)
    }
}