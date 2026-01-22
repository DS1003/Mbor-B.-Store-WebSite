"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ShoppingBag, User, Heart, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const NAV_ITEMS = [
    { icon: Home, label: "Accueil", href: "/" },
    { icon: LayoutGrid, label: "Catalogue", href: "/shop" },
    { icon: ShoppingBag, label: "Panier", href: "/cart", badge: 0 },
    { icon: Heart, label: "Favoris", href: "/wishlist" },
    { icon: User, label: "Profil", href: "/account" },
]

export function MobileNavbar() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (pathname?.startsWith("/admin")) return null

    return (
        <div className={cn(
            "lg:hidden fixed bottom-0 left-0 right-0 z-[100] px-6 pb-6 pt-10 pointer-events-none transition-transform duration-500",
            scrolled ? "translate-y-0" : "translate-y-2"
        )}>
            {/* Ambient Background Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none -z-10" />

            <nav className="flex items-center justify-around h-16 bg-background/90 backdrop-blur-3xl border border-white/20 dark:border-white/5 rounded-2xl shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] pointer-events-auto px-2 relative overflow-hidden">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex flex-col items-center justify-center flex-1 h-full z-10 transition-colors duration-300",
                                isActive ? "text-primary" : "text-foreground/40"
                            )}
                        >
                            <motion.div
                                className="flex flex-col items-center gap-1"
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                                <item.icon className={cn(
                                    "h-5 w-5 transition-all duration-300",
                                    isActive && "fill-current"
                                )} />
                                <span className={cn(
                                    "text-[10px] font-bold tracking-tight transition-all duration-300",
                                    isActive ? "opacity-100" : "opacity-0 hidden"
                                )}>
                                    {item.label}
                                </span>
                            </motion.div>

                            {/* Badge */}
                            {item.badge !== undefined && item.badge > 0 && (
                                <span className="absolute top-2 right-1/2 translate-x-4 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground border-2 border-background shadow-sm">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
