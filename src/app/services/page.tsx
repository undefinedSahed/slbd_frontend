import ServiceMain from '@/components/services/service-main'
import ServiceTop from '@/components/services/service-top'
import CommonBanner from '@/components/shared/common-banner'
import React from 'react'

export default function page() {
    return (
        <>
            <CommonBanner heading="Services" />
            <ServiceTop />
            <ServiceMain />
        </>
    )
}
