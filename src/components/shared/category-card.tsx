import { CategoryCardProps } from '@/lib/types'
import Link from 'next/link'
import React from 'react'



export default function CategoryCard({ image, title, description }: CategoryCardProps) {
    return (
        <div>
            <Link href={`/shop?category=${title}`}>
                <div className="relative aspect-5/3 border-1 flex justify-center items-center text-white text-center border-green-600 rounded-md hover:shadow-primary hover:shadow-3xl z-10"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="absolute w-full h-full top-0 left-0 bg-black opacity-60 -z-10 rounded-md"></div>
                    <div className='px-2 md:px-3 py-2 md:py-5 text-[#1B6732 border-green-400' >
                        <h6 className='text-sm md:text-lg font-semibold pb-1 md:pb-2 line-clamp-2'>{title}</h6>
                        <p className='text-xs line-clamp-2'>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
