"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const stock = parseInt(formData.get("stock") as string)
    const category = formData.get("category") as string
    const imageUrl = formData.get("imageUrl") as string

    await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock,
            category,
            images: imageUrl ? [imageUrl] : [],
        },
    })

    revalidatePath("/admin/products")
    redirect("/admin/products")
}
