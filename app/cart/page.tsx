"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, ChevronLeft, User, Hash } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"

export default function CartPage() {
    const { items, removeItem, updateQuantity, subtotal } = useCart()

    const delivery = subtotal > 50000 ? 0 : 2500
    const total = subtotal + delivery

    if (items.length === 0) {
        return (
            <div className="flex flex-col w-full bg-background min-h-screen items-center justify-center space-y-8 container-custom">
                <ScrollReveal direction="up" className="flex flex-col items-center space-y-6">
                    <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                        <ShoppingBag className="h-10 w-10" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Votre panier est vide</h1>
                    <p className="text-muted-foreground text-center max-w-xs font-medium">Il semblerait que vous n'ayez pas encore ajouté de pépites à votre sélection.</p>
                    <Link href="/shop">
                        <Button className="h-14 px-10 rounded-2xl bg-black text-white hover:bg-primary transition-all font-bold tracking-tight">
                            Découvrir la boutique
                        </Button>
                    </Link>
                </ScrollReveal>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <div className="container-custom py-20">
                <div className="max-w-7xl mx-auto space-y-16">
                    <ScrollReveal direction="down" className="flex flex-col items-center text-center space-y-6">
                        <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2 shadow-sm border border-primary/20">
                            <ShoppingBag className="h-8 w-8" />
                        </div>
                        <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                            Votre <span className="text-primary font-medium">Panier</span>
                        </h1>
                        <p className="text-muted-foreground font-medium max-w-md text-lg">Prêt à dominer le terrain ? Finalisez votre commande Mbor Store.</p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-8">
                            <ScrollReveal direction="left">
                                <div className="hidden md:grid grid-cols-12 px-8 py-4 text-[11px] font-bold tracking-widest text-muted-foreground/40 border-b mb-6 uppercase">
                                    <div className="col-span-6">Produits</div>
                                    <div className="col-span-3 text-center">Quantité</div>
                                    <div className="col-span-3 text-right">Total</div>
                                </div>

                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="group bg-card border border-muted/60 rounded-[2rem] p-6 transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-black/5">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                                <div className="md:col-span-6 flex items-center space-x-6">
                                                    <div className="h-24 w-24 rounded-2xl bg-muted overflow-hidden relative shrink-0 border border-muted/20 transition-transform duration-500 group-hover:scale-105">
                                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h3 className="text-base font-bold tracking-tight leading-tight">{item.name}</h3>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {item.size && (
                                                                <span className="text-[10px] font-bold tracking-tight px-2 py-0.5 bg-muted rounded-md text-muted-foreground uppercase">Taille: {item.size}</span>
                                                            )}
                                                            {item.customName && (
                                                                <span className="text-[10px] font-bold tracking-tight px-2 py-0.5 bg-primary/10 rounded-md text-primary flex items-center uppercase">
                                                                    <User className="h-2.5 w-2.5 mr-1" /> {item.customName}
                                                                </span>
                                                            )}
                                                            {item.customNumber && (
                                                                <span className="text-[10px] font-bold tracking-tight px-2 py-0.5 bg-primary/10 rounded-md text-primary flex items-center">
                                                                    <Hash className="h-2.5 w-2.5 mr-1" /> {item.customNumber}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-foreground/80 font-bold tracking-tight pt-1 text-sm">{item.price.toLocaleString()} FCFA</p>
                                                    </div>
                                                </div>

                                                <div className="md:col-span-3 flex justify-center">
                                                    <div className="inline-flex items-center space-x-4 bg-muted/40 rounded-xl p-1 px-4 h-11 border border-muted/60">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="text-muted-foreground hover:text-primary transition-colors p-1"
                                                        >
                                                            <Minus className="h-3.5 w-3.5" />
                                                        </button>
                                                        <span className="text-sm font-bold w-6 text-center tabular-nums">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="text-muted-foreground hover:text-primary transition-colors p-1"
                                                        >
                                                            <Plus className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center">
                                                    <p className="text-lg font-bold tracking-tight tabular-nums">{(item.price * item.quantity).toLocaleString()} <span className="text-[10px] opacity-40">FCFA</span></p>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="flex items-center text-[11px] font-bold tracking-tight text-rose-400 hover:text-rose-500 transition-colors mt-2"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            <ScrollReveal direction="up" delay={0.4} className="pt-6">
                                <Link href="/shop" className="inline-flex items-center h-12 px-8 rounded-xl border border-muted text-[13px] font-bold tracking-tight text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                                    <ChevronLeft className="mr-2 h-4 w-4" /> Continuer mes achats
                                </Link>
                            </ScrollReveal>
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-4">
                            <ScrollReveal direction="right" delay={0.2} className="bg-black text-white rounded-[2.5rem] p-10 space-y-8 sticky top-32 shadow-2xl border border-white/5">
                                <div className="space-y-2">
                                    <h3 className="font-heading text-2xl font-bold tracking-tight">Récapitulatif</h3>
                                    <div className="h-0.5 w-8 bg-primary rounded-full" />
                                </div>

                                <div className="space-y-5">
                                    <div className="flex justify-between text-[13px] font-medium text-white/50">
                                        <span>Sous-total ({items.length} articles)</span>
                                        <span className="text-white font-bold tabular-nums">{subtotal.toLocaleString()} FCFA</span>
                                    </div>
                                    <div className="flex justify-between text-[13px] font-medium text-white/50">
                                        <span>Livraison</span>
                                        <span className="text-white font-bold tabular-nums">{delivery === 0 ? "Offerte" : `${delivery.toLocaleString()} FCFA`}</span>
                                    </div>
                                    <div className="pt-6 border-t border-white/10 space-y-1">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[12px] font-bold tracking-widest text-primary uppercase">Total</span>
                                            <span className="text-4xl font-bold tracking-tight text-primary tabular-nums">{total.toLocaleString()} <span className="text-xs font-semibold ml-1">FCFA</span></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 space-y-6">
                                    <Magnetic>
                                        <Link
                                            href="/checkout"
                                            className="w-full h-16 bg-primary text-primary-foreground rounded-2xl text-[14px] font-bold tracking-tight flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all group"
                                        >
                                            Valider la commande
                                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Magnetic>

                                    <div className="flex flex-col items-center space-y-5 pt-6 border-t border-white/5">
                                        <div className="flex items-center text-[10px] font-bold tracking-widest text-white/30 uppercase">
                                            <ShieldCheck className="h-4 w-4 mr-2 text-primary/60" />
                                            Paiement sécurisé
                                        </div>
                                        <div className="flex gap-4 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                                            <div className="h-6 px-3 bg-white/10 rounded flex items-center justify-center font-bold text-[8px] tracking-tight">WAVE</div>
                                            <div className="h-6 px-3 bg-white/10 rounded flex items-center justify-center font-bold text-[8px] tracking-tight">O.M</div>
                                            <div className="h-6 px-3 bg-white/10 rounded flex items-center justify-center font-bold text-[8px] tracking-tight">CARD</div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

