import { Facebook, Instagram, MailIcon, MailsIcon, PhoneCallIcon, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="pt-8 lg:pt-14">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-5 pb-5 border-b-2 border-primary">
          <div className="lg:mr-20">
            <p className="text-[#727272] text-[16px]">
              The smartest guide to decorating kitchen cabinets to help optimize
              the area of family kitchen space.
            </p>
            <div className="flex flex-col lg:flex-row gap-3 mt-5 justify-center lg:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full lg:w-[300px] px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all  shadow-sm"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold">
                SUBMIT
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center lg:justify-between py-6 gap-4 text-3xl">
              <Link href="https://www.facebook.com/profile.php?id=100090851693362" target="_blank">
                <Facebook className="text-[#727272] hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
              </Link>
              <Instagram className="text-[#727272] hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
              <MailsIcon className="text-[#727272] hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
              <Twitter className="text-[#727272] hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
              <PhoneCallIcon className="text-[#727272] hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer" />
            </div>
          </div>

          <div className="">
            <ul className="flex flex-col gap-2">
              <li className="text-primary font-semibold text-[16px] pb-2">About us</li>
              <li className="text-[#727272] text-[16px]"><Link href="/about-us">Our Story</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/jobs">Job Opportunities</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/about-us">Store Locator</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/about-us">Contact Us</Link></li>
            </ul>
          </div>

          <div className="">
            <ul className="flex flex-col gap-2">
              <li className="text-primary font-semibold text-[16px] pb-2">Customer Service</li>
              <li className="text-[#727272] text-[16px]"><Link href="/myaccount">My Account</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/terms">Term of Use</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/return-policy">Deliveries & Returns</Link></li>
              <li className="text-[#727272] text-[16px]"><Link href="/about-us">Contact</Link></li>
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
                <span><MailIcon /></span><a href="mailto:superlightingbd1..gmail.com">superlightingbd1@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-3 lg:gap-0 justify-between lg:items-center py-10 border-b-2 mb-2 border-primary">
          <p>&copy; Super Lighting BD - All rights reserved</p>
          <p className='text-xs md:text-base'>Design and developed by
            <Link href="https://mernsahed.netlify.app" target="_blank" className="font-bold text-primary underline px-1 md:px-2">Md. Sahed Rahman</Link>
            and his team.</p>
        </div>
      </div>
    </footer>
  )
}
