import { ProductCardProps } from '@/lib/types'
import { useQueryClient } from '@tanstack/react-query'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

export default function ProductCard({
    id,
    thumbnail,
    title,
    price,
    discount,
    sold
}: ProductCardProps) {

    const router = useRouter()
    const session = useSession()
    const token = session?.data?.user?.accessToken
    const queryclient = useQueryClient()


    const handleAddToCart = async () => {
        if (!token) {
            toast.error('Please login to continue')
            router.push('/login')
            return
        }
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/addtocart`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    product_id: id,
                    quantity: 1
                })
            }
        )
        if (!res.ok) return toast.error('Something went wrong')
        const data = await res.json()
        toast.success(data.message)
        queryclient.invalidateQueries({ queryKey: ['cartItems', token] });
    }



    return (
        <div className='shadow-primary shadow-sm mb-4 rounded-md'>
            <div className="relative group overflow-hidden">

                {/* Discount show if has */}

                {discount > 0 &&
                    <div className="absolute top-2 left-2 md:px-6 px-2 md:py-2 py-1 rounded-sm bg-primary text-white text-center">
                        <p className='md:text-sm text-xs font-medium'>-{discount}%</p>
                    </div>
                }

                <Image
                    src={thumbnail}
                    alt={title}
                    width={1000}
                    height={1000}
                    layout="responsive"
                    className="rounded-t-lg w-full aspect-5/4 object-cover"
                />
                <div className="flex gap-5 bg-white rounded-sm py-1 md:py-2 px-5 absolute bottom-1 md:bottom-4 left-1/2 -translate-x-1/2 space-x-3 md:space-x-5 lg:opacity-0 group-hover:opacity-100 transition duration-500">
                    <Heart className='w-4 md:w-5 h-4 md:h-5' />
                    <ShoppingCart
                        onClick={handleAddToCart}
                        className='w-4 md:w-5 h-4 md:h-5 cursor-pointer'
                    />
                    <Link href={`/shop/${title}`}><Eye className='w-4 md:w-5 h-4 md:h-5' /></Link>
                </div>
            </div>
            <div className="px-2 md:px-3 py-2 md:py-5 text-[#1B6732] ">
                <h3 className="text-sm md:text-lg font-medium md:font-semibold pb-2 md:pb-2 line-clamp-2">{title}</h3>
                <div className="flex items-start justify-between">
                    <div className="">
                        <div className="text-xs md:text-base font-medium lg:flex lg:items-center lg:gap-2">
                            ৳ {discount && discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price}
                            <div className="">
                                {discount > 0 && (
                                    <span className="line-through text-gray-500">৳ {price}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className='text-xs md:text-base flex items-center gap-1'>Sold : {sold}+</p>
                </div>
            </div>
        </div>
    )
}
