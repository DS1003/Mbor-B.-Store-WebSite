import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { getRelatedProducts } from "@/lib/actions/public"

export async function RelatedProducts({ productId, categoryId }: { productId?: string, categoryId?: string }) {
    const products = await getRelatedProducts(productId || "", categoryId)

    if (products.length === 0) return null

    return (
        <div className="space-y-16">
            <ScrollReveal direction="down" className="flex flex-col items-center text-center space-y-6">
                <span className="text-[11px] font-bold tracking-tight text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest">VOUS DEVRIEZ AIMER</span>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
                    Articles recommandés <br /> <span className="text-primary italic">Mbor Store</span>
                </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-4 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4 px-4 overflow-visible">
                {products.map((product, i) => (
                    <ScrollReveal key={product.id} delay={i * 0.15}>
                        <ProductCard {...product} />
                    </ScrollReveal>
                ))}
            </div>
        </div>
    )
}
