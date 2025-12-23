"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Search, Menu, X, User, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { LayoutDashboard } from "lucide-react"

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

    const navLinks = [
        { name: "Maillots", href: "/shop?category=jerseys" },
        { name: "Sneakers", href: "/shop?category=sneakers" },
        { name: "Crampons", href: "/shop?category=boots" },
        { name: "Lifestyle", href: "/shop?category=lifestyle" },
    ]

    return (
        <>
            {/* PROMO BAR */}
            <div className={cn(
                "bg-black text-white text-[10px] font-bold tracking-widest text-center py-2 relative z-[60] transition-all",
                !promoBarVisible && "hidden"
            )}>
                <span className="text-[#FFD700]">EXCLUSIVITÉ MBOR :</span> LIVRAISON GRATUITE DÈS 50 000 FCFA
                <button
                    onClick={() => setPromoBarVisible(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                >
                    <X className="h-3 w-3" />
                </button>
            </div>

            <nav
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-500",
                    !isHomePage
                        ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-2 shadow-sm top-0"
                        : scrolled || !promoBarVisible
                            ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-2 shadow-sm top-0"
                            : "bg-transparent py-4 top-8"
                )}
            >
                <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-2 group">
                        {/* Using text logo for sharpness as per modern standards, mixed with image if needed */}
                        <div className="relative h-10 w-10 md:h-12 md:w-12 bg-[#FFD700] flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                            <span className="font-serif font-black text-2xl italic text-black">M</span>
                        </div>
                        <div className="flex flex-col">
                            <span className={cn(
                                "font-black text-xl italic leading-none tracking-tighter uppercase transition-colors text-white"
                            )}>
                                MBOR
                            </span>
                            <span className={cn(
                                "text-[8px] font-bold tracking-[0.4em] uppercase opacity-60 text-white"
                            )}>
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
                                className={cn(
                                    "text-xs font-bold uppercase tracking-widest relative group text-white hover:text-[#FFD700]"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-[#FFD700]"
                                )} />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className={cn("hover:bg-white/10 text-white")}>
                            <Search className="h-5 w-5" />
                        </Button>

                        <Link href="/wishlist">
                            <Button variant="ghost" size="icon" className={cn("hover:bg-white/10 text-white")}>
                                <Heart className="h-5 w-5" />
                            </Button>
                        </Link>

                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className={cn("hover:bg-white/10 relative text-white")}>
                                <ShoppingBag className="h-5 w-5" />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-[#FFD700] rounded-full animate-pulse" />
                            </Button>
                        </Link>

                        {/* AUTH BUTTONS */}
                        <div className="hidden lg:flex items-center gap-1">
                            {session ? (
                                <div className="flex items-center gap-2">
                                    {session.user?.role === "ADMIN" && (
                                        <Link href="/admin">
                                            <Button variant="ghost" size="icon" className="hover:bg-[#FFD700]/10 text-[#FFD700] group" title="Tableau de Bord Admin">
                                                <LayoutDashboard className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                            </Button>
                                        </Link>
                                    )}
                                    <Link href="/profile">
                                        <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                                            <User className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white"
                                        onClick={() => signOut()}
                                    >
                                        Déconnexion
                                    </Button>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </Link>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("lg:hidden text-white")}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 bg-black z-40 lg:hidden animate-in fade-in slide-in-from-right-10 duration-500">
                        <div className="flex flex-col h-full justify-center px-10 gap-8">
                            <div className="absolute top-10 left-10 text-white/50 text-xs font-bold tracking-widest">
                                NAVIGATION
                            </div>
                            {navLinks.map((link, i) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-5xl font-black uppercase italic text-transparent text-stroke hover:text-[#FFD700] hover:text-stroke-none transition-all duration-300 transform hover:translate-x-4"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-12 border-t border-white/10 mt-8 flex flex-col gap-4">
                                {session ? (
                                    <>
                                        {session.user?.role === "ADMIN" && (
                                            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                                                <Button className="w-full bg-[#FFD700] text-black font-black uppercase tracking-widest hover:bg-white">
                                                    Tableau de Bord Admin
                                                </Button>
                                            </Link>
                                        )}
                                        <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                                            <Button variant="outline" className="w-full border-white/20 text-white font-black uppercase tracking-widest">
                                                Profil
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            className="w-full text-zinc-500 font-black uppercase tracking-widest text-xs"
                                            onClick={() => {
                                                signOut()
                                                setMobileMenuOpen(false)
                                            }}
                                        >
                                            Déconnexion
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full bg-[#FFD700] text-black font-black uppercase tracking-widest hover:bg-white">Se Connecter</Button>
                                        </Link>
                                        <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest">Créer un Compte</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}
