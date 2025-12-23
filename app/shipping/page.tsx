"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Truck, Globe, Clock, ShieldCheck } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
            {/* Noise Overlay Global */}
            <div className="bg-noise absolute inset-0 z-0 pointer-events-none" />
            <Navigation />

            <main className="container py-24 px-4 md:px-6 max-w-4xl mx-auto relative z-10">
                <Link href="/">
                    <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all text-white hover:text-primary hover:bg-transparent">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'Accueil
                    </Button>
                </Link>

                <div className="space-y-12">
                    <div className="space-y-16">
                        <div className="text-center">
                            <h1 className="text-5xl font-black tracking-tight mb-6 text-white">Informations de Livraison</h1>
                            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                                Tout ce que vous devez savoir sur la livraison de votre équipement premium.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex gap-6 p-8 glass-card rounded-3xl border-none hover:bg-white/5 transition-colors duration-300">
                                <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                    <Truck className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">Livraison Locale</h3>
                                    <p className="text-white/70 mb-4 leading-relaxed">
                                        Livraison rapide à Dakar et dans les villes majeures du Sénégal.
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-white/50 space-y-2">
                                        <li>Dakar: 24h - 48h</li>
                                        <li>Régions : 2 - 4 jours ouvrables</li>
                                        <li>Gratuit pour les commandes de plus de 50 000 FCFA</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-6 p-8 glass-card rounded-3xl border-none hover:bg-white/5 transition-colors duration-300">
                                <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                    <Globe className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">Expédition Internationale</h3>
                                    <p className="text-white/70 mb-4 leading-relaxed">
                                        Nous confirmons l'expédition vers l'Afrique de l'Ouest, l'Europe et l'Amérique du Nord.
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-white/50 space-y-2">
                                        <li>Afrique de l'Ouest : 5 - 7 jours ouvrables</li>
                                        <li>Europe/US : 7 - 14 jours ouvrables</li>
                                        <li>Suivi via DHL ou FedEx</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-6 p-8 glass-card rounded-3xl border-none hover:bg-white/5 transition-colors duration-300">
                                <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                    <Clock className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">Temps de Traitement</h3>
                                    <p className="text-white/70 leading-relaxed">
                                        Les commandes sont traitées du lundi au vendredi sur nos terminaux. Les commandes passées le week-end ou les jours fériés seront traitées le jour ouvrable suivant.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 p-8 glass-card rounded-3xl border-none hover:bg-white/5 transition-colors duration-300">
                                <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">Suivi de Commande</h3>
                                    <p className="text-white/70 leading-relaxed">
                                        Une fois votre commande expédiée, vous recevrez un email de confirmation avec un numéro de suivi pour suivre le trajet de votre colis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
