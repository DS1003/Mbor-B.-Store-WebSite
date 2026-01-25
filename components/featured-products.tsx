import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { getFeaturedProducts } from "@/lib/actions/public"

export async function FeaturedProducts() {
    const featuredProducts = await getFeaturedProducts()

    if (featuredProducts.length === 0) return null

    return (
        <section className="py-20 lg:py-32 bg-muted/20">
            <div className="container-custom">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 lg:mb-24">
                    <ScrollReveal direction="left" className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="h-px w-8 bg-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Incontournables</span>
                        </div>
                        <h2 className="font-heading text-4xl lg:text-6xl font-bold tracking-tight">
                            Les best-sellers
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal direction="right">
                        <Link
                            href="/shop"
                            className="group inline-flex items-center text-sm font-bold tracking-tight hover:text-primary transition-colors"
                        >
                            Voir toute la boutique <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
                    {featuredProducts.map((product, i) => (
                        <ScrollReveal key={product.id} delay={i * 0.1}>
                            <div className="h-full">
                                <ProductCard {...product} />
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function FeaturedProductsSkeleton() {
    return (
        <section className="py-20 lg:py-32 bg-muted/20">
            <div className="container-custom">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 lg:mb-24">
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 w-32 bg-muted rounded" />
                        <div className="h-12 w-64 bg-muted rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-[2.5rem]" />
                    ))}
                </div>
            </div>
        </section>
    )
}
