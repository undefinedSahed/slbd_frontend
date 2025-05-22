"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, ShoppingCart, Package } from "lucide-react"
import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function AccountSidebar() {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === "/account/profile" && pathname === "/account/profile") return true
        if (path === "/account/orders" && (pathname === "/account/orders" || pathname.startsWith("/orders/"))) return true
        if (path === "/account/cart" && pathname === "/account/cart") return true
        return false
    }

    return (
        <>
            <SidebarHeader className="border-b px-6 py-3 z-50">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600">MyStore</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="px-2 pt-10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive("/account/profile")}
                            className="data-[active=true]:bg-green-600 data-[active=true]:text-white py-6 pl-5"
                        >
                            <Link href="/account/profile">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive("/account/orders")}
                            className="data-[active=true]:bg-green-600 data-[active=true]:text-white py-6 pl-5"
                        >
                            <Link href="/account/orders">
                                <Package className="mr-2 h-6 w-6" />
                                <span>Orders</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive("/account/cart")}
                            className="data-[active=true]:bg-green-600 data-[active=true]:text-white py-6 pl-5"
                        >
                            <Link href="/account/cart">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                <span>Cart</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </>
    )
}
