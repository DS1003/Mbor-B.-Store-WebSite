"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
    MapPin,
    ChevronLeft,
    Plus,
    Home,
    Briefcase,
    MoreVertical,
    Edit2,
    Trash2,
    Check,
    Loader2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Address {
    id: string
    name: string | null
    firstName: string
    lastName: string
    street: string
    city: string
    phone: string
    isDefault: boolean
}

export default function AddressPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [addresses, setAddresses] = React.useState<Address[]>([])
    const [loading, setLoading] = React.useState(true)
    const [isSheetOpen, setIsSheetOpen] = React.useState(false)
    const [editingAddress, setEditingAddress] = React.useState<Address | null>(null)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const [formData, setFormData] = React.useState({
        name: "",
        firstName: "",
        lastName: "",
        street: "",
        city: "Dakar",
        phone: "",
        isDefault: false
    })

    const fetchAddresses = async () => {
        try {
            const res = await fetch("/api/user/addresses")
            if (res.ok) {
                const data = await res.json()
                setAddresses(data)
            }
        } catch (error) {
            toast.error("Impossible de charger les adresses")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        } else if (status === "authenticated") {
            fetchAddresses()
        }
    }, [status, router])

    const handleOpenSheet = (address?: Address) => {
        if (address) {
            setEditingAddress(address)
            setFormData({
                name: address.name || "",
                firstName: address.firstName,
                lastName: address.lastName,
                street: address.street,
                city: address.city,
                phone: address.phone,
                isDefault: address.isDefault
            })
        } else {
            setEditingAddress(null)
            setFormData({
                name: "Domicile",
                firstName: session?.user?.name?.split(" ")[0] || "",
                lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
                street: "",
                city: "Dakar",
                phone: "",
                isDefault: addresses.length === 0 // First one is default
            })
        }
        setIsSheetOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const url = editingAddress
                ? `/api/user/addresses/${editingAddress.id}`
                : "/api/user/addresses"

            const method = editingAddress ? "PATCH" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                toast.success(editingAddress ? "Adresse mise à jour" : "Adresse ajoutée")
                setIsSheetOpen(false)
                fetchAddresses()
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cette adresse ?")) return

        try {
            const res = await fetch(`/api/user/addresses/${id}`, { method: "DELETE" })
            if (res.ok) {
                toast.success("Adresse supprimée")
                fetchAddresses()
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression")
        }
    }

    const handleSetDefault = async (id: string) => {
        try {
            const res = await fetch(`/api/user/addresses/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isDefault: true })
            })
            if (res.ok) {
                fetchAddresses()
                toast.success("Adresse par défaut mise à jour")
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour")
        }
    }

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        )
    }

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
                                <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Adresses <span className="text-primary italic">de Livraison</span></h1>
                                <p className="text-sm text-muted-foreground font-medium">Gérez vos points de chute pour des livraisons rapides et fluides.</p>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Button
                                    onClick={() => handleOpenSheet()}
                                    className="rounded-xl bg-black text-white hover:bg-primary hover:text-black transition-all font-bold text-xs uppercase tracking-widest px-6 h-12 flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Nouvelle Adresse
                                </Button>
                            </motion.div>
                        </div>
                    </header>

                    {/* Address List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((address) => (
                            <motion.div
                                key={address.id}
                                variants={itemVariants}
                                className={cn(
                                    "bg-white border-2 rounded-[2rem] p-8 space-y-6 transition-all duration-300 relative group",
                                    address.isDefault ? "border-primary/20 shadow-lg shadow-primary/5" : "border-border hover:border-primary/30"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className={cn(
                                        "h-12 w-12 rounded-xl flex items-center justify-center transition-colors",
                                        address.isDefault ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                                    )}>
                                        {address.name?.toLowerCase().includes("bureau") ? <Briefcase className="h-5 w-5" /> : <Home className="h-5 w-5" />}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {address.isDefault && (
                                            <span className="bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">
                                                Par défaut
                                            </span>
                                        )}
                                        {!address.isDefault && (
                                            <button
                                                onClick={() => handleSetDefault(address.id)}
                                                className="h-8 px-3 rounded-full border border-border text-[9px] font-bold uppercase tracking-widest flex items-center justify-center hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                Définir par défaut
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{address.name || "Adresse"}</p>
                                        <p className="text-xl font-bold tracking-tight">{address.firstName} {address.lastName}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground font-medium leading-relaxed">{address.street}, {address.city}</p>
                                        <p className="text-sm font-mono text-muted-foreground">{address.phone}</p>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center gap-3 border-t border-border/50">
                                    <button
                                        onClick={() => handleOpenSheet(address)}
                                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <Edit2 className="h-3 w-3" /> Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(address.id)}
                                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <Trash2 className="h-3 w-3" /> Supprimer
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty state */}
                    {addresses.length === 0 && (
                        <motion.div variants={itemVariants} className="bg-white border-2 border-dashed border-border rounded-[3rem] p-20 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground/30">
                                <MapPin className="h-10 w-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold tracking-tight uppercase italic">Aucune adresse enregistrée</h3>
                                <p className="text-sm text-muted-foreground font-medium max-w-xs">Ajoutez votre première adresse pour accélérer vos prochaines commandes.</p>
                            </div>
                            <Button
                                onClick={() => handleOpenSheet()}
                                className="rounded-xl bg-black text-white hover:bg-primary transition-all font-bold text-xs uppercase tracking-widest px-8"
                            >
                                Ajouter maintenant
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Address Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md bg-white p-0 overflow-hidden border-l-0">
                    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar pt-10 px-8 pb-10">
                        <header className="space-y-2 mb-10">
                            <SheetTitle className="text-3xl font-heading font-bold">
                                {editingAddress ? "Modifier" : "Nouvelle"} <span className="text-primary italic">Adresse</span>
                            </SheetTitle>
                            <SheetDescription className="text-sm font-medium">
                                Ces informations seront utilisées pour vos futures livraisons.
                            </SheetDescription>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Type (Ex: Maison, Bureau)</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="h-12 rounded-xl focus:border-primary/30"
                                    placeholder="Domicile"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Prénom</Label>
                                    <Input
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="h-12 rounded-xl focus:border-primary/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Nom</Label>
                                    <Input
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="h-12 rounded-xl focus:border-primary/30"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Téléphone</Label>
                                <Input
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="h-12 rounded-xl focus:border-primary/30 font-mono"
                                    placeholder="+221 ..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Quartier & Précisions</Label>
                                <Input
                                    required
                                    value={formData.street}
                                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                    className="h-12 rounded-xl focus:border-primary/30"
                                    placeholder="Ex: Villa 12, Scat Urbam"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Ville</Label>
                                <Input
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="h-12 rounded-xl focus:border-primary/30"
                                />
                            </div>

                            <div className="flex items-center space-x-3 pt-4">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    checked={formData.isDefault}
                                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                                    className="h-5 w-5 rounded-md border-border text-primary focus:ring-primary/20"
                                />
                                <Label htmlFor="isDefault" className="text-xs font-bold uppercase tracking-tight cursor-pointer">Définir comme adresse par défaut</Label>
                            </div>

                            <div className="pt-10">
                                <Button
                                    disabled={isSubmitting}
                                    className="w-full h-14 bg-black text-white hover:bg-primary hover:text-black transition-all font-bold text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-black/5"
                                >
                                    {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : editingAddress ? "Enregistrer les modifications" : "Ajouter l'adresse"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
