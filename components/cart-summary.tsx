import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"

export function CartSummary() {
  const subtotal = 268
  const shipping = 0
  const tax = 26.8
  const total = subtotal + shipping + tax

  return (
    <div className="bg-background border border-border p-8 lg:p-10 rounded-[2.5rem] shadow-xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="space-y-1">
        <h3 className="text-2xl font-black uppercase italic tracking-tight">Résumé</h3>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Vérifiez le total de votre commande</p>
      </div>

      {/* Promo Code */}
      <div className="space-y-3">
        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Code Promo</Label>
        <div className="flex gap-2">
          <Input placeholder="Entrer code" className="h-12 bg-secondary/5 border-border rounded-xl focus:ring-primary font-bold placeholder:opacity-30 text-sm" />
          <Button variant="outline" className="h-12 px-6 border-border rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-foreground hover:text-background transition-all shrink-0">Appliquer</Button>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border/50">
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-muted-foreground uppercase tracking-widest text-[11px]">Sous-total</span>
          <span className="font-black tabular-nums font-italic text-lg">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-muted-foreground uppercase tracking-widest text-[11px]">Livraison</span>
          <span className="font-black text-primary uppercase text-sm">Gratuit</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-muted-foreground uppercase tracking-widest text-[11px]">Taxes Estimées</span>
          <span className="font-black tabular-nums font-italic text-lg">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Estimé</p>
            <p className="text-sm font-bold text-muted-foreground italic leading-none mt-1">Taxes Incluses</p>
          </div>
          <span className="text-4xl font-black italic tabular-nums text-foreground">${total.toFixed(2)}</span>
        </div>

        <div className="space-y-4">
          <Button className="w-full h-16 rounded-2xl bg-foreground text-background hover:bg-primary transition-all relative overflow-hidden group shadow-lg" size="lg" asChild>
            <Link href="/checkout" className="flex items-center justify-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] relative z-10 flex items-center">
                Paiement Sécurisé <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </span>
            </Link>
          </Button>

          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <Lock className="h-3 w-3" />
            <span>Paiement Sécurisé SSL Chiffré</span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Label } from "@/components/ui/label"
