"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, ShoppingBag, Truck, ShieldCheck, Ruler, Star, CheckCircle2, User, Hash } from "lucide-react"
import { cn } from "@/lib/utils"
import { Magnetic } from "@/components/interactions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { useCart } from "./cart-context"
import { toast } from "sonner"

interface ProductInfoProps {
    product?: {
        id: string
        name: string
        price: number
        category: string
        description: string
        images: string[]
        isNew?: boolean
        allowFlocage?: boolean
        sizes?: { size: string, stock: number }[]
    }
}

import { useWishlist } from "./wishlist-context"

export function ProductInfo({ product }: ProductInfoProps) {
    const { addItem } = useCart()
    const { toggleFavorite, isFavorite } = useWishlist()
    const [selectedSize, setSelectedSize] = React.useState("")
    const [isCustomizing, setIsCustomizing] = React.useState(false)
    const [customName, setCustomName] = React.useState("")
    const [customNumber, setCustomNumber] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const data = product || {
        id: "placeholder",
        name: "Produit Premium",
        price: 0,
        category: "Collection",
        description: "Description du produit non disponible.",
        images: ["/placeholder.svg"],
        isNew: true,
        allowFlocage: false,
        sizes: []
    }

    const favorited = isFavorite(data.id)

    const availableSizes = data.sizes && data.sizes.length > 0
        ? data.sizes
        : [{ size: "Standard", stock: 99 }]

    // Set default size if not selected
    React.useEffect(() => {
        if (!selectedSize && availableSizes.length > 0) {
            const firstInStock = availableSizes.find(s => s.stock > 0)
            if (firstInStock) setSelectedSize(firstInStock.size)
        }
    }, [availableSizes, selectedSize])

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Veuillez sélectionner une taille")
            return
        }

        const sizeObj = availableSizes.find(s => s.size === selectedSize)
        if (sizeObj && sizeObj.stock <= 0) {
            toast.error("Cette taille est en rupture de stock")
            return
        }

        setIsLoading(true)

        // Simulate a small delay for better UX feel
        setTimeout(() => {
            addItem({
                productId: data.id,
                name: data.name,
                price: (data.allowFlocage && isCustomizing) ? data.price + 2000 : data.price,
                quantity: 1,
                image: data.images[0],
                size: selectedSize,
                customName: isCustomizing ? customName : undefined,
                customNumber: isCustomizing ? customNumber : undefined
            })

            toast.success("Produit ajouté au panier", {
                description: `${data.name} - Taille ${selectedSize}`,
            })
            setIsLoading(false)
        }, 300)
    }

    return (
        <div className="flex flex-col space-y-10">
            {/* Category & Title */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="text-primary font-bold tracking-tight text-[11px] bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                        {data.category}
                    </span>
                    {data.isNew && (
                        <span className="text-foreground/60 font-medium tracking-tight text-[11px] bg-muted px-4 py-1.5 rounded-full">
                            Nouvelle Collection
                        </span>
                    )}
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-balance">
                    {data.name}
                </h1>
                <div className="flex items-center space-x-3 pt-2">
                    <div className="flex text-primary">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="h-3.5 w-3.5 fill-current" />
                        ))}
                    </div>
                    <span className="text-muted-foreground text-[12px] font-medium tracking-tight">120 avis vérifiés</span>
                </div>
            </div>

            {/* Price section - Elegant style */}
            <div className="flex flex-col space-y-3 p-8 bg-muted/30 rounded-3xl border border-muted/50">
                <div className="flex items-baseline space-x-4">
                    <span className="text-4xl font-bold tracking-tight tabular-nums text-foreground">
                        {data.price.toLocaleString()} <span className="text-lg font-semibold ml-1 text-muted-foreground">FCFA</span>
                    </span>
                    {data.price > 0 && (
                        <span className="text-lg text-muted-foreground/40 line-through font-medium">
                            {(data.price * 1.2).toLocaleString()}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold tracking-tight text-green-600 dark:text-green-500">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>En stock • Expédition immédiate</span>
                </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed font-medium text-[15px]">
                {data.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-6">
                <div className="flex justify-between items-center px-2">
                    <label className="text-[12px] font-bold tracking-tight uppercase text-muted-foreground">Choisir votre taille</label>
                    <Link href="/guide-des-tailles" className="text-[12px] font-semibold underline tracking-tight text-muted-foreground flex items-center hover:text-primary transition-colors">
                        <Ruler className="h-3.5 w-3.5 mr-2" /> Guide des Tailles
                    </Link>
                </div>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-6 sm:gap-3 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {availableSizes.map((item) => (
                        <button
                            key={item.size}
                            onClick={() => item.stock > 0 && setSelectedSize(item.size)}
                            disabled={item.stock <= 0}
                            className={cn(
                                "h-10 min-w-[54px] sm:h-14 sm:min-w-0 flex items-center justify-center rounded-lg sm:rounded-2xl border-2 text-[13px] sm:text-[14px] font-black transition-all duration-300 relative overflow-hidden active:scale-95 flex-shrink-0 sm:flex-shrink",
                                selectedSize === item.size
                                    ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_20px_-10px_rgba(var(--primary),0.5)] z-10"
                                    : item.stock <= 0
                                        ? "border-muted/50 bg-muted/20 text-muted-foreground/30 cursor-not-allowed opacity-50"
                                        : "border-muted hover:border-foreground/20 bg-card/50 backdrop-blur-sm text-foreground/60 hover:text-foreground"
                            )}
                        >
                            <span className="relative z-10">{item.size}</span>
                            {item.stock <= 0 && (
                                <div className="absolute inset-0 bg-muted/40 backdrop-blur-[1px] flex items-center justify-center">
                                    <div className="h-px w-full bg-rose-500/30 rotate-45 absolute" />
                                </div>
                            )}
                            {selectedSize === item.size && (
                                <motion.div
                                    layoutId="size-active"
                                    className="absolute inset-0 bg-primary"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Personalization Section */}
            {data.allowFlocage && (
                <div className="p-6 bg-secondary/30 backdrop-blur-xl rounded-[2rem] border border-muted/50 transition-all hover:bg-secondary/40 group/personalize">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/personalize:scale-110 transition-transform duration-500">
                                <span className="text-lg">👕</span>
                            </div>
                            <div className="space-y-1 min-w-0">
                                <h4 className="text-[12px] sm:text-[13px] font-black tracking-tighter uppercase italic truncate">
                                    Flocage Personnalisé
                                </h4>
                                <div className="flex items-center gap-2">
                                    <div className="px-2 py-0.5 rounded-full bg-background border border-muted text-foreground text-[8px] font-black uppercase tracking-tighter whitespace-nowrap shadow-sm">
                                        + 2 000 FCFA
                                    </div>
                                    <p className="text-[9px] text-muted-foreground font-semibold leading-tight line-clamp-1 opacity-60 italic">
                                        Nom & Numéro
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsCustomizing(!isCustomizing)}
                            className={cn(
                                "relative h-6 w-11 flex-shrink-0 rounded-full transition-all duration-500 flex items-center px-1 border-2 !min-h-0",
                                isCustomizing
                                    ? "bg-primary border-primary shadow-[0_5px_15px_-5px_rgba(var(--primary),0.5)]"
                                    : "bg-muted-foreground/10 border-transparent"
                            )}
                            aria-label="Toggle personalization"
                        >
                            <motion.div
                                animate={{ x: isCustomizing ? 20 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="h-4 w-4 rounded-full bg-white shadow-sm flex items-center justify-center"
                            >
                                {isCustomizing && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="h-1.5 w-1.5 rounded-full bg-primary"
                                    />
                                )}
                            </motion.div>
                        </button>
                    </div>

                    {isCustomizing && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 animate-in fade-in zoom-in-95 duration-300">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Nom (Flocage)</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                                    <Input
                                        placeholder="Ex: SADIO"
                                        value={customName}
                                        onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                                        className="h-11 pl-9 rounded-xl border-primary/20 bg-background focus-visible:ring-primary/20 uppercase font-bold text-xs"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Numéro</Label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                                    <Input
                                        placeholder="10"
                                        maxLength={2}
                                        value={customNumber}
                                        onChange={(e) => setCustomNumber(e.target.value)}
                                        className="h-11 pl-9 rounded-xl border-primary/20 bg-background focus-visible:ring-primary/20 font-bold text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* CTA's */}
            <div className="flex items-center gap-4 pt-4">
                <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className="flex-[4] h-16 bg-foreground text-background rounded-2xl text-[14px] font-black uppercase tracking-widest transition-all hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] active:scale-[0.98] flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    {isLoading ? (
                        <div className="h-5 w-5 border-2 border-background/20 border-t-background rounded-full animate-spin" />
                    ) : (
                        <>
                            <ShoppingBag className="h-4 w-4 mr-3 transition-transform group-hover:scale-110 group-hover:-translate-y-0.5" />
                            Ajouter au panier
                        </>
                    )}
                </button>
                <button
                    onClick={() => toggleFavorite(data.id)}
                    className={cn(
                        "flex-1 h-16 border-2 rounded-2xl flex items-center justify-center transition-all active:scale-90 group relative overflow-hidden backdrop-blur-sm",
                        favorited
                            ? "border-rose-500/50 bg-rose-500/10 text-rose-500"
                            : "border-muted hover:border-rose-500/30 hover:bg-rose-500/5 text-muted-foreground hover:text-rose-500"
                    )}
                >
                    <Heart className={cn(
                        "h-5 w-5 transition-all duration-500",
                        favorited ? "fill-rose-500 scale-110" : "group-hover:scale-110"
                    )} />
                </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-muted/50">
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold tracking-tight text-foreground uppercase">Livraison Express</p>
                        <p className="text-[10px] font-medium text-muted-foreground">Dakar & Banlieue 24h</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold tracking-tight text-foreground uppercase">100% Authentique</p>
                        <p className="text-[10px] font-medium text-muted-foreground">Garantie Mbor Store</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

