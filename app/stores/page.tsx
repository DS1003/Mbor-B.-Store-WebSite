"use client"

import Image from "next/image"
import { MapPin, Phone, MessageCircle, Clock, Instagram, Facebook, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic, DecryptText } from "@/components/interactions"

export default function StoresPage() {
    const stores = [
        {
            name: "Boutique Pikine",
            address: "Pikine, Dakar, Sénégal",
            phone: "+221 77 427 23 54",
            whatsapp: "+221774272354",
            hours: "Lun - Sam: 09h - 21h",
            mapUrl: "#",
            image: "https://www.foot.fr/img/cms/mural-chaussures-foot-fr.jpg"
        },
        {
            name: "Boutique Sacré-Cœur",
            address: "Sacré-Cœur, Dakar, Sénégal",
            phone: "+221 78 593 48 86",
            whatsapp: "+221785934886",
            hours: "Lun - Sam: 09h - 21h",
            mapUrl: "#",
            image: "https://www.foot.fr/img/cms/piscine-footfr.jpg"
        }
    ]

    return (
        <div className="flex flex-col w-full bg-background overflow-hidden">
            {/* Editorial Hero Header */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
                <Image
                    src="https://www.foot.fr/img/cms/mural-chaussures-foot-fr.jpg"
                    alt="Store Lifestyle"
                    fill
                    className="object-cover opacity-50 contrast-125 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/60" />

                <div className="container-custom relative z-10 text-center space-y-8">
                    <ScrollReveal direction="down">
                        <span className="text-primary font-black uppercase tracking-[0.5em] text-xs px-6 py-2 border border-primary/30 rounded-full bg-primary/5 backdrop-blur-md">
                            Notre Héritage
                        </span>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <h1 className="font-heading text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] text-white">
                            L'Elite <br /> <span className="text-stroke-1 text-primary">Sénégalaise</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4} className="max-w-3xl mx-auto">
                        <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed">
                            Mborbusiness’Store est né d'une passion dévorante pour le football et la culture streetwear. Nous croyons que chaque fan mérite l'authenticité et le style, sans compromis.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Brand Values / Stats */}
            <section className="section-spacing border-y relative bg-card/30">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                        {[
                            { label: "Années d'Expertise", value: "08+" },
                            { label: "Produits Authentiques", value: "5000+" },
                            { label: "Clients Satisfaits", value: "25K+" },
                            { label: "Boutiques Physiques", value: "02" },
                        ].map((stat, i) => (
                            <ScrollReveal key={i} delay={i * 0.1} className="space-y-2">
                                <h3 className="text-5xl font-black italic tracking-tighter text-primary">{stat.value}</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Stores Cards */}
            <section className="section-spacing bg-background">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
                        <ScrollReveal direction="left" className="space-y-6">
                            <h2 className="font-heading text-5xl sm:text-7xl font-black uppercase italic tracking-tighter leading-none">
                                Venez Nous <br /> <span className="text-primary">Rencontrer</span>
                            </h2>
                            <p className="text-muted-foreground font-medium max-w-xl text-lg">
                                Nos espaces physiques sont conçus comme des temples de la performance. Plus que des boutiques, ce sont des lieux d'échange pour tous les passionnés.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {stores.map((store, i) => (
                            <ScrollReveal key={i} delay={i * 0.2}>
                                <div className="group relative bg-card rounded-[4rem] overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
                                    <div className="relative h-[450px] overflow-hidden">
                                        <Image
                                            src={store.image}
                                            alt={store.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                        <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
                                            <div className="space-y-2">
                                                <span className="text-primary font-black uppercase tracking-widest text-[10px]">{store.name.split(' ')[1]}</span>
                                                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">{store.name}</h3>
                                            </div>
                                            <Magnetic>
                                                <Link href={store.mapUrl} className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-black hover:bg-primary hover:text-white transition-all">
                                                    <ArrowRight className="h-6 w-6" />
                                                </Link>
                                            </Magnetic>
                                        </div>
                                    </div>
                                    <div className="p-12 space-y-10">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-3 text-xs font-black uppercase tracking-widest text-primary">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>Localisation</span>
                                                </div>
                                                <p className="text-sm font-medium text-muted-foreground leading-relaxed pl-7">{store.address}</p>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-3 text-xs font-black uppercase tracking-widest text-primary">
                                                    <Clock className="h-4 w-4" />
                                                    <span>Ouverture</span>
                                                </div>
                                                <p className="text-sm font-medium text-muted-foreground leading-relaxed pl-7">{store.hours}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 pt-4">
                                            <Magnetic>
                                                <Link
                                                    href={`https://wa.me/${store.whatsapp.replace(/\s/g, '')}`}
                                                    className="inline-flex h-14 px-10 rounded-2xl bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest items-center hover:scale-105 transition-transform"
                                                >
                                                    <MessageCircle className="h-4 w-4 mr-3" />
                                                    WhatsApp Direct
                                                </Link>
                                            </Magnetic>
                                            <Magnetic>
                                                <Link
                                                    href={`tel:${store.phone.replace(/\s/g, '')}`}
                                                    className="inline-flex h-14 px-10 rounded-2xl bg-muted text-foreground text-[10px] font-black uppercase tracking-widest items-center hover:scale-105 transition-transform"
                                                >
                                                    <Phone className="h-4 w-4 mr-3" />
                                                    Appeler
                                                </Link>
                                            </Magnetic>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Team/Values Segment */}
            <section className="section-spacing bg-black text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 h-full w-1/3 bg-primary/5 -skew-x-12 translate-x-1/2" />
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl space-y-12">
                        <ScrollReveal>
                            <h2 className="font-heading text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                                Plus Qu'une <br /> <span className="text-primary italic">Boutique.</span>
                            </h2>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <ScrollReveal delay={0.2} className="space-y-6">
                                <h4 className="text-xl font-black uppercase italic tracking-tight text-white/90">Curateurs de Passion</h4>
                                <p className="text-gray-400 font-medium leading-relaxed">
                                    Nous sélectionnons méticuleusement chaque article de notre catalogue pour assurer qu'il répond aux standards de performance les plus élevés du marché mondial.
                                </p>
                            </ScrollReveal>
                            <ScrollReveal delay={0.4} className="space-y-6">
                                <h4 className="text-xl font-black uppercase italic tracking-tight text-white/90">Flocage Officiel</h4>
                                <p className="text-gray-400 font-medium leading-relaxed">
                                    Équipés des presses thermiques les plus précises, nous réalisons vos personnalisations avec les typographies officielles des plus grands clubs et nations.
                                </p>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
