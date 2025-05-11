"use client";

import { usePathname } from "next/navigation";
// import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

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
        <>
            {!shouldHideLayout && <Navbar />}
            {children}
            {!shouldHideLayout && <Footer />}
        </>
    );
}
