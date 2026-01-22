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

    // 2. Create Categories
    const categoryNames = [
        "Maillot",
        "Sneakers",
        "Habillement",
        "Crampons",
        "Ballon de foot",
        "Tenue de sport hommes & femmes",
        "Matériels de sport",
        "Flocages (maillots, tee-shirts, polos…)",
        "Street wear"
    ]

    const categories: Record<string, string> = {}

    for (const name of categoryNames) {
        const cat = await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name }
        })
        categories[name] = cat.id
        console.log(`Category created: ${name}`)
    }

    // 3. Create Sample Products
    const products = [
        {
            name: "Maillot Sénégal Dkali - Pack Vert",
            description: "Le maillot officiel authentique de l'équipe nationale du Sénégal. Technologie Dry-Fit pour une performance optimale sur le terrain.",
            price: 55000,
            categoryId: categories["Maillot"],
            images: ["https://www.foot.fr/146457-pdt_1500/maillot-dkali-senegal-vert.jpg"],
            featured: true,
            allowFlocage: true,
            stock: 45, // Total stock fallback
            sizes: {
                create: [
                    { size: "S", stock: 10 },
                    { size: "M", stock: 15 },
                    { size: "L", stock: 15 },
                    { size: "XL", stock: 5 }
                ]
            }
        },
        {
            name: "Nike Mercurial Vapor 16 Pro FG",
            description: "Vitesse explosive et contrôle précis. Conçue pour les attaquants d'élite qui cherchent à faire la différence.",
            price: 154000,
            categoryId: categories["Crampons"],
            images: ["https://www.foot.fr/151284-large_default/nike-air-zoom-mercurial-vapor-16-pro-fg-bleu-rose.jpg"],
            featured: true,
            stock: 12,
            sizes: {
                create: [
                    { size: "40", stock: 2 },
                    { size: "41", stock: 4 },
                    { size: "42", stock: 4 },
                    { size: "43", stock: 2 }
                ]
            }
        },
        {
            name: "Veste Performance Elite Nike",
            description: "Confort thermique et style urbain. Idéale pour l'entraînement intensif ou le lifestyle.",
            price: 75000,
            categoryId: categories["Street wear"],
            images: ["https://cdn.blazimg.com/homepage/stores/1/Bloc6_desktop_1.webp"],
            featured: true,
            stock: 30,
            sizes: {
                create: [
                    { size: "M", stock: 10 },
                    { size: "L", stock: 10 },
                    { size: "XL", stock: 10 }
                ]
            }
        },
        {
            name: "Pack Training Sénégal 24/25",
            description: "L'ensemble complet porté par les joueurs professionnels lors des séances de préparation. Robustesse et élégance.",
            price: 65000,
            categoryId: categories["Maillot"],
            images: ["https://cdn.blazimg.com/homepage/stores/1/Bloc_1_8.webp"],
            featured: false,
            stock: 25,
            sizes: {
                create: [
                    { size: "S", stock: 5 },
                    { size: "M", stock: 10 },
                    { size: "L", stock: 10 }
                ]
            }
        },
        // MIZUNO
        {
            name: "Mizuno Alpha Elite FG – Laser Blue",
            description: "Crampons Mizuno Alpha Elite conçus pour la vitesse pure.",
            price: 145000,
            categoryId: categories["Crampons"],
            images: [
                "https://cdn.blazimg.com/1200/product/m/i/mizuno_p1ga2460-27_laserblue-white-gold_1.webp"
            ],
            featured: true,
            stock: 10,
            sizes: {
                create: [
                    { size: "41", stock: 5 },
                    { size: "42", stock: 5 }
                ]
            }
        },
        {
            name: "Puma Future 7 Ultimate FG",
            description: "Contrôle total et ajustement adaptatif.",
            price: 142000,
            categoryId: categories["Crampons"],
            images: [
                "https://cdn.blazimg.com/1200/product/2/0/2025_10_puma_108599-03_0.webp"
            ],
            featured: true,
            stock: 10,
            sizes: {
                create: [
                    { size: "40", stock: 2 },
                    { size: "41", stock: 3 },
                    { size: "42", stock: 3 },
                    { size: "43", stock: 2 }
                ]
            }
        },
        {
            name: "Adidas Ensemble Training Performance",
            description: "Tenue d'entraînement respirante et élégante.",
            price: 65000,
            categoryId: categories["Habillement"],
            images: [
                "https://cdn.blazimg.com/1200/product/a/d/adidas_iz3130_2_apparel_photography_front_center_view_white.webp"
            ],
            featured: false,
            stock: 20,
            sizes: {
                create: [
                    { size: "S", stock: 5 },
                    { size: "M", stock: 10 },
                    { size: "L", stock: 5 }
                ]
            }
        },
        {
            name: "Chaussettes SoxPro Grip Anti-Slip",
            description: "Maintien optimal.",
            price: 12000,
            categoryId: categories["Matériels de sport"],
            images: [
                "https://www.foot.fr/54167-large_default/chaussettes-soxpro-grip-anti-slip-blanc.jpg"
            ],
            featured: false,
            stock: 50,
            sizes: {
                create: [
                    { size: "Unique", stock: 50 }
                ]
            }
        },
    ]

    for (const product of products) {
        // Clean up existing if needed (optional, upsert handles update but complicated with relations)
        // For simplicity in seed, let's just try to create or update.
        // Prisma upsert for relations (sizes) is tricky.
        // We will just do a standard upsert on the product fields, and then transactionally delete/create sizes to be safe/simple for seed.

        const id = `seed-${product.name.replace(/\s+/g, '-').toLowerCase()}`

        await prisma.product.upsert({
            where: { id },
            update: {
                name: product.name,
                description: product.description,
                price: product.price,
                categoryId: product.categoryId,
                images: product.images,
                featured: product.featured,
                allowFlocage: product.allowFlocage,
                stock: product.stock
            },
            create: {
                id,
                name: product.name,
                description: product.description,
                price: product.price,
                categoryId: product.categoryId,
                images: product.images,
                featured: product.featured,
                allowFlocage: product.allowFlocage,
                stock: product.stock,
                sizes: product.sizes
            }
        })

        // If it was an update, we might want to ensure sizes exist, but for seed let's assume create won mostly or manual fix later.
        // Actually, if we update, the sizes creation in `create` block won't run.
        // Let's force update sizes for existing ones.
        if (product.sizes && product.sizes.create) {
            // Basic size sync for seed purposes
            for (const sizeData of product.sizes.create) {
                await prisma.productSize.upsert({
                    where: {
                        productId_size: {
                            productId: id,
                            size: sizeData.size
                        }
                    },
                    update: { stock: sizeData.stock },
                    create: {
                        productId: id,
                        size: sizeData.size,
                        stock: sizeData.stock
                    }
                })
            }
        }
    }

    console.log(`Seeded ${products.length} products with categories and sizes.`)
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
