"use client"

import * as React from "react"
import { createPortal } from "react-dom"
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
import { getAdminOrder, updateOrderStatus, getStoreConfig } from "../../actions"
import { Receipt } from "@/components/admin/receipt"

export default function OrderDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const orderId = params.id as string
    const [order, setOrder] = React.useState<any>(null)
    const [config, setConfig] = React.useState<any>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [isUpdating, setIsUpdating] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    const loadData = React.useCallback(async () => {
        try {
            const [orderData, configData] = await Promise.all([
                getAdminOrder(orderId),
                getStoreConfig()
            ])

            if (!orderData) {
                toast.error("Commande non trouvée")
                router.push("/admin/orders")
                return
            }
            setOrder(orderData)
            setConfig(configData)
        } catch (error) {
            console.error("Failed to load data:", error)
            toast.error("Erreur de chargement")
        } finally {
            setIsLoading(false)
        }
    }, [orderId, router])

    React.useEffect(() => {
        loadData()
        setMounted(true)
    }, [loadData])

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdating(true)
        try {
            await updateOrderStatus(orderId, newStatus)
            toast.success(`Statut mis à jour : ${newStatus}`)
            loadData()
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
            {/* Hidden Receipt for Printing - Portaled */}
            {mounted && createPortal(
                <div id="thermal-receipt" className="receipt-print-only">
                    <Receipt order={order} config={config} />
                </div>,
                document.body
            )}

            {/* Top Navigation & Status Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-3">
                    <Link href="/admin/orders" className="flex items-center text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors group">
                        <ArrowLeft className="mr-2 h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" /> Retour à la liste
                    </Link>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Commande <span className="text-gray-400 font-normal ml-1">#{order.id.slice(-8).toUpperCase()}</span>
                        </h1>
                        <Badge variant="outline" className={cn("text-[11px] font-bold px-3 py-1 rounded-lg", statusColors[order.status])}>
                            {order.status}
                        </Badge>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-lg border-gray-200 text-gray-400 hover:text-gray-900"
                        onClick={() => window.print()}
                    >
                        <Printer className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="h-9 px-4 rounded-xl bg-gray-900 text-white text-[13px] font-semibold hover:bg-black transition-all flex items-center gap-2" disabled={isUpdating}>
                                {isUpdating ? <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Truck className="h-3.5 w-3.5" />}
                                Statut
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

            {/* Global Print Styles */}
            <style jsx global>{`
                @media print {
                    body > *:not(#thermal-receipt) {
                        display: none !important;
                    }
                    #thermal-receipt {
                        display: block !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 80mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        visibility: visible !important;
                    }
                    #thermal-receipt * {
                        visibility: visible !important;
                    }
                    @page {
                        size: 80mm auto;
                        margin: 0;
                    }
                    html, body {
                        background: white !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                }
                .receipt-print-only {
                    display: none;
                }
            `}</style>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Items & Timeline */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Items Card */}
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                            <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-gray-400" />
                                <h3 className="text-[15px] font-bold text-gray-900">Articles commandés</h3>
                            </div>
                            <span className="text-[12px] text-gray-400 font-semibold">{order.items.length} Article(s)</span>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {order.items.map((item: any, i: number) => (
                                <div key={i} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6">
                                    <div className="h-24 w-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 relative group">
                                        <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <div className="space-y-0.5">
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{item.product.category?.name || "Sport"}</p>
                                            <h4 className="text-[15px] font-bold text-gray-900">{item.product.name}</h4>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-bold text-gray-500">
                                                Qté: <span className="text-gray-900 ml-1">{item.quantity}</span>
                                            </span>
                                            {(item.customName || item.customNumber) && (
                                                <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-100 text-[11px] font-bold text-amber-700 flex items-center gap-1.5">
                                                    <Zap className="h-3 w-3" /> Flocage: {item.customName} {item.customNumber ? `#${item.customNumber}` : ""}
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
                                        Commande validée par le système.
                                        {order.deliveryType === 'PICKUP' && <span className="block mt-1 font-bold text-indigo-700">⚠️ RETRAIT EN BOUTIQUE</span>}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3 w-full sm:w-64 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                                <div className="flex justify-between items-center text-[13px] font-semibold">
                                    <span className="text-gray-400 uppercase tracking-wider text-[10px] font-bold">Total Brut</span>
                                    {/* Calculated subtotal */}
                                    <span className="text-gray-900 tabular-nums">
                                        {order.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0).toLocaleString()} F
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[13px] font-medium">
                                    <span className="text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                                        Livraison {order.deliveryType === 'PICKUP' ? '(Retrait)' : ''}
                                    </span>
                                    {/* Check strictly for 0 or null, otherwise show fee */}
                                    <span className={cn("tabular-nums font-bold", (order.deliveryFee && order.deliveryFee > 0) ? "text-gray-900" : "text-emerald-600")}>
                                        {(order.deliveryFee && order.deliveryFee > 0) ? `${order.deliveryFee.toLocaleString()} F` : "OFFERT"}
                                    </span>
                                </div>
                                <div className="h-px w-full bg-gray-200" />
                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Total Net</span>
                                    <span className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight">{order.total.toLocaleString()} F</span>
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
                                <div className={cn(
                                    "absolute -left-[23px] top-1.5 h-3 w-3 rounded-full border-2 border-white z-10",
                                    ["PENDING", "PAID", "SHIPPED", "DELIVERED"].includes(order.status)
                                        ? "bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
                                        : "bg-gray-200"
                                )} />
                                <div className="space-y-1 text-left">
                                    <div className="flex items-center gap-3">
                                        <h4 className={cn("text-[13px] font-bold", ["PENDING", "PAID", "SHIPPED", "DELIVERED"].includes(order.status) ? "text-gray-900" : "text-gray-400")}>Commande Confirmée</h4>
                                        <span className="text-[11px] text-gray-400 font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-[12px] text-gray-500 font-medium">La commande a été enregistrée avec succès.</p>
                                </div>
                            </div>

                            <div className={cn("relative transition-opacity", ["SHIPPED", "DELIVERED"].includes(order.status) ? "opacity-100" : "opacity-40")}>
                                <div className={cn(
                                    "absolute -left-[23px] top-1.5 h-3 w-3 rounded-full border-2 border-white z-10",
                                    ["SHIPPED", "DELIVERED"].includes(order.status)
                                        ? "bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                                        : "bg-gray-200"
                                )} />
                                <div className="space-y-1 text-left">
                                    <div className="flex items-center gap-3">
                                        <h4 className={cn("text-[13px] font-bold", ["SHIPPED", "DELIVERED"].includes(order.status) ? "text-gray-900" : "text-gray-400")}>Expédition en cours</h4>
                                        {["SHIPPED", "DELIVERED"].includes(order.status) && <span className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">En Transit</span>}
                                    </div>
                                    <p className="text-[12px] text-gray-500 font-medium">Le colis est en route vers le client.</p>
                                </div>
                            </div>

                            <div className={cn("relative transition-opacity", order.status === "DELIVERED" ? "opacity-100" : "opacity-40")}>
                                <div className={cn(
                                    "absolute -left-[23px] top-1.5 h-3 w-3 rounded-full border-2 border-white z-10",
                                    order.status === "DELIVERED"
                                        ? "bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                                        : "bg-gray-200"
                                )} />
                                <div className="space-y-1 text-left">
                                    <div className="flex items-center gap-3">
                                        <h4 className={cn("text-[13px] font-bold", order.status === "DELIVERED" ? "text-gray-900" : "text-gray-400")}>Livraison Effectuée</h4>
                                        {order.status === "DELIVERED" && <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">Terminé</span>}
                                    </div>
                                    <p className="text-[12px] text-gray-500 font-medium">Le client a réceptionné sa commande.</p>
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
                            <div className="h-16 w-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold border border-amber-100 shadow-sm">
                                {(order.user?.name || order.customerName || "G").split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-center gap-2">
                                    <h4 className="text-lg font-bold text-gray-900 tracking-tight">{order.user?.name || order.customerName || "Invité"}</h4>
                                    {order.user && <Badge className="bg-emerald-50 text-emerald-600 border-none text-[9px] font-bold uppercase tracking-wider">Membre</Badge>}
                                </div>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Client depuis {new Date(order.user?.createdAt || order.createdAt).getFullYear()}</p>
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

                            <div className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-amber-600 group-hover:bg-amber-50 transition-all border border-transparent group-hover:border-amber-100">
                                    <Phone className="h-4.5 w-4.5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Téléphone</p>
                                    <p className="text-[13px] font-bold text-gray-900 font-mono tracking-tight">{order.customerPhone || order.user?.phone || "Non renseigné"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all border border-transparent group-hover:border-indigo-100 mt-0.5">
                                    <MapPin className="h-4.5 w-4.5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Adresse de Livraison</p>
                                    <p className="text-[12px] font-semibold text-gray-900 leading-relaxed">
                                        {order.deliveryType === 'PICKUP' ?
                                            <span className="text-indigo-600">Retrait en Boutique</span> :
                                            (order.customerAddress || order.user?.address || "Adresse non fournie")
                                        }
                                    </p>
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
                                <Badge className={cn(
                                    "border-none text-[9px] font-black tracking-widest",
                                    order.status === "PAID" ? "bg-emerald-500 text-white" : "bg-white/10 text-white/60"
                                )}>
                                    {order.status === "PAID" ? "PAYÉ" : "EN ATTENTE"}
                                </Badge>
                            </div>

                            <div className="h-px w-full bg-white/10" />

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Référence Flux</p>
                                    <p className="text-[11px] font-mono font-medium text-emerald-400 uppercase">{orderId.slice(-12)}</p>
                                </div>
                                {order.status === "PAID" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full h-12 rounded-xl bg-[#25D366] text-white hover:bg-[#128C7E] font-bold uppercase tracking-widest shadow-lg shadow-[#25D366]/10 transition-all active:scale-95"
                        onClick={() => {
                            const url = `${window.location.origin}/receipt/${order.id}`;
                            const message = `*MBOR B. STORE - REÇU DE COMMANDE*\n\nBonjour ${order.customerName || order.user?.name || "Cher client"},\nVotre commande #${order.id.slice(-6).toUpperCase()} est validée.\n\nConsultez votre reçu digital ici :\n🔗 ${url}\n\nL'excellence du sport au Sénégal.`;
                            // Use customerPhone if available, cleanly formatted
                            const phone = order.customerPhone || "";
                            const cleanPhone = phone.replace(/\s+/g, '').replace('+', '');

                            // If no phone, just open whatsapp with text ready
                            const waUrl = cleanPhone
                                ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
                                : `https://wa.me/?text=${encodeURIComponent(message)}`;

                            window.open(waUrl, '_blank');
                        }}
                    >
                        <svg viewBox="0 0 24 24" className="mr-3 h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        Envoyer Reçu WhatsApp
                    </Button>
                </div>
            </div>
        </div>
    )
}
