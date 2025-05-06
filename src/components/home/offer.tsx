import Link from 'next/link'
import React from 'react'

export default function Offer() {

    return (
        <section className='bg-gray-200 py-10 mt-8 lg:mt-24 lg:px-6 items-center align-middle'>
            <div className="container mx-auto">
                <div className="text-center m-5 sm:m-10 px-4">
                    <div className="">
                        <p className='lg:text-2xl sm:text-xl text-primary font-medium'>Every Products For 7 Days</p>
                    </div>
                    <div className="lg:text-4xl sm:text-2xl font-bold text-center mt-5 mb-10 ">
                        <h2>Up To 40%</h2>
                        <h2>Off Final Sale Products</h2>
                    </div>
                    <div className="mt-5">
                        <Link href="/shop" className='px-7 py-2 rounded-md bg-primary text-white'>SHOP NOW</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
