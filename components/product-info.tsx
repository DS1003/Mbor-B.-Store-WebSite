"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart, Plus, Minus, Ruler, ArrowRight, ShoppingBag
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const SIZES = ["S", "M", "L", "XL", "XXL"]
const COLORS = [
  { name: "Obsidienne", class: "bg-zinc-950" },
  { name: "Or", class: "bg-[#FFD700]" },
  { name: "Blanc", class: "bg-white border border-zinc-200" },
]

export function ProductInfo({ productId }: { productId: string }) {
  const [selectedSize, setSelectedSize] = useState("L")
  const [selectedColor, setSelectedColor] = useState("Obsidienne")
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] italic text-black uppercase">
          MBOR Elite <br className="hidden md:block" />
          <span className="text-transparent text-stroke-black hover:text-black transition-colors duration-300">Kit Performance</span>
        </h1>
        <div className="flex items-end gap-6">
          <span className="text-4xl font-black tracking-tighter text-black">$120.00</span>
          <span className="text-lg font-bold text-zinc-400 line-through tracking-tight mb-1">$150.00</span>
          <span className="mb-2 text-[10px] font-black uppercase tracking-widest text-black bg-[#FFD700] px-3 py-1 rounded-full">
            -20%
          </span>
        </div>
        <p className="text-zinc-600 font-medium leading-relaxed max-w-lg">
          Construction jour de match premium avec textures aérodynamiques et technologie anti-transpiration. Conçu pour les rues de Dakar et la scène mondiale.
        </p>
      </div>

      <div className="space-y-10 pt-8 border-t border-zinc-100">
        {/* COLOR */}
        <div className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 flex justify-between">
            Choisir Couleur / <span className="text-black">{selectedColor}</span>
          </label>
          <div className="flex gap-4">
            {COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={cn(
                  "relative h-12 w-12 rounded-full transition-all flex items-center justify-center border-2",
                  selectedColor === color.name ? "border-black scale-110" : "border-zinc-200 hover:border-black"
                )}
              >
                <div className={cn("h-8 w-8 rounded-full shadow-sm", color.class)} />
              </button>
            ))}
          </div>
        </div>

        {/* SIZES */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Sélection Taille</label>
            <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors flex items-center gap-2">
              <Ruler className="h-3 w-3" /> Guide des Tailles
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "h-12 min-w-[3.5rem] px-4 flex items-center justify-center text-xs font-black tracking-widest uppercase transition-all rounded-lg border",
                  selectedSize === size
                    ? "bg-black text-white border-black shadow-xl"
                    : "bg-white border-zinc-200 text-zinc-500 hover:border-black hover:text-black"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="space-y-6 pt-8 border-t border-zinc-100">
        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Commande</label>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Quantity */}
          <div className="flex items-center h-16 bg-zinc-50 rounded-lg px-6 gap-6 border border-zinc-200">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-zinc-400 hover:text-black transition-colors p-2">
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-base font-black w-4 text-center text-black">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="text-zinc-400 hover:text-black transition-colors p-2">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Add to Cart */}
          <Button size="lg" className="flex-1 h-16 rounded-lg bg-black text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-[#FFD700] hover:text-black shadow-xl transition-all group active:scale-95">
            Ajouter au Panier <ShoppingBag className="ml-3 h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  )
}
