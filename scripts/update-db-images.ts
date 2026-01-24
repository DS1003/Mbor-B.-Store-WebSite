import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const mapping = JSON.parse(fs.readFileSync('migration-mapping.json', 'utf8'));

// Config Prisma
const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function updateDb() {
    console.log("--- Updating Database Links ---");

    // 1. Update Products
    const products = await prisma.product.findMany();
    for (const product of products) {
        if (product.images && product.images.length > 0) {
            const newImages = product.images.map(img => mapping[img] || img);
            if (JSON.stringify(newImages) !== JSON.stringify(product.images)) {
                await prisma.product.update({
                    where: { id: product.id },
                    data: { images: newImages }
                });
                console.log(`Updated product: ${product.name}`);
            }
        }
    }

    // 2. Update Categories
    const categories = await prisma.category.findMany();
    for (const category of categories) {
        if (category.image && mapping[category.image]) {
            await prisma.category.update({
                where: { id: category.id },
                data: { image: mapping[category.image] }
            });
            console.log(`Updated category: ${category.name}`);
        }
    }

    // 3. Update Store Config
    const config = await prisma.storeConfig.findUnique({ where: { id: 'singleton' } });
    if (config && config.logoUrl && mapping[config.logoUrl]) {
        await prisma.storeConfig.update({
            where: { id: 'singleton' },
            data: { logoUrl: mapping[config.logoUrl] }
        });
        console.log(`Updated store config logo.`);
    }

    console.log("--- Database Update Complete ---");
    await prisma.$disconnect();
    await pool.end();
}

updateDb().catch(err => {
    console.error("DB update fatal error:", err);
    process.exit(1);
});
