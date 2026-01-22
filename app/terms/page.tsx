"use client"

import * as React from "react"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function TermsPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <section className="py-24 md:py-40">
                <div className="container-custom max-w-4xl">
                    <ScrollReveal>
                        <h1 className="font-heading text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-16">
                            Conditions Générales <br /><span className="text-primary font-medium italic">de Vente.</span>
                        </h1>
                    </ScrollReveal>

                    <div className="prose prose-invert prose-p:text-muted-foreground prose-h3:text-foreground prose-h3:font-black prose-h3:uppercase prose-h3:italic prose-h3:tracking-tighter prose-h3:text-2xl space-y-16">
                        <ScrollReveal delay={0.1}>
                            <section className="space-y-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">1. Objet</h3>
                                <p className="text-lg leading-relaxed">
                                    Les présentes conditions générales de vente (CGV) ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne de produits proposés par Mbor Store au client.
                                </p>
                            </section>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <section className="space-y-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">2. Produits et Authenticité</h3>
                                <p className="text-lg leading-relaxed">
                                    Mbor Store s'engage à ne commercialiser que des articles 100% authentiques. Chaque produit est rigoureusement vérifié avant sa mise en ligne et son expédition.
                                </p>
                            </section>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <section className="space-y-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">3. Prix et Paiement</h3>
                                <p className="text-lg leading-relaxed">
                                    Les prix sont indiqués en Francs CFA (XOF). Les paiements peuvent être effectués via Wave, Orange Money, ou en espèces à la livraison selon les zones définies.
                                </p>
                            </section>
                        </ScrollReveal>

                        <ScrollReveal delay={0.4}>
                            <section className="space-y-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">4. Livraison</h3>
                                <p className="text-lg leading-relaxed">
                                    Les délais de livraison varient de 24h à 72h pour le Sénégal. Mbor Store décline toute responsabilité en cas de retard indépendant de sa volonté lié au transporteur.
                                </p>
                            </section>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    )
}
