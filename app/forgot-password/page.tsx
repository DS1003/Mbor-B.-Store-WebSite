"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

import Image from "next/image"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("[v0] Password reset requested for:", email)
        setIsSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative overflow-hidden flex flex-col items-center justify-center p-6">
            {/* Architectural Background Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none z-0">
                <h2 className="text-[25vw] font-black leading-none tracking-tighter uppercase italic">RECUPERATION_</h2>
            </div>

            <div className="w-full max-w-xl relative z-10">
                {/* Logo Section */}
                <div className="flex justify-center mb-16">
                    <Link href="/">
                        <Image src="/logo.png" alt="MBOR" width={160} height={48} className="h-12 w-40 object-contain" />
                    </Link>
                </div>

                <div className="bg-secondary/10 backdrop-blur-xl border border-border p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    {!isSubmitted ? (
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <p className="text-primary font-black uppercase tracking-[0.6em] text-[10px]">Restauration</p>
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.8]">
                                    MOT_DE_PASSE <br />
                                    <span className="text-muted-foreground/30 not-italic text-4xl lg:text-6xl">OUBLIE_</span>
                                </h1>
                                <p className="text-sm text-muted-foreground font-medium max-w-xs mt-6">
                                    Entrez vos identifiants pour initier le protocole de restauration de compte.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-1">Archive / Email d'Identité</p>
                                    <div className="relative group">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="IDENTITE@ARCHIVE.COM"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-16 h-20 bg-background/50 border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-bold placeholder:opacity-30"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full h-20 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground group transition-all relative overflow-hidden">
                                    <span className="text-sm font-black uppercase tracking-[0.4em] relative z-10 flex items-center justify-center">
                                        Initier Réinitialisation <ArrowRight className="ml-4 w-6 h-6 transition-transform group-hover:translate-x-2" />
                                    </span>
                                </Button>
                            </form>

                            <div className="pt-6 border-t border-border/50 text-center">
                                <Link href="/login" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group">
                                    <ArrowLeft className="mr-3 h-4 w-4 group-hover:-translate-x-2 transition-transform" />
                                    RETOUR_A_LA_BASE
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-10 py-8">
                            <div className="flex justify-center">
                                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20" />
                                    <CheckCircle className="h-10 w-10 text-primary" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-black uppercase italic tracking-tighter">SPEC_TRANSMIS</h2>
                                <p className="text-muted-foreground font-medium max-w-sm mx-auto">
                                    Les protocoles de réinitialisation ont été envoyés à <br />
                                    <span className="text-foreground font-black italic">{email}</span>
                                </p>
                            </div>

                            <div className="pt-8 space-y-6">
                                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full h-16 rounded-full border-border hover:bg-secondary font-black uppercase tracking-widest text-[10px] transition-all">
                                    RE_ENGAGER_PROTOCOLE
                                </Button>
                                <Link href="/login" className="block">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                                        RETOUR_CONNEXION
                                    </p>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
