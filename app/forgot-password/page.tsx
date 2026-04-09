"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Mail, ArrowLeft, Send, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requestPasswordReset } from "@/lib/actions/auth"

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isSubmitted, setIsSubmitted] = React.useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string

        try {
            const result = await requestPasswordReset(email)
            if (result.success) {
                setIsSubmitted(true)
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Un problème technique est survenu.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50/50">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <Link href="/login" className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] mb-6">
                        <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Retour à la connexion
                    </Link>
                    <div className="mx-auto h-16 w-16 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                        <Mail className="h-8 w-8 text-amber-600" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">MOT DE PASSE <span className="text-amber-600 font-normal not-italic">oublié ?</span></h1>
                    <p className="text-[14px] text-gray-500 font-medium max-w-xs mx-auto">
                        {isSubmitted 
                            ? "Vérifiez votre boîte mail pour les instructions de réinitialisation."
                            : "Entrez votre email et nous vous enverrons un lien de sécurité."
                        }
                    </p>
                </div>

                {!isSubmitted ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6"
                    >
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-3 group">
                                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Adresse Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-300 group-focus-within:text-amber-600 transition-colors" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="votre@email.com"
                                        required
                                        disabled={isLoading}
                                        className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50/20 focus:ring-amber-100 focus:border-amber-200 transition-all font-bold"
                                    />
                                </div>
                            </div>

                            <Button
                                className="w-full h-14 rounded-2xl bg-gray-950 text-white font-black uppercase text-[12px] tracking-[0.2em] hover:bg-black transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-gray-200 flex items-center gap-3"
                                disabled={isLoading}
                            >
                                {isLoading ? <Zap className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
                            </Button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-amber-50 p-10 rounded-[2.5rem] border border-amber-100 text-center space-y-6"
                    >
                        <div className="mx-auto h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                            <Zap className="h-6 w-6 text-amber-500" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-amber-900 leading-relaxed">
                                Le lien a été envoyé. 
                                <br />Si vous ne le recevez pas, vérifiez vos spams.
                            </p>
                        </div>
                        <Button
                            variant="link"
                            onClick={() => setIsSubmitted(false)}
                            className="text-xs font-bold uppercase tracking-widest text-amber-700 hover:text-amber-900"
                        >
                            Renvoyer l'email
                        </Button>
                    </motion.div>
                )}

                <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em]">
                    Mbor B. Store • Système de Sécurité
                </p>
            </div>
        </div>
    )
}
