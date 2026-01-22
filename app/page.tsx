import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Zap, ChevronRight, Star, TrendingUp } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Marquee, SpotlightCard, Magnetic, ShinyText } from "@/components/interactions"
import { ScrollReveal } from "@/components/scroll-reveal"
import { HeroCarousel } from "@/components/hero-carousel"
import { BrandCarousel } from "@/components/brand-carousel"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
    const productsFromDb = await prisma.product.findMany({
        where: { featured: true },
        include: { category: true },
        take: 4
    })

    const featuredProducts = productsFromDb.map(p => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        category: p.category?.name || "Sans catégorie",
        image: p.images[0] || "",
        isNew: true // Simplified for seed data
    }))

    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            {/* Hero Carousel Section */}
            <HeroCarousel />

            {/* Service Highlights Marquee */}
            <section className="py-10 border-b bg-muted/20 overflow-hidden relative">
                <Marquee className="[--duration:40s] [--gap:6rem]">
                    {[
                        { label: "Expédition Dakar 24h", icon: <TrendingUp className="h-4 w-4 text-primary" /> },
                        { label: "Produits 100% authentiques", icon: <Star className="h-4 w-4 text-primary" /> },
                        { label: "Paiement Wave & Orange Money", icon: <Zap className="h-4 w-4 text-primary" /> },
                        { label: "Flocage officiel disponible", icon: <ShoppingBag className="h-4 w-4 text-primary" /> },
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <span>{feature.icon}</span>
                            <span className="text-[12px] font-semibold tracking-tight text-foreground/80">{feature.label}</span>
                        </div>
                    ))}
                </Marquee>
            </section>

            {/* Categories Selection */}
            <section className="py-20 lg:py-32 overflow-hidden">
                <div className="container-custom">
                    <ScrollReveal className="flex flex-col items-center text-center space-y-6 mb-16 lg:mb-24">
                        <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
                            Univers Mbor Store
                        </span>
                        <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-4xl">
                            Dominez le terrain avec une élégance <span className="text-primary italic">signature</span>
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
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-8 lg:bottom-12 left-8 lg:left-12 max-w-md space-y-4 lg:space-y-6">
                                    <div className="inline-block bg-primary/20 backdrop-blur-md text-primary border border-primary/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        Exclusivité
                                    </div>
                                    <h3 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                                        Pack Lion <br /> du Sénégal
                                    </h3>
                                    <p className="text-base lg:text-lg text-white/80 font-medium tracking-tight">L'armure officielle pour la victoire. Authenticité et performance réunies.</p>
                                    <div className="inline-flex h-12 lg:h-14 items-center justify-center bg-white text-black px-8 lg:px-10 rounded-xl text-sm font-bold tracking-tight transition-all group-hover:bg-primary group-hover:text-primary-foreground">
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
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 lg:bottom-10 left-6 lg:left-10 space-y-2">
                                        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">Elite Style</h3>
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
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 lg:bottom-10 left-6 lg:left-10 space-y-2">
                                        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">United Pack</h3>
                                        <p className="text-xs lg:text-sm text-primary font-bold uppercase tracking-widest">Innovation Nike Football</p>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mid-Page Brand Banner */}
            <section className="relative h-[60vh] lg:h-[75vh] w-full overflow-hidden mb-20">
                <Image
                    src="https://www.foot.fr/img/blocks/107_1_img_background_lg.jpg"
                    alt="Performance Background"
                    fill
                    className="object-cover contrast-110 brightness-75"
                />
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div className="container-custom relative z-20 h-full flex items-center">
                    <ScrollReveal direction="left" className="max-w-3xl space-y-8">
                        <span className="text-white/60 font-bold uppercase tracking-[0.2em] text-[10px] lg:text-xs">
                            Haute Performance
                        </span>
                        <h2 className="font-heading text-5xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
                            L'équipement <br /> des <span className="text-primary italic">champions</span>
                        </h2>
                        <p className="text-lg lg:text-xl text-white/80 font-medium tracking-tight max-w-2xl leading-relaxed">
                            La précision au service de l'excellence. Découvrez les tenues d'entraînement et équipements officiels des plus grands clubs.
                        </p>
                        <Link href="/shop" className="inline-flex h-12 lg:h-14 items-center justify-center bg-primary text-black px-10 rounded-xl text-sm font-bold tracking-tight transition-all hover:bg-white">
                            Explorer la gamme Pro
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* Featured Products Grid */}
            <section className="py-20 lg:py-32 bg-muted/20">
                <div className="container-custom">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 lg:mb-24">
                        <ScrollReveal direction="left" className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="h-px w-8 bg-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Incontournables</span>
                            </div>
                            <h2 className="font-heading text-4xl lg:text-6xl font-bold tracking-tight">
                                Les best-sellers
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal direction="right">
                            <Link
                                href="/shop"
                                className="group inline-flex items-center text-sm font-bold tracking-tight hover:text-primary transition-colors"
                            >
                                Voir toute la boutique <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
                        {featuredProducts.map((product, i) => (
                            <ScrollReveal key={product.id} delay={i * 0.1}>
                                <div className="h-full">
                                    <ProductCard {...product} />
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands Carousel */}
            <BrandCarousel />

            {/* Premium CTA Section */}
            <section className="py-20 lg:py-40">
                <div className="container-custom">
                    <ScrollReveal>
                        <div className="relative rounded-3xl lg:rounded-[4rem] bg-black overflow-hidden p-12 lg:p-32 text-center shadow-2xl">
                            <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-primary opacity-10 blur-[120px] -translate-y-1/2 translate-x-1/2" />

                            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                                <h2 className="font-heading text-5xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
                                    Rejoignez <br /> <span className="text-primary italic">l'élite</span>
                                </h2>
                                <p className="text-white/60 text-lg lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                                    Soyez les premiers informés des sorties exclusives, des drops limités et profitez de services personnalisés.
                                </p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <Magnetic>
                                        <Link
                                            href="https://wa.me/221770000000"
                                            className="inline-flex h-14 lg:h-16 items-center justify-center bg-primary text-black px-10 lg:px-12 rounded-xl text-sm font-bold tracking-tight shadow-xl hover:scale-105 transition-all group"
                                        >
                                            Expert WhatsApp
                                            <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Magnetic>
                                    <Magnetic>
                                        <Link
                                            href="/account"
                                            className="inline-flex h-14 lg:h-16 items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md px-10 lg:px-12 rounded-xl text-sm font-bold tracking-tight text-white hover:bg-white hover:text-black transition-all"
                                        >
                                            Créer un compte
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
