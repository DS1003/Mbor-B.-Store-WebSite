import * as React from "react"
import { ShopFilters } from "@/components/shop-filters"
import { ChevronDown, SlidersHorizontal, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { ShopProductGrid, ShopProductGridSkeleton } from "@/components/shop-product-grid"
import { Suspense } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { getCategories } from "@/lib/actions/public"

interface MaillotPageProps {
    searchParams: Promise<{
        category?: string
        size?: string
        minPrice?: string
        maxPrice?: string
        sort?: string
        view?: "grid" | "list"
    }>
}

export default async function MaillotPage({ searchParams }: MaillotPageProps) {
    const params = await searchParams
    const currentSort = params.sort || "newest"
    const currentView = params.view || "grid"

    const sortOptions = [
        { label: "Nouveautés", value: "newest" },
        { label: "Prix croissant", value: "price_asc" },
        { label: "Prix décroissant", value: "price_desc" },
        { label: "Plus anciens", value: "oldest" },
    ]

    const activeSortLabel = sortOptions.find(opt => opt.value === currentSort)?.label

    // Fetch category list for filters - specialized for maillots
    const allCategories = await getCategories()
    const categories = allCategories.filter(cat =>
        cat.toLowerCase().includes('maillot') ||
        cat.toLowerCase().includes('jersey') ||
        cat.toLowerCase().includes('équipe') ||
        cat.toLowerCase().includes('club') ||
        cat.toLowerCase().includes('nations')
    )

    // Active maillot filter by default for this page
    if (!params.category) {
        params.category = "Maillots"
    }

    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <div className="container-custom py-16 md:py-24">
                <div className="flex flex-col space-y-12">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-muted/60">
                        <div className="space-y-4">
                            <ScrollReveal direction="left">
                                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
                                    <span>Store</span>
                                    <ArrowRight className="h-2.5 w-2.5" />
                                    <span className="text-foreground">Maillots</span>
                                </div>
                                <h1 className="font-heading text-5xl md:text-8xl font-black uppercase italic tracking-tighter">
                                    MAILLOTS <span className="text-primary italic">ELITE</span>
                                </h1>
                            </ScrollReveal>
                            <ScrollReveal direction="left" delay={0.1}>
                                <p className="text-muted-foreground font-medium text-lg max-w-xl italic">
                                    Les maillots des plus grands clubs et équipes nationales pour l'élite du football.
                                </p>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal direction="right" className="flex items-center space-x-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="h-14 px-8 rounded-2xl text-[12px] font-black uppercase tracking-widest border-muted/80 hover:bg-muted/20 group">
                                        <span>Trier : {activeSortLabel}</span>
                                        <ChevronDown className="ml-3 h-4 w-4 text-primary transition-transform group-data-[state=open]:rotate-180" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 bg-white/80 backdrop-blur-xl border-muted/60 shadow-2xl">
                                    {sortOptions.map(opt => (
                                        <DropdownMenuItem key={opt.value} asChild>
                                            <Link
                                                href={{ query: { ...params, sort: opt.value } }}
                                                className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-sm font-bold tracking-tight transition-colors ${currentSort === opt.value ? "bg-primary/10 text-primary" : "hover:bg-muted/50"}`}
                                            >
                                                {opt.label}
                                                {currentSort === opt.value && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:items-start">
                        {/* Filters Sidebar */}
                        <aside className="hidden lg:block lg:sticky lg:top-32 h-fit bg-muted/5 p-8 rounded-[2.5rem] border border-muted/40 shadow-sm">
                            <ScrollReveal direction="left">
                                <ShopFilters availableCategories={categories} initialCategory="Maillots" />
                            </ScrollReveal>
                        </aside>

                        {/* Product Grid - Streamed */}
                        <div className="lg:col-span-3">
                            {/* Mobile Filter Trigger */}
                            <div className="lg:hidden flex justify-between items-center mb-8">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest bg-muted/20 border-muted/40 shadow-sm">
                                            <SlidersHorizontal className="mr-3 h-5 w-5 text-primary" /> Filtrer & Explorer
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-full sm:max-w-md p-0 bg-background border-r-0">
                                        <div className="h-full overflow-y-auto p-10">
                                            <SheetHeader className="mb-12">
                                                <SheetTitle className="font-heading text-4xl font-black italic tracking-tighter uppercase">
                                                    Mbor<span className="text-primary">.Filters</span>
                                                </SheetTitle>
                                            </SheetHeader>
                                            <ShopFilters availableCategories={categories} initialCategory="Maillots" />
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>

                            <Suspense key={JSON.stringify(params)} fallback={<ShopProductGridSkeleton />}>
                                <ShopProductGrid searchParams={params} categoryFilter="maillot" />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
