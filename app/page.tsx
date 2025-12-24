"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
    ArrowRight, Search, Star, MoveRight,
    ShieldCheck, Zap, Trophy, Play
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    )
}

interface MarqueeItem {
    name: string;
    logo: string;
}

const MarqueeRow = ({ items, direction = "left", speed = 30 }: { items: MarqueeItem[], direction?: "left" | "right", speed?: number }) => {
    return (
        <div className="flex overflow-hidden select-none py-4 md:py-6">
            <motion.div
                initial={{ x: direction === "left" ? "0%" : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : "0%" }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                className="flex gap-16 md:gap-24 whitespace-nowrap items-center px-10"
            >
                {[...items, ...items].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer opacity-30 hover:opacity-100 transition-all duration-500 hover:scale-105">
                        <div className="relative h-10 md:h-16 w-auto min-w-[50px] md:min-w-[80px] flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                            <img
                                src={item.logo}
                                alt={item.name}
                                className="h-full w-auto object-contain"
                            />
                        </div>
                        <span className="text-xl md:text-4xl font-black uppercase italic tracking-tighter text-black/5 group-hover:text-black transition-colors leading-none">
                            {item.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

const BRANDS: MarqueeItem[] = [
    { name: "Nike", logo: "https://www.vectorlogo.zone/logos/nike/nike-icon.svg" },
    { name: "Adidas", logo: "https://www.vectorlogo.zone/logos/adidas/adidas-icon.svg" },
    { name: "Puma", logo: "https://www.vectorlogo.zone/logos/puma/puma-icon.svg" },
    { name: "Jordan", logo: "https://www.vectorlogo.zone/logos/nike_jordan/nike_jordan-icon.svg" },
    { name: "New Balance", logo: "https://www.vectorlogo.zone/logos/newbalance/newbalance-icon.svg" },
    { name: "Mizuno", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mizuno.svg" },
    { name: "Umbro", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/umbro.svg" },
    { name: "Kappa", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/kappa.svg" },
];

const CLUBS: MarqueeItem[] = [
    { name: "Real Madrid", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Real_Madrid_Logo.svg" },
    { name: "Man City", logo: "https://static.cdnlogo.com/logos/m/5/manchester-city-fc.svg" },
    { name: "PSG", logo: "https://upload.wikimedia.org/wikipedia/fr/8/86/Paris_Saint-Germain_Logo.svg" },
    { name: "FC Barcelona", logo: "https://upload.wikimedia.org/wikipedia/fr/a/a1/Logo_FC_Barcelona.svg" },
    { name: "Liverpool", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
    { name: "Arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
    { name: "AC Milan", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_of_AC_Milan.svg" },
    { name: "Bayern Munich", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg" },
];

const NATIONS: MarqueeItem[] = [
    { name: "Sénégal", logo: "https://upload.wikimedia.org/wikipedia/fr/b/b3/Logo_F%C3%A9d%C3%A9ration_S%C3%A9n%C3%A9galaise_de_Football.svg" },
    { name: "France", logo: "https://upload.wikimedia.org/wikipedia/fr/9/9d/Logo_F%C3%A9d%C3%A9ration_Fran%C3%A7aise_de_Football.svg" },
    { name: "Brésil", logo: "https://upload.wikimedia.org/wikipedia/fr/d/da/Logo_Confedera%C3%A7%C3%A3o_Brasileira_de_Futebol.svg" },
    { name: "Argentine", logo: "https://upload.wikimedia.org/wikipedia/fr/d/d4/Logo_Association_du_football_argentin.svg" },
    { name: "Maroc", logo: "https://upload.wikimedia.org/wikipedia/fr/e/e3/Maroc_f%C3%A9d%C3%A9ration.svg" },
    { name: "Portugal", logo: "https://upload.wikimedia.org/wikipedia/fr/6/6f/Logo_Federa%C3%A7%C3%A3o_Portuguesa_de_Futebol.svg" },
    { name: "Espagne", logo: "https://upload.wikimedia.org/wikipedia/fr/a/a1/Logo_R%C3%A9al_f%C3%A9d%C3%A9ration_espagnole_de_football_2021.svg" },
    { name: "Angleterre", logo: "https://upload.wikimedia.org/wikipedia/en/8/8b/England_national_football_team_crest.svg" },
    { name: "Côte d'Ivoire", logo: "https://upload.wikimedia.org/wikipedia/fr/2/29/Logo_F%C3%A9d%C3%A9ration_Ivoirienne_de_Football.svg" },
];

export default function HomePage() {
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    } as any

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFD700] selection:text-black overflow-x-hidden">
            <Navigation />

            <main>
                {/* 1. HERO: REDESIGNED WITH PARALLAX & MOTION */}
                <section ref={heroRef} className="relative min-h-[90vh] sm:min-h-screen w-full bg-white overflow-hidden flex flex-col justify-end pb-16 md:pb-24">
                    {/* Background Image with Parallax */}
                    <motion.div style={{ y: heroImageY }} className="absolute inset-0 z-0">
                        <Image
                            src="/mbor-storefront.jpg"
                            alt="MBOR Store Front Point E"
                            fill
                            className="object-cover scale-110"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                    </motion.div>

                    <motion.div
                        style={{ y: heroContentY, opacity: heroOpacity }}
                        className="relative z-10 container mx-auto px-6 lg:px-20 flex flex-col items-start text-left"
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4 sm:space-y-8 max-w-5xl"
                        >
                            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: 48 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-[2px] bg-[#FFD700]"
                                />
                                <span className="text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] drop-shadow-sm">Point E, Dakar</span>
                            </motion.div>

                            <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black uppercase italic leading-[0.8] tracking-tighter text-white">
                                Authentique. <br />
                                <span className="text-[#FFD700] drop-shadow-sm">Premium.</span> <br />
                                À Vous.
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-zinc-200 text-base sm:text-xl md:text-2xl font-bold leading-relaxed max-w-xl">
                                Le QG de la culture football. <br />
                                <span className="text-zinc-400 font-medium">Maillots officiels, rares sneakers & service d'élite.</span>
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-8 w-full sm:w-auto">
                                <Button size="lg" className="h-14 sm:h-18 px-8 sm:px-14 bg-[#FFD700] text-black hover:bg-white hover:text-black font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs rounded-none clip-diagonal transition-all shadow-2xl hover:shadow-white/20 group">
                                    Explorer la Collection <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                                <Link href="https://wa.me/221774272354" target="_blank" className="w-full sm:w-auto">
                                    <Button size="lg" variant="outline" className="w-full h-14 sm:h-18 px-8 sm:px-14 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black hover:border-white font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs rounded-none clip-diagonal transition-all">
                                        Visiter le Showroom
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Marquee Strip */}
                    <div className="absolute bottom-0 left-0 w-full bg-black py-4 z-20 overflow-hidden">
                        <motion.div
                            initial={{ x: "0%" }}
                            animate={{ x: "-50%" }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="flex gap-12 whitespace-nowrap w-[200%]"
                        >
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="flex items-center gap-12 shrink-0">
                                    <span className="text-white text-[9px] sm:text-xs font-black uppercase tracking-[0.3em]">MBOR BUSINESS STORE</span>
                                    <Star className="h-3 w-3 text-[#FFD700] fill-[#FFD700]" />
                                    <span className="text-white/70 text-[9px] sm:text-xs font-black uppercase tracking-[0.3em]">EST. 2025</span>
                                    <Star className="h-3 w-3 text-[#FFD700] fill-[#FFD700]" />
                                    <span className="text-white text-[9px] sm:text-xs font-black uppercase tracking-[0.3em]">DAKAR PREMIUM</span>
                                    <Star className="h-3 w-3 text-[#FFD700] fill-[#FFD700]" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 2. CATEGORY BENTO GRID: SCROLL REVEAL */}
                <section className="py-20 sm:py-32 bg-zinc-950 relative overflow-hidden">
                    <div className="container mx-auto px-6 lg:px-20 relative z-10">
                        <ScrollReveal>
                            <div className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-20 gap-8">
                                <div className="space-y-3">
                                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none">
                                        La <span className="text-transparent text-stroke-white opacity-40">Collection</span>
                                    </h2>
                                    <p className="text-[#FFD700] font-black uppercase tracking-[0.4em] text-[10px]">Inventaire Authentique Vérifié</p>
                                </div>
                                <Link href="/shop" className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-white pb-2 hover:text-[#FFD700] hover:border-[#FFD700] transition-all text-white">
                                    Voir Tout l'Atelier
                                </Link>
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 md:h-[700px]"
                            >
                                {/* Main Feature - Jerseys */}
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ scale: 0.98 }}
                                    transition={{ duration: 0.6 }}
                                    className="md:col-span-6 lg:col-span-5 h-[450px] md:h-full relative group overflow-hidden rounded-[2.5rem] sm:rounded-[4rem] cursor-pointer bg-zinc-900 border border-zinc-800 shadow-2xl"
                                >
                                    <Image src="/football-jersey-collection.jpg" alt="Jerseys" fill className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-10 left-10 space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.3em]">Signature Drop</p>
                                            <h3 className="text-white text-5xl sm:text-6xl font-black italic uppercase leading-none">Maillots</h3>
                                        </div>
                                        <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-[#FFD700] font-black uppercase tracking-widest text-[10px] border-none group">
                                            Explorer <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </motion.div>

                                {/* Center Hub */}
                                <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-4 sm:gap-8 h-full">
                                    <motion.div
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                        className="flex-1 h-[300px] md:h-auto relative group overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] cursor-pointer bg-white"
                                    >
                                        <Image src="/premium-sneakers-and-jordans.jpg" alt="Sneakers" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-x-0 bottom-0 p-8 flex justify-between items-end bg-gradient-to-t from-black/60 to-transparent sm:bg-none">
                                            <div className="bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl">
                                                <h3 className="text-black text-2xl font-black italic uppercase leading-none tracking-tighter">Sneakers</h3>
                                            </div>
                                            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoveRight className="h-6 w-6" />
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                        className="flex-1 h-[300px] md:h-auto relative group overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] cursor-pointer bg-black"
                                    >
                                        <Image src="/streetwear-collection-urban-fashion.jpg" alt="Streetwear" fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                                        <div className="absolute bottom-8 left-8 text-white space-y-1">
                                            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">Urban Culture</p>
                                            <h3 className="text-3xl font-black italic uppercase leading-none tracking-tighter">Streetwear</h3>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* End Column */}
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    className="md:col-span-12 lg:col-span-3 h-[250px] md:h-full relative group overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] cursor-pointer bg-[#FFD700] flex items-center justify-center p-12"
                                >
                                    <Image src="/football-boots-crampons.jpg" alt="Boots" fill className="object-cover mix-blend-multiply opacity-20 transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="relative z-10 flex flex-col items-center gap-6">
                                        <h3 className="text-black text-6xl lg:text-7xl font-black italic uppercase lg:-rotate-90 tracking-tighter transition-transform group-hover:scale-110">Crampons</h3>
                                        <div className="h-[2px] w-20 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* 2.5 GLOBAL CULTURE HUB: WHITE SECTION WITH TITLES */}
                <section className="bg-white py-16 sm:py-24 border-y border-zinc-100 overflow-hidden">
                    <div className="container mx-auto px-6 lg:px-20 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-zinc-200" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">The Global Network</h2>
                            <div className="h-px flex-1 bg-zinc-200" />
                        </div>
                    </div>

                    <div className="space-y-12 sm:space-y-20">
                        {/* Brands Marquee */}
                        <div className="space-y-4">
                            <h3 className="container mx-auto px-6 lg:px-20 text-xs font-black uppercase tracking-widest text-black flex items-center gap-3">
                                <span className="h-2 w-2 bg-[#FFD700] rounded-full" /> NOS MARQUES
                            </h3>
                            <MarqueeRow
                                items={BRANDS}
                                direction="left"
                                speed={40}
                            />
                        </div>

                        {/* Clubs Marquee */}
                        <div className="space-y-4">
                            <h3 className="container mx-auto px-6 lg:px-20 text-xs font-black uppercase tracking-widest text-black flex items-center gap-3">
                                <span className="h-2 w-2 bg-[#FFD700] rounded-full" /> NOS CLUBS
                            </h3>
                            <MarqueeRow
                                items={CLUBS}
                                direction="right"
                                speed={50}
                            />
                        </div>

                        {/* National Teams Marquee */}
                        <div className="space-y-4">
                            <h3 className="container mx-auto px-6 lg:px-20 text-xs font-black uppercase tracking-widest text-black flex items-center gap-3">
                                <span className="h-2 w-2 bg-[#FFD700] rounded-full" /> NOS NATIONS
                            </h3>
                            <MarqueeRow
                                items={NATIONS}
                                direction="left"
                                speed={45}
                            />
                        </div>
                    </div>
                </section>

                {/* 3. LATEST DROPS: SCROLL REVEAL */}
                <section className="py-24 sm:py-32 bg-black text-white relative">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-900/50 hidden lg:block" />
                    <div className="container mx-auto px-6 lg:px-20 relative z-10">
                        <ScrollReveal>
                            <div className="flex items-center gap-6 mb-16 sm:mb-24">
                                <div className="bg-zinc-900 h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center rounded-[1.5rem] sm:rounded-[2rem] border border-zinc-800 rotate-12">
                                    <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFD700] fill-[#FFD700]" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter leading-none">Nouveaux <span className="text-[#FFD700]">Arrivages</span></h2>
                                    <p className="text-zinc-600 text-[10px] sm:text-sm font-bold uppercase tracking-[0.4em] italic">Dernière Mise à Jour : Aujourd'hui</p>
                                </div>
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10"
                            >
                                {[
                                    { name: "Real Madrid 24/25", type: "Maillot Domicile", price: "45,000 FCFA", img: "/football-jersey-collection.jpg" },
                                    { name: "Mercurial Superfly", type: "Elite FG", price: "120,000 FCFA", img: "/football-boots-crampons.jpg" },
                                    { name: "Jordan 1 High", type: "Chicago", price: "150,000 FCFA", img: "/premium-sneakers-and-jordans.jpg" },
                                    { name: "PSG Training", type: "Haut d'Entraînement", price: "35,000 FCFA", img: "/streetwear-collection-urban-fashion.jpg" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        whileHover={{ y: -15 }}
                                        className="group relative bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden transition-all duration-700 border border-zinc-900 flex flex-col h-full"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900/40">
                                            <Image src={item.img} alt={item.name} fill className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2" />
                                            <div className="absolute top-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                                <span className="text-white text-[9px] font-black uppercase">En Stock</span>
                                            </div>
                                        </div>
                                        <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                                            <div className="space-y-1">
                                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{item.type}</p>
                                                <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-tight group-hover:text-[#FFD700] transition-colors">{item.name}</h3>
                                            </div>
                                            <div className="flex items-center justify-between pt-4">
                                                <span className="text-2xl font-black text-white italic">{item.price}</span>
                                                <motion.button
                                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                                    className="h-12 w-12 bg-[#FFD700] rounded-2xl flex items-center justify-center text-black shadow-lg"
                                                >
                                                    <ArrowRight className="h-5 w-5" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* 4. BRAND STATEMENT: SCROLL REVEAL */}
                <ScrollReveal>
                    <section className="relative py-40 sm:py-56 bg-[#FFD700] overflow-hidden">
                        <div className="container mx-auto px-6 text-center space-y-12 relative z-10">
                            <div className="flex justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-black border-dashed rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm"
                                >
                                    <Trophy className="h-10 w-10 text-black" />
                                </motion.div>
                            </div>
                            <h2 className="text-[12vw] sm:text-[10vw] font-black uppercase italic tracking-tighter text-black leading-[0.7] py-8">
                                SOYEZ <span className="text-white drop-shadow-2xl">EXCLUSIF.</span> <br />
                                SOYEZ <span className="text-white drop-shadow-2xl">VOUS.</span>
                            </h2>
                            <Link href="/shop">
                                <Button size="lg" className="h-16 sm:h-20 px-12 sm:px-20 bg-black text-white hover:bg-white hover:text-black font-black uppercase tracking-[0.4em] text-xs sm:text-sm rounded-none clip-diagonal transition-all shadow-2xl">
                                    Entrer dans la Collection <MoveRight className="ml-4 h-6 w-6" />
                                </Button>
                            </Link>
                        </div>

                        {/* Dynamic Texture with Parallax */}
                        <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay">
                            <Image src="/mbor-storefront.jpg" alt="texture" fill className="object-cover grayscale" />
                        </div>
                        {/* Floating Glows */}
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white blur-[150px] opacity-30 rounded-full animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white blur-[150px] opacity-30 rounded-full animate-pulse delay-1000" />
                    </section>
                </ScrollReveal>
            </main>

            <Footer />
        </div>
    )
}
