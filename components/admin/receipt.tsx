import * as React from "react"
import { Phone, MapPin, Globe, User } from "lucide-react"

interface ReceiptProps {
    order: any
    config: any
}

export function Receipt({ order, config }: ReceiptProps) {
    if (!order) return null

    const subtotal = order.items?.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0) || 0

    return (
        <div
            id="receipt-content"
            className="bg-white p-6 w-full max-w-[400px] mx-auto leading-tight receipt-container select-none"
            style={{ color: '#000000', backgroundColor: '#ffffff', fontFamily: 'monospace' }}
        >
            {/* Store Header */}
            <div className="text-center space-y-1 mb-4">
                {config.logoUrl ? (
                    <img src={config.logoUrl} alt="Logo" className="h-16 mx-auto mb-2 object-contain" style={{ filter: 'grayscale(100%)' }} />
                ) : (
                    <div className="h-16 w-16 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="font-black text-xs">MBOR</span>
                    </div>
                )}
                <h1 className="text-sm font-black uppercase" style={{ color: '#000000' }}>{config.name || "MBOR B. STORE"}</h1>
                <p className="text-[10px] font-bold italic" style={{ color: '#000000' }}>{config.slogan || "L'excellence du sport"}</p>
                <div className="text-[9px] mt-2 space-y-0.5" style={{ color: '#000000' }}>
                    {config.address && <p>{config.address}</p>}
                    <p>TEL: {config.whatsappNumber || config.contactPhone || "+221 77 000 00 00"}</p>
                    <p>NINEA: 008765432 • RC: SN.DKR.2024.B.123</p>
                </div>
            </div>

            <div style={{ borderBottom: '1px dashed #000000', margin: '12px 0' }} />

            {/* Order Identity */}
            <div className="space-y-1 mb-3 text-[10px]" style={{ color: '#000000' }}>
                <div className="flex justify-between font-bold">
                    <span>TICKET: #{order.id.slice(-6).toUpperCase()}</span>
                    <span>CAISSE: 01</span>
                </div>
                <div>
                    <span>DATE: {new Date(order.createdAt).toLocaleString('fr-FR')}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100 uppercase font-black">
                    <span>CLIENT: {order.customerName || order.user?.name || "INVITÉ"}</span>
                </div>
            </div>

            <div style={{ borderBottom: '1px dashed #000000', margin: '12px 0' }} />

            {/* Items Table */}
            <div className="space-y-2 text-[10px]" style={{ color: '#000000' }}>
                <div className="flex justify-between font-black border-b border-black pb-1 mb-1">
                    <span style={{ width: '50%' }}>ARTICLE</span>
                    <span style={{ width: '10%', textAlign: 'center' }}>QT</span>
                    <span style={{ width: '40%', textAlign: 'right' }}>TOTAL</span>
                </div>
                {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-start">
                            <div style={{ width: '50%' }} className="flex flex-col">
                                <span className="uppercase font-bold">{item.product?.name || item.name}</span>
                            </div>
                            <span style={{ width: '10%', textAlign: 'center' }}>x{item.quantity}</span>
                            <span style={{ width: '40%', textAlign: 'right' }} className="font-bold">{(item.price * item.quantity).toLocaleString()} F</span>
                        </div>
                        {(item.customName || item.customNumber) && (
                            <p className="text-[9px] italic ml-2" style={{ color: '#374151' }}>
                                &gt;&gt; {item.customName} {item.customNumber && `#${item.customNumber}`}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ borderBottom: '1px dashed #000000', margin: '16px 0' }} />

            {/* Totals */}
            <div className="space-y-1 text-[10px]" style={{ color: '#000000' }}>
                <div className="flex justify-between font-bold">
                    <span>SOUS-TOTAL:</span>
                    <span>{Number(subtotal).toLocaleString()} F</span>
                </div>

                {order.deliveryType === "DELIVERY" && (
                    <div className="flex justify-between font-bold">
                        <span>LIVRAISON:</span>
                        <span>{Number(order.deliveryFee).toLocaleString()} F</span>
                    </div>
                )}

                <div className="flex justify-between text-sm font-black italic pt-2" style={{ color: '#000000' }}>
                    <span>TOTAL NET:</span>
                    <span>{Number(order.total).toLocaleString()} F CFA</span>
                </div>
            </div>

            <div style={{ borderBottom: '1px dashed #000000', margin: '16px 0' }} />

            {/* Payment Method */}
            <div className="flex justify-between text-[10px] font-bold" style={{ color: '#000000' }}>
                <span>REGLEMENT:</span>
                <span>{order.paymentMethod || "CASH"}</span>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 space-y-3" style={{ color: '#000000' }}>
                <p className="text-[10px] font-black uppercase tracking-widest">MERCI DE VOTRE VISITE !</p>
                <p className="text-[7px] leading-tight opacity-70 uppercase italic">
                    Les articles vendus ne sont ni repris ni échangés<br />
                    après un délai de 24h et sans le ticket.<br />
                    Mbor Business Store - L'élite au Sénégal.
                </p>
            </div>

            <style jsx>{`
                .receipt-container {
                    font-family: 'Courier New', Courier, monospace;
                    -webkit-font-smoothing: antialiased;
                }
                @media print {
                    @page { margin: 0; size: 80mm auto; }
                    .receipt-container {
                        width: 80mm !important;
                        margin: 0 !important;
                        padding: 5mm !important;
                    }
                }
            `}</style>
        </div>
    )
}
