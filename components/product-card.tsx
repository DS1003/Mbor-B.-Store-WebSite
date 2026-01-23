"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Star, ArrowUpRight } from "lucide-react"
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
            className="group relative bg-card/40 backdrop-blur-md border border-muted/50 rounded-2xl sm:rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:shadow-2xl hover:border-primary/30"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
        >
            {/* Full Card Link */}
            <Link href={`/product/${id}`} className="absolute inset-0 z-10" aria-label={`View ${name}`} />

            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-muted/10">
                {isNew && (
                    <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 bg-primary text-black text-[7px] sm:text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-xl">
                        Nouveau
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(id)
                    }}
                    className={cn(
                        "absolute top-3 right-3 sm:top-5 sm:right-5 z-20 h-8 w-8 sm:h-10 sm:w-10 backdrop-blur-md border rounded-lg sm:rounded-xl flex items-center justify-center transition-all cursor-pointer",
                        favorited
                            ? "bg-rose-500 text-white border-rose-500 scale-110"
                            : "bg-white/10 text-white border-white/20 hover:bg-rose-500 hover:border-rose-500"
                    )}
                >
                    <Heart className={cn("h-3 w-3 sm:h-4 sm:w-4", favorited && "fill-current")} />
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
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-8 space-y-2 sm:space-y-5">
                <div className="space-y-1 sm:space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="h-px w-2 sm:w-4 bg-primary/40" />
                            <span className="text-[7px] sm:text-[9px] text-muted-foreground/60 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] italic">
                                {category}
                            </span>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 text-[7px] sm:text-[9px] font-black bg-muted/30 px-1 sm:px-2 py-0.5 rounded-md sm:rounded-lg">
                            <Star className="h-2 w-2 sm:h-3 sm:w-3 text-primary fill-primary" />
                            <span className="text-foreground/60 tabular-nums">4.9</span>
                        </div>
                    </div>

                    <div className="block">
                        <h3 className="text-xs sm:text-xl font-black italic tracking-tighter leading-tight sm:leading-[1.1] transition-all group-hover:text-primary line-clamp-2">
                            {name}
                        </h3>
                    </div>
                </div>

                <div className="flex items-end justify-between pt-2 sm:pt-5 border-t border-muted/30">
                    <div className="space-y-0 sm:space-y-1">
                        <p className="text-[6px] sm:text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 italic">Prix Unitaire</p>
                        <span className="text-sm sm:text-2xl font-black italic tracking-tighter text-foreground tabular-nums leading-none" suppressHydrationWarning>
                            {price.toLocaleString()} <span className="text-[8px] sm:text-[10px] font-black tracking-normal ml-0.5 text-muted-foreground/40 italic uppercase">FCFA</span>
                        </span>
                    </div>

                    <div className="h-7 w-7 sm:h-10 sm:w-10 rounded-md sm:rounded-xl bg-muted/10 flex items-center justify-center transition-all group-hover:bg-primary/10 group-hover:text-primary">
                        <ArrowUpRight className="h-3 w-3 sm:h-5 sm:w-5 transition-transform group-hover:rotate-45" />
                    </div>
                </div>
            </div>

            {/* Ambient hover glow */}
            <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
    )
}

