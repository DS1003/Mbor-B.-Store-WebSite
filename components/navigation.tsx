"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Search, Menu as MenuIcon, X, User, Heart, LayoutDashboard, ArrowRight, Instagram, Facebook, Twitter } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { motion, AnimatePresence, Variants } from "framer-motion"

export function Navigation() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const isHomePage = pathname === "/"
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [promoBarVisible, setPromoBarVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close menu on route change
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    // Prevent scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [mobileMenuOpen])

    const navLinks = [
        { name: "Maillots", href: "/shop?category=jerseys", desc: "Authentiques Kits 24/25" },
        { name: "Sneakers", href: "/shop?category=sneakers", desc: "Grails & Limited Drops" },
        { name: "Crampons", href: "/shop?category=boots", desc: "Elite Performance Gear" },
        { name: "Lifestyle", href: "/shop?category=lifestyle", desc: "Street Culture Essentials" },
    ]

    const menuVariants: Variants = {
        closed: {
            x: "100%",
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        closed: { x: 50, opacity: 0 },
        open: { x: 0, opacity: 1 }
    }

    return (
        <>
            {/* PROMO BAR */}
            <AnimatePresence>
                {promoBarVisible && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-black text-white text-[10px] font-bold tracking-[0.3em] text-center py-2 relative z-[60] overflow-hidden"
                    >
                        <span className="text-[#FFD700]">EXCLUSIVITÉ MBOR :</span> LIVRAISON GRATUITE DÈS 50 000 FCFA
                        <button
                            onClick={() => setPromoBarVisible(false)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav
                className={cn(
                    "fixed z-50 w-full transition-all duration-700",
                    !isHomePage
                        ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-2 top-0"
                        : scrolled || !promoBarVisible
                            ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-2 top-0"
                            : "bg-transparent py-4 top-8 sm:top-10"
                )}
            >
                <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-3 group relative z-[110]">
                        <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="relative h-10 w-10 md:h-12 md:w-12 bg-[#FFD700] flex items-center justify-center shadow-xl shadow-[#FFD700]/10"
                        >
                            <span className="font-serif font-black text-2xl italic text-black">M</span>
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl italic leading-none tracking-tighter uppercase text-white">
                                MBOR
                            </span>
                            <span className="text-[8px] font-bold tracking-[0.4em] uppercase opacity-40 text-white">
                                Business Store
                            </span>
                        </div>
                    </Link>

                    {/* DESKTOP NAV */}
                    <div className="hidden lg:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[11px] font-black uppercase tracking-[0.2em] relative group text-white hover:text-[#FFD700] transition-colors"
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full bg-[#FFD700]" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 sm:gap-3 relative z-[110]">
                        <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white hidden sm:flex">
                            <Search className="h-5 w-5" />
                        </Button>

                        <Link href="/wishlist" className="hidden sm:block">
                            <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                                <Heart className="h-5 w-5" />
                            </Button>
                        </Link>

                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="hover:bg-white/10 relative text-white px-2">
                                <ShoppingBag className="h-5 w-5" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#FFD700] rounded-full animate-pulse shadow-lg shadow-[#FFD700]/50" />
                            </Button>
                        </Link>

                        {/* AUTH DESKTOP */}
                        <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
                            {session ? (
                                <div className="flex items-center gap-3">
                                    {session.user?.role === "ADMIN" && (
                                        <Link href="/admin">
                                            <Button variant="ghost" size="sm" className="hover:bg-[#FFD700]/10 text-[#FFD700] gap-2 px-3 text-[10px] font-black uppercase tracking-widest">
                                                <LayoutDashboard className="h-4 w-4" />
                                                Admin
                                            </Button>
                                        </Link>
                                    )}
                                    <Link href="/profile">
                                        <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 hover:border-[#FFD700] transition-colors overflow-hidden">
                                            {session.user?.image ? (
                                                <Image src={session.user.image} alt="User" width={36} height={36} className="object-cover" />
                                            ) : (
                                                <User className="h-4 w-4 text-white" />
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <Button size="sm" className="bg-[#FFD700] text-black hover:bg-white font-black uppercase tracking-[0.2em] text-[10px] px-6 h-9 rounded-none clip-diagonal transition-all">
                                        Connexion
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* MOBILE TOGGLE */}
                        <button
                            className="lg:hidden h-10 w-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <motion.span
                                animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                className="w-6 h-[2px] bg-white rounded-full transition-all"
                            />
                            <motion.span
                                animate={mobileMenuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                                className="w-5 h-[2px] bg-[#FFD700] rounded-full self-end"
                            />
                            <motion.span
                                animate={mobileMenuOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 20 }}
                                className="w-[20px] h-[2px] bg-white rounded-full self-end transition-all"
                            />
                        </button>
                    </div>
                </div>

                {/* MODERN MOBILE MENU */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="fixed inset-0 w-full sm:w-[450px] sm:left-auto sm:right-0 bg-black z-[100] lg:hidden shadow-[-20px_0_60px_rgba(0,0,0,0.8)] border-l border-white/5 flex flex-col"
                        >
                            {/* Menu Header (Logo Repeat or Info) */}
                            <div className="p-10 pt-32 pb-8 space-y-2 border-b border-white/5 bg-zinc-950">
                                <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.5em]">Exclusive Registry</p>
                                <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter leading-none">Menu <span className="text-zinc-600">Principal</span></h2>
                            </div>

                            {/* Main Links */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar px-10 py-12 flex flex-col gap-6">
                                {navLinks.map((link, i) => (
                                    <motion.div key={link.name} variants={itemVariants} className="group">
                                        <Link
                                            href={link.href}
                                            className="flex flex-col gap-1"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-zinc-800 font-black italic text-2xl group-hover:text-[#FFD700] transition-colors">0{i + 1}</span>
                                                <span className="text-4xl sm:text-5xl font-black uppercase italic text-white group-hover:translate-x-3 transition-transform duration-500 tracking-tighter">
                                                    {link.name}
                                                </span>
                                            </div>
                                            <p className="ml-14 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                {link.desc}
                                            </p>
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Mobile Auth Options */}
                                <motion.div variants={itemVariants} className="pt-12 mt-4 border-t border-white/5 space-y-6">
                                    {session ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                                                <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/10 italic font-black text-[#FFD700]">
                                                    {session.user?.name?.charAt(0) || "C"}
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-xs font-black uppercase text-white truncate">{session.user?.name}</p>
                                                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest truncate">{session.user?.email}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <Link href="/profile" className="w-full">
                                                    <Button className="w-full h-14 bg-zinc-900 text-white border border-white/10 hover:bg-[#FFD700] hover:text-black font-black uppercase tracking-widest text-[10px] rounded-xl transition-all">
                                                        Profil
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => signOut()}
                                                    className="w-full h-14 bg-transparent text-zinc-500 border border-white/5 hover:border-red-500/50 hover:text-red-500 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all"
                                                >
                                                    Quit
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-4">
                                            <Link href="/login" className="w-full">
                                                <Button className="w-full h-16 bg-[#FFD700] text-black hover:bg-white font-black uppercase tracking-[0.3em] text-[10px] rounded-none clip-diagonal shadow-2xl shadow-[#FFD700]/10 flex items-center justify-center gap-4 group">
                                                    Accès Membre <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                                                </Button>
                                            </Link>
                                            <p className="text-center text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                                                Rejoignez l'élite de la culture football
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            {/* Menu Footer */}
                            <motion.div variants={itemVariants} className="p-10 bg-black/50 border-t border-white/5 space-y-8">
                                <div className="flex justify-between items-center text-zinc-500">
                                    <div className="flex gap-6">
                                        <Instagram className="h-5 w-5 hover:text-[#FFD700] cursor-pointer transition-colors" />
                                        <Facebook className="h-5 w-5 hover:text-[#FFD700] cursor-pointer transition-colors" />
                                        <Twitter className="h-5 w-5 hover:text-[#FFD700] cursor-pointer transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest italic">Dakar, Senegal</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-[2px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-700">Mbor v2.5.0</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Overlay Background */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[90] lg:hidden"
                        />
                    )}
                </AnimatePresence>
            </nav>
        </>
    )
}
