import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
    pool: pg.Pool | undefined
    adapter: PrismaPg | undefined
}

const connectionString = process.env.DATABASE_URL

const pool = globalForPrisma.pool ?? new pg.Pool({ connectionString })
if (process.env.NODE_ENV !== "production") globalForPrisma.pool = pool

const adapter = globalForPrisma.adapter ?? new PrismaPg(pool)
if (process.env.NODE_ENV !== "production") globalForPrisma.adapter = adapter

const prismaClientSingleton = () => {
    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    })
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}
