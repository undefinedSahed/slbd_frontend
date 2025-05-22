"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { User, ShoppingCart, Package, Home, Menu, CreditCard, Bell, Settings, LogOut } from "lucide-react"

export function MobileNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div className="lg:hidden border-b">
            <div className="flex h-16 items-center px-4">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="mr-2">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                        <div className="px-2 py-6">
                            <h2 className="mb-4 px-2 text-xl font-semibold tracking-tight">My Dashboard</h2>
                            <div className="space-y-1">
                                <Button
                                    variant={pathname === "/dashboard" ? "default" : "ghost"}
                                    className={cn("w-full justify-start", pathname === "/dashboard" && "bg-green-600 hover:bg-green-700")}
                                    asChild
                                    onClick={() => setOpen(false)}
                                >
                                    <Link href="/dashboard">
                                        <Home className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </Button>
                                <Button
                                    variant={pathname === "/dashboard/profile" ? "default" : "ghost"}
                                    className={cn(
                                        "w-full justify-start",
                                        pathname === "/dashboard/profile" && "bg-green-600 hover:bg-green-700",
                                    )}
                                    asChild
                                    onClick={() => setOpen(false)}
                                >
                                    <Link href="/dashboard/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </Button>
                                <Button
                                    variant={pathname.startsWith("/dashboard/orders") ? "default" : "ghost"}
                                    className={cn(
                                        "w-full justify-start",
                                        pathname.startsWith("/dashboard/orders") && "bg-green-600 hover:bg-green-700",
                                    )}
                                    asChild
                                    onClick={() => setOpen(false)}
                                >
                                    <Link href="/dashboard/orders">
                                        <Package className="mr-2 h-4 w-4" />
                                        Orders
                                    </Link>
                                </Button>
                                <Button
                                    variant={pathname === "/dashboard/cart" ? "default" : "ghost"}
                                    className={cn(
                                        "w-full justify-start",
                                        pathname === "/dashboard/cart" && "bg-green-600 hover:bg-green-700",
                                    )}
                                    asChild
                                    onClick={() => setOpen(false)}
                                >
                                    <Link href="/dashboard/cart">
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Cart
                                    </Link>
                                </Button>
                            </div>
                            <div className="mt-6">
                                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Settings</h2>
                                <div className="space-y-1">
                                    <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setOpen(false)}>
                                        <Link href="#">
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            Payment Methods
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setOpen(false)}>
                                        <Link href="#">
                                            <Bell className="mr-2 h-4 w-4" />
                                            Notifications
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setOpen(false)}>
                                        <Link href="#">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Account Settings
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="absolute bottom-4 w-full pr-8">
                                <Button variant="ghost" className="w-full justify-start text-red-500">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log Out
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href="/dashboard" className="flex items-center">
                    <span className="text-xl font-bold text-green-600">MyStore</span>
                </Link>
            </div>
        </div>
    )
}
