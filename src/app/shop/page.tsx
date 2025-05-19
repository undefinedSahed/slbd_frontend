import CommonBanner from '@/components/shared/common-banner'
import Products from '@/components/shop/shop-page'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: "E-Shop | Super Lighting BD"
}


export default function page() {
  return (
    <div className="">
      <CommonBanner heading="Our E-Shop"/>
      <div className='container mx-auto'>
        <Products />
      </div>
    </div>
  )
}
