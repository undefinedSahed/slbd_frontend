import AboutMain from '@/components/about-us/about-main'
import Achievement from '@/components/about-us/achievement'
import Feedback from '@/components/about-us/feedback'
import Goal from '@/components/about-us/goal'
import CommonBanner from '@/components/shared/common-banner'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: "About SLBD",
  keywords: ["Lights", "Best Lighting", "SLBD"],
  description: "Best Lighting Service Provider in Bangladesh",
};


export default function page() {
  return (
    <div>
      <CommonBanner heading="About SLBD" />
      <AboutMain />
      <Achievement />
      <Goal />
      <Feedback />
    </div>
  )
}
