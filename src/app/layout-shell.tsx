"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { useMemo } from "react";

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

    const shouldHideLayout = useMemo(() => {
        return hiddenPaths.some((path) => pathname === path);
    }, [pathname]);

    return (
        <>
            {!shouldHideLayout && <Navbar />}
            {children}
            {!shouldHideLayout && <Footer />}
        </>
    );
}
