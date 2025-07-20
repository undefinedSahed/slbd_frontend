import Link from 'next/link'
import React from 'react'
import { FaDownload } from 'react-icons/fa'

export default function Catalog() {
    return (
        <section className='bg-gray-200 py-10 lg:py-20 mt-8 lg:mt-24 lg:px-6'>
            <div className="container mx-auto">
                <div className="text-center m-5 sm:m-10 px-4">
                    {/* Tagline */}
                    <p className='lg:text-2xl sm:text-xl text-primary font-medium'>
                        Browse All Our Products in One Place
                    </p>

                    {/* Headline */}
                    <div className="lg:text-4xl sm:text-2xl font-bold text-center mt-5 mb-6">
                        <h2>Explore Our Complete Product Catalog</h2>
                        <p className="text-lg font-normal text-gray-600 mt-3">
                            Get detailed specifications, features, and pricing.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-6">
                        <button className='relative group cursor-pointer lg:mt-12 my-10 z-30 overflow-hidden lg:pl-10 pl-6 lg:pr-20 pr-14 lg:py-4 py-3 border-[1px] border-primary rounded-[40px] after:absolute after:content-[""] after:top-0 after:-right-[300px] after:h-full after:w-full after:bg-primary after:-z-10 after:duration-500 after:ease-in-out hover:after:right-0'>
                            <Link href="/assets/cprofile.pdf" download="Company Profile">
                                <span className='text-[15px] font-bold text-primary uppercase duration-500 group-hover:text-white'>Download Catalog</span>
                                <FaDownload className='absolute z-30 lg:h-[60px] lg:w-[60px] h-[50px] w-[50px] text-white rounded-full bg-primary flex justify-center items-center top-1/2 -right-1 -translate-y-1/2 px-5' />
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
