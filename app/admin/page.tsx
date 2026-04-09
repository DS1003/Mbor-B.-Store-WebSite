"use client"

import nextDynamic from "next/dynamic"

// Deeply skip SSR for the dashboard to prevent charting-related build crashes
const DashboardClient = nextDynamic(() => import("./DashboardClient"), { ssr: false })

export default function AdminPage() {
    return <DashboardClient />
}
