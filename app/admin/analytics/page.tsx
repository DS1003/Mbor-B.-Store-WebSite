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

const revenueData = [
    { name: 'Jan', value: 450000 },
    { name: 'Fév', value: 380000 },
    { name: 'Mar', value: 620000 },
    { name: 'Avr', value: 480000 },
    { name: 'Mai', value: 750000 },
    { name: 'Juin', value: 580000 },
]

const categoryData = [
    { name: 'Maillots', value: 40, color: '#4f46e5' },
    { name: 'Sneakers', value: 30, color: '#10b981' },
    { name: 'Survêtements', value: 20, color: '#f59e0b' },
    { name: 'Accessoires', value: 10, color: '#ef4444' },
]

export default function AdminAnalyticsPage() {
    const stats = [
        { label: "Chiffre d'affaires", value: "2.8M F", trend: "+14.2%", up: true, icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Panier Moyen", value: "42.5k F", trend: "+5.1%", up: true, icon: Target, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Nouveaux Clients", value: "142", trend: "+12.5%", up: true, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Taux Conversion", value: "3.2%", trend: "-0.4%", up: false, icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Laboratoire <span className="text-indigo-600">Données.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Analyse structurelle des performances et prévisions algorithmiques.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-6 rounded-2xl text-[12px] font-bold border-gray-100 hover:bg-white hover:shadow-xl transition-all flex items-center gap-2 uppercase tracking-widest bg-white">
                        <Calendar className="h-4 w-4 text-gray-400" /> Jan 2026
                    </Button>
                    <Button className="h-11 px-6 rounded-2xl bg-gray-900 text-white text-[12px] font-bold hover:bg-black hover:shadow-2xl transition-all flex items-center gap-2 uppercase tracking-widest shadow-xl">
                        <Download className="h-4 w-4" /> Rapport Expert
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
                            <div className={cn(
                                "flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                stat.up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                            )}>
                                {stat.trend}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                            <h3 className="text-2xl font-black tracking-tighter text-gray-900 italic">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Curve Chart */}
                <div className="lg:col-span-8">
                    <div className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <TrendingUp className="h-32 w-32" />
                        </div>

                        <div className="flex items-center justify-between mb-12 relative z-10">
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-gray-900 uppercase italic">Dynamique des Flux Ventes</h3>
                                <p className="text-[12px] text-gray-400 font-medium">Audit semestriel de la croissance brute.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-indigo-500" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Revenue 2026</span>
                            </div>
                        </div>

                        <div className="h-[400px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }}
                                        dy={20}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }}
                                        tickFormatter={(value) => `${value / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}
                                        labelStyle={{ marginBottom: '5px', fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4f46e5"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Vertical Segments */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <PieChartIcon className="h-24 w-24" />
                        </div>

                        <div className="space-y-1 mb-10 relative z-10">
                            <h3 className="text-xl font-black text-gray-900 uppercase italic leading-tight">Segmentation <span className="text-indigo-600">Univers.</span></h3>
                        </div>

                        <div className="h-[250px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {categoryData.map((cat, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                                        <span className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">{cat.name}</span>
                                    </div>
                                    <span className="text-[13px] font-black text-gray-900">{cat.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-950 rounded-[2.5rem] p-10 space-y-6 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity className="h-20 w-20 text-white" />
                        </div>
                        <div className="space-y-1 relative z-10">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Flux Temps-Réel</h4>
                            <h3 className="text-xl font-black text-white uppercase italic">Audit d'Interaction</h3>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative z-10">
                            <div className="h-full bg-indigo-500 w-[84%] rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                        </div>
                        <div className="flex justify-between items-center relative z-10">
                            <span className="text-[13px] font-black text-white italic">Score Engagement</span>
                            <span className="text-[13px] font-black text-indigo-400">84/100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
