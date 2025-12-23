"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ShopFilters } from "@/components/shop-filters"
import { Button } from "@/components/ui/button"
import { Filter, ChevronRight, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function ShopPage() {
    const [filtersOpen, setFiltersOpen] = useState(false)

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FFD700] selection:text-black">
            <Navigation />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1440px]">
                    {/* Header Block */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-zinc-200 pb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                                <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
                                <ChevronRight className="h-3 w-3" />
                                <span className="text-black">Boutique</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black">
                                L'<span className="text-transparent text-stroke hover:text-[#FFD700] transition-colors">Inventaire</span>
                            </h1>
                            <p className="text-zinc-500 text-sm md:text-base max-w-md font-medium">
                                Explorez notre collection de vêtements de sport d'élite, sneakers limitées et maillots authentiques.
                            </p>
                        </div>

                        <div className="flex gap-4 md:hidden">
                            <Button
                                variant="outline"
                                className="flex-1 bg-zinc-50 border-zinc-200 text-black hover:bg-black hover:text-white font-bold uppercase tracking-widest text-xs h-12"
                                onClick={() => setFiltersOpen(true)}
                            >
                                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filtres
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 bg-zinc-50 border-zinc-200 text-black hover:bg-black hover:text-white font-bold uppercase tracking-widest text-xs h-12"
                            >
                                <ArrowDownWideNarrow className="mr-2 h-4 w-4" /> Trier
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-start relative">
                        {/* Sidebar - Desktop Sticky / Mobile Drawer */}
                        <aside className={cn(
                            "lg:w-72 shrink-0 transition-all duration-300 z-40",
                            filtersOpen
                                ? "fixed inset-0 bg-white p-6 overflow-y-auto animate-in slide-in-from-left-full lg:static lg:bg-transparent lg:p-0 lg:block lg:animate-none border-r border-zinc-100"
                                : "hidden lg:block lg:sticky lg:top-32"
                        )}>
                            <div className="lg:hidden flex justify-between items-center mb-8 pb-4 border-b border-zinc-100">
                                <h2 className="text-2xl font-black uppercase italic">Filtres</h2>
                                <Button variant="ghost" onClick={() => setFiltersOpen(false)}>Fermer</Button>
                            </div>

                            <div className="text-black">
                                <ShopFilters />
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="flex-1 w-full">
                            {/* Desktop Sort Bar */}
                            <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
                                <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Affichage de 24 sur 120 Articles</span>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-black uppercase tracking-widest">Trier Par:</span>
                                    <select className="bg-transparent text-black text-xs font-bold uppercase tracking-widest h-10 px-4 rounded-md focus:ring-0 outline-none cursor-pointer border-none hover:bg-zinc-50">
                                        <option>Nouveautés</option>
                                        <option>Prix : Croissant</option>
                                        <option>Prix : Décroissant</option>
                                        <option>Meilleures Ventes</option>
                                    </select>
                                </div>
                            </div>

                            {/* Products */}
                            <ProductGrid />

                            {/* Load More */}
                            <div className="mt-20 text-center">
                                <Button variant="outline" className="h-14 px-12 bg-white border-black text-black hover:bg-black hover:text-white font-black uppercase tracking-widest text-xs rounded-none clip-diagonal transition-all">
                                    Charger Plus d'Articles
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
