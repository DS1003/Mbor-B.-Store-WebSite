"use server"

import { prisma } from "@/lib/prisma"

import { unstable_cache } from "next/cache"

// Helper to fetch active promotions
export const getActivePromotions = unstable_cache(
    async () => {
        const now = new Date()
        const promos = await prisma.promotion.findMany({
            where: {
                isActive: true,
                OR: [
                    { startDate: null, endDate: null },
                    { startDate: { lte: now }, endDate: null },
                    { startDate: null, endDate: { gte: now } },
                    { startDate: { lte: now }, endDate: { gte: now } }
                ]
            }
        })
        return promos.map(p => ({
            ...p,
            discount: Number(p.discount || 0)
        }))
    },
    ['active-promotions'],
    { tags: ['promotions'], revalidate: 30 }
)

// Serialize products with promotion awareness
export async function serializeProduct(p: any, promos: any[] = []) {
    const basePrice = Number(p.price)
    let finalPrice = basePrice
    let activeDiscount = 0

    // Check for applicable promotions
    const activeNow = new Date()
    const applicable = (promos || []).filter(promo => {
        if (promo.isActive === false) return false
        
        // Exact date check within serialization to handle cache windows
        if (promo.startDate && new Date(promo.startDate) > activeNow) return false
        if (promo.endDate && new Date(promo.endDate) < activeNow) return false

        if (promo.isGlobal) return true
        if (p.id && promo.productIds?.includes(p.id)) return true
        if (p.categoryId && promo.categoryIds?.includes(p.categoryId)) return true
        return false
    })

    if (applicable.length > 0) {
        // Pick the highest discount percentage
        activeDiscount = Math.max(...applicable.map((pr: any) => pr.discount))
        finalPrice = basePrice * (1 - (activeDiscount / 100))
    }

    // Individual discountPrice (manual) is now IGNORED as requested to use dynamic promos only

    return {
        id: p.id,
        name: p.name,
        price: finalPrice,
        originalPrice: activeDiscount > 0 ? basePrice : undefined,
        discountPercent: activeDiscount > 0 ? activeDiscount : undefined,
        category: p.category?.name || "Sans catégorie",
        description: p.description || "",
        images: p.images || [],
        image: p.images?.[0] || "",
        isNew: true,
        expiresAt: applicable.length > 0 ? Math.min(...applicable.map(pr => pr.endDate ? new Date(pr.endDate).getTime() : Infinity)) : null,
        allowFlocage: p.allowFlocage || false,
        sizes: p.sizes?.map((s: any) => ({ size: s.size, stock: s.stock })) || []
    }
}

export async function quickSearchProducts(query: string) {
    if (!query || query.length < 2) return []

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ]
        },
        select: {
            id: true,
            name: true,
            price: true,
            images: true,
            category: {
                select: { name: true }
            }
        },
        take: 5
    })

    return products.map(p => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        category: p.category?.name || "Sans catégorie",
        image: p.images[0] || "",
    }))
}


export const getFeaturedProducts = unstable_cache(
    async () => {
        const [products, activePromos] = await Promise.all([
            prisma.product.findMany({
                where: { featured: true },
                include: { category: true },
                take: 4
            }),
            getActivePromotions()
        ])
        return Promise.all(products.map(p => serializeProduct(p, activePromos)))
    },
    ['featured-products'],
    { tags: ['products', 'featured', 'promotions'], revalidate: 60 }
)

export const getProducts = unstable_cache(
    async (params: {
        category?: string
        categoryFilter?: string
        size?: string
        minPrice?: string
        maxPrice?: string
        sort?: string
        take?: number
        skip?: number
        query?: string
    }) => {
        const { category, categoryFilter, size, minPrice, maxPrice, sort, take = 12, skip = 0, query } = params

        const where: any = {}

        // Search query
        if (query) {
            where.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ]
        }

        // Use AND for multiple category filters if needed
        const categoryConditions: any[] = []
        if (params.category) {
            categoryConditions.push({ name: { contains: params.category, mode: 'insensitive' } })
        }
        if (params.categoryFilter) {
            categoryConditions.push({ name: { contains: params.categoryFilter, mode: 'insensitive' } })
        }

        if (categoryConditions.length > 0) {
            where.category = { AND: categoryConditions }
        }

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

        const [products, totalCount, activePromos] = await Promise.all([
            prisma.product.findMany({
                where,
                orderBy,
                include: { category: true },
                take,
                skip
            }),
            prisma.product.count({ where }),
            getActivePromotions()
        ])

        return {
            products: await Promise.all(products.map(p => serializeProduct(p, activePromos))),
            totalCount
        }
    },
    ['shop-products'],
    { tags: ['products', 'promotions'], revalidate: 60 }
)

export const getRelatedProducts = unstable_cache(
    async (productId: string, categoryId?: string) => {
        const [products, activePromos] = await Promise.all([
            prisma.product.findMany({
                where: {
                    id: { not: productId },
                    categoryId: categoryId || undefined
                },
                include: { category: true },
                take: 4,
                orderBy: { createdAt: 'desc' }
            }),
            getActivePromotions()
        ])
        return Promise.all(products.map(p => serializeProduct(p, activePromos)))
    },
    ['related-products'],
    { tags: ['products', 'promotions'], revalidate: 60 }
)

export const getCategories = unstable_cache(
    async () => {
        const categories = await prisma.category.findMany({
            select: { name: true },
            orderBy: { name: 'asc' }
        })
        return categories.map(c => c.name)
    },
    ['categories-list'],
    { tags: ['categories'], revalidate: 3600 }
)
