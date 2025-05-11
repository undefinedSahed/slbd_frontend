"use client"

import type { ProductType } from "@/lib/types"
import Image from "next/image"
import { useState } from "react"
import { Heart, Share2, Star, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface FeaturedSingleProductProps {
    product: ProductType | null
    isLoading: boolean
}

export default function FeaturedSingleProduct({ product, isLoading }: FeaturedSingleProductProps) {
    const [quantity, setQuantity] = useState(1)

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
                    <div className="text-2xl font-bold">৳ {(product.price - (product.price * (product.discount || 0.10))).toFixed(2)}</div>
                    {product.price < 1500 && (
                        <div className="text-lg text-gray-500 line-through">৳ {product.price.toFixed(2)}</div>
                    )}
                </div>

                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`w-5 h-5 ${star <= 4 ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"}`}
                        />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">reviews</span>
                </div>

                <p className="text-gray-600 mt-4">{product.description}</p>

                <div className="flex items-center gap-20 mt-6">
                    <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-10 w-10">
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center">{quantity}</span>
                        <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-10 w-10">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Heart className="h-4 w-4" />
                            <span className="sr-only">Add to wishlist</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">Share product</span>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button className="flex-1 cursor-pointer text-white h-10">Add To Cart</Button>
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
        </div>
    )
}
