
export const PAYTECH_API_KEY = process.env.PAYTECH_API_KEY || "";
export const PAYTECH_API_SECRET = process.env.PAYTECH_API_SECRET || "";
export const PAYTECH_URL = "https://paytech.sn/api/payment/request-payment";

export interface PayTechPaymentRequest {
    item_name: string;
    item_price: number;
    currency: string;
    ref_command: string;
    command_name: string;
    env: "test" | "prod";
    ipn_url: string;
    success_url?: string;
    cancel_url?: string;
    success_redirect_url?: string;
    cancel_redirect_url?: string;
    successRedirectUrl?: string; // Adding camelCase support
    cancelRedirectUrl?: string; // Adding camelCase support
    custom_field?: string;
}

export interface PayTechResponse {
    success: number;
    token?: string;
    redirect_url?: string;
    errors?: string[];
    error?: string; // Some versions might return 'error' instead of 'errors'
}

export async function createPayTechPayment(data: PayTechPaymentRequest): Promise<PayTechResponse> {
    if (!PAYTECH_API_KEY || !PAYTECH_API_SECRET) {
        return { success: 0, error: "Clés API PayTech manquantes dans le fichier .env" };
    }

    const response = await fetch(PAYTECH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api_key": PAYTECH_API_KEY,
            "api_secret": PAYTECH_API_SECRET,
        },
        body: JSON.stringify(data),
    });

    return response.json();
}
