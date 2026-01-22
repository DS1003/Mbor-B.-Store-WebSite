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

export function ProductInfo({ product }: ProductInfoProps) {
    const { addItem } = useCart()
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
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {availableSizes.map((item) => (
                        <button
                            key={item.size}
                            onClick={() => item.stock > 0 && setSelectedSize(item.size)}
                            disabled={item.stock <= 0}
                            className={cn(
                                "h-14 flex flex-col items-center justify-center rounded-2xl border text-[13px] font-bold transition-all duration-300 relative overflow-hidden",
                                selectedSize === item.size
                                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                    : item.stock <= 0
                                        ? "border-muted bg-muted/50 text-muted-foreground/40 cursor-not-allowed"
                                        : "border-muted hover:border-foreground/40 bg-background text-foreground/70"
                            )}
                        >
                            <span>{item.size}</span>
                            {item.stock <= 0 && (
                                <span className="absolute inset-0 flex items-center justify-center bg-background/50 text-[9px] font-black uppercase -rotate-45 text-rose-500">Épuisé</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Personalization Section */}
            {data.allowFlocage && (
                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h4 className="text-[14px] font-bold tracking-tight flex items-center">
                                Personnaliser ce produit
                                <span className="ml-2 text-[9px] bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-widest font-black">+ 2 000 F</span>
                            </h4>
                            <p className="text-[11px] text-muted-foreground font-medium">Ajoutez votre nom et numéro officiel</p>
                        </div>
                        <Switch
                            checked={isCustomizing}
                            onCheckedChange={setIsCustomizing}
                            className="data-[state=checked]:bg-primary"
                        />
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
            <div className="flex flex-col sm:flex-row gap-5">
                <Magnetic>
                    <button
                        onClick={handleAddToCart}
                        disabled={isLoading}
                        className="flex-1 h-16 bg-black text-white dark:bg-white dark:text-black rounded-2xl text-[14px] font-bold tracking-tight transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center px-10 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <ShoppingBag className="h-5 w-5 mr-3 transition-transform group-hover:scale-110" />
                                Ajouter au panier
                            </>
                        )}
                    </button>
                </Magnetic>
                <Magnetic>
                    <button className="h-16 px-8 border border-muted rounded-2xl flex items-center justify-center hover:bg-muted transition-all active:scale-90 group">
                        <Heart className="h-5 w-5 group-hover:fill-rose-500 group-hover:text-rose-500 transition-colors" />
                    </button>
                </Magnetic>
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

