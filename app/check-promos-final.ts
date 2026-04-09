import { prisma } from "@/lib/prisma"

async function main() {
    const promos = await prisma.promotion.findMany()
    console.log("ALL_PROMOS:", JSON.stringify(promos, null, 2))
}

main().catch(console.error).finally(() => prisma.$disconnect())
