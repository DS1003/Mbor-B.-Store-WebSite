import * as React from "react"
import { ShopFilters } from "@/components/shop-filters"
import { ChevronDown, LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { ShopProductGrid, ShopProductGridSkeleton } from "@/components/shop-product-grid"
import { Suspense } from "react"

export default function ShopPage() {
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

                        {/* Product Grid - Streamed */}
                        <div className="lg:col-span-3">
                            {/* Mobile Filter Trigger */}
                            <div className="lg:hidden flex justify-between items-center mb-6">
                                <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold tracking-tight mr-4">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" /> Filtrer
                                </Button>
                            </div>

                            <Suspense fallback={<ShopProductGridSkeleton />}>
                                <ShopProductGrid />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

