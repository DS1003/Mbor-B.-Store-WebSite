"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Bell, HelpCircle, ChevronDown, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { NotificationsPopover } from "@/components/admin/notifications-popover"

export function AdminHeader() {
    return (
        <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-40 bg-white/50 backdrop-blur-xl border-b border-white/40">
            {/* Search Container */}
            <div className="relative w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-black transition-colors" />
                <input
                    type="text"
                    placeholder="RECHERCHER..."
                    className="w-full h-10 pl-12 pr-4 bg-white/70 border border-white rounded-xl text-xs font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all placeholder:text-zinc-400 text-black shadow-sm"
                />
            </div>

            {/* Actions Area */}
            <div className="flex items-center gap-4">
                <NotificationsPopover />

                <div className="h-8 w-px bg-zinc-200" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 gap-3 px-2 hover:bg-transparent rounded-full group">
                            <div className="h-9 w-9 bg-black rounded-full flex items-center justify-center text-[#FFD700] ring-2 ring-white shadow-lg">
                                <span className="font-black text-xs italic">A</span>
                            </div>
                            <div className="flex flex-col items-start hidden sm:flex">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 group-hover:text-black">Admin</span>
                            </div>
                            <ChevronDown className="h-3 w-3 text-zinc-400 group-hover:text-black transition-colors" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-2 bg-white/90 backdrop-blur-xl border border-white rounded-2xl shadow-2xl mt-2">
                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-3 py-2">Mon Compte</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-xs font-bold text-zinc-600 focus:bg-zinc-50 focus:text-black uppercase tracking-wide">
                            Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-xs font-bold text-zinc-600 focus:bg-zinc-50 focus:text-black uppercase tracking-wide">
                            Sécurité
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-100 my-1" />
                        <DropdownMenuItem
                            className="cursor-pointer rounded-xl px-3 py-2.5 text-xs font-bold text-rose-600 focus:bg-rose-50 focus:text-rose-700 uppercase tracking-wide"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                            Déconnexion
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

