import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Config Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Config Prisma
const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function getImagesRecursively(dir: string, fileList: string[] = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            await getImagesRecursively(name, fileList);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(ext)) {
                fileList.push(name);
            }
        }
    }
    return fileList;
}

async function run() {
    console.log("--- Starting Migration to Cloudinary ---");

    const publicDir = path.join(process.cwd(), 'public');
    const images = await getImagesRecursively(publicDir);

    console.log(`Found ${images.length} images to migrate.`);

    const mapping: { [key: string]: string } = {};

    for (const filePath of images) {
        // Relative path from public (e.g., /brands/nike.svg)
        const relativePath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');

        console.log(`Uploading: ${relativePath}...`);

        try {
            // Use filename (no ext) as public_id base
            const fileName = path.basename(filePath, path.extname(filePath));
            const folder = path.dirname(path.relative(publicDir, filePath)).replace(/\\/g, '/');

            const result = await cloudinary.uploader.upload(filePath, {
                folder: `mbor_store/${folder === '.' ? '' : folder}`,
                public_id: fileName,
                use_filename: true,
                unique_filename: true,
                overwrite: true
            });

            console.log(`Done: ${result.secure_url}`);
            mapping[relativePath] = result.secure_url;

            // Add to Database
            await prisma.media.upsert({
                where: { publicId: result.public_id },
                update: {
                    url: result.secure_url,
                    format: result.format,
                    width: result.width,
                    height: result.height,
                    size: result.bytes,
                },
                create: {
                    name: fileName,
                    url: result.secure_url,
                    publicId: result.public_id,
                    format: result.format,
                    width: result.width,
                    height: result.height,
                    size: result.bytes,
                }
            });

        } catch (error) {
            console.error(`Failed to upload ${relativePath}:`, error);
        }
    }

    // Save mapping to a file for the next step (updating codebase)
    fs.writeFileSync('migration-mapping.json', JSON.stringify(mapping, null, 2));

    console.log("--- Migration Complete ---");
    console.log("Mapping saved to migration-mapping.json");

    await prisma.$disconnect();
    await pool.end();
}

run().catch(err => {
    console.error("Migration fatal error:", err);
    process.exit(1);
});
