import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        const addresses = await prisma.address.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(addresses)
    } catch (error) {
        console.error("[ADDRESSES_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        const body = await req.json()
        const { name, firstName, lastName, street, city, phone, isDefault } = body

        // If this is the new default, unset others
        if (isDefault) {
            await prisma.address.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false }
            })
        }

        const address = await prisma.address.create({
            data: {
                userId: user.id,
                name,
                firstName,
                lastName,
                street,
                city,
                phone,
                isDefault: !!isDefault
            }
        })

        return NextResponse.json(address)
    } catch (error) {
        console.error("[ADDRESSES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
