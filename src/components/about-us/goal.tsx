import Image from 'next/image'
import React from 'react'
import MissionImg from "../../../public/assets/mission.png"
import Vision from "../../../public/assets/vision.png"
import System from "../../../public/assets/system.png"

export default function Goal() {
    const missionInfo = [
        {
            icon: MissionImg,
            title: "Our Mission",
            description: "To illuminate lives and industries across Bangladesh with sustainable and high-performance LED lighting solutions that enhance efficiency, save energy, and support a greener future."
        },
        {
            icon: Vision,
            title: "Our Vision",
            description: "To become Bangladesh’s most trusted LED lighting brand by delivering superior products, unmatched service, and reliable solutions for every lighting need."
        },
        {
            icon: System,
            title: "SYSTEM ANALYSIS & DESIGN",
            description: "At Super Light BD, our system analysis focuses on understanding customer needs and ensuring tailored lighting solutions. We design an intuitive, efficient platform that simplifies order management, inventory tracking, and customer support."
        },
    ]
    return (
        <section className='py-5 lg:py-20'>
            <div className="container mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-5'>
                    {missionInfo.map((item, index) => (
                        <div key={index} className='card px-4 lg:px-7 py-5 rounded-sm shadow-[0px_0px_5px_#16a34a] hover:shadow-md hover:shadow-[#16a34a]  hover:scale-105 transition-all duration-700 ease-in-out'>
                            <Image src={item.icon} alt="image" width={50} height={50} />
                            <h4 className='text-sm font-semibold text-primary my-4'>{item.title}</h4>
                            <p className='text-xs md:text-sm'>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
