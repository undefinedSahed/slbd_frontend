import React from 'react'
import Image from "next/image"
import User from "../../../public/assets/user.png";
import { Star } from 'lucide-react';

const Testimonial = () => {

    const ClientSays = [
        {
            image: User,
            name: "Md Sahed Rahman",
            designation: "Front-end-developer",
            say: "I bought interior lights and the quality is excellent! The price is reasonable, and the service is top-notch!"
        },
        {
            image: User,
            name: "Najib Rafee",
            designation: "Founder of Wit Institute",
            say: "We purchased street lights for our office, and they are super bright and long-lasting. A very reliable company!"
        },
        {
            image: User,
            name: "Moriom",
            designation: "Web designer",
            say: "Super Light BD provides amazing lighting solutions! Had a great experience with both indoor and outdoor lights."
        }
    ]

    return (
        <section className='py-8 lg:py-14'>
            <div className="container mx-auto">
                <div className="">
                    <h2 className='text-primary text-2xl md:text-3xl underline underline-offset-5 font-semibold'>What Our Clients Say</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center lg:py-10 py-8'>
                        {ClientSays.map((item, i) => (
                            <div key={i} className='border-1 border-primary px-5 py-5 lg:px-8 lg:py-6 rounded-md'>
                                <div className='flex items-center gap-3 mt-5  '>
                                    <div>
                                        <Image className='w-16 aspect-1/1 object-contain rounded-full border-1 border-primary' src={item.image} alt='client image' />
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