import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        if (!name || !email || !password) {
            return new NextResponse("Missing information", { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return new NextResponse("User already exists", { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.error("REGISTRATION_ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
