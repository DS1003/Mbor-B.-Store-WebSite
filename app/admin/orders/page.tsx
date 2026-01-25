"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    Truck,
    XCircle,
    Eye,
    Download,
    Calendar,
    ArrowUpDown,
    Printer,
    ChevronLeft,
    ChevronRight,
    Star,
    Shirt,
    User,
    Hash,
    MapPin,
    Activity,
    CreditCard,
    Zap,
    Box,
    ArrowRight,
    Trash,
    ShoppingBag,
    Minus,
    Store,
    MessageCircle
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { getAdminOrders, updateOrderStatus, deleteOrder } from "../actions"
import { toast } from "sonner"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal"
import { getStoreConfig } from "../actions"
import { Receipt } from "@/components/admin/receipt"

export default function AdminOrdersPage() {
    const router = useRouter()
    const [ordersData, setOrdersData] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [selectedOrder, setSelectedOrder] = React.useState<any>(null)
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState("all")
    const [dateFilter, setDateFilter] = React.useState("all")
    const [mounted, setMounted] = React.useState(false)

    // Delete state
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [idToDelete, setIdToDelete] = React.useState<string | null>(null)
    const [isDeleting, setIsDeleting] = React.useState(false)

    // Pagination state
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 10

    const [config, setConfig] = React.useState<any>(null)
    const [printOrder, setPrintOrder] = React.useState<any>(null)

    const loadOrders = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const [oData, cData] = await Promise.all([
                getAdminOrders(),
                getStoreConfig()
            ])
            setOrdersData(oData)
            setConfig(cData)
        } catch (error) {
            console.error("Failed to load orders:", error)
            toast.error("Erreur de chargement")
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        loadOrders()
        setMounted(true)
    }, [loadOrders])

    const handleStatusUpdate = async (orderId: string, status: string) => {
        try {
            await updateOrderStatus(orderId, status)
            toast.success(`Statut synchronisé : ${status}`)
            loadOrders()
            if (selectedOrder?.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status })
            }
        } catch (error) {
            toast.error("Erreur de synchronisation")
        }
    }

    const confirmDelete = (id: string) => {
        setIdToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteOrder = async () => {
        if (!idToDelete) return
        setIsDeleting(true)
        try {
            await deleteOrder(idToDelete)
            toast.success("Transaction révoquée")
            loadOrders()
        } catch (error) {
            toast.error("Erreur réseau")
        } finally {
            setIsDeleting(false)
            setIsDeleteDialogOpen(false)
        }
    }

    const filteredOrders = ordersData.filter(o => {
        const matchesSearch = (o.id.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (o.user?.name?.toLowerCase() || o.customerName?.toLowerCase() || "").includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || o.status === statusFilter

        let matchesDate = true
        if (dateFilter !== "all") {
            const orderDate = new Date(o.createdAt)
            const now = new Date()
            if (dateFilter === "today") {
                matchesDate = orderDate.toDateString() === now.toDateString()
            } else if (dateFilter === "week") {
                const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7))
                matchesDate = orderDate >= sevenDaysAgo
            } else if (dateFilter === "month") {
                const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))
                matchesDate = orderDate >= thirtyDaysAgo
            }
        }

        return matchesSearch && matchesStatus && matchesDate
    })

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
    const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, statusFilter, dateFilter])

    const stats = [
        { label: "En Attente", value: ordersData.filter(o => o.status === "PENDING").length.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Flux Payés", value: ordersData.filter(o => o.status === "PAID").length.toString(), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Logistique", value: ordersData.filter(o => o.status === "SHIPPED").length.toString(), icon: Truck, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Volume Total", value: ordersData.length.toString(), icon: Activity, color: "text-gray-600", bg: "bg-gray-50" },
    ]

    return (
        <div className="admin-orders-page-root space-y-10 pb-10">
            {/* Hidden Receipt for Printing (Thermal Style) - Portaled to Body */}
            {mounted && createPortal(
                <div id="thermal-receipt" className="receipt-print-only">
                    <Receipt order={printOrder || selectedOrder} config={config} />
                </div>,
                document.body
            )}

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Suivi des <span className="text-amber-600">Commandes.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Gestion logistique et suivi en temps réel des transactions.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/admin/pos">
                        <Button
                            className="h-10 px-5 rounded-xl bg-amber-600 text-white text-[12px] font-semibold hover:bg-amber-700 transition-all flex items-center gap-2 shadow-sm"
                        >
                            <Store className="h-4 w-4" /> Vente Boutique (POS)
                        </Button>
                    </Link>
                    <Button variant="outline" className="h-10 px-5 rounded-xl text-[12px] font-semibold border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2 bg-white shadow-sm">
                        <Download className="h-4 w-4 text-gray-400" /> Exporter
                    </Button>
                </div>
            </div>

            {/* Matrix Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        <div className="flex items-center justify-between mb-5">
                            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
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
                        <Search className="absolute left-5 h-4 w-4 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                        <Input
                            placeholder="Rechercher une commande, client..."
                            className="bg-white h-11 pl-12 pr-6 rounded-xl border-gray-100 focus-visible:ring-2 focus-visible:ring-amber-50 focus-visible:border-amber-200 text-[14px] font-medium placeholder:text-gray-400 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-12 px-5 rounded-2xl border-gray-100 bg-white text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-gray-400" />
                                    {statusFilter === "all" ? "Tous les statuts" : statusFilter === "PENDING" ? "En attente" : statusFilter === "PAID" ? "Payé" : statusFilter === "SHIPPED" ? "Expédié" : statusFilter === "DELIVERED" ? "Livré" : statusFilter === "CANCELLED" ? "Annulé" : "Inconnu"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-gray-100 shadow-2xl">
                                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-3 py-2">Filtrer par statut</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => setStatusFilter("all")} className="rounded-xl px-3 py-2 text-[13px] font-medium transition-all focus:bg-amber-50 focus:text-amber-600">Tous les statuts</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("PENDING")} className="rounded-xl px-3 py-2 text-[13px] font-medium transition-all focus:bg-amber-50 focus:text-amber-600">En attente</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("PAID")} className="rounded-xl px-3 py-2 text-[13px] font-medium transition-all focus:bg-amber-50 focus:text-amber-600">Payé</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("SHIPPED")} className="rounded-xl px-3 py-2 text-[13px] font-medium transition-all focus:bg-amber-50 focus:text-amber-600">Expédié</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("DELIVERED")} className="rounded-xl px-3 py-2 text-[13px] font-medium transition-all focus:bg-amber-50 focus:text-amber-600">Livré</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("CANCELLED")} className="rounded-xl px-3 py-2 text-[13px] font-medium transition-all focus:bg-amber-50 focus:text-amber-600 font-bold text-rose-500">Annulé</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-12 px-5 rounded-2xl border-gray-100 bg-white text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    {dateFilter === "all" ? "Toute période" : dateFilter === "today" ? "Aujourd'hui" : dateFilter === "week" ? "Cette semaine" : "Ce mois"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-gray-100 shadow-2xl">
                                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-3 py-2">Période temporelle</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => setDateFilter("all")} className="rounded-xl px-3 py-2 text-[13px] font-medium transition-all focus:bg-amber-50 focus:text-amber-600">Toute période</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter("today")} className="rounded-xl px-3 py-2 text-[13px] font-medium transition-all focus:bg-amber-50 focus:text-amber-600">Aujourd'hui</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter("week")} className="rounded-xl px-3 py-2 text-[13px] font-medium transition-all focus:bg-amber-50 focus:text-amber-600">Cette semaine</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDateFilter("month")} className="rounded-xl px-3 py-2 text-[13px] font-medium transition-all focus:bg-amber-50 focus:text-amber-600">Ce mois</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 font-bold text-[11px] text-gray-400 uppercase tracking-wider">
                                <th className="px-8 py-4">ID Commande</th>
                                <th className="px-8 py-4">Client</th>
                                <th className="px-8 py-4">Articles</th>
                                <th className="px-8 py-4">Total</th>
                                <th className="px-8 py-4 text-center">Statut</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}><td colSpan={6} className="px-8 py-6"><div className="h-12 w-full bg-gray-50 animate-pulse rounded-2xl" /></td></tr>
                                ))
                            ) : currentOrders.length === 0 ? (
                                <tr><td colSpan={6} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Aucune transaction trouvée</td></tr>
                            ) : (
                                currentOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-gray-50/30 transition-all cursor-pointer" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                                        <td className="px-8 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-[14px] font-bold text-gray-900 leading-tight">#{order.id.slice(-6).toUpperCase()}</p>
                                                <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center font-black text-[11px] text-gray-500 uppercase rotate-6 group-hover:rotate-0 transition-all shadow-sm">
                                                    {(order.user?.name || order.customerName || "G").split(' ').map((n: string) => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-bold text-gray-900 leading-tight">{order.user?.name || order.customerName || "Invité"}</p>
                                                    <p className="text-[11px] text-gray-400 font-medium">{order.user?.email || order.customerEmail || "N/A"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex -space-x-2">
                                                {order.items?.map((item: any, idx: number) => (
                                                    <div key={idx} className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm relative z-[1] hover:z-[10] hover:-translate-y-1 transition-all group/icon">
                                                        <Shirt className="h-4 w-4 text-gray-400 group-hover/icon:text-amber-600" />
                                                    </div>
                                                ))}
                                                {order.items?.length > 3 && <div className="h-8 w-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">+{order.items.length - 3}</div>}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-[15px] font-black text-gray-900 tabular-nums" suppressHydrationWarning>{Number(order.total).toLocaleString()} F</p>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                                                order.status === "PAID" ? "text-emerald-700 bg-emerald-50" :
                                                    order.status === "PENDING" ? "text-amber-700 bg-amber-50" :
                                                        order.status === "SHIPPED" ? "text-amber-700 bg-amber-50" : "text-emerald-800 bg-emerald-50",
                                            )}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[200px] rounded-[1.5rem] shadow-2xl border-gray-50 p-2">
                                                    <DropdownMenuLabel className="text-[10px] font-black text-gray-400 px-3 py-2 uppercase tracking-widest border-b border-gray-50 mb-1">Audit Flux</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/admin/orders/${order.id}`); }} className="text-[12px] font-bold py-3 px-3 focus:bg-amber-50 focus:text-amber-600 rounded-xl transition-colors cursor-pointer">
                                                        <Eye className="mr-3 h-4 w-4" /> Détails Transaction
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "PAID")} className="text-[12px] font-bold py-3 px-3 focus:bg-emerald-50 focus:text-emerald-600 rounded-xl transition-colors cursor-pointer">
                                                        <CheckCircle2 className="mr-3 h-4 w-4" /> Encaisser Paiement
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "SHIPPED")} className="text-[12px] font-bold py-3 px-3 focus:bg-amber-50 focus:text-amber-600 rounded-xl transition-colors cursor-pointer">
                                                        <Truck className="mr-3 h-4 w-4" /> Initier Livraison
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => confirmDelete(order.id)} className="text-[12px] font-bold py-3 px-3 text-rose-600 focus:bg-rose-50 focus:text-rose-600 rounded-xl transition-colors cursor-pointer border-t border-gray-50 mt-1">
                                                        <Trash className="mr-3 h-4 w-4" /> Révoquer Transfert
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
                        Affichage : {Math.min(currentOrders.length, itemsPerPage)} sur {filteredOrders.length} Transactions
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

            {/* Order Details Sheet */}
            <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <SheetContent className="sm:max-w-xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-xl font-bold tracking-tight text-gray-900">Détails de la <span className="text-amber-600">Commande</span></SheetTitle>
                        <SheetDescription className="font-medium text-gray-500">
                            ID Transaction : #{selectedOrder?.id.slice(-6).toUpperCase()}
                        </SheetDescription>
                    </SheetHeader>

                    {selectedOrder && (
                        <div id="print-area" className="space-y-10 py-10">
                            {/* Status Section (Hidden when printing receipt) */}
                            <div className="print:hidden flex items-center justify-between p-7 bg-[#1C1C1C] rounded-[2rem] relative overflow-hidden group shadow-xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Zap className="h-32 w-32 text-white" />
                                </div>
                                <div className="space-y-1 relative z-10">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Statut Logistique</p>
                                    <Badge className={cn(
                                        "px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider",
                                        selectedOrder.status === "PAID" ? "bg-emerald-500 text-white" :
                                            selectedOrder.status === "PENDING" ? "bg-amber-500 text-white" :
                                                "bg-amber-500 text-white",
                                    )}>
                                        {selectedOrder.status}
                                    </Badge>
                                </div>
                                <div className="flex flex-col gap-2 relative z-10">
                                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg h-9 px-4 font-bold text-[10px] uppercase transition-all" onClick={() => handleStatusUpdate(selectedOrder.id, "PAID")}>Marquer Payé</Button>
                                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 rounded-lg h-9 px-4 font-bold text-[10px] uppercase transition-all" onClick={() => handleStatusUpdate(selectedOrder.id, "SHIPPED")}>Expédier</Button>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 ml-2">
                                    <User className="h-4 w-4 text-amber-600" />
                                    <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">Bénéficiaire Logistique</h4>
                                </div>
                                <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-semibold text-gray-400">Client</span>
                                        <span className="text-[14px] font-bold text-gray-900">{selectedOrder.user?.name || selectedOrder.customerName || "Invite"}</span>
                                    </div>
                                    <Separator className="bg-gray-50" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-bold text-gray-400">Canal Digital</span>
                                        <span className="text-[14px] font-black text-amber-600">{selectedOrder.user?.email || selectedOrder.customerEmail || "N/A"}</span>
                                    </div>
                                    <Separator className="bg-gray-50" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-bold text-gray-400">Destination</span>
                                        <span className="text-[14px] font-black text-gray-900">Dakar, Sénégal (Point Relais)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Items Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 ml-2">
                                    <Box className="h-4 w-4 text-amber-600" />
                                    <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">Composants Flux ({selectedOrder.items?.length})</h4>
                                </div>
                                <div className="space-y-3">
                                    {selectedOrder.items?.map((item: any, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between p-5 bg-white border border-gray-50 rounded-[2rem] group hover:shadow-xl transition-all duration-500">
                                            <div className="flex items-center gap-5">
                                                <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-50 flex items-center justify-center shrink-0 rotate-2 group-hover:rotate-0 transition-transform shadow-sm">
                                                    <Shirt className="h-7 w-7 text-gray-300 group-hover:text-amber-600 transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-gray-900 leading-tight mb-0.5">{item.product?.name}</p>
                                                    <p className="text-[11px] text-gray-400 font-semibold tracking-tight" suppressHydrationWarning>
                                                        {Number(item.price).toLocaleString()} F × {item.quantity}
                                                    </p>
                                                    {(item.customName || item.customNumber) && (
                                                        <div className="mt-2 px-3 py-1 rounded-lg bg-amber-50 text-[10px] font-bold text-amber-600 border border-amber-100 uppercase tracking-widest">
                                                            Custom: {item.customName} #{item.customNumber}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-[15px] font-black text-gray-900 tabular-nums">{(item.price * item.quantity).toLocaleString()} F</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Final Balance */}
                            <div className="bg-gray-50/50 rounded-[2.5rem] p-8 space-y-4 border border-gray-50">
                                <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Valeur Brut (Articles)</span>
                                    <span className="tabular-nums" suppressHydrationWarning>{(Number(selectedOrder.total) - Number(selectedOrder.deliveryFee || 0)).toLocaleString()} F</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Logistique : {selectedOrder.deliveryType === "PICKUP" ? "Retrait" : "Dakar (+2000)"}</span>
                                    <span className={selectedOrder.deliveryType === "PICKUP" || Number(selectedOrder.deliveryFee) === 0 ? "text-emerald-500" : "text-gray-900 tabular-nums"}>
                                        {selectedOrder.deliveryType === "PICKUP" ? "GRATUIT" :
                                            (Number(selectedOrder.deliveryFee) === 0 ? "OFFERTE" : `${Number(selectedOrder.deliveryFee).toLocaleString()} F`)}
                                    </span>
                                </div>
                                <Separator className="bg-gray-100" />
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-[16px] font-black text-gray-900 uppercase italic">Total Facturé</span>
                                    <span className="text-2xl font-black text-gray-900 tabular-nums tracking-tighter shadow-indigo-100 italic" suppressHydrationWarning>{Number(selectedOrder.total).toLocaleString()} F</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-4 pb-10 sticky bottom-0 bg-white py-4 -mx-6 px-6 border-t border-gray-100/60 z-20 print:hidden">
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1 h-12 rounded-xl font-bold border-gray-100 shadow-sm"
                                        onClick={() => window.print()}
                                    >
                                        <Printer className="mr-3 h-4 w-4" /> Facture
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 h-12 rounded-xl border-gray-100 font-bold"
                                        onClick={() => {
                                            setPrintOrder(selectedOrder)
                                            setTimeout(() => {
                                                window.print()
                                                setPrintOrder(null)
                                            }, 100)
                                        }}
                                    >
                                        Imprimer Reçu
                                    </Button>
                                </div>
                                <Button
                                    className="w-full h-12 rounded-xl bg-[#25D366] text-white hover:bg-[#128C7E] font-bold shadow-lg shadow-[#25D366]/10 transition-all active:scale-95"
                                    onClick={() => {
                                        const url = `${window.location.origin}/receipt/${selectedOrder.id}`;
                                        const message = `*MBOR B. STORE - REÇU DE COMMANDE*\n\nBonjour ${selectedOrder.customerName || selectedOrder.user?.name || "Cher client"},\nVotre commande #${selectedOrder.id.slice(-6).toUpperCase()} est validée.\n\nConsultez votre reçu digital ici :\n🔗 ${url}\n\nL'excellence du sport au Sénégal.`;
                                        const phone = selectedOrder.customerPhone || "";
                                        const cleanPhone = phone.replace(/\s+/g, '').replace('+', '');
                                        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
                                    }}
                                >
                                    <MessageCircle className="mr-3 h-5 w-5 fill-current" /> Envoyer Reçu sur WhatsApp
                                </Button>
                            </div>



                            {/* Printing specific Styles - Total Isolation */}
                            <style jsx global>{`
                                @media print {
                                    /* Hide every direct child of body except the receipt */
                                    body > *:not(#thermal-receipt) {
                                        display: none !important;
                                    }

                                    /* Ensure thermal receipt is the only thing visible */
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

                                    /* Clean up paper settings */
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

                                /* Standard browser hiding */
                                .receipt-print-only {
                                    display: none;
                                }
                            `}</style>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* Delete Modal */}
            <DeleteConfirmModal
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteOrder}
                isLoading={isDeleting}
                title="Révocation Transaction"
                description="Êtes-vous certain de vouloir annuler et supprimer cet enregistrement transactionnel ? Cette action impactera les rapports comptables."
            />
        </div>
    )
}
