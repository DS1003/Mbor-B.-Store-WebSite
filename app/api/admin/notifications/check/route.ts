import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        // Vérification stricte du rôle Admin
        if (!session || (session.user as any).role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const lastCheckedStr = searchParams.get("lastChecked")

        if (!lastCheckedStr) {
            return NextResponse.json({
                newOrders: [],
                newUsers: [],
                timestamp: new Date().toISOString()
            })
        }

        const lastChecked = new Date(lastCheckedStr)

        // Récupérer les nouvelles commandes et nouveaux utilisateurs en parallèle
        const [newOrders, newUsers] = await Promise.all([
            prisma.order.findMany({
                where: {
                    createdAt: {
                        gt: lastChecked
                    }
                },
                select: {
                    id: true,
                    customerName: true,
                    total: true,
                    createdAt: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.user.findMany({
                where: {
                    role: "USER",
                    createdAt: {
                        gt: lastChecked
                    }
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        ])

        return NextResponse.json({
            newOrders,
            newUsers,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error("[NOTIFICATIONS_CHECK]_ERROR", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
