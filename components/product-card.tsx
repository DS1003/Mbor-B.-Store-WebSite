"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Heart, Star, Plus, ArrowUpRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface ProductCardProps {
    id: string
    name: string
    price: number
    image: string
    category: string
    isNew?: boolean
}

import { useWishlist } from "./wishlist-context"

export function ProductCard({ id, name, price, image, category, isNew }: ProductCardProps) {
    const [isHovered, setIsHovered] = React.useState(false)
    const { toggleFavorite, isFavorite } = useWishlist()
    const favorited = isFavorite(id)

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-card/40 backdrop-blur-md border-2 border-muted/50 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:shadow-2xl hover:border-primary/30"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
        >
            {/* Full Card Link */}
            <Link href={`/product/${id}`} className="absolute inset-0 z-10" aria-label={`View ${name}`} />

            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-muted/10">
                {isNew && (
                    <div className="absolute top-5 left-5 z-20 bg-primary text-black text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-xl">
                        Nouveau Flux
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(id)
                    }}
                    className={cn(
                        "absolute top-5 right-5 z-20 h-10 w-10 backdrop-blur-md border rounded-xl flex items-center justify-center transition-all cursor-pointer",
                        favorited
                            ? "bg-rose-500 text-white border-rose-500 scale-110"
                            : "bg-white/10 text-white border-white/20 hover:bg-rose-500 hover:border-rose-500"
                    )}
                >
                    <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
                </button>

                <div className="block h-full relative group/img">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover/img:scale-110"
                        sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Mobile Quick Add */}
                <button className="lg:hidden absolute bottom-5 right-5 z-20 h-12 w-12 bg-primary text-black rounded-2xl flex items-center justify-center shadow-2xl active:scale-90 transition-transform cursor-pointer">
                    <Plus className="h-6 w-6" />
                </button>

                {/* Desktop Quick Add Overlay */}
                <div className={cn(
                    "hidden lg:flex absolute inset-x-6 bottom-6 z-20 transition-all duration-700",
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                )}>
                    <button className="w-full h-14 bg-white text-black rounded-[1.25rem] flex items-center justify-center text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-2xl group/btn cursor-pointer">
                        <ShoppingBag className="h-4 w-4 mr-3 transition-transform group-hover/btn:-translate-y-0.5" />
                        Choisir la Taille
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-8 space-y-5">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="h-px w-4 bg-primary/40" />
                            <span className="text-[9px] text-muted-foreground/60 font-black uppercase tracking-[0.3em] italic">
                                {category}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] font-black bg-muted/30 px-2 py-1 rounded-lg">
                            <Star className="h-3 w-3 text-primary fill-primary" />
                            <span className="text-foreground/60 tabular-nums">4.9</span>
                        </div>
                    </div>

                    <div className="block">
                        <h3 className="text-xl font-black italic tracking-tighter leading-[1.1] transition-all group-hover:text-primary line-clamp-2">
                            {name}
                        </h3>
                    </div>
                </div>

                <div className="flex items-end justify-between pt-5 border-t-2 border-muted/30">
                    <div className="space-y-1">
                        <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 italic">Prix Unitaire</p>
                        <span className="text-2xl font-black italic tracking-tighter text-foreground tabular-nums leading-none">
                            {price.toLocaleString()} <span className="text-[10px] font-black tracking-normal ml-0.5 text-muted-foreground/40 italic uppercase">FCFA</span>
                        </span>
                    </div>

                    <div className="h-10 w-10 rounded-xl bg-muted/10 flex items-center justify-center transition-all group-hover:bg-primary/10 group-hover:text-primary">
                        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
                    </div>
                </div>
            </div>

            {/* Ambient hover glow */}
            <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
    )
}

