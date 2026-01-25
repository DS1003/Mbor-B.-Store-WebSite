"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    TrendingUp,
    Users,
    ShoppingBag,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    MoreVertical,
    Activity,
    Plus,
    Target,
    Zap,
    Database,
    Download
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts'

import {
    getDashboardStats,
    getRecentOrders,
    getAdminLogs,
    getPromotions,
    createPromotion,
    deletePromotion
} from "./actions"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Trash } from "lucide-react"

const data = [
    { name: 'Lun', sales: 4000 },
    { name: 'Mar', sales: 3000 },
    { name: 'Mer', sales: 2000 },
    { name: 'Jeu', sales: 2780 },
    { name: 'Ven', sales: 1890 },
    { name: 'Sam', sales: 2390 },
    { name: 'Dim', sales: 3490 },
]

export default function AdminDashboard() {
    const router = useRouter()
    const [statsData, setStatsData] = React.useState<any>(null)
    const [recentOrders, setRecentOrders] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const [logs, setLogs] = React.useState<any[]>([])
    const [isLogsOpen, setIsLogsOpen] = React.useState(false)
    const [promos, setPromos] = React.useState<any[]>([])
    const [isPromoOpen, setIsPromoOpen] = React.useState(false)
    const [isCreatingPromo, setIsCreatingPromo] = React.useState(false)
    const [newPromo, setNewPromo] = React.useState({ title: "", code: "", discount: "" })

    const loadData = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const [stats, orders, logsData, promosData] = await Promise.all([
                getDashboardStats(),
                getRecentOrders(5),
                getAdminLogs(),
                getPromotions()
            ])
            setStatsData(stats)
            setRecentOrders(orders)
            setLogs(logsData)
            setPromos(promosData)
        } catch (error) {
            console.error("Failed to load dashboard data:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        loadData()
    }, [loadData])

    const handleCreatePromo = async () => {
        if (!newPromo.title || !newPromo.code) return toast.error("Titre et Code requis")
        setIsCreatingPromo(true)
        try {
            await createPromotion({
                title: newPromo.title,
                code: newPromo.code,
                discount: Number(newPromo.discount) || 0,
                isActive: true
            })
            toast.success("Promotion créée")
            setNewPromo({ title: "", code: "", discount: "" })
            const updatedPromos = await getPromotions()
            setPromos(updatedPromos)
        } catch (error) {
            toast.error("Erreur de création")
        } finally {
            setIsCreatingPromo(false)
        }
    }

    const handleDeletePromo = async (id: string) => {
        try {
            await deletePromotion(id)
            toast.success("Promotion supprimée")
            setPromos(promos.filter(p => p.id !== id))
        } catch (error) {
            toast.error("Erreur de suppression")
        }
    }

    const exportToCSV = () => {
        if (!statsData || !recentOrders.length) {
            toast.error("Données insuffisantes pour l'export")
            return
        }

        const headers = ["ID", "Client", "Total", "Status", "Date"]
        const rows = recentOrders.map(order => [
            order.id,
            order.user?.name || order.customerName || "Invite",
            order.total,
            order.status,
            new Date(order.createdAt).toLocaleDateString()
        ])

        const csvContent = [
            headers.join(","),
            ...rows.map(line => line.join(","))
        ].join("\n")

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `rapport_mbor_b_store_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success("Rapport exporté avec succès")
    }

    const stats = [
        { label: "Volume d'affaires", value: statsData ? `${statsData.revenue.toLocaleString()} F` : "0 F", trend: "+12.5%", up: true, icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Flux Commandes", value: statsData ? statsData.orders.toString() : "0", trend: "+4.2%", up: true, icon: ShoppingBag, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Acquisition Clients", value: statsData ? statsData.users.toString() : "0", trend: "-2.1%", up: false, icon: Users, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Articles Référencés", value: statsData ? statsData.products.toString() : "0", trend: "+0.4%", up: true, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tableau de <span className="text-amber-600">Bord.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Analyse et gestion de l'écosystème Mbor B. Store en temps réel.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={exportToCSV}
                        variant="outline"
                        className="h-10 px-5 rounded-xl text-[12px] font-semibold border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2"
                    >
                        <Download className="h-4 w-4 text-gray-400" /> Exporter Rapport
                    </Button>
                    <Button
                        onClick={() => router.push('/admin/products')}
                        className="h-10 px-5 rounded-xl bg-gray-900 text-white text-[12px] font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-sm"
                    >
                        <Plus className="h-4 w-4" /> Ajouter Produit
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
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
                            <div className={cn(
                                "flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold",
                                stat.up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                            )}>
                                {stat.trend}
                            </div>
                        </div>

                        <div className="space-y-0.5">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                                {isLoading ? <span className="h-8 w-24 bg-gray-50 animate-pulse block rounded-lg" /> : stat.value}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Evolution Section */}
                <div className="xl:col-span-8 space-y-8">
                    <div className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <TrendingUp className="h-32 w-32" />
                        </div>

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-gray-900">Activité Hebdomadaire</h3>
                                <p className="text-[12px] text-gray-400 font-medium">Analyse des flux de ventes et tendances.</p>
                            </div>
                            <div className="h-1 w-12 bg-gray-100 rounded-full" />
                        </div>

                        <div className="h-[300px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorSalesDash" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} dy={15} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="sales" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorSalesDash)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-lg font-bold text-gray-900">Dernières Commandes</h3>
                            <Button
                                onClick={() => router.push('/admin/orders')}
                                variant="ghost"
                                className="text-[11px] font-bold text-gray-500 hover:text-gray-900 tracking-wide uppercase"
                            >
                                Tout voir <ChevronRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                        </div>

                        <div className="bg-white border border-gray-50 rounded-[2rem] overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Commande</th>
                                        <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total</th>
                                        <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                                        <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {isLoading ? (
                                        [...Array(3)].map((_, i) => (
                                            <tr key={i}><td colSpan={4} className="px-8 py-6"><div className="h-10 w-full bg-gray-50 animate-pulse rounded-2xl" /></td></tr>
                                        ))
                                    ) : recentOrders.map((order) => (
                                        <tr key={order.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-11 w-11 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-[12px] text-gray-500 uppercase rotate-3 group-hover:rotate-0 transition-transform shadow-sm">
                                                        {(order.user?.name || order.customerName || "G").split(' ').map((n: any) => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-bold text-gray-900 leading-tight">#{order.id.slice(-6).toUpperCase()}</p>
                                                        <p className="text-[11px] text-gray-400 font-medium">{order.user?.name || order.customerName || "Invite"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-[14px] font-black text-gray-900 tabular-nums">{Number(order.total).toLocaleString()} F</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex justify-center">
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                                        order.status === "PAID" ? "text-emerald-700 bg-emerald-50" :
                                                            order.status === "PENDING" ? "text-amber-700 bg-amber-50" : "text-amber-700 bg-amber-50"
                                                    )}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <span className="text-[12px] text-gray-400 font-bold tabular-nums">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="xl:col-span-4 space-y-8">
                    <div className="bg-[#1C1C1C] rounded-[2.5rem] p-10 space-y-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Target className="h-20 w-20 text-white" />
                        </div>

                        <div className="space-y-1 relative z-10">
                            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Objectif Mensuel</h4>
                            <h3 className="text-xl font-bold text-white italic">Performance Ventes</h3>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-end">
                                <span className="text-4xl font-bold text-white tracking-tighter tabular-nums">75%</span>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Progression</p>
                                    <p className="text-[12px] font-bold text-amber-500 tabular-nums">11.2M / 15M</p>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-md">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={() => router.push('/admin/analytics')}
                            className="w-full h-11 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-[11px] uppercase tracking-wider rounded-xl relative z-10 transition-all"
                        >
                            Voir Détails KPI
                        </Button>
                    </div>

                    <div className="bg-amber-50/50 rounded-[2rem] p-8 border border-amber-100/50 flex items-start gap-5 shadow-sm">
                        <div className="h-11 w-11 rounded-xl bg-white shadow-sm border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                            <AlertCircle className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[13px] font-bold text-amber-900 leading-none">Stock Critique</h4>
                            <p className="text-[12px] text-amber-700/80 leading-relaxed font-medium">Certains best-sellers sont en rupture imminente. Réapprovisionnement suggéré.</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <Zap className="h-4 w-4 text-amber-500" />
                            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-tight">Actions Rapides</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                onClick={() => setIsLogsOpen(true)}
                                variant="outline"
                                className="h-10 rounded-xl text-[11px] font-bold border-gray-100 hover:bg-gray-50 uppercase tracking-wider transition-all active:scale-95"
                            >
                                Logs
                            </Button>
                            <Button
                                onClick={() => setIsPromoOpen(true)}
                                variant="outline"
                                className="h-10 rounded-xl text-[11px] font-bold border-gray-100 hover:bg-gray-50 uppercase tracking-wider transition-all active:scale-95"
                            >
                                Promo
                            </Button>
                            <Button
                                onClick={() => window.location.href = '/api/admin/backup'}
                                variant="outline"
                                className="h-10 rounded-xl text-[11px] font-bold border-gray-100 hover:bg-gray-50 uppercase tracking-wider flex items-center justify-center gap-2 col-span-2"
                            >
                                <Database className="h-4 w-4" /> Sauvegarde Database
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Logs Dialog */}
            <Dialog open={isLogsOpen} onOpenChange={setIsLogsOpen}>
                <DialogContent className="max-w-2xl rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
                    <div className="bg-white p-8 space-y-8">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900">
                                Journaux d'activité <span className="text-amber-600">Admin.</span>
                            </DialogTitle>
                            <DialogDescription className="text-sm font-medium text-gray-500">
                                Historique récent des actions effectuées sur la console.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                            {logs.length === 0 ? (
                                <div className="py-20 text-center opacity-30 italic text-gray-400">Aucun log disponible.</div>
                            ) : logs.map((log) => (
                                <div key={log.id} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[13px] font-bold text-gray-900">{log.action}</p>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            {new Date(log.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-[12px] text-gray-500 font-medium">{log.details || "Aucun détail supplémentaire"}</p>
                                    <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest pt-1">
                                        Par: {log.adminName || "Système"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Promo Dialog */}
            <Dialog open={isPromoOpen} onOpenChange={setIsPromoOpen}>
                <DialogContent className="max-w-2xl rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
                    <div className="bg-white p-8 space-y-8">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900">
                                Gestion des <span className="text-amber-600">Promotions.</span>
                            </DialogTitle>
                            <DialogDescription className="text-sm font-medium text-gray-500">
                                Créez et gérez vos codes promo et offres spéciales.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Create Section */}
                            <div className="space-y-6">
                                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Nouvelle Offre</h4>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Titre</Label>
                                        <Input
                                            placeholder="ex: Soldes Été"
                                            className="h-11 rounded-xl bg-gray-50 border-gray-100 font-medium text-[13px]"
                                            value={newPromo.title}
                                            onChange={(e) => setNewPromo({ ...newPromo, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Code Promo</Label>
                                        <Input
                                            placeholder="MBOR2024"
                                            className="h-11 rounded-xl bg-gray-50 border-gray-100 font-bold tracking-widest text-[13px]"
                                            value={newPromo.code}
                                            onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Réduction (%)</Label>
                                        <Input
                                            type="number"
                                            placeholder="ex: 15"
                                            className="h-11 rounded-xl bg-gray-50 border-gray-100 font-bold text-[13px]"
                                            value={newPromo.discount}
                                            onChange={(e) => setNewPromo({ ...newPromo, discount: e.target.value })}
                                        />
                                    </div>
                                    <Button
                                        onClick={handleCreatePromo}
                                        disabled={isCreatingPromo}
                                        className="w-full h-11 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-wider text-[11px] shadow-lg shadow-gray-200"
                                    >
                                        {isCreatingPromo ? "Création..." : "Activer Promotion"}
                                    </Button>
                                </div>
                            </div>

                            {/* List Section */}
                            <div className="space-y-6">
                                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Offres Actives</h4>
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {promos.length === 0 ? (
                                        <div className="py-10 text-center opacity-30 italic text-[11px] text-gray-400">Aucune promo.</div>
                                    ) : promos.map((promo) => (
                                        <div key={promo.id} className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between group">
                                            <div className="min-w-0">
                                                <p className="text-[13px] font-bold text-amber-900 truncate tracking-tight">{promo.title}</p>
                                                <p className="text-[11px] text-amber-600 font-black tracking-widest">{promo.code}</p>
                                            </div>
                                            <Button
                                                onClick={() => handleDeletePromo(promo.id)}
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-rose-500 hover:bg-rose-100/50 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
