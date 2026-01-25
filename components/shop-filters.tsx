"use client"

import * as React from "react"
import { Check, SlidersHorizontal, X, Search } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ShopFiltersProps {
    availableCategories: string[]
    initialCategory?: string
}

export function ShopFilters({ availableCategories = [], initialCategory }: ShopFiltersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const categories = availableCategories.length > 0 ? availableCategories : [
        "Maillots", "Sneakers", "Lifestyle", "Crampons", "Équipements", "Flocage"
    ]

    const sizes = ["S", "M", "L", "XL", "XXL", "38", "39", "40", "41", "42", "43", "44"]

    const priceRanges = [
        { label: "0 - 25k FCFA", min: "0", max: "25000" },
        { label: "25k - 50k FCFA", min: "25000", max: "50000" },
        { label: "50k - 100k FCFA", min: "50000", max: "100000" },
        { label: "100k FCFA+", min: "100000", max: "" },
    ]

    const updateFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    const clearFilters = () => {
        router.push(pathname)
    }

    const currentCat = searchParams.get("category") || initialCategory
    const currentSize = searchParams.get("size")
    const currentMin = searchParams.get("minPrice")
    const currentQuery = searchParams.get("query") || ""

    const [searchValue, setSearchValue] = React.useState(currentQuery)

    // Update search value if URL changes
    React.useEffect(() => {
        setSearchValue(currentQuery)
    }, [currentQuery])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        updateFilter("query", searchValue || null)
    }

    return (
        <div className="space-y-12">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Chercher..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 bg-muted/20 border-2 border-transparent focus:border-primary/20 focus:bg-background rounded-2xl text-sm font-bold tracking-tight transition-all outline-none"
                />
            </form>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-foreground">
                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                    <h3 className="font-heading text-xl font-bold tracking-tight uppercase">Filtrer</h3>
                </div>
                {(currentCat || currentSize || currentMin) && (
                    <button
                        onClick={clearFilters}
                        className="text-[10px] font-black uppercase text-primary hover:text-foreground transition-colors flex items-center gap-1"
                    >
                        <X className="h-3 w-3" />
                        Effacer
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <div className="space-y-6">
                <h4 className="text-[11px] font-black tracking-[0.2em] text-muted-foreground/60 uppercase">Catégories</h4>
                <div className="space-y-3">
                    {/* All (Tout) Filter */}
                    <button
                        onClick={() => updateFilter("category", null)}
                        className="flex items-center space-x-3 w-full group text-left"
                    >
                        <div className={cn(
                            "h-5 w-5 border-2 rounded-lg flex items-center justify-center transition-all duration-300",
                            (!currentCat && !initialCategory) ? "bg-primary border-primary shadow-lg shadow-primary/20" : "bg-muted/30 border-muted/60 group-hover:border-primary/50"
                        )}>
                            {(!currentCat && !initialCategory) && <Check className="h-3 w-3 text-black font-bold" />}
                        </div>
                        <span className={cn(
                            "text-sm font-bold tracking-tight transition-colors duration-300",
                            (!currentCat && !initialCategory) ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
                        )}>
                            Tout
                        </span>
                    </button>

                    {categories.map((item) => (
                        <button
                            key={item}
                            onClick={() => updateFilter("category", currentCat?.toLowerCase() === item.toLowerCase() ? null : item)}
                            className="flex items-center space-x-3 w-full group text-left"
                        >
                            <div className={cn(
                                "h-5 w-5 border-2 rounded-lg flex items-center justify-center transition-all duration-300",
                                currentCat?.toLowerCase() === item.toLowerCase() ? "bg-primary border-primary shadow-lg shadow-primary/20" : "bg-muted/30 border-muted/60 group-hover:border-primary/50"
                            )}>
                                {currentCat?.toLowerCase() === item.toLowerCase() && <Check className="h-3 w-3 text-black font-bold" />}
                            </div>
                            <span className={cn(
                                "text-sm font-bold tracking-tight transition-colors duration-300",
                                currentCat?.toLowerCase() === item.toLowerCase() ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
                            )}>
                                {item}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-6">
                <h4 className="text-[11px] font-black tracking-[0.2em] text-muted-foreground/60 uppercase">Tailles</h4>
                <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => updateFilter("size", currentSize === size ? null : size)}
                            className={cn(
                                "h-11 flex items-center justify-center text-[12px] font-bold transition-all duration-300 rounded-xl border-2",
                                currentSize === size
                                    ? "bg-primary border-primary text-black shadow-lg shadow-primary/20 scale-95"
                                    : "bg-muted/20 border-transparent hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-6">
                <h4 className="text-[11px] font-black tracking-[0.2em] text-muted-foreground/60 uppercase">Budget</h4>
                <div className="space-y-3">
                    {priceRanges.map((range) => (
                        <button
                            key={range.label}
                            onClick={() => {
                                const params = new URLSearchParams(searchParams.toString())
                                if (currentMin === range.min) {
                                    params.delete("minPrice")
                                    params.delete("maxPrice")
                                } else {
                                    params.set("minPrice", range.min)
                                    if (range.max) params.set("maxPrice", range.max)
                                    else params.delete("maxPrice")
                                }
                                router.push(`${pathname}?${params.toString()}`)
                            }}
                            className="flex items-center space-x-3 w-full group text-left"
                        >
                            <div className={cn(
                                "h-5 w-5 border-2 rounded-full flex items-center justify-center transition-all duration-300",
                                currentMin === range.min ? "bg-primary border-primary shadow-lg shadow-primary/20" : "bg-muted/30 border-muted/60 group-hover:border-primary/50"
                            )}>
                                {currentMin === range.min && <div className="h-2 w-2 rounded-full bg-black" />}
                            </div>
                            <span className={cn(
                                "text-sm font-bold tracking-tight transition-colors duration-300",
                                currentMin === range.min ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
                            )}>
                                {range.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Premium Badge */}
            <div className="pt-8 border-t border-muted/60">
                <div className="bg-black p-6 rounded-[2rem] text-center space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">Premium Access</p>
                    <p className="text-white text-xs font-medium leading-relaxed">Devenez membre pour des réductions exclusives.</p>
                    <Button variant="outline" className="w-full h-10 rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] font-black uppercase transition-all">
                        S'inscrire
                    </Button>
                </div>
            </div>
        </div>
    )
}

