"use client"

import * as React from "react"
import { Ruler, CheckCircle2, Info } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SizeGuidePage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            {/* Header */}
            <section className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
                <div className="container-custom relative z-10 text-center space-y-8">
                    <ScrollReveal direction="down">
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
                            Aide au Choix
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                            Guide des <span className="text-primary italic">Tailles.</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.4} className="max-w-2xl mx-auto opacity-70">
                        <p className="text-lg font-medium leading-relaxed italic">Trouvez la coupe parfaite pour chaque équipement. Car la performance commence par le confort.</p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="py-24 md:py-40">
                <div className="container-custom">
                    <Tabs defaultValue="footwear" className="w-full space-y-16">
                        <div className="flex justify-center">
                            <TabsList className="bg-muted p-1 rounded-2xl h-16 sm:h-20 sm:p-2">
                                <TabsTrigger value="footwear" className="rounded-xl px-8 sm:px-12 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:shadow-lg">Crampons & Sneakers</TabsTrigger>
                                <TabsTrigger value="apparel" className="rounded-xl px-8 sm:px-12 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:shadow-lg">Maillots & Training</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="footwear" className="space-y-16">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                <ScrollReveal direction="left" className="space-y-10">
                                    <h3 className="text-4xl font-black uppercase italic tracking-tighter">Mesurer votre <span className="text-primary">Pied</span></h3>
                                    <div className="space-y-8">
                                        <div className="flex gap-6">
                                            <div className="h-10 w-10 rounded-full bg-primary text-black flex items-center justify-center font-black shrink-0">1</div>
                                            <p className="font-medium text-muted-foreground">Posez votre pied sur une feuille de papier, le talon contre un mur.</p>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="h-10 w-10 rounded-full bg-primary text-black flex items-center justify-center font-black shrink-0">2</div>
                                            <p className="font-medium text-muted-foreground">Marquez l'extrémité de votre orteil le plus long sur le papier.</p>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="h-10 w-10 rounded-full bg-primary text-black flex items-center justify-center font-black shrink-0">3</div>
                                            <p className="font-medium text-muted-foreground">Mesurez la distance en cm et référez-vous au tableau ci-contre.</p>
                                        </div>
                                    </div>
                                    <div className="p-8 bg-black text-white rounded-[2rem] flex items-start space-x-6 border-2 border-primary/20">
                                        <Info className="h-6 w-6 text-primary shrink-0" />
                                        <p className="text-sm font-medium leading-relaxed text-white/70">
                                            <span className="text-white font-bold block mb-1">Conseil Pro:</span>
                                            Si vous êtes entre deux tailles, nous vous conseillons de prendre la plus grande pour les crampons de football.
                                        </p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="right" className="bg-card border-2 border-muted rounded-[3rem] p-10 overflow-x-auto shadow-2xl">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b-2 border-muted">
                                                <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-primary">EU Size</th>
                                                <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-primary">UK Size</th>
                                                <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-primary">US Size</th>
                                                <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-primary text-right">CM (Pied)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-muted/50">
                                            {[
                                                { eu: "40", uk: "6", us: "7", cm: "25.0" },
                                                { eu: "41", uk: "7", us: "8", cm: "26.0" },
                                                { eu: "42", uk: "8", us: "9", cm: "26.5" },
                                                { eu: "43", uk: "9", us: "10", cm: "27.5" },
                                                { eu: "44", uk: "10", us: "11", cm: "28.0" },
                                                { eu: "45", uk: "11", us: "12", cm: "29.0" },
                                            ].map((row, i) => (
                                                <tr key={i} className="group hover:bg-muted/30 transition-colors">
                                                    <td className="py-6 font-black italic text-xl group-hover:text-primary transition-colors">{row.eu}</td>
                                                    <td className="py-6 font-bold text-muted-foreground">{row.uk}</td>
                                                    <td className="py-6 font-bold text-muted-foreground">{row.us}</td>
                                                    <td className="py-6 font-black tracking-tighter text-right text-lg">{row.cm}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </ScrollReveal>
                            </div>
                        </TabsContent>

                        <TabsContent value="apparel" className="space-y-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                {[
                                    { t: "S", desc: "Poitrine: 88-96cm", fit: "Coupe ajustée" },
                                    { t: "M", desc: "Poitrine: 96-104cm", fit: "Coupe standard" },
                                    { t: "L", desc: "Poitrine: 104-112cm", fit: "Coupe standard" },
                                    { t: "XL", desc: "Poitrine: 112-124cm", fit: "Confortable" },
                                ].map((size, i) => (
                                    <ScrollReveal key={i} delay={i * 0.1} className="p-12 bg-card border-2 border-muted rounded-[3.5rem] text-center space-y-6 hover:border-primary/20 transition-all group">
                                        <span className="text-6xl font-black italic tracking-tighter text-primary group-hover:scale-110 block transition-transform">{size.t}</span>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{size.desc}</p>
                                            <p className="text-xs font-bold uppercase tracking-tight">{size.fit}</p>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </div>
    )
}
