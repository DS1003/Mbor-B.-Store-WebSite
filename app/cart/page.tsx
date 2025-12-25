"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import { ArrowLeft, ShoppingBag, ShieldCheck, Lock as LockIcon } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  return (
    <div
      className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-[#FFD700] selection:text-black"
      style={{
        "--background": "0 0% 100%",
        "--foreground": "240 10% 3.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "240 10% 3.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "240 10% 3.9%",
        "--primary": "240 5.9% 10%",
        "--primary-foreground": "0 0% 98%",
        "--secondary": "240 4.8% 95.9%",
        "--secondary-foreground": "240 5.9% 10%",
        "--muted": "240 4.8% 95.9%",
        "--muted-foreground": "240 3.8% 46.1%",
        "--accent": "240 4.8% 95.9%",
        "--accent-foreground": "240 5.9% 10%",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "0 0% 98%",
        "--border": "240 5.9% 90%",
        "--input": "240 5.9% 90%",
        "--ring": "240 5.9% 10%",
      } as React.CSSProperties}
    >
      <Navigation />

      <main className="flex-1 py-12 lg:py-24 pt-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1440px]">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-zinc-100 pb-12">
            <div className="space-y-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-black transition-all group"
              >
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-2" />
                RETOUR À LA BOUTIQUE
              </Link>
              <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
                VOTRE <span className="text-transparent text-stroke-black opacity-30">PANIER_</span>
              </h1>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Authentic Inventory</p>
              <div className="flex items-center gap-3 text-black bg-white border border-zinc-100 shadow-sm px-6 py-3 rounded-2xl">
                <ShoppingBag className="h-5 w-5 text-[#FFD700]" />
                <span className="text-sm font-black uppercase tracking-widest tabular-nums">3 ARTICLES</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-10">
              <div className="bg-white border border-zinc-100 rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
                <CartItems />
              </div>

              {/* Trust badges for light mode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-3xl flex items-start gap-4">
                  <ShieldCheck className="h-6 w-6 text-[#FFD700] shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-black mb-1">Qualité Élite</p>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase leading-tight">Produits 100% Authentifiés</p>
                  </div>
                </div>
                <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-3xl flex items-start gap-4">
                  <ShoppingBag className="h-6 w-6 text-[#FFD700] shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-black mb-1">Livraison Express</p>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase leading-tight">Dakar en moins de 24H</p>
                  </div>
                </div>
                <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-3xl flex items-start gap-4">
                  <LockIcon className="h-6 w-6 text-[#FFD700] shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-black mb-1">SSL Sécurisé</p>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase leading-tight">Transactions Chiffrées</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
              <div className="bg-white border border-zinc-100 rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-1 bg-[#FFD700] rounded-full" />
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter text-black">RÉSUMÉ</h2>
                </div>
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
