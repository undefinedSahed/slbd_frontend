"use client"

import Image from "next/image"
import { useState } from "react"
import ProductImageGallery from "./image-gallery"
import { useQuery } from "@tanstack/react-query"
import { Heart, Share2, BarChart2, Minus, Plus, Truck } from "lucide-react"
import FeaturesTable from "./features-table"
import RelatedProducts from "./related-products"

interface ProductDetails {
    productName: string
}

export default function ProductDetails({ productName }: ProductDetails) {
    const [quantity, setQuantity] = useState(1)

    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    // Fetch product details
    const {
        data: productData,
        isLoading: isLoadingProductData,
        error: errorProduct,
    } = useQuery({
        queryKey: ["product", productName],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${productName}`)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to fetch product details")
            }
            return response.json()
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    const product = productData?.data

    if (isLoadingProductData) {
        return <div className="flex justify-center items-center h-[90vh]">Loading product details...</div>
    }

    if (errorProduct) {
        return <div>Error loading product details: {errorProduct.message}</div>
    }

    return (
        <section className="py-4 sm:py-5 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 lg:gap-8">
                    {/* Image Gallery */}
                    <div className="space-y-2 sm:space-y-4">
                        <div className="rounded-md bg-muted">
                            <Image
                                src={product?.images[selectedImageIndex] || "/placeholder.svg"}
                                alt={product?.title}
                                width={1000}
                                height={1000}
                                className="w-full aspect-video rounded-md object-cover"
                            />
                        </div>
                        <ProductImageGallery
                            images={product?.images}
                            selectedIndex={selectedImageIndex}
                            onSelect={setSelectedImageIndex}
                        />
                    </div>

                    {/* Details */}
                    <div className="mt-3 md:mt-0">
                        <div className="border-l border-[#727272] pl-3 sm:pl-5">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.title}</h1>

                            <div className="flex flex-wrap items-center mt-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <span className="ml-2 text-primary text-sm sm:text-base">45 Reviews</span>
                                <div className="mx-2 sm:mx-4 h-4 border-l border-primary"></div>
                                <span className="text-primary text-sm sm:text-base">Sold: {product.sold}+</span>
                            </div>

                            <div className="flex items-center mt-2">
                                <Truck className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-700" />
                                <span className="text-sm sm:text-base text-gray-700">Free delivery from ৳ 1000</span>
                            </div>

                            <div className="mt-3 sm:mt-4 flex items-baseline">
                                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    ৳{" "}
                                    {product.discount && product.discount > 0
                                        ? (product.price * (1 - product.discount / 100)).toFixed(2)
                                        : product.price}
                                </span>
                                <span className="ml-2 text-lg sm:text-xl text-gray-500 line-through">৳ {product.price}</span>
                            </div>

                            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">{product.description}</p>

                            <div className="mt-4 sm:mt-6 flex items-center">
                                <button className="p-1.5 sm:p-2 border border-primary rounded-md">
                                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                </button>
                                <button className="p-1.5 sm:p-2 border border-primary rounded-md ml-2">
                                    <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                </button>
                                <button className="p-1.5 sm:p-2 border border-primary rounded-md ml-2">
                                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                </button>
                                <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-primary">(There are 24 products left)</span>
                            </div>

                            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                                <div className="flex items-center border border-primary rounded-md">
                                    <button
                                        className="p-1.5 sm:p-2 text-primary hover:bg-gray-100 disabled:opacity-50"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        onChange={(e) => {
                                            const value = Number.parseInt(e.target.value)
                                            if (!isNaN(value) && value >= 1) {
                                                setQuantity(value)
                                            }
                                        }}
                                        className="w-10 sm:w-12 text-center border-x border-primary text-sm sm:text-base"
                                    />
                                    <button
                                        className="p-1.5 sm:p-2 text-primary hover:bg-gray-100"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-3 sm:gap-4">
                                    <button className="px-4 sm:px-6 py-1.5 sm:py-2 border border-primary rounded-md text-gray-800 text-sm sm:text-base font-medium hover:bg-gray-50">
                                        ADD TO CART
                                    </button>

                                    <button className="px-4 sm:px-6 py-1.5 sm:py-2 bg-primary text-white rounded-md text-sm sm:text-base font-medium hover:bg-gray-800">
                                        BUY NOW
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-6 border-t border-primary pt-3 sm:pt-4">
                                <div className="flex">
                                    <span className="text-primary w-20 sm:w-28 text-sm sm:text-base">Sku:</span>
                                    <span className="text-gray-800 text-sm sm:text-base">0124</span>
                                </div>
                                <div className="flex mt-1">
                                    <span className="text-primary w-20 sm:w-28 text-sm sm:text-base">Category:</span>
                                    <span className="text-gray-800 text-sm sm:text-base">{product.category.title}</span>
                                </div>
                                <div className="flex mt-1">
                                    <span className="text-primary w-20 sm:w-28 text-sm sm:text-base">Tag:</span>
                                    <span className="text-gray-800 text-sm sm:text-base">Sofa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Features */}
                <div className="mt-20">
                    <FeaturesTable specs={product.specs} isLoading={isLoadingProductData} />
                </div>


                {/* Related Products */}
                <div className="mt-20">
                    <RelatedProducts category={product.category.title} />
                </div>
            </div>
        </section>
    )
}
