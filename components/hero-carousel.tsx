"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Magnetic } from "./interactions"

const HERO_SLIDES = [
    {
        image: "https://cdn.blazimg.com/homepage/stores/1/FR_adidas_slider_desktop_4.webp",
        title: "Adidas F50",
        subtitle: "La performance au service de la vitesse.",
        cta: "Découvrir la collection",
        link: "/shop/adidas",
        color: "primary"
    },
    {
        image: "https://cdn.blazimg.com/homepage/stores/1/FR_Max_Voltage_slider_desktop_3.webp",
        title: "Nike Max Voltage",
        subtitle: "L'énergie pure à chaque foulée.",
        cta: "Acheter Nike",
        link: "/shop/nike",
        color: "primary"
    },
    {
        image: "https://cdn.blazimg.com/homepage/stores/1/FR_Offre_A_slider_desktop_2.webp",
        title: "Offres Élites",
        subtitle: "Équipez-vous comme un pro à prix réduit.",
        cta: "Profiter des offres",
        link: "/shop/sale",
        color: "primary"
    },
    {
        image: "https://cdn.blazimg.com/homepage/stores/1/FR_Nike_slider_desktop_6.webp",
        title: "Nike Air Zoom",
        subtitle: "Mercurial Vapor 16, l'innovation par excellence.",
        cta: "Voir les crampons",
        link: "/shop/crampons",
        color: "primary"
    },
    {
        image: "https://cdn.blazimg.com/homepage/stores/1/FR_CDM_slider_desktop2.webp",
        title: "L'Arène Mbor",
        subtitle: "Le futur du sport commence ici.",
        cta: "Nouveautés",
        link: "/shop/new",
        color: "primary"
    }
]

export function HeroCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [Autoplay({ delay: 6000, stopOnInteraction: false })])
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = React.useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi, setSelectedIndex])

    React.useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on("select", onSelect)
    }, [emblaApi, onSelect])

    return (
        <section className="relative h-[80vh] sm:h-[85vh] w-full overflow-hidden bg-background">
            <div className="h-full w-full" ref={emblaRef}>
                <div className="flex h-full">
                    {HERO_SLIDES.map((slide, index) => (
                        <div key={index} className="relative flex-[0_0_100%] h-full min-w-0">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover h-full w-full"
                                priority={index === 0}
                            />
                            {/* Overlay Gradient Softened */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

                            {/* Content */}
                            <div className="container-custom relative z-20 h-full flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {selectedIndex === index && (
                                        <div className="max-w-2xl space-y-4 sm:space-y-6">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                            >
                                                <h2 className="font-heading text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-tight text-white drop-shadow-sm">
                                                    {slide.title}
                                                </h2>
                                            </motion.div>

                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                                className="text-base sm:text-xl text-white/90 max-w-lg font-medium tracking-tight"
                                            >
                                                {slide.subtitle}
                                            </motion.p>

                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                                className="pt-2 sm:pt-4"
                                            >
                                                <Magnetic>
                                                    <Link
                                                        href={slide.link}
                                                        className="inline-flex h-12 sm:h-14 items-center justify-center bg-white text-black px-8 sm:px-10 rounded-xl text-sm font-bold tracking-tight transition-all hover:bg-primary hover:text-primary-foreground shadow-lg active:scale-95"
                                                    >
                                                        {slide.cta}
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Magnetic>
                                            </motion.div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows - Responsive visibility */}
            <div className="hidden sm:flex absolute bottom-12 right-12 z-30 gap-4">
                <button
                    onClick={scrollPrev}
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:border-transparent transition-all group/btn"
                >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 group-hover/btn:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={scrollNext}
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:border-transparent transition-all group/btn"
                >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Pagination Dots - Positioned for thumb reach */}
            <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/20 backdrop-blur-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/10">
                {HERO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                        className={cn(
                            "h-1.5 transition-all duration-500 rounded-full",
                            selectedIndex === index ? "w-10 bg-primary" : "w-2 bg-white/30"
                        )}
                    />
                ))}
            </div>

            <div className="absolute top-12 right-12 z-30">
                <div className="text-white font-bold text-5xl opacity-10 tabular-nums">
                    0{selectedIndex + 1}
                </div>
            </div>
        </section>
    )
}
