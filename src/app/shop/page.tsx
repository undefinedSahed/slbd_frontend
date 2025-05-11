import CommonBanner from '@/components/shared/common-banner'
import Products from '@/components/shop/shop-page'
import React from 'react'

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
