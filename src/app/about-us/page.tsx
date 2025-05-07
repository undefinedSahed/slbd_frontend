import AboutBanner from '@/components/about-us/about-banner'
import AboutMain from '@/components/about-us/about-main'
import Achievement from '@/components/about-us/achievement'
import Feedback from '@/components/about-us/feedback'
import Goal from '@/components/about-us/goal'
import React from 'react'

export default function page() {
  return (
    <div>
      <AboutBanner />
      <AboutMain />
      <Achievement />
      <Goal />
      <Feedback />
    </div>
  )
}
