"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, Package, Truck, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Navigation />

            <main className="relative pt-32 pb-40 overflow-hidden">
                {/* Massive Background Text */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
                    <h2 className="text-[25vw] font-black leading-none tracking-tighter uppercase italic">CONFIRMED_</h2>
                </div>

                <div className="container px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        {/* High Impact Icon */}
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
                            <CheckCircle2 className="h-32 w-32 text-primary relative z-10 animate-in zoom-in-50 duration-500" />
                        </div>

                        {/* Kinetic Header */}
                        <div className="space-y-4">
                            <p className="text-primary font-black uppercase tracking-[0.6em] text-xs">Operational Success</p>
                            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.8] italic">
                                TRANSACTION <br />
                                <span className="text-muted-foreground/30 not-italic">AUTHORIZED_</span>
                            </h1>
                            <p className="text-xl font-bold mt-8 max-w-2xl mx-auto text-muted-foreground">
                                Your order <span className="text-foreground italic">#MB-49202684</span> has been locked into our dispatch queue. Logistics protocols initiated.
                            </p>
                        </div>

                        {/* Architectural Receipt Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 text-left">
                            <div className="p-10 border-l border-primary/30 bg-secondary/5 rounded-r-[3rem] space-y-8 backdrop-blur-sm">
                                <div className="space-y-2">
                                    <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Logistics Trace</p>
                                    <h3 className="text-2xl font-black uppercase italic">DISPATCH_SPEC</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <Package className="h-5 w-5 text-primary shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Processing Node</p>
                                            <p className="font-bold">MBOR Central Hub / Dakar - SN</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Truck className="h-5 w-5 text-primary shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Logistics Tier</p>
                                            <p className="font-bold">Priority Global Dispatch</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-border/50">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-4">Notification Channel</p>
                                    <p className="font-bold text-lg italic">mouha.dev@example.com</p>
                                    <p className="text-xs text-muted-foreground mt-2">Operational updates will be transmitted to this terminal.</p>
                                </div>
                            </div>

                            <div className="p-10 border-l border-border bg-secondary/5 rounded-r-[3rem] space-y-8 backdrop-blur-sm">
                                <div className="space-y-2">
                                    <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Financials</p>
                                    <h3 className="text-2xl font-black uppercase italic">SETTLEMENT_LOG</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Base Assets</span>
                                        <span className="font-black italic tabular-nums">$294.80</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Logistics Fee</span>
                                        <span className="font-black italic tabular-nums text-primary">$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Protocol Tax</span>
                                        <span className="font-black italic tabular-nums">$26.80</span>
                                    </div>
                                    <div className="pt-4 border-t border-border flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Total Locked</span>
                                        <span className="text-4xl font-black italic tabular-nums text-foreground leading-none">$321.60</span>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full h-14 rounded-2xl border-border font-black uppercase tracking-widest text-[10px] group hover:bg-foreground hover:text-background transition-all mt-4">
                                    <Download className="mr-3 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                                    Download manifest
                                </Button>
                            </div>
                        </div>

                        {/* Elite Navigation */}
                        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-12">
                            <Button className="h-20 px-12 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground group transition-all relative overflow-hidden" asChild>
                                <Link href="/shop">
                                    <span className="text-xs font-black uppercase tracking-[0.4em] relative z-10 flex items-center">
                                        Continue Research <ArrowRight className="ml-4 w-6 h-6 transition-transform group-hover:translate-x-2" />
                                    </span>
                                </Link>
                            </Button>
                            <Button variant="outline" className="h-20 px-12 rounded-full border-border text-foreground hover:bg-secondary transition-all font-black uppercase tracking-[0.2em] text-[10px]" asChild>
                                <Link href="/profile">View identity Dashboard</Link>
                            </Button>
                        </div>

                        <p className="text-[10px] font-black uppercase tracking-[1em] text-muted-foreground/30 pt-10">
                            MBOR BUSINESS STORE / OPERATIONAL PROTOCOL 2026
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
