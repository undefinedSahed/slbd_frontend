import React from 'react'
import { RxCaretUp } from "react-icons/rx";

export default function BackToTop() {
    return (
        <div className='fixed bottom-3 right-3 z-50 cursor-pointer h-7 w-7 rounded-full bg-primary text-white flex justify-center items-center'>
            <RxCaretUp className='h-6 w-6 font-bold' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>
    )
}
