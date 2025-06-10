// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    // Route access rules
    const isAccountRoute = pathname.startsWith("/account");
    const isCartRoute = pathname.startsWith("/cart");
    const isAdminRoute = pathname.startsWith("/admin");

    // Protect /account and /cart routes for logged-in users
    if ((isAccountRoute || isCartRoute) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Protect /admin route for admin users only
    if (isAdminRoute) {
        if (!token || token.role !== "admin") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/account/:path*", "/cart/:path*", "/admin/:path*"],
};
