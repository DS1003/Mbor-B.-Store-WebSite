"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Lock, ArrowLeft, Save, Zap, Eye, EyeOff, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPassword } from "@/lib/actions/auth"

function ResetPasswordContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [isLoading, setIsLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [passwordData, setPasswordData] = React.useState({
        new: "",
        confirm: ""
    })

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50/50">
                <div className="text-center space-y-6">
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Lien Invalide</h1>
                    <p className="text-sm text-gray-500 font-medium">Ce lien de réinitialisation est incomplet ou malformé.</p>
                    <Link href="/login" className="inline-block mt-4">
                        <Button className="h-12 px-8 rounded-xl bg-gray-900 font-bold uppercase text-[11px] tracking-widest">Retourner au Login</Button>
                    </Link>
                </div>
            </div>
        )
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (passwordData.new !== passwordData.confirm) {
            toast.error("Les mots de passe ne correspondent pas.")
            return
        }
        if (passwordData.new.length < 6) {
            toast.error("Le mot de passe doit faire au moins 6 caractères.")
            return
        }

        setIsLoading(true)
        try {
            const result = await resetPassword(token as string, passwordData.new)
            if (result.success) {
                toast.success(result.message)
                setTimeout(() => {
                    router.push("/login")
                }, 2000)
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
                    <div className="mx-auto h-16 w-16 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                        <Lock className="h-8 w-8 text-rose-600" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">NOUVEAU <span className="text-rose-600 font-normal not-italic">Mot de Passe.</span></h1>
                    <p className="text-[14px] text-gray-500 font-medium">Définissez vos nouveaux identifiants de sécurité.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8"
                >
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-3 group">
                                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nouveau mot de passe</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-300 group-focus-within:text-rose-500 transition-colors" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={passwordData.new}
                                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                        required
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        className="h-14 pl-12 pr-12 rounded-2xl border-gray-100 bg-gray-50/20 focus:ring-rose-50 focus:border-rose-200 transition-all font-bold"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-rose-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 group">
                                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Confirmer le mot de passe</Label>
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={passwordData.confirm}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                        required
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50/20 focus:ring-emerald-50 focus:border-emerald-200 transition-all font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full h-14 rounded-2xl bg-gray-950 text-white font-black uppercase text-[12px] tracking-[0.2em] hover:bg-black transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-gray-200 flex items-center gap-3"
                            disabled={isLoading}
                        >
                            {isLoading ? <Zap className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            {isLoading ? "Réinitialisation..." : "Enregistrer"}
                        </Button>
                    </form>
                </motion.div>

                <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em]">
                    MBOR B. STORE • CRYPTO SECURITY
                </p>
            </div>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>}>
            <ResetPasswordContent />
        </React.Suspense>
    )
}
