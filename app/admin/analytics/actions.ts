"use server"

import { prisma } from "@/lib/prisma"
import {
    startOfMonth, endOfMonth, subMonths, startOfYear,
    endOfYear, subYears, subDays, startOfDay, endOfDay,
    eachDayOfInterval, eachMonthOfInterval, format, differenceInDays,
    isValid
} from "date-fns"
import { fr } from "date-fns/locale"

const formatMoney = (amount: number) => {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M F`
    if (amount >= 1000) return `${(amount / 1000).toFixed(1)}k F`
    return `${amount} F`
}

export type Period = 'this_month' | 'last_month' | 'last_90_days' | 'this_year' | 'all_time'

const getPeriodLabel = (period: Period) => {
    switch (period) {
        case 'this_month': return format(new Date(), 'MMM yyyy', { locale: fr }).toUpperCase()
        case 'last_month': return format(subMonths(new Date(), 1), 'MMM yyyy', { locale: fr }).toUpperCase()
        case 'last_90_days': return '90 DERNIERS JOURS'
        case 'this_year': return format(new Date(), 'yyyy', { locale: fr })
        case 'all_time': return 'TOUT LE TEMPS'
        default: return 'PÉRIODE'
    }
}

export async function getAnalyticsData(period: Period = 'this_month') {
    const today = new Date()

    // Fetch Store Config for Reports
    const storeConfig = await prisma.storeConfig.findFirst()

    let currentStart: Date
    let currentEnd: Date
    let prevStart: Date
    let prevEnd: Date

    // 1. Define Ranges
    switch (period) {
        case 'last_month':
            currentStart = startOfMonth(subMonths(today, 1))
            currentEnd = endOfMonth(subMonths(today, 1))
            prevStart = startOfMonth(subMonths(today, 2))
            prevEnd = endOfMonth(subMonths(today, 2))
            break
        case 'last_90_days':
            currentStart = subDays(today, 90)
            currentEnd = endOfDay(today)
            prevStart = subDays(today, 180)
            prevEnd = subDays(today, 91)
            break
        case 'this_year':
            currentStart = startOfYear(today)
            currentEnd = endOfDay(today)
            prevStart = startOfYear(subYears(today, 1))
            prevEnd = endOfDay(subYears(today, 1))
            break
        case 'all_time':
            currentStart = new Date(0)
            currentEnd = endOfDay(today)
            prevStart = new Date(0)
            prevEnd = new Date(0)
            break
        case 'this_month':
        default:
            currentStart = startOfMonth(today)
            currentEnd = endOfDay(today)
            prevStart = startOfMonth(subMonths(today, 1))
            prevEnd = endOfMonth(subMonths(today, 1))
            break
    }

    // 2. Fetch Aggregates
    const [currentRevenue, prevRevenueData, currentOrdersCount, prevOrdersCountData, currentNewCustomers, prevCustomersData] = await Promise.all([
        prisma.order.aggregate({
            _sum: { total: true },
            where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] }, createdAt: { gte: currentStart, lte: currentEnd } }
        }),
        prisma.order.aggregate({
            _sum: { total: true },
            where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] }, createdAt: { gte: prevStart, lte: prevEnd } }
        }),
        prisma.order.count({
            where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] }, createdAt: { gte: currentStart, lte: currentEnd } }
        }),
        prisma.order.count({
            where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] }, createdAt: { gte: prevStart, lte: prevEnd } }
        }),
        prisma.user.count({
            where: { createdAt: { gte: currentStart, lte: currentEnd }, role: 'USER' }
        }),
        prisma.user.count({
            where: { createdAt: { gte: prevStart, lte: prevEnd }, role: 'USER' }
        })
    ])

    const revenue = Number(currentRevenue._sum.total || 0)
    const prevRevenue = Number(prevRevenueData._sum.total || 0)
    const revenueTrend = prevRevenue === 0 ? (revenue > 0 ? 100 : 0) : ((revenue - prevRevenue) / prevRevenue) * 100

    const aov = currentOrdersCount === 0 ? 0 : revenue / currentOrdersCount
    const prevAov = prevOrdersCountData === 0 ? 0 : prevRevenue / prevOrdersCountData
    const aovTrend = prevAov === 0 ? (aov > 0 ? 100 : 0) : ((aov - prevAov) / prevAov) * 100

    const newCustomers = currentNewCustomers
    const prevCustomers = prevCustomersData
    const customerTrend = prevCustomers === 0 ? (newCustomers > 0 ? 100 : 0) : ((newCustomers - prevCustomers) / prevCustomers) * 100

    // Conversion
    const uniqueBuyers = await prisma.order.groupBy({
        by: ['userId'],
        where: {
            status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
            createdAt: { gte: currentStart, lte: currentEnd },
            userId: { not: null }
        }
    })
    const activeUsers = await prisma.user.count({
        where: { createdAt: { lte: currentEnd } }
    })
    const conversionRate = activeUsers === 0 ? 0 : (uniqueBuyers.length / activeUsers) * 100
    const conversionTrend = 0 // Needs snapshotting... mock for now or 0

    // 3. CHART DATA
    const daysDiff = differenceInDays(currentEnd, currentStart)
    const isDaily = daysDiff <= 35

    const chartDataMap = new Map<string, number>()

    if (isDaily) {
        const days = eachDayOfInterval({ start: currentStart, end: currentEnd })
        days.forEach(day => {
            const key = format(day, 'd MMM', { locale: fr })
            chartDataMap.set(key, 0)
        })
    } else {
        const months = eachMonthOfInterval({ start: currentStart, end: currentEnd })
        months.forEach(month => {
            const key = format(month, 'MMM yyyy', { locale: fr })
            chartDataMap.set(key, 0)
        })
    }

    const periodOrders = await prisma.order.findMany({
        where: {
            status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
            createdAt: { gte: currentStart, lte: currentEnd }
        },
        select: { createdAt: true, total: true }
    })

    periodOrders.forEach(order => {
        let key = ''
        if (isDaily) {
            key = format(order.createdAt, 'd MMM', { locale: fr })
        } else {
            key = format(order.createdAt, 'MMM yyyy', { locale: fr })
        }

        if (chartDataMap.has(key)) {
            chartDataMap.set(key, chartDataMap.get(key)! + Number(order.total))
        }
    })

    const chartData = Array.from(chartDataMap.entries()).map(([name, value]) => ({
        name: isDaily ? name : name.split(' ')[0],
        value,
        fullLabel: name
    }))

    // 4. CATEGORY DATA & PRODUCTS & PAYMENT METHODS
    const items = await prisma.orderItem.findMany({
        where: {
            order: {
                status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
                createdAt: { gte: currentStart, lte: currentEnd }
            }
        },
        include: {
            product: {
                include: { category: true }
            }
        }
    })

    // Categories
    const categoryMap = new Map<string, number>()
    // Top Products
    const productMap = new Map<string, { count: number, revenue: number, image: string }>()

    let totalItemsValue = 0

    items.forEach(item => {
        const value = Number(item.price) * item.quantity
        totalItemsValue += value

        // Categories
        const catName = item.product.category?.name || "Autres"
        categoryMap.set(catName, (categoryMap.get(catName) || 0) + value)

        // Products
        const prodName = item.product.name
        const existing = productMap.get(prodName) || { count: 0, revenue: 0, image: item.product.images[0] || '' }
        productMap.set(prodName, {
            count: existing.count + item.quantity,
            revenue: existing.revenue + value,
            image: existing.image
        })
    })

    // Process Categories
    const categoryDataRaw = Array.from(categoryMap.entries()).map(([name, value]) => ({
        name,
        value: totalItemsValue === 0 ? 0 : Math.round((value / totalItemsValue) * 100),
        raw: value
    }))
    categoryDataRaw.sort((a, b) => b.raw - a.raw)
    const topCategories = categoryDataRaw.slice(0, 4)
    const categoryColors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    const categoryData = topCategories.map((cat, index) => ({
        name: cat.name,
        value: cat.value,
        color: categoryColors[index % categoryColors.length]
    }))

    // Process Top Products
    const topProducts = Array.from(productMap.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
        .map(p => ({
            name: p.name,
            sales: p.count,
            revenue: formatMoney(p.revenue),
            image: p.image
        }))

    // 5. PAYMENT METHODS & STATUS
    const ordersByPayment = await prisma.order.groupBy({
        by: ['paymentMethod'],
        where: { createdAt: { gte: currentStart, lte: currentEnd } },
        _count: true
    })

    const paymentMethods = ordersByPayment.map(p => ({
        name: p.paymentMethod || "Non spécifié",
        value: p._count
    })).sort((a, b) => b.value - a.value)

    const ordersByStatus = await prisma.order.groupBy({
        by: ['status'],
        where: { createdAt: { gte: currentStart, lte: currentEnd } },
        _count: true
    })

    const statusDistribution = ordersByStatus.map(s => ({
        name: s.status,
        value: s._count,
        color: s.status === 'PAID' ? '#10b981' : s.status === 'PENDING' ? '#f59e0b' : '#ef4444'
    })).sort((a, b) => b.value - a.value)


    return {
        revenue: formatMoney(revenue),
        revenueTrend: (revenueTrend > 0 ? "+" : "") + revenueTrend.toFixed(1) + "%",
        revenueUp: revenueTrend >= 0,

        aov: formatMoney(aov),
        aovTrend: (aovTrend > 0 ? "+" : "") + aovTrend.toFixed(1) + "%",
        aovUp: aovTrend >= 0,

        newCustomers: newCustomers.toString(),
        customersTrend: (customerTrend > 0 ? "+" : "") + customerTrend.toFixed(1) + "%",
        customersUp: customerTrend >= 0,

        conversion: conversionRate.toFixed(1) + "%",
        conversionTrend: "+0.0%",
        conversionUp: true,

        chartData,
        categoryData,
        topProducts,
        paymentMethods,
        statusDistribution,
        currentMonthLabel: getPeriodLabel(period),
        storeConfig: storeConfig ? {
            ...storeConfig,
            deliveryFee: Number(storeConfig.deliveryFee),
            freeDeliveryOver: Number(storeConfig.freeDeliveryOver)
        } : null
    }
}
