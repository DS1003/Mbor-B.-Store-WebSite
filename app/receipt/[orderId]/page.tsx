import * as React from "react"
import { getAdminOrder, getStoreConfig } from "../../admin/actions"
import { ReceiptView } from "@/components/receipt-view"
import { notFound } from "next/navigation"

interface ReceiptPageProps {
    params: Promise<{
        orderId: string
    }>
}

export default async function ReceiptPage({ params }: ReceiptPageProps) {
    const { orderId } = await params

    // We fetch on the server
    const [order, config] = await Promise.all([
        getAdminOrder(orderId),
        getStoreConfig()
    ])

    if (!order) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12 receipt-wrapper">
            <ReceiptView order={order} config={config} />
        </div>
    )
}
