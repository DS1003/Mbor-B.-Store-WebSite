"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black overflow-x-hidden w-full">
            {/* Noise Overlay Global */}
            <div className="bg-noise absolute inset-0 z-0 pointer-events-none" />
            <Navigation />

            <main className="container py-24 px-4 md:px-6 max-w-4xl mx-auto relative z-10 pt-32">
                <Link href="/signup">
                    <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all text-white hover:text-primary hover:bg-transparent">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'Inscription
                    </Button>
                </Link>

                <div className="space-y-12">
                    <div className="text-center md:text-left border-b border-white/10 pb-10">
                        <h1 className="text-[10vw] sm:text-5xl font-black tracking-tight mb-4 text-white leading-tight uppercase italic">
                            Politique de <span className="text-transparent text-stroke-white">Confidentialité</span>
                        </h1>
                        <p className="text-xl text-white/60">
                            Dernière mise à jour : 20 Décembre 2025
                        </p>
                    </div>

                    <div className="space-y-8 glass-card p-8 md:p-12 rounded-3xl border-none">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">1. Informations que nous collectons</h2>
                            <p className="text-white/70 leading-relaxed">
                                Nous collectons les informations que vous nous fournissez directement, comme lorsque vous créez un compte, effectuez un achat, vous inscrivez à notre newsletter ou nous contactez pour de l'assistance. Ces informations peuvent inclure votre nom, adresse email, adresse de livraison, adresse de facturation et informations de paiement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">2. Comment nous utilisons vos informations</h2>
                            <ul className="list-disc pl-6 space-y-2 text-white/70 leading-relaxed marker:text-[#FFD700]">
                                <li>Pour traiter et exécuter vos commandes, y compris l'envoi d'emails pour confirmer le statut de votre commande et l'expédition.</li>
                                <li>Pour communiquer avec vous sur les produits, services, offres, promotions et événements.</li>
                                <li>Pour surveiller et analyser les tendances, l'utilisation et les activités liées à nos Services.</li>
                                <li>Pour détecter, enquêter et prévenir les transactions frauduleuses et autres activités illégales.</li>
                                <li>Pour personnaliser et améliorer les Services et fournir des publicités, du contenu ou des fonctionnalités correspondant aux profils ou intérêts des utilisateurs.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">3. Partage des informations</h2>
                            <p className="text-white/70 leading-relaxed">
                                Nous ne partageons pas vos informations personnelles avec des tiers sauf comme décrit dans cette politique de confidentialité. Nous pouvons partager vos informations avec des fournisseurs de services tiers qui effectuent des services en notre nom, tels que le traitement des paiements, l'analyse de données, la livraison d'emails, les services d'hébergement, le service client et l'assistance marketing.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">4. Sécurité des Données</h2>
                            <p className="text-white/70 leading-relaxed">
                                Nous prenons des mesures raisonnables pour protéger les informations vous concernant contre la perte, le vol, l'utilisation abusive et l'accès non autorisé, la divulgation, l'altération et la destruction. Cependant, aucune transmission internet ou email n'est jamais totalement sécurisée ou sans erreur.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">5. Cookies</h2>
                            <p className="text-white/70 leading-relaxed">
                                Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité sur notre Service et conserver certaines informations. Vous pouvez demander à votre navigateur de refuser tous les cookies ou d'indiquer quand un cookie est envoyé.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">6. Contactez-nous</h2>
                            <p className="text-white/70 leading-relaxed">
                                Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter à privacy@mborbusiness.com.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
