"use client"

import * as React from "react"
import Link from "next/link"
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
    Store
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
import { getAdminOrders, updateOrderStatus, deleteOrder, getAdminProducts, createInStoreOrder } from "../actions"
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
    const [ordersData, setOrdersData] = React.useState<any[]>([])
    const [products, setProducts] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [selectedOrder, setSelectedOrder] = React.useState<any>(null)
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)
    const [isPosOpen, setIsPosOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")

    // Delete state
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [idToDelete, setIdToDelete] = React.useState<string | null>(null)
    const [isDeleting, setIsDeleting] = React.useState(false)

    // POS state
    const [posCustomerName, setPosCustomerName] = React.useState("")
    const [posItems, setPosItems] = React.useState<any[]>([])
    const [posSearchSearch, setPosSearch] = React.useState("")
    const [isSavingPos, setIsSavingPos] = React.useState(false)
    const [config, setConfig] = React.useState<any>(null)
    const [printOrder, setPrintOrder] = React.useState<any>(null)

    const loadOrders = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const [oData, pData, cData] = await Promise.all([
                getAdminOrders(),
                getAdminProducts(),
                getStoreConfig()
            ])
            setOrdersData(oData)
            setProducts(pData)
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

    // POS Logic
    const addToPos = (product: any) => {
        const existing = posItems.find(i => i.productId === product.id)
        if (existing) {
            setPosItems(posItems.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        } else {
            setPosItems([...posItems, {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            }])
        }
        toast.info(`${product.name} ajouté`)
    }

    const removeFromPos = (productId: string) => {
        setPosItems(posItems.filter(i => i.productId !== productId))
    }

    const updatePosQty = (productId: string, delta: number) => {
        setPosItems(posItems.map(i => {
            if (i.productId === productId) {
                const newQty = Math.max(1, i.quantity + delta)
                return { ...i, quantity: newQty }
            }
            return i
        }))
    }

    const posTotal = posItems.reduce((acc, current) => acc + (current.price * current.quantity), 0)

    const handleCreatePosOrder = async () => {
        if (!posCustomerName) return toast.error("Nom du client requis")
        if (posItems.length === 0) return toast.error("Aucun article")

        setIsSavingPos(true)
        try {
            const order = await createInStoreOrder({
                customerName: posCustomerName,
                items: posItems,
                total: posTotal
            })
            toast.success("Commande Boutique Enregistrée")

            // Auto-print receipt
            setPrintOrder(order)
            setTimeout(() => {
                window.print()
                setPrintOrder(null)
            }, 500)

            setIsPosOpen(false)
            setPosItems([])
            setPosCustomerName("")
            loadOrders()
        } catch (error) {
            toast.error("Erreur POS")
        } finally {
            setIsSavingPos(false)
        }
    }

    const filteredOrders = ordersData.filter(o =>
        (o.id.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (o.user?.name?.toLowerCase() || o.customerName?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    )

    const filteredProductsPos = products.filter(p =>
        p.name.toLowerCase().includes(posSearchSearch.toLowerCase()) && p.stock > 0
    )

    const stats = [
        { label: "En Attente", value: ordersData.filter(o => o.status === "PENDING").length.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Flux Payés", value: ordersData.filter(o => o.status === "PAID").length.toString(), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Logistique", value: ordersData.filter(o => o.status === "SHIPPED").length.toString(), icon: Truck, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Volume Total", value: ordersData.length.toString(), icon: Activity, color: "text-gray-600", bg: "bg-gray-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Flux <span className="text-indigo-600">Transactions.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Suivi temps-réel et gestion logistique des commandes.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => setIsPosOpen(true)}
                        className="h-11 px-6 rounded-2xl bg-indigo-600 text-white text-[12px] font-bold hover:bg-indigo-700 hover:shadow-2xl transition-all flex items-center gap-2 uppercase tracking-widest shadow-xl"
                    >
                        <Store className="h-4 w-4" /> Vente Boutique (POS)
                    </Button>
                    <Button variant="outline" className="h-11 px-6 rounded-2xl text-[12px] font-bold border-gray-100 hover:bg-white hover:shadow-xl transition-all flex items-center gap-2 uppercase tracking-widest bg-white shadow-sm">
                        <Download className="h-4 w-4 text-gray-400" /> Export
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
                        <Search className="absolute left-5 h-4 w-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <Input
                            placeholder="Rechercher par ID transaction, nom client..."
                            className="bg-white h-12 pl-12 pr-6 rounded-2xl border-gray-100 focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-200 text-[14px] font-medium placeholder:text-gray-400 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50 font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                <th className="px-8 py-5">Transaction ID</th>
                                <th className="px-8 py-5">Bénéficiaire</th>
                                <th className="px-8 py-5">Articles</th>
                                <th className="px-8 py-5">Volume (CFA)</th>
                                <th className="px-8 py-5 text-center">Statut Logistique</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}><td colSpan={6} className="px-8 py-6"><div className="h-12 w-full bg-gray-50 animate-pulse rounded-2xl" /></td></tr>
                                ))
                            ) : filteredOrders.length === 0 ? (
                                <tr><td colSpan={6} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Aucune transaction trouvée</td></tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-gray-50/30 transition-all cursor-pointer">
                                        <td className="px-8 py-5" onClick={() => { setSelectedOrder(order); setIsDetailsOpen(true); }}>
                                            <div className="space-y-1">
                                                <p className="text-[14px] font-black text-gray-900 leading-tight">#{order.id.slice(-6).toUpperCase()}</p>
                                                <p className="text-[10px] text-indigo-600 font-bold tracking-widest uppercase">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5" onClick={() => { setSelectedOrder(order); setIsDetailsOpen(true); }}>
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
                                        <td className="px-8 py-5" onClick={() => { setSelectedOrder(order); setIsDetailsOpen(true); }}>
                                            <div className="flex -space-x-2">
                                                {order.items?.map((item: any, idx: number) => (
                                                    <div key={idx} className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm relative z-[1] hover:z-[10] hover:-translate-y-1 transition-all group/icon">
                                                        <Shirt className="h-4 w-4 text-gray-400 group-hover/icon:text-indigo-600" />
                                                    </div>
                                                ))}
                                                {order.items?.length > 3 && <div className="h-8 w-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">+{order.items.length - 3}</div>}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5" onClick={() => { setSelectedOrder(order); setIsDetailsOpen(true); }}>
                                            <p className="text-[15px] font-black text-gray-900 tabular-nums">{Number(order.total).toLocaleString()} F</p>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={cn(
                                                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                                order.status === "PAID" ? "text-emerald-600 bg-emerald-50" :
                                                    order.status === "PENDING" ? "text-amber-600 bg-amber-50 shadow-sm" :
                                                        order.status === "SHIPPED" ? "text-blue-600 bg-blue-50" : "text-emerald-900 bg-emerald-100",
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
                                                    <DropdownMenuItem onClick={() => { setSelectedOrder(order); setIsDetailsOpen(true); }} className="text-[12px] font-bold py-3 px-3 focus:bg-indigo-50 focus:text-indigo-600 rounded-xl transition-colors cursor-pointer">
                                                        <Eye className="mr-3 h-4 w-4" /> Détails Transaction
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "PAID")} className="text-[12px] font-bold py-3 px-3 focus:bg-emerald-50 focus:text-emerald-600 rounded-xl transition-colors cursor-pointer">
                                                        <CheckCircle2 className="mr-3 h-4 w-4" /> Encaisser Paiement
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "SHIPPED")} className="text-[12px] font-bold py-3 px-3 focus:bg-blue-50 focus:text-blue-600 rounded-xl transition-colors cursor-pointer">
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

                <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/20 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    <p>Historique Flow : {filteredOrders.length} Transactions Répertoriées</p>
                </div>
            </div>

            {/* Order Details Sheet */}
            <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <SheetContent className="sm:max-w-xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-xl font-black uppercase italic tracking-tight">Audit <span className="text-indigo-600">Transactionnelle</span></SheetTitle>
                        <SheetDescription className="font-medium text-gray-400">
                            Identification : #{selectedOrder?.id.slice(-6).toUpperCase()}
                        </SheetDescription>
                    </SheetHeader>

                    {selectedOrder && (
                        <div id="print-area" className="space-y-10 py-10">
                            {/* Status Section (Hidden when printing receipt) */}
                            <div className="print:hidden flex items-center justify-between p-8 bg-gray-900 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Zap className="h-32 w-32 text-white" />
                                </div>
                                <div className="space-y-1 relative z-10">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">État Logistique</p>
                                    <Badge className={cn(
                                        "px-5 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest",
                                        selectedOrder.status === "PAID" ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20" :
                                            selectedOrder.status === "PENDING" ? "bg-amber-500 text-white" :
                                                "bg-indigo-500 text-white shadow-xl shadow-indigo-500/20",
                                    )}>
                                        {selectedOrder.status}
                                    </Badge>
                                </div>
                                <div className="flex flex-col gap-2 relative z-10">
                                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-50 rounded-xl h-9 px-4 font-black text-[10px] uppercase shadow-lg" onClick={() => handleStatusUpdate(selectedOrder.id, "PAID")}>Sync Payé</Button>
                                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 rounded-xl h-9 px-4 font-black text-[10px] uppercase" onClick={() => handleStatusUpdate(selectedOrder.id, "SHIPPED")}>Sync Expédié</Button>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 ml-2">
                                    <User className="h-4 w-4 text-indigo-600" />
                                    <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">Bénéficiaire Logistique</h4>
                                </div>
                                <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-bold text-gray-400">Identité</span>
                                        <span className="text-[14px] font-black text-gray-900">{selectedOrder.user?.name || selectedOrder.customerName || "Invite"}</span>
                                    </div>
                                    <Separator className="bg-gray-50" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-bold text-gray-400">Canal Digital</span>
                                        <span className="text-[14px] font-black text-indigo-600">{selectedOrder.user?.email || selectedOrder.customerEmail || "N/A"}</span>
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
                                    <Box className="h-4 w-4 text-indigo-600" />
                                    <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">Composants Flux ({selectedOrder.items?.length})</h4>
                                </div>
                                <div className="space-y-3">
                                    {selectedOrder.items?.map((item: any, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between p-5 bg-white border border-gray-50 rounded-[2rem] group hover:shadow-xl transition-all duration-500">
                                            <div className="flex items-center gap-5">
                                                <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-50 flex items-center justify-center shrink-0 rotate-2 group-hover:rotate-0 transition-transform shadow-sm">
                                                    <Shirt className="h-7 w-7 text-gray-300 group-hover:text-indigo-600 transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-black text-gray-900 leading-tight mb-1">{item.product?.name}</p>
                                                    <p className="text-[11px] text-gray-400 font-bold tracking-tight">
                                                        Unité: {Number(item.price).toLocaleString()} F • Qté: {item.quantity}
                                                    </p>
                                                    {(item.customName || item.customNumber) && (
                                                        <div className="mt-2 px-3 py-1 rounded-lg bg-indigo-50 text-[10px] font-black text-indigo-600 border border-indigo-100 uppercase tracking-widest">
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
                                    <span>Valeur Brut</span>
                                    <span className="tabular-nums">{Number(selectedOrder.total).toLocaleString()} F</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Logistique Express</span>
                                    <span className="text-emerald-500">OFFERT</span>
                                </div>
                                <Separator className="bg-gray-100" />
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-[16px] font-black text-gray-900 uppercase italic">Total Facturé</span>
                                    <span className="text-2xl font-black text-gray-900 tabular-nums tracking-tighter shadow-indigo-100 italic">{Number(selectedOrder.total).toLocaleString()} F</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4 pb-10 sticky bottom-0 bg-white py-4 -mx-6 px-6 border-t border-gray-50 z-20 print:hidden">
                                <Button
                                    variant="outline"
                                    className="flex-1 h-14 rounded-[1.5rem] font-black uppercase tracking-widest border-gray-100 shadow-sm"
                                    onClick={() => window.print()}
                                >
                                    <Printer className="mr-3 h-4 w-4" /> Facture
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 h-14 rounded-[1.5rem] border-gray-100 font-black uppercase tracking-widest"
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

                            {/* Hidden Receipt for Printing */}
                            <div className="hidden print:block fixed inset-0 z-[9999] bg-white">
                                <Receipt order={printOrder || selectedOrder} config={config} />
                            </div>

                            {/* Printing specific Styles */}
                            <style jsx global>{`
                                @media print {
                                    body * { visibility: hidden; }
                                    .print\\:block, .print\\:block * { visibility: visible; }
                                    .print\\:block { position: absolute; left: 0; top: 0; width: 100%; border: none; padding: 0; margin: 0; }
                                    .print\\:hidden { display: none !important; }
                                }
                            `}</style>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* POS Modal (Boutique) */}
            <Sheet open={isPosOpen} onOpenChange={setIsPosOpen}>
                <SheetContent className="sm:max-w-4xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-xl font-black uppercase italic tracking-tight">Terminal <span className="text-indigo-600">Vente Boutique.</span></SheetTitle>
                        <SheetDescription className="font-medium text-gray-400">
                            Génération immédiate de facture et encaissement en point de vente.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10">
                        {/* Selector */}
                        <div className="space-y-6">
                            <div className="relative group">
                                <Search className="absolute left-4 h-4 w-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                <Input
                                    placeholder="Scann ou recherche produit..."
                                    className="h-12 pl-12 rounded-2xl bg-gray-50/50 border-gray-100"
                                    value={posSearchSearch}
                                    onChange={(e) => setPosSearch(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3 h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                                {filteredProductsPos.map((p) => (
                                    <div
                                        key={p.id}
                                        className="flex items-center justify-between p-4 bg-white border border-gray-50 rounded-2xl hover:border-indigo-100 hover:shadow-xl transition-all cursor-pointer group"
                                        onClick={() => addToPos(p)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-xl bg-gray-50 overflow-hidden relative shrink-0">
                                                {p.images?.[0] && <img src={p.images[0]} className="object-cover h-full w-full" />}
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-bold text-gray-900 leading-tight">{p.name}</p>
                                                <p className="text-[11px] text-gray-400 font-bold">{p.stock} en stock</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[14px] font-black text-gray-900">{Number(p.price).toLocaleString()} F</p>
                                            <div className="h-6 w-6 rounded-lg bg-gray-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto mt-1">
                                                <Plus className="h-3 w-3" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cart & Billing */}
                        <div className="bg-gray-50/50 rounded-[2.5rem] p-8 border border-gray-50 flex flex-col h-full space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Client (Nom complet)</label>
                                <Input
                                    placeholder="ex: Moussa Diop"
                                    className="h-12 rounded-2xl bg-white border-white shadow-sm font-bold"
                                    value={posCustomerName}
                                    onChange={(e) => setPosCustomerName(e.target.value)}
                                />
                            </div>

                            <Separator className="bg-gray-100" />

                            <div className="flex-1 space-y-4 min-h-[250px] overflow-y-auto pr-2">
                                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Panier Actuel ({posItems.length})</h4>
                                {posItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full opacity-30 italic text-[13px]">Panier vide</div>
                                ) : (
                                    posItems.map((item) => (
                                        <div key={item.productId} className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <p className="text-[12px] font-black text-gray-900">{item.name}</p>
                                                <p className="text-[10px] text-gray-400">{Number(item.price).toLocaleString()} F / unité</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-50">
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg" onClick={() => updatePosQty(item.productId, -1)}><Minus className="h-3 w-3" /></Button>
                                                    <span className="text-[12px] font-black tabular-nums">{item.quantity}</span>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg" onClick={() => updatePosQty(item.productId, 1)}><Plus className="h-3 w-3" /></Button>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50 rounded-xl" onClick={() => removeFromPos(item.productId)}><Trash className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="pt-6 space-y-4 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-[13px] font-bold text-gray-400 uppercase">Calcul Total</span>
                                    <span className="text-3xl font-black text-gray-900 tabular-nums italic tracking-tighter">{Number(posTotal).toLocaleString()} F</span>
                                </div>
                                <Button
                                    className="w-full h-14 bg-gray-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                                    disabled={isSavingPos || posItems.length === 0}
                                    onClick={handleCreatePosOrder}
                                >
                                    {isSavingPos ? <Zap className="h-5 w-5 animate-pulse" /> : <Printer className="h-5 w-5" />}
                                    {isSavingPos ? "Traitement..." : "Encaisser & Imprimer"}
                                </Button>
                            </div>
                        </div>
                    </div>
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
