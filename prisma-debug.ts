import { PrismaClient } from "./lib/generated-client"
const prisma = new PrismaClient()

async function main() {
    try {
        const products = await prisma.product.findMany({
            take: 1,
            include: {
                category: true
            }
        })
        console.log("Success!")
        console.log(JSON.stringify(products, null, 2))
    } catch (e) {
        console.error("Failed!")
        console.error(e)
    }
}

main().catch(console.error).finally(() => prisma.$disconnect())
