import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://mborbusiness.store'

    // Fetch products from database
    let productUrls: MetadataRoute.Sitemap = []
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                updatedAt: true,
            },
        })

        productUrls = products.map((product) => ({
            url: `${baseUrl}/product/${product.id}`,
            lastModified: product.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    } catch (error) {
        console.error('Sitemap product fetch failed', error)
    }

    const routes = [
        '',
        '/shop',
        '/contact',
        '/guide-des-tailles',
        '/faq',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }))

    return [...routes, ...productUrls]
}
