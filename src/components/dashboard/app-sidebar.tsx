"use client"

import type React from "react"

import { Package, ShoppingCart, Tags, FileText, Settings, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import LogoutButtonWithModal from "../account/logout-modal"

const menuItems = [
    {
        title: "Admin",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Categories",
        url: "/admin/categories",
        icon: Tags,
    },
    {
        title: "Products",
        url: "/admin/products",
        icon: Package,
    },
    {
        title: "Orders",
        url: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "Blogs",
        url: "/admin/blogs",
        icon: FileText,
    },
    {
        title: "Update Profile",
        url: "/account/profile",
        icon: Settings,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar className="border-r" style={{ "--sidebar-primary": "#16a34a" } as React.CSSProperties}>
            <SidebarHeader className="p-6 bg-green-600 text-white">
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link
                                            href={item.url}
                                            className="hover:bg-green-50 data-[active=true]:bg-primary data-[active=true]:text-white py-7 pl-5 text-[18px]"
                                        >
                                            <item.icon className="h-7 w-7" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-6">
                <LogoutButtonWithModal />
            </SidebarFooter>
        </Sidebar>
    )
}
