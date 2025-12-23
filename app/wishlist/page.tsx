"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Trash, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function WishlistPage() {
    // Mock Wishlist Data
    const wishlistItems = [
        {
            id: 1,
            name: "Air Jordan 1 Retro High OG",
            category: "Sneakers",
            price: "$180.00",
            image: "/placeholder.svg",
            inStock: true,
        },
        {
            id: 2,
            name: "Nike Dri-FIT Adv",
            category: "Jersey",
            price: "$140.00",
            image: "/placeholder.svg",
            inStock: true,
        },
        {
            id: 3,
            name: "Adidas Predator Elite",
            category: "Cleats",
            price: "$280.00",
            image: "/placeholder.svg",
            inStock: false,
        },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Navigation />

            <main className="relative pt-32 pb-40 overflow-hidden">
                {/* Massive Background Text */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
                    <h2 className="text-[30vw] font-black leading-none tracking-tighter">ENREGISTRE</h2>
                </div>

                <div className="container px-6 relative z-10">
                    {/* Header Section */}
                    <div className="max-w-4xl mb-16 space-y-4">
                        <div className="flex items-end justify-between gap-8">
                            <div className="space-y-4 text-left">
                                <p className="text-primary font-black uppercase tracking-[0.6em] text-[10px]">Votre Sélection</p>
                                <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] italic">
                                    LA <br />
                                    <span className="text-muted-foreground/30 not-italic">LISTE_D'ENVIES_</span>
                                </h1>
                            </div>
                            <div className="hidden md:block pb-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    {wishlistItems.length} ARTICLES ARCHIVES
                                </p>
                            </div>
                        </div>
                    </div>

                    {wishlistItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {wishlistItems.map((item) => (
                                <div key={item.id} className="group relative border-l border-border hover:border-primary transition-all p-8 flex flex-col bg-secondary/5 hover:bg-secondary/10 rounded-r-[2rem]">
                                    <div className="aspect-square relative overflow-hidden rounded-2xl bg-background border border-border group-hover:scale-[1.02] transition-transform duration-500 mb-6">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            className="object-cover w-full h-full"
                                        />
                                        {!item.inStock && (
                                            <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 border border-red-500/20 px-4 py-2 rounded-full">
                                                    Epuisé_
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{item.category}</p>
                                        <h3 className="text-xl font-black uppercase italic leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                        <p className="text-2xl font-black italic tabular-nums text-muted-foreground">{item.price}</p>
                                    </div>

                                    <div className="mt-8 flex gap-3">
                                        <Button
                                            className="flex-1 h-12 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black uppercase tracking-widest text-[10px] transition-all"
                                            disabled={!item.inStock}
                                        >
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Transférer
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-12 w-12 rounded-full border-border hover:bg-red-500/10 hover:text-red-500 hover:border-red-500 transition-all"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-32 text-center bg-secondary/10 rounded-[4rem] border border-border backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none">
                                <Heart className="h-64 w-64 fill-foreground" />
                            </div>
                            <div className="relative z-10 space-y-8">
                                <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter">LE COFFRE EST OUVERT_</h2>
                                <p className="text-xl text-muted-foreground max-w-md mx-auto font-medium leading-relaxed">
                                    Votre archive personnelle est actuellement vide. Explorez les derniers arrivages pour curer votre collection.
                                </p>
                                <Link href="/shop" className="inline-block">
                                    <Button className="h-20 px-12 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black uppercase tracking-[0.4em] text-sm transition-all shadow-xl">
                                        Explorer les Arrivages
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
