"use client"

import * as React from "react"
import {
    RefreshCcw,
    ShieldCheck,
    Headphones,
    CheckCircle2,
    Calendar,
    ArrowRight
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ReturnsPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            {/* Header */}
            <section className="py-24 md:py-32 bg-rose-500/5 relative overflow-hidden">
                <div className="container-custom relative z-10 text-center space-y-8">
                    <ScrollReveal direction="down">
                        <span className="text-rose-500 font-black uppercase tracking-[0.4em] text-[10px] bg-rose-500/10 px-6 py-2 rounded-full border border-rose-500/20">
                            Service Après-Vente
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                            Échanges & <span className="text-rose-500 italic">Retours.</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.4} className="max-w-2xl mx-auto">
                        <p className="text-lg text-muted-foreground font-medium leading-relaxed italic">Votre satisfaction est notre priorité. Si la taille ne convient pas ou si vous changez d'avis, nous sommes là pour vous aider.</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Policy Section */}
            <section className="py-24 md:py-40">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            {
                                icon: Calendar,
                                title: "14 Jours",
                                desc: "Vous disposez de 14 jours après réception de votre commande pour demander un échange ou un retour."
                            },
                            {
                                icon: ShieldCheck,
                                title: "État Neuf",
                                desc: "L'article doit être dans son état d'origine, non porté, avec toutes ses étiquettes et son emballage intact."
                            },
                            {
                                icon: RefreshCcw,
                                title: "Échange Gratuit",
                                desc: "Le premier échange de taille est gratuit à Dakar. Un coursier vient récupérer le colis et vous livre le nouveau."
                            }
                        ].map((p, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="space-y-8 text-center p-12 bg-card border-2 border-muted hover:border-rose-500/20 transition-all rounded-[3.5rem] group">
                                    <div className="h-20 w-20 bg-rose-500/10 rounded-[2rem] flex items-center justify-center text-rose-500 mx-auto group-hover:scale-110 transition-transform">
                                        <p.icon className="h-10 w-10" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black uppercase italic tracking-tighter">{p.title}</h3>
                                        <p className="text-sm font-medium text-muted-foreground leading-relaxed">{p.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="mt-40 bg-black text-white rounded-[4rem] p-16 md:p-32 relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-full w-1/2 bg-rose-500/10 -skew-x-12 translate-x-1/2" />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-10">
                                <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-tight">Comment effectuer un <span className="text-rose-500 italic">Retour ?</span></h2>
                                <div className="space-y-12">
                                    {[
                                        { s: "01", t: "Contactez le support", d: "Envoyez-nous un message WhatsApp avec votre numéro de commande." },
                                        { s: "02", t: "Préparez votre colis", d: "Remettez l'article dans son emballage d'origine avec précaution." },
                                        { s: "03", t: "Collecte & Traitement", d: "Un coursier passera collecter le colis ou vous pouvez le déposer en boutique." },
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-start space-x-8">
                                            <span className="text-4xl font-black italic text-rose-500 opacity-50">{step.s}</span>
                                            <div className="space-y-2">
                                                <h4 className="text-xl font-black uppercase italic tracking-tighter">{step.t}</h4>
                                                <p className="text-sm font-medium text-white/50">{step.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 space-y-10">
                                <div className="space-y-4">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-rose-500">Besoin d'assistance immédiate ?</p>
                                    <p className="text-2xl font-black italic tracking-tighter">Nos experts SAV sont disponibles de 9h à 19h.</p>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <Magnetic>
                                        <Button className="h-16 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] w-full">
                                            Contacter le SAV WhatsApp
                                        </Button>
                                    </Magnetic>
                                    <Button variant="outline" className="h-16 border-white/20 text-white hover:bg-white hover:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] w-full">
                                        Email Support
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
