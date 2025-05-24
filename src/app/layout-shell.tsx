"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { useMemo } from "react";
import BackToTop from "@/components/shared/back-to-top";

const hiddenPaths = [
    "/dashboard",
    "/forgot-password",
    "/reset-password",
    "/signup/verify-email",
    "/login",
    "/signup",
];

export default function LayoutShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const shouldHideNavbar = useMemo(() => {
        return hiddenPaths.includes(pathname);
    }, [pathname]);

    const shouldHideFooter = useMemo(() => {
        return hiddenPaths.includes(pathname) || pathname.startsWith("/account/");
    }, [pathname]);

    return (
        <>
            {!shouldHideNavbar && <Navbar />}
            {children}
            {!shouldHideFooter && <Footer />}
            <BackToTop />
        </>
    );
}
