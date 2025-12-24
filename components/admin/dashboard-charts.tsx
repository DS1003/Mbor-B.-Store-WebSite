"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart, CartesianGrid, Cell } from "recharts"

const revenueData = [
    { name: "Jan", total: 150000 },
    { name: "Fév", total: 230000 },
    { name: "Mar", total: 180000 },
    { name: "Avr", total: 320000 },
    { name: "Mai", total: 290000 },
    { name: "Juin", total: 450000 },
    { name: "Juil", total: 410000 },
]

const salesData = [
    { name: "Maillots", sales: 450, color: "#6366f1" },
    { name: "Sneakers", sales: 320, color: "#8b5cf6" },
    { name: "Crampons", sales: 150, color: "#ec4899" },
    { name: "Accessoires", sales: 80, color: "#f43f5e" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-xl">
                <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-bold text-gray-900">
                    {Number(payload[0].value).toLocaleString()}
                    {payload[0].name === "total" ? " F" : " ventes"}
                </p>
            </div>
        )
    }
    return null
}

export function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
            <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-black italic tracking-tighter text-zinc-900 uppercase">Revenus</h3>
                        <p className="text-[10px] text-zinc-400 mt-1 font-bold uppercase tracking-widest">Croissance mensuelle</p>
                    </div>
                    <span className="px-3 py-1 bg-black text-[#FFD700] text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-black/20 transform -rotate-2">
                        +12% vs N-1
                    </span>
                </div>
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#000000" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis
                                dataKey="name"
                                stroke="#9ca3af"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                                fontWeight={700}
                            />
                            <YAxis
                                stroke="#9ca3af"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value / 1000}k`}
                                fontWeight={700}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#000000', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#000000"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#FFD700' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="p-6 border-l border-zinc-100/50">
                <div className="mb-8">
                    <h3 className="text-sm font-black italic tracking-tighter text-zinc-900 uppercase">Performance Catégories</h3>
                    <p className="text-[10px] text-zinc-400 mt-1 font-bold uppercase tracking-widest">Volume de vente par famille</p>
                </div>
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                stroke="#6b7280"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                width={80}
                                fontWeight={700}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="sales" radius={[0, 4, 4, 0]} barSize={24}>
                                {salesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#000000" : "#d4d4d8"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

