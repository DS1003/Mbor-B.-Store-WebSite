"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
    CreditCard,
    ChevronLeft,
    Plus,
    Smartphone,
    MoreVertical,
    Check,
    Lock,
    Trash2,
    Loader2,
    X
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PaymentsPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [payments, setPayments] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSheetOpen, setIsSheetOpen] = React.useState(false)

    const [newMethod, setNewMethod] = React.useState({
        type: "Mobile Money",
        provider: "",
        accountNumber: "",
        expiryDate: "",
        isDefault: false
    })

    const fetchPayments = async () => {
        try {
            const res = await fetch("/api/user/payments")
            if (res.ok) {
                const data = await res.json()
                setPayments(data)
            }
        } catch (error) {
            toast.error("Erreur lors du chargement des modes de paiement")
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        } else if (status === "authenticated") {
            fetchPayments()
        }
    }, [status, router])

    const handleAddMethod = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch("/api/user/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMethod)
            })

            if (res.ok) {
                toast.success("Mode de paiement ajouté")
                setIsSheetOpen(false)
                setNewMethod({
                    type: "Mobile Money",
                    provider: "",
                    accountNumber: "",
                    expiryDate: "",
                    isDefault: false
                })
                fetchPayments()
            } else {
                toast.error("Erreur lors de l'ajout")
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        } finally {
            setIsSubmitting(false)
        }
    }

    const setAsDefault = async (id: string) => {
        try {
            const res = await fetch(`/api/user/payments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isDefault: true })
            })

            if (res.ok) {
                toast.success("Mode par défaut mis à jour")
                fetchPayments()
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour")
        }
    }

    const deleteMethod = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer ce mode de paiement ?")) return

        try {
            const res = await fetch(`/api/user/payments/${id}`, {
                method: "DELETE"
            })

            if (res.ok) {
                toast.success("Mode de paiement supprimé")
                fetchPayments()
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression")
        }
    }

    if (status === "loading" || isLoading) return null

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
            <div className="container-custom max-w-5xl">
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
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <motion.div variants={itemVariants} className="space-y-2">
                                <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Moyens de <span className="text-primary italic">Paiement</span></h1>
                                <p className="text-sm text-muted-foreground font-medium">Sécurisez vos transactions avec vos modes de paiement favoris.</p>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                                    <SheetTrigger asChild>
                                        <Button className="rounded-xl bg-black text-white hover:bg-primary hover:text-black transition-all font-bold text-xs uppercase tracking-widest px-6 h-12 flex items-center gap-2 shadow-lg">
                                            <Plus className="h-4 w-4" />
                                            Ajouter un mode
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="sm:max-w-md rounded-l-[3rem] border-l-0 p-10">
                                        <SheetHeader className="space-y-4 mb-10">
                                            <SheetTitle className="text-3xl font-bold tracking-tight italic">Nouveau <span className="text-primary">Mode</span></SheetTitle>
                                            <p className="text-sm text-muted-foreground font-medium">Choisissez votre option de paiement préférée.</p>
                                        </SheetHeader>
                                        <form onSubmit={handleAddMethod} className="space-y-8">
                                            <div className="space-y-4">
                                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Type de Paiement</Label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setNewMethod({ ...newMethod, type: "Mobile Money" })}
                                                        className={cn(
                                                            "h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all",
                                                            newMethod.type === "Mobile Money" ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/20"
                                                        )}
                                                    >
                                                        <Smartphone className="h-5 w-5" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">Mobile Money</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setNewMethod({ ...newMethod, type: "Bank Card" })}
                                                        className={cn(
                                                            "h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all",
                                                            newMethod.type === "Bank Card" ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/20"
                                                        )}
                                                    >
                                                        <CreditCard className="h-5 w-5" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">Carte</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Opérateur / Banque</Label>
                                                    <Input
                                                        placeholder={newMethod.type === "Mobile Money" ? "Wave, Orange Money..." : "Visa, Mastercard..."}
                                                        value={newMethod.provider}
                                                        onChange={(e) => setNewMethod({ ...newMethod, provider: e.target.value })}
                                                        required
                                                        className="h-14 rounded-xl bg-muted/20 border-border focus-visible:ring-primary/20 font-medium"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                                        {newMethod.type === "Mobile Money" ? "Numéro de téléphone" : "Numéro de carte"}
                                                    </Label>
                                                    <Input
                                                        placeholder={newMethod.type === "Mobile Money" ? "77 000 00 00" : "**** **** **** 0000"}
                                                        value={newMethod.accountNumber}
                                                        onChange={(e) => setNewMethod({ ...newMethod, accountNumber: e.target.value })}
                                                        required
                                                        className="h-14 rounded-xl bg-muted/20 border-border focus-visible:ring-primary/20 font-mono tracking-widest"
                                                    />
                                                </div>
                                                {newMethod.type === "Bank Card" && (
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Expiration (MM/YY)</Label>
                                                        <Input
                                                            placeholder="MM/YY"
                                                            value={newMethod.expiryDate}
                                                            onChange={(e) => setNewMethod({ ...newMethod, expiryDate: e.target.value })}
                                                            className="h-14 rounded-xl bg-muted/20 border-border focus-visible:ring-primary/20"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-3 pt-2">
                                                    <input
                                                        type="checkbox"
                                                        id="isDefault"
                                                        checked={newMethod.isDefault}
                                                        onChange={(e) => setNewMethod({ ...newMethod, isDefault: e.target.checked })}
                                                        className="h-5 w-5 rounded-md border-border text-primary focus:ring-primary"
                                                    />
                                                    <Label htmlFor="isDefault" className="text-xs font-bold uppercase tracking-widest cursor-pointer">Définir par défaut</Label>
                                                </div>
                                            </div>

                                            <Button
                                                disabled={isSubmitting}
                                                className="w-full h-14 rounded-[1.25rem] bg-black text-white hover:bg-primary hover:text-black transition-all font-bold text-xs uppercase tracking-widest shadow-xl"
                                            >
                                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sauvegarder le mode"}
                                            </Button>
                                        </form>
                                    </SheetContent>
                                </Sheet>
                            </motion.div>
                        </div>
                    </header>

                    {/* Payment list */}
                    {payments.length === 0 ? (
                        <motion.div variants={itemVariants} className="bg-white border-2 border-dashed border-border rounded-[3rem] p-20 flex flex-col items-center text-center space-y-6">
                            <div className="h-20 w-20 rounded-[2rem] bg-muted/20 flex items-center justify-center text-muted-foreground/40">
                                <CreditCard className="h-10 w-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold tracking-tight uppercase italic">Aucun mode activé</h3>
                                <p className="text-sm text-muted-foreground font-medium max-w-sm">
                                    Ajoutez votre premier mode de paiement pour des achats plus rapides et sécurisés.
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {payments.map((method) => (
                                <motion.div
                                    key={method.id}
                                    variants={itemVariants}
                                    className={cn(
                                        "bg-white border rounded-[2.5rem] p-10 space-y-8 transition-all duration-500 relative group overflow-hidden",
                                        method.isDefault ? "border-primary/30 shadow-2xl shadow-primary/5" : "border-border hover:border-primary/20"
                                    )}
                                >
                                    <div className="absolute top-0 right-0 h-40 w-40 bg-muted/20 rounded-bl-full -z-0" />

                                    <div className="relative z-10 space-y-8">
                                        <div className="flex items-start justify-between">
                                            <div className={cn(
                                                "h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl",
                                                method.type === "Mobile Money" ? "bg-blue-500" : "bg-black"
                                            )}>
                                                {method.type === "Mobile Money" ? <Smartphone className="h-6 w-6" /> : <CreditCard className="h-6 w-6" />}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {method.isDefault && (
                                                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                                                        <Check className="h-3 w-3" />
                                                        <span className="text-[9px] font-bold uppercase tracking-widest">Défaut</span>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => deleteMethod(method.id)}
                                                    className="h-8 w-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{method.type}</p>
                                            <h3 className="text-2xl font-bold tracking-tight">{method.provider}</h3>
                                            <p className="text-sm font-medium text-muted-foreground/60 tracking-widest tabular-nums italic">{method.accountNumber}</p>
                                            {method.expiryDate && (
                                                <p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest">Expire: {method.expiryDate}</p>
                                            )}
                                        </div>

                                        <div className="pt-6 flex items-center justify-between border-t border-border/50">
                                            <div className="flex items-center gap-2 text-muted-foreground/40 text-[9px] font-bold uppercase tracking-widest">
                                                <Lock className="h-3 w-3" />
                                                Chiffré & Sécurisé
                                            </div>
                                            {!method.isDefault && (
                                                <button
                                                    onClick={() => setAsDefault(method.id)}
                                                    className="text-[9px] font-bold uppercase tracking-widest text-primary border-b border-primary hover:text-black hover:border-black transition-colors"
                                                >
                                                    Utiliser par défaut
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Security Banner */}
                    <motion.div variants={itemVariants} className="bg-muted/30 border border-border rounded-[3rem] p-12 lg:p-16 flex flex-col md:flex-row items-center gap-10">
                        <div className="h-20 w-20 rounded-[2rem] bg-white border border-border flex items-center justify-center text-primary shadow-sm shrink-0">
                            <Lock className="h-8 w-8" />
                        </div>
                        <div className="space-y-4 text-center md:text-left">
                            <h3 className="text-2xl font-bold tracking-tight uppercase italic">Confidentialité Totale</h3>
                            <p className="text-sm text-muted-foreground font-medium max-w-2xl leading-relaxed">
                                Vos informations bancaires ne sont jamais stockées sur nos serveurs. Nous utilisons des protocoles de chiffrement de bout en bout conformes aux standards PCI-DSS pour garantir la sécurité de votre "Flux Financier".
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
