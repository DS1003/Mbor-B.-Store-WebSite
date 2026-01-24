"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ShopFilters } from "@/components/shop-filters"
import { ChevronDown, Filter } from "lucide-react"

export default function CategoryPage() {
    const params = useParams()
    const slug = params.slug as string
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)

    // Mock category-specific data
    const products = [
        { id: "1", name: `Elite ${categoryName} Performance`, price: 154000, category: categoryName, image: "https://www.foot.fr/151284-large_default/nike-air-zoom-mercurial-vapor-16-pro-fg-bleu-rose.jpg", isNew: true },
        { id: "2", name: `Pro ${categoryName} Series`, price: 85000, category: categoryName, image: "https://www.foot.fr/151289-large_default/nike-air-zoom-mercurial-vapor-16-pro-fg-bleu-rose.jpg" },
        { id: "3", name: `Club ${categoryName} Edition`, price: 45000, category: categoryName, image: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271862/mbor_store/placeholder.svg" },
        { id: "4", name: `Official ${categoryName} Match`, price: 110000, category: categoryName, image: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271862/mbor_store/placeholder.svg" },
        { id: "5", name: `Training ${categoryName} Gear`, price: 35000, category: categoryName, image: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271862/mbor_store/placeholder.svg" },
        { id: "6", name: `Classic ${categoryName} Style`, price: 65000, category: categoryName, image: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271862/mbor_store/placeholder.svg" },
    ]

    return (
        <div className="flex flex-col w-full min-h-screen">
            {/* Category Banner Header */}
            <div className="relative h-[40vh] bg-black overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-black/60 to-black z-10" />
                <div className="container-custom relative z-20 text-center space-y-4">
                    <ScrollReveal direction="down">
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">Collection Élite</span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white">
                            {categoryName}
                        </h1>
                    </ScrollReveal>
                </div>
            </div>

            <div className="container-custom py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* PC Filters */}
                    <ScrollReveal direction="left" className="hidden lg:block w-72 lg:sticky lg:top-32 h-fit">
                        <ShopFilters />
                    </ScrollReveal>

                    <div className="flex-1 space-y-12">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between pb-8 border-b">
                            <ScrollReveal direction="left">
                                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                    <span className="text-foreground">{products.length}</span> Produits Trouvés
                                </p>
                            </ScrollReveal>

                            <ScrollReveal direction="right" className="flex items-center space-x-4">
                                <button className="lg:hidden flex items-center space-x-2 bg-muted px-4 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                    <Filter className="h-3.5 w-3.5" />
                                    <span>Filtres</span>
                                </button>
                                <button className="flex items-center space-x-3 bg-muted px-6 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest ">
                                    <span>Trier par</span>
                                    <ChevronDown className="h-4 w-4 text-primary" />
                                </button>
                            </ScrollReveal>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product, i) => (
                                <ScrollReveal key={product.id} delay={i * 0.1}>
                                    <ProductCard {...product} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
