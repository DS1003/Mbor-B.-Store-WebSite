"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
    User,
    Package,
    Settings,
    CreditCard,
    ShieldCheck,
    MapPin,
    Mail,
    Phone,
    Calendar,
    ChevronRight,
    ShoppingBag,
    Star,
    Edit3,
    ArrowUpRight,
    Zap,
    Heart,
    Bell,
    Clock,
    Activity,
    LogOut,
    Crown
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AccountPage() {
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
                <div className="relative">
                    <div className="h-20 w-20 border-2 border-primary/20 rounded-full animate-ping absolute inset-0" />
                    <div className="h-20 w-20 border-t-2 border-primary rounded-full animate-spin flex items-center justify-center">
                        <Star className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                </div>
            </div>
        )
    }

    if (!session) return null

    const stats = [
        { label: "Historique", value: "14", icon: Package, color: "text-amber-500", bg: "bg-amber-500/10" },
        { label: "Mbor XP", value: "2,450", icon: Crown, color: "text-primary", bg: "bg-primary/10" },
        { label: "Wishlist", value: "08", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/10" },
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
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] pt-28 pb-32 selection:bg-primary selection:text-black">
            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-16"
                >
                    {/* Header / Identity Hub */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <motion.div variants={itemVariants} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="h-px w-10 bg-primary rounded-full" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">Mbor.Studio Personal OS v2.0</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                                Salut, <span className="text-primary italic">{session.user?.name?.split(" ")[0]}</span>
                            </h1>
                            <p className="text-sm font-medium text-muted-foreground/60 max-w-md italic uppercase tracking-widest text-[10px]">Accès exclusif à votre écosystème de performance & style.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex gap-4">
                            <Magnetic>
                                <button className="h-16 px-10 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all flex items-center gap-3 shadow-2xl relative group overflow-hidden border border-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Edit3 className="h-4 w-4 relative z-10" />
                                    <span className="relative z-10">Modifier Profil</span>
                                </button>
                            </Magnetic>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* LEFT COLUMN: Profile & Real-time Stats */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Profile Card / Glass */}
                            <motion.div variants={itemVariants} className="group bg-card/60 backdrop-blur-3xl border-2 border-muted/50 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden transition-all duration-700 hover:border-primary/30">
                                <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-bl-[100%] transition-transform group-hover:scale-125 duration-700" />

                                <div className="relative space-y-10">
                                    <div className="relative inline-block group/avatar">
                                        <div className="h-28 w-28 rounded-[2.5rem] bg-black text-white flex items-center justify-center text-3xl font-black italic border-4 border-white dark:border-white/10 shadow-2xl rotate-3 group-hover/avatar:rotate-0 transition-transform duration-500 overflow-hidden">
                                            {session.user?.image ? (
                                                <img src={session.user.image} alt="" className="h-full w-full object-cover" />
                                            ) : (
                                                session.user?.name?.substring(0, 2).toUpperCase()
                                            )}
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-primary text-black rounded-xl flex items-center justify-center shadow-xl border-4 border-card animate-pulse">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 italic">Client Identité</p>
                                            <p className="text-2xl font-black tracking-tight leading-none italic">{session.user?.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 italic">Signature Numérique</p>
                                            <p className="text-sm font-semibold text-muted-foreground leading-none">{session.user?.email}</p>
                                        </div>

                                        <div className="pt-6 flex flex-col gap-3">
                                            <div className="flex items-center gap-3 bg-primary/5 border border-primary/10 px-6 py-4 rounded-2xl group/btn hover:bg-primary/10 transition-all cursor-default">
                                                <Crown className="h-4 w-4 text-primary" />
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Membre Elite LVL 2</span>
                                            </div>
                                            <button
                                                onClick={() => router.push('/api/auth/signout')}
                                                className="flex items-center gap-3 text-rose-500/40 hover:text-rose-500 transition-colors px-6 py-2 text-[9px] font-black uppercase tracking-[0.3em]"
                                            >
                                                <LogOut className="h-4 w-4" /> Déconnexion Système
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Mini Stats Matrix */}
                            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
                                {stats.map((stat, i) => (
                                    <div key={i} className="group bg-card/40 backdrop-blur-2xl border-2 border-muted/50 p-6 rounded-[2rem] flex items-center justify-between hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                                        <div className="flex items-center gap-5">
                                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6", stat.bg, stat.color)}>
                                                <stat.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 italic">{stat.label}</p>
                                                <h3 className="text-2xl font-black italic tracking-tighter tabular-nums leading-none">{stat.value}</h3>
                                            </div>
                                        </div>
                                        <div className="h-10 w-10 rounded-xl bg-muted/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN: Nav Matrix & Actions */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Command Grid */}
                            <div className="space-y-8">
                                <motion.div variants={itemVariants} className="flex items-center gap-4">
                                    <Activity className="h-5 w-5 text-primary animate-pulse" />
                                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Accès <span className="text-primary italic">Tactique</span></h2>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                    {[
                                        { title: "Mes Commandes", desc: "Suivi & Flux Transactionnel", icon: Package, href: "/account/orders", color: "from-amber-500/10 to-transparent", iconColor: "text-amber-500" },
                                        { title: "Point de Chute", desc: "Adresses & Zones de Livraison", icon: MapPin, href: "/account/address", color: "from-blue-500/10 to-transparent", iconColor: "text-blue-500" },
                                        { title: "Moyens de Flux", desc: "Wave, OM, Cash Intelligence", icon: CreditCard, href: "/account/billing", color: "from-emerald-500/10 to-transparent", iconColor: "text-emerald-500" },
                                        { title: "Paramètres OS", desc: "Sécurité & Profil Métadata", icon: Settings, href: "/account/settings", color: "from-purple-500/10 to-transparent", iconColor: "text-purple-500" },
                                    ].map((item, i) => (
                                        <motion.div key={i} variants={itemVariants}>
                                            <Link href={item.href} className="group block">
                                                <div className="bg-card/40 backdrop-blur-2xl border-2 border-muted/50 hover:border-primary/30 p-10 rounded-[2.5rem] transition-all duration-700 flex flex-col justify-between h-56 relative overflow-hidden shadow-sm hover:shadow-2xl">
                                                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", item.color)} />

                                                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center bg-muted/20 shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-500", item.iconColor)}>
                                                        <item.icon className="h-6 w-6" />
                                                    </div>

                                                    <div className="space-y-2 relative z-10 transition-transform duration-500 group-hover:translate-x-2">
                                                        <h3 className="text-2xl font-black italic tracking-tighter">{item.title}</h3>
                                                        <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest italic">{item.desc}</p>
                                                    </div>

                                                    <div className="absolute top-8 right-8 h-10 w-10 rounded-full border border-muted opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center relative z-10">
                                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Conciergerie Section */}
                            <motion.div variants={itemVariants} className="bg-black text-white p-16 rounded-[4rem] relative overflow-hidden shadow-2xl group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,153,51,0.15)_0%,transparent_100%)]" />
                                <div className="absolute -right-20 -bottom-20 h-80 w-80 bg-primary/20 rounded-full blur-[100px] animate-pulse" />

                                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                                    <div className="space-y-8 flex-1">
                                        <div className="flex items-center gap-3">
                                            <Zap className="h-6 w-6 text-primary fill-primary" />
                                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Mbor 24/7 Conciergerie</span>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter leading-none">Besoin d'un <span className="text-primary italic">Support ?</span></h3>
                                            <p className="text-white/50 font-medium italic text-sm leading-relaxed max-w-lg">Une question sur un flex, une commande ou un drop ? Notre équipe de conciergerie digitale est activée en permanence pour vous.</p>
                                        </div>
                                        <button className="h-16 px-12 rounded-2xl bg-primary text-black font-black uppercase tracking-[0.2em] text-[11px] hover:scale-105 transition-all shadow-[0_0_30px_rgba(204,153,51,0.3)] group-hover:shadow-[0_0_50px_rgba(204,153,51,0.5)]">
                                            Activer Support WhatsApp
                                        </button>
                                    </div>
                                    <div className="hidden lg:flex justify-center relative">
                                        <div className="h-56 w-56 rounded-full border-2 border-primary/20 flex items-center justify-center border-dashed animate-[spin_30s_linear_infinite] group-hover:border-primary/40 transition-colors">
                                            <ShoppingBag className="h-16 w-16 text-primary animate-pulse" />
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="h-40 w-40 rounded-full bg-primary/5 blur-2xl" />
                                        </div>
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

