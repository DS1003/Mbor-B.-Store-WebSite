"use client"

import * as React from "react"
import Image from "next/image"

interface ProductGalleryProps {
    images?: string[]
}

export function ProductGallery({ images = ["/placeholder.svg"] }: ProductGalleryProps) {
    const [active, setActive] = React.useState(0)

    return (
        <div className="flex flex-col-reverse md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-auto pb-4 md:pb-0 scrollbar-hide">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${active === i
                            ? "border-primary shadow-lg shadow-primary/10"
                            : "border-muted/50 opacity-60 hover:opacity-100"
                            }`}
                    >
                        <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
                    </button>
                ))}
            </div>

            {/* Main Image Container */}
            <div className="relative aspect-square md:aspect-[4/5] flex-1 overflow-hidden rounded-[3rem] bg-muted/30 border-2 border-muted group cursor-zoom-in">
                <Image
                    src={images[active]}
                    alt="Product Image"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    priority
                />

                {/* Image Overlay/Shadow for depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.05)] pointer-events-none" />
            </div>
        </div>
    )
}
