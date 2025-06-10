"use client"

import type React from "react"

import { Package, ShoppingCart, Tags, FileText, Settings, Home, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

const menuItems = [
    {
        title: "admin",
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
        title: "Settings",
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
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link
                                            href={item.url}
                                            className="hover:bg-green-50 data-[active=true]:bg-green-100 data-[active=true]:text-green-700"
                                        >
                                            <item.icon className="h-4 w-4" />
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
                <Button onClick={() => signOut()} className="cursor-pointer">
                    <p className="text-white flex items-center gap-2"><LogOut className="h-4 w-4" />Logout</p>
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
