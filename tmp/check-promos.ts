import { prisma } from "../lib/prisma"

async function main() {
    const promos = await prisma.promotion.findMany({
        where: { isActive: true }
    })
    console.log("ACTIVE_PROMOS:", JSON.stringify(promos, null, 2))
}

main().catch(console.error).finally(() => prisma.$disconnect())
