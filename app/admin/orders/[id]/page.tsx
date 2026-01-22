"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
    ArrowLeft,
    Download,
    Printer,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
    User,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Package,
    Shirt,
    Star,
    Zap,
    History,
    MoreVertical,
    ChevronRight,
    Search,
    AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAdminOrder, updateOrderStatus } from "../../actions"

export default function OrderDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const orderId = params.id as string
    const [order, setOrder] = React.useState<any>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [isUpdating, setIsUpdating] = React.useState(false)

    const loadOrder = React.useCallback(async () => {
        try {
            const data = await getAdminOrder(orderId)
            if (!data) {
                toast.error("Commande non trouvée")
                router.push("/admin/orders")
                return
            }
            setOrder(data)
        } catch (error) {
            console.error("Failed to load order:", error)
            toast.error("Erreur de chargement")
        } finally {
            setIsLoading(false)
        }
    }, [orderId, router])

    React.useEffect(() => {
        loadOrder()
    }, [loadOrder])

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdating(true)
        try {
            await updateOrderStatus(orderId, newStatus)
            toast.success(`Statut mis à jour : ${newStatus}`)
            loadOrder()
        } catch (error) {
            toast.error("Erreur lors de la mise à jour")
        } finally {
            setIsUpdating(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="h-12 w-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500 font-medium">Chargement des détails de la commande...</p>
            </div>
        )
    }

    if (!order) return null

    const statusColors: Record<string, string> = {
        "PAID": "text-emerald-600 bg-emerald-50 border-emerald-100",
        "PENDING": "text-amber-600 bg-amber-50 border-amber-100",
        "SHIPPED": "text-blue-600 bg-blue-50 border-blue-100",
        "DELIVERED": "text-emerald-600 bg-emerald-100 border-emerald-200",
        "CANCELLED": "text-rose-600 bg-rose-50 border-rose-100",
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Top Navigation & Status Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-3">
                    <Link href="/admin/orders" className="flex items-center text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors group">
                        <ArrowLeft className="mr-2 h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" /> Retour à la liste
                    </Link>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                            Détails Commande <span className="text-gray-400 font-normal ml-1">#{order.id.slice(-8).toUpperCase()}</span>
                        </h1>
                        <Badge variant="outline" className={cn("text-[11px] font-bold px-3 py-1", statusColors[order.status])}>
                            {order.status}
                        </Badge>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-gray-200 text-gray-400 hover:text-gray-900">
                        <Printer className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="h-9 px-4 rounded-lg bg-gray-900 text-white text-[13px] font-medium hover:bg-gray-800 transition-all flex items-center gap-2" disabled={isUpdating}>
                                {isUpdating ? <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Truck className="h-3.5 w-3.5" />}
                                Changer le Statut
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-2xl border-gray-100">
                            <DropdownMenuItem className="text-[13px] py-2.5 px-3" onClick={() => handleStatusChange("PENDING")}>Marquer En attente</DropdownMenuItem>
                            <DropdownMenuItem className="text-[13px] py-2.5 px-3" onClick={() => handleStatusChange("SHIPPED")}>Marquer comme Expédiée</DropdownMenuItem>
                            <DropdownMenuItem className="text-[13px] py-2.5 px-3" onClick={() => handleStatusChange("DELIVERED")}>Marquer comme Livrée</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-[13px] py-2.5 px-3 text-rose-600 focus:text-rose-600 focus:bg-rose-50" onClick={() => handleStatusChange("CANCELLED")}>Annuler la commande</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Items & Timeline */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Items Card */}
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                            <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-gray-400" />
                                <h3 className="text-sm font-semibold text-gray-900">Articles de la commande</h3>
                            </div>
                            <span className="text-[12px] text-gray-400 font-medium">{order.items.length} Article(s)</span>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {order.items.map((item: any, i: number) => (
                                <div key={i} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6">
                                    <div className="h-24 w-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 relative group">
                                        <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <div className="space-y-0.5">
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">{item.product.category?.name || "Sport"}</p>
                                            <h4 className="text-base font-semibold text-gray-900">{item.product.name}</h4>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-semibold text-gray-500">
                                                Quantité: <span className="text-gray-900 ml-1">{item.quantity}</span>
                                            </span>
                                            {(item.customName || item.customNumber) && (
                                                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] font-semibold text-indigo-600 flex items-center gap-2">
                                                    <Zap className="h-3 w-3" /> Personnalisation: {item.customName} {item.customNumber ? `#${item.customNumber}` : ""}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="sm:text-right space-y-1">
                                        <p className="text-lg font-bold text-gray-900 tabular-nums">{item.price.toLocaleString()} F</p>
                                        <p className="text-[11px] text-gray-400 font-medium">Prix unitaire</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start gap-8">
                            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl flex items-start gap-3 max-w-sm">
                                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <h4 className="text-[12px] font-bold text-amber-900">Note Interne</h4>
                                    <p className="text-[11px] text-amber-800/80 leading-relaxed font-medium">
                                        Commande validée par le système. Vérifier la disponibilité du flocage avant expédition.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3 w-full sm:w-64 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                                <div className="flex justify-between items-center text-[13px] font-medium">
                                    <span className="text-gray-400 uppercase tracking-wider text-[10px] font-bold">Total Brut</span>
                                    <span className="text-gray-900 tabular-nums">{order.total.toLocaleString()} F</span>
                                </div>
                                <div className="flex justify-between items-center text-[13px] font-medium">
                                    <span className="text-gray-400 uppercase tracking-wider text-[10px] font-bold">Livraison</span>
                                    <span className="text-emerald-600 tabular-nums">OFFERT</span>
                                </div>
                                <div className="h-px w-full bg-gray-200" />
                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Total Net</span>
                                    <span className="text-2xl font-black text-gray-900 tabular-nums tracking-tighter">{order.total.toLocaleString()} F</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 border-b border-gray-50 pb-4">
                            <History className="h-4 w-4 text-gray-400" />
                            <h3 className="text-sm font-semibold text-gray-900">Cycle de Vie</h3>
                        </div>

                        <div className="relative space-y-8 pl-8">
                            <div className="absolute left-[13px] top-2 bottom-2 w-px bg-gray-100" />

                            <div className="relative">
                                <div className="absolute -left-[23px] top-1.5 h-3 w-3 rounded-full border-2 border-white z-10 bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]" />
                                <div className="space-y-1 text-left">
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-[13px] font-bold text-gray-900">Commande Confirmée</h4>
                                        <span className="text-[11px] text-gray-400 font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-[12px] text-gray-500 font-medium">La commande a été enregistrée avec succès.</p>
                                </div>
                            </div>

                            <div className="relative opacity-50">
                                <div className="absolute -left-[23px] top-1.5 h-3 w-3 rounded-full border-2 border-white z-10 bg-gray-200" />
                                <div className="space-y-1 text-left">
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-[13px] font-bold text-gray-900">En cours d'expédition</h4>
                                        <span className="text-[11px] text-gray-400 font-medium italic">En attente...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer & Payment */}
                <div className="lg:col-span-4 space-y-8 text-left">
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-8">
                        <div className="flex items-center gap-2 border-b border-gray-50 pb-4">
                            <User className="h-4 w-4 text-gray-400" />
                            <h3 className="text-sm font-semibold text-gray-900">Information Client</h3>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="h-20 w-20 rounded-[2rem] bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl font-black border-4 border-white shadow-xl rotate-3 scale-110">
                                {(order.user?.name || order.customerName || "G").split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-center gap-2">
                                    <h4 className="text-lg font-bold text-gray-900 tracking-tight">{order.user?.name || order.customerName || "Invité"}</h4>
                                    {order.user && <Badge className="bg-emerald-50 text-emerald-600 border-none text-[9px] font-black uppercase tracking-widest">Membre</Badge>}
                                </div>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Client depuis {new Date(order.user?.createdAt || order.createdAt).getFullYear()}</p>
                            </div>
                        </div>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all border border-transparent group-hover:border-indigo-100">
                                    <Mail className="h-4.5 w-4.5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail</p>
                                    <p className="text-[13px] font-semibold text-gray-900 break-all">{order.user?.email || order.customerEmail || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all border border-transparent group-hover:border-indigo-100 mt-0.5">
                                    <MapPin className="h-4.5 w-4.5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Adresse de Livraison</p>
                                    <p className="text-[13px] font-semibold text-gray-900 leading-relaxed italic">Information confidentielle non stockée ou accessible via passerelle.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl space-y-6 border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CreditCard className="h-16 w-16 text-white" />
                        </div>

                        <div className="flex items-center gap-2 border-b border-white/10 pb-4 relative z-10">
                            <Zap className="h-4 w-4 text-emerald-400" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Paiement Sécurisé</h3>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-5 relative z-10">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Méthode</p>
                                    <p className="text-sm font-bold text-white">Wave / Orange Money</p>
                                </div>
                                <Badge className="bg-emerald-500 text-white border-none text-[9px] font-black tracking-widest">TRANSFERT OK</Badge>
                            </div>

                            <div className="h-px w-full bg-white/10" />

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Référence Flux</p>
                                    <p className="text-[11px] font-mono font-medium text-emerald-400 uppercase">{orderId.slice(-12)}</p>
                                </div>
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            </div>
                        </div>

                        <Button className="w-full h-11 bg-white text-gray-900 hover:bg-gray-100 font-bold text-[11px] uppercase tracking-widest rounded-xl">
                            Éditer la facture
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
