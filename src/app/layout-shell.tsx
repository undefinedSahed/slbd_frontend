"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { SessionProvider } from "next-auth/react";

export default function LayoutShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const hiddenPaths = [
        "/dashboard",
        "/seller-dashboard",
        "/forgot-password",
        "/reset-password",
        "/verify-otp",
        "/login",
        "/signup",
    ];

    const shouldHideLayout = hiddenPaths.some((path) =>
        pathname.startsWith(path)
    );

    return (

        <SessionProvider>
            {!shouldHideLayout && <Navbar />}
            {children}
            {!shouldHideLayout && <Footer />}
        </SessionProvider>
    );
}
