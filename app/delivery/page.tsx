"use client"

import * as React from "react"
import {
    Truck,
    Clock,
    Globe,
    MapPin,
    Package,
    CheckCircle2,
    ArrowRight
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DeliveryPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            {/* Header */}
            <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://www.foot.fr/img/cms/mural-chaussures-foot-fr.jpg" className="w-full h-full object-cover grayscale" alt="Background" />
                </div>
                <div className="container-custom relative z-10 text-center space-y-8">
                    <ScrollReveal direction="down">
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
                            Logistique & Distribution
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                            Vivre l'Expérience <span className="text-primary italic">Rapide.</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.4} className="max-w-2xl mx-auto opacity-70">
                        <p className="text-lg font-medium leading-relaxed italic">De nos entrepôts à votre porte, nous garantissons une livraison sécurisée et ultra-performante.</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Delivery Methods */}
            <section className="py-24 md:py-40">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Dakar Express",
                                desc: "Livraison le jour même pour toute commande passée avant 14h.",
                                time: "0 - 24 Heures",
                                price: "2,000 F",
                                icon: Clock,
                                highlight: true
                            },
                            {
                                title: "Régions Sénégal",
                                desc: "Expédition nationale vers toutes les grandes villes du pays.",
                                time: "24 - 48 Heures",
                                price: "3,500 F",
                                icon: MapPin,
                                highlight: false
                            },
                            {
                                title: "International",
                                desc: "Livraison partout dans le monde via DHL ou FedEx.",
                                time: "3 - 7 Jours",
                                price: "Sur Devis",
                                icon: Globe,
                                highlight: false
                            }
                        ].map((method, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className={cn(
                                    "p-12 rounded-[3.5rem] border-2 space-y-10 h-full relative overflow-hidden",
                                    method.highlight ? "bg-black text-white border-black shadow-2xl scale-[1.05]" : "bg-card border-muted hover:border-primary/20 transition-all"
                                )}>
                                    {method.highlight && (
                                        <div className="absolute top-0 right-0 p-8">
                                            <span className="bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Populaire</span>
                                        </div>
                                    )}
                                    <div className={cn("h-16 w-16 rounded-[1.5rem] flex items-center justify-center", method.highlight ? "bg-primary text-primary-foreground" : "bg-muted text-primary")}>
                                        <method.icon className="h-8 w-8" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{method.title}</h3>
                                        <p className={cn("text-sm font-medium leading-relaxed", method.highlight ? "text-white/60" : "text-muted-foreground")}>{method.desc}</p>
                                    </div>
                                    <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Délai</p>
                                            <p className="text-xl font-black italic tracking-tighter">{method.time}</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Tarif</p>
                                            <p className="text-xl font-black italic tracking-tighter">{method.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <ScrollReveal direction="left">
                            <div className="space-y-10">
                                <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-tight">Suivi de <span className="text-primary italic">Colis</span> en Temps Réel.</h2>
                                <p className="text-lg text-muted-foreground font-medium leading-relaxed">Chaque commande est accompagnée d'un numéro de suivi. Recevez des notifications WhatsApp à chaque étape de la livraison.</p>
                                <div className="space-y-6">
                                    {[
                                        "Préparation de commande sous 2h",
                                        "Notifications SMS & WhatsApp",
                                        "Assurance transport incluse",
                                        "Remise en main propre"
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-center space-x-4">
                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-black uppercase tracking-widest">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right" className="relative group">
                            <div className="aspect-video rounded-[3rem] overflow-hidden border-2 border-muted shadow-2xl relative">
                                <img src="https://www.foot.fr/img/cms/mural-chaussures-foot-fr.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Warehouse" />
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-primary h-20 w-20 rounded-full flex items-center justify-center animate-pulse">
                                        <Package className="h-10 w-10 text-primary-foreground" />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    )
}
