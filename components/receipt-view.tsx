"use client"

import * as React from "react"
import { Receipt } from "@/components/admin/receipt"
import { MessageCircle, Download, FileText, Loader2 } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { toast } from "sonner"

export function ReceiptView({ order, config }: { order: any, config: any }) {
    const [isDownloading, setIsDownloading] = React.useState(false)
    const receiptRef = React.useRef<HTMLDivElement>(null)

    if (!order) return null

    const handleWhatsAppShare = () => {
        const url = window.location.href;
        const message = `*MBOR B. STORE*\n\nBonjour ${order.customerName || order.user?.name || "Cher client"},\n\nMerci de votre confiance. Vous pouvez consulter votre reçu officiel ici :\n🔗 ${url}\n\nL'excellence du sport au Sénégal.`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    }

    const handleDownload = async () => {
        if (!receiptRef.current) return
        setIsDownloading(true)
        const toastId = toast.loading("Génération du reçu officiel...")

        try {
            const element = receiptRef.current
            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                backgroundColor: "#ffffff",
                onclone: (clonedDoc) => {
                    const elements = clonedDoc.getElementsByTagName('*');
                    for (let i = 0; i < elements.length; i++) {
                        const el = elements[i] as HTMLElement;
                        if (el.style) {
                            // Replace any computed color that might be using modern color functions
                            // html2canvas fails on oklch, lab, lch, etc.
                            // We just force critical elements to standard colors
                            if (el.classList.contains('receipt-container')) {
                                el.style.backgroundColor = '#ffffff';
                                el.style.color = '#111827';
                            }
                        }
                    }
                }
            })

            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            })

            const imgWidth = 210 // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width

            // Add a little margin
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
            pdf.save(`recu_mborstore_${order.id.slice(-6).toUpperCase()}.pdf`)

            toast.success("Reçu téléchargé avec succès", { id: toastId })
        } catch (error) {
            console.error("Download error:", error)
            toast.error("Erreur lors du téléchargement", { id: toastId })
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <div className="max-w-xl w-full mx-auto px-4 py-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white p-6 md:p-12 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex flex-col items-center mb-10">
                        {config.logoUrl ? (
                            <img src={config.logoUrl} alt="Store Logo" className="h-10 w-auto mb-6 object-contain" />
                        ) : (
                            <div className="h-12 w-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3">
                                <span className="text-white font-serif italic text-lg">M.</span>
                            </div>
                        )}
                        <h1 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2">E-Reçu Client</h1>
                        <p className="text-2xl font-bold text-gray-900 tracking-tight">#{order.id.slice(-6).toUpperCase()}</p>
                    </div>

                    <div
                        ref={receiptRef}
                        className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-10"
                    >
                        <Receipt order={order} config={config} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="h-16 bg-white text-gray-900 rounded-2xl font-bold text-[13px] uppercase tracking-wider hover:bg-gray-50 transition-all border border-gray-100 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                        >
                            {isDownloading ? (
                                <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
                            ) : (
                                <Download className="h-4 w-4 text-amber-500" />
                            )}
                            Télécharger PDF
                        </button>

                        <button
                            onClick={handleWhatsAppShare}
                            className="h-16 bg-gray-900 text-white rounded-2xl font-bold text-[13px] uppercase tracking-wider hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            <MessageCircle className="h-4 w-4" /> Partager WhatsApp
                        </button>
                    </div>

                    <p className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em] leading-loose mt-12 opacity-60">
                        {config.name || "MBOR B. STORE"} • L'élite au Sénégal<br />
                        Accompagner votre passion.
                    </p>
                </div>
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
