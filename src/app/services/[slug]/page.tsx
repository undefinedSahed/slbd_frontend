import { Button } from '@/components/ui/button'
import { services } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function slugify(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-')
}

export default async function ServiceDetails({ params }: { params: Promise<{ slug: string }> }) {

    const resolvedParams = await params

    const service = services.find((service) => slugify(service.title) === resolvedParams.slug)

    console.log(service)

    return (
        <main>
            <section
                className="relative z-10 lg:min-h-[70vh] h-[50vh] flex justify-between items-center bg-cover bg-center bg-no-repeat text-white"
                style={{ backgroundImage: `url(${service?.thumbnail})` }}
            >
                <div className="absolute inset-0 bg-black/70 -z-10" />

                <div className="container text-center lg:space-y-8 space-y-5">
                    <h2 className='lg:text-4xl font-bold tracking-wide'>{service?.title}</h2>
                    <Link href="/contact">
                        <Button className="text-white cursor-pointer">Contact Us</Button>
                    </Link>
                </div>
            </section>
            <section className="py-8 lg:py-20">
                <div className="container lg:space-y-10 space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 items-center">
                        <p className='leading-relaxed lg:text-lg text-sm text-justify lg:text-start'>{service?.descriptionOne}</p>
                        <Image
                            src={service?.image as string}
                            alt={service?.title as string}
                            height={600}
                            width={1000}
                            className="w-full aspect-video object-cover rounded-md"
                        />
                    </div>
                    <p className='leading-relaxed lg:text-lg text-sm text-justify lg:text-start'>{service?.descriptionTwo}</p>
                </div>
            </section>
            <section className="py-8 lg:py-20">
                <div className="container lg:space-y-10 space-y-7">
                    <div className="text-center space-y-5">
                        <h2 className="lg:text-3xl text-xl font-bold tracking-wide underline underline-offset-[15px] text-primary">Usage Area</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-center">
                        {
                            service?.useArea.map((area) => (
                                <div key={area.id} className="lg:space-y-5 space-y-2">
                                    <Image
                                        src={area?.image as string}
                                        alt={area?.title as string}
                                        height={600}
                                        width={1000}
                                        className="w-full aspect-video object-cover rounded-md"
                                    />
                                    <h3 className='lg:text-base font-semibold text-center'>{area?.title}</h3>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </main>

    )
}
