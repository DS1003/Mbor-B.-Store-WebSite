import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Zap, Star, TrendingUp, PartyPopper, Gift } from "lucide-react"
import { Marquee, Magnetic, BlurText, SplitText } from "@/components/interactions"
import { ScrollReveal } from "@/components/scroll-reveal"
import { HeroCarousel } from "@/components/hero-carousel"
import { BrandCarousel } from "@/components/brand-carousel"
import { FeaturedProducts, FeaturedProductsSkeleton } from "@/components/featured-products"
import { Suspense } from "react"

export default function HomePage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            {/* Hero Carousel Section - Critical Path */}
            <HeroCarousel />

            {/* 🇸🇳 Independence Day Promo Marquee */}
            <section className="py-10 border-b bg-gradient-to-r from-[#00853F]/5 via-[#FDEF42]/5 to-[#E31B23]/5 overflow-hidden relative">
                <Marquee className="[--duration:30s] [--gap:4rem]">
                    {[
                        { label: "🇸🇳 BONNE FÊTE DE L'INDÉPENDANCE", icon: <PartyPopper className="h-4 w-4 text-[#00853F]" /> },
                        { label: "-50% SUR TOUS LES ARTICLES", icon: <Gift className="h-4 w-4 text-[#E31B23]" /> },
                        { label: "VIVE LE SÉNÉGAL 🦁", icon: <Star className="h-4 w-4 text-[#FDEF42]" /> },
                        { label: "PROMO EXCEPTIONNELLE -50%", icon: <Zap className="h-4 w-4 text-[#E31B23]" /> },
                        { label: "4 AVRIL • FIERTÉ NATIONALE", icon: <PartyPopper className="h-4 w-4 text-[#00853F]" /> },
                        { label: "LIVRAISON OFFERTE DÈS 25 000 F", icon: <ShoppingBag className="h-4 w-4 text-[#FDEF42]" /> },
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <span>{feature.icon}</span>
                            <span className="text-[12px] font-black tracking-tight text-foreground/80">{feature.label}</span>
                        </div>
                    ))}
                </Marquee>
            </section>

            {/* Categories Selection */}
            <section className="py-20 lg:py-32 overflow-hidden">
                <div className="container-custom">
                    <ScrollReveal className="flex flex-col items-center text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-24">
                        <SplitText 
                            text="Univers Mbor Store"
                            className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs justify-center"
                        />
                        <h2 className="font-heading text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-4xl flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4">
                            <BlurText text="Dominez le terrain avec une" delay={0.2} />
                            <BlurText text="élégance" delay={0.6} />
                            <BlurText text="signature" className="text-primary italic" delay={0.8} />
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">
                        {/* Main Category */}
                        <ScrollReveal className="md:col-span-8 group relative aspect-[4/5] md:aspect-auto md:h-[700px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm" direction="left">
                            <Link href="/shop/maillots" className="block h-full">
                                <Image
                                    src="https://www.foot.fr/146457-pdt_1500/maillot-dkali-senegal-vert.jpg"
                                    alt="Maillots Sénégal"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 66vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 max-w-md space-y-4 sm:space-y-6">
                                    <div className="inline-block bg-primary/20 backdrop-blur-md text-primary border border-primary/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                                        Exclusivité
                                    </div>
                                    <h3 className="text-3xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
                                        Pack Lion <br /> du Sénégal
                                    </h3>
                                    <p className="text-sm sm:text-lg text-white/80 font-medium tracking-tight">L'armure officielle pour la victoire. Authenticité et performance réunies.</p>
                                    <div className="inline-flex h-12 lg:h-14 items-center justify-center bg-white text-black px-6 sm:px-10 rounded-xl text-sm font-bold tracking-tight transition-all group-hover:bg-primary group-hover:text-primary-foreground active:scale-95">
                                        Voir la collection
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        {/* Secondary Categories */}
                        <div className="md:col-span-4 flex flex-col gap-6 lg:gap-10">
                            <ScrollReveal className="flex-1 group relative min-h-[300px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm" direction="right" delay={0.2}>
                                <Link href="/shop/lifestyle" className="block h-full">
                                    <Image
                                        src="https://cdn.blazimg.com/homepage/stores/1/Bloc6_desktop_1.webp"
                                        alt="Lifestyle Collection"
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 lg:bottom-10 left-6 lg:left-10 space-y-2">
                                        <SplitText text="Elite Style" className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1" delay={0.2} />
                                        <p className="text-xs lg:text-sm text-primary font-bold uppercase tracking-widest">Streetwear & Lifestyle</p>
                                    </div>
                                </Link>
                            </ScrollReveal>
                            <ScrollReveal className="flex-1 group relative min-h-[300px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm" direction="right" delay={0.4}>
                                <Link href="/shop/nike" className="block h-full">
                                    <Image
                                        src="https://cdn.blazimg.com/homepage/stores/1/Nike_united.webp"
                                        alt="Nike Performance"
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 lg:bottom-10 left-6 lg:left-10 space-y-2">
                                        <SplitText text="United Pack" className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1" delay={0.4} />
                                        <p className="text-xs lg:text-sm text-primary font-bold uppercase tracking-widest">Innovation Nike Football</p>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🇸🇳 Independence Day Celebration Banner */}
            <section className="relative h-[60vh] lg:h-[75vh] w-full overflow-hidden mb-20">
                <Image
                    src="https://www.foot.fr/img/blocks/107_1_img_background_lg.jpg"
                    alt="Fête de l'Indépendance du Sénégal"
                    fill
                    className="object-cover contrast-110 brightness-75"
                    sizes="100vw"
                />
                {/* Tricolor overlay */}
                <div className="absolute inset-0 z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00853F]/40 via-[#FDEF42]/10 to-[#E31B23]/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="container-custom relative z-20 h-full flex items-center">
                    <ScrollReveal direction="left" className="max-w-3xl space-y-6 sm:space-y-8">
                        <SplitText text="4 Avril • Fête Nationale" className="text-[#FDEF42] font-bold uppercase tracking-[0.2em] text-[9px] sm:text-xs" />
                        <h2 className="font-heading text-4xl sm:text-8xl font-bold tracking-tight leading-tight flex flex-wrap items-center gap-x-3 sm:gap-x-5">
                            <BlurText text="-50%" className="text-[#FDEF42]" delay={0.1} />
                            <BlurText text="sur" className="text-white" delay={0.3} />
                            <BlurText text="tout !" className="text-[#E31B23] italic" delay={0.5} />
                        </h2>
                        <p className="text-base sm:text-xl text-white/90 font-medium tracking-tight max-w-2xl leading-relaxed">
                            Pour célébrer l'indépendance du Sénégal, profitez de 50% de réduction sur tous les articles. Maillots, crampons, sneakers — tout est à moitié prix ! 🦁
                        </p>
                        <Link href="/shop" className="inline-flex h-12 sm:h-14 items-center justify-center bg-[#FDEF42] text-black px-8 sm:px-10 rounded-xl text-sm font-black tracking-tight transition-all hover:bg-white active:scale-95 shadow-lg">
                            🛒 J'en profite maintenant
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* Featured Products Grid - Streamed */}
            <Suspense fallback={<FeaturedProductsSkeleton />}>
                <FeaturedProducts />
            </Suspense>

            {/* Brands Carousel */}
            <BrandCarousel />

            {/* 🇸🇳 Independence Day CTA Section */}
            <section className="py-20 lg:py-40">
                <div className="container-custom">
                    <ScrollReveal>
                        <div className="relative rounded-3xl lg:rounded-[4rem] bg-black overflow-hidden p-12 lg:p-32 text-center shadow-2xl">
                            {/* Tricolor glow orbs */}
                            <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-[#00853F] opacity-15 blur-[120px] -translate-y-1/2 -translate-x-1/2" />
                            <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] rounded-full bg-[#FDEF42] opacity-10 blur-[120px] -translate-y-1/2 -translate-x-1/2" />
                            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#E31B23] opacity-15 blur-[120px] translate-y-1/2 translate-x-1/2" />

                            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-[#FDEF42] text-xs font-black uppercase tracking-widest mx-auto">
                                    🇸🇳 Offre Spéciale Indépendance
                                </div>
                                <h2 className="font-heading text-5xl lg:text-8xl font-bold tracking-tight flex flex-wrap justify-center items-center gap-x-3 lg:gap-x-6">
                                    <BlurText text="-50%" className="text-[#FDEF42]" delay={0.2} /> 
                                    <br className="hidden lg:block w-full" />
                                    <BlurText text="sur tout" className="text-white" delay={0.4} />
                                    <BlurText text="!" className="text-[#E31B23]" delay={0.6} />
                                </h2>
                                <p className="text-white/60 text-lg lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                                    Célébrez la fierté sénégalaise avec des prix imbattables. Commandez maintenant et équipez-vous comme un champion !
                                </p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <Magnetic>
                                        <Link
                                            href="/shop"
                                            className="inline-flex h-14 lg:h-16 items-center justify-center bg-gradient-to-r from-[#00853F] via-[#FDEF42] to-[#E31B23] text-black px-10 lg:px-12 rounded-xl text-sm font-black tracking-tight shadow-xl hover:scale-105 transition-all group"
                                        >
                                            🛒 ACHETER À -50%
                                            <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Magnetic>
                                    <Magnetic>
                                        <Link
                                            href="https://wa.me/221770000000"
                                            className="inline-flex h-14 lg:h-16 items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md px-10 lg:px-12 rounded-xl text-sm font-bold tracking-tight text-white hover:bg-white hover:text-black transition-all"
                                        >
                                            💬 Contact WhatsApp
                                        </Link>
                                    </Magnetic>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    )
}

