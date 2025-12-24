"use client"

import { motion } from "framer-motion"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users2,
    Settings,
} from "lucide-react"

const menuItems = [
    { name: "Tableau de Bord", icon: LayoutDashboard, path: "/admin" },
    { name: "Produits", icon: Package, path: "/admin/products" },
    { name: "Commandes", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Clients", icon: Users2, path: "/admin/customers" },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-72 min-h-screen bg-white/80 backdrop-blur-xl border-r border-zinc-100 flex flex-col sticky top-0 h-screen z-50">
            {/* Logo Section */}
            <div className="h-24 flex items-center px-8">
                <Link href="/admin" className="flex items-center gap-4 group">
                    <div className="h-10 w-10 bg-black flex items-center justify-center rounded-xl shadow-lg shadow-black/20 transform -rotate-3 group-hover:rotate-0 transition-all duration-300">
                        <span className="font-serif font-black text-2xl italic text-[#FFD700]">M</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black uppercase italic tracking-tighter text-black">Mbor B.</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Admin Panel</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                {menuItems.map((item, index) => {
                    const isActive = pathname === item.path

                    return (
                        <Link key={item.name} href={item.path}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden group ${isActive
                                    ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20"
                                    : "text-zinc-500 hover:text-black hover:bg-zinc-50"
                                    }`}
                            >
                                <item.icon
                                    className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-[#FFD700]" : "text-zinc-400 group-hover:text-black"}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                <span className="text-xs font-bold uppercase tracking-wider">{item.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute right-0 top-0 bottom-0 w-1 bg-[#FFD700]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    />
                                )}
                            </motion.div>
                        </Link>
                    )
                })}
            </nav>

            {/* Footer Items */}
            <div className="p-4 mx-4 mb-4 bg-zinc-50/50 rounded-2xl border border-zinc-100">
                <Link
                    href="/admin/settings"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${pathname === "/admin/settings"
                        ? "bg-white text-zinc-900 shadow-md ring-1 ring-zinc-100"
                        : "text-zinc-500 hover:text-black hover:bg-white/50"
                        }`}
                >
                    <Settings
                        className={`h-4 w-4 transition-colors ${pathname === "/admin/settings" ? "text-zinc-900" : "text-zinc-400 group-hover:text-black"}`}
                        strokeWidth={2}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider">Paramètres</span>
                </Link>

                {/* Micro Status */}
                <div className="mt-4 px-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Système Op.</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}

