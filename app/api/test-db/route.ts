import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    console.log("DB_URL:", process.env.DATABASE_URL?.slice(0, 20) + "...")
    try {
        const count = await prisma.user.count()
        return NextResponse.json({ success: true, count })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
