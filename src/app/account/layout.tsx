import type React from "react"
import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AccountLayout } from "@/components/account/account-layout"


export const metadata: Metadata = {
    title: "User Dashboard",
    description: "User dashboard with profile, orders, and cart",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <SidebarProvider>
            <AccountLayout>{children}</AccountLayout>
        </SidebarProvider>
    )
}
