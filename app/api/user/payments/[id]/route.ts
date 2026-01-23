import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { id } = await params
        const body = await req.json()
        const { isDefault } = body

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        const payment = await prisma.paymentMethod.findUnique({
            where: { id }
        })

        if (!payment || payment.userId !== user.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (isDefault) {
            await prisma.paymentMethod.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false }
            })
        }

        const updatedPayment = await prisma.paymentMethod.update({
            where: { id },
            data: { isDefault: !!isDefault }
        })

        return NextResponse.json(updatedPayment)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { id } = await params
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        const payment = await prisma.paymentMethod.findUnique({
            where: { id }
        })

        if (!payment || payment.userId !== user.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        await prisma.paymentMethod.delete({
            where: { id }
        })

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}
