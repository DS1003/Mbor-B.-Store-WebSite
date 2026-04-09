"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { createAdminLog } from "./actions"

export async function changeAdminPassword(data: { current: string, new: string, confirm: string }) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || (session.user as any).role !== "ADMIN") {
            throw new Error("Acces non autorisé")
        }

        if (data.new !== data.confirm) {
            return { success: false, message: "Les nouveaux mots de passe ne correspondent pas" }
        }

        if (data.new.length < 6) {
            return { success: false, message: "Le nouveau mot de passe doit faire au moins 6 caractères" }
        }

        const user = await prisma.user.findUnique({
            where: { id: (session.user as any).id }
        })

        if (!user || !user.password) {
            return { success: false, message: "Utilisateur non trouvé" }
        }

        const isMatch = await bcrypt.compare(data.current, user.password)
        if (!isMatch) {
            return { success: false, message: "Le mot de passe actuel est incorrect" }
        }

        const hashed = await bcrypt.hash(data.new, 10)
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashed }
        })

        await createAdminLog("Changement de mot de passe", "L'admin a modifié ses identifiants de sécurité", user.name || "Admin")

        return { success: true, message: "Mot de passe mis à jour avec succès" }
    } catch (error: any) {
        console.error("Change password error:", error)
        return { success: false, message: error.message || "Une erreur est survenue" }
    }
}
