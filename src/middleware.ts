import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    const isAdminRoute = pathname.startsWith("/admin");
    const isAccountProfile = pathname === "/account/profile";
    const isCartRoute = pathname.startsWith("/cart");
    const isAccountRoute = pathname.startsWith("/account");

    // ✅ 1. Admin is only allowed to access /admin/* and /account/profile
    if (token?.role === "admin" && !isAdminRoute && !isAccountProfile) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    // ✅ 2. Non-authenticated users cannot access /account or /cart
    if (!token && (isAccountRoute || isCartRoute)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // ✅ 3. Non-admin users cannot access /admin
    if (isAdminRoute && token?.role !== "admin") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico|images|fonts|api).*)"], // match all relevant routes
};
