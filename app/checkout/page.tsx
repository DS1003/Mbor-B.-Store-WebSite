"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { CheckoutSummary } from "@/components/checkout-summary"
import { ShieldCheck, Lock, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 lg:py-20">
        <div className="container mx-auto px-6 max-w-[1400px]">
          {/* Page Header */}
          <div className="mb-12">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Retour au Panier
            </Link>
            <div className="flex items-center justify-between gap-8 flex-wrap">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Paiement</h1>
                <p className="text-muted-foreground text-sm">Finalisez votre achat en toute sécurité.</p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100 text-[11px] font-bold uppercase tracking-widest">
                <Lock className="h-3 w-3" />
                Paiement Sécurisé SSL
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-background border border-border rounded-[2.5rem] p-8 lg:p-12 shadow-sm">
                <CheckoutForm />
              </div>
            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
              <div className="bg-background border border-border rounded-[2.5rem] p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Vérifier la Commande</h2>
                <CheckoutSummary />
              </div>

              {/* Trust Badge */}
              <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] flex items-start gap-5 shadow-xl relative overflow-hidden group">
                <div className="relative z-10 h-10 w-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="relative z-10 space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Protection Acheteur</p>
                  <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                    Profitez de la tranquillité d'esprit avec notre garantie de remboursement à 100% si votre commande ne correspond pas à la description.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
