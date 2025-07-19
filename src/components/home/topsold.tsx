"use client"
import React from 'react'
import ProductCard from '@/components/shared/product-card';
import { useQuery } from '@tanstack/react-query'
import type { ProductType } from '@/lib/types'

const Topsold = () => {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['topsold'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/topsold`)
      return res.json()
    },
    select: (topsoldData) => topsoldData?.data
  })

  if (isLoading) {
    return (
      <div className="flex gap-4">
        {
          Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index}
                className="w-full aspect-5/3 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))
        }
      </div>
    )
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <section className='py-10 xl:px-10 px-3 sm:px-2'>
      <div className="container">
        <div className="pb-5 lg:pb-10">
          <h2 className='text-primary text-xl md:text-3xl underline underline-offset-5 font-semibold'>
            Top sold Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            products?.map((item: ProductType) => (
              <ProductCard
                id={item._id}
                key={item._id}
                thumbnail={item.thumbnail}
                title={item.title}
                price={item.price}
                discount={item.discount}
                sold={item.sold}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Topsold
