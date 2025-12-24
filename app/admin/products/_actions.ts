"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const discountPrice = formData.get("discountPrice") ? parseFloat(formData.get("discountPrice") as string) : null
    const stock = parseInt(formData.get("stock") as string)
    const category = formData.get("category") as string
    const subCategory = formData.get("subCategory") as string
    const imageUrl = formData.get("imageUrl") as string
    const allowFlocage = formData.get("allowFlocage") === "true"
    const allowGravure = formData.get("allowGravure") === "true"

    const product = await prisma.product.create({
        data: {
            name,
            description,
            price,
            discountPrice,
            stock,
            category,
            subCategory,
            images: imageUrl ? [imageUrl] : [],
            allowFlocage,
            allowGravure,
        },
    })

    revalidatePath("/admin/products")
    return { success: true, product: JSON.parse(JSON.stringify(product)) }
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const discountPrice = formData.get("discountPrice") ? parseFloat(formData.get("discountPrice") as string) : null
    const stock = parseInt(formData.get("stock") as string)
    const category = formData.get("category") as string
    const subCategory = formData.get("subCategory") as string
    const imageUrl = formData.get("imageUrl") as string
    const allowFlocage = formData.get("allowFlocage") === "true"
    const allowGravure = formData.get("allowGravure") === "true"

    await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            discountPrice,
            stock,
            category,
            subCategory,
            images: imageUrl ? [imageUrl] : [],
            allowFlocage,
            allowGravure,
        },
    })

    revalidatePath("/admin/products")
    return { success: true }
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id },
    })
    revalidatePath("/admin/products")
}
