import * as React from "react"
import { Phone, MapPin, Globe } from "lucide-react"

interface ReceiptProps {
    order: any
    config: any
}

export function Receipt({ order, config }: ReceiptProps) {
    if (!order) return null

    const subtotal = order.items?.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0) || 0
    // Simple TVA calculation assuming 18% (common in Senegal)
    const tvaRate = 0.18
    const ht = subtotal / (1 + tvaRate)
    const tva = subtotal - ht

    return (
        <div className="bg-white p-4 w-[80mm] mx-auto text-black font-mono text-[11px] leading-tight receipt-container">
            {/* Store Header */}
            <div className="text-center space-y-1 mb-4">
                {config.logoUrl ? (
                    <img src={config.logoUrl} alt="Logo" className="h-16 mx-auto mb-2 object-contain filter grayscale" />
                ) : (
                    <div className="h-16 w-16 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="font-black text-xs">MBOR</span>
                    </div>
                )}
                <h1 className="text-sm font-black uppercase">{config.name || "MBOR B. STORE"}</h1>
                <p className="text-[10px] font-bold italic">{config.slogan || "L'excellence du sport"}</p>
                <div className="text-[9px] mt-2 space-y-0.5">
                    {config.address && <p>{config.address}</p>}
                    <p>TEL: {config.whatsappNumber || config.contactPhone || "+221 77 000 00 00"}</p>
                    {config.contactEmail && <p>{config.contactEmail}</p>}
                    <p>NINEA: 008765432 • RC: SN.DKR.2024.B.123</p>
                </div>
            </div>

            <div className="border-b border-dashed border-black w-full my-3" />

            {/* Order Identity */}
            <div className="flex justify-between text-[10px] mb-1">
                <span>TICKET: #{order.id.slice(-6).toUpperCase()}</span>
                <span>CAISSE: 01</span>
            </div>
            <div className="flex justify-between text-[10px] mb-3">
                <span>DATE: {new Date(order.createdAt).toLocaleString('fr-FR')}</span>
            </div>

            {/* Items Table */}
            <div className="space-y-2">
                <div className="flex justify-between font-black border-b border-black pb-1 mb-1">
                    <span className="w-[50%]">ARTICLE</span>
                    <span className="w-[10%] text-center">QT</span>
                    <span className="w-[40%] text-right">MONTANT</span>
                </div>
                {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-start">
                            <span className="w-[60%] uppercase font-bold leading-none">{item.product?.name || item.name}</span>
                            <span className="w-[10%] text-center text-[9px]">x{item.quantity}</span>
                            <span className="w-[30%] text-right font-bold">{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        {(item.customName || item.customNumber) && (
                            <p className="text-[8px] italic ml-2">FLO: {item.customName} ({item.customNumber})</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="border-b border-dashed border-black w-full my-4" />

            {/* Totals */}
            <div className="space-y-1">
                <div className="flex justify-between text-base font-black italic">
                    <span>TOTAL NET:</span>
                    <span>{Number(order.total).toLocaleString()} F CFA</span>
                </div>
                <div className="flex justify-between text-[9px] pt-2">
                    <span>DONT TVA (18%):</span>
                    <span>{Math.round(tva).toLocaleString()} F</span>
                </div>
                <div className="flex justify-between text-[9px]">
                    <span>MONTANT H.T:</span>
                    <span>{Math.round(ht).toLocaleString()} F</span>
                </div>
            </div>

            <div className="border-b border-dashed border-black w-full my-4" />

            {/* Payment Method */}
            <div className="flex justify-between text-[10px] font-bold">
                <span>MODE DE REGLEMENT:</span>
                <span>COMPTANT / CASH</span>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest">Merci de votre visite !</p>
                <div className="flex items-center justify-center gap-4 text-[8px] font-bold">
                    <div className="flex items-center gap-1">
                        <Globe className="h-2 w-2" />
                        <span>www.mborstore.sn</span>
                    </div>
                </div>
                <p className="text-[7px] leading-tight text-gray-500 uppercase">
                    Les articles vendus ne sont ni repris ni échangés<br />
                    après un délai de 24h et sans le ticket de caisse.<br />
                    Mbor Business Store - L'excellence au Sénégal.
                </p>
            </div>

            <style jsx>{`
                .receipt-container {
                    font-family: 'Courier New', Courier, monospace;
                    color: black !important;
                }
                @media print {
                    @page {
                        margin: 0;
                        size: 80mm auto;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        background: white;
                    }
                    .receipt-container {
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 10mm !important;
                    }
                }
            `}</style>
        </div>
    )
}
