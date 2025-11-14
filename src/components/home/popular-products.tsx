"use client"

import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
// import SimpleLoader from '../shared/simple-loader'
import { useQuery } from '@tanstack/react-query'
import { ProductType } from '@/lib/types'
import ProductCard from '../shared/product-card'


export default function PopularProducts() {


    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/popular`)
            return res.json()
        },
        select: (productsData) => productsData?.data
    })


    return (
        <section className="py-5 lg:py-20">
            <div className="container mx-auto">
                <div className="pb-5 lg:pb-10">
                    <h2 className='text-primary text-xl md:text-3xl underline underline-offset-5 font-semibold'>Popular Products</h2>
                </div>

                {isError && <div>Error: {error.message}</div>}


                <div className="relative">
                    <Carousel
                        opts={{
                            align: "start",
                            slidesToScroll: 1,
                        }}
                        className="w-full"
                    >
                        {
                            isLoading &&
                            <div className="flex gap-4">
                                {
                                    Array(5)
                                        .fill(0)
                                        .map((_, index) => (
                                            <div key={index}
                                                className="w-full aspect-5/3 bg-gray-200 animate-pulse rounded-md snap-start"
                                            ></div>
                                        ))
                                }
                            </div>
                        }
                        <CarouselContent className="-ml-4">
                            {products?.map((item: ProductType) => (
                                <CarouselItem key={item._id} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <div className="h-full">
                                        <ProductCard
                                            id={item._id}
                                            key={item._id}
                                            thumbnail={item.thumbnail}
                                            title={item.title}
                                            price={item.price}
                                            discount={item.discount}
                                            sold={item.sold}
                                            rating={item.rating}
                                            reviewsCount={item.reviewsCount}
                                        />
                                    </div>
                                </CarouselItem>
                            ))
                            }
                        </CarouselContent>
                        <CarouselPrevious className="absolute cursor-pointer lg:left-[93%] left-[81%] md:left-[88%] lg:!-top-16 !-top-9 bg-primary hover:bg-green-700 text-white border-none md:h-10 h-7 md:w-10 w-7 rounded-full" />
                        <CarouselNext className="absolute cursor-pointer lg:right-2 right-1 lg:!-top-16 !-top-9 transform -translate-y-1/2 bg-primary hover:bg-green-700 text-white border-none md:h-10 h-7 md:w-10 w-7 rounded-full" />
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
