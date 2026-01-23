import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        // Vérification stricte du rôle Admin
        if (!session || session.user.role !== "ADMIN") {
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

        // Récupérer les nouvelles commandes
        const newOrders = await prisma.order.findMany({
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
        })

        // Récupérer les nouveaux utilisateurs
        const newUsers = await prisma.user.findMany({
            where: {
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
