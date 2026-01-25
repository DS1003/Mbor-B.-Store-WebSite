import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || (session.user as any).role !== 'ADMIN') {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const [
            users,
            products,
            orders,
            categories,
            storeConfig,
            media,
            reviews,
            addresses
        ] = await Promise.all([
            prisma.user.findMany({ include: { accounts: true, paymentMethods: true } }),
            prisma.product.findMany({ include: { sizes: true, orderItems: true } }),
            prisma.order.findMany({ include: { items: true } }),
            prisma.category.findMany(),
            prisma.storeConfig.findFirst(),
            prisma.media.findMany(),
            prisma.review.findMany(),
            prisma.address.findMany()
        ])

        const backupData = {
            timestamp: new Date().toISOString(),
            version: '1.0',
            data: {
                users,
                addresses,
                products,
                categories,
                orders,
                reviews,
                media,
                storeConfig
            }
        }

        const response = new NextResponse(JSON.stringify(backupData, null, 2))

        const date = new Date().toISOString().split('T')[0]
        response.headers.set('Content-Type', 'application/json')
        response.headers.set('Content-Disposition', `attachment; filename="mbor-store-backup-${date}.json"`)

        return response

    } catch (error) {
        console.error('[BACKUP_ERROR]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
