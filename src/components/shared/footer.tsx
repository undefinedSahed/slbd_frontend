import { Facebook, Instagram, MailIcon, MailsIcon, PhoneCallIcon, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../../../public/assets/logo.png'

export default function Footer() {
  return (
    <footer className="pt-8 lg:pt-14">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] md:grid-cols-3 gap-5 pb-5 border-b-2 border-primary">
          <div className="lg:mr-20 md:col-span-3 lg:col-auto">
            <div className="flex justify-center lg:justify-start">
              <Image
                src={Logo}
                alt='logo'
                width={200}
                height={200}
                className='w-32 object-contain aspect-5/3'
              />
            </div>
            {/* Social Media Icons */}
            <div className="flex justify-center lg:justify-start py-6 gap-6 text-3xl">
              <Link href="https://www.facebook.com/profile.php?id=100090851693362" target="_blank">
                <Facebook className="text-[#727272] hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
              </Link>
              <Instagram className="text-[#727272] hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
              <MailsIcon className="text-[#727272] hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
              <Twitter className="text-[#727272] hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
              <PhoneCallIcon className="text-[#727272] hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
            </div>
            <p className="text-[#727272] text-[16px]">
              The smartest guide to decorating kitchen cabinets to help optimize
              the area of family kitchen space.
            </p>
          </div>

          <div className="">
            <ul className="flex flex-col gap-2">
              <li className="text-primary font-semibold text-[16px] pb-2">Quick Links</li>
              <li className="text-[#727272] text-[16px]"><Link href="/about-us">About us</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/services">Our Services</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/shop">Visit Shop</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="">
            <ul className="flex flex-col gap-2">
              <li className="text-primary font-semibold text-[16px] pb-2">Customer Service</li>
              <li className="text-[#727272] text-[16px]"><Link href="/account">My Account</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/cart">My Cart</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/account/orders">My Orders</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="">
            <ul className="flex flex-col gap-2">
              <li className="text-primary font-semibold text-[16px] pb-2">Get In Touch</li>
              <li className="text-[#727272] flex items-center gap-2">
                <Link href="/about-us">House: 110, Road: 02, Block: D, Pallabi 2nd Project, Rupnagar, Mirpur</Link>
              </li>
              <li className="text-[#727272] text-[16px] flex gap-2 items-center">
                <span><PhoneCallIcon /></span><a href="callto:+8801724188240">+880 1724-188240</a>
              </li>
              <li className="text-[#727272] text-[16px] flex items-center gap-2">
                <span><MailIcon /></span><a href="mailto:superlightingbd@gmail.com">superlightingbd@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-3 lg:gap-0 justify-between lg:items-center py-10 border-b-2 mb-2 border-primary">
          <p>&copy; Super Lighting BD - All rights reserved</p>
          <p className='text-xs md:text-base'>Design and developed by
            <Link href="https://mernsahed.netlify.app" target="_blank" className="font-bold text-primary underline px-1 md:px-2">Md. Sahed Rahman</Link></p>
        </div>
      </div>
    </footer>
  )
}
