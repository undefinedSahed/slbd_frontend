import { ServiceType } from '@/lib/types';
import React from 'react'
import ServiceCard from './service-card';


const lightingServices = [
    {
        image: "/assets/service1.jpg",
        title: "Garment Industry Lighting",
        description: "We provide specialized lighting solutions for garment factories, ensuring optimal illumination for quality control, color matching, and energy efficiency, thereby enhancing productivity and reducing operational costs.",
    },
    {
        image: "/assets/service2.jpg",
        title: "Commercial Space Lighting",
        description: "Our commercial lighting services cater to offices, retail outlets, and other commercial spaces, offering energy-efficient and aesthetically pleasing lighting designs that improve ambiance and employee well-being.",
    },
    {
        image: "/assets/service1.jpg",
        title: "Industrial Lighting",
        description: "We deliver robust and durable lighting solutions for industrial environments, focusing on safety, compliance, and energy savings, suitable for warehouses, manufacturing plants, and heavy-duty facilities.",
    },
    {
        image: "/assets/service2.jpg",
        title: "LED Retrofitting",
        description: "Upgrade your existing lighting systems with our LED retrofitting services, which offer significant energy savings, reduced maintenance costs, and improved lighting quality across various applications.",
    },
    {
        image: "/assets/service1.jpg",
        title: "Smart Lighting Solutions",
        description: "Implement intelligent lighting systems with our smart solutions that allow for automated control, energy monitoring, and customization, enhancing efficiency and user experience in modern facilities.",
    },
    {
        image: "/assets/service2.jpg",
        title: "Home Lighting Solutions",
        description: "We offer stylish and energy-efficient lighting designs for every room in your home, from living rooms to kitchens and bedrooms, creating a cozy and functional living environment.",
    },
];



export default function ServiceMain() {

    return (
        <section className='py-5 lg:py-20'>
            <div className="container mx-auto">
                <div className='pb-5 lg:pb-10'>
                    <h2 className='text-primary text-xl md:text-3xl underline underline-offset-5 font-semibold'>What We Provide</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-14">
                    {
                        lightingServices.map((service: ServiceType, index: number) => (
                            <ServiceCard
                                key={index}
                                image={service.image}
                                title={service.title}
                                description={service.description}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
