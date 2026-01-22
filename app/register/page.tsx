"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from "lucide-react"

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        // In a real app, you would call your API here
        // For now, let's pretend it works
        setTimeout(() => {
            toast.success("Compte créé avec succès")
            router.push("/login")
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div className="container-custom min-h-[calc(100vh-84px)] flex items-center justify-center py-10">
            <ScrollReveal className="w-full max-w-md space-y-8" direction="up">
                <div className="text-center space-y-2">
                    <h1 className="font-heading text-4xl font-bold tracking-tight">Rejoignez-nous</h1>
                    <p className="text-muted-foreground font-medium">Découvrez l'expérience Mbor Store</p>
                </div>

                <div className="bg-card border border-muted/60 p-8 rounded-[2rem] shadow-xl shadow-black/5 space-y-6">
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[12px] font-bold tracking-tight uppercase text-muted-foreground ml-1">Nom complet</Label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Prénom Nom"
                                    disabled={isLoading}
                                    className="h-14 pl-12 rounded-2xl border-muted/60 focus:ring-primary/20 bg-muted/20"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[12px] font-bold tracking-tight uppercase text-muted-foreground ml-1">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="nom@exemple.com"
                                    type="email"
                                    disabled={isLoading}
                                    className="h-14 pl-12 rounded-2xl border-muted/60 focus:ring-primary/20 bg-muted/20"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[12px] font-bold tracking-tight uppercase text-muted-foreground ml-1">Mot de passe</Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    disabled={isLoading}
                                    className="h-14 pl-12 pr-12 rounded-2xl border-muted/60 focus:ring-primary/20 bg-muted/20"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <Button className="w-full h-14 rounded-2xl bg-black text-white hover:bg-primary transition-all font-bold tracking-tight group" disabled={isLoading}>
                            {isLoading ? "Création en cours..." : "Créer mon compte"}
                            {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Déjà un compte ?{" "}
                    <Link href="/login" className="font-bold text-primary hover:underline">
                        Connectez-vous ici
                    </Link>
                </p>
            </ScrollReveal>
        </div>
    )
}
