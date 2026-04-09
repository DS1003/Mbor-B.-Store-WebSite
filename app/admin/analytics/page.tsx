"use client"

import dynamic from "next/dynamic"

export const dynamic = 'force-dynamic'

// Deeply skip SSR for the entire analytics page to resolve the Recharts/Prerender crash
const AnalyticsClient = dynamic(() => import("./AnalyticsClient"), { ssr: false })

export default function AnalyticsPage() {
    return <AnalyticsClient />
}
