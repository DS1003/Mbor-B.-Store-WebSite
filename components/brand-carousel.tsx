"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const BRANDS = [
    { name: "Nike", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271825/mbor_store/brands/nike.svg" },
    { name: "Adidas", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271819/mbor_store/brands/adidas.svg" },
    { name: "Puma", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271827/mbor_store/brands/puma.svg" },
    { name: "New Balance", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271824/mbor_store/brands/newbalance.svg" },
    { name: "Under Armour", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271830/mbor_store/brands/underarmour.svg" },
    { name: "Reebok", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271829/mbor_store/brands/reebok.svg" },
    { name: "Fila", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271822/mbor_store/brands/fila.svg" },
    // Repeats for infinite scroll feel
    { name: "Nike", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271825/mbor_store/brands/nike.svg" },
    { name: "Adidas", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271819/mbor_store/brands/adidas.svg" },
    { name: "Puma", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271827/mbor_store/brands/puma.svg" },
    { name: "New Balance", logo: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271824/mbor_store/brands/newbalance.svg" },
]

export function BrandCarousel() {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef
            const scrollAmount = 300
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
            }
        }
    }

    return (
        <section className="py-16 md:py-24 bg-background overflow-hidden px-4 md:px-0">
            <div className="container-custom">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8 md:mb-12">
                    <div className="flex items-center gap-6 flex-1">
                        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter shrink-0">
                            Nos Marques
                        </h2>
                        <div className="h-0.5 w-full bg-primary/20 rounded-full hidden sm:block" />
                    </div>

                    <div className="flex items-center gap-3 pl-6 shrink-0">
                        <button
                            onClick={() => scroll('left')}
                            className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-muted/50 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all active:scale-95"
                        >
                            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-muted/50 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all active:scale-95 bg-black text-white border-black"
                        >
                            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                    </div>
                </div>

                {/* Brands Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex items-center gap-4 overflow-x-auto pb-8 scrollbar-hide -mx-4 px-4 md:px-0"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {BRANDS.map((brand, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="flex-shrink-0 w-[140px] h-[90px] md:w-[200px] md:h-[120px] bg-card border border-muted/30 hover:border-primary/30 rounded-2xl flex items-center justify-center p-6 transition-all shadow-sm hover:shadow-xl group"
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain brightness-0 opacity-80 group-hover:opacity-100 transition-all duration-300"
                                    sizes="(max-width: 768px) 100px, 150px"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
