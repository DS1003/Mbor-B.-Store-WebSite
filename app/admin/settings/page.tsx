"use client"

import { Card } from "@/components/ui/card"
import { Shield, Database, Globe, Key, Bell, Zap, Sliders, CreditCard } from "lucide-react"
import { PageTransition } from "@/components/admin/page-transition"

export default function AdminSettingsPage() {
    const settingsCategories = [
        {
            title: "Général",
            icon: Sliders,
            desc: "Configuration de base de la boutique",
            status: "Complété"
        },
        {
            title: "Sécurité & Rôles",
            icon: Shield,
            desc: "Gérer les accès administrateurs",
            status: "Sécurisé"
        },
        {
            title: "Paiements",
            icon: CreditCard,
            desc: "Méthodes de paiement et devises",
            status: "Actif"
        },
        {
            title: "Localisation",
            icon: Globe,
            desc: "Zones de livraison et taxes",
            status: "Sénégal"
        },
    ]

    return (
        <PageTransition>
            <div className="space-y-8 pb-20">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-900">Paramètres</h1>
                        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400 mt-1">Gérez la configuration de votre application.</p>
                    </div>
                    <button className="px-8 py-4 bg-black text-[#FFD700] text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-black/20 hover:shadow-black/40 hover:scale-105 transition-all transform hover:-rotate-1">
                        Sauvegarder
                    </button>
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {settingsCategories.map((cat, i) => (
                        <div
                            key={cat.title}
                            className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
                                <cat.icon className="h-24 w-24" />
                            </div>

                            <div className="flex flex-col gap-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="h-14 w-14 bg-black rounded-2xl flex items-center justify-center text-[#FFD700] shadow-lg shadow-black/10 group-hover:rotate-12 transition-all duration-500">
                                        <cat.icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 bg-white px-3 py-1.5 rounded-full shadow-sm border border-zinc-100">
                                        {cat.status}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black italic tracking-tighter text-zinc-900 uppercase">{cat.title}</h3>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-2">{cat.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-xl shadow-zinc-200/50 overflow-hidden">
                    <div className="p-8 border-b border-zinc-100/50 bg-white/40">
                        <h3 className="text-xl font-black italic tracking-tighter text-zinc-900 uppercase">Préférences Système</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-1">Options avancées pour les développeurs.</p>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Mode Environnement</label>
                            <div className="flex items-center gap-4 bg-zinc-100/50 p-2 rounded-2xl w-fit">
                                <button className="h-12 px-6 bg-black text-[#FFD700] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/10 hover:scale-105 transition-all">Production</button>
                                <button className="h-12 px-6 bg-transparent text-zinc-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-black transition-colors">Développement</button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">État du Système</label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest shadow-sm">
                                    <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    Opérationnel
                                </div>
                                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Uptime: 99.9%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
