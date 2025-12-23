"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import { ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFD700] selection:text-black">
      <Navigation />

      <main className="flex-1 py-12 lg:py-24 pt-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1440px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-800 pb-8">
            <div className="space-y-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors group"
              >
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Continuer vos Achats
              </Link>
              <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
                Votre <span className="text-transparent text-stroke-white">Panier.</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 text-white bg-zinc-900 px-4 py-2 rounded-full">
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-widest">3 Articles</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-zinc-950 border border-zinc-800 rounded-[2rem] p-6 md:p-10">
                <CartItems />
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-xl">
                <h2 className="text-xl font-black uppercase italic tracking-tighter mb-8 text-white">Résumé</h2>
                <CartSummary />
              </div>

              <div className="bg-black border border-zinc-800 rounded-2xl p-6 flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-[#FFD700]" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Paiement Sécurisé</h4>
                  <p className="text-[10px] text-zinc-400 font-medium">Protocole de transaction chiffré et vérifié.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
