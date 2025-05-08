import { CategoryCardProps } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



export default function CategoryCard({ image, title, description }: CategoryCardProps) {
    return (
        <div>
            <Link href={`/shop?category=${title}`}>
                <div className="card border-1 border-green-600 rounded-t-md group-hover:shadow-primary group-hover:shadow-3xl group">
                    <div className="bg-[#EBF4F3] rounded-md">
                        <Image
                            src={image}
                            alt={`${title}`}
                            width={700} height={400}
                            className='w-full aspect-5/4 mx-auto object-cover rounded-t-md'
                        />
                    </div>
                    <div className='px-2 md:px-3 py-2 md:py-5 group-hover:bg-green-400 text-[#1B6732] group-hover:text-white border-green-400 rounded-b-md transition-all ease-in-out delay-100' >
                        <h6 className='text-sm md:text-lg font-semibold pb-1 md:pb-2 line-clamp-2'>{title}</h6>
                        <p className='text-xs line-clamp-2'>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
