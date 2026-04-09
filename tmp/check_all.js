const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_cEYCd4n2ZGqV@ep-still-wildflower-a464de1z-pooler.us-east-1.aws.neon.tech/mborBusinessStore?sslmode=require&channel_binding=require"
    }
  }
});

async function main() {
  const promos = await prisma.promotion.findMany();
  console.log('ALL_PROMOS:', JSON.stringify(promos, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
