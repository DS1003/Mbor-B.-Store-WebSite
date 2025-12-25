"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Navigation />

            <main className="relative pt-32 pb-40 overflow-hidden">
                {/* Massive Background Text */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
                    <h2 className="text-[30vw] font-black leading-none tracking-tighter">SUPPORT</h2>
                </div>

                <div className="container px-6 relative z-10">
                    {/* Header Section */}
                    <div className="max-w-4xl mb-24 space-y-8">
                        <div className="space-y-4">
                            <p className="text-primary font-black uppercase tracking-[0.6em] text-[10px]">Communication</p>
                            <h1 className="text-[12vw] sm:text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] italic">
                                CONTACTEZ <br />
                                <span className="text-muted-foreground/30 not-italic">NOUS_</span>
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground max-w-xl font-medium leading-relaxed border-l-2 border-primary pl-8">
                            Que vous cherchiez le statut de votre commande, des équipements personnalisés ou des partenariats de marque, notre équipe au QG de Dakar est prête à vous aider.
                        </p>
                    </div>

                    <div className="grid gap-20 lg:grid-cols-[1fr,1.2fr]">
                        {/* Contact Information - Architectural block */}
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                                <div className="p-8 border-l border-border hover:border-primary transition-colors group">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Email Direct</p>
                                    <h3 className="text-2xl font-black italic uppercase mb-2">support@mbor.com</h3>
                                    <p className="text-muted-foreground text-sm font-medium">Réponse mondiale sous 24 heures.</p>
                                </div>

                                <div className="p-8 border-l border-border hover:border-primary transition-colors group">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Opérations Vocales</p>
                                    <h3 className="text-2xl font-black italic uppercase mb-2">+221 77 427 23 54</h3>
                                    <p className="text-muted-foreground text-sm font-medium">Lun - Dim, 09:00 - 21:00 UTC.</p>
                                </div>

                                <div className="p-8 border-l border-border hover:border-primary transition-colors group">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">QG Mondial</p>
                                    <h3 className="text-2xl font-black italic uppercase mb-2">DAKAR, SN</h3>
                                    <p className="text-muted-foreground text-sm font-medium">Les Almadies, Senegal.</p>
                                </div>
                            </div>

                            {/* Operational Status (2026 flare) */}
                            <div className="p-8 bg-secondary/20 rounded-[2rem] border border-border backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Systèmes Actifs</p>
                                </div>
                                <p className="text-sm font-medium leading-relaxed">
                                    Nos canaux de support sont actuellement en performance maximale. Attendez-vous à des réponses rapides sur tous les canaux.
                                </p>
                            </div>
                        </div>

                        {/* Contact Form - Refined Glass block */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-3xl -z-10" />
                            <div className="bg-secondary/10 backdrop-blur-xl border border-border p-10 md:p-16 rounded-[3rem] shadow-2xl">
                                <form className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-1">Identité / Prénom</p>
                                            <Input id="first-name" placeholder="JEAN" required className="h-16 bg-background/50 border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-bold placeholder:opacity-30" />
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-1">Identité / Nom</p>
                                            <Input id="last-name" placeholder="DUPONT" required className="h-16 bg-background/50 border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-bold placeholder:opacity-30" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-1">Entrée / Email de Contact</p>
                                        <Input id="email" placeholder="VOTRE@ADRESSE.COM" type="email" required className="h-16 bg-background/50 border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-bold placeholder:opacity-30" />
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-1">Transmission / Message</p>
                                        <Textarea id="message" placeholder="QU'AVEZ-VOUS EN TÊTE ?" className="min-h-[200px] bg-background/50 border-border rounded-3xl focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-bold placeholder:opacity-30 resize-none p-6" required />
                                    </div>

                                    <Button type="submit" className="w-full h-20 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground group transition-all relative overflow-hidden">
                                        <span className="text-sm font-black uppercase tracking-[0.4em] relative z-10 flex items-center justify-center">
                                            Initier la Transmission <ArrowRight className="ml-4 w-6 h-6 transition-transform group-hover:translate-x-2" />
                                        </span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
