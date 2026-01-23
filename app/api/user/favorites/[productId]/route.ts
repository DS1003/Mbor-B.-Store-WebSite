import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
    req: Request,
    { params }: { params: Promise<{ productId: string }> }
) {
    try {
        const { productId } = await params
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { favorites: true }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        const isFavorite = user.favorites.some(f => f.id === productId)

        if (isFavorite) {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    favorites: {
                        disconnect: { id: productId }
                    }
                }
            })
            return NextResponse.json({ message: "Removed from favorites", isFavorite: false })
        } else {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    favorites: {
                        connect: { id: productId }
                    }
                }
            })
            return NextResponse.json({ message: "Added to favorites", isFavorite: true })
        }
    } catch (error) {
        console.error("[FAVORITES_TOGGLE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
