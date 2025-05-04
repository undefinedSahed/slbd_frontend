import { ProductCardProps } from '@/lib/types'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ProductCard({
    thumbnail,
    title,
    price
}: ProductCardProps) {
    return (
        <div className='shadow-primary shadow-sm mb-4 rounded-md'>
            <div className="relative group overflow-hidden">
                <Image
                    src={thumbnail}
                    alt="Solex Sofa"
                    width={1000}
                    height={1000}
                    layout="responsive"
                    className="rounded-lg w-full aspect-5/4 object-cover"
                />
                <div className="flex bg-white rounded-sm py-2 px-5 absolute bottom-4 left-1/2 -translate-x-1/2 space-x-5 opacity-0 group-hover:opacity-100 transition duration-500">
                    <Heart className='w-5 h-5' />
                    <ShoppingCart className='w-5 h-5' />
                    <Eye className='w-5 h-5' />
                </div>
            </div>
            <div className="text-center px-3 py-5 text-[#1B6732] ">
                <h3 className="text-lg font-semibold pb-2">{title}</h3>
                <p className="text-sm">
                    ৳ {price}
                </p>
            </div>
        </div>
    )
}
