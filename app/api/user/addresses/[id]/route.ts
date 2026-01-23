import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
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
        const { isDefault, ...otherData } = body

        // Check if address belongs to user
        const existingAddress = await prisma.address.findUnique({
            where: { id }
        })

        if (!existingAddress || existingAddress.userId !== user.id) {
            return new NextResponse("Forbidden", { status: 403 })
        }

        if (isDefault) {
            await prisma.address.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false }
            })
        }

        const address = await prisma.address.update({
            where: { id },
            data: {
                ...otherData,
                isDefault: isDefault !== undefined ? !!isDefault : existingAddress.isDefault
            }
        })

        return NextResponse.json(address)
    } catch (error) {
        console.error("[ADDRESS_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
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

        // Check ownership
        const address = await prisma.address.findUnique({
            where: { id }
        })

        if (!address || address.userId !== user.id) {
            return new NextResponse("Forbidden", { status: 403 })
        }

        await prisma.address.delete({
            where: { id }
        })

        return new NextResponse("Deleted", { status: 200 })
    } catch (error) {
        console.error("[ADDRESS_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
