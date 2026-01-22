import * as React from "react"
import { Store, Phone, Mail, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReceiptProps {
    order: any
    config: any
}

export function Receipt({ order, config }: ReceiptProps) {
    if (!order) return null

    return (
        <div className="bg-white p-8 w-[80mm] mx-auto text-black font-mono text-[12px] leading-tight">
            {/* Store Header */}
            <div className="text-center space-y-2 mb-6 border-b-2 border-dashed border-black pb-6">
                <h1 className="text-xl font-bold uppercase tracking-tighter">{config.name || "MBOR B. STORE"}</h1>
                <p className="text-[10px]">{config.slogan || "L'excellence du sport"}</p>
                <div className="space-y-1 mt-4 text-[10px]">
                    <div className="flex items-center justify-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{config.whatsappNumber || config.contactPhone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{config.address || "Dakar, Sénégal"}</span>
                    </div>
                </div>
            </div>

            {/* Order Info */}
            <div className="space-y-1 mb-4 border-b border-gray-100 pb-4">
                <div className="flex justify-between">
                    <span>TICKET:</span>
                    <span className="font-bold">#{order.id.slice(-6).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                    <span>DATE:</span>
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>CLIENT:</span>
                    <span className="uppercase">{order.customerName || order.user?.name || "INVITE"}</span>
                </div>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-6">
                <div className="grid grid-cols-4 font-bold border-b border-black pb-1 mb-2">
                    <span className="col-span-2">ART.</span>
                    <span className="text-center">QTY</span>
                    <span className="text-right">PRC</span>
                </div>
                {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-4 gap-1">
                        <div className="col-span-2">
                            <p className="uppercase font-bold">{item.product?.name || item.name}</p>
                            {item.customName && <p className="text-[10px]">[{item.customName}]</p>}
                        </div>
                        <span className="text-center">x{item.quantity}</span>
                        <span className="text-right">{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="border-t-2 border-black pt-4 space-y-2">
                <div className="flex justify-between text-lg font-bold">
                    <span>TOTAL:</span>
                    <span>{Number(order.total).toLocaleString()} F</span>
                </div>
                <div className="flex justify-between text-[10px]">
                    <span>MODE PAY:</span>
                    <span className="uppercase">CASH / DIRECT</span>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-10 space-y-4 pt-6 border-t border-dashed border-gray-300">
                <p className="uppercase font-black text-[10px]">Merci de votre confiance !</p>
                <div className="flex justify-center">
                    <div className="h-10 w-10 border border-black flex items-center justify-center">
                        <span className="text-[8px] font-bold">MBOR B.</span>
                    </div>
                </div>
                <p className="text-[8px] text-gray-400">LES ARTICLES VENDUS NE SONT NI REPRIS NI ECHANGES APRES DELAI DE 24H.</p>
            </div>

            <style jsx>{`
                @media print {
                    @page {
                        margin: 0;
                        size: 80mm auto;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                    }
                }
            `}</style>
        </div>
    )
}
