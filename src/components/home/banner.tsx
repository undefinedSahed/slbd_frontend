"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

const slides = [
    {
        bg: "/assets/banner1.jpg",
        title1: "Super Light",
        title2: "Super Bright",
    },
    {
        bg: "/assets/banner2.jpg",
        title1: "Speedy Performance",
        title2: "Stunning Design",
    },
    {
        bg: "/assets/banner3.jpg",
        title1: "Bright Future",
        title2: "Smart Technology",
    },
]

export default function BannerHome() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative h-[70svh] lg:h-[90vh] w-full bg-black/70 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full z-0"
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${slides[current].bg})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/60 z-0" />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Content stays on top */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="container mx-auto text-white text-center md:text-start px-5 md:px-12">
                    <div className="max-w-full md:max-w-[90%] lg:max-w-[50%] mx-auto py-8 text-center">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug pb-4">
                            <motion.p
                                key={slides[current].title1}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                {slides[current].title1}
                            </motion.p>
                            <motion.p
                                key={slides[current].title2}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                {slides[current].title2}
                            </motion.p>
                        </h1>
                        <Link
                            href="/about-us"
                            className="bg-[#2BA14D] px-5 py-3 rounded-md text-white font-semibold text-sm md:text-md inline-block"
                        >
                            Know More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
