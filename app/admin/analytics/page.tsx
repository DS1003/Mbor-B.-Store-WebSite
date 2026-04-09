"use client"

import nextDynamic from "next/dynamic"

// Deeply skip SSR for the entire analytics page to resolve the Recharts/Prerender crash
const AnalyticsClient = nextDynamic(() => import("./AnalyticsClient"), { ssr: false })

export default function AnalyticsPage() {
    return <AnalyticsClient />
}
