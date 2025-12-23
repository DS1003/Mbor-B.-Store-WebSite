"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { useState } from "react"

const MOCK_CART_ITEMS = [
  {
    id: 1,
    name: "Premium Football Jersey",
    category: "Jerseys",
    price: 89,
    size: "L",
    quantity: 1,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Air Jordan Sneakers",
    category: "Sneakers",
    price: 179,
    size: "42",
    quantity: 1,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export function CartItems() {
  const [items, setItems] = useState(MOCK_CART_ITEMS)

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)))
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  if (items.length === 0) {
    return (
      <div className="py-24 px-10 text-center bg-secondary/5 rounded-[3rem] border border-border border-dashed animate-in fade-in zoom-in-95 duration-700">
        <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-8 border border-border">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="space-y-4 max-w-sm mx-auto">
          <h2 className="text-3xl font-black uppercase italic tracking-tight">Votre panier est vide</h2>
          <p className="text-muted-foreground font-medium text-sm leading-relaxed">
            On dirait que vous n'avez rien ajouté à votre panier pour le moment. Découvrez nos dernières nouveautés et trouvez votre prochaine pièce préférée.
          </p>
          <div className="pt-6">
            <Button asChild className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-primary transition-all font-bold uppercase tracking-widest text-xs">
              <Link href="/shop">Commencer vos Achats</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-black uppercase italic tracking-tight">Votre Panier ({items.length})</h2>
        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-red-500" onClick={() => setItems([])}>
          Tout Vider
        </Button>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="group relative flex flex-col md:flex-row gap-8 p-6 md:p-8 bg-background border border-border rounded-[2rem] hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
            {/* Image Area */}
            <div className="relative aspect-square w-full md:w-48 overflow-hidden rounded-2xl bg-secondary/5 border border-border group-hover:scale-[1.02] transition-transform duration-500">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>

            {/* Content Area */}
            <div className="flex flex-1 flex-col justify-between py-1">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{item.category}</p>
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-2xl font-black uppercase italic group-hover:text-primary transition-colors leading-tight">{item.name}</h3>
                  </Link>
                  <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground pt-1">
                    <span className="px-3 py-1 bg-secondary/10 rounded-full border border-border">Taille : {item.size}</span>
                    <span className="px-3 py-1 bg-secondary/10 rounded-full border border-border underline">Modifier</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-2xl font-black italic tabular-nums text-foreground">${item.price * item.quantity}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">${item.price} / unité</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-10">
                {/* Quantity Controls */}
                <div className="flex items-center bg-secondary/5 border border-border rounded-xl p-1 shadow-sm">
                  <button
                    className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-background transition-all"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-black tabular-nums">{item.quantity}</span>
                  <button
                    className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-background transition-all"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-3 text-muted-foreground hover:text-red-500 transition-colors group/trash"
                >
                  <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
