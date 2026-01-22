"use client"

import * as React from "react"
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export function ShopFilters() {
    const categories = [
        "Maillots", "Sneakers", "Lifestyle", "Crampons", "Équipements", "Flocage"
    ]

    const sizes = ["S", "M", "L", "XL", "XXL", "38", "39", "40", "41", "42", "43", "44"]

    const priceRanges = [
        { label: "0 - 25,000 FCFA", value: "0-25000" },
        { label: "25,000 - 50,000 FCFA", value: "25000-50000" },
        { label: "50,000 - 100,000 FCFA", value: "50000-100000" },
        { label: "100,000 FCFA+", value: "100000+" },
    ]

    return (
        <div className="space-y-12">
            <div className="flex items-center space-x-3 text-foreground">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-xl font-bold tracking-tight">Filtrer</h3>
            </div>

            {/* Category Filter */}
            <div className="space-y-5">
                <h4 className="text-[11px] font-bold tracking-tight text-muted-foreground/60">CATÉGORIES</h4>
                <div className="space-y-3">
                    {categories.map((item) => (
                        <label key={item} className="flex items-center space-x-3 cursor-pointer group">
                            <div className="h-5 w-5 border rounded-md flex items-center justify-center transition-all bg-muted/30 group-hover:border-primary group-hover:bg-primary/5">
                                {/* Simulated checkbox */}
                            </div>
                            <span className="text-sm font-semibold tracking-tight text-foreground/70 group-hover:text-primary transition-colors">
                                {item}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-5">
                <h4 className="text-[11px] font-bold tracking-tight text-muted-foreground/60">TAILLES</h4>
                <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            className="h-11 flex items-center justify-center border border-muted text-[12px] font-bold hover:border-primary hover:text-primary transition-all rounded-xl"
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-5">
                <h4 className="text-[11px] font-bold tracking-tight text-muted-foreground/60">PRIX</h4>
                <div className="space-y-3">
                    {priceRanges.map((range) => (
                        <label key={range.value} className="flex items-center space-x-3 cursor-pointer group">
                            <div className="h-5 w-5 border-2 border-muted rounded-full flex items-center justify-center transition-all group-hover:border-primary">
                                {/* Simulated radio */}
                            </div>
                            <span className="text-sm font-semibold tracking-tight text-foreground/70 group-hover:text-primary transition-colors">
                                {range.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}
