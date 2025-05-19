"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMobile } from '@/hooks/use-mobile-nav';
import { Menu, Search, Store, UserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about-us" },
    { name: "Services", href: "/services" },
    { name: "E-Shop", href: "/shop" },
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

    const session = useSession()
    const token = session?.data?.user?.accessToken

    const [isLoggedIn, setIsLoggedIn] = useState(false);



    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);


    const isMobile = useMobile();
    const pathname = usePathname();
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
                `/shop?search=${encodeURIComponent(searchTerm.trim())}`
            );
            setSearchTerm("");
        }
    };


    return (
        <nav className="sticky top-0 z-50 w-full border-b border-primary text-black bg-white h-16 md:h-20 flex justify-center flex-col">
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
                    {isLoggedIn && !isMobile && (
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
                                className="w-[220px] sm:w-[300px] pl-5 bg-primary/90 text-white"
                            >
                                <nav className="flex flex-col gap-4 pt-10 pb-4 border-b pr-3">
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
                                                href="/cart"
                                                className={`relative text-base font-medium text-muted-foreground transition-colors hover:text-foreground ${isActive("/wishlist") ? "text-foreground" : ""
                                                    }`}
                                            >
                                                Cart
                                                {cartList?.length > 0 && (
                                                    <span className="absolute top-[-8px] -left-3 bg-white text-primary rounded-full text-[10px] h-4 w-4 flex justify-center items-center font-semibold">
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
                                <div className="flex flex-col gap-1">
                                    <a href="tel:8801724188240" className="text-xs font-medium">Call : +880 1724-188240</a>
                                    <a href="mailto:superlightingbd1@gmail.com" className="text-xs font-medium">superlightingbd1@gmail.com</a>
                                    <div className="flex justify-start items-center gap-3 text-xl pt-5">
                                        <Link href="https://www.facebook.com/profile.php?id=100090851693362" target="_blank">
                                            <FaFacebook className="text-white hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
                                        </Link>
                                        <FaInstagram className="text-white hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
                                        <FaTiktok className="text-white hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
                                        <FaTwitter className="text-white hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>
            </div>
        </nav>
    )
}
