"use client"

import { BlogType } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { Calendar1Icon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Blogs() {


    const { data: blogs = [] as BlogType[], isLoading, isError, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs`)
            return res.json()
        },
        select: (blogsData) => blogsData?.data.slice(0, 3)
    })


    if (isError) return <div>Error: {error.message}</div>


    return (
        <section className="py-8 lg:py-14">
            <div className="container mx-auto">
                {/* Blog Header */}
                <div className="flex items-center justify-between px-4 md:px-10 lg:px-0 mb-10">
                    <h1 className="text-primary text-2xl md:text-3xl underline underline-offset-5 font-semibold">Blogs</h1>
                </div>

                {

                    isLoading &&
                    <div className="flex gap-4">
                        {
                            Array(3)
                                .fill(0)
                                .map((_, index) => (
                                    <div key={index}
                                        className="w-full aspect-5/3 bg-gray-200 animate-pulse rounded-md snap-start"
                                    ></div>
                                ))
                        }
                    </div>
                }

                {/* Blog Card */}
                <div className="grid lg:grid-cols-3 gap-10 md:gap-4">
                    {blogs.map((blog: BlogType) => (
                        <div key={blog._id} className="">
                            <Image
                                src={blog.image}
                                width={1000}
                                height={700}
                                alt={`${blog.title}`}
                                className="w-full aspect-5/3 object-cover opacity-80"
                            />
                            <div className="pr-2">
                                <div className="flex items-center gap-5 mt-3">
                                    <div className="py-1 flex items-center text-sm rounded-sm text-[#2BA14D] gap-1">
                                        <UserIcon className='w-4' />
                                        <p>Admin</p>
                                    </div>
                                    <div className="py-1 flex items-center text-sm rounded-sm text-[#2BA14D] gap-1">
                                        <Calendar1Icon className='w-4' />
                                        <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <h3 className="font-medium text-lg text-[#2E2E2E] mt-2 max-w-full line-clamp-1">{blog.title}</h3>
                                <p className="text-sm mt-3 w-[90%] leading-6 opacity-70 line-clamp-2">{blog.description}</p>
                                <div className="flex items-center mt-3">
                                    <Link href={`/blog/${blog.title}`} className="text-sm text-[#2BA14D] hover:text-[#141414] relative after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-3 after:h-2 after:w-2 after:content-[''] after:bg-[#2BA14D] after:rounded-full">Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}
