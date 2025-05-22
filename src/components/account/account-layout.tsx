"use client"

import type React from "react"
import { Sidebar, SidebarTrigger } from "@/components/ui/sidebar"
import { AccountSidebar } from "./account-sidebar"

export function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col container mx-auto">
            <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6 md:hidden">
                <SidebarTrigger />
                <div className="font-semibold text-green-600">MyStore</div>
            </header>
            <div className="flex flex-1">
                <Sidebar>
                    <AccountSidebar />
                </Sidebar>
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}
