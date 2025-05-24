import type React from "react"
import Image from "next/image"
import { ServiceCardProps } from "@/lib/types"


export default function ServiceCard({
    image,
    title,
    description
}: ServiceCardProps) {
    return (
        <div className="w-full border-[1px] border-primary rounded-md group shadow-[0px_0px_39px_10px_rgba(0,_0,_0,_0.1)] cursor-default">
            <div className="mb-1">
                <Image
                    src={image}
                    alt={title}
                    width={1000}
                    height={600}
                    className="w-full aspect-[5/2] object-cover rounded-t-md"
                />
            </div>
            <div className="lg:px-5 px-4 lg:py-5 py-5">
                <h2 className="text-primary lg:text-[24px] text-[20px] font-medium lg:pb-3 pb-1">{title}</h2>
                <p className="opacity-80 lg:text-[19px] text-[15px]">{description}</p>
            </div>
        </div>
    )
}
