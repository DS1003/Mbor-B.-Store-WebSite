import * as React from "react"
import { ProductCard } from "@/components/product-card"
import { ShopFilters } from "@/components/shop-filters"
import { ChevronDown, LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"

export default async function ShopPage() {
    const productsFromDb = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    })

    const products = productsFromDb.map(p => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        category: p.category?.name || "Sans catégorie",
        image: p.images[0] || "/placeholder.svg",
        isNew: true // Simplified for seed data
    }))

    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <div className="container-custom py-16 md:py-24">
                <div className="flex flex-col space-y-12">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b">
                        <div className="space-y-4">
                            <ScrollReveal direction="left">
                                <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight leading-none">
                                    Catalogue <span className="text-primary">Mbor Store</span>
                                </h1>
                            </ScrollReveal>
                            <ScrollReveal direction="left" delay={0.1}>
                                <p className="text-muted-foreground font-medium text-lg max-w-xl">
                                    L'excellence du football et du streetwear sélectionnée pour vous.
                                </p>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal direction="right" className="flex items-center space-x-4">
                            <div className="hidden sm:flex items-center bg-muted/50 p-1 rounded-xl">
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-background shadow-sm">
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground">
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button variant="outline" className="h-12 px-6 rounded-xl text-[13px] font-bold tracking-tight border-muted hover:bg-muted group">
                                <span>Trier : Nouveautés</span>
                                <ChevronDown className="ml-2 h-4 w-4 text-primary transition-transform group-hover:translate-y-0.5" />
                            </Button>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:items-start">
                        {/* Filters Sidebar */}
                        <aside className="hidden lg:block lg:sticky lg:top-32 h-fit">
                            <ScrollReveal direction="left">
                                <ShopFilters />
                            </ScrollReveal>
                        </aside>

                        {/* Product Grid */}
                        <div className="lg:col-span-3 space-y-20">
                            {/* Mobile Filter Trigger */}
                            <div className="lg:hidden flex justify-between items-center mb-6">
                                <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold tracking-tight mr-4">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" /> Filtrer
                                </Button>
                                <p className="text-sm font-medium text-muted-foreground">{products.length} produits</p>
                            </div>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                                {products.map((product, i) => (
                                    <ScrollReveal key={product.id} delay={i * 0.05}>
                                        <ProductCard {...product} />
                                    </ScrollReveal>
                                ))}
                            </div>

                            {/* Load More */}
                            <div className="flex justify-center pt-12">
                                <ScrollReveal direction="up">
                                    <Button variant="outline" className="h-14 px-12 rounded-2xl text-[13px] font-bold tracking-tight border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-95 shadow-md">
                                        Charger plus de produits
                                    </Button>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
