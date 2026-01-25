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

const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
})

if (process.env.NODE_ENV === "development") {
    const models = ['media', 'adminLog', 'promotion', 'order', 'product']
    models.forEach(model => {
        if (!(model in prisma)) {
            console.error(`CRITICAL: '${model}' model missing from prisma client!`)
        }
    })
}

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}

export { prisma }
