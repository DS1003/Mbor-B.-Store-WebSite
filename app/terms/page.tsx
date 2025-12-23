"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
            {/* Noise Overlay Global */}
            <div className="bg-noise absolute inset-0 z-0 pointer-events-none" />
            <Navigation />

            <main className="container py-24 px-4 md:px-6 max-w-4xl mx-auto relative z-10">
                <Link href="/signup">
                    <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all text-white hover:text-primary hover:bg-transparent">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'Inscription
                    </Button>
                </Link>

                <div className="space-y-12">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-black tracking-tight mb-4 text-white">Conditions d'Utilisation</h1>
                        <p className="text-xl text-white/60">
                            Dernière mise à jour : 20 Décembre 2025
                        </p>
                    </div>

                    <div className="space-y-8 glass-card p-8 md:p-12 rounded-3xl border-none">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">1. Accord aux Conditions</h2>
                            <p className="text-white/70 leading-relaxed">
                                En accédant ou en utilisant le site web MBOR Business Store, vous acceptez d'être lié par ces Conditions d'Utilisation et toutes les lois et réglementations applicables. Si vous n'êtes pas d'accord avec l'un de ces termes, il vous est interdit d'utiliser ou d'accéder à ce site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">2. Propriété Intellectuelle</h2>
                            <p className="text-white/70 leading-relaxed">
                                Le contenu, l'organisation, les graphiques, la conception, la compilation et d'autres questions liées au Site sont protégés par les droits d'auteur, marques déposées et autres droits de propriété (y compris mais sans s'y limiter la propriété intellectuelle) applicables. La copie, la redistribution, l'utilisation ou la publication par vous de l'une de ces questions ou de toute partie du Site est strictement interdite.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">3. Compte Utilisateur</h2>
                            <p className="text-white/70 leading-relaxed">
                                Pour accéder à certaines fonctionnalités du site web, vous devrez peut-être créer un compte. Vous êtes responsable du maintien de la confidentialité de vos identifiants de compte et de toutes les activités qui se produisent sous votre compte. Vous acceptez de nous informer immédiatement de toute utilisation non autorisée de votre compte.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">4. Produits et Tarification</h2>
                            <p className="text-white/70 leading-relaxed">
                                Tous les produits listés sur le site web sont sujets à disponibilité. Nous nous réservons le droit d'interrompre tout produit à tout moment. Les prix de nos produits sont sujets à changement sans préavis. Nous ne serons pas responsables envers vous ou envers un tiers pour toute modification, changement de prix, suspension ou interruption du Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">5. Expédition et Livraison</h2>
                            <p className="text-white/70 leading-relaxed">
                                Les délais de livraison sont des estimations et commencent à partir de la date d'expédition, plutôt que de la date de commande. Les délais de livraison doivent être utilisés comme guide uniquement et sont sujets à l'acceptation et à l'approbation de votre commande.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">6. Limitation de Responsabilité</h2>
                            <p className="text-white/70 leading-relaxed">
                                En aucun cas MBOR Business Store, ni ses directeurs, employés, partenaires, agents, fournisseurs ou affiliés, ne seront responsables de tout dommage indirect, accessoire, spécial, consécutif ou punitif, y compris sans limitation, la perte de profits, de données, d'utilisation, de clientèle ou d'autres pertes intangibles, résultant de votre accès à ou de votre utilisation ou de votre incapacité à accéder ou à utiliser le Service.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
