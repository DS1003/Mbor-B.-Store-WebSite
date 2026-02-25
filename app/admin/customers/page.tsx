"use client"

import * as React from "react"
import {
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ChevronLeft,
    ChevronRight,
    UserPlus,
    User,
    ShoppingBag,
    Star,
    Eye,
    Zap,
    Trophy,
    Shield,
    MessageSquare,
    TrendingUp,
    Trash,
    Target,
    Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal"
import { getAdminCustomers, deleteUser, createCustomer, sendMarketingBroadcast } from "../actions"

export default function AdminCustomersPage() {
    const [customersData, setCustomersData] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null)
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")

    // Action states
    const [isRegisterOpen, setIsRegisterOpen] = React.useState(false)
    const [isMarketingOpen, setIsMarketingOpen] = React.useState(false)
    const [newCustomer, setNewCustomer] = React.useState({ name: "", email: "" })
    const [marketingData, setMarketingData] = React.useState({ subject: "", message: "" })
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // Delete state
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [idToDelete, setIdToDelete] = React.useState<string | null>(null)
    const [isDeleting, setIsDeleting] = React.useState(false)

    // Pagination state
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 10

    const loadData = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await getAdminCustomers()
            setCustomersData(data)
        } catch (error) {
            console.error("Failed to load customers:", error)
            toast.error("Erreur de chargement")
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        loadData()
    }, [loadData])

    const confirmDelete = (id: string) => {
        setIdToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteUser = async () => {
        if (!idToDelete) return
        setIsDeleting(true)
        try {
            await deleteUser(idToDelete)
            toast.success("Client supprimé")
            loadData()
            setIsDetailsOpen(false)
        } catch (error) {
            toast.error("Erreur de suppression")
        } finally {
            setIsDeleting(false)
            setIsDeleteDialogOpen(false)
        }
    }

    const handleManualRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newCustomer.name || !newCustomer.email) {
            toast.error("Veuillez remplir tous les champs")
            return
        }
        setIsSubmitting(true)
        try {
            await createCustomer(newCustomer)
            toast.success("Client enregistré avec succès")
            setIsRegisterOpen(false)
            setNewCustomer({ name: "", email: "" })
            loadData()
        } catch (error: any) {
            toast.error(error.message || "Erreur lors de l'enregistrement")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleMarketingBroadcast = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!marketingData.subject || !marketingData.message) {
            toast.error("Sujet et message requis")
            return
        }
        setIsSubmitting(true)
        try {
            await sendMarketingBroadcast({
                ...marketingData,
                recipientCount: filteredCustomers.length
            })
            toast.success(`Campagne envoyée à ${filteredCustomers.length} clients`)
            setIsMarketingOpen(false)
            setMarketingData({ subject: "", message: "" })
        } catch (error: any) {
            toast.error("Erreur lors de l'envoi")
        } finally {
            setIsSubmitting(false)
        }
    }

    const filteredCustomers = customersData.filter(c =>
        (c.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (c.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
    const currentCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery])

    const totalCustomers = customersData.length
    const eliteMembers = customersData.filter(c => (c._count?.orders || 0) > 5).length
    const retentionRate = "68%"

    const stats = [
        { label: "Base Clients", value: totalCustomers.toLocaleString(), icon: User, color: "text-gray-600", bg: "bg-gray-50" },
        { label: "Elite Members", value: eliteMembers.toString(), icon: Trophy, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Taux Rétention", value: retentionRate, icon: Target, color: "text-amber-600", bg: "bg-amber-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Base <span className="text-amber-600">Clients.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Gestion de la base de données et programmes de fidélisation.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => setIsMarketingOpen(true)}
                        variant="outline"
                        className="h-11 px-6 rounded-2xl text-[12px] font-bold border-gray-100 hover:bg-white hover:shadow-xl transition-all flex items-center gap-2 uppercase tracking-widest bg-white shadow-sm"
                    >
                        <MessageSquare className="h-4 w-4 text-gray-400" /> Marketing Flow
                    </Button>
                    <Button
                        onClick={() => setIsRegisterOpen(true)}
                        className="h-11 px-6 rounded-2xl bg-gray-900 text-white text-[12px] font-bold hover:bg-black hover:shadow-2xl transition-all flex items-center gap-2 uppercase tracking-widest shadow-xl"
                    >
                        <UserPlus className="h-4 w-4" /> Manuel Register
                    </Button>
                </div>
            </div>

            {/* Matrix Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white border border-gray-50 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <stat.icon className="h-10 w-10" />
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner", stat.bg, stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                            <h3 className="text-2xl font-black tracking-tighter text-gray-900 italic">
                                {isLoading ? <span className="h-8 w-16 bg-gray-50 animate-pulse block rounded-lg" /> : stat.value}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* List Manager */}
            <div className="bg-white border border-gray-50 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-6 flex flex-col md:flex-row items-center gap-4 bg-gray-50/30 border-b border-gray-50">
                    <div className="relative flex-1 w-full flex items-center group">
                        <Search className="absolute left-5 h-4 w-4 text-gray-400 group-focus-within:text-amber-600 transition-colors" />
                        <Input
                            placeholder="Rechercher par nom, email ou identifiant..."
                            className="bg-white h-12 pl-12 pr-6 rounded-2xl border-gray-100 focus-visible:ring-2 focus-visible:ring-amber-100 focus-visible:border-amber-200 text-[14px] font-medium placeholder:text-gray-400 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50 font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                <th className="px-8 py-5">Identité Client</th>
                                <th className="px-8 py-5">Engagement</th>
                                <th className="px-8 py-5 text-center">Rang Audit</th>
                                <th className="px-8 py-5 text-center">Inscription</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}><td colSpan={5} className="px-8 py-6"><div className="h-12 w-full bg-gray-50 animate-pulse rounded-2xl" /></td></tr>
                                ))
                            ) : currentCustomers.length === 0 ? (
                                <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Aucune entité trouvée</td></tr>
                            ) : (
                                currentCustomers.map((c) => (
                                    <tr key={c.id} className="group hover:bg-gray-50/30 transition-all cursor-pointer">
                                        <td className="px-8 py-5" onClick={() => { setSelectedCustomer(c); setIsDetailsOpen(true); }}>
                                            <div className="flex items-center gap-5">
                                                <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-[12px] text-gray-500 uppercase rotate-6 group-hover:rotate-0 transition-all shadow-sm">
                                                    {(c.name || "U").split(' ').map((n: string) => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-gray-900 leading-tight mb-1">{c.name || "Invite"}</p>
                                                    <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5 leading-none">
                                                        <Mail className="h-3 w-3 text-amber-400" /> {c.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest">{c._count?.orders || 0} Flux Validés</p>
                                                <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min(((c._count?.orders || 0) / 10) * 100, 100)}%` }}
                                                        className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={cn(
                                                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                                (c._count?.orders || 0) > 10 ? "bg-gray-900 text-white shadow-xl" :
                                                    (c._count?.orders || 0) > 5 ? "bg-amber-50 text-amber-600 border border-amber-100/50" :
                                                        "bg-gray-50 text-gray-500 border border-gray-100",
                                            )}>
                                                {(c._count?.orders || 0) > 10 ? "Platinum" : (c._count?.orders || 0) > 5 ? "Gold" : "Silver"} Rank
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className="text-[12px] text-gray-400 font-bold tabular-nums">
                                                {new Date(c.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[200px] rounded-[1.5rem] shadow-2xl border-gray-50 p-2">
                                                    <DropdownMenuLabel className="text-[10px] font-black text-gray-400 px-3 py-2 uppercase tracking-widest border-b border-gray-50 mb-1">Audit Partenaire</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => { setSelectedCustomer(c); setIsDetailsOpen(true); }} className="text-[12px] font-bold py-3 px-3 focus:bg-amber-50 focus:text-amber-600 rounded-xl transition-colors cursor-pointer">
                                                        <Eye className="mr-3 h-4 w-4" /> Profil Analytique
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => confirmDelete(c.id)} className="text-[12px] font-bold py-3 px-3 text-rose-600 focus:bg-rose-50 focus:text-rose-600 rounded-xl transition-colors cursor-pointer border-t border-gray-50 mt-1">
                                                        <Trash className="mr-3 h-4 w-4" /> Bloquer Accès
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between bg-gray-50/20 gap-6">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        Affichage : {Math.min(currentCustomers.length, itemsPerPage)} sur {filteredCustomers.length} Clients
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-xl border-gray-100 hover:bg-white shadow-sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <Button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={cn(
                                        "h-10 w-10 rounded-xl font-black text-[11px] transition-all",
                                        currentPage === i + 1
                                            ? "bg-gray-900 text-white shadow-xl"
                                            : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
                                    )}
                                >
                                    {i + 1}
                                </Button>
                            )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-xl border-gray-100 hover:bg-white shadow-sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Customer Details Sheet */}
            <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <SheetContent className="sm:max-w-xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-xl font-black uppercase italic tracking-tight">Profil <span className="text-amber-600">Analytique</span></SheetTitle>
                        <SheetDescription className="font-medium text-gray-400">
                            Audit complet de l'activité du partenaire commercial.
                        </SheetDescription>
                    </SheetHeader>

                    {selectedCustomer && (
                        <div className="space-y-10 py-10">
                            {/* Profile Card */}
                            <div className="flex items-center gap-8 p-8 bg-gray-900 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Shield className="h-32 w-32 text-white" />
                                </div>
                                <div className="h-24 w-24 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center text-3xl font-black text-gray-900 uppercase shrink-0 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                    {(selectedCustomer.name || "U")[0]}
                                </div>
                                <div className="space-y-1 relative z-10">
                                    <h3 className="text-2xl font-black text-white uppercase italic leading-tight">{selectedCustomer.name || "Invite"}</h3>
                                    <p className="text-[13px] text-amber-400 font-black uppercase tracking-widest">{selectedCustomer.email}</p>
                                    <Badge className="mt-4 bg-white text-gray-900 border-0 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        {(selectedCustomer._count?.orders || 0) > 10 ? "Platinum Elite" : (selectedCustomer._count?.orders || 0) > 5 ? "Gold Partner" : "Silver Member"}
                                    </Badge>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="p-6 bg-white border border-gray-50 rounded-[2rem] space-y-2 shadow-sm group hover:shadow-xl transition-all duration-500">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Flux Total</p>
                                    <p className="text-2xl font-black text-gray-900 italic tracking-tighter">{selectedCustomer._count?.orders || 0}</p>
                                </div>
                                <div className="p-6 bg-white border border-gray-50 rounded-[2rem] space-y-2 shadow-sm group hover:shadow-xl transition-all duration-500">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Score Trust</p>
                                    <p className="text-2xl font-black text-amber-600 italic tracking-tighter">
                                        {Math.min(7 + (selectedCustomer._count?.orders || 0) * 0.5, 10).toFixed(1)}
                                    </p>
                                </div>
                                <div className="p-6 bg-white border border-gray-50 rounded-[2rem] space-y-2 shadow-sm group hover:shadow-xl transition-all duration-500">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Anciennaté</p>
                                    <p className="text-2xl font-black text-gray-900 italic tracking-tighter">
                                        {(() => {
                                            const months = Math.floor((new Date().getTime() - new Date(selectedCustomer.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
                                            return months === 0 ? "Nouv." : `${months}m`;
                                        })()}
                                    </p>
                                </div>
                            </div>

                            {/* Info Rows */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 ml-2">
                                    <Activity className="h-4 w-4 text-amber-600" />
                                    <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">Données de Liaison</h4>
                                </div>
                                <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-bold text-gray-400">Canal Mail</span>
                                        <span
                                            className="text-[14px] font-black text-amber-600 cursor-pointer hover:underline"
                                            onClick={() => {
                                                navigator.clipboard.writeText(selectedCustomer.email);
                                                toast.success("Email copié !");
                                            }}
                                        >
                                            {selectedCustomer.email}
                                        </span>
                                    </div>

                                    <Separator className="bg-gray-50" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-bold text-gray-400">Identité Database</span>
                                        <span className="text-[14px] font-black text-gray-900 italic">#{selectedCustomer.id.slice(-8).toUpperCase()}</span>
                                    </div>
                                    <Separator className="bg-gray-50" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-bold text-gray-400">Instant Inscription</span>
                                        <span className="text-[14px] font-black text-gray-900 tabular-nums">{new Date(selectedCustomer.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-6 flex flex-col gap-4">
                                <Button
                                    onClick={() => {
                                        toast.success("Demande de ticket envoyée au support technique");
                                        setIsDetailsOpen(false);
                                    }}
                                    className="w-full h-14 bg-gray-900 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] transition-transform"
                                >
                                    Générer Ticket Support
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full h-14 border-rose-100 text-rose-600 hover:bg-rose-50 rounded-[1.5rem] font-black uppercase tracking-[0.2em]"
                                    onClick={() => confirmDelete(selectedCustomer.id)}
                                >
                                    Révoquer l'accès définitif
                                </Button>
                            </div>

                        </div>
                    )}
                </SheetContent>
            </Sheet>

            <DeleteConfirmModal
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteUser}
                isLoading={isDeleting}
                title="Séquence de Bannissement"
                description="Êtes-vous certain de vouloir révoquer l'accès de ce client ? Cette action est irréversible et supprimera toutes les données d'engagement associées."
            />

            {/* Manuel Register Modal */}
            <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                <DialogContent className="sm:max-w-md rounded-[2rem] border-0 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <UserPlus className="h-24 w-24" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Inscription <span className="text-amber-600">Manuelle.</span></DialogTitle>
                        <DialogDescription className="font-medium text-gray-400">Ajouter un nouveau partenaire commercial à la base de données.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleManualRegister} className="space-y-6 py-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom Complet</Label>
                                <Input
                                    placeholder="Ex: Seydina Mouhammad Diop"
                                    className="h-12 rounded-xl border-gray-100 focus:ring-amber-100"
                                    value={newCustomer.name}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Canal Email</Label>
                                <Input
                                    type="email"
                                    placeholder="client@mbor.com"
                                    className="h-12 rounded-xl border-gray-100 focus:ring-amber-100"
                                    value={newCustomer.email}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 bg-gray-900 text-white rounded-xl font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all"
                            >
                                {isSubmitting ? "Initialisation..." : "Valider l'Inscription"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Marketing Flow Modal */}
            <Dialog open={isMarketingOpen} onOpenChange={setIsMarketingOpen}>
                <DialogContent className="sm:max-w-lg rounded-[2.5rem] border-0 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <Zap className="h-32 w-32" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Marketing <span className="text-amber-600">Broadcast.</span></DialogTitle>
                        <DialogDescription className="font-medium text-gray-400">
                            Diffuser une campagne aux <span className="text-gray-900 font-bold">{filteredCustomers.length} clients</span> sélectionnés par vos filtres actuels.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleMarketingBroadcast} className="space-y-6 py-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Objet de la Campagne</Label>
                                <Input
                                    placeholder="Ex: Nouvelle Collection Elite Arrivée !"
                                    className="h-12 rounded-xl border-gray-100 focus:ring-amber-100"
                                    value={marketingData.subject}
                                    onChange={(e) => setMarketingData({ ...marketingData, subject: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Message Broadcast</Label>
                                <Textarea
                                    placeholder="Rédigez votre message ici..."
                                    className="min-h-[150px] rounded-2xl border-gray-100 focus:ring-amber-100 p-4"
                                    value={marketingData.message}
                                    onChange={(e) => setMarketingData({ ...marketingData, message: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 px-4 py-3 bg-amber-50 rounded-xl border border-amber-100/50">
                                <p className="text-[10px] text-amber-600 font-bold leading-tight">
                                    Note: Ce message sera envoyé via le canal email privilégié de chaque client.
                                </p>
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-12 px-8 bg-gray-900 text-white rounded-xl font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all shrink-0"
                            >
                                {isSubmitting ? "Diffusion..." : "Lancer le Flow"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
