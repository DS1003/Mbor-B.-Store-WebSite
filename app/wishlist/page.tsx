"use client"

import * as React from "react"
import {
    Heart,
    ShoppingBag,
    Trash2,
    ArrowRight,
    ChevronLeft,
    User
} from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ProductCard } from "@/components/product-card"
import { useWishlist } from "@/components/wishlist-context"
import { useSession } from "next-auth/react"

// Mock items removed in favor of real context data

export default function WishlistPage() {
    const { wishlist, loading } = useWishlist()
    const { status } = useSession()

    if (status === "unauthenticated") {
        return (
            <div className="flex flex-col w-full bg-background min-h-screen">
                <div className="container-custom py-20 px-4">
                    <div className="max-w-6xl mx-auto py-40 text-center space-y-8">
                        <div className="h-32 w-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-10">
                            <User className="h-16 w-16 text-muted-foreground/30" />
                        </div>
                        <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter leading-none">Connectez-vous.</h2>
                        <p className="text-muted-foreground font-medium max-w-md mx-auto italic">Vous devez être connecté pour voir et gérer vos articles favoris.</p>
                        <Link href="/login" className="inline-flex h-16 px-10 bg-primary text-primary-foreground rounded-2xl items-center font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                            Se Connecter <ArrowRight className="ml-3 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <div className="container-custom py-20 px-4">
                <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-2 border-muted pb-12">
                        <ScrollReveal direction="left">
                            <div className="space-y-4 text-left">
                                <Link href="/shop" className="inline-flex items-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors mb-2 sm:mb-4">
                                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Retour au shop
                                </Link>
                                <h1 className="font-heading text-[2.75rem] sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">
                                    Mes <span className="text-primary italic">Favoris.</span>
                                </h1>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right" className="flex items-center sm:items-end space-x-4 sm:space-x-6">
                            <div className="text-left sm:text-right">
                                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Articles Sauvegardés</p>
                                <p className="text-2xl sm:text-3xl font-black italic tracking-tighter text-primary">{wishlist.length}</p>
                            </div>
                            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl sm:rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary">
                                <Heart className="h-5 w-5 sm:h-8 sm:w-8 fill-current" />
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10 opacity-50">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-[2.5rem]" />
                            ))}
                        </div>
                    ) : wishlist.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10">
                            {wishlist.map((item, i) => (
                                <ScrollReveal key={item.id} delay={i * 0.1}>
                                    <ProductCard
                                        id={item.id}
                                        name={item.name}
                                        price={item.price}
                                        image={item.image}
                                        category={item.category}
                                    />
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
