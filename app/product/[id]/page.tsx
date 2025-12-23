"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { RelatedProducts } from "@/components/related-products"
import { use, useState } from "react"
import { ArrowLeft, Share2, Heart, ShieldCheck, Globe, Truck, Check, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FFD700] selection:text-black">
      <Navigation />

      <main className="pt-32 pb-40">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1440px]">

          {/* REFINED BREADCRUMBS */}
          <nav className="flex items-center gap-2 mb-12 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
            <span className="opacity-30">/</span>
            <Link href="/shop" className="hover:text-black transition-colors">Boutique</Link>
            <span className="opacity-30">/</span>
            <span className="text-black">Détail_Produit</span>
          </nav>

          {/* PRODUCT LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-40">

            {/* GALLERY AREA */}
            <div className="lg:col-span-7 sticky top-40 animate-in fade-in slide-in-from-left-8 duration-700">
              <ProductGallery />
            </div>

            {/* PRODUCT INTEL */}
            <div className="lg:col-span-5 space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    En Stock
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">SKU: MBOR_{id.substring(0, 6).toUpperCase()}</p>
                </div>
                <ProductInfo productId={id} />
              </div>

              {/* DETAILS ACCORDION */}
              <div className="space-y-1 pt-8 border-t border-zinc-100">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="description" className="border-b border-zinc-100">
                    <AccordionTrigger className="text-xs font-black uppercase tracking-[0.2em] text-black hover:text-zinc-600 py-6 hover:no-underline">
                      Spécifications Techniques
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600 leading-relaxed font-medium text-sm pb-6">
                      <p className="mb-4">
                        Conçu pour la performance d'élite. Cet article dispose de matériaux anti-transpiration avancés et d'une coupe aérodynamique conçue pour le jeu moderne.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2"><Check className="h-3 w-3 text-black" /> Détails Authentiques de l'Équipe</li>
                        <li className="flex items-center gap-2"><Check className="h-3 w-3 text-black" /> Panneaux en Maille Respirante</li>
                        <li className="flex items-center gap-2"><Check className="h-3 w-3 text-black" /> Construction Durable</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="shipping" className="border-b border-zinc-100">
                    <AccordionTrigger className="text-xs font-black uppercase tracking-[0.2em] text-black hover:text-zinc-600 py-6 hover:no-underline">
                      Expédition & Livraison
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600 font-medium text-sm pb-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <Truck className="h-5 w-5 text-black mt-0.5" />
                        <div>
                          <p className="text-black font-bold">Livraison Nationale Gratuite</p>
                          <p className="text-xs mt-1">Sur les commandes de plus de 50 000 FCFA. Expédié depuis le Hub de Dakar.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="h-5 w-5 text-black mt-0.5" />
                        <div>
                          <p className="text-black font-bold">Garantie d'Authenticité</p>
                          <p className="text-xs mt-1">Protocole MBOR 2025 Vérifié. 100% Original.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* ACTION ROW */}
              <div className="flex items-center gap-8 pt-4">
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-all flex items-center gap-2 group">
                  <Heart className="h-4 w-4 group-hover:text-black group-hover:fill-black transition-all" /> Ajouter aux Favoris
                </button>
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-all flex items-center gap-2 group">
                  <Share2 className="h-4 w-4 group-hover:text-black transition-all" /> Partager le Produit
                </button>
              </div>
            </div>
          </div>

          {/* RELATED CURATION */}
          <div className="pt-24 border-t border-zinc-100">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black">
                  <Star className="h-4 w-4 fill-current" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Sélection / Similaire</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase text-black">
                  Articles <span className="text-transparent text-stroke-black hover:text-black transition-colors duration-500">Complémentaires</span>
                </h2>
              </div>
              <Link href="/shop" className="text-xs font-black uppercase tracking-widest border-b border-black pb-1 hover:text-zinc-600 hover:border-zinc-400 transition-all text-black">
                Voir Tout l'Archive
              </Link>
            </div>
            <RelatedProducts />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
