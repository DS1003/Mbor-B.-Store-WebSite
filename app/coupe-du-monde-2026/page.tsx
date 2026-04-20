import { Suspense } from "react"
import { getProducts } from "@/lib/actions/public"
import { WorldCupClient } from "./world-cup-client"

export const metadata = {
    title: "Coupe du Monde 2026 — Équipes Nationales | Mbor B. Store",
    description: "Collection exclusive de maillots des équipes nationales pour la Coupe du Monde FIFA 2026. USA, Mexique, Canada — Représentez votre nation avec style !",
}

export default async function WorldCup2026Page() {
    // Fetch maillot products for display
    const { products } = await getProducts({ category: "maillot", take: 50 })

    return (
        <Suspense fallback={<WorldCupSkeleton />}>
            <WorldCupClient products={products} />
        </Suspense>
    )
}

function WorldCupSkeleton() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-bold text-muted-foreground animate-pulse tracking-widest uppercase">
                    Chargement...
                </p>
            </div>
        </div>
    )
}
