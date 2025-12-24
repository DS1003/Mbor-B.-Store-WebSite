"use client"

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts"

const data = [
    { name: "MON", total: 120000 },
    { name: "TUE", total: 180000 },
    { name: "WED", total: 150000 },
    { name: "THU", total: 280000 },
    { name: "FRI", total: 200000 },
    { name: "SAT", total: 350000 },
    { name: "SUN", total: 420000 },
]

export function SalesChart() {
    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 9, fontWeight: 900, fill: '#52525b', letterSpacing: '0.1em' }}
                        dy={20}
                    />
                    <YAxis
                        hide
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#000',
                            border: '1px solid #27272a',
                            borderRadius: '12px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                        }}
                        itemStyle={{ fontSize: '11px', fontWeight: 900, color: '#FFD700', textTransform: 'uppercase' }}
                        labelStyle={{ fontSize: '10px', fontWeight: 900, color: '#52525b', marginBottom: '4px', textTransform: 'uppercase' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#FFD700"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                        animationDuration={2000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
