import Image from 'next/image'
import React from 'react'
import ServiceHeroImg from "../../../public/assets/service_banner.avif"
import Link from 'next/link'

export default function ServiceTop() {
    return (
        <section className="py-5 lg:py-20">
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row gap-5 justify-between items-center ">
                    {/* left-side */}
                    <div className="lg:w-[50%] w-full">
                        <h2 className='text-2xl lg:text-3xl font-bold underline underline-offset-8'>Our Services</h2>
                        <p className="text-sm font-normal lg:text-base my-5 text-justify">
                            We provide high-quality interior and outdoor lighting solutions for homes, offices, showrooms, and restaurants. Our services include custom lighting designs, LED installations, smart lighting systems, and energy-efficient solutions. We also offer landscape, street, and building facade lighting. Our team ensures professional installation, maintenance, and repair services to keep your lighting system efficient and long-lasting. Free consultations and tailored lighting solutions are available to meet your unique needs.
                        </p>
                        <div>
                            <Link href={"/about-us"}>
                                <button className='bg-[#2BA14D] text-white px-8 py-2 text-sm cursor-pointer hover:bg-primary/90'>Explore </button>
                            </Link>
                        </div>
                    </div>
                    {/* right-side */}
                    <div className='w-[45%] hidden md:block'>
                        <Image className="w-full aspect-5/3 rounded-lg" src={ServiceHeroImg} alt="ServiceHero" />
                    </div>
                </div>
            </div>
        </section>
    )
}
