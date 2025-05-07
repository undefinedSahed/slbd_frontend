import { ProductCardProps } from '@/lib/types'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ProductCard({
    thumbnail,
    title,
    price,
    discount
}: ProductCardProps) {
    return (
        <div className='shadow-primary shadow-sm mb-4 rounded-md'>
            <div className="relative group overflow-hidden">

                {/* Discount show if has */}

                {discount > 0 &&
                    <div className="absolute top-2 left-2 px-6 py-2 rounded-sm bg-primary text-white text-center">
                        <p className='text-sm font-medium'>{discount}%</p>
                    </div>
                }

                <Image
                    src={thumbnail}
                    alt="Solex Sofa"
                    width={1000}
                    height={1000}
                    layout="responsive"
                    className="rounded-t-lg w-full aspect-5/4 object-cover"
                />
                <div className="flex bg-white rounded-sm py-2 px-5 absolute bottom-4 left-1/2 -translate-x-1/2 space-x-5 opacity-0 group-hover:opacity-100 transition duration-500">
                    <Heart className='w-5 h-5' />
                    <ShoppingCart className='w-5 h-5' />
                    <Eye className='w-5 h-5' />
                </div>
            </div>
            <div className="text-center px-3 py-5 text-[#1B6732] ">
                <h3 className="text-lg font-semibold pb-2">{title}</h3>
                <p className="text-base font-medium">
                    ৳ {discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price}
                    {discount > 0 && (
                        <span className="line-through text-gray-500 ml-3">৳ {price}</span>
                    )}
                </p>
            </div>
        </div>
    )
}
