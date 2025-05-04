import { CategoryCardProps } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



export default function CategoryCard({ image, title, description }: CategoryCardProps) {
    return (
        <div>
            <Link href={`/shop?category=${title}`}>
                <div className="card border-1 border-green-600 rounded-md group-hover:shadow-primary group-hover:shadow-3xl group">
                    <div className="bg-[#EBF4F3] rounded-md">
                        <Image
                            src={image}
                            alt={`${title}`}
                            width={700} height={400}
                            className='w-full aspect-5/4 mx-auto object-cover rounded-t-md'
                        />
                    </div>
                    <div className='text-center px-3 py-5 group-hover:bg-green-400 text-[#1B6732] group-hover:text-white border-green-400 rounded-md transition-all ease-in-out delay-100' >
                        <h6 className='text-lg font-semibold pb-2'>{title}</h6>
                        <p className='text-sm'>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
