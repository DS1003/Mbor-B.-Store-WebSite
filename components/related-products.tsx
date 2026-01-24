"use client"

import * as React from "react"
import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"

export function RelatedProducts() {
    const products = [
        { id: "2", name: "Nike Mercurial Vapor Elite Blue", price: 185000, category: "Crampons", image: "https://www.foot.fr/151289-large_default/nike-air-zoom-mercurial-vapor-16-pro-fg-bleu-rose.jpg" },
        { id: "3", name: "Tracksuit Elite Performance", price: 65000, category: "Tenues", image: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271862/mbor_store/placeholder.svg" },
        { id: "10", name: "Nike Mercurial Academy", price: 75000, category: "Crampons", image: "https://www.foot.fr/151284-large_default/nike-air-zoom-mercurial-vapor-16-pro-fg-bleu-rose.jpg" },
        { id: "5", name: "Maillot Sénégal Training", price: 35000, category: "Maillots", image: "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271862/mbor_store/placeholder.svg" },
    ]

    return (
        <div className="space-y-16">
            <ScrollReveal direction="down" className="flex flex-col items-center text-center space-y-6">
                <span className="text-[11px] font-bold tracking-tight text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/20">VOUS DEVRIEZ AIMER</span>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
                    Articles recommandés <br /> <span className="text-primary italic">Mbor Store</span>
                </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 px-4 overflow-visible">
                {products.map((product, i) => (
                    <ScrollReveal key={product.id} delay={i * 0.15}>
                        <ProductCard {...product} />
                    </ScrollReveal>
                ))}
            </div>
        </div>
    )
}
