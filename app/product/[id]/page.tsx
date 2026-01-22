import * as React from "react"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { RelatedProducts } from "@/components/related-products"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
            sizes: true
        }
    })

    if (!product) {
        return notFound()
    }

    const productData = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        category: product.category?.name || "Sport",
        description: product.description ?? "",
        images: product.images.length > 0 ? product.images : ["/placeholder.svg"],
        allowFlocage: product.allowFlocage,
        isNew: true,
        sizes: product.sizes.map(s => ({ size: s.size, stock: s.stock }))
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-background">
            <div className="container-custom py-12 md:py-20">
                {/* Breadcrumbs */}
                <ScrollReveal direction="down">
                    <nav className="flex items-center space-x-2 text-[11px] font-semibold tracking-tight text-muted-foreground/60 mb-12 border-b pb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
                        <ChevronRight className="h-3 w-3 opacity-30" />
                        <Link href="/shop" className="hover:text-primary transition-colors">Boutique</Link>
                        <ChevronRight className="h-3 w-3 opacity-30" />
                        <Link href={`/shop?category=${productData.category}`} className="hover:text-primary transition-colors">{productData.category}</Link>
                        <ChevronRight className="h-3 w-3 opacity-30" />
                        <span className="text-foreground/80 font-bold">{productData.name}</span>
                    </nav>
                </ScrollReveal>

                {/* Main product experience */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32">
                    <div className="lg:col-span-7">
                        <ScrollReveal direction="left">
                            <ProductGallery images={productData.images} />
                        </ScrollReveal>
                    </div>
                    <div className="lg:col-span-5">
                        <ScrollReveal direction="right" delay={0.2}>
                            <ProductInfo product={productData} />
                        </ScrollReveal>
                    </div>
                </div>

                {/* Additional Content / Specs Section */}
                <ScrollReveal direction="up" className="pt-24 border-t border-muted/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold tracking-tight">Technologie Elite</h4>
                            <p className="text-sm text-muted-foreground font-medium leading-relaxed">Conçu avec les dernières innovations pour une agilité et performance supérieures.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold tracking-tight">Retour d'Énergie</h4>
                            <p className="text-sm text-muted-foreground font-medium leading-relaxed">Matériaux haute performance offrant une sensation de dynamisme sous le pied.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold tracking-tight">Mbor Store Service</h4>
                            <p className="text-sm text-muted-foreground font-medium leading-relaxed">Livraison express en 24h sur Dakar et service client disponible 7j/7.</p>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Related Products */}
                <div className="mt-32 pt-24 border-t">
                    <ScrollReveal direction="up">
                        <RelatedProducts />
                    </ScrollReveal>
                </div>
            </div>
        </div>
    )
}
