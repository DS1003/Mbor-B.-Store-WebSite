import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"

export async function ShopProductGrid() {
    const productsFromDb = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
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
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                <p className="text-xl font-bold tracking-tight">Aucun produit trouvé</p>
                <p className="text-muted-foreground">Essayez de modifier vos filtres ou revenez plus tard.</p>
            </div>
        )
    }

    return (
        <div className="lg:col-span-3 space-y-20">
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product, i) => (
                    <ScrollReveal key={product.id} delay={i * 0.05} distance={20}>
                        <ProductCard {...product} />
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
        <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-[2.5rem]" />
                ))}
            </div>
        </div>
    )
}
