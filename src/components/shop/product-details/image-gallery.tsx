"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface AuctionImageGalleryProps {
    images: string[]
    selectedIndex: number
    onSelect: (index: number) => void
}

export default function ProductImageGallery({ images, selectedIndex, onSelect }: AuctionImageGalleryProps) {
    return (
        <div className="grid grid-cols-3 md:gap-3 gap-1">
            {images?.map((image, index) => (
                <button
                    key={index}
                    className={cn(
                        "relative w-full aspect-5/3 flex-shrink-0 overflow-hidden rounded-md border",
                        selectedIndex === index ? "border-primary" : "border-muted",
                    )}
                    onClick={() => onSelect(index)}
                >
                    <Image src={image} alt={`Product image ${index + 1}`} fill className="object-cover" />
                </button>
            ))}
        </div>
    )
}