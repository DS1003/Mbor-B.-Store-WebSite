"use client"

import * as React from "react"
import {
    TrendingUp,
    Users,
    ShoppingBag,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Download,
    Filter,
    ChevronDown,
    Activity,
    Target,
    Zap,
    Scale,
    PieChart as PieChartIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from 'recharts'
import { motion } from "framer-motion"

const initialRevenueData = [
    { name: 'Jan', value: 0 },
    { name: 'Fév', value: 0 },
    { name: 'Mar', value: 0 },
    { name: 'Avr', value: 0 },
    { name: 'Mai', value: 0 },
    { name: 'Juin', value: 0 },
]

const initialCategoryData = [
    { name: 'Maillots', value: 0, color: '#F59E0B' },
    { name: 'Sneakers', value: 0, color: '#10b981' },
    { name: 'Survêtements', value: 0, color: '#f59e0b' },
    { name: 'Accessoires', value: 0, color: '#ef4444' },
]

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAnalyticsData, Period } from "./actions"
import { generatePDF } from "./pdf-generator"

export default function AdminAnalyticsPage() {
    const [data, setData] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)
    const [period, setPeriod] = React.useState<Period>('this_month')

    React.useEffect(() => {
        async function load() {
            setLoading(true)
            try {
                const analytics = await getAnalyticsData(period)
                setData(analytics)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [period])

    const downloadReport = async () => {
        if (!data) return
        await generatePDF(data, period)
    }

    const stats = [
        {
            label: "Chiffre d'affaires",
            value: data?.revenue || "0 F",
            trend: data?.revenueTrend || "0%",
            up: data?.revenueUp ?? true,
            icon: CreditCard,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            label: "Panier Moyen",
            value: data?.aov || "0 F",
            trend: data?.aovTrend || "0%",
            up: data?.aovUp ?? true,
            icon: Target,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            label: "Nouveaux Clients",
            value: data?.newCustomers || "0",
            trend: data?.customersTrend || "0%",
            up: data?.customersUp ?? true,
            icon: Users,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            label: "Taux Conversion",
            value: data?.conversion || "0%",
            trend: data?.conversionTrend || "0%",
            up: data?.conversionUp ?? true,
            icon: Zap,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
    ]

    const revenueData = data?.chartData || initialRevenueData
    const categoryData = data?.categoryData || initialCategoryData

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analyse des <span className="text-amber-600">Données.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Analyse structurelle des performances et indicateurs clés de croissance.</p>
                </div>

                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-10 px-5 rounded-xl text-[12px] font-semibold border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2 bg-white shadow-sm">
                                <Calendar className="h-4 w-4 text-gray-400" /> {data?.currentMonthLabel || "PÉRIODE..."} <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-xl">
                            <DropdownMenuLabel>Choisir une période</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setPeriod('this_month')}>Ce mois</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPeriod('last_month')}>Mois dernier</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPeriod('last_90_days')}>90 derniers jours</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPeriod('this_year')}>Cette année</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setPeriod('all_time')}>Tout le temps</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button onClick={downloadReport} disabled={loading} className="h-10 px-5 rounded-xl bg-gray-900 text-white text-[12px] font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-sm">
                        <Download className="h-4 w-4" /> Exporter Rapport
                    </Button>
                </div>
            </div>

            {/* 1. KPIs Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white border border-gray-50 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-4">
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
                        <div className="space-y-0.5 relative z-10">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                                {loading ? <span className="inline-block h-8 w-24 bg-gray-100 animate-pulse rounded-lg" /> : stat.value}
                            </h3>
                        </div>
                        <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                            <stat.icon className="h-32 w-32" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 2. Main Revenue Chart */}
                <div className="lg:col-span-8 bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-8">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-gray-900">Dynamique des Revenus</h3>
                            <p className="text-[12px] text-gray-400 font-medium">Flux de trésorerie sur la période sélectionnée.</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-lg">
                            <div className="h-2 w-2 rounded-full bg-amber-500" />
                            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Revenus Nets</span>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} tickFormatter={(value) => `${value / 1000}k`} />
                                <Tooltip
                                    cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#1f2937' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Operational Inputs (Side) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Universe Pie */}
                    <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm h-full flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 leading-tight">Ventes par <span className="text-amber-600">Catégorie.</span></h3>
                        <div className="flex-1 min-h-[200px] relative">
                            {categoryData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {categoryData.map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-widest">Aucune donnée</div>
                            )}
                            {/* Center Label */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-xs font-black text-gray-300">MIX</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {categoryData.slice(0, 4).map((cat: any, i: number) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                                    <span className="text-[10px] font-bold text-gray-600 uppercase truncate">{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Operations Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Order Health */}
                <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-9 w-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                            <Activity className="h-5 w-5" />
                        </div>
                        <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Santé des Commandes</h3>
                    </div>
                    <div className="flex-1 min-h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data?.statusDistribution || []} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value" startAngle={180} endAngle={0}>
                                    {(data?.statusDistribution || []).map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {(data?.statusDistribution || []).map((status: any, i: number) => (
                            <div key={i} className="text-center p-2 bg-gray-50 rounded-xl">
                                <span className="block text-[12px] font-black text-gray-900">{status.value}</span>
                                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wide">{status.name.slice(0, 8)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Methods Chart */}
                <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm flex flex-col md:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                                <CreditCard className="h-5 w-5" />
                            </div>
                            <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Modes de Paiement</h3>
                        </div>
                        <div className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            Volumes
                        </div>
                    </div>
                    <div className="flex-1 w-full min-h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data?.paymentMethods || []} layout="vertical" margin={{ left: 0, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fontWeight: 700, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={20}>
                                    {(data?.paymentMethods || []).map((_: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#f59e0b' : '#fbbf24'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 5. Top Products Leaderboard */}
            <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-gray-900">Produits les plus vendus</h3>
                    <Button variant="ghost" className="text-amber-600 text-[12px] font-bold hover:bg-amber-50 rounded-lg">Voir Tout</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Produit</th>
                                <th className="text-center py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Ventes</th>
                                <th className="text-right py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Revenu</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-4">
                            {(data?.topProducts || []).map((product: any, i: number) => (
                                <tr key={i} className="group hover:bg-gray-50/50 transition-all border-b border-gray-50/50 last:border-0">
                                    <td className="py-4 px-6 flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-gray-100 overflow-hidden relative shadow-sm group-hover:scale-110 transition-transform">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
                                        </div>
                                        <div>
                                            <span className="block text-[13px] font-bold text-gray-900">{product.name}</span>
                                            <span className="block text-[11px] font-medium text-gray-400">Ref: #{1000 + i}</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-6">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-black uppercase tracking-wide">
                                            {product.sales} Ventes
                                        </span>
                                    </td>
                                    <td className="text-right py-4 px-6">
                                        <span className="text-[14px] font-black text-gray-900 tabular-nums">{product.revenue}</span>
                                    </td>
                                </tr>
                            ))}
                            {(data?.topProducts?.length === 0) && (
                                <tr>
                                    <td colSpan={3} className="py-12 text-center text-[13px] text-gray-400 font-medium italic">
                                        Aucun produit star sur cette période...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
