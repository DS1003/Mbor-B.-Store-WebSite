const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")
const { Pool } = require("pg")
const bcrypt = require("bcryptjs")
require('dotenv').config()

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log("Starting seeding...")

    // 1. Create Super Admin
    const adminPassword = await bcrypt.hash("admin123", 12)
    const admin = await prisma.user.upsert({
        where: { email: "admin@mbor.com" },
        update: {},
        create: {
            email: "admin@mbor.com",
            password: adminPassword,
            name: "Super Admin",
            role: "ADMIN",
        },
    })
    console.log("Admin created/updated:", admin.email)

    // 2. Create Sample Products
    const products = [
        {
            name: "Bazin Riche VIP",
            description: "Bazin de haute qualité, éclatant et durable.",
            price: 15000,
            stock: 50,
            category: "Tissus",
            images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800"],
            featured: true,
        },
        {
            name: "Huile de Baobab Pure",
            description: "Huile naturelle pour le soin de la peau et des cheveux.",
            price: 5000,
            stock: 100,
            category: "Cosmétiques",
            images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"],
            featured: true,
        },
        {
            name: "Ensemble Collier Ethnique",
            description: "Bijoux artisanaux faits main.",
            price: 12000,
            stock: 20,
            category: "Accessoires",
            images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"],
            featured: false,
        },
        {
            name: "Thé de Kinkeliba 250g",
            description: "Plante médicinale traditionnelle pour infusions.",
            price: 3500,
            stock: 200,
            category: "Bien-être",
            images: ["https://images.unsplash.com/photo-1594631252845-29fc458695d7?w=800"],
            featured: false,
        },
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { id: `seed-${product.name.replace(/\s+/g, '-').toLowerCase()}` },
            update: product,
            create: {
                id: `seed-${product.name.replace(/\s+/g, '-').toLowerCase()}`,
                ...product,
            },
        })
    }

    console.log(`Seeded ${products.length} products.`)
    console.log("Seeding finished successfully.")
}

main()
    .then(async () => {
        await prisma.$disconnect()
        await pool.end()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        await pool.end()
        process.exit(1)
    })
