
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createPayTechPayment } from "@/lib/paytech";

export async function POST(req: Request) {
    try {
        const { orderId } = await req.json();

        if (!orderId) {
            return new NextResponse("Order ID is required", { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true },
        });

        if (!order) {
            return new NextResponse("Order not found", { status: 404 });
        }

        const baseUrl = process.env.NEXTAUTH_URL || "http://127.0.0.1:3000";
        // Force HTTPS and use IP instead of localhost for better compatibility
        const secureBaseUrl = baseUrl.replace("http://", "https://").replace("localhost", "127.0.0.1");

        const ipnUrl = secureBaseUrl + "/api/paytech/callback";
        // We remove query parameters for now to see if PayTech validation passes
        const successUrl = `${secureBaseUrl}/checkout/success`;
        const cancelUrl = `${secureBaseUrl}/checkout/cancel`;

        const paymentData: any = {
            item_name: `Commande #${order.id.slice(-6).toUpperCase()}`,
            item_price: Number(order.total),
            currency: "XOF",
            ref_command: order.id,
            command_name: `Commande Mbor Store #${order.id.slice(-6).toUpperCase()}`,
            env: (process.env.PAYTECH_ENV === "prod" || process.env.PAYTECH_ENV === "live" ? "prod" : "test"),
            ipn_url: ipnUrl,
            success_url: successUrl,
            cancel_url: cancelUrl
        };

        const result = await createPayTechPayment(paymentData);
        console.log("[PAYTECH_RAW_RESPONSE]", result);

        if (result.success === 1 && result.redirect_url) {
            return NextResponse.json({ redirect_url: result.redirect_url });
        } else {
            console.error("[PAYTECH_CREATE_ERROR]", result);
            return new NextResponse(
                JSON.stringify({
                    error: "Erreur PayTech",
                    details: result.errors || result.error || "Réponse invalide de l'API"
                }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        console.error("[PAYTECH_CHECKOUT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
