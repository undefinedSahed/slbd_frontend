// middleware.ts
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

const protectedRoutes = ["/account", "/cart"]

export async function middleware(req: NextRequest) {
    const token = await getToken({ req })

    const { pathname } = req.nextUrl

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/account/:path*", "/cart/:path*"],
}
