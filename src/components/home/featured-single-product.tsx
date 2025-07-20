"use client"

import type { ProductType } from "@/lib/types"
import Image from "next/image"
import { useState } from "react"
import { Share2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface FeaturedSingleProductProps {
    product: ProductType | null
    isLoading: boolean
}

export default function FeaturedSingleProduct({ product, isLoading }: FeaturedSingleProductProps) {

    const [quantity, setQuantity] = useState(1)

    const session = useSession()

    const token = session?.data?.user?.accessToken

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const queryclient = useQueryClient()


    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }

    if (isLoading) {
        return (
            <div className="grid md:grid-cols-2 gap-6 animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-md"></div>
                <div className="space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>
        )
    }


    // Function to format the key (convert camelCase to Title Case with spaces)
    const formatKey = (key: string) => {
        return (
            key
                // Insert a space before all uppercase letters
                .replace(/([A-Z])/g, " $1")
                // Replace first character to uppercase
                .replace(/^./, (str) => str.toUpperCase())
        )
    }


    const formatValue = (value: string | number | string[] | number[]) => {
        if (Array.isArray(value)) {
            return value.join(", ")
        }
        return value
    }


    if (!product) return null



    const handleAddToCart = async () => {
        if (!token) {
            toast.error('Please login to continue')
            const fullPath = `${pathname}?${searchParams.toString()}`;
            router.push(`/login?callbackUrl=${encodeURIComponent(fullPath)}`);
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
                    product_id: product._id,
                    quantity: quantity
                })
            }
        )
        if (!res.ok) return toast.error('Something went wrong')
        const data = await res.json()
        toast.success(data.message)
        queryclient.invalidateQueries({ queryKey: ['cartData', token] });
    }


    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }

        return stars;
    };



    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mt-8">
            {/* Product Image */}
            <div className="overflow-hidden rounded-lg">
                <Image
                    src={product.thumbnail || "/placeholder.svg"}
                    alt={product.title}
                    width={1000}
                    height={1000}
                    className="w-full aspect-6/4 object-cover rounded-lg"
                />
            </div>

            {/* Product Details */}
            <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                <Separator className="my-2" />

                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold">৳ {(product.price - (product.price * ((product.discount || 10) / 100))).toFixed(2)}</div>
                    <div className="text-lg text-gray-500 line-through">৳ {product.price.toFixed(2)}</div>
                </div>

                <div className="flex items-center gap-1">
                    {product?.reviewsCount > 0 ? (
                        <>
                            <div className="flex items-center text-sm">
                                {renderStars(product.rating as number)}
                            </div>
                            <p className="text-xs md:text-sm text-gray-500">
                                {product?.rating?.toFixed(1)} ({product?.reviewsCount} {product?.reviewsCount === 1 ? 'review' : 'reviews'})
                            </p>
                        </>
                    ) : (
                        <p className="text-xs md:text-sm text-gray-500">No reviews yet</p>
                    )}
                    <span className="ml-2 text-sm text-gray-600">reviews</span>
                </div>

                <p className="text-gray-600 mt-4">{product.description}</p>

                <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-10 w-10">
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center">{quantity}</span>
                        <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-10 w-10">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="">
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href)
                                toast.success('Link copied to clipboard')
                            }
                            }
                            variant="outline"
                            size="icon"
                            className="rounded-full cursor-pointer"
                        >
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">Share product</span>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button onClick={handleAddToCart} className="flex-1 cursor-pointer text-white h-10">Add To Cart</Button>
                    <Button variant="outline" className="flex-1 h-10 cursor-pointer">
                        <Link href={`/shop/${product.title}`} className="w-full">View Details</Link>
                    </Button>
                </div>

                {product.specs && (
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Specifications:</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm">
                            {Object.entries(product.specs)
                                .slice(0, 6)
                                .map(([key, value]) => (
                                    <div key={key} className="flex gap-2">
                                        <span className="font-medium">{formatKey(key)} :</span>
                                        <span>{formatValue(value)}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}
