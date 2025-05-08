"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { CategoryType } from '@/lib/types';
import CategoryCard from '../shared/category-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"


export default function Category() {

    const { data: categories, isLoading, isError, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`)
            return res.json()
        },
        select: (categoriesData) => categoriesData?.data
    })


    return (
        <section className='py-5 lg:py-20'>
            <div className="container mx-auto">
                <div className='pb-5 lg:pb-10'>
                    <h2 className='text-primary text-xl md:text-3xl underline underline-offset-5 font-semibold'>Categories</h2>
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
                                    Array(4)
                                        .fill(0)
                                        .map((_, index) => (
                                            <div key={index}
                                                className="w-full aspect-square bg-gray-200 animate-pulse rounded-md snap-start"
                                            ></div>
                                        ))
                                }
                            </div>
                        }
                        <CarouselContent className="-ml-4">
                            {categories?.map((item: CategoryType) => (
                                <CarouselItem key={item._id} className="lg:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <CategoryCard
                                        key={item._id}
                                        image={item.image}
                                        title={item.title}
                                        description={item.description}
                                    />
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
