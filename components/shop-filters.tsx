"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function ShopFilters() {
  const [priceRange, setPriceRange] = useState([0, 500])

  const categories = ["Maillots", "Sneakers", "Crampons", "Streetwear", "Accessoires"]
  const brands = ["Nike", "Adidas", "Puma", "Jordan", "Under Armour"]

  return (
    <div className="space-y-10">
      {/* Sort By */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900">Trier Par</h3>
        <RadioGroup defaultValue="newest" className="space-y-4">
          {[
            { id: "newest", label: "Nouveautés" },
            { id: "popular", label: "Plus Populaires" },
            { id: "low", label: "Prix : Croissant" },
            { id: "high", label: "Prix : Décroissant" }
          ].map((option) => (
            <div key={option.id} className="flex items-center space-x-3 group cursor-pointer">
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="border-zinc-300 text-black w-4 h-4 data-[state=checked]:border-black data-[state=checked]:text-black"
              />
              <Label htmlFor={option.id} className="text-sm font-bold cursor-pointer text-zinc-500 group-hover:text-black transition-colors uppercase tracking-wide">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator className="bg-zinc-100" />

      {/* Category */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900">Catégorie</h3>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-3 group cursor-pointer">
              <Checkbox
                id={category}
                className="border-zinc-300 rounded-sm data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white transition-all"
              />
              <Label htmlFor={category} className="text-sm font-bold cursor-pointer text-zinc-500 group-hover:text-black transition-colors uppercase tracking-wide">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-zinc-100" />

      {/* Brand */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900">Marque</h3>
        <div className="space-y-4">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-3 group cursor-pointer">
              <Checkbox
                id={`brand-${brand}`}
                className="border-zinc-300 rounded-sm data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white transition-all"
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm font-bold cursor-pointer text-zinc-500 group-hover:text-black transition-colors uppercase tracking-wide">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-zinc-100" />

      {/* Price Range */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900">Fourchette de Prix</h3>
        <div className="px-1 pt-4">
          <Slider
            defaultValue={[0, 500]}
            max={500}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-6 cursor-pointer"
          />
          <div className="flex justify-between items-center">
            <div className="px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-md text-xs font-mono font-bold text-black">$ {priceRange[0]}</div>
            <div className="h-px w-4 bg-zinc-200" />
            <div className="px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-md text-xs font-mono font-bold text-black">$ {priceRange[1]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
