import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ShopProductGridProps {
    searchParams: {
        category?: string
        size?: string
        minPrice?: string
        maxPrice?: string
        sort?: string
        view?: "grid" | "list"
    }
}

export async function ShopProductGrid({ searchParams }: ShopProductGridProps) {
    const { category, size, minPrice, maxPrice, sort, view = "grid" } = searchParams

    // Build Prisma query
    const where: any = {}

    if (category) {
        where.category = { name: category }
    }

    if (size) {
        where.sizes = { some: { size: size } }
    }

    if (minPrice || maxPrice) {
        where.price = {
            gte: minPrice ? Number(minPrice) : undefined,
            lte: maxPrice ? Number(maxPrice) : undefined,
        }
    }

    let orderBy: any = { createdAt: "desc" }
    if (sort === "price_asc") orderBy = { price: "asc" }
    if (sort === "price_desc") orderBy = { price: "desc" }
    if (sort === "oldest") orderBy = { createdAt: "asc" }

    const productsFromDb = await prisma.product.findMany({
        where,
        orderBy,
        include: { category: true }
    })

    const products = productsFromDb.map(p => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        category: p.category?.name || "Sans catégorie",
        image: p.images[0] || "/placeholder.svg",
        isNew: true
    }))

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                <div className="h-20 w-20 bg-muted/30 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🔎</span>
                </div>
                <div className="space-y-2">
                    <p className="text-2xl font-black italic tracking-tighter">Aucun résultat trouvé</p>
                    <p className="text-muted-foreground font-medium max-w-xs mx-auto text-sm leading-relaxed">
                        Désolé, nous n'avons trouvé aucun produit correspondant à vos filtres actuels.
                    </p>
                </div>
                <Button variant="outline" className="rounded-xl font-bold tracking-tight">
                    Effacer tout
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-20">
            <div className={cn(
                "grid gap-x-6 gap-y-12",
                view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
            )}>
                {products.map((product, i) => (
                    <ScrollReveal key={product.id} delay={i * 0.05} distance={20}>
                        <div className="h-full">
                            <ProductCard {...product} />
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center pt-12">
                <ScrollReveal direction="up">
                    <Button variant="outline" className="h-14 px-12 rounded-2xl text-[13px] font-bold tracking-tight border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-95 shadow-md">
                        Charger plus de produits
                    </Button>
                </ScrollReveal>
            </div>
        </div>
    )
}

export function ShopProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-[2.5rem]" />
            ))}
        </div>
    )
}

