"use client"

import * as React from "react"
import {
    AlertTriangle,
    ArrowUp,
    ArrowDown,
    RotateCcw,
    Search,
    Filter,
    ArrowUpDown,
    CheckCircle2,
    Database,
    Zap,
    Scale,
    Layers,
    History,
    MoreHorizontal,
    Edit,
    Plus,
    RefreshCw,
    ChevronLeft,
    ChevronRight
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

import { getAdminProducts, updateStock } from "../actions"

export default function AdminStockPage() {
    const [productsData, setProductsData] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isUpdating, setIsUpdating] = React.useState<string | null>(null)

    // Pagination state
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 10

    const loadData = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await getAdminProducts()
            setProductsData(data)
        } catch (error) {
            console.error("Failed to load stock data:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        loadData()
    }, [loadData])

    const handleStockUpdate = async (id: string, increment: number) => {
        setIsUpdating(id)
        try {
            await updateStock(id, increment)
            toast.success(`Stock synchronisé: ${increment > 0 ? '+' : ''}${increment}`)
            loadData()
        } catch (error) {
            toast.error("Erreur de synchronisation")
        } finally {
            setIsUpdating(null)
        }
    }

    const filteredProducts = productsData.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery])

    const criticalCount = productsData.filter(p => (p.stock || 0) === 0).length
    const lowCount = productsData.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 5).length
    const healthyCount = productsData.filter(p => (p.stock || 0) > 5).length

    const alerts = [
        { label: "Rupture Critique", value: criticalCount.toString(), icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Seuil Alerte", value: lowCount.toString(), icon: Scale, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Flux Opérationnel", value: healthyCount.toString(), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Gestion <span className="text-indigo-600">Logistique.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Surveillance des flux de stock et réapprovisionnement stratégique.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-6 rounded-2xl text-[12px] font-bold border-gray-100 hover:bg-white hover:shadow-xl transition-all flex items-center gap-2 uppercase tracking-widest bg-white shadow-sm">
                        <History className="h-4 w-4 text-gray-400" /> Audit Logs
                    </Button>
                    <Button
                        onClick={loadData}
                        className="h-11 px-6 rounded-2xl bg-gray-900 text-white text-[12px] font-bold hover:bg-black hover:shadow-2xl transition-all flex items-center gap-2 uppercase tracking-widest shadow-xl"
                    >
                        <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} /> Refresh Database
                    </Button>
                </div>
            </div>

            {/* Matrix Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {alerts.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
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
                            placeholder="Chercher par SKU, désignation ou univers..."
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
                                <th className="px-8 py-5">Référence</th>
                                <th className="px-8 py-5">Désignation</th>
                                <th className="px-8 py-5">Audit Intensité</th>
                                <th className="px-8 py-5 text-center">Status Flux</th>
                                <th className="px-8 py-5 text-right">Ajustement</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}><td colSpan={5} className="px-8 py-6"><div className="h-12 w-full bg-gray-50 animate-pulse rounded-2xl" /></td></tr>
                                ))
                            ) : currentProducts.length === 0 ? (
                                <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Aucun produit trouvé</td></tr>
                            ) : (
                                currentProducts.map((item) => (
                                    <tr key={item.id} className="group hover:bg-gray-50/30 transition-all cursor-pointer">
                                        <td className="px-8 py-5">
                                            <div className="px-3 py-1.5 rounded-xl bg-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest w-fit border border-gray-100/50">
                                                SKU-{item.id.slice(0, 8).toUpperCase()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-[14px] font-bold text-gray-900 leading-tight mb-1">{item.name}</p>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] flex items-center gap-2">
                                                <Layers className="h-3 w-3" /> {item.category?.name || "Sans univers"}
                                            </p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-2 w-48">
                                                <div className="flex items-center justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                                    <span>{item.stock} / 100 Vol.</span>
                                                    <span className={cn(
                                                        item.stock <= 5 ? 'text-rose-600' : 'text-indigo-600'
                                                    )}>
                                                        {Math.min(item.stock, 100)}%
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min((item.stock / 100) * 100, 100)}%` }}
                                                        className={cn(
                                                            "h-full transition-all duration-700 rounded-full",
                                                            item.stock === 0 ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' :
                                                                item.stock <= 5 ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={cn(
                                                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                                item.stock === 0 ? "bg-rose-50 text-rose-600" :
                                                    item.stock <= 5 ? "bg-amber-50 text-amber-600 shadow-sm" :
                                                        "bg-emerald-50 text-emerald-600 shadow-sm"
                                            )}>
                                                {item.stock === 0 ? "CRITIQUE" : item.stock <= 5 ? "FAIBLE" : "OPTIMAL"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-10 w-10 rounded-xl border-gray-100 text-gray-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all bg-white"
                                                    onClick={() => handleStockUpdate(item.id, -1)}
                                                    disabled={isUpdating === item.id}
                                                >
                                                    <ArrowDown className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-10 w-10 rounded-xl border-gray-100 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100 transition-all bg-white"
                                                    onClick={() => handleStockUpdate(item.id, 1)}
                                                    disabled={isUpdating === item.id}
                                                >
                                                    <ArrowUp className="h-4 w-4" />
                                                </Button>
                                                1:
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-900 rounded-xl transition-all">
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-[200px] rounded-[1.5rem] shadow-2xl border-gray-50 p-2">
                                                        <DropdownMenuLabel className="text-[10px] font-black text-gray-400 px-3 py-2 uppercase tracking-widest border-b border-gray-50 mb-1">Audit Flux</DropdownMenuLabel>
                                                        <DropdownMenuItem className="text-[12px] font-bold py-3 px-3 focus:bg-emerald-50 focus:text-emerald-600 rounded-xl transition-colors cursor-pointer" onClick={() => handleStockUpdate(item.id, 10)}>
                                                            <Plus className="mr-3 h-4 w-4" /> Ajouter +10
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-[12px] font-bold py-3 px-3 focus:bg-rose-50 focus:text-rose-600 rounded-xl transition-colors cursor-pointer" onClick={() => handleStockUpdate(item.id, -10)}>
                                                            <ArrowDown className="mr-3 h-4 w-4" /> Retirer -10
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between bg-gray-50/20 gap-6">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        Affichage : {Math.min(currentProducts.length, itemsPerPage)} sur {filteredProducts.length} Entités
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
        </div>
    )
}
