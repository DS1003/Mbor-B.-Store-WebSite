"use client"

import * as React from "react"
import {
    Heart,
    ShoppingBag,
    Trash2,
    ArrowRight,
    ChevronLeft
} from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import { Button } from "@/components/ui/button"

const wishlistItems = [
    { id: "1", name: "Nike Mercurial Vapor 16", price: 125000, image: "https://www.foot.fr/151284-large_default/nike-air-zoom-mercurial-vapor-16-pro-fg-bleu-rose.jpg", category: "Crampons" },
    { id: "2", name: "Maillot PSG 24/25 Home", price: 65000, image: "https://www.foot.fr/151284-large_default/nike-air-zoom-mercurial-vapor-16-pro-fg-bleu-rose.jpg", category: "Maillots" },
]

export default function WishlistPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <div className="container-custom py-20 px-4">
                <div className="max-w-6xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-2 border-muted pb-12">
                        <ScrollReveal direction="left">
                            <div className="space-y-4 text-left">
                                <Link href="/shop" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors mb-4">
                                    <ChevronLeft className="h-4 w-4 mr-1" /> Retour au shop
                                </Link>
                                <h1 className="font-heading text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                                    Mes <span className="text-primary italic">Favoris.</span>
                                </h1>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right" className="flex items-center space-x-6">
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Articles Sauvegardés</p>
                                <p className="text-3xl font-black italic tracking-tighter text-primary">{wishlistItems.length}</p>
                            </div>
                            <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary">
                                <Heart className="h-8 w-8 fill-current" />
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Grid */}
                    {wishlistItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {wishlistItems.map((item, i) => (
                                <ScrollReveal key={item.id} delay={i * 0.1}>
                                    <div className="group bg-card border-2 border-muted/50 rounded-[3rem] p-8 space-y-8 hover:shadow-2xl transition-all hover:border-primary/20">
                                        <div className="relative aspect-square rounded-[2rem] overflow-hidden border bg-muted">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <button className="absolute top-4 right-4 h-12 w-12 bg-white/90 dark:bg-black/90 rounded-2xl flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-xl">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{item.category}</span>
                                                <span className="text-lg font-black italic tracking-tighter tabular-nums">{item.price.toLocaleString()} F</span>
                                            </div>
                                            <h3 className="text-xl font-black uppercase italic tracking-tighter leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                        </div>
                                        <Magnetic>
                                            <Button className="w-full h-16 bg-black text-white hover:bg-primary rounded-2xl font-black uppercase tracking-widest text-[10px] group/btn">
                                                Ajouter au Panier
                                                <ShoppingBag className="ml-3 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                                            </Button>
                                        </Magnetic>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    ) : (
                        <div className="py-40 text-center space-y-8">
                            <div className="h-32 w-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-10">
                                <Heart className="h-16 w-16 text-muted-foreground/30" />
                            </div>
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Votre liste est vide.</h2>
                            <p className="text-muted-foreground font-medium max-w-md mx-auto italic">Explorez notre collection et sauvez vos articles préférés pour plus tard.</p>
                            <Link href="/shop" className="inline-flex h-16 px-10 bg-primary text-primary-foreground rounded-2xl items-center font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                                Découvrir le Catalogue <ArrowRight className="ml-3 h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
