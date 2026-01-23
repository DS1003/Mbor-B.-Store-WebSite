"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollReveal } from "@/components/scroll-reveal"

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
                toast.error("Identifiants incorrects. Veuillez réessayer.")
            } else {
                toast.success("Authentification réussie. Bienvenue !")
                router.push("/")
                router.refresh()
            }
        } catch (error) {
            toast.error("Un problème technique est survenu.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-background">
            {/* Form Side */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-16 relative overflow-hidden order-2 lg:order-1">
                {/* Background Decor */}
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="w-full max-w-md space-y-10 relative z-10">
                    <ScrollReveal direction="up" className="space-y-2">
                        <Link href="/" className="inline-block mb-8">
                            <span className="font-heading text-3xl font-bold tracking-tight">
                                Mbor<span className="text-primary italic">.Store</span>
                            </span>
                        </Link>
                        <h1 className="text-4xl font-heading font-bold tracking-tight">Bon retour</h1>
                        <p className="text-muted-foreground font-medium italic">Accédez à votre espace exclusif Mbor Store.</p>
                    </ScrollReveal>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Adresse Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="votre@email.com"
                                        required
                                        disabled={isLoading}
                                        className="h-14 pl-12 rounded-xl border-muted bg-muted/5 focus:border-primary/50 focus:ring-primary/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">Mot de passe</Label>
                                    <Link href="#" className="text-[11px] font-bold text-primary hover:underline underline-offset-4">Oublié ?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                        className="h-14 pl-12 pr-12 rounded-xl border-muted bg-muted/5 focus:border-primary/50 focus:ring-primary/10 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full h-14 rounded-xl bg-black text-white hover:bg-primary hover:text-black transition-all font-bold tracking-tight shadow-md shadow-black/5 group"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Vérification...
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    Se connecter <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-muted/60" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                                <span className="bg-background px-4 text-muted-foreground/60 italic">Elite Connection</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            type="button"
                            disabled={isLoading}
                            onClick={async () => {
                                setIsLoading(true)
                                await signIn("google", { callbackUrl: "/" })
                            }}
                            className="w-full h-14 rounded-xl border-muted/80 hover:bg-muted/30 font-bold tracking-tight transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            ) : (
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                </svg>
                            )}
                            Continuer avec Google
                        </Button>
                    </div>

                    <div className="bg-muted/20 p-6 rounded-2xl border border-muted/40 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-primary">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Accès Mode Test</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1 text-[11px] font-medium text-muted-foreground">
                            <p><span className="text-black font-bold">Client:</span> client@mbor.com | client123</p>
                            <p><span className="text-black font-bold">Admin:</span> admin@mbor.com | admin123</p>
                        </div>
                    </div>

                    <p className="text-center text-[13px] font-medium text-muted-foreground italic">
                        Nouveau chez nous ?{" "}
                        <Link href="/register" className="font-bold text-black hover:text-primary transition-colors underline underline-offset-4 not-italic">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>

            {/* Visual Side - Desktop */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black order-1 lg:order-2">
                <Image
                    src="https://www.foot.fr/146450-pdt_1500/maillot-dkali-senegal-blanc.jpg"
                    alt="Mbor Store Luxury Login"
                    fill
                    className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/80" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-6 w-full px-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4"
                    >
                        <h2 className="text-7xl font-heading font-black text-white italic tracking-tighter">
                            BE <br /> THE <span className="text-primary">BEST.</span>
                        </h2>
                        <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
                        <p className="text-white/60 font-medium tracking-[0.2em] text-xs uppercase">Official Gear Provider</p>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 right-10 text-[10px] text-white/20 font-bold uppercase tracking-[0.5em]">
                    Dakar Edition
                </div>
            </div>
        </div>
    )
}

