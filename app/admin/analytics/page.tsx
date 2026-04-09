import dynamic from "next/dynamic"

// Deeply skip SSR for the entire analytics page to resolve the Recharts/Prerender crash
const AnalyticsClient = dynamic(() => import("./AnalyticsClient"), { ssr: false })

export default function AnalyticsPage() {
    return <AnalyticsClient />
}
