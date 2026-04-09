"use client"

import dynamic from "next/dynamic"

// Deeply skip SSR for the dashboard to prevent charting-related build crashes
const DashboardClient = dynamic(() => import("./DashboardClient"), { ssr: false })

export default function AdminPage() {
    return <DashboardClient />
}
