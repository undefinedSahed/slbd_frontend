import { ProductCardProps } from '@/lib/types'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ProductCard({
    thumbnail,
    title,
    price,
    discount,
    sold
}: ProductCardProps) {
    return (
        <div className='shadow-primary shadow-sm mb-4 rounded-md'>
            <div className="relative group overflow-hidden">

                {/* Discount show if has */}

                {discount > 0 &&
                    <div className="absolute top-2 left-2 md:px-6 px-2 md:py-2 py-1 rounded-sm bg-primary text-white text-center">
                        <p className='md:text-sm text-xs font-medium'>-{discount}%</p>
                    </div>
                }

                <Image
                    src={thumbnail}
                    alt={title}
                    width={1000}
                    height={1000}
                    layout="responsive"
                    className="rounded-t-lg w-full aspect-5/4 object-cover"
                />
                <div className="flex bg-white rounded-sm py-1 md:py-2 px-5 absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 space-x-3 md:space-x-5 lg:opacity-0 group-hover:opacity-100 transition duration-500">
                    <Heart className='w-3 md:w-5 h-3 md:h-5' />
                    <ShoppingCart className='w-3 md:w-5 h-3 md:h-5' />
                    <Eye className='w-3 md:w-5 h-3 md:h-5' />
                </div>
            </div>
            <div className="px-2 md:px-3 py-2 md:py-5 text-[#1B6732] ">
                <h3 className="text-sm md:text-lg font-medium md:font-semibold pb-2 md:pb-2 line-clamp-2">{title}</h3>
                <div className="flex items-start justify-between">
                    <div className="">
                        <div className="text-xs md:text-base font-medium lg:flex lg:items-center lg:gap-2">
                            ৳ {discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price}
                            <div className="">
                                {discount > 0 && (
                                    <span className="line-through text-gray-500">৳ {price}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className='text-xs md:text-base flex items-center gap-1'>Sold : {sold}+</p>
                </div>
            </div>
        </div>
    )
}
