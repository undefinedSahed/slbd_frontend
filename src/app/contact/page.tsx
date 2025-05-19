import ContactSection from '@/components/contact/contact-section'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Contact with Super Lighting BD",
    description: "Contact with Super Lighting BD",
}


export default function page() {
    return (
        <main>
            <ContactSection />
        </main>
    )
}
