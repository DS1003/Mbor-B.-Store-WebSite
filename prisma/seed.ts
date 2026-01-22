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
            name: "Maillot Sénégal Dkali - Pack Vert",
            description: "Le maillot officiel authentique de l'équipe nationale du Sénégal. Technologie Dry-Fit pour une performance optimale sur le terrain.",
            price: 55000,
            stock: 45,
            category: "Maillots",
            images: ["https://www.foot.fr/146457-pdt_1500/maillot-dkali-senegal-vert.jpg"],
            featured: true,
            allowFlocage: true,
        },
        {
            name: "Nike Mercurial Vapor 16 Pro FG",
            description: "Vitesse explosive et contrôle précis. Conçue pour les attaquants d'élite qui cherchent à faire la différence.",
            price: 154000,
            stock: 12,
            category: "Performance",
            subCategory: "Crampons",
            images: ["https://www.foot.fr/151284-large_default/nike-air-zoom-mercurial-vapor-16-pro-fg-bleu-rose.jpg"],
            featured: true,
        },
        {
            name: "Veste Performance Elite Nike",
            description: "Confort thermique et style urbain. Idéale pour l'entraînement intensif ou le lifestyle.",
            price: 75000,
            stock: 30,
            category: "Streetwear",
            images: ["https://cdn.blazimg.com/homepage/stores/1/Bloc6_desktop_1.webp"],
            featured: true,
        },
        {
            name: "Pack Training Sénégal 24/25",
            description: "L'ensemble complet porté par les joueurs professionnels lors des séances de préparation. Robustesse et élégance.",
            price: 65000,
            stock: 25,
            category: "Maillots",
            images: ["https://cdn.blazimg.com/homepage/stores/1/Bloc_1_8.webp"],
            featured: false,
        },
        {
            name: "Nike United Pack - Special Ed.",
            description: "Édition limitée célébrant l'unité du football mondial. Design exclusif avec détails dorés.",
            price: 165000,
            stock: 8,
            category: "Performance",
            images: ["https://cdn.blazimg.com/homepage/stores/1/Nike_united.webp"],
            featured: true,
        },
        // ==================== NOUVEAUX PRODUITS ====================

        {
            name: "Mizuno Alpha Elite FG – Laser Blue",
            description: "Crampons Mizuno Alpha Elite conçus pour la vitesse pure. Légèreté, explosivité et précision pour joueurs offensifs.",
            price: 145000,
            stock: 10,
            category: "Performance",
            subCategory: "Crampons",
            images: [
                "https://cdn.blazimg.com/1200/product/m/i/mizuno_p1ga2460-27_laserblue-white-gold_1.webp",
                "https://cdn.blazimg.com/600/product/m/i/mizuno_p1ga2460-27_laserblue-white-gold_4.webp",
                "https://cdn.blazimg.com/600/product/m/i/mizuno_p1ga2460-27_laserblue-white-gold_3.webp"
            ],
            featured: true,
        },

        {
            name: "Mizuno Morelia Neo IV Pro FG",
            description: "Toucher de balle exceptionnel et confort premium. Un classique revisité pour les joueurs techniques.",
            price: 158000,
            stock: 8,
            category: "Performance",
            subCategory: "Crampons",
            images: [
                "https://cdn.blazimg.com/1200/product/p/1/p1ga253409.webp",
                "https://cdn.blazimg.com/600/product/p/1/p1ga253409_2.webp",
                "https://cdn.blazimg.com/600/product/p/1/p1ga253409_6.webp"
            ],
            featured: true,
        },

        {
            name: "Puma Ultra Ultimate FG – Electric Pack",
            description: "Ultra rapide, ultra léger. Pensé pour les accélérations fulgurantes et les changements de rythme.",
            price: 139000,
            stock: 12,
            category: "Performance",
            subCategory: "Crampons",
            images: [
                "https://cdn.blazimg.com/1200/product/p/u/puma_108581-01_0-nw052325.webp",
                "https://cdn.blazimg.com/1800/product/p/u/puma_108581-01_2-nw052325.webp",
                "https://cdn.blazimg.com/1800/product/p/u/puma_108581-01_5-nw052325.webp",
                "https://cdn.blazimg.com/1800/product/p/u/puma_108581-01_3-nw052325.webp"
            ],
            featured: true,
        },

        {
            name: "Puma Future 7 Ultimate FG",
            description: "Contrôle total et ajustement adaptatif. La chaussure des créateurs de jeu.",
            price: 142000,
            stock: 10,
            category: "Performance",
            subCategory: "Crampons",
            images: [
                "https://cdn.blazimg.com/1200/product/2/0/2025_10_puma_108599-03_0.webp",
                "https://cdn.blazimg.com/1800/product/2/0/2025_10_puma_108599-03_2.webp",
                "https://cdn.blazimg.com/1800/product/2/0/2025_10_puma_108599-03_3.webp",
                "https://cdn.blazimg.com/1800/product/2/0/2025_10_puma_108599-03_5.webp"
            ],
            featured: true,
        },

        {
            name: "Adidas Predator Elite FG",
            description: "Puissance, contrôle et précision ultime. Conçue pour dominer chaque zone du terrain.",
            price: 160000,
            stock: 9,
            category: "Performance",
            subCategory: "Crampons",
            images: [
                "https://cdn.blazimg.com/1200/product/a/d/adidas_jx2136_1-nw121124.webp",
                "https://cdn.blazimg.com/1800/product/a/d/adidas_jx2136_5-nw121124.webp",
                "https://cdn.blazimg.com/1800/product/a/d/adidas_jx2136_2-nw121124.webp",
                "https://cdn.blazimg.com/1800/product/a/d/adidas_jx2136_4-nw121124.webp"
            ],
            featured: true,
        },

        {
            name: "Adidas Ensemble Training Performance",
            description: "Tenue d'entraînement respirante et élégante, idéale pour le sport et le lifestyle.",
            price: 65000,
            stock: 20,
            category: "Habillement",
            images: [
                "https://cdn.blazimg.com/1200/product/a/d/adidas_iz3130_2_apparel_photography_front_center_view_white.webp",
                "https://cdn.blazimg.com/600/product/a/d/adidas_iz3130_7_apparel_on_model_walking_view_white.webp",
                "https://cdn.blazimg.com/600/product/a/d/adidas_iz3130_9_apparel_on_model_detail_view_2_white.webp"
            ],
            featured: false,
        },

        {
            name: "Nike Phantom GX Elite FG",
            description: "Contrôle précis et toucher exceptionnel pour les milieux créateurs et attaquants techniques.",
            price: 162000,
            stock: 7,
            category: "Performance",
            subCategory: "Crampons",
            images: [
                "https://cdn.blazimg.com/1200/product/n/i/nike_fq8336-001-phsrh000.webp",
                "https://cdn.blazimg.com/1800/product/n/i/nike_fq8336-001-phcfh001.webp",
                "https://cdn.blazimg.com/1800/product/n/i/nike_fq8336-001-phsyd002.webp",
                "https://cdn.blazimg.com/1800/product/n/i/nike_fq8336-001-phsyd000.webp"
            ],
            featured: true,
        },

        {
            name: "Nike Mercurial Superfly Elite FG – Voltage",
            description: "Explosivité maximale, maintien précis et vitesse extrême pour joueurs rapides.",
            price: 168000,
            stock: 6,
            category: "Performance",
            subCategory: "Crampons",
            images: [
                "https://cdn.blazimg.com/1200/product/n/i/nike_fq8690-801-phsrh000-nw110625.webp",
                "https://cdn.blazimg.com/1800/product/n/i/nike_fq8690-801-phcfh001-nw110625.webp",
                "https://cdn.blazimg.com/1800/product/n/i/nike_fq8690-801-phsyd001-nw110625.webp",
                "https://cdn.blazimg.com/1800/product/n/i/nike_fq8690-801-phsyd002-nw110625.webp"
            ],
            featured: true,
        },

        {
            name: "Chaussettes SoxPro Grip Anti-Slip",
            description: "Maintien optimal, adhérence maximale et confort premium pour la performance.",
            price: 12000,
            stock: 50,
            category: "Accessoires",
            images: [
                "https://www.foot.fr/54167-large_default/chaussettes-soxpro-grip-anti-slip-blanc.jpg",
                "https://www.foot.fr/54169-pdt_1500/chaussettes-soxpro-grip-anti-slip-blanc.jpg"
            ],
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
