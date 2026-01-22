"use client"

import * as React from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Send, MessageCircle, Instagram, Facebook, Clock } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            {/* Minimalist Hero */}
            <section className="py-24 md:py-40 bg-muted/20 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <ScrollReveal direction="down">
                            <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] bg-primary/10 px-5 py-2 rounded-full border border-primary/20">
                                Contact & Support
                            </span>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2} className="mt-8">
                            <h1 className="font-heading text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
                                Parlons <br /> <span className="text-primary italic">Performance.</span>
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={0.4} className="mt-10 max-w-2xl">
                            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                                Une question sur un produit, un suivi de commande ou une demande de flocage personnalisé ? Notre équipe d'experts est à votre écoute.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Visual Accent */}
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                    <h2 className="text-[20rem] font-black uppercase italic tracking-tighter leading-none -mb-20 -mr-20 text-primary">DKR</h2>
                </div>
            </section>

            <section className="py-24 md:py-40">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        {/* Contact Info */}
                        <div className="space-y-16">
                            <ScrollReveal direction="left" className="space-y-12">
                                <div className="space-y-10">
                                    <div className="flex items-start space-x-8 group">
                                        <div className="h-16 w-16 bg-card border-2 border-muted rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors shadow-sm">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="space-y-2 pt-2">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Appelez-nous</h3>
                                            <a href="tel:+221774272354" className="text-2xl font-black italic tracking-tighter hover:text-primary transition-colors cursor-pointer">+221 77 427 23 54</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-8 group">
                                        <div className="h-16 w-16 bg-card border-2 border-muted rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors shadow-sm">
                                            <MessageCircle className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="space-y-2 pt-2">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">WhatsApp Direct</h3>
                                            <a href="https://wa.me/221785934886" target="_blank" className="text-2xl font-black italic tracking-tighter hover:text-green-500 transition-colors cursor-pointer">+221 78 593 48 86</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-8 group">
                                        <div className="h-16 w-16 bg-card border-2 border-muted rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors shadow-sm">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="space-y-2 pt-2">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Support</h3>
                                            <a href="mailto:contact@mborbusiness.sn" className="text-2xl font-black italic tracking-tighter hover:text-primary transition-colors cursor-pointer">contact@mborbusiness.sn</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 bg-black text-white rounded-[3rem] space-y-8 shadow-2xl overflow-hidden relative">
                                    <div className="absolute top-0 right-0 h-40 w-40 bg-primary/20 blur-[60px] rounded-full" />
                                    <h4 className="text-xl font-black uppercase italic tracking-tighter flex items-center relative z-10">
                                        <Clock className="mr-3 h-5 w-5 text-primary" />
                                        Heures d'Ouverture
                                    </h4>
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white/60">
                                            <span>Lundi - Samedi</span>
                                            <span className="text-white">09:00 — 21:00</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white/60">
                                            <span>Dimanche</span>
                                            <span className="text-rose-400 italic">Fermé</span>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Contact Form */}
                        <ScrollReveal direction="right" delay={0.2}>
                            <div className="bg-card border-2 border-muted/50 p-12 md:p-16 rounded-[4rem] shadow-xl relative">
                                <div className="space-y-12">
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-black uppercase italic tracking-tighter">Envoyez un <span className="text-primary italic">Message</span></h2>
                                        <p className="text-sm font-medium text-muted-foreground">Réponse garantie sous 24h ouvrées.</p>
                                    </div>

                                    <form className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Nom Complet</label>
                                                <Input className="h-16 bg-muted/30 border-2 border-transparent focus:border-primary/30 rounded-2xl px-6 text-sm font-bold shadow-inner" placeholder="Moussa Diop" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email</label>
                                                <Input className="h-16 bg-muted/30 border-2 border-transparent focus:border-primary/30 rounded-2xl px-6 text-sm font-bold shadow-inner" placeholder="moussa@example.sn" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Sujet</label>
                                            <Input className="h-16 bg-muted/30 border-2 border-transparent focus:border-primary/30 rounded-2xl px-6 text-sm font-bold shadow-inner" placeholder="Suivi de commande #ORD-..." />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Message</label>
                                            <Textarea rows={5} className="bg-muted/30 border-2 border-transparent focus:border-primary/30 rounded-[2rem] p-6 text-sm font-bold shadow-inner resize-none" placeholder="Comment pouvons-nous vous aider ?" />
                                        </div>

                                        <Magnetic>
                                            <Button className="w-full h-20 bg-primary text-primary-foreground rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all group">
                                                Envoyer le Message
                                                <Send className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </Button>
                                        </Magnetic>
                                    </form>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Social Map Banner */}
            <section className="py-24 bg-black text-white">
                <div className="container-custom text-center space-y-12">
                    <ScrollReveal>
                        <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter">Suivez l'Actualité <span className="text-primary italic">#MborElite</span></h2>
                    </ScrollReveal>
                    <div className="flex justify-center space-x-10">
                        <Magnetic>
                            <Link href="https://instagram.com/MborbusinessstoreSN" target="_blank" className="flex flex-col items-center group">
                                <div className="h-20 w-20 rounded-[2rem] bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:rotate-12">
                                    <Instagram className="h-8 w-8" />
                                </div>
                                <span className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100">Instagram</span>
                            </Link>
                        </Magnetic>
                        <Magnetic>
                            <Link href="https://facebook.com/MborBusinessCenter" target="_blank" className="flex flex-col items-center group">
                                <div className="h-20 w-20 rounded-[2rem] bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:-rotate-12">
                                    <Facebook className="h-8 w-8" />
                                </div>
                                <span className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100">Facebook</span>
                            </Link>
                        </Magnetic>
                    </div>
                </div>
            </section>
        </div>
    )
}
