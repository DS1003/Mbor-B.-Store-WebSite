"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath, unstable_cache } from "next/cache"

// Helpers to serialize Decimal types safely
function serializeProduct(product: any) {
    if (!product) return null
    try {
        return {
            ...product,
            price: product.price ? (typeof product.price.toNumber === 'function' ? product.price.toNumber() : Number(product.price)) : 0,
            discountPrice: product.discountPrice ? (typeof product.discountPrice.toNumber === 'function' ? product.discountPrice.toNumber() : Number(product.discountPrice)) : null
        }
    } catch (e) {
        console.error("Serialization error for product:", product.id, e)
        return { ...product, price: 0, discountPrice: null }
    }
}

function serializeOrder(order: any) {
    if (!order) return null
    try {
        return {
            ...order,
            total: order.total ? (typeof order.total.toNumber === 'function' ? order.total.toNumber() : Number(order.total)) : 0,
            deliveryFee: order.deliveryFee ? (typeof order.deliveryFee.toNumber === 'function' ? order.deliveryFee.toNumber() : Number(order.deliveryFee)) : 0,
            items: order.items?.map((item: any) => ({
                ...item,
                price: item.price ? (typeof item.price.toNumber === 'function' ? item.price.toNumber() : Number(item.price)) : 0,
                product: serializeProduct(item.product)
            })) || []
        }
    } catch (e) {
        console.error("Serialization error for order:", order.id, e)
        return { ...order, total: 0, deliveryFee: 0, items: [] }
    }
}

export async function getDashboardStats() {
    const [totalRevenue, ordersCount, productsCount, usersCount] = await Promise.all([
        prisma.order.aggregate({
            _sum: {
                total: true
            },
            where: {
                status: "PAID"
            }
        }),
        prisma.order.count(),
        prisma.product.count(),
        prisma.user.count({
            where: {
                role: "USER"
            }
        })
    ])

    const revenueDecimal = totalRevenue._sum.total
    const revenue = revenueDecimal ? (typeof revenueDecimal.toNumber === 'function' ? revenueDecimal.toNumber() : Number(revenueDecimal)) : 0

    return {
        revenue,
        orders: ordersCount,
        products: productsCount,
        users: usersCount
    }
}

export async function getRecentOrders(limit = 5) {
    const orders = await prisma.order.findMany({
        take: limit,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: true
        }
    })

    return orders.map(order => serializeOrder(order))
}

export async function getAdminProducts() {
    const products = await prisma.product.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            category: true,
            sizes: true
        }
    })

    return products.map(product => serializeProduct(product))
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id }
    })
    revalidatePath('/admin/products')
    revalidatePath('/admin/stock')
}

export async function getAdminOrders() {
    const orders = await prisma.order.findMany({
        take: 200,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: true,
            items: {
                include: {
                    product: true
                }
            }
        }
    })

    return orders.map(order => serializeOrder(order))
}

export async function getAdminOrder(id: string) {
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            user: true,
            items: {
                include: {
                    product: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        }
    })

    return serializeOrder(order)
}

export async function updateOrderStatus(orderId: string, status: any) {
    const order = await prisma.order.update({
        where: { id: orderId },
        data: { status }
    })

    await createAdminLog(
        "Mise à jour Statut",
        `Commande #${order.id.slice(-6).toUpperCase()} passée à ${status}`,
        "Admin"
    )

    revalidatePath('/admin/orders')
}

export async function getAdminCustomers() {
    return prisma.user.findMany({
        where: {
            role: "USER"
        },
        include: {
            _count: {
                select: { orders: true }
            }
        }
    })
}

export async function getCategories() {
    return prisma.category.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        }
    })
}

export async function createCategory(data: any) {
    const category = await prisma.category.create({ data })
    revalidatePath('/admin/categories')
    return category
}

export async function updateCategory(id: string, data: any) {
    const category = await prisma.category.update({
        where: { id },
        data
    })
    revalidatePath('/admin/categories')
    return category
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({ where: { id } })
    revalidatePath('/admin/categories')
}

export async function getProduct(id: string) {
    const product = await prisma.product.findUnique({
        where: { id }
    })
    return serializeProduct(product)
}

export async function createProduct(data: any) {
    const { category, sizes, ...rest } = data
    const product = await prisma.product.create({
        data: {
            ...rest,
            price: Number(data.price),
            discountPrice: data.discountPrice ? Number(data.discountPrice) : null,
            stock: Number(data.stock),
            featured: Boolean(data.featured),
            allowFlocage: Boolean(data.allowFlocage),
            allowGravure: Boolean(data.allowGravure),
            sizes: {
                create: data.sizes?.map((s: any) => ({
                    size: s.size,
                    stock: Number(s.stock)
                })) || []
            }
        }
    })
    revalidatePath('/admin/products')
    revalidatePath('/admin/stock')
    return serializeProduct(product)
}

export async function updateProduct(id: string, data: any) {
    const { category, sizes, ...rest } = data

    // Handle sizes update transactionally with product update
    // First, we update the product fields
    const product = await prisma.product.update({
        where: { id },
        data: {
            ...rest,
            price: Number(data.price),
            discountPrice: data.discountPrice ? Number(data.discountPrice) : null,
            stock: Number(data.stock),
            featured: Boolean(data.featured),
            allowFlocage: Boolean(data.allowFlocage),
            allowGravure: Boolean(data.allowGravure),
        }
    })

    // Then handle sizes
    if (sizes) {
        await prisma.productSize.deleteMany({
            where: { productId: id }
        })

        if (sizes.length > 0) {
            await prisma.productSize.createMany({
                data: sizes.map((s: any) => ({
                    productId: id,
                    size: s.size,
                    stock: Number(s.stock)
                }))
            })
        }
    }

    revalidatePath('/admin/products')
    revalidatePath('/admin/stock')
    return serializeProduct(product)
}

export async function updateStock(id: string, increment: number) {
    const product = await prisma.product.update({
        where: { id },
        data: {
            stock: {
                increment: increment
            }
        }
    })
    revalidatePath('/admin/products')
    revalidatePath('/admin/stock')
    return product
}

export async function deleteOrder(id: string) {
    await prisma.orderItem.deleteMany({ where: { orderId: id } })
    await prisma.order.delete({ where: { id } })
    revalidatePath('/admin/orders')
    revalidatePath('/admin')
}

export async function deleteUser(id: string) {
    await prisma.user.delete({ where: { id } })
    revalidatePath('/admin/customers')
}

export const getStoreConfig = unstable_cache(
    async () => {
        let config = await prisma.storeConfig.findUnique({
            where: { id: 'singleton' }
        })

        if (!config) {
            config = await prisma.storeConfig.create({
                data: {
                    id: 'singleton',
                    name: "Mborbusiness’Store",
                    slogan: "L'excellence du sport et de la mode urbaine au Sénégal.",
                    description: "Mborbusiness’Store est une boutique spécialisée dans les équipements de sport, maillots, crampons, sneakers et streetwear. Livraison rapide à Dakar et à l’international. Paiement sécurisé via Wave et Orange Money.",
                    contactPhone: "+221 77 427 23 54",
                    whatsappNumber: "+221 78 593 48 86",
                    instagramUrl: "@MborbusinessstoreSN",
                    facebookUrl: "Mbor Business Center",
                    address: "Boutique 1 : Pikine, Boutique 2 : Sacré-Cœur",
                    deliveryFee: 2000,
                    freeDeliveryOver: 50000,
                    primaryColor: "#4F46E5",
                    secondaryColor: "#111827",
                    accentColor: "#F59E0B",
                    fontFamily: "Inter"
                }
            })
        }

        return {
            ...config,
            deliveryFee: config.deliveryFee ? (typeof config.deliveryFee.toNumber === 'function' ? config.deliveryFee.toNumber() : Number(config.deliveryFee)) : 0,
            freeDeliveryOver: config.freeDeliveryOver ? (typeof config.freeDeliveryOver.toNumber === 'function' ? config.freeDeliveryOver.toNumber() : Number(config.freeDeliveryOver)) : 0
        }
    },
    ['store-config'],
    { tags: ['config'], revalidate: 3600 }
)

export async function updateStoreConfig(data: any) {
    const { deliveryFee, freeDeliveryOver, ...rest } = data
    const config = await prisma.storeConfig.upsert({
        where: { id: 'singleton' },
        update: {
            ...rest,
            deliveryFee: deliveryFee !== undefined ? Number(deliveryFee) : undefined,
            freeDeliveryOver: freeDeliveryOver !== undefined ? Number(freeDeliveryOver) : undefined
        },
        create: {
            id: 'singleton',
            ...rest,
            deliveryFee: deliveryFee !== undefined ? Number(deliveryFee) : 2000,
            freeDeliveryOver: freeDeliveryOver !== undefined ? Number(freeDeliveryOver) : 50000,
            primaryColor: data.primaryColor || "#4F46E5",
            secondaryColor: data.secondaryColor || "#111827",
            accentColor: data.accentColor || "#F59E0B",
            fontFamily: data.fontFamily || "Inter"
        }
    })
    revalidatePath('/admin/settings')
    revalidatePath('/', 'layout') // Revalidate everything using config
    return {
        ...config,
        deliveryFee: config.deliveryFee ? (typeof config.deliveryFee.toNumber === 'function' ? config.deliveryFee.toNumber() : Number(config.deliveryFee)) : 0,
        freeDeliveryOver: config.freeDeliveryOver ? (typeof config.freeDeliveryOver.toNumber === 'function' ? config.freeDeliveryOver.toNumber() : Number(config.freeDeliveryOver)) : 0
    }
}

// These are now at the top

export async function createInStoreOrder(data: {
    customerName: string,
    customerEmail?: string,
    customerPhone?: string,
    customerAddress?: string,
    paymentMethod?: string,
    deliveryType?: string,
    deliveryFee?: number,
    items: { productId: string, quantity: number, price: number, customName?: string, customNumber?: string }[],
    total: number
}) {
    const order = await prisma.order.create({
        data: {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            customerAddress: data.customerAddress,
            paymentMethod: data.paymentMethod,
            deliveryType: data.deliveryType,
            deliveryFee: data.deliveryFee,
            status: "PAID",
            total: data.total,
            items: {
                create: data.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    customName: item.customName,
                    customNumber: item.customNumber
                }))
            }
        },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        }
    })

    // Update stock levels
    for (const item of data.items) {
        await prisma.product.update({
            where: { id: item.productId },
            data: {
                stock: {
                    decrement: item.quantity
                }
            }
        })
    }

    await createAdminLog(
        "Vente Boutique",
        `Nouvelle vente de ${data.total.toLocaleString()} F pour ${data.customerName}`,
        "Vendeur Boutique"
    )

    revalidatePath('/admin/orders')
    revalidatePath('/admin/stock')

    return serializeOrder(order)
}

export async function getNotifications() {
    const [recentOrders, recentUsers] = await Promise.all([
        prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: true }
        }),
        prisma.user.findMany({
            where: { role: 'USER' },
            take: 5,
            orderBy: { createdAt: 'desc' }
        })
    ])

    const notifications = [
        ...recentOrders.map(o => {
            const total = o.total ? (typeof o.total.toNumber === 'function' ? o.total.toNumber() : Number(o.total)) : 0
            return {
                id: `order-${o.id}`,
                type: 'ORDER',
                title: `Nouvelle commande #${o.id.slice(-4).toUpperCase()}`,
                description: `${o.customerName || o.user?.name || 'Client'} • ${total.toLocaleString()} FCFA`,
                time: o.createdAt,
                icon: 'ShoppingCart',
                color: 'text-blue-600',
                bg: 'bg-blue-50'
            }
        }),
        ...recentUsers.map(u => ({
            id: `user-${u.id}`,
            type: 'USER',
            title: 'Nouveau client inscrit',
            description: `${u.name || (u.email ? u.email.split('@')[0] : 'Inconnu')}`,
            time: u.createdAt,
            icon: 'Users',
            color: 'text-green-600',
            bg: 'bg-green-50'
        }))
    ].sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 5)

    return notifications
}

export async function getMediaItems() {
    return prisma.media.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function createMediaItem(data: any) {
    const media = await prisma.media.create({
        data: {
            name: data.name,
            url: data.url,
            publicId: data.publicId,
            format: data.format,
            width: Number(data.width),
            height: Number(data.height),
            size: Number(data.size)
        }
    })
    revalidatePath('/admin/media')
    return media
}

export async function deleteMediaItem(id: string) {
    await prisma.media.delete({ where: { id } })
    revalidatePath('/admin/media')
}

export async function getAdminLogs() {
    try {
        if (!prisma || !('adminLog' in prisma)) {
            console.error("Prisma model 'adminLog' is missing")
            return []
        }
        return await (prisma as any).adminLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50
        })
    } catch (error) {
        console.error("Failed to fetch admin logs:", error)
        return []
    }
}

export async function createAdminLog(action: string, details?: string, adminName?: string) {
    try {
        if (!prisma || !('adminLog' in prisma)) return null
        return await (prisma as any).adminLog.create({
            data: { action, details, adminName }
        })
    } catch (e) {
        console.error("Failed to create admin log:", e)
        return null
    }
}

export async function getPromotions() {
    try {
        if (!prisma || !('promotion' in prisma)) {
            console.error("Prisma model 'promotion' is missing")
            return []
        }
        const promos = await (prisma as any).promotion.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return promos.map((p: any) => ({
            ...p,
            discount: p.discount ? Number(p.discount) : null
        }))
    } catch (error) {
        console.error("Failed to fetch promotions:", error)
        return []
    }
}

export async function createPromotion(data: any) {
    try {
        if (!prisma || !('promotion' in prisma)) return null
        const promo = await (prisma as any).promotion.create({
            data: {
                ...data,
                discount: data.discount ? Number(data.discount) : null,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
            }
        })
        revalidatePath('/admin')
        return { ...promo, discount: promo.discount ? Number(promo.discount) : null }
    } catch (e) {
        console.error("Failed to create promotion:", e)
        return null
    }
}

export async function updatePromotion(id: string, data: any) {
    try {
        if (!prisma || !('promotion' in prisma)) return null
        const promo = await (prisma as any).promotion.update({
            where: { id },
            data: {
                ...data,
                discount: data.discount ? Number(data.discount) : null,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
            }
        })
        revalidatePath('/admin')
        return { ...promo, discount: promo.discount ? Number(promo.discount) : null }
    } catch (e) {
        console.error("Failed to update promotion:", e)
        return null
    }
}

export async function deletePromotion(id: string) {
    try {
        if (!prisma || !('promotion' in prisma)) return
        await (prisma as any).promotion.delete({ where: { id } })
        revalidatePath('/admin')
    } catch (e) {
        console.error("Failed to delete promotion:", e)
    }
}
