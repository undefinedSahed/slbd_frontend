import ContactSection from '@/components/contact/contact-section'
import Testimonial from '@/components/home/testimonial'
import CommonBanner from '@/components/shared/common-banner'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Contact with Super Lighting BD",
    description: "Contact with Super Lighting BD",
}


export default function page() {
    return (
        <main>
            <CommonBanner heading='Contact Us'/>
            <ContactSection />
            <Testimonial />
        </main>
    )
}
