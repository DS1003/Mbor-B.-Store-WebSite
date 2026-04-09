"use client"

import React from 'react'

// Conditional import to prevent SSR errors
const Recharts = typeof window !== 'undefined' ? require('recharts') : null

export function RevenueChart({ data }: { data: any[] }) {
    if (!Recharts) return <div className="h-full w-full bg-gray-50 animate-pulse rounded-2xl" />
    
    const { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } = Recharts

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} tickFormatter={(value: number) => `${value / 1000}k`} />
                <Tooltip
                    cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#1f2937' }}
                />
                <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export function CategoryPieChart({ data }: { data: any[] }) {
    if (!Recharts) return <div className="h-full w-full bg-gray-50 animate-pulse rounded-2xl" />
    
    const { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } = Recharts

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {data.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            </PieChart>
        </ResponsiveContainer>
    )
}

export function OrderHealthChart({ data }: { data: any[] }) {
    if (!Recharts) return <div className="h-full w-full bg-gray-50 animate-pulse rounded-2xl" />
    
    const { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } = Recharts

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value" startAngle={180} endAngle={0}>
                    {data.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            </PieChart>
        </ResponsiveContainer>
    )
}

export function PaymentMethodsChart({ data }: { data: any[] }) {
    if (!Recharts) return <div className="h-full w-full bg-gray-50 animate-pulse rounded-2xl" />
    
    const { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } = Recharts

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fontWeight: 700, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={20}>
                    {data.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#f59e0b' : '#fbbf24'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}
