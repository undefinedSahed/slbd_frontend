'use client'

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

export default function Clients() {
  const clients = [
    { src: '/assets/about1.jpg', alt: 'Client 1' },
    { src: '/assets/about1.jpg', alt: 'Client 2' },
    { src: '/assets/about1.jpg', alt: 'Client 3' },
    { src: '/assets/about1.jpg', alt: 'Client 4' },
    { src: '/assets/about1.jpg', alt: 'Client 5' },
    { src: '/assets/about1.jpg', alt: 'Client 6' },
    { src: '/assets/about1.jpg', alt: 'Client 7' },
    { src: '/assets/about1.jpg', alt: 'Client 8' }
  ]

  // Duplicate for infinite loop effect
  const repeatedClients = [...clients, ...clients]

  return (
    <section className="py-10 lg:py-20 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-center text-xl text-primary underline underline-offset-4 lg:text-4xl font-bold lg:mb-10 mb-5">Our Valuable Clients</h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 30
            }}
          >
            {repeatedClients.map((client, index) => (
              <div key={index} className="flex items-center justify-center md:min-w-[200px] min-w-[100px]">
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={200}
                  height={100}
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
