import React from 'react'
import Image from "next/image"
import { Star } from 'lucide-react';

const Testimonial = () => {

    const ClientSays = [
        {
            image: "/assets/profile.png",
            name: "Md Sahed Rahman",
            designation: "Full Stack Developer",
            say: "As the developer of this site, I can confidently say that Super Light BD offers the best quality products. Their street lights are not only energy-efficient but also durable and stylish. Highly recommended!"
        },
        {
            image: "/assets/profile.png",
            name: "Nahid Hasan",
            designation: "Founder of Luminux BD",
            say: "Super Light BD has been a game-changer for our projects. Their products are top-notch, and the customer service is exceptional. The street lights we installed have transformed our outdoor spaces."
        },
        {
            image: "/assets/profile.png",
            name: "Kazi Shakib",
            designation: "CEO of Bright Future Ltd.",
            say: "We have been sourcing street lights from Super Light BD for over a year now. The quality is matched, and the team is always ready to assist with any queries. A reliable partner for all our lighting needs."
        }
    ]

    return (
        <section className='py-8 lg:py-20'>
            <div className="container mx-auto">
                <div className="">
                    <div className='pb-5 lg:pb-10'>
                        <h2 className='text-primary text-xl md:text-3xl underline underline-offset-5 font-semibold'>What Our Clients Say</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center'>
                        {ClientSays.map((item, i) => (
                            <div key={i} className='border-1 border-primary px-5 py-5 lg:px-8 lg:py-6 rounded-md'>
                                <div className='flex items-center gap-3 mt-5  '>
                                    <div>
                                        <Image
                                            className='w-16 aspect-1/1 object-contain rounded-full border-1 border-primary'
                                            src={item.image}
                                            alt='client image'
                                            height={64}
                                            width={64}
                                        />
                                    </div>
                                    <div>
                                        <h5 className='text-sm md:text-md font-semibold'>{item.name}</h5>
                                        <p className='text-xs  py-1'>{item.designation}</p>
                                        <div className='flex gap-1'>
                                            <Star className='w-3 text-primary fill-primary' />
                                            <Star className='w-3 text-primary fill-primary' />
                                            <Star className='w-3 text-primary fill-primary' />
                                            <Star className='w-3 text-primary fill-primary' />
                                            <Star className='w-3 text-primary fill-primary' />
                                        </div>
                                    </div>
                                </div>
                                <p className='text-sm py-5  text-left'>{item.say} </p>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial