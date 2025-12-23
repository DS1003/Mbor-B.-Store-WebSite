import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { ArrowRight, ShieldCheck, Truck } from "lucide-react"
import Link from "next/link"

const CART_ITEMS = [
  {
    id: 1,
    name: "Premium Football Jersey",
    size: "L",
    quantity: 1,
    price: 89,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Air Jordan Sneakers",
    size: "42",
    quantity: 1,
    price: 179,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function CheckoutSummary() {
  const subtotal = 268
  const shipping = 0
  const tax = 26.8
  const total = subtotal + shipping + tax

  return (
    <div className="bg-background border border-border p-8 lg:p-10 rounded-[2.5rem] shadow-xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="space-y-1">
        <h3 className="text-2xl font-black uppercase italic tracking-tight">Votre Commande</h3>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{CART_ITEMS.length} articles à livrer</p>
      </div>

      {/* Cart Items Summary */}
      <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
        {CART_ITEMS.map((item) => (
          <div key={item.id} className="flex gap-4 group">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-secondary/5 group-hover:scale-105 transition-transform duration-500">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="text-sm font-black uppercase italic truncate group-hover:text-primary transition-colors">{item.name}</h4>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                Taille : {item.size} <span className="mx-2 opacity-30">|</span> Qté : {item.quantity}
              </p>
              <p className="text-lg font-black italic tabular-nums text-foreground">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="bg-border/50" />

      {/* Price Breakdown */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          <span>Sous-total</span>
          <span className="text-lg font-black italic tabular-nums text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          <span>Livraison</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Calculé à la prochaine étape</span>
        </div>
        <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          <span>Taxes Estimées</span>
          <span className="text-lg font-black italic tabular-nums text-foreground">${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Total Display */}
      <div className="flex justify-between items-end">
        <div className="space-y-0.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Estimé</p>
          <p className="text-3xl font-black italic uppercase tracking-tighter">TOTAL</p>
        </div>
        <p className="text-3xl font-black italic tabular-nums text-primary">${total.toFixed(2)}</p>
      </div>

      <div className="space-y-4 pt-4">
        <Button className="w-full h-16 rounded-2xl bg-foreground text-background hover:bg-primary transition-all relative overflow-hidden group shadow-lg" asChild>
          <Link href="/checkout/success">
            <span className="text-xs font-black uppercase tracking-[0.2em] relative z-10 flex items-center justify-center">
              Finaliser la Commande <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
            </span>
          </Link>
        </Button>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Protocole de Paiement Chiffré</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <Truck className="h-4 w-4 text-primary" />
            <span>Expédition Mondiale Prioritaire Activée</span>
          </div>
        </div>
      </div>
    </div>
  )
}
