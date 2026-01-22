"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                toast.error("Identifiants invalides")
            } else {
                toast.success("Connexion réussie")
                router.push("/")
                router.refresh()
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container-custom min-h-[calc(100vh-84px)] flex items-center justify-center py-10">
            <ScrollReveal className="w-full max-w-md space-y-8" direction="up">
                <div className="text-center space-y-2">
                    <h1 className="font-heading text-4xl font-bold tracking-tight">Bon retour !</h1>
                    <p className="text-muted-foreground font-medium">Connectez-vous à votre compte Mbor Store</p>
                </div>

                <div className="bg-card border border-muted/60 p-8 rounded-[2rem] shadow-xl shadow-black/5 space-y-6">
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[12px] font-bold tracking-tight uppercase text-muted-foreground ml-1">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="nom@exemple.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    className="h-14 pl-12 rounded-2xl border-muted/60 focus:ring-primary/20 bg-muted/20"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <Label htmlFor="password" className="text-[12px] font-bold tracking-tight uppercase text-muted-foreground">Mot de passe</Label>
                                <Link href="#" className="text-[11px] font-bold text-primary hover:underline">Oublié ?</Link>
                            </div>
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
                            {isLoading ? "Connexion en cours..." : "Se connecter"}
                            {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted/60" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                            <span className="bg-card px-3 text-muted-foreground">Test Accounts</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-[11px] font-medium text-muted-foreground bg-muted/10 p-4 rounded-xl border border-muted/40">
                        <p><span className="font-bold text-foreground">Client:</span> client@mbor.com / client123</p>
                        <p><span className="font-bold text-foreground">Admin:</span> admin@mbor.com / admin123</p>
                    </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Pas encore de compte ?{" "}
                    <Link href="/register" className="font-bold text-primary hover:underline">
                        Créez-en un ici
                    </Link>
                </p>
            </ScrollReveal>
        </div>
    )
}
