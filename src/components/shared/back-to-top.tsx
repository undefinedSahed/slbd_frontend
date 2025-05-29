"use client"

import React, { useEffect, useState } from 'react'
import { RxCaretUp } from "react-icons/rx";

export default function BackToTop() {
    const [isTopShow, setIsTopShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsTopShow(true);
            } else {
                setIsTopShow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isTopShow && (
                <div
                    className='fixed bottom-3 right-3 z-50 cursor-pointer h-7 w-7 rounded-full bg-primary text-white flex justify-center items-center'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <RxCaretUp className='h-6 w-6 font-bold' />
                </div>
            )}
        </>
    );
}
