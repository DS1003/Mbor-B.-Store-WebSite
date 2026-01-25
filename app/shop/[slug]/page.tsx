import * as React from "react"
import { ShopFilters } from "@/components/shop-filters"
import { ChevronDown, SlidersHorizontal, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { ShopProductGrid, ShopProductGridSkeleton } from "@/components/shop-product-grid"
import { Suspense } from "react"
import Link from "next/link"
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
import { cn } from "@/lib/utils"

interface CategoryPageProps {
    params: Promise<{
        slug: string
    }>
    searchParams: Promise<{
        category?: string
        size?: string
        minPrice?: string
        maxPrice?: string
        sort?: string
        view?: "grid" | "list"
    }>
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { slug } = await params
    const sParams = await searchParams

    // Capitalize first letter for display/query
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)

    // Effective params: prioritize URL search param, fallback to slug
    const effectiveParams = {
        ...sParams,
        category: sParams.category || categoryName
    }

    const currentSort = effectiveParams.sort || "newest"

    const sortOptions = [
        { label: "Nouveautés", value: "newest" },
        { label: "Prix croissant", value: "price_asc" },
        { label: "Prix décroissant", value: "price_desc" },
        { label: "Plus anciens", value: "oldest" },
    ]

    const activeSortLabel = sortOptions.find(opt => opt.value === currentSort)?.label

    const categories = await getCategories()

    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            {/* Category Banner */}
            <div className="relative h-[30vh] md:h-[40vh] bg-black overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-black/60 to-black z-10" />
                {/* Optional: Add a dynamic background image here based on category if available */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0 bg-[url('https://www.foot.fr/img/blocks/107_1_img_background_lg.jpg')] bg-cover bg-center grayscale" />
                </div>

                <div className="container-custom relative z-20 text-center space-y-4">
                    <ScrollReveal direction="down">
                        <div className="flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
                            <span>Store</span>
                            <ArrowRight className="h-2.5 w-2.5" />
                            <span className="text-white">Collection</span>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <h1 className="font-heading text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white">
                            {categoryName}
                        </h1>
                    </ScrollReveal>
                </div>
            </div>

            <div className="container-custom py-16 md:py-24">
                <div className="flex flex-col space-y-12">
                    {/* Controls Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-muted/60">
                        <ScrollReveal direction="left">
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                Exploration <span className="text-foreground">{categoryName}</span>
                            </p>
                        </ScrollReveal>

                        <ScrollReveal direction="right" className="flex items-center space-x-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[12px] font-black uppercase tracking-widest border-muted/80 hover:bg-muted/20 group">
                                        <span>Trier : {activeSortLabel}</span>
                                        <ChevronDown className="ml-3 h-4 w-4 text-primary transition-transform group-data-[state=open]:rotate-180" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 bg-white/80 backdrop-blur-xl border-muted/60 shadow-2xl">
                                    {sortOptions.map((opt) => (
                                        <DropdownMenuItem key={opt.value} asChild>
                                            <Link
                                                href={{ query: { ...sParams, sort: opt.value } }}
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
                                <ShopFilters availableCategories={categories} initialCategory={categoryName} />
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
                                            <ShopFilters availableCategories={categories} initialCategory={categoryName} />
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>

                            <Suspense key={JSON.stringify(effectiveParams)} fallback={<ShopProductGridSkeleton />}>
                                <ShopProductGrid searchParams={effectiveParams} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
