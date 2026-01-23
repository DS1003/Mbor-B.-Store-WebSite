import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        const payments = await prisma.paymentMethod.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json(payments)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { type, provider, accountNumber, expiryDate, isDefault } = body

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        // If this is default, remove other defaults
        if (isDefault) {
            await prisma.paymentMethod.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false }
            })
        }

        const payment = await prisma.paymentMethod.create({
            data: {
                userId: user.id,
                type,
                provider,
                accountNumber,
                expiryDate,
                isDefault: !!isDefault
            }
        })

        return NextResponse.json(payment)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}
