
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        // PayTech sends IPN notifications as POST with form data
        const type_event = formData.get("type_event");
        const custom_field = formData.get("custom_field");
        const ref_command = formData.get("ref_command")?.toString();
        const item_name = formData.get("item_name");
        const item_price = formData.get("item_price");
        const currency = formData.get("currency");
        const command_name = formData.get("command_name");
        const env = formData.get("env");
        const token = formData.get("token");
        const api_key_sha256 = formData.get("api_key_sha256");
        const api_secret_sha256 = formData.get("api_secret_sha256");

        // Basic verification (PayTech documentation recommends verifying sha256 of keys)
        const local_api_key_sha256 = crypto
            .createHash("sha256")
            .update(process.env.PAYTECH_API_KEY || "")
            .digest("hex");
        const local_api_secret_sha256 = crypto
            .createHash("sha256")
            .update(process.env.PAYTECH_API_SECRET || "")
            .digest("hex");

        if (
            api_key_sha256 !== local_api_key_sha256 ||
            api_secret_sha256 !== local_api_secret_sha256
        ) {
            console.error("[PAYTECH_IPN_AUTH_FAILED]");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (ref_command) {
            // Update order status to PAID
            await prisma.order.update({
                where: { id: ref_command },
                data: {
                    status: "PAID",
                    // You could store the token in a new field if you update the schema
                },
            });

            console.log(`[PAYTECH_IPN_SUCCESS] Order ${ref_command} updated to PAID`);
        }

        return new NextResponse("OK", { status: 200 });
    } catch (error) {
        console.error("[PAYTECH_IPN_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
