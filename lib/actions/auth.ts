"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { sendEmail } from "@/lib/mail"

/**
 * Request a password reset
 * Now sends a real email using SMTP configuration.
 */
export async function requestPasswordReset(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            // Return success anyway for security (don't reveal if user exists)
            return { success: true, message: "Si un compte existe pour cet email, un lien de réinitialisation sera envoyé." }
        }

        // Generate token
        const token = crypto.randomBytes(32).toString('hex')
        const expires = new Date(Date.now() + 3600000) // 1 hour from now

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: token,
                resetTokenExpires: expires
            }
        })

        const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
        
        // SEND REAL EMAIL
        await sendEmail({
            to: email,
            subject: "Réinitialisation de votre mot de passe - Mbor B. Store",
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #F59E0B;">Mbor B. Store</h2>
                    <p>Bonjour,</p>
                    <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte Mbor B. Store.</p>
                    <p>Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe. Ce lien est valable pendant 1 heure.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #000; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Réinitialiser mon mot de passe</a>
                    </div>
                    <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #888;">Ceci est un email automatique, merci de ne pas y répondre.</p>
                </div>
            `
        })

        return { success: true, message: "Un lien de réinitialisation a été envoyé à votre adresse email." }
    } catch (error) {
        console.error("Password reset request error:", error)
        return { success: false, message: "Une erreur est survenue lors de l'envoi de l'email." }
    }
}

/**
 * Reset password using a valid token
 */
export async function resetPassword(token: string, newPassword: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpires: {
                    gt: new Date()
                }
            }
        })

        if (!user) {
            return { success: false, message: "Le lien de réinitialisation est invalide ou a expiré." }
        }

        const hashed = await bcrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashed,
                resetToken: null,
                resetTokenExpires: null
            }
        })

        return { success: true, message: "Votre mot de passe a été réinitialisé avec succès." }
    } catch (error) {
        console.error("Password reset error:", error)
        return { success: false, message: "Une erreur est survenue lors de la réinitialisation." }
    }
}
