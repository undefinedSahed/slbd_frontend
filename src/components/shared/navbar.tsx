"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMobile } from '@/hooks/use-mobile-nav';
import { Menu, Search, Store, UserRound } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about-us" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
];


const cartList = [
    { name: "Item 1", href: "/" },
    { name: "Item 2", href: "/" },
    { name: "Item 3", href: "/" },
    { name: "Item 4", href: "/" },
];


export default function Navbar() {
    const isMobile = useMobile();
    const pathname = usePathname();
    const [isLoggedIn] = useState(false);
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");


    const iconLinks = [
        { icon: Store, href: "/cart", count: cartList?.length },
        { icon: UserRound, href: "/accounts", count: 0 },
    ];


    const getIconClasses = (href: string) => `
  relative border-2 rounded-full p-2 transition-colors
  ${pathname.startsWith(href)
            ? "border-green-600"
            : "border-black hover:border-primary hover:text-white hover:bg-green-600"
        }
`;

    const getIconColor = (href: string) => pathname.startsWith(href) ? "text-primary" : "text-black";

    const isActive = (href: string) => {
        // Special case for home page
        if (href === "/") return pathname === href;
        return pathname.startsWith(href);
    };


    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTerm.trim()) {
            router.push(
                `/auctions?searchTerm=${encodeURIComponent(searchTerm.trim())}`
            );
            setSearchTerm("");
        }
    };


    return (
        <nav className="fixed top-0 z-50 w-full border-b border-primary text-black bg-white h-16 md:h-20 flex justify-center flex-col">
            <div className="container mx-auto flex h-16 items-center justify-between">
                {/* Logo */}
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/assets/logo.png"
                            alt="Logo"
                            width={700}
                            height={400}
                            className="lg:h-16 lg:w-28 h-12 w-16"
                        />
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <div>
                    {!isMobile && (
                        <nav className="hidden md:flex md:gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-[16px] font-medium transition-colors hover:text-primary ${isActive(link.href) ? "text-primary" : ""}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative w-full max-w-[160px] sm:max-w-sm">
                        <Input
                            placeholder="Search..."
                            className="pr-8 h-9 w-full border border-green-600 focus:outline-none placeholder:text-green-400 text-black text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-green-600" />
                    </div>

                    {/* Login Button - shown when not logged in */}
                    {!isLoggedIn && (
                        <Link href="/login" className="hidden md:block">
                            <Button variant="default" className="px-6 hidden lg:block bg-green-600 hover:bg-green-700 cursor-pointer text-white">
                                Login
                            </Button>
                        </Link>
                    )}

                    {/* Icon Links - shown when logged in */}
                    {isLoggedIn && (
                        <div className="flex items-center gap-2 sm:gap-4">
                            {iconLinks.map(({ icon: Icon, href, count }) => (
                                <Link key={href} href={href} className={getIconClasses(href)}>
                                    <Icon className={getIconColor(href)} size={20} />
                                    {count > 0 && (
                                        <span className="absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full text-[10px] px-[6px] font-semibold">
                                            {count}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Mobile Menu */}
                    {isMobile && (
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-6 w-6 text-black" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[280px] sm:w-[300px] pl-5 bg-[#dff3ed]"
                            >
                                <nav className="flex flex-col gap-4 pt-10">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`text-base font-medium text-muted-foreground transition-colors hover:text-foreground ${isActive(link.href) ? "text-foreground" : ""
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    {!isLoggedIn ? (
                                        <Link
                                            href="/login"
                                            className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            Login
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href="/wishlist"
                                                className={`relative text-base font-medium text-muted-foreground transition-colors hover:text-foreground ${isActive("/wishlist") ? "text-foreground" : ""
                                                    }`}
                                            >
                                                Wishlist
                                                {cartList?.length > 0 && (
                                                    <span className="absolute top-[-8px] right-[-8px] bg-[#E4C072] text-white rounded-full text-[10px] px-[6px] font-semibold">
                                                        {cartList.length}
                                                    </span>
                                                )}
                                            </Link>
                                            <Link
                                                href="/accounts"
                                                className={`text-base font-medium text-muted-foreground transition-colors hover:text-foreground ${isActive("/accounts") ? "text-foreground" : ""
                                                    }`}
                                            >
                                                My Account
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>
            </div>
        </nav>
    )
}
