"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Users, Trophy, Flag, MapPin } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FFD700] selection:text-black">
            <Navigation />

            <main className="pt-24 pb-20">

                {/* HERO SECTION - LIGHT THEME */}
                <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden mb-24 bg-zinc-50">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/mbor-storefront.jpg"
                            alt="Mbor Store Interior"
                            fill
                            className="object-cover opacity-100"
                        />
                        <div className="absolute inset-0 bg-white/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                    </div>

                    <div className="container mx-auto px-6 relative z-10 text-center space-y-6">
                        <div className="inline-flex items-center gap-2 border border-black/10 bg-white/80 px-4 py-1 rounded-full text-black text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
                            <Flag className="h-3 w-3" /> Le Meilleur de Dakar
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-black drop-shadow-sm">
                            L'<span className="text-transparent text-stroke-black">HISTOIRE.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-black/70 max-w-2xl mx-auto leading-relaxed font-medium bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                            Forgé dans les rues du Point E. Mbor Business Store n'est pas juste une boutique; c'est un sanctuaire pour la culture football et l'esthétique premium.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-6 lg:px-12 max-w-[1440px]">

                    {/* MISSION STATEMENT */}
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black">
                                Plus Que <br /> <span className="text-[#FFD700]">Du Merch.</span>
                            </h2>
                            <div className="space-y-6 text-zinc-600 font-medium leading-relaxed">
                                <p>
                                    Fondé en 2026, MBOR Business Store est né d'une obsession singulière : la perfection. Nous avons vu un vide sur le marché pour des équipements de football vraiment authentiques et des sneakers exclusives en Afrique de l'Ouest.
                                </p>
                                <p>
                                    Nous comblons le fossé entre les géants mondiaux du sportswear et le cœur vibrant de la culture urbaine de Dakar. Chaque maillot raconte une histoire. Chaque sneaker marque un moment.
                                </p>
                            </div>
                            <div className="flex gap-8 pt-4">
                                <div className="space-y-1">
                                    <h4 className="text-3xl font-black text-black">5K+</h4>
                                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Clients Heureux</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-3xl font-black text-black">100%</h4>
                                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Authentique</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-3xl font-black text-black">24/7</h4>
                                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Support</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden border border-zinc-100 group shadow-2xl">
                            <Image
                                src="/streetwear-collection-urban-fashion.jpg"
                                alt="Store Culture"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-8 left-8">
                                <div className="bg-white text-black px-4 py-2 rounded-full font-bold uppercase text-xs inline-flex items-center gap-2">
                                    <MapPin className="h-3 w-3" /> Point E, Dakar
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VALUES GRID */}
                    <div className="grid md:grid-cols-3 gap-8 mb-32">
                        {[
                            { title: "Authenticité", icon: ShieldCheck, desc: "Chaque article est rigoureusement vérifié. Nous ne vendons pas de contrefaçons. Seuls les produits officiels et d'élite entrent dans notre coffre." },
                            { title: "Communauté", icon: Users, desc: "Ancré au Sénégal, au service des rêveurs et acteurs panafricains. Nous soutenons les ligues locales et les jeunes talents." },
                            { title: "Excellence", icon: Trophy, desc: "De notre emballage à notre service client, l'expérience égale la qualité premium de notre inventaire." }
                        ].map((val, i) => (
                            <div key={i} className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all group">
                                <div className="bg-black text-white p-4 rounded-xl inline-block mb-6 group-hover:bg-[#FFD700] group-hover:text-black transition-colors group-hover:scale-110">
                                    <val.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black uppercase italic mb-4 text-black">{val.title}</h3>
                                <p className="text-zinc-500 leading-relaxed text-sm font-medium">
                                    {val.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="rounded-[3rem] bg-[#FFD700] relative overflow-hidden text-black text-center py-20 px-6">
                        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                                Rejoignez Le <span className="text-white drop-shadow-sm">Mouvement.</span>
                            </h2>
                            <p className="font-bold text-lg md:text-xl opacity-80">
                                Découvrez le nouveau standard de la vente au détail de sportswear à Dakar. Visitez-nous aujourd'hui ou achetez la collection en ligne.
                            </p>
                            <Button className="h-14 px-10 bg-black text-white hover:bg-white hover:text-black font-black uppercase tracking-widest rounded-full transition-all">
                                Explorer l'Inventaire
                            </Button>
                        </div>
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <Image src="/premium-sneakers-and-jordans.jpg" fill className="object-cover" alt="texture" />
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    )
}
