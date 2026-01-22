"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

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

    return {
        revenue: totalRevenue._sum.total?.toNumber() || 0,
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

    return orders.map(order => ({
        ...order,
        total: order.total.toNumber()
    }))
}

export async function getAdminProducts() {
    const products = await prisma.product.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            category: true
        }
    })

    return products.map(product => ({
        ...product,
        price: product.price.toNumber(),
        discountPrice: product.discountPrice?.toNumber() || null
    }))
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

    return orders.map(order => ({
        ...order,
        total: order.total.toNumber(),
        items: order.items.map(item => ({
            ...item,
            price: item.price.toNumber(),
            product: {
                ...item.product,
                price: item.product.price.toNumber(),
                discountPrice: item.product.discountPrice?.toNumber() || null
            }
        }))
    }))
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

    if (!order) return null

    return {
        ...order,
        total: order.total.toNumber(),
        items: order.items.map(item => ({
            ...item,
            price: item.price.toNumber(),
            product: {
                ...item.product,
                price: item.product.price.toNumber(),
                discountPrice: item.product.discountPrice?.toNumber() || null
            }
        }))
    }
}

export async function updateOrderStatus(orderId: string, status: any) {
    await prisma.order.update({
        where: { id: orderId },
        data: { status }
    })
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
    if (!product) return null
    return {
        ...product,
        price: product.price.toNumber(),
        discountPrice: product.discountPrice?.toNumber() || null
    }
}

export async function createProduct(data: any) {
    const { category, ...rest } = data
    const product = await prisma.product.create({
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
    revalidatePath('/admin/products')
    revalidatePath('/admin/stock')
    return {
        ...product,
        price: product.price.toNumber(),
        discountPrice: product.discountPrice?.toNumber() || null
    }
}

export async function updateProduct(id: string, data: any) {
    const { category, ...rest } = data
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
    revalidatePath('/admin/products')
    revalidatePath('/admin/stock')
    return {
        ...product,
        price: product.price.toNumber(),
        discountPrice: product.discountPrice?.toNumber() || null
    }
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

export async function getStoreConfig() {
    let config = await prisma.storeConfig.findUnique({
        where: { id: 'singleton' }
    })

    if (!config) {
        config = await prisma.storeConfig.create({
            data: { id: 'singleton' }
        })
    }

    return {
        ...config,
        deliveryFee: config.deliveryFee.toNumber(),
        freeDeliveryOver: config.freeDeliveryOver.toNumber()
    }
}

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
            freeDeliveryOver: freeDeliveryOver !== undefined ? Number(freeDeliveryOver) : 50000
        }
    })
    revalidatePath('/admin/settings')
    return {
        ...config,
        deliveryFee: config.deliveryFee.toNumber(),
        freeDeliveryOver: config.freeDeliveryOver.toNumber()
    }
}
export async function createInStoreOrder(data: {
    customerName: string,
    customerEmail?: string,
    customerPhone?: string,
    customerAddress?: string,
    items: { productId: string, quantity: number, price: number, customName?: string, customNumber?: string }[],
    total: number
}) {
    const order = await prisma.order.create({
        data: {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            customerAddress: data.customerAddress,
            status: "PAID", // In-store orders are usually paid immediately
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
            items: true
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

    revalidatePath('/admin/orders')
    revalidatePath('/admin/stock')
    revalidatePath('/admin')

    return {
        ...order,
        total: order.total.toNumber(),
        items: order.items.map(item => ({
            ...item,
            price: item.price.toNumber()
        }))
    }
}
