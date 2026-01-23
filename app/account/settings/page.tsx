"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
    Settings,
    ChevronLeft,
    User,
    Mail,
    Lock,
    Bell,
    Shield,
    Smartphone,
    Save,
    Camera,
    Loader2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

export default function SettingsPage() {
    const { data: session, status, update } = useSession()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false)

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
    })

    const [passwordData, setPasswordData] = React.useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        } else if (status === "authenticated" && session?.user) {
            setFormData({
                name: session.user.name || "",
                email: session.user.email || "",
                phone: (session.user as any).phone || "",
            })
        }
    }, [status, router, session])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                toast.success("Profil mis à jour avec succès")
                update() // Update next-auth session
            } else {
                const error = await res.text()
                toast.error(error || "Erreur lors de la mise à jour")
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas")
            return
        }

        setIsSubmitting(true)
        try {
            const res = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            })

            if (res.ok) {
                toast.success("Mot de passe modifié")
                setIsPasswordModalOpen(false)
                setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
            } else {
                const error = await res.text()
                toast.error(error || "Erreur lors de la modification")
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (status === "loading") return null

    const itemVariants: any = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
        }
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    className="space-y-12"
                >
                    {/* Header */}
                    <header className="space-y-6">
                        <motion.div variants={itemVariants}>
                            <Link href="/account" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group">
                                <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                Retour au Profil
                            </Link>
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Paramètres <span className="text-primary italic">Profil</span></h1>
                            <p className="text-sm text-muted-foreground font-medium">Personnalisez votre expérience et sécurisez vos données.</p>
                        </motion.div>
                    </header>

                    <div className="grid grid-cols-1 gap-10">
                        {/* Profile Section */}
                        <motion.section variants={itemVariants} className="bg-white border border-border rounded-[2.5rem] p-10 space-y-10 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <User className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold tracking-tight uppercase italic">Informations Personnelles</h2>
                            </div>

                            <div className="flex flex-col md:flex-row gap-12">
                                <form onSubmit={handleUpdateProfile} className="flex-1 space-y-8">
                                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                        <div className="space-y-4 flex flex-col items-center">
                                            <div className="relative group">
                                                <Avatar className="h-28 w-28 rounded-3xl border-4 border-white shadow-xl">
                                                    <AvatarImage src={session?.user?.image || ""} />
                                                    <AvatarFallback className="bg-muted text-2xl font-bold">
                                                        {session?.user?.name?.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <button type="button" className="absolute -bottom-2 -right-2 h-9 w-9 bg-black text-white rounded-xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-primary hover:text-black transition-all">
                                                    <Camera className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Modifier Photo</p>
                                        </div>

                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Nom Complet</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full h-14 px-6 bg-[#F9F9F9] border border-border rounded-xl outline-none focus:border-primary transition-colors font-medium text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full h-14 px-6 bg-[#F9F9F9] border border-border rounded-xl outline-none focus:border-primary transition-colors font-medium text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Téléphone</label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+221 ..."
                                                    className="w-full h-14 px-6 bg-[#F9F9F9] border border-border rounded-xl outline-none focus:border-primary transition-colors font-medium text-sm font-mono"
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <Button
                                                    disabled={isSubmitting}
                                                    className="w-full h-14 rounded-xl bg-black text-white hover:bg-primary hover:text-black transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                                                >
                                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                                    Mettre à jour
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </motion.section>

                        {/* Security Section */}
                        <motion.section variants={itemVariants} className="bg-white border border-border rounded-[2.5rem] p-10 space-y-10 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold tracking-tight uppercase italic">Sécurité du Compte</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-6 bg-muted/20 rounded-2xl border border-border/50">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold tracking-tight">Mot de passe</p>
                                            <p className="text-xs text-muted-foreground font-medium">Changez votre mot de passe régulièrement.</p>
                                        </div>
                                        <button
                                            onClick={() => setIsPasswordModalOpen(!isPasswordModalOpen)}
                                            className="text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary"
                                        >
                                            {isPasswordModalOpen ? "Annuler" : "Modifier"}
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {isPasswordModalOpen && (
                                            <motion.form
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                onSubmit={handleUpdatePassword}
                                                className="space-y-4 overflow-hidden px-1"
                                            >
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Mot de passe actuel</label>
                                                    <input
                                                        type="password"
                                                        required
                                                        value={passwordData.currentPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                        className="w-full h-12 px-4 bg-[#F9F9F9] border border-border rounded-xl outline-none focus:border-primary transition-colors text-sm"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Nouveau</label>
                                                        <input
                                                            type="password"
                                                            required
                                                            value={passwordData.newPassword}
                                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                            className="w-full h-12 px-4 bg-[#F9F9F9] border border-border rounded-xl outline-none focus:border-primary transition-colors text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Confirmer</label>
                                                        <input
                                                            type="password"
                                                            required
                                                            value={passwordData.confirmPassword}
                                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                            className="w-full h-12 px-4 bg-[#F9F9F9] border border-border rounded-xl outline-none focus:border-primary transition-colors text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <Button
                                                    disabled={isSubmitting}
                                                    className="w-full h-12 rounded-xl bg-black text-white hover:bg-primary hover:text-black transition-all font-bold text-[10px] uppercase tracking-widest"
                                                >
                                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Mettre à jour le mot de passe"}
                                                </Button>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>

                                    <div className="flex items-center justify-between p-6 bg-muted/20 rounded-2xl border border-border/50">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold tracking-tight">Double Authentification</p>
                                            <p className="text-xs text-muted-foreground font-medium">Sécurité renforcée par SMS.</p>
                                        </div>
                                        <div className="h-6 w-11 bg-muted rounded-full relative cursor-not-allowed opacity-50">
                                            <div className="absolute top-1 left-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 bg-red-50 rounded-3xl border border-red-100 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <p className="text-sm font-bold text-red-900 tracking-tight">Zone de Danger</p>
                                        <p className="text-xs text-red-600/70 font-medium leading-relaxed">
                                            La suppression de votre compte effacera toutes vos données, adresses et historique de commandes. Cette action est irréversible.
                                        </p>
                                    </div>
                                    <button className="text-[10px] font-bold uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors mt-6 text-left">
                                        Supprimer mon compte définitivement
                                    </button>
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
