"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollReveal } from "@/components/scroll-reveal"

const formSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
})

function RegisterContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    React.useEffect(() => {
        const error = searchParams.get("error")
        if (error) {
            toast.error("Une erreur est survenue lors de l'authentification.")
            router.replace("/register")
        }
    }, [searchParams, router])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                const errorData = await response.text()
                throw new Error(errorData || "Une erreur est survenue")
            }

            toast.success("Compte créé avec succès ! Connectez-vous.")
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-background">
            {/* Visual Side - Desktop */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
                <Image
                    src="https://www.foot.fr/146450-pdt_1500/maillot-dkali-senegal-blanc.jpg"
                    alt="Mbor Store Premium"
                    fill
                    className="object-cover opacity-60 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-20 left-20 z-10 space-y-8 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Innovation & Style</span>
                        <h2 className="text-6xl font-heading font-bold text-white leading-tight">
                            Entrez dans <br /> la <span className="text-primary italic">Légende.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {[
                            "Accès prioritaire aux drops limités",
                            "Services de flocage personnalisés",
                            "Suivi de commande en temps réel"
                        ].map((text, i) => (
                            <div key={i} className="flex items-center space-x-3 text-white/80 font-medium">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                <span>{text}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-16 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="w-full max-w-md space-y-10 relative z-10">
                    <ScrollReveal direction="up" className="space-y-2">
                        <Link href="/" className="inline-block mb-8 lg:hidden">
                            <span className="font-heading text-3xl font-bold tracking-tight">
                                Mbor<span className="text-primary italic">.Store</span>
                            </span>
                        </Link>
                        <h1 className="text-4xl font-heading font-bold tracking-tight">Créer un compte</h1>
                        <p className="text-muted-foreground font-medium">Rejoignez l'élite du sportswear au Sénégal.</p>
                    </ScrollReveal>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Nom complet</Label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        {...form.register("name")}
                                        placeholder="Prénom Nom"
                                        disabled={isLoading}
                                        className="h-14 pl-12 rounded-xl border-muted bg-muted/5 focus:border-primary/50 focus:ring-primary/10 transition-all font-medium"
                                    />
                                    {form.formState.errors.name && (
                                        <p className="text-[10px] text-destructive font-bold mt-1.5 ml-1 uppercase">{form.formState.errors.name.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        {...form.register("email")}
                                        placeholder="votre@email.com"
                                        type="email"
                                        disabled={isLoading}
                                        className="h-14 pl-12 rounded-xl border-muted bg-muted/5 focus:border-primary/50 focus:ring-primary/10 transition-all font-medium"
                                    />
                                    {form.formState.errors.email && (
                                        <p className="text-[10px] text-destructive font-bold mt-1.5 ml-1 uppercase">{form.formState.errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Mot de passe</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        {...form.register("password")}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Min. 8 caractères"
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
                                    {form.formState.errors.password && (
                                        <p className="text-[10px] text-destructive font-bold mt-1.5 ml-1 uppercase">{form.formState.errors.password.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full h-14 rounded-xl bg-black text-white hover:bg-primary hover:text-black transition-all font-bold tracking-tight shadow-lg shadow-black/5 group"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Création en cours...
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    Créer mon compte <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                            S'inscrire avec Google
                        </Button>
                    </div>

                    <p className="text-center text-[13px] font-medium text-muted-foreground italic">
                        Déjà membre de l'élite ?{" "}
                        <Link href="/login" className="font-bold text-black hover:text-primary transition-colors underline underline-offset-4 not-italic">
                            Connexion
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function RegisterPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>}>
            <RegisterContent />
        </React.Suspense>
    )
}

