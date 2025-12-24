"use client"

import * as React from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell, ShoppingCart, Package, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"

const notifications = [
    {
        id: 1,
        type: "order",
        title: "Nouvelle commande #OR-9921",
        time: "Il y a 2 min",
        icon: ShoppingCart,
        color: "bg-amber-500",
        unread: true
    },
    {
        id: 2,
        type: "stock",
        title: "Stock faible: Maillot Sénégal Home",
        time: "Il y a 15 min",
        icon: Package,
        color: "bg-red-500",
        unread: true
    },
    {
        id: 3,
        type: "user",
        title: "Nouveau client VIP enregistré",
        time: "Il y a 1h",
        icon: Users,
        color: "bg-emerald-500",
        unread: false
    }
]

export function NotificationsPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <motion.div whileHover={{ y: -2 }}>
                    <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl hover:bg-white hover:shadow-lg transition-all">
                        <Bell className="h-5 w-5 text-zinc-600" />
                        <span className="absolute top-3.5 right-3.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </Button>
                </motion.div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[400px] p-0 rounded-[2rem] overflow-hidden border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white">
                <div className="p-6 bg-zinc-950 text-white flex items-center justify-between">
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">Centre de Flux</h3>
                        <p className="text-lg font-black italic uppercase tracking-tighter">Notifications</p>
                    </div>
                    <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-[#FFD700]" />
                    </div>
                </div>
                <div className="max-h-[400px] overflow-y-auto py-2">
                    {notifications.map((notif, idx) => (
                        <div
                            key={notif.id}
                            className={`p-6 hover:bg-zinc-50 transition-colors cursor-pointer border-b border-zinc-50 last:border-0 flex gap-4 ${notif.unread ? "bg-zinc-50/30" : ""}`}
                        >
                            <div className={`h-10 w-10 shrink-0 rounded-xl ${notif.color} flex items-center justify-center text-white`}>
                                <notif.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-start">
                                    <p className={`text-xs uppercase tracking-tight ${notif.unread ? "font-black text-black" : "font-bold text-zinc-500"}`}>
                                        {notif.title}
                                    </p>
                                    {notif.unread && <div className="h-1.5 w-1.5 rounded-full bg-red-500" />}
                                </div>
                                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{notif.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-zinc-50 text-center">
                    <Button variant="ghost" className="w-full text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black">
                        Tout marquer comme lu
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
