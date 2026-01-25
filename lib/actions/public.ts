import { prisma } from "@/lib/prisma"
import { unstable_cache } from "next/cache"

// Serialize products for safe client-side use
function serializeProduct(p: any) {
    return {
        id: p.id,
        name: p.name,
        price: Number(p.price),
        category: p.category?.name || "Sans catégorie",
        image: p.images[0] || "",
        isNew: true
    }
}

export const getFeaturedProducts = unstable_cache(
    async () => {
        const products = await prisma.product.findMany({
            where: { featured: true },
            include: { category: true },
            take: 4
        })
        return products.map(serializeProduct)
    },
    ['featured-products'],
    { tags: ['products', 'featured'], revalidate: 3600 }
)

export const getProducts = unstable_cache(
    async (params: {
        category?: string
        size?: string
        minPrice?: string
        maxPrice?: string
        sort?: string
        take?: number
        skip?: number
    }) => {
        const { category, size, minPrice, maxPrice, sort, take = 12, skip = 0 } = params

        const where: any = {}
        if (category) where.category = { name: category }
        if (size) where.sizes = { some: { size: size } }
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

        const products = await prisma.product.findMany({
            where,
            orderBy,
            include: { category: true },
            take,
            skip
        })

        const totalCount = await prisma.product.count({ where })

        return {
            products: products.map(serializeProduct),
            totalCount
        }
    },
    ['shop-products'],
    { tags: ['products'], revalidate: 600 }
)

export const getRelatedProducts = unstable_cache(
    async (productId: string, categoryId?: string) => {
        const products = await prisma.product.findMany({
            where: {
                id: { not: productId },
                categoryId: categoryId || undefined
            },
            include: { category: true },
            take: 4,
            orderBy: { createdAt: 'desc' }
        })
        return products.map(serializeProduct)
    },
    ['related-products'],
    { tags: ['products'], revalidate: 3600 }
)
