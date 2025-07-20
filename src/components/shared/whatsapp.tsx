import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';

export default function Whatsapp() {
    return (
        <Link href="https://wa.me/8801735589033" target="_blank" className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-primary shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="md:h-10 h-5 md:w-10 w-5 rounded-full">
                <FaWhatsapp className="h-full w-full text-white" />
            </div>
        </Link>
    )
}
