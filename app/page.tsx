"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
    ArrowRight, Search, Star, MoveRight,
    ShieldCheck, Zap, Trophy, Play
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState(0)

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFD700] selection:text-black">
            <Navigation />

            <main>

                {/* 1. HERO: REDESIGNED WITH NEW ASSET & MARQUEE */}
                <section className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col justify-end pb-24 md:pb-12">
                    {/* Background Image - New Generated Asset */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/mbor-storefront.jpg"
                            alt="MBOR Store Front Point E"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Complex Gradient Overlay for Text Readability without Box */}
                        {/* Complex Gradient Overlay for Text Readability without Box */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                    </div>

                    <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col items-start text-left">
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 max-w-4xl">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-[2px] w-12 bg-[#FFD700]" />
                                <span className="text-white text-xs font-black uppercase tracking-[0.4em] drop-shadow-sm">Point E, Dakar</span>
                            </div>

                            <h1 className="text-7xl sm:text-8xl md:text-[9rem] font-black uppercase italic leading-[0.8] tracking-tighter text-white">
                                Authentique. <br />
                                <span className="text-[#FFD700] drop-shadow-sm">Premium.</span> <br />
                                À Vous.
                            </h1>

                            <p className="text-zinc-200 text-lg md:text-2xl font-bold leading-relaxed max-w-lg">
                                Le QG de la culture football. <br />
                                <span className="text-zinc-400 font-medium">Maillots officiels, rares sneakers & service d'élite.</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button size="lg" className="h-16 px-12 bg-[#FFD700] text-black hover:bg-white hover:text-black font-black uppercase tracking-[0.2em] text-sm rounded-none clip-diagonal transition-all shadow-2xl hover:shadow-white/20 hover:-translate-y-1">
                                    Explorer la Collection <ArrowRight className="ml-3 h-5 w-5" />
                                </Button>
                                <Link href="https://wa.me/221774272354" target="_blank">
                                    <Button size="lg" variant="outline" className="h-16 px-12 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black hover:border-white font-black uppercase tracking-[0.2em] text-sm rounded-none clip-diagonal transition-all">
                                        Visiter le Showroom
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Marquee Strip */}
                    <div className="absolute bottom-0 left-0 w-full bg-black py-3 z-20 overflow-hidden transform rotate-0 origin-bottom-left">
                        <div className="animate-marquee whitespace-nowrap flex gap-8">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex items-center gap-8 min-w-max">
                                    <span className="text-white text-xs font-black uppercase tracking-[0.3em]">MBOR BUSINESS STORE</span>
                                    <Star className="h-3 w-3 text-[#FFD700] fill-[#FFD700]" />
                                    <span className="text-white/70 text-xs font-black uppercase tracking-[0.3em]">EST. 2025</span>
                                    <Star className="h-3 w-3 text-[#FFD700] fill-[#FFD700]" />
                                    <span className="text-white text-xs font-black uppercase tracking-[0.3em]">DAKAR PREMIUM</span>
                                    <Star className="h-3 w-3 text-[#FFD700] fill-[#FFD700]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. CATEGORY BENTO GRID - DARK MODE */}
                <section className="py-24 bg-zinc-950 relative">
                    <div className="container mx-auto px-6 lg:px-12 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div>
                                <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-2 text-white">
                                    La <span className="text-transparent text-stroke-white">Collection</span>
                                </h2>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Inventaire Authentique Vérifié</p>
                            </div>
                            <Link href="/shop" className="text-xs font-black uppercase tracking-widest border-b-2 border-white pb-1 hover:text-[#FFD700] hover:border-[#FFD700] transition-colors text-white">
                                Voir Toutes les Catégories
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
                            {/* Main Feature - Jerseys */}
                            <div className="md:col-span-6 lg:col-span-5 h-[400px] md:h-full relative group overflow-hidden rounded-[2rem] cursor-pointer bg-zinc-900 shadow-sm border border-zinc-900">
                                <Image src="/football-jersey-collection.jpg" alt="Jerseys" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-8 left-8">
                                    <h3 className="text-white text-4xl font-black italic uppercase mb-2">Maillots</h3>
                                    <Button className="rounded-full bg-white text-black hover:bg-[#FFD700] font-bold border-none">Acheter Maillots</Button>
                                </div>
                            </div>

                            {/* Hub */}
                            <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-6 h-full">
                                <div className="flex-1 h-[280px] md:h-auto relative group overflow-hidden rounded-[2rem] cursor-pointer bg-white shadow-sm border border-zinc-100">
                                    <Image src="/premium-sneakers-and-jordans.jpg" alt="Sneakers" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl">
                                        <h3 className="text-black text-2xl font-black italic uppercase">Sneakers</h3>
                                    </div>
                                </div>
                                <div className="flex-1 h-[280px] md:h-auto relative group overflow-hidden rounded-[2rem] cursor-pointer bg-black">
                                    <Image src="/streetwear-collection-urban-fashion.jpg" alt="Streetwear" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-black italic uppercase">Streetwear</h3>
                                    </div>
                                </div>
                            </div>

                            {/* End */}
                            <div className="md:col-span-12 lg:col-span-3 h-[250px] md:h-full relative group overflow-hidden rounded-[2rem] cursor-pointer bg-[#FFD700] flex items-center justify-center">
                                <Image src="/football-boots-crampons.jpg" alt="Boots" fill className="object-cover mix-blend-multiply opacity-20 group-hover:opacity-10 transition-opacity" />
                                <h3 className="relative z-10 text-black text-5xl font-black italic uppercase md:-rotate-90">Crampons</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. LATEST DROPS SLIDER - DARK MODE */}
                <section className="py-24 bg-black text-white">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="bg-zinc-900 p-3 rounded-full">
                                <Zap className="h-6 w-6 text-white fill-current" />
                            </div>
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Nouveaux <span className="text-[#FFD700]">Arrivages</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { name: "Real Madrid 24/25", type: "Maillot Domicile", price: "45,000 FCFA", img: "/football-jersey-collection.jpg" },
                                { name: "Mercurial Superfly", type: "Elite FG", price: "120,000 FCFA", img: "/football-boots-crampons.jpg" },
                                { name: "Jordan 1 High", type: "Chicago", price: "150,000 FCFA", img: "/premium-sneakers-and-jordans.jpg" },
                                { name: "PSG Training", type: "Haut d'Entraînement", price: "35,000 FCFA", img: "/streetwear-collection-urban-fashion.jpg" },
                            ].map((item, i) => (
                                <div key={i} className="group relative bg-zinc-900 rounded-[2rem] overflow-hidden hover:shadow-xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-zinc-800">
                                    <div className="relative aspect-[4/5] bg-zinc-900 p-8 flex items-center justify-center">
                                        <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 relative">
                                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">{item.type}</p>
                                        <h3 className="text-xl font-bold italic mb-3 group-hover:text-[#FFD700] transition-colors">{item.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-black">{item.price}</span>
                                            <button className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FFD700] hover:text-black transition-colors">
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. BRAND STATEMENT - GOLD LIGHT */}
                <section className="relative py-32 bg-[#FFD700] overflow-hidden">
                    <div className="container mx-auto px-6 text-center space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 border-2 border-black px-6 py-2 rounded-full mb-4 bg-white/20 backdrop-blur-sm">
                            <Trophy className="h-5 w-5" />
                            <span className="font-black uppercase tracking-widest text-xs">Qualité Garantie</span>
                        </div>
                        <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter text-black leading-none">
                            SOYEZ <span className="text-white drop-shadow-sm">EXCLUSIF.</span> <br /> SOYEZ <span className="text-white drop-shadow-sm">VOUS.</span>
                        </h2>
                    </div>

                    {/* Texture */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <Image src="/mbor-storefront.jpg" alt="texture" fill className="object-cover grayscale" />
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    )
}
