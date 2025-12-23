"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ReturnsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Navigation />

            <main className="relative pt-32 pb-40 overflow-hidden">
                {/* Massive Background Text */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
                    <h2 className="text-[25vw] font-black leading-none tracking-tighter uppercase italic">REVERSAL_</h2>
                </div>

                <div className="container px-6 relative z-10">
                    {/* Header Section */}
                    <div className="max-w-4xl mb-24 space-y-4">
                        <p className="text-primary font-black uppercase tracking-[0.6em] text-[10px]">Opérations</p>
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] italic">
                            RETOURS <br />
                            <span className="text-muted-foreground/30 not-italic uppercase">& REMBOURSEMENTS_</span>
                        </h1>
                    </div>

                    <div className="max-w-4xl space-y-20">
                        <section className="space-y-8">
                            <div className="space-y-2">
                                <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Directives</p>
                                <h2 className="text-3xl font-black uppercase italic">APERÇU_POLITIQUE</h2>
                            </div>
                            <div className="p-10 border-l border-border bg-secondary/5 rounded-r-[3rem] backdrop-blur-sm space-y-6">
                                <p className="text-muted-foreground text-sm font-medium leading-[1.8]">
                                    Vous disposez de 30 jours à compter de la date d'expédition pour retourner votre achat des Archives MBOR gratuitement, à condition que les articles ne soient ni portés, ni lavés, et dans leur emballage d'origine.
                                </p>
                                <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 italic">NOTE_OPÉRATIONNELLE // 01</p>
                                    <p className="text-xs font-bold text-foreground">Les articles personnalisés (maillots avec noms/numéros) sont verrouillés et ne peuvent être retournés sauf en cas d'échec de protocole (défaut) détecté.</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div className="space-y-2">
                                <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Protocole</p>
                                <h2 className="text-3xl font-black uppercase italic">PROCESSUS_RETOUR</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { step: "01", title: "INITIER_SESSION", desc: "Allez dans votre Historique de Commandes sur votre profil, sélectionnez la session et cliquez sur 'Retourner Articles'. Générez le hash de retour." },
                                    { step: "02", title: "SECURISER_ARTICLES", desc: "Placez les article(s) dans la boîte d'expédition d'origine. Appliquez l'étiquette prépayée de manière sécurisée." },
                                    { step: "03", title: "EXPEDIER_RETOUR", desc: "Déposez votre colis à n'importe quel point relais autorisé. Le suivi en temps réel débutera à la réception." }
                                ].map((item) => (
                                    <div key={item.step} className="p-8 border-l border-border hover:border-primary transition-all bg-secondary/5 rounded-r-3xl group">
                                        <div className="flex items-start gap-6">
                                            <span className="text-4xl font-black text-muted-foreground/20 group-hover:text-primary/30 transition-colors uppercase italic">{item.step}</span>
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-black uppercase italic">{item.title}</h3>
                                                <p className="text-muted-foreground text-sm font-medium leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div className="space-y-2">
                                <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Règlement</p>
                                <h2 className="text-3xl font-black uppercase italic">REMBOURSEMENT_FINANCIER</h2>
                            </div>
                            <div className="p-10 border-l border-border bg-secondary/5 rounded-r-[3rem] backdrop-blur-sm">
                                <p className="text-muted-foreground text-sm font-medium leading-[1.8]">
                                    Une fois votre retour reçu, nous inspecterons le(s) article(s) et traiterons votre remboursement sous 5-7 jours ouvrables. Le remboursement sera expédié vers votre mode de paiement d'origine.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
