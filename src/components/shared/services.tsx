import { services } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { slugify } from '@/lib/utils'

export default function Services() {


    return (
        <section className='py-8 lg:py-28'>
            <div className="container lg:space-y-10 space-y-5">
                <div className="text-center max-w-5xl mx-auto space-y-5">
                    <h2 className='lg:text-4xl text-2xl font-bold'>Lighting Up Modern Workspaces with Smarter Energy</h2>
                    <p className='lg:text-lg text-gray-500'>Workplaces are becoming more agile and innovative than ever. From personalized user control and real-time space insights to smart wayfinding, hot desking, and efficient meeting room bookings — we enable the future of work.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 items-center">
                    {
                        services.map((service) => (
                            <div key={service.id} className="bg-[#e5e7eb] lg:space-y-8 space-y-4 lg:pb-8 pb-4">
                                <Image
                                    src={service.thumbnail}
                                    alt={service.title}
                                    height={500}
                                    width={800}
                                    className='w-full aspect-video object-cover'
                                />
                                <div className="text-center space-y-4 lg:space-y-8">
                                    <h3 className='lg:text-xl font-semibold'>{service.title}</h3>
                                    <Link href={`/services/${slugify(service.title)}`}>
                                        <Button className='text-white cursor-pointer'>Know More</Button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
