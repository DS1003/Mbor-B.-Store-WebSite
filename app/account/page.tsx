"use client"

import * as React from "react"
import { useSession, signOut } from "next-auth/react"
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
    Crown,
    ExternalLink
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AccountPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [realStats, setRealStats] = React.useState({
        ordersCount: 0,
        wishlistCount: 0,
    })

    React.useEffect(() => {
        if (status === "authenticated") {
            const fetchStats = async () => {
                try {
                    // Fetch Orders
                    const ordersRes = await fetch("/api/user/orders")
                    if (ordersRes.ok) {
                        const orders = await ordersRes.json()
                        setRealStats(prev => ({ ...prev, ordersCount: orders.length }))
                    }

                    // Fetch Wishlist
                    const wishlistRes = await fetch("/api/user/favorites")
                    if (wishlistRes.ok) {
                        const favorites = await wishlistRes.json()
                        setRealStats(prev => ({ ...prev, wishlistCount: favorites.length }))
                    }
                } catch (error) {
                    console.error("Failed to fetch stats:", error)
                }
            }
            fetchStats()
        }
    }, [status])

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="relative">
                    <div className="h-20 w-20 border-2 border-primary/20 rounded-full animate-pulse absolute inset-0" />
                    <div className="h-20 w-20 border-t-2 border-primary rounded-full animate-spin flex items-center justify-center">
                        <Star className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                </div>
            </div>
        )
    }

    if (!session) return null

    const stats = [
        { label: "Commandes", value: realStats.ordersCount.toString().padStart(2, "0"), icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Points Mbor", value: "2,450", icon: Crown, color: "text-primary", bg: "bg-primary/5" },
        { label: "Favoris", value: realStats.wishlistCount.toString().padStart(2, "0"), icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
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

    const itemVariants: any = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1]
            }
        }
    }

    const first_name = session.user?.name?.split(" ")[0] || "Client"
    const userInitials = session.user?.name
        ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
        : "MS"

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32 text-foreground overflow-hidden">
            {/* Elegant Background Accents */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/3 rounded-full blur-[120px]" />
            </div>

            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-12 lg:space-y-20"
                >
                    {/* Welcome Header */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-4">
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Espace Privé Membre</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight leading-none">
                                Bonjour, <span className="text-primary italic font-semibold">{first_name}</span>
                            </h1>
                            <p className="text-sm text-muted-foreground max-w-lg font-medium">
                                Bienvenue dans votre univers Mbor Store. Gérez vos commandes, vos préférences et votre fidélité en toute élégance.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center gap-4">
                            <Magnetic>
                                <Button className="h-12 px-8 rounded-xl bg-black text-white hover:bg-primary hover:text-black transition-all font-bold text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 group">
                                    <Edit3 className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                                    <span>Modifier Profil</span>
                                </Button>
                            </Magnetic>
                        </motion.div>
                    </header>

                    {/* Main Interface Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        {/* LEFT: Identity & Status */}
                        <div className="lg:col-span-4 space-y-10">
                            {/* Profile Card */}
                            <motion.div variants={itemVariants} className="bg-white border border-border rounded-[2.5rem] p-10 lg:p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 h-40 w-40 bg-primary/3 rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-700" />

                                <div className="relative space-y-10">
                                    <div className="flex items-start justify-between">
                                        <div className="relative">
                                            <Avatar className="h-24 w-24 rounded-3xl border-4 border-white shadow-2xl">
                                                <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                                                <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                                                    {userInitials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-2 -right-2 h-9 w-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg border-4 border-white">
                                                <ShieldCheck className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <div className="bg-muted/30 px-4 py-2 rounded-full border border-border">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                                Actif
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors cursor-default">Membre Officiel</p>
                                            <h3 className="text-2xl font-bold tracking-tight">{session.user?.name}</h3>
                                            <p className="text-sm font-medium text-muted-foreground">{session.user?.email}</p>
                                        </div>

                                        <div className="pt-4 space-y-3">
                                            <div className="flex items-center gap-4 bg-muted/20 hover:bg-muted/40 transition-colors p-4 rounded-2xl border border-border/50 group/status">
                                                <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary shadow-sm group-hover/status:scale-110 transition-transform">
                                                    <Crown className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Fidélité</p>
                                                    <p className="text-xs font-bold text-foreground">Client Elite Bronze</p>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                                            </div>

                                            <button
                                                onClick={() => signOut({ callbackUrl: "/" })}
                                                className="w-full flex items-center gap-3 text-destructive/60 hover:text-destructive transition-colors px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] group/logout mt-4"
                                            >
                                                <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                                                <span>Déconnexion sécurisée</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Stats */}
                            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
                                {stats.map((stat, i) => (
                                    <div key={i} className="group bg-white border border-border p-6 rounded-2xl flex items-center gap-5 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                                        <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                                            <stat.icon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                                            <h3 className="text-2xl font-bold tracking-tight tabular-nums">{stat.value}</h3>
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-muted-foreground/20 group-hover:text-primary transition-colors" />
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* RIGHT: Navigation & Services */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Navigation Grid */}
                            <div className="space-y-8">
                                <motion.div variants={itemVariants} className="flex items-center justify-between border-b border-border pb-6">
                                    <div className="flex items-center gap-4">
                                        <Activity className="h-5 w-5 text-primary" />
                                        <h2 className="text-2xl font-bold tracking-tight">Services & Alertes</h2>
                                    </div>
                                    <button className="text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                                        <Bell className="h-4 w-4" />
                                        <span>Gérer</span>
                                    </button>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                    {[
                                        { title: "Commandes", desc: "Suivez vos achats et retours", icon: Package, href: "/account/orders", color: "hover:bg-amber-50 hover:border-amber-100", iconColor: "text-amber-600" },
                                        { title: "Livraisons", desc: "Gérez vos points de chute", icon: MapPin, href: "/account/address", color: "hover:bg-blue-50 hover:border-blue-100", iconColor: "text-blue-600" },
                                        { title: "Paiements", desc: "Wave, OM & Cartes bancaires", icon: CreditCard, href: "/account/payments", color: "hover:bg-emerald-50 hover:border-emerald-100", iconColor: "text-emerald-600" },
                                        { title: "Paramètres", desc: "Sécurité & Confidentialité", icon: Settings, href: "/account/settings", color: "hover:bg-purple-50 hover:border-purple-100", iconColor: "text-purple-600" },
                                    ].map((item, i) => (
                                        <motion.div key={i} variants={itemVariants}>
                                            <Link href={item.href} className="group block">
                                                <div className={cn("bg-white border border-border p-8 lg:p-10 rounded-[2rem] transition-all duration-500 h-full flex flex-col gap-8 shadow-[0_2px_10px_-5px_rgba(0,0,0,0.02)] group-hover:shadow-xl", item.color)}>
                                                    <div className="flex items-start justify-between">
                                                        <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center bg-muted/30 group-hover:bg-white shadow-sm transition-all duration-500", item.iconColor)}>
                                                            <item.icon className="h-6 w-6" />
                                                        </div>
                                                        <div className="h-10 w-10 rounded-full border border-border opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-all duration-300 flex items-center justify-center">
                                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                                                        <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Conciergerie Premium Banner */}
                            <motion.div variants={itemVariants} className="bg-black text-white p-12 lg:p-16 rounded-[3rem] relative overflow-hidden group shadow-2xl">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,153,51,0.2),transparent_70%)]" />
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

                                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center justify-between">
                                    <div className="space-y-8 max-w-xl">
                                        <div className="flex items-center gap-3">
                                            <Zap className="h-5 w-5 text-primary fill-primary animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Mbor Service Concierge</span>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-4xl lg:text-5xl font-heading font-bold tracking-tight leading-none italic">
                                                Un Service <span className="text-primary">Sur Mesure</span>
                                            </h3>
                                            <p className="text-white/60 font-medium text-sm leading-relaxed">
                                                Drop spécial ? Personnalisation de maillot ? Notre équipe est prête à vous accompagner en priorité sur WhatsApp.
                                            </p>
                                        </div>
                                        <Button className="h-14 px-10 rounded-xl bg-primary text-black font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-glow">
                                            Contacter un Expert
                                        </Button>
                                    </div>
                                    <div className="hidden lg:flex relative">
                                        <div className="h-48 w-48 rounded-full border border-primary/20 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                                            <div className="h-4 w-4 bg-primary rounded-full absolute top-0" />
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <ShoppingBag className="h-16 w-16 text-primary/30" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Secondary Actions */}
                            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                                <Link href="/shop" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                    Continuer mes achats <ExternalLink className="h-3 w-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Link>
                                <span className="text-muted-foreground/20">|</span>
                                <Link href="/contact" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary">
                                    Support Client
                                </Link>
                                <span className="text-muted-foreground/20">|</span>
                                <Link href="/faq" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary">
                                    Questions Fréquentes
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}


