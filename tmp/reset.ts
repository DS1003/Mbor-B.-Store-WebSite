import { prisma } from "../lib/prisma"

async function main() {
    console.log("Resetting all discountPrice to null...")
    const result = await prisma.product.updateMany({
        data: {
            discountPrice: null
        }
    })
    console.log(`Reset ${result.count} products.`)
}

main().catch(e => {
    console.error(e)
    process.exit(1)
}).finally(() => prisma.$disconnect())
