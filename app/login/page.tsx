"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollReveal } from "@/components/scroll-reveal"

function LoginContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    React.useEffect(() => {
        const error = searchParams.get("error")
        if (error) {
            if (error === "OAuthSignin") {
                toast.error("Erreur d'authentification Google. Veuillez réessayer.")
            } else if (error === "OAuthCallback") {
                toast.error("Erreur lors de la récupération des informations Google.")
            } else if (error === "OAuthCreateAccount") {
                toast.error("Impossible de créer un compte avec ces informations.")
            } else if (error === "EmailSignin") {
                toast.error("Le lien de connexion n'est plus valide.")
            } else if (error === "CredentialsSignin") {
                toast.error("Identifiants incorrects.")
            } else {
                toast.error("Une erreur d'authentification est survenue.")
            }
            // Clear the error from URL without refreshing
            router.replace("/login")
        }
    }, [searchParams, router])

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
                    <ScrollReveal direction="up" className="space-y-1">
                        <Link href="/" className="inline-block mb-10">
                            <span className="text-2xl font-bold tracking-tight">
                                Mbor<span className="text-amber-600">.Store</span>
                            </span>
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bon retour</h1>
                        <p className="text-[15px] text-gray-500 font-medium">Accédez à votre espace exclusif Mbor B. Store.</p>
                    </ScrollReveal>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Adresse Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-amber-600 transition-colors" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="votre@email.com"
                                        required
                                        disabled={isLoading}
                                        className="h-12 pl-12 rounded-xl border-gray-100 bg-gray-50/30 focus:border-amber-500/50 focus:ring-amber-500/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Mot de passe</Label>
                                    <Link href="#" className="text-[11px] font-bold text-amber-600 hover:underline underline-offset-4">Oublié ?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-amber-600 transition-colors" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                        className="h-12 pl-12 pr-12 rounded-xl border-gray-100 bg-gray-50/30 focus:border-amber-500/50 focus:ring-amber-500/10 transition-all font-medium"
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
                            className="w-full h-12 rounded-xl bg-gray-900 text-white hover:bg-black transition-all font-bold tracking-tight shadow-lg shadow-gray-200 group"
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
                                <span className="w-full border-t border-gray-100" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                                <span className="bg-white px-4 text-gray-400">Authentification Sécurisée</span>
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
                            className="w-full h-12 rounded-xl border-gray-100 hover:bg-gray-50 font-bold tracking-tight transition-all active:scale-95 flex items-center justify-center gap-3"
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
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                            <ShieldCheck className="h-3.5 w-3.5" />
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-5xl font-bold text-white tracking-tight">
                            BE THE <span className="text-amber-500">BEST.</span>
                        </h2>
                        <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />
                        <p className="text-white/60 font-medium tracking-widest text-xs uppercase">Official Gear Provider</p>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 right-10 text-[10px] text-white/20 font-bold uppercase tracking-[0.5em]">
                    Dakar Edition
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>}>
            <LoginContent />
        </React.Suspense>
    )
}

