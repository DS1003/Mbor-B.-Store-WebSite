"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    Trophy, Star, ArrowRight, Globe, MapPin, Calendar,
    Flame, ChevronRight, Shirt, ShoppingBag, Sparkles, Flag, Users
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"

// Teams data for the 2026 World Cup
const teams = [
    { 
        name: "Sénégal", 
        code: "SN",
        flag: "🇸🇳",
        group: "Groupe A",
        confederation: "CAF",
        color: "#009639",
        accent: "#FDEF42",
        stars: 0,
        slogan: "Allez les Lions de la Teranga !",
        description: "Les Lions reviennent rugir sur la scène mondiale. Fierté du Sénégal, nous portons les couleurs de la Teranga jusqu'au bout !"
    },
    { 
        name: "France", 
        code: "FR",
        flag: "🇫🇷",
        group: "Groupe B",
        confederation: "UEFA",
        color: "#002395",
        accent: "#ED2939",
        stars: 2,
        slogan: "Allez les Bleus !",
        description: "Double champions du monde, les Bleus visent un troisième titre historique sur le sol américain."
    },
    { 
        name: "Brésil", 
        code: "BR",
        flag: "🇧🇷",
        group: "Groupe C",
        confederation: "CONMEBOL",
        color: "#009B3A",
        accent: "#FFDF00",
        stars: 5,
        slogan: "Vai Brasil !",
        description: "La Seleção du pays du football. 5 étoiles, une légende vivante qui cherche à reconquérir le trône."
    },
    { 
        name: "Argentine", 
        code: "AR",
        flag: "🇦🇷",
        group: "Groupe D",
        confederation: "CONMEBOL",
        color: "#74ACDF",
        accent: "#FFFFFF",
        stars: 3,
        slogan: "Vamos Argentina !",
        description: "Champions en titre, guidés par la magie de Messi. L'Albiceleste défend sa couronne en 2026."
    },
    { 
        name: "Allemagne", 
        code: "DE",
        flag: "🇩🇪",
        group: "Groupe E",
        confederation: "UEFA",
        color: "#000000",
        accent: "#DD0000",
        stars: 4,
        slogan: "Die Mannschaft !",
        description: "La machine allemande. 4 fois champions du monde, la discipline germanique au service de la performance."
    },
    { 
        name: "Espagne", 
        code: "ES",
        flag: "🇪🇸",
        group: "Groupe F",
        confederation: "UEFA",
        color: "#AA151B",
        accent: "#F1BF00",
        stars: 1,
        slogan: "¡Vamos España!",
        description: "La Roja, maîtres du tiki-taka. L'Espagne vise un deuxième titre mondial."
    },
    { 
        name: "Angleterre", 
        code: "GB",
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        group: "Groupe G",
        confederation: "UEFA",
        color: "#FFFFFF",
        accent: "#CF081F",
        stars: 1,
        slogan: "It's Coming Home!",
        description: "Les Three Lions cherchent enfin à ramener le trophée à la maison après 1966."
    },
    { 
        name: "Portugal", 
        code: "PT",
        flag: "🇵🇹",
        group: "Groupe H",
        confederation: "UEFA",
        color: "#006600",
        accent: "#FF0000",
        stars: 0,
        slogan: "Força Portugal!",
        description: "La Seleção das Quinas, emmenée par une nouvelle génération de talents après l'ère Ronaldo."
    },
]

const hostCities = [
    { city: "New York", country: "USA", venue: "MetLife Stadium" },
    { city: "Los Angeles", country: "USA", venue: "SoFi Stadium" },
    { city: "Mexico City", country: "Mexique", venue: "Estadio Azteca" },
    { city: "Toronto", country: "Canada", venue: "BMO Field" },
    { city: "Miami", country: "USA", venue: "Hard Rock Stadium" },
    { city: "Dallas", country: "USA", venue: "AT&T Stadium" },
]

interface WorldCupClientProps {
    products: any[]
}

export function WorldCupClient({ products }: WorldCupClientProps) {
    const [selectedTeam, setSelectedTeam] = React.useState(teams[0]) // Senegal first
    const [countdown, setCountdown] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    // Countdown to World Cup 2026 (June 11, 2026)
    React.useEffect(() => {
        const target = new Date("2026-06-11T00:00:00Z").getTime()
        const update = () => {
            const now = Date.now()
            const diff = Math.max(0, target - now)
            setCountdown({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            })
        }
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
                
                {/* Stadium Light Effects */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[120px]" />
                
                {/* Field Lines Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `
                        linear-gradient(90deg, white 1px, transparent 1px),
                        linear-gradient(white 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }} />

                {/* Animated floating football icons */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-white/[0.03] font-bold"
                            style={{
                                left: `${15 + i * 15}%`,
                                top: `${10 + (i % 3) * 30}%`,
                                fontSize: `${60 + i * 20}px`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 6 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5,
                            }}
                        >
                            ⚽
                        </motion.div>
                    ))}
                </div>

                <div className="container-custom relative z-10 text-center py-20">
                    <ScrollReveal direction="down" delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full mb-10">
                            <Trophy className="h-4 w-4 text-primary" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                                FIFA World Cup 2026
                            </span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.2}>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-8">
                            <span className="block">COUPE DU</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-primary">
                                MONDE 2026
                            </span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.3}>
                        <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-medium tracking-tight mb-12">
                            Représentez votre nation avec les maillots officiels. 
                            <span className="text-primary font-bold"> USA • Mexique • Canada</span> — 
                            48 équipes, 1 seul champion.
                        </p>
                    </ScrollReveal>

                    {/* Countdown Timer */}
                    <ScrollReveal direction="up" delay={0.4}>
                        <div className="flex items-center justify-center gap-4 md:gap-8 mb-16">
                            {[
                                { label: "Jours", value: countdown.days },
                                { label: "Heures", value: countdown.hours },
                                { label: "Minutes", value: countdown.minutes },
                                { label: "Secondes", value: countdown.seconds },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <motion.div
                                        className="relative"
                                        key={item.value}
                                        initial={{ scale: 1.1, opacity: 0.7 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center">
                                            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white tabular-nums tracking-tighter">
                                                {String(item.value).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </motion.div>
                                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-3">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    {/* CTA Buttons */}
                    <ScrollReveal direction="up" delay={0.5}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/shop/maillot">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="h-16 px-12 bg-primary text-black rounded-2xl font-bold text-[15px] tracking-tight flex items-center gap-3 shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-shadow"
                                >
                                    <Shirt className="h-5 w-5" />
                                    Voir les Maillots
                                    <ArrowRight className="h-5 w-5" />
                                </motion.button>
                            </Link>
                            <Link href="#teams">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="h-16 px-12 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-[15px] tracking-tight flex items-center gap-3 backdrop-blur-xl hover:bg-white/10 transition-all"
                                >
                                    <Globe className="h-5 w-5" />
                                    Explorer les Équipes
                                </motion.button>
                            </Link>
                        </div>
                    </ScrollReveal>

                    {/* Host Nations Flags */}
                    <ScrollReveal direction="up" delay={0.6}>
                        <div className="flex items-center justify-center gap-6 mt-16 text-4xl sm:text-5xl">
                            <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>🇺🇸</motion.span>
                            <span className="text-white/10 text-lg font-bold">×</span>
                            <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>🇲🇽</motion.span>
                            <span className="text-white/10 text-lg font-bold">×</span>
                            <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>🇨🇦</motion.span>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mt-4">
                            Pays hôtes 2026
                        </p>
                    </ScrollReveal>
                </div>

                {/* Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </section>

            {/* ===== TEAMS SELECTOR SECTION ===== */}
            <section id="teams" className="py-20 md:py-32 container-custom scroll-mt-20">
                <ScrollReveal direction="up">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/5 border border-primary/10 rounded-full">
                            <Users className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">48 nations qualifiées</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                            Choisissez votre <span className="text-primary">Nation</span>
                        </h2>
                        <p className="text-muted-foreground/60 max-w-lg mx-auto font-medium">
                            Soutenez votre équipe nationale avec un maillot authentique. Portez les couleurs de votre pays.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Team Selector Grid */}
                <ScrollReveal direction="up" delay={0.1}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-16">
                        {teams.map((team) => (
                            <motion.button
                                key={team.code}
                                onClick={() => setSelectedTeam(team)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "relative flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all duration-500 group cursor-pointer",
                                    selectedTeam.code === team.code
                                        ? "border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-[1.02]"
                                        : "border-muted/30 bg-card hover:border-primary/20 hover:bg-muted/10"
                                )}
                            >
                                <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                                    {team.flag}
                                </span>
                                <span className={cn(
                                    "text-[11px] font-bold tracking-tight transition-colors",
                                    selectedTeam.code === team.code ? "text-primary" : "text-foreground/70"
                                )}>
                                    {team.name}
                                </span>
                                {selectedTeam.code === team.code && (
                                    <motion.div
                                        layoutId="team-indicator"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Selected Team Feature */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTeam.code}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                        <div
                            className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
                            style={{
                                background: `linear-gradient(135deg, ${selectedTeam.color}15, ${selectedTeam.color}05, transparent)`
                            }}
                        >
                            {/* Decorative top bar */}
                            <div
                                className="h-2 w-full"
                                style={{ background: `linear-gradient(90deg, ${selectedTeam.color}, ${selectedTeam.accent}, ${selectedTeam.color})` }}
                            />

                            <div className="p-10 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                {/* Left: Team Info */}
                                <div className="space-y-8">
                                    <div className="flex items-start gap-6">
                                        <span className="text-7xl md:text-8xl">{selectedTeam.flag}</span>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                                                {selectedTeam.confederation} • {selectedTeam.group}
                                            </span>
                                            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
                                                {selectedTeam.name}
                                            </h3>
                                            {selectedTeam.stars > 0 && (
                                                <div className="flex items-center gap-1">
                                                    {[...Array(selectedTeam.stars)].map((_, i) => (
                                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                                    ))}
                                                    <span className="text-[10px] font-bold text-muted-foreground/40 ml-2">
                                                        {selectedTeam.stars}× Champion{selectedTeam.stars > 1 ? "s" : ""} du Monde
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-lg text-muted-foreground/70 font-medium leading-relaxed max-w-md">
                                        {selectedTeam.description}
                                    </p>

                                    <div
                                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg"
                                        style={{
                                            backgroundColor: `${selectedTeam.color}15`,
                                            color: selectedTeam.color,
                                            borderLeft: `4px solid ${selectedTeam.color}`
                                        }}
                                    >
                                        <Flame className="h-5 w-5" />
                                        {selectedTeam.slogan}
                                    </div>

                                    <Link href={`/shop?query=${encodeURIComponent(selectedTeam.name)}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="mt-4 h-14 px-10 bg-foreground text-background rounded-2xl font-bold text-[14px] tracking-tight flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all group"
                                        >
                                            <ShoppingBag className="h-5 w-5" />
                                            Voir les maillots {selectedTeam.name}
                                            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </motion.button>
                                    </Link>
                                </div>

                                {/* Right: Stats / Visual */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: Trophy, label: "Titres Mondiaux", value: selectedTeam.stars },
                                        { icon: Flag, label: "Confédération", value: selectedTeam.confederation },
                                        { icon: Users, label: "Phase de Groupes", value: selectedTeam.group },
                                        { icon: Globe, label: "Code FIFA", value: selectedTeam.code },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-background/60 backdrop-blur-lg border border-muted/30 rounded-3xl p-6 text-center space-y-3"
                                        >
                                            <stat.icon className="h-6 w-6 mx-auto text-primary/60" />
                                            <p className="text-2xl font-black tracking-tighter">{stat.value}</p>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* ===== HOST CITIES SECTION ===== */}
            <section className="py-20 md:py-28 bg-muted/5 border-y border-muted/10">
                <div className="container-custom">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-16 space-y-4">
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/5 border border-primary/10 rounded-full">
                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Villes Hôtes</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                                Là où tout <span className="text-primary">se joue</span>
                            </h2>
                            <p className="text-muted-foreground/60 max-w-lg mx-auto font-medium">
                                16 stades iconiques à travers 3 pays pour la plus grande Coupe du Monde de l'histoire.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {hostCities.map((city, i) => (
                            <ScrollReveal key={city.city} direction="up" delay={i * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    className="bg-card border border-muted/30 rounded-[2.5rem] p-8 space-y-5 hover:shadow-xl hover:border-primary/20 transition-all duration-500 group cursor-default"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-3xl bg-muted/20">
                                            {city.country === "USA" ? "🇺🇸" : city.country === "Mexique" ? "🇲🇽" : "🇨🇦"}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/40 bg-muted/20 px-4 py-2 rounded-full">
                                            {city.country}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                                            {city.city}
                                        </h3>
                                        <p className="text-sm text-muted-foreground/50 font-semibold flex items-center gap-2">
                                            <MapPin className="h-3.5 w-3.5" /> {city.venue}
                                        </p>
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PRODUCTS SECTION ===== */}
            <section className="py-20 md:py-32 container-custom">
                <ScrollReveal direction="up">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/5 border border-primary/10 rounded-full">
                            <Shirt className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Collection Maillots</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                            Maillots <span className="text-primary">Disponibles</span>
                        </h2>
                        <p className="text-muted-foreground/60 max-w-lg mx-auto font-medium">
                            Explorez notre catalogue de maillots d'équipes nationales. Représentez votre pays avec fierté.
                        </p>
                    </div>
                </ScrollReveal>

                {products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 space-y-6">
                        <div className="h-24 w-24 bg-muted/20 rounded-[2rem] flex items-center justify-center mx-auto text-4xl">
                            ⚽
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black tracking-tight">Collection en préparation</h3>
                            <p className="text-muted-foreground/60 font-medium max-w-md mx-auto">
                                Les maillots de la Coupe du Monde 2026 arrivent bientôt. Restez connectés !
                            </p>
                        </div>
                        <Link href="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-4 h-14 px-10 bg-primary text-primary-foreground rounded-2xl font-bold text-[14px] tracking-tight inline-flex items-center gap-3 shadow-xl"
                            >
                                Explorer la Boutique
                                <ArrowRight className="h-5 w-5" />
                            </motion.button>
                        </Link>
                    </div>
                )}

                {products.length > 0 && (
                    <ScrollReveal direction="up" delay={0.1}>
                        <div className="text-center mt-12">
                            <Link href="/shop/maillot">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="h-16 px-14 bg-foreground text-background rounded-2xl font-bold text-[15px] tracking-tight inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl transition-all group"
                                >
                                    <Sparkles className="h-5 w-5" />
                                    Voir toute la Collection
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
                        </div>
                    </ScrollReveal>
                )}
            </section>

            {/* ===== SENEGAL SPECIAL BANNER ===== */}
            <section className="py-20 md:py-28">
                <div className="container-custom">
                    <ScrollReveal direction="up">
                        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-[#009639] via-[#FDEF42] to-[#ED1C24] p-[2px]">
                            <div className="bg-black rounded-[calc(3rem-2px)] p-12 md:p-20 relative overflow-hidden">
                                {/* Decorative */}
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#009639]/10 blur-[100px]" />
                                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#FDEF42]/5 blur-[80px]" />

                                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                    <div className="space-y-8">
                                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full">
                                            <span className="text-lg">🇸🇳</span>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDEF42]">
                                                Lions de la Teranga
                                            </span>
                                        </div>

                                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[0.9]">
                                            <span className="text-[#009639]">ALLEZ</span>{" "}
                                            <span className="text-[#FDEF42]">LES</span>{" "}
                                            <span className="text-[#ED1C24]">LIONS</span>
                                            <span className="text-white"> !</span>
                                        </h2>

                                        <p className="text-white/50 text-lg font-medium max-w-md leading-relaxed">
                                            Le Sénégal entre en scène pour sa 4ème participation 
                                            à la Coupe du Monde. Fierté, passion, Teranga — portez 
                                            les couleurs du Sénégal avec honneur.
                                        </p>

                                        <Link href={`/shop?query=${encodeURIComponent("Sénégal")}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="h-16 px-12 bg-[#009639] text-white rounded-2xl font-bold text-[15px] tracking-tight flex items-center gap-3 shadow-2xl shadow-green-500/20 hover:shadow-green-500/30 transition-all group mt-4"
                                            >
                                                <Shirt className="h-5 w-5" />
                                                Maillots du Sénégal
                                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            </motion.button>
                                        </Link>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className="text-[120px] md:text-[180px] select-none"
                                        >
                                            🦁
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== KEY DATES ===== */}
            <section className="py-20 md:py-28 container-custom">
                <ScrollReveal direction="up">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/5 border border-primary/10 rounded-full">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Dates Clés</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                            Le <span className="text-primary">Calendrier</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[
                        { date: "11 Juin 2026", event: "Cérémonie d'Ouverture", detail: "Mexico City, Estadio Azteca", emoji: "🎪" },
                        { date: "12 Juin — 6 Juil", event: "Phase de Groupes", detail: "16 stades, 48 équipes", emoji: "⚽" },
                        { date: "19 Juillet 2026", event: "Grande Finale", detail: "New York, MetLife Stadium", emoji: "🏆" },
                    ].map((item, i) => (
                        <ScrollReveal key={item.event} direction="up" delay={i * 0.15}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="bg-card border border-muted/30 rounded-[2.5rem] p-10 text-center space-y-5 hover:shadow-xl hover:border-primary/20 transition-all duration-500 group"
                            >
                                <span className="text-5xl block">{item.emoji}</span>
                                <div className="space-y-2">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">{item.date}</p>
                                    <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                                        {item.event}
                                    </h3>
                                    <p className="text-sm text-muted-foreground/50 font-medium">{item.detail}</p>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* ===== FINAL CTA SECTION ===== */}
            <section className="py-20 md:py-32 container-custom">
                <ScrollReveal direction="up">
                    <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                        {/* Stadium light effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/20 blur-[150px]" />
                        
                        <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
                            <Trophy className="h-14 w-14 text-primary mx-auto" />
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
                                Prêt pour la{" "}
                                <span className="text-primary">Coupe du Monde</span> ?
                            </h2>
                            <p className="text-background/40 text-lg font-medium max-w-md mx-auto">
                                Ne manquez pas l'événement sportif de l'année. Équipez-vous dès maintenant avec les maillots officiels.
                            </p>
                            <Link href="/shop/maillot">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-4 h-16 px-14 bg-primary text-black rounded-2xl font-bold text-[16px] tracking-tight inline-flex items-center gap-3 shadow-2xl shadow-primary/30"
                                >
                                    <ShoppingBag className="h-5 w-5" />
                                    Commander maintenant
                                    <ArrowRight className="h-5 w-5" />
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    )
}
