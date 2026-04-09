const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const promos = await prisma.promotion.findMany({
    where: { isActive: true }
  });
  console.log('ACTIVE_PROMOS_JSON:', JSON.stringify(promos));
}

main().catch(console.error).finally(() => prisma.$disconnect());
