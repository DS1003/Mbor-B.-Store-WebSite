"use client"

import * as React from "react"
import { Receipt } from "@/components/admin/receipt"
import { Printer, MessageCircle, Share2, Download } from "lucide-react"

export function ReceiptView({ order, config }: { order: any, config: any }) {
    if (!order) return null

    const handleWhatsAppShare = () => {
        const url = window.location.href;
        const message = `*MBOR B. STORE - VOTRE REÇU*\n\nBonjour ${order.customerName || order.user?.name || "Cher client"},\n\nMerci pour votre commande ! Voici votre reçu digital officiel :\n🔗 ${url}\n\nL'excellence du sport au Sénégal.`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    }

    return (
        <div className="max-w-md w-full">
            <div className="bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-gray-100 p-8 pt-10">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-6 rotate-3">
                        <span className="text-white font-black text-xl italic leading-none">M.</span>
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Votre <span className="text-indigo-600">Reçu.</span></h1>
                    <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest mt-1">Mbor Business Store</p>
                </div>

                <div className="border border-gray-50 rounded-3xl overflow-hidden bg-gray-50/30">
                    <Receipt order={order} config={config} />
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="h-14 bg-black text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Printer className="h-4 w-4" /> Imprimer
                    </button>

                    <button
                        onClick={handleWhatsAppShare}
                        className="h-14 bg-[#25D366] text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-[#128C7E] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                    </button>
                </div>

                <p className="text-center text-[10px] text-gray-400 font-black uppercase tracking-widest leading-loose mt-8">
                    Merci de votre achat chez l'élite.<br />
                    Ce reçu est votre preuve d'authenticité.
                </p>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body > *:not(.receipt-wrapper) {
                        display: none !important;
                    }
                    .receipt-wrapper {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                    }
                    .receipt-wrapper * {
                        visibility: visible !important;
                    }
                    .receipt-container {
                        width: 80mm !important;
                        margin: 0 auto !important;
                        box-shadow: none !important;
                        border: none !important;
                    }
                    .print-hidden, button {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    )
}
