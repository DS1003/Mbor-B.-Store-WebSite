import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const { name, email, phone, currentPassword, newPassword } = body

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        const updateData: any = {}
        if (name) updateData.name = name
        if (email && email !== user.email) {
            // Check if email already exists
            const existingUser = await prisma.user.findUnique({
                where: { email }
            })
            if (existingUser) {
                return new NextResponse("Email already in use", { status: 400 })
            }
            updateData.email = email
        }

        // Handle password change if requested
        if (currentPassword && newPassword) {
            if (!user.password) {
                return new NextResponse("Password not set (OAuth user)", { status: 400 })
            }

            const isPasswordMatch = await bcrypt.compare(currentPassword, user.password)
            if (!isPasswordMatch) {
                return new NextResponse("Incorrect current password", { status: 400 })
            }

            updateData.password = await bcrypt.hash(newPassword, 10)
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: updateData
        })

        return NextResponse.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    } catch (error) {
        console.error("[PROFILE_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
