const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Resetting all individual product discount prices...');
  const result = await prisma.product.updateMany({
    data: {
      discountPrice: null,
    },
  });
  console.log(`Successfully reset ${result.count} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
