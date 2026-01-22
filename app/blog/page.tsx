"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User, Tag, ArrowUpRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/interactions"
import { Button } from "@/components/ui/button"

const POSTS = [
    {
        id: "1",
        title: "Comment choisir ses crampons pour terrain gras ?",
        excerpt: "Découvrez notre guide ultime pour sélectionner la paire idéale et dominer le terrain quelles que soient les conditions.",
        category: "Performance",
        author: "Moussa",
        date: "20 Janv 2026",
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: "2",
        title: "L'ascension du Streetwear à Dakar : Les tendances 2026",
        excerpt: "Analyse des styles qui transforment la capitale sénégalaise en nouveau hub de la mode urbaine mondiale.",
        category: "Lifestyle",
        author: "Awa",
        date: "15 Janv 2026",
        image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: "3",
        title: "Entretien exclusif : Dans le sac d'un joueur pro",
        excerpt: "Nous avons rencontré un international sénégalais pour parler de ses rituels et de ses équipements préférés.",
        category: "Interview",
        author: "Dakar Sport",
        date: "10 Janv 2026",
        image: "https://images.unsplash.com/photo-1518000149351-f1a2cc629a8a?q=80&w=2000&auto=format&fit=crop"
    }
]

export default function BlogPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            {/* Hero */}
            <section className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
                <div className="container-custom relative z-10 text-center space-y-8">
                    <ScrollReveal direction="down">
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
                            Journal & Culture
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                            Mbor <span className="text-primary italic">Journal.</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.4} className="max-w-2xl mx-auto opacity-70">
                        <p className="text-lg font-medium leading-relaxed italic">Exploration des tendances, guides de performance et histoires de passionnés.</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-24">
                <div className="container-custom">
                    <ScrollReveal className="group relative aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl">
                        <Image
                            src={POSTS[0].image}
                            alt={POSTS[0].title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute bottom-16 left-16 right-16 space-y-8">
                            <div className="flex items-center space-x-6 text-xs font-black uppercase tracking-widest text-primary">
                                <span className="px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30">À la une</span>
                                <span>{POSTS[0].date}</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white max-w-3xl leading-none">
                                {POSTS[0].title}
                            </h2>
                            <Magnetic>
                                <Link href={`/blog/${POSTS[0].id}`} className="inline-flex items-center space-x-3 text-white font-black uppercase tracking-widest text-[10px] group-hover:text-primary transition-colors">
                                    <span>Lire l'article</span>
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Magnetic>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Grid */}
            <section className="py-24 md:pb-40">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {POSTS.slice(1).map((post, i) => (
                            <ScrollReveal key={post.id} delay={i * 0.1} className="group flex flex-col space-y-8">
                                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-xl">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 bg-black/60 backdrop-blur-md text-[8px] font-black uppercase tracking-widest text-white rounded-full border border-white/10">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-6 flex-1 flex flex-col">
                                    <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest opacity-40">
                                        <span className="flex items-center"><User className="h-3 w-3 mr-2" /> {post.author}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-tight group-hover:text-primary transition-colors flex-1">
                                        {post.title}
                                    </h3>
                                    <Magnetic>
                                        <Link href={`/blog/${post.id}`} className="inline-flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] pt-4 group-hover:text-primary transition-all">
                                            <span>Explorer</span>
                                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-2" />
                                        </Link>
                                    </Magnetic>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="mt-32 flex justify-center">
                        <Button variant="outline" className="h-16 px-12 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black hover:text-white transition-all border-2">
                            Charger plus d'articles
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
