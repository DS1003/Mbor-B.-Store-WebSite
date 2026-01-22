"use client"

import * as React from "react"
import {
    Plus,
    Minus,
    Search,
    MessageCircle,
    Truck,
    RefreshCcw,
    CreditCard,
    ShieldCheck,
    ArrowRight
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FAQPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            {/* Minimalist Hero */}
            <section className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
                <div className="container-custom relative z-10 text-center space-y-8">
                    <ScrollReveal direction="down">
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
                            Centre d'Aide & Support
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                            Questions <span className="text-primary italic">Fréquentes.</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.4} className="max-w-2xl mx-auto">
                        <div className="relative mt-12">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher une réponse (ex: Livraison, Retours...)"
                                className="h-20 pl-16 pr-8 rounded-[2rem] border-2 border-muted bg-background text-base font-medium shadow-2xl focus:border-primary/50 transition-all outline-none"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="py-24 md:py-40">
                <div className="container-custom max-w-4xl">
                    <div className="space-y-24">
                        {/* Delivery Section */}
                        <ScrollReveal>
                            <div className="space-y-12">
                                <div className="flex items-center space-x-4 border-l-4 border-primary pl-6">
                                    <Truck className="h-6 w-6 text-primary" />
                                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Expédition & Livraison</h2>
                                </div>
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    <AccordionItem value="item-1" className="border-2 border-muted rounded-[2rem] px-8 bg-card transition-all hover:border-primary/20">
                                        <AccordionTrigger className="hover:no-underline py-8 text-left">
                                            <span className="text-lg font-black uppercase italic tracking-tighter">Quels sont les délais de livraison à Dakar ?</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-8 text-muted-foreground font-medium text-base leading-relaxed">
                                            Pour toute commande passée avant 14h, la livraison est effectuée le jour même dans Dakar et sa banlieue. Après 14h, vous recevrez votre colis le lendemain matin.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2" className="border-2 border-muted rounded-[2rem] px-8 bg-card transition-all hover:border-primary/20">
                                        <AccordionTrigger className="hover:no-underline py-8 text-left">
                                            <span className="text-lg font-black uppercase italic tracking-tighter">Livrez-vous dans les régions du Sénégal ?</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-8 text-muted-foreground font-medium text-base leading-relaxed">
                                            Oui, nous livrons partout au Sénégal (Saint-Louis, Thiès, Ziguinchor, etc.) via nos partenaires de transport. Le délai moyen est de 24h à 48h.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </ScrollReveal>

                        {/* Payments Section */}
                        <ScrollReveal delay={0.2}>
                            <div className="space-y-12">
                                <div className="flex items-center space-x-4 border-l-4 border-primary pl-6">
                                    <CreditCard className="h-6 w-6 text-primary" />
                                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Paiements & Sécurité</h2>
                                </div>
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    <AccordionItem value="pay-1" className="border-2 border-muted rounded-[2rem] px-8 bg-card transition-all hover:border-primary/20">
                                        <AccordionTrigger className="hover:no-underline py-8 text-left">
                                            <span className="text-lg font-black uppercase italic tracking-tighter">Quels sont les modes de paiement acceptés ?</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-8 text-muted-foreground font-medium text-base leading-relaxed">
                                            Nous acceptons Wave, Orange Money, Free Money et le paiement en espèces à la livraison (Dakar uniquement).
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="pay-2" className="border-2 border-muted rounded-[2rem] px-8 bg-card transition-all hover:border-primary/20">
                                        <AccordionTrigger className="hover:no-underline py-8 text-left">
                                            <span className="text-lg font-black uppercase italic tracking-tighter">Puis-je payer en plusieurs fois ?</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-8 text-muted-foreground font-medium text-base leading-relaxed">
                                            Actuellement, nous ne proposons pas de paiement échelonné, mais suivez nos réseaux sociaux pour toute mise à jour future.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </ScrollReveal>

                        {/* Products Section */}
                        <ScrollReveal delay={0.4}>
                            <div className="space-y-12">
                                <div className="flex items-center space-x-4 border-l-4 border-primary pl-6">
                                    <ShieldCheck className="h-6 w-6 text-primary" />
                                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Authenticité & Qualité</h2>
                                </div>
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    <AccordionItem value="prod-1" className="border-2 border-muted rounded-[2rem] px-8 bg-card transition-all hover:border-primary/20">
                                        <AccordionTrigger className="hover:no-underline py-8 text-left">
                                            <span className="text-lg font-black uppercase italic tracking-tighter">Vos maillots sont-ils authentiques ?</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-8 text-muted-foreground font-medium text-base leading-relaxed">
                                            Absolument. Mbor Store ne propose que des produits 100% authentiques provenant directement des équipementiers officiels (Nike, Adidas, Puma).
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="mt-32 p-12 bg-black text-white rounded-[4rem] text-center space-y-8 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 h-40 w-40 bg-primary/20 blur-[100px] rounded-full" />
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter">Encore une <span className="text-primary italic">Question ?</span></h3>
                        <p className="text-white/60 font-medium max-w-md mx-auto">Notre équipe d'experts WhatsApp est disponible pour vous conseiller en direct.</p>
                        <Magnetic>
                            <Button className="h-20 px-12 bg-primary text-primary-foreground rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] shadow-3xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all group">
                                Discuter sur WhatsApp
                                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                            </Button>
                        </Magnetic>
                    </div>
                </div>
            </section>
        </div>
    )
}
