"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import {
    ChevronLeft,
    Package,
    Truck,
    CheckCircle2,
    Clock,
    CreditCard,
    MapPin,
    Calendar,
    Hash,
    ShoppingBag,
    Loader2,
    ArrowUpRight
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function OrderDetailsPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { id } = useParams()
    const [order, setOrder] = React.useState<any>(null)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        } else if (status === "authenticated" && id) {
            fetchOrder()
        }
    }, [status, router, id])

    const fetchOrder = async () => {
        try {
            const res = await fetch(`/api/user/orders/${id}`)
            if (res.ok) {
                const data = await res.json()
                setOrder(data)
            }
        } catch (error) {
            console.error("Error fetching order", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (status === "loading" || isLoading) return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    )

    if (!order) return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32 flex flex-col items-center justify-center space-y-6">
            <h1 className="text-2xl font-bold">Commande introuvable</h1>
            <Link href="/account/orders">
                <Button variant="outline" className="rounded-xl">Retour aux commandes</Button>
            </Link>
        </div>
    )

    const statusMap = {
        PENDING: { label: "En attente", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
        PAID: { label: "Payé", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-500/10" },
        SHIPPED: { label: "Expédié", icon: Truck, color: "text-purple-500", bg: "bg-purple-500/10" },
        DELIVERED: { label: "Livré", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
        CANCELLED: { label: "Annulé", icon: Hash, color: "text-red-500", bg: "bg-red-500/10" },
    }

    const currentStatus = statusMap[order.status as keyof typeof statusMap] || statusMap.PENDING

    const itemVariants: any = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
        }
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32">
            <div className="container-custom max-w-5xl">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    className="space-y-10"
                >
                    {/* Header */}
                    <header className="space-y-6">
                        <motion.div variants={itemVariants}>
                            <Link href="/account/orders" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group">
                                <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                Retour aux Commandes
                            </Link>
                        </motion.div>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <motion.div variants={itemVariants} className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight italic">Commande <span className="text-primary NOT-italic">#{order.id.slice(-6).toUpperCase()}</span></h1>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 pt-1">
                                    <div className={cn("px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2", currentStatus.bg, currentStatus.color)}>
                                        <currentStatus.icon className="h-3 w-3" />
                                        {currentStatus.label}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground text-[11px] font-medium">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {new Date(order.createdAt).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex gap-3">
                                <button className="h-12 px-6 rounded-xl border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-muted transition-colors">Télécharger Facture</button>
                                <button className="h-12 px-6 rounded-xl bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all">Support</button>
                            </motion.div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Order Items */}
                        <div className="lg:col-span-2 space-y-8">
                            <motion.div variants={itemVariants} className="bg-white border border-border rounded-[2.5rem] overflow-hidden shadow-sm">
                                <div className="p-8 border-b border-border/50 bg-muted/5">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Articles de la commande</h3>
                                </div>
                                <div className="divide-y divide-border/50">
                                    {order.items.map((item: any) => (
                                        <div key={item.id} className="p-8 flex gap-6 group hover:bg-muted/5 transition-colors">
                                            <div className="relative h-24 w-20 rounded-2xl overflow-hidden bg-muted shrink-0 border border-border/50">
                                                <Image
                                                    src={item.product?.images?.[0] || "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271862/mbor_store/placeholder.svg"}
                                                    alt={item.product?.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="text-base font-bold tracking-tight italic">{item.product?.name}</h4>
                                                        <span className="text-sm font-bold tabular-nums italic">
                                                            {Number(item.price).toLocaleString()} <span className="text-[10px] text-muted-foreground ml-0.5">FCFA</span>
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Quantité: {item.quantity}</p>
                                                    {item.size && (
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Taille: {item.size}</p>
                                                    )}
                                                    {(item.customName || item.customNumber) && (
                                                        <div className="mt-2 text-[9px] bg-primary/10 text-primary px-3 py-1 rounded-lg inline-flex items-center gap-2 font-bold uppercase tracking-widest border border-primary/20">
                                                            <span>Flocage: {item.customName} ({item.customNumber})</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-10 bg-muted/10 space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground font-medium">Sous-total</span>
                                        <span className="font-bold tabular-nums italic">{(Number(order.total) - 2000).toLocaleString()} FCFA</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground font-medium">Livraison</span>
                                        <span className="font-bold tabular-nums italic text-green-600">2,000 FCFA</span>
                                    </div>
                                    <div className="pt-4 border-t border-border flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Total Final</span>
                                        <span className="text-3xl font-black italic tracking-tighter text-primary">{Number(order.total).toLocaleString()} <span className="text-xs">FCFA</span></span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Order Info Sidebar */}
                        <div className="space-y-8">
                            {/* Shipping Info */}
                            <motion.div variants={itemVariants} className="bg-white border border-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-base font-bold tracking-tight uppercase italic">Adresse Livraison</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">{order.customerName}</p>
                                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">{order.customerAddress}</p>
                                        <p className="text-xs text-muted-foreground font-medium">{order.customerPhone}</p>
                                    </div>
                                    <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                            <Truck className="h-4 w-4" />
                                            Estimation Livraison
                                        </div>
                                        <p className="mt-2 text-xs font-bold italic">24h - 48h (Dakar & Banlieue)</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Payment Info */}
                            <motion.div variants={itemVariants} className="bg-white border border-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                                        <CreditCard className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-base font-bold tracking-tight uppercase italic">Paiement</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Méthode</p>
                                        <p className="text-sm font-black italic">{order.paymentMethod || "NON SPÉCIFIÉ"}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">État</p>
                                        <p className={cn("text-xs font-black uppercase tracking-widest", order.status === 'PAID' ? 'text-green-600' : 'text-orange-500')}>
                                            {order.status === 'PAID' ? 'Confirmé' : 'En attente'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
