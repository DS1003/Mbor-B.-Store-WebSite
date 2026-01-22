"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Trophy, Target, ShieldCheck, TrendingUp, Users } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            {/* Minimalist Hero */}
            <section className="py-24 md:py-40 bg-muted/20 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="max-w-5xl">
                        <ScrollReveal direction="down">
                            <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] bg-primary/10 px-5 py-2 rounded-full border border-primary/20">
                                À Propos de Nous
                            </span>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2} className="mt-8">
                            <h1 className="font-heading text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
                                L'Excellence <br /> <span className="text-primary italic">Redéfinie.</span>
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={0.4} className="mt-10 max-w-2xl">
                            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                                Plus qu'une boutique, Mbor Store est le point de convergence entre la performance sportive de haut niveau et l'élégance du lifestyle urbain.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Visual Accent */}
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
                    <h2 className="text-[25rem] font-black uppercase italic tracking-tighter leading-none text-primary">WIN</h2>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 md:py-40">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <ScrollReveal direction="right" className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
                            <Image
                                src="https://www.foot.fr/img/cms/mural-chaussures-foot-fr.jpg"
                                alt="Mbor Store Vision"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                            <div className="absolute bottom-12 left-12 right-12">
                                <span className="text-white text-9xl font-black italic opacity-20 transform translate-y-4">01</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="left" className="space-y-12">
                            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight">
                                Notre Mission : <br /><span className="text-primary">Élever vore style</span>
                            </h2>
                            <div className="space-y-8">
                                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                                    Né de la passion pour le football et la culture streetwear, Mbor Store s'est donné pour mission d'offrir au public sénégalais l'accès aux équipements les plus exclusifs et authentiques du marché.
                                </p>
                                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                                    Nous croyons que chaque détail compte. Du choix des matériaux à l'expérience d'achat, tout est pensé pour ceux qui ne font aucun compromis entre qualité et style.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-8">
                                <div className="space-y-4">
                                    <div className="h-16 w-16 bg-muted/40 rounded-2xl flex items-center justify-center">
                                        <ShieldCheck className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-sm uppercase tracking-widest">100% Authentique</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-16 w-16 bg-muted/40 rounded-2xl flex items-center justify-center">
                                        <Trophy className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-sm uppercase tracking-widest">Qualité Premium</h3>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Values Banner */}
            <section className="py-24 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: Target, title: "Précision", text: "Nous sélectionnons chaque article avec une rigueur absolue pour garantir la satisfaction totale de notre clientèle d'élite." },
                            { icon: TrendingUp, title: "Innovation", text: "Toujours à l'avant-garde des tendances, nous vous apportons les dernières collections mondiales en temps record." },
                            { icon: Users, title: "Communauté", text: "Mbor Store n'est pas juste une marque, c'est un club privé pour les passionnés de sport et de mode." },
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.2} className="space-y-6 group">
                                <div className="h-20 w-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-500">
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">{item.title}</h3>
                                <p className="text-white/60 font-medium leading-relaxed max-w-sm">
                                    {item.text}
                                </p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32">
                <div className="container-custom text-center space-y-12">
                    <ScrollReveal>
                        <h2 className="font-heading text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
                            Rejoignez le <span className="text-primary italic">Mouvement</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto pt-6">
                            Découvrez nos collections et faites partie de l'élite.
                        </p>
                        <div className="pt-8 flex justify-center gap-6">
                            <Magnetic>
                                <Link href="/shop">
                                    <Button className="h-16 px-10 bg-black text-white rounded-2xl text-xs font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-black transition-all shadow-xl">
                                        Voir la Boutique
                                    </Button>
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="/contact">
                                    <Button variant="outline" className="h-16 px-10 rounded-2xl text-xs font-black uppercase tracking-[0.3em] border-2 transition-all">
                                        Nous Contacter
                                    </Button>
                                </Link>
                            </Magnetic>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    )
}
