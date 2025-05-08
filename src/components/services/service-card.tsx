import type React from "react"
import Image from "next/image"
import { ServiceCardProps } from "@/lib/types"


export default function ServiceCard({
    image,
    title,
    description
}: ServiceCardProps) {
    return (
        <div className="w-full border-[1px] border-primary rounded-md group shadow-[0px_0px_5px_#16a34a] cursor-default">
            <div className="mb-1">
                <Image
                    src={image}
                    alt={title}
                    width={1000}
                    height={600}
                    className="w-full aspect-video object-cover"
                />
            </div>
            <div className="lg:px-5 px-4 lg:py-5 py-5">
                <h2 className="text-primary lg:text-[24px] text-[20px] font-medium lg:pb-3 pb-1">{title}</h2>
                <p className="text-gray-400 opacity-50 lg:text-[19px] text-[15px]">{description}</p>
            </div>
        </div>
    )
}
