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
    Zap
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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

import { getDashboardStats, getRecentOrders } from "./actions"

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
    const [statsData, setStatsData] = React.useState<any>(null)
    const [recentOrders, setRecentOrders] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        async function loadData() {
            try {
                const [stats, orders] = await Promise.all([
                    getDashboardStats(),
                    getRecentOrders(5)
                ])
                setStatsData(stats)
                setRecentOrders(orders)
            } catch (error) {
                console.error("Failed to load dashboard data:", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [])

    const stats = [
        { label: "Volume d'affaires", value: statsData ? `${statsData.revenue.toLocaleString()} F` : "0 F", trend: "+12.5%", up: true, icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Flux Commandes", value: statsData ? statsData.orders.toString() : "0", trend: "+4.2%", up: true, icon: ShoppingBag, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Acquisition Clients", value: statsData ? statsData.users.toString() : "0", trend: "-2.1%", up: false, icon: Users, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Articles Référencés", value: statsData ? statsData.products.toString() : "0", trend: "+0.4%", up: true, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Control <span className="text-primary italic">Center.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Gestion temps-réel de l'écosystème Mbor B. Store.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-6 rounded-2xl text-[12px] font-bold border-gray-100 hover:bg-white hover:shadow-xl transition-all flex items-center gap-2 uppercase tracking-widest">
                        <Activity className="h-4 w-4" /> Rapport
                    </Button>
                    <Button className="h-11 px-6 rounded-2xl bg-gray-900 text-white text-[12px] font-bold hover:bg-black hover:shadow-2xl transition-all flex items-center gap-2 uppercase tracking-widest">
                        <Plus className="h-4 w-4" /> Nouveau Produit
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
                        <div className="flex items-center justify-between mb-6">
                            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner", stat.bg, stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                stat.up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                            )}>
                                {stat.trend}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                            <h3 className="text-2xl font-black tracking-tighter text-gray-900 italic">
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

                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-gray-900 uppercase italic">Activité Hebdomadaire</h3>
                                <p className="text-[12px] text-gray-400 font-medium">Flux des ventes et tendances opérationnelles.</p>
                            </div>
                            <div className="h-1 w-20 bg-gray-100 rounded-full" />
                        </div>

                        <div className="h-[300px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorSalesDash" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} dy={15} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSalesDash)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-black text-gray-900 uppercase italic">Derniers Flux</h3>
                            <Button variant="ghost" className="text-[11px] font-black text-gray-400 hover:text-gray-900 tracking-widest uppercase">
                                Visualiser Proche <ChevronRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                        </div>

                        <div className="bg-white border border-gray-50 rounded-[2rem] overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-50">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Identité</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Volume</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Instant</th>
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
                                                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                        order.status === "PAID" ? "text-emerald-600 bg-emerald-50" :
                                                            order.status === "PENDING" ? "text-amber-600 bg-amber-50" : "text-blue-600 bg-blue-50"
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
                    <div className="bg-gray-900 rounded-[2.5rem] p-10 space-y-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target className="h-20 w-20 text-white" />
                        </div>

                        <div className="space-y-1 relative z-10">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Vision Stratégique</h4>
                            <h3 className="text-xl font-black text-white uppercase italic">Objectif Ventes</h3>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-end">
                                <span className="text-4xl font-black text-white tracking-tighter tabular-nums">75%</span>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Réalisé</p>
                                    <p className="text-[12px] font-black text-indigo-400 tabular-nums tracking-widest">11.2M / 15M</p>
                                </div>
                            </div>
                            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-indigo-500 to-primary rounded-full"
                                />
                            </div>
                        </div>

                        <Button className="w-full h-12 bg-white text-gray-900 hover:bg-gray-50 font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl relative z-10">
                            KPI Détails
                        </Button>
                    </div>

                    <div className="bg-amber-50 rounded-[2rem] p-8 border border-amber-100 flex items-start gap-5 shadow-sm">
                        <div className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-amber-600 shrink-0">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[13px] font-black text-amber-900 uppercase tracking-tight">Stock Critique</h4>
                            <p className="text-[12px] text-amber-700/80 leading-relaxed font-medium">Certains best-sellers sont en rupture imminente. Réapprovisionnement suggéré.</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-50 rounded-[2rem] p-8 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <Zap className="h-4 w-4 text-primary" />
                            <h4 className="text-[13px] font-black text-gray-900 uppercase tracking-tight italic">Quick Actions</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-12 rounded-xl text-[11px] font-black border-gray-100 hover:bg-gray-50 uppercase tracking-widest">Logs</Button>
                            <Button variant="outline" className="h-12 rounded-xl text-[11px] font-black border-gray-100 hover:bg-gray-50 uppercase tracking-widest">Promo</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
