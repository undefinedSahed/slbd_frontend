import Link from 'next/link'
import React from 'react'

export default function BannerHome() {

    return (
        <section className="relative lg:h-[90vh] h-[70svh] flex items-center"
            style={
                {
                    backgroundImage: "url('../../assets/banner_bg.jpg')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no repeat",
                    backgroundSize: "cover",
                    backdropFilter: "brightness(0.5)"
                }
            }
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div className="container mx-auto">
                <div className="lg:max-w-[50%] md:max-w-[90%] max-w-[100%] bg-white mx-auto rounded-2xl backdrop-blur-md md:px-12 px-5 text-center md:text-start py-8">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug text-[#2E2E2E] pb-4">
                        <p className="text-[#000]"> Super <span className="text-[#2BA14D]">Light</span> </p>
                        <p className="text-[#000]">Super <span className="text-[#afeb24]">Bright</span></p>
                    </h1>
                    <p className="text-[#2E2E2E] text-sm md:text-md pb-3 mb-4 text-justify md:text-start">
                        Super Light BD is a trusted lighting business providing a wide range of interior and outdoor lighting solutions. Illuminate your space with our high-quality and stylish lights.
                    </p>
                    <Link href="/about-us" className="bg-[#2BA14D] px-5 py-3 rounded-md text-white font-semibold  text-sm md:text-md">
                        Know More
                    </Link>
                </div>
            </div>
        </section>
    )
}
