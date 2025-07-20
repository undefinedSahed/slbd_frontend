import Projects from '@/components/home/Projects'
import ServiceTop from '@/components/services/service-top'
import CommonBanner from '@/components/shared/common-banner'
import Services from '@/components/shared/services'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Services of Super Lighting BD",
    description: "The best lighting services",
}

export default function page() {
    return (
        <>
            <CommonBanner heading="Services" />
            <ServiceTop />
            <Services />
            <Projects />
        </>
    )
}
