'use client'

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

export default function Clients() {
  const clients = [
    { src: '/assets/clients/cl1.png', alt: 'Client 1' },
    { src: '/assets/clients/cl2.jpg', alt: 'Client 2' },
    { src: '/assets/clients/cl3.png', alt: 'Client 3' },
    { src: '/assets/clients/cl4.png', alt: 'Client 4' },
    { src: '/assets/clients/cl5.png', alt: 'Client 5' },
    { src: '/assets/clients/cl6.png', alt: 'Client 6' },
    { src: '/assets/clients/cl7.png', alt: 'Client 7' },
    { src: '/assets/clients/cl8.png', alt: 'Client 8' },
    { src: '/assets/clients/cl9.png', alt: 'Client 9' },
    { src: '/assets/clients/cl10.png', alt: 'Client 10' },
    { src: '/assets/clients/cl11.png', alt: 'Client 11' },
    { src: '/assets/clients/cl12.png', alt: 'Client 12' },
    { src: '/assets/clients/cl13.png', alt: 'Client 13' },
    { src: '/assets/clients/cl14.jpg', alt: 'Client 14' },
    { src: '/assets/clients/cl15.png', alt: 'Client 15' }
  ]

  // Duplicate for infinite loop effect
  const repeatedClients = [...clients, ...clients]

  return (
    <section className="py-10 lg:py-20 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-center text-xl text-primary underline underline-offset-4 lg:text-3xl font-bold lg:mb-10 mb-5">Our Valuable Clients</h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration:50
            }}
          >
            {repeatedClients.map((client, index) => (
              <div key={index} className="flex items-center justify-center md:min-w-[200px] min-w-[100px]">
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={100}
                  height={80}
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
