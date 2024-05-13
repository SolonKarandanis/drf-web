// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import {getAllowedRoutes,allowedPaths} from './get-allowed-routes';
import { CustomMiddleware } from './chain'
import { getToken } from "next-auth/jwt";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname)
        // console.log(request.nextauth.token)

        if (request.nextUrl.pathname.startsWith("/admin")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export function withAuthorisationMiddleware(middleware: CustomMiddleware){
    return async (request: NextRequest, event: NextFetchEvent) =>{
        // Create a response object to pass down the chain
        const response = NextResponse.next()

        const token = await getToken({ req: request })
        // @ts-ignore
        request.nextauth = request.nextauth || {}
        // @ts-ignore
        request.nextauth.token = token
        const pathname = request.nextUrl.pathname

        if (pathname.includes("/dashboard") && token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }

        return middleware(request, event, response);
    }
}