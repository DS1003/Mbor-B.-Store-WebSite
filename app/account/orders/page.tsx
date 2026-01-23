"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
    Package,
    ChevronLeft,
    Search,
    Filter,
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
    ShoppingBag,
    ArrowRight,
    MapPin,
    Hash,
    Calendar,
    ArrowUpRight,
    Crown,
    Zap,
    History,
    Activity
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function UserOrdersPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [orders, setOrders] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
        if (status === "authenticated") {
            fetchOrders()
        }
    }, [status, router])

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/user/orders")
            if (res.ok) {
                const data = await res.json()
                setOrders(data)
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error)
        } finally {
            setLoading(false)
        }
    }

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <div className="relative">
                    <div className="h-20 w-20 border-2 border-primary/20 rounded-full animate-pulse absolute inset-0" />
                    <div className="h-20 w-20 border-t-2 border-primary rounded-full animate-spin flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                </div>
            </div>
        )
    }

    if (!session) return null

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants: any = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
        }
    }

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "PAID":
                return "text-emerald-600 bg-emerald-50 border-emerald-100"
            case "PENDING":
                return "text-amber-600 bg-amber-50 border-amber-100"
            case "DELIVERED":
                return "text-blue-600 bg-blue-50 border-blue-100"
            case "CANCELLED":
                return "text-rose-600 bg-rose-50 border-rose-100"
            default:
                return "text-muted-foreground bg-muted/50 border-border"
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "PAID": return "Payé"
            case "PENDING": return "En attente"
            case "DELIVERED": return "Livré"
            case "CANCELLED": return "Annulé"
            default: return status
        }
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[20%] left-[-5%] w-[30%] h-[30%] bg-primary/3 rounded-full blur-[120px]" />
            </div>

            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-12"
                >
                    {/* Header */}
                    <header className="space-y-8">
                        <motion.div variants={itemVariants}>
                            <Link href="/account" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group">
                                <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                Retour au profil
                            </Link>
                        </motion.div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                            <motion.div variants={itemVariants} className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Archives Transactionnelles</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight leading-none">
                                    Suivi <span className="text-primary italic font-semibold">Commandes</span>
                                </h1>
                                <p className="text-sm text-muted-foreground max-w-lg font-medium">Consultez l'historique complet de vos acquisitions Mbor Store et suivez vos colis en temps réel.</p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-center gap-4">
                                <div className="relative group/search">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 transition-colors group-focus-within/search:text-primary" />
                                    <input
                                        type="text"
                                        placeholder="RECHERCHER ID..."
                                        className="h-14 w-full md:w-80 bg-white border border-border rounded-xl pl-14 pr-6 text-[10px] font-bold uppercase tracking-[0.2em] outline-none focus:border-primary/50 transition-all shadow-sm"
                                    />
                                </div>
                                <button className="h-14 w-14 rounded-xl bg-white border border-border flex items-center justify-center hover:bg-muted transition-all shadow-sm group">
                                    <Filter className="h-5 w-5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                                </button>
                            </motion.div>
                        </div>
                    </header>

                    {/* Orders List */}
                    <div className="space-y-6">
                        {orders.length === 0 ? (
                            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-32 space-y-10 bg-white border border-border rounded-[3rem] shadow-sm">
                                <div className="h-32 w-32 bg-muted/50 rounded-full flex items-center justify-center text-muted-foreground/20">
                                    <ShoppingBag className="h-12 w-12" />
                                </div>
                                <div className="text-center space-y-3">
                                    <h3 className="text-3xl font-bold tracking-tight uppercase italic">Aucun flux détecté</h3>
                                    <p className="text-muted-foreground font-medium text-sm tracking-widest uppercase">Votre historique de transactions est actuellement vierge.</p>
                                </div>
                                <Link href="/shop">
                                    <Button className="h-14 px-12 rounded-xl bg-black text-white hover:bg-primary hover:text-black transition-all font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl">
                                        Explorer le Store <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {orders.map((order) => (
                                    <motion.div
                                        key={order.id}
                                        variants={itemVariants}
                                        className="group bg-white border border-border rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 h-40 w-40 bg-primary/3 rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-700" />

                                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                                            {/* Meta & ID */}
                                            <div className="lg:col-span-3 space-y-5">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">ID Commande</p>
                                                    <p className="text-xl font-bold tracking-tight text-foreground">#{order.id.substring(0, 8).toUpperCase()}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground border border-border/50">
                                                        <Calendar className="h-4 w-4" />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <p className="text-[10px] font-bold text-foreground">{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Article Previews */}
                                            <div className="lg:col-span-4 space-y-5">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Articles</p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex -space-x-4">
                                                        {order.items.slice(0, 3).map((item: any, idx: number) => (
                                                            <div key={idx} className="h-16 w-16 rounded-xl bg-white border-2 border-white shadow-lg overflow-hidden relative ring-1 ring-border/20">
                                                                {item.product?.images?.[0] ? (
                                                                    <img src={item.product.images[0]} alt="" className="h-full w-full object-cover" />
                                                                ) : (
                                                                    <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground/30">
                                                                        <Package className="h-6 w-6" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                        {order.items.length > 3 && (
                                                            <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center border-2 border-white text-white font-bold text-xs shadow-lg relative z-10">
                                                                +{order.items.length - 3}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-bold tracking-tight leading-none text-foreground truncate max-w-[150px]">
                                                            {order.items[0].product?.name || "Article"}
                                                        </p>
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                            {order.items.length} {order.items.length > 1 ? "articles" : "article"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Financials */}
                                            <div className="lg:col-span-2 space-y-1">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Montant Total</p>
                                                <div className="flex items-baseline gap-1">
                                                    <p className="text-2xl font-bold tracking-tight tabular-nums">{order.total.toLocaleString()}</p>
                                                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">FCFA</span>
                                                </div>
                                            </div>

                                            {/* Pulse Status */}
                                            <div className="lg:col-span-2 space-y-2">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Statut</p>
                                                <div className={cn(
                                                    "inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border shadow-sm",
                                                    getStatusStyles(order.status)
                                                )}>
                                                    <div className="h-1.5 w-1.5 rounded-full bg-current mr-2 animate-pulse" />
                                                    {getStatusLabel(order.status)}
                                                </div>
                                            </div>

                                            {/* Details CTA */}
                                            <div className="lg:col-span-1 text-right">
                                                <Link href={`/account/orders/${order.id}`}>
                                                    <button className="h-12 w-12 rounded-xl bg-muted/30 hover:bg-primary hover:text-white transition-all flex items-center justify-center group/btn shadow-sm border border-border/50">
                                                        <ArrowUpRight className="h-5 w-5 group-hover/btn:rotate-45 transition-transform duration-500" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}


