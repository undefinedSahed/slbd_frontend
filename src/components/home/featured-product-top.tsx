"use client"

import type { ProductType } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import FeaturedSingleProduct from "./featured-single-products"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile-nav"

export default function FeaturedProductTop() {
  const [selectedFeaturedProduct, setSelectedFeaturedProduct] = useState<string>("")
  const carouselRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const isTablet = useMobile(768) // md breakpoint

  const { data: featuredProducts, isLoading: featuredProductsLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/featured`)
      return res.json()
    },
    select: (featuredProductsData) => featuredProductsData?.data,
  })

  if (featuredProducts?.length > 0 && !selectedFeaturedProduct) {
    setSelectedFeaturedProduct(featuredProducts[0]._id)
  }

  const { data: singleProduct, isLoading: singleProductLoading } = useQuery({
    queryKey: ["singleProduct", selectedFeaturedProduct],
    queryFn: async () => {
      if (!selectedFeaturedProduct) return null
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${selectedFeaturedProduct}`)
      return res.json()
    },
    select: (singleProductData) => singleProductData?.data,
    enabled: !!selectedFeaturedProduct,
  })

  const scrollPrev = () => {
    if (carouselRef.current) {
      const scrollAmount = isMobile
        ? carouselRef.current.clientWidth
        : isTablet
          ? carouselRef.current.clientWidth / 2
          : carouselRef.current.clientWidth / 4

      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const scrollNext = () => {
    if (carouselRef.current) {
      const scrollAmount = isMobile
        ? carouselRef.current.clientWidth
        : isTablet
          ? carouselRef.current.clientWidth / 2
          : carouselRef.current.clientWidth / 4

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-8 lg:py-14">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10 sm:mb-10">
          <h2 className="text-primary text-2xl md:text-3xl underline underline-offset-5 font-semibold">Featured Products</h2>

          {/* Navigation buttons for carousel */}
          <div className="flex gap-2 md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="bg-primary hover:bg-green-700 text-white border-none lg:h-10 h-8 lg:w-10 w-8 rounded-full"
              aria-label="Previous products"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="bg-primary hover:bg-green-700 text-white border-none lg:h-10 h-8 lg:w-10 w-8 rounded-full"
              aria-label="Next products"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>

        {/* Featured Products Carousel/Grid */}
        <div className="relative mb-8 overflow-hidden">
          <div
            ref={carouselRef}
            className="flex md:grid md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {featuredProductsLoading
              ? // Loading skeleton for products
              Array(8)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-full min-w-[calc(100%-8px)] sm:min-w-[calc(50%-8px)] md:min-w-auto aspect-4/3 bg-gray-200 animate-pulse rounded-md snap-start"
                  ></div>
                ))
              : featuredProducts?.map((product: ProductType) => (
                <button
                  key={product._id}
                  onClick={() => setSelectedFeaturedProduct(product._id)}
                  className={`relative overflow-hidden rounded-md min-w-[33%] sm:min-w-[33%] md:min-w-auto snap-start ${selectedFeaturedProduct === product._id ? "ring-2 ring-primary" : ""
                    }`}
                >
                  <Image
                    src={product.thumbnail || "/placeholder.svg"}
                    alt={product.title}
                    width={1000}
                    height={1000}
                    className="w-full aspect-5/3 object-cover rounded-md transition-transform hover:scale-105"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* Single Product Details */}
        {selectedFeaturedProduct && <FeaturedSingleProduct product={singleProduct} isLoading={singleProductLoading} />}
      </div>
    </section>
  )
}
