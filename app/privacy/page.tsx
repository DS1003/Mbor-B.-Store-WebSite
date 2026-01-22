"use client"

import * as React from "react"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function PrivacyPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <section className="py-24 md:py-40">
                <div className="container-custom max-w-4xl">
                    <ScrollReveal>
                        <h1 className="font-heading text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-16">
                            Politique de <br /><span className="text-primary font-medium italic">Confidentialité.</span>
                        </h1>
                    </ScrollReveal>

                    <div className="prose prose-invert prose-p:text-muted-foreground prose-h3:text-foreground prose-h3:font-black prose-h3:uppercase prose-h3:italic prose-h3:tracking-tighter prose-h3:text-2xl space-y-16">
                        <ScrollReveal delay={0.1}>
                            <section className="space-y-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Collecte des Données</h3>
                                <p className="text-lg leading-relaxed">
                                    Nous collectons uniquement les informations nécessaires au traitement de vos commandes et à l'amélioration de votre expérience client (Nom, Adresse, Téléphone, Email).
                                </p>
                            </section>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <section className="space-y-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Utilisation des Informations</h3>
                                <p className="text-lg leading-relaxed">
                                    Vos données ne sont jamais vendues à des tiers. Elles sont uniquement partagées avec nos partenaires logistiques (coursiers) pour assurer la livraison de vos colis.
                                </p>
                            </section>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <section className="space-y-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Sécurité</h3>
                                <p className="text-lg leading-relaxed">
                                    Nous mettons en œuvre toutes les mesures de sécurité nécessaires pour protéger vos informations personnelles contre tout accès non autorisé.
                                </p>
                            </section>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    )
}
