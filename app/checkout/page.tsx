"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ShieldCheck, Truck, CreditCard, ChevronLeft, ArrowRight, MapPin, User, Wallet, CheckCircle2, ShoppingBag, Hash } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

export default function CheckoutPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const { items, subtotal, clearCart } = useCart()
    const [paymentMethod, setPaymentMethod] = React.useState("wave")
    const [deliveryType, setDeliveryType] = React.useState("delivery") // delivery, pickup
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)

    const deliveryFee = deliveryType === "delivery" ? (subtotal > 50000 ? 0 : 2000) : 0
    const total = subtotal + deliveryFee

    const [formData, setFormData] = React.useState({
        firstName: session?.user?.name?.split(" ")[0] || "",
        lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
        phone: "",
        address: "",
        notes: ""
    })

    const handleConfirmOrder = async () => {
        if (!formData.phone || !formData.address) {
            toast.error("Veuillez remplir les informations de livraison")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items,
                    subtotal,
                    deliveryFee,
                    deliveryType,
                    totalAmount: total,
                    formData,
                    paymentMethod
                })
            })

            if (!response.ok) {
                throw new Error("Erreur lors de la création de la commande")
            }

            setIsSuccess(true)
            toast.success("Commande confirmée !")
            clearCart()
        } catch (error) {
            console.error(error)
            toast.error("Une erreur est survenue. Veuillez réessayer.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (items.length === 0 && !isSuccess) {
        return (
            <div className="flex flex-col w-full bg-background min-h-screen items-center justify-center space-y-6 container-custom">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/20" />
                <h1 className="text-2xl font-bold tracking-tight">Votre panier est vide</h1>
                <Link href="/shop">
                    <Button variant="outline" className="rounded-xl px-8">Découvrir la boutique</Button>
                </Link>
            </div>
        )
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col w-full bg-background min-h-screen items-center justify-center space-y-8 container-custom">
                <ScrollReveal direction="up" className="flex flex-col items-center space-y-6 text-center">
                    <div className="h-24 w-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary shadow-xl shadow-primary/10 border border-primary/20">
                        <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold tracking-tight">Merci pour votre confiance !</h1>
                        <p className="text-muted-foreground font-medium max-w-md mx-auto">Votre commande a été enregistrée avec succès. Notre équipe vous contactera sous peu par WhatsApp ou téléphone pour valider la livraison.</p>
                    </div>
                    <div className="p-6 bg-muted/30 rounded-3xl border border-muted/50 w-full max-w-sm space-y-3">
                        <div className="flex justify-between text-sm font-semibold">
                            <span className="text-muted-foreground">Numéro de commande</span>
                            <span className="text-foreground font-mono">#MB-{Math.floor(1000 + Math.random() * 9000)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold">
                            <span className="text-muted-foreground">Mode de paiement</span>
                            <span className="text-foreground uppercase">{paymentMethod}</span>
                        </div>
                    </div>
                    <Link href="/">
                        <Button className="h-14 px-10 rounded-2xl bg-black text-white hover:bg-primary transition-all font-bold tracking-tight">
                            Retour à l'accueil
                        </Button>
                    </Link>
                </ScrollReveal>
            </div>
        )
    }

    return (
        <div className="bg-muted/5 min-h-screen">
            <div className="container-custom py-16 md:py-24">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal direction="down">
                        <Link href="/cart" className="inline-flex items-center text-[13px] font-bold tracking-tight text-muted-foreground/60 hover:text-primary mb-12 group transition-colors">
                            <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
                            Retour au panier
                        </Link>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
                        {/* Checkout Process */}
                        <div className="lg:col-span-7 space-y-10">
                            <ScrollReveal direction="left" delay={0.1} className="space-y-8 bg-card border border-muted/60 p-10 rounded-[2.5rem] shadow-sm shadow-black/5">
                                <div className="flex items-center space-x-5 mb-4">
                                    <div className="h-12 w-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg shadow-primary/20">01</div>
                                    <div>
                                        <h2 className="font-heading text-2xl font-bold tracking-tight">Informations <span className="text-primary font-medium">Personnelles</span></h2>
                                        <p className="text-[11px] font-bold tracking-widest text-muted-foreground/40 uppercase">Détails de livraison</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[12px] font-bold tracking-tight text-muted-foreground uppercase ml-1">Prénom</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full h-14 bg-muted/40 border border-transparent focus:border-primary/20 focus:bg-background rounded-2xl px-6 text-sm font-semibold outline-none transition-all"
                                            placeholder="Prénom"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[12px] font-bold tracking-tight text-muted-foreground uppercase ml-1">Nom</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full h-14 bg-muted/40 border border-transparent focus:border-primary/20 focus:bg-background rounded-2xl px-6 text-sm font-semibold outline-none transition-all"
                                            placeholder="Nom"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-[12px] font-bold tracking-tight text-muted-foreground uppercase ml-1">Téléphone (WhatsApp)</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full h-14 bg-muted/40 border border-transparent focus:border-primary/20 focus:bg-background rounded-2xl px-6 text-sm font-semibold outline-none transition-all font-mono"
                                            placeholder="+221 -- --- -- --"
                                            required
                                        />
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal direction="left" delay={0.2} className="space-y-8 bg-card border border-muted/60 p-10 rounded-[2.5rem] shadow-sm shadow-black/5">
                                <div className="flex items-center space-x-5 mb-4">
                                    <div className="h-12 w-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-lg font-bold">02</div>
                                    <div>
                                        <h2 className="font-heading text-2xl font-bold tracking-tight">Mode de <span className="text-primary font-medium">Réception</span></h2>
                                        <p className="text-[11px] font-bold tracking-widest text-muted-foreground/40 uppercase">Dakar & Banlieue</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setDeliveryType("delivery")}
                                        className={`p-6 rounded-[2rem] border-2 text-left transition-all ${deliveryType === "delivery" ? "border-primary bg-primary/5 shadow-lg" : "border-muted/20 bg-muted/5 hover:border-muted/40"}`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Truck className={`h-6 w-6 ${deliveryType === "delivery" ? "text-primary" : "text-muted-foreground"}`} />
                                            {deliveryType === "delivery" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                                        </div>
                                        <p className="font-bold text-sm">Livraison à domicile</p>
                                        <p className="text-[11px] text-muted-foreground font-medium">Dakar (+2.000 FCFA)</p>
                                    </button>

                                    <button
                                        onClick={() => setDeliveryType("pickup")}
                                        className={`p-6 rounded-[2rem] border-2 text-left transition-all ${deliveryType === "pickup" ? "border-primary bg-primary/5 shadow-lg" : "border-muted/20 bg-muted/5 hover:border-muted/40"}`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <ShoppingBag className={`h-6 w-6 ${deliveryType === "pickup" ? "text-primary" : "text-muted-foreground"}`} />
                                            {deliveryType === "pickup" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                                        </div>
                                        <p className="font-bold text-sm">Récupérer sur place</p>
                                        <p className="text-[11px] text-muted-foreground font-medium">Boutique (Gratuit)</p>
                                    </button>
                                </div>

                                <AnimatePresence mode="wait">
                                    {deliveryType === "delivery" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-6 pt-4"
                                        >
                                            <div className="space-y-3">
                                                <label className="text-[12px] font-bold tracking-tight text-muted-foreground uppercase ml-1">Quartier & Adresse précise</label>
                                                <input
                                                    type="text"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    className="w-full h-14 bg-muted/40 border border-transparent focus:border-primary/20 focus:bg-background rounded-2xl px-6 text-sm font-semibold outline-none transition-all"
                                                    placeholder="Ex: Sacré-Cœur 3, Villa 900"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[12px] font-bold tracking-tight text-muted-foreground uppercase ml-1">Notes complémentaires (facultatif)</label>
                                                <textarea
                                                    rows={3}
                                                    value={formData.notes}
                                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                    className="w-full bg-muted/40 border border-transparent focus:border-primary/20 focus:bg-background rounded-[2rem] p-6 text-sm font-semibold outline-none transition-all"
                                                    placeholder="Précisez un étage ou un point de repère..."
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </ScrollReveal>

                            <ScrollReveal direction="left" delay={0.3} className="space-y-8 bg-card border border-muted/60 p-10 rounded-[2.5rem] shadow-sm shadow-black/5">
                                <div className="flex items-center space-x-5 mb-4">
                                    <div className="h-12 w-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-lg font-bold">03</div>
                                    <div>
                                        <h2 className="font-heading text-2xl font-bold tracking-tight">Mode de <span className="text-primary font-medium">Paiement</span></h2>
                                        <p className="text-[11px] font-bold tracking-widest text-muted-foreground/40 uppercase">Sécurisé & Rapide</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { id: "wave", label: "Wave", desc: "Digital", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Wave_Logo.svg/2560px-Wave_Logo.svg.png" },
                                        { id: "om", label: "O. Money", desc: "Digital", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Orange_Money_logo.svg/2048px-Orange_Money_logo.svg.png" },
                                        { id: "cash", label: "Espèce", desc: "Cash", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkY8O_08x7F-KOfhG4_KiwU8N5C93l23p33g&s" }
                                    ].map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setPaymentMethod(m.id)}
                                            className={`relative flex flex-col items-center p-6 border transition-all rounded-[2rem] space-y-4 ${paymentMethod === m.id
                                                ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                                                : "border-muted/60 bg-muted/10 hover:bg-muted/30"
                                                }`}
                                        >
                                            <div className="h-16 w-16 relative overflow-hidden rounded-2xl">
                                                <Image src={m.logo} alt={m.label} fill className="object-contain p-1" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[13px] font-bold tracking-tight leading-none mb-1">{m.label}</p>
                                                <p className="text-[10px] text-muted-foreground/60 font-medium">{m.desc}</p>
                                            </div>
                                            {paymentMethod === m.id && (
                                                <div className="absolute top-4 right-4 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Order Recap Sticky */}
                        <div className="lg:col-span-5">
                            <ScrollReveal direction="right" delay={0.4} className="bg-black text-white rounded-[3rem] p-10 space-y-8 sticky top-32 shadow-2xl border border-white/5 overflow-hidden">
                                <div className="relative z-10 space-y-8">
                                    <div className="text-center space-y-2">
                                        <h3 className="font-heading text-2xl font-bold tracking-tight">Votre Commande</h3>
                                        <div className="h-0.5 w-10 bg-primary mx-auto rounded-full" />
                                    </div>

                                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 group">
                                                <div className="space-y-1">
                                                    <p className="text-[13px] font-bold tracking-tight">{item.name}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="text-[9px] font-bold text-primary uppercase">Qté: {item.quantity}</span>
                                                        {item.size && <span className="text-[9px] font-bold text-white/40 uppercase">T: {item.size}</span>}
                                                        {item.customName && (
                                                            <span className="text-[9px] font-bold text-primary uppercase flex items-center">
                                                                <User className="h-2 w-2 mr-1" /> {item.customName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-[14px] font-bold tabular-nums text-primary">{(item.price * item.quantity).toLocaleString()} <span className="text-[9px] opacity-40">FCFA</span></span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-white/10">
                                        <div className="flex justify-between text-[13px] font-medium text-white/40 px-2">
                                            <span>Sous-total</span>
                                            <span className="text-white font-bold">{subtotal.toLocaleString()} FCFA</span>
                                        </div>
                                        <div className="flex justify-between text-[13px] font-medium text-white/40 px-2">
                                            <span>Livraison (Dakar)</span>
                                            <span className="text-white font-bold">{deliveryFee === 0 ? (deliveryType === "pickup" ? "Gratuit" : "Offerte") : `${deliveryFee.toLocaleString()} FCFA`}</span>
                                        </div>
                                        <div className="pt-6 flex justify-between items-end px-2">
                                            <span className="text-[11px] font-bold tracking-widest text-primary uppercase">Total</span>
                                            <span className="text-4xl font-bold tracking-tight text-primary tabular-nums">{total.toLocaleString()} <span className="text-sm font-semibold ml-1">FCFA</span></span>
                                        </div>
                                    </div>

                                    <div className="pt-4 space-y-6">
                                        <Magnetic>
                                            <button
                                                onClick={handleConfirmOrder}
                                                disabled={isSubmitting}
                                                className="w-full h-16 bg-primary text-primary-foreground rounded-2xl text-[14px] font-bold tracking-tight flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        Confirmer & Commander
                                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </button>
                                        </Magnetic>
                                        <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-white/30 uppercase">
                                            <ShieldCheck className="h-4 w-4 text-primary/60" />
                                            <span>Transaction Sécurisée</span>
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

