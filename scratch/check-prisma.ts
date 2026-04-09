import { prisma } from './lib/prisma';

async function main() {
    console.log("Checking User model...");
    // @ts-ignore
    const user = await prisma.user.findFirst();
    console.log("User fields:", Object.keys(user || {}));
    // @ts-ignore
    console.log("Has phone:", 'phone' in prisma.user.fields || 'Check your schema');
}

main().catch(console.error);
