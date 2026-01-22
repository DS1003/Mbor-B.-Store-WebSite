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
    History
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function UserOrdersPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="h-20 w-20 border-t-2 border-primary rounded-full animate-spin flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary animate-pulse" />
                </div>
            </div>
        )
    }

    if (!session) return null

    // Mock orders
    const orders = [
        {
            id: "ORD-4582",
            date: "21 Jan 2026",
            time: "14:20",
            total: "45,000",
            status: "PAID",
            items: [
                { name: "Maillot Sénégal Domicile 24/25", size: "L", qty: 1, image: "https://www.foot.fr/img/cms/mural-chaussures-foot-fr.jpg" }
            ]
        },
        {
            id: "ORD-4578",
            date: "15 Jan 2026",
            time: "09:45",
            total: "12,500",
            status: "DELIVERED",
            items: [
                { name: "Chaussettes Performance Elite", size: "Unique", qty: 2, image: "" }
            ]
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] pt-28 pb-32">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-16"
                >
                    {/* Navigation & Header */}
                    <div className="space-y-10">
                        <motion.div variants={itemVariants}>
                            <Link href="/account" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 hover:text-primary transition-all group">
                                <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                Retour au Profil OS
                            </Link>
                        </motion.div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                            <motion.div variants={itemVariants} className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <span className="h-px w-10 bg-primary rounded-full" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">Transaction Archives</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                                    Flux <span className="text-primary italic">Commandes</span>
                                </h1>
                                <p className="text-sm font-medium text-muted-foreground/60 max-w-sm italic uppercase tracking-widest text-[10px]">Suivi temps-réel de votre historique d'acquisition.</p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-center gap-4">
                                <div className="relative group/search">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within/search:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="RECHERCHER ID..."
                                        className="h-16 w-full md:w-80 bg-card/40 backdrop-blur-md border-2 border-muted/50 rounded-2xl pl-14 pr-6 text-[10px] font-black uppercase tracking-[0.2em] outline-none focus:border-primary/50 transition-all shadow-sm"
                                    />
                                </div>
                                <button className="h-16 w-16 rounded-2xl bg-card border-2 border-muted/50 flex items-center justify-center hover:bg-muted/30 transition-all group">
                                    <Filter className="h-5 w-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Orders Intelligence List */}
                    <div className="space-y-8">
                        {orders.length === 0 ? (
                            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-32 space-y-10 bg-card/40 backdrop-blur-xl border-4 border-dashed border-muted/30 rounded-[4rem]">
                                <div className="h-32 w-32 bg-muted/20 rounded-full flex items-center justify-center text-muted-foreground/20">
                                    <ShoppingBag className="h-12 w-12" />
                                </div>
                                <div className="text-center space-y-3">
                                    <h3 className="text-3xl font-black italic tracking-tighter uppercase">Aucun flux détecté</h3>
                                    <p className="text-muted-foreground/60 font-medium italic text-sm tracking-widest uppercase">Votre historique de transactions est actuellement vierge.</p>
                                </div>
                                <Link href="/shop">
                                    <button className="h-16 px-12 rounded-2xl bg-black text-white hover:bg-primary transition-all font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl">
                                        Explorer le Store <ArrowRight className="inline ml-2 h-4 w-4" />
                                    </button>
                                </Link>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 gap-8">
                                {orders.map((order, i) => (
                                    <motion.div
                                        key={order.id}
                                        variants={itemVariants}
                                        className="group bg-card/60 backdrop-blur-3xl border-2 border-muted/50 rounded-[3rem] p-8 md:p-12 shadow-xl hover:shadow-3xl hover:border-primary/30 transition-all duration-700 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 h-64 w-64 bg-primary/5 rounded-bl-[100%] -z-0 transition-transform group-hover:scale-110 duration-700" />

                                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                            {/* Meta & ID */}
                                            <div className="lg:col-span-3 space-y-6">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 italic">Transaction ID</p>
                                                    <p className="text-2xl font-black italic tracking-tighter text-primary">#{order.id}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl bg-muted/20 flex items-center justify-center text-muted-foreground">
                                                        <Calendar className="h-4 w-4" />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{order.date}</p>
                                                        <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest italic">{order.time}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Article Previews */}
                                            <div className="lg:col-span-4 space-y-5">
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 italic">Composants Flux</p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex -space-x-5">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="h-20 w-20 rounded-2xl bg-black border-4 border-card shadow-2xl overflow-hidden relative group-hover:rotate-3 transition-transform duration-500">
                                                                {item.image ? (
                                                                    <img src={item.image} alt="" className="h-full w-full object-cover opacity-60" />
                                                                ) : (
                                                                    <div className="h-full w-full flex items-center justify-center bg-muted/20">
                                                                        <Package className="h-6 w-6 text-muted-foreground/40" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                        {order.items.length > 2 && (
                                                            <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center border-4 border-card text-black font-black text-xs shadow-2xl relative z-10">
                                                                +{order.items.length - 1}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-black italic tracking-tighter leading-none">{order.items[0].name}</p>
                                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 italic">Taille: {order.items[0].size} • Qty: {order.items[0].qty}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Financials */}
                                            <div className="lg:col-span-2 space-y-2">
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 italic">Valeur Nette</p>
                                                <div className="flex items-baseline gap-2">
                                                    <p className="text-3xl font-black italic tracking-tighter tabular-nums">{order.total}</p>
                                                    <span className="text-[10px] font-black uppercase text-muted-foreground/40 tracking-widest">FCFA</span>
                                                </div>
                                            </div>

                                            {/* Pulse Status */}
                                            <div className="lg:col-span-2 space-y-3">
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 italic">Workload Status</p>
                                                <div className={cn(
                                                    "inline-flex items-center px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-lg backdrop-blur-3xl",
                                                    order.status === "PAID"
                                                        ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5"
                                                        : "text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5"
                                                )}>
                                                    <div className="h-1.5 w-1.5 rounded-full bg-current mr-2 animate-pulse" />
                                                    {order.status === "PAID" ? "PAYÉ" : "LIVRÉ"}
                                                </div>
                                            </div>

                                            {/* Details CTA */}
                                            <div className="lg:col-span-1 text-right">
                                                <button className="h-14 w-14 rounded-2xl bg-muted/20 hover:bg-primary hover:text-black transition-all flex items-center justify-center group/btn shadow-inner">
                                                    <ArrowUpRight className="h-6 w-6 group-hover/btn:rotate-45 transition-transform duration-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Matrix Rewards Panel */}
                    <motion.div variants={itemVariants} className="bg-black text-white p-16 rounded-[4rem] relative overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,153,51,0.2)_0%,transparent_60%)]" />
                        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent" />

                        <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
                            <div className="space-y-8 flex-1">
                                <div className="flex items-center gap-3">
                                    <Crown className="h-6 w-6 text-primary" />
                                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Mbor Ecosystem Rewards</span>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter leading-none">Intelligence <span className="text-primary italic">Fidélité</span></h3>
                                    <p className="text-white/50 font-medium italic text-sm leading-relaxed max-w-lg">Chaque acquisition génère des points MBOR convertibles en accès exclusifs, drops privés et réductions algorithmiques.</p>
                                </div>
                            </div>

                            <div className="relative flex gap-10 bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-3xl shadow-2xl">
                                <div className="text-center space-y-2">
                                    <p className="text-5xl font-black italic tracking-tighter text-primary">2,450</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 italic">Points Mbor XP</p>
                                </div>
                                <div className="w-px bg-white/10" />
                                <div className="text-center space-y-2">
                                    <p className="text-5xl font-black italic tracking-tighter text-primary fill-none text-stroke">LVL 2</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 italic">Statut Studio</p>
                                </div>
                                <div className="absolute -top-4 -right-4 h-12 w-12 bg-primary text-black rounded-2xl flex items-center justify-center rotate-12 shadow-2xl">
                                    <Zap className="h-6 w-6 fill-black" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

