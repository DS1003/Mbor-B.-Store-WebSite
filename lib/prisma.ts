import { PrismaClient } from "./generated-client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
    pool: pg.Pool | undefined
}

if (!globalForPrisma.pool) {
    globalForPrisma.pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL
    })
}

const adapter = new PrismaPg(globalForPrisma.pool)
export const prisma = new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}
