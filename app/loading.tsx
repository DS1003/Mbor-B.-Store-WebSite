import { Star } from "lucide-react"

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <div className="relative">
                {/* Outer pulsing ring */}
                <div className="h-24 w-24 border-2 border-primary/20 rounded-full animate-pulse absolute inset-0" />

                {/* Inner spinning ring */}
                <div className="h-24 w-24 border-t-2 border-primary rounded-full animate-spin flex items-center justify-center">
                    <Star className="h-8 w-8 text-primary animate-pulse" />
                </div>
            </div>

            <div className="mt-8 space-y-2 text-center">
                <h2 className="text-xl font-heading font-bold tracking-tight animate-pulse">
                    Mbor<span className="text-primary italic">.Store</span>
                </h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    Chargement de l'excellence...
                </p>
            </div>
        </div>
    )
}
