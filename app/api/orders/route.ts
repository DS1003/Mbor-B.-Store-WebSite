import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        const body = await req.json()

        const {
            items,
            subtotal,
            totalAmount,
            formData,
            paymentMethod
        } = body

        if (!items || items.length === 0) {
            return new NextResponse("Missing items", { status: 400 })
        }

        // If user is logged in, use their ID
        let userId = null
        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email }
            })
            userId = user?.id
        }

        // Create the order
        const order = await prisma.order.create({
            data: {
                userId: userId as string,
                total: totalAmount,
                customerName: `${formData.firstName} ${formData.lastName}`,
                customerPhone: formData.phone,
                customerAddress: formData.address,
                paymentMethod: paymentMethod,
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        size: item.size,
                        customName: item.customName,
                        customNumber: item.customNumber
                    }))
                }
            }
        })

        return NextResponse.json(order)
    } catch (error) {
        console.error("[ORDERS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
