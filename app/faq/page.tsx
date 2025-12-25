import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden w-full">
            <Navigation />

            <main className="relative pt-32 pb-40 overflow-hidden">
                {/* Massive Background Text */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
                    <h2 className="text-[25vw] font-black leading-none tracking-tighter uppercase italic">HANDBOOK_</h2>
                </div>

                <div className="container px-6 relative z-10 w-full overflow-hidden">
                    {/* Header Section */}
                    <div className="max-w-4xl mb-24 space-y-4">
                        <p className="text-primary font-black uppercase tracking-[0.6em] text-[10px]">Renseignements</p>
                        <h1 className="text-[12vw] sm:text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] italic">
                            QUESTIONS <br />
                            <span className="text-muted-foreground/30 not-italic uppercase">FREQUENTES_</span>
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium max-w-sm mt-8">
                            Renseignements dépêchés pour l'excellence opérationnelle. Trouvez vos réponses ci-dessous.
                        </p>
                    </div>

                    <div className="max-w-5xl space-y-8">
                        <Accordion type="single" collapsible className="w-full space-y-6">
                            {[
                                {
                                    q: "Combien de temps prend la livraison ?",
                                    a: "Nous traitons les commandes sous 1 à 2 jours ouvrables. La livraison au Sénégal prend généralement 2 à 3 jours ouvrables. L'expédition internationale peut prendre 7 à 14 jours ouvrables selon la destination."
                                },
                                {
                                    q: "Quelle est votre politique de retour ?",
                                    a: "Nous acceptons les retours sous 30 jours après achat pour les articles inutilisés dans leur emballage d'origine. Veuillez contacter notre équipe support pour initier un retour via le terminal."
                                },
                                {
                                    q: "Vos produits sont-ils authentiques ?",
                                    a: "Affirmatif. Nous garantissons l'authenticité de tous nos produits. Nous nous approvisionnons directement auprès de distributeurs agréés et de marques d'élite mondialement."
                                },
                                {
                                    q: "Puis-je suivre ma commande ?",
                                    a: "Chaque expédition est suivie en temps réel. Une fois votre commande expédiée, vous recevrez une confirmation avec un code de suivi unique par email chiffré."
                                },
                                {
                                    q: "Quels moyens de paiement acceptez-vous ?",
                                    a: "Nous acceptons les principaux réseaux de crédit/débit, Wave, Orange Money et les actifs numériques incluant PayPal."
                                }
                            ].map((item, idx) => (
                                <AccordionItem
                                    key={idx}
                                    value={`item-${idx}`}
                                    className="border-none group overflow-hidden"
                                >
                                    <div className="p-1 border-l border-border hover:border-primary transition-all bg-secondary/5 rounded-r-[2rem] hover:bg-secondary/10 px-8">
                                        <AccordionTrigger className="text-xl md:text-2xl font-black uppercase italic tracking-tight hover:no-underline py-8 text-left">
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground text-sm font-medium leading-[1.8] pb-8 pr-12">
                                            {item.a}
                                        </AccordionContent>
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
