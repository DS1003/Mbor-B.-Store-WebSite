"use client"

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Package, Calendar, Download, User, CheckCircle2, Hash, Activity, Sparkles, CreditCard, Info, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function OrderDetailsModal({ order }: { order: any }) {
    if (!order) return null

    return (
        <Dialog>
            <DialogTrigger asChild>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2.5 cursor-pointer hover:bg-zinc-50 p-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-all group w-full border border-transparent hover:border-zinc-100/50"
                >
                    <Eye className="h-4 w-4 group-hover:scale-110 transition-transform duration-500" />
                    Explorer
                </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-[95vw] sm:w-full bg-white p-0 border-none rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col h-full max-h-[95vh] sm:max-h-[90vh]"
                >

                    {/* Editorial Header */}
                    <div className="p-6 sm:p-10 pb-4 sm:pb-6 space-y-4 sm:space-y-6 shrink-0 bg-white z-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="h-10 w-10 sm:h-14 sm:w-14 bg-zinc-950 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-zinc-200 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700] relative z-10" />
                            </motion.div>
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className={`self-start sm:self-center px-4 py-1.5 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3 border shadow-sm ${order.status === 'PAID'
                                    ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                    : 'bg-amber-50 border-amber-100 text-amber-600'
                                    }`}
                            >
                                <div className={`h-2 w-2 rounded-full ${order.status === 'PAID' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                                {order.status === 'PAID' ? 'Registre Certifié' : 'Traitement de Flux'}
                            </motion.div>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                            <DialogTitle className="text-2xl sm:text-4xl font-black uppercase italic tracking-tighter text-zinc-950 leading-tight">
                                Registry Archive <span className="text-zinc-300">#</span>{order.id.slice(0, 8).toUpperCase()}
                            </DialogTitle>
                            <p className="text-[10px] sm:text-sm font-medium text-zinc-400 italic">Audit logistique & Validation des actifs transitaires.</p>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="px-6 sm:px-10 space-y-6 sm:space-y-8 overflow-y-auto custom-scrollbar pb-6 flex-1">

                        {/* Compact Summary Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="p-5 sm:p-8 bg-zinc-50/50 border border-zinc-100 rounded-[1.5rem] sm:rounded-[2.5rem] flex flex-col sm:flex-row items-center gap-6 sm:gap-8 group hover:bg-white transition-all duration-500"
                        >
                            <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white rounded-2xl flex items-center justify-center text-zinc-200 border border-zinc-100 shadow-sm group-hover:scale-105 transition-all shrink-0">
                                <User className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-300 group-hover:text-black transition-colors" />
                            </div>
                            <div className="flex-1 space-y-3 text-center sm:text-left">
                                <div className="space-y-1">
                                    <p className="text-[8px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none italic">Acquéreur Certifié</p>
                                    <p className="text-xl sm:text-2xl font-black text-zinc-950 uppercase italic tracking-tight">{order.customerName}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-6">
                                    <p className="text-[10px] sm:text-[11px] font-medium text-zinc-400">{order.customerEmail}</p>
                                    <div className="hidden sm:block h-4 w-px bg-zinc-200" />
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3.5 w-3.5 text-[#FFD700]" />
                                        <p className="text-[8px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-widest italic">{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Item List */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-4 ml-2"
                            >
                                <Hash className="h-4 w-4 text-[#FFD700]" />
                                <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">Bilan des Acquisitions</h4>
                            </motion.div>
                            <div className="space-y-3">
                                {order.items?.map((item: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 + i * 0.1 }}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white border border-zinc-100 rounded-[1.5rem] sm:rounded-[2rem] group hover:border-[#FFD700]/30 transition-all gap-4"
                                    >
                                        <div className="flex items-center gap-5 sm:gap-6">
                                            <div className="h-12 w-12 sm:h-14 sm:w-14 bg-zinc-50 rounded-xl flex items-center justify-center overflow-hidden border border-zinc-100 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                {item.product?.imageUrl || item.product?.images?.[0] ? (
                                                    <img src={item.product?.imageUrl || item.product?.images?.[0]} className="h-full w-full object-contain p-1" alt="item" />
                                                ) : (
                                                    <Package className="h-6 w-6 text-zinc-200" />
                                                )}
                                            </div>
                                            <div className="space-y-1 sm:space-y-1.5">
                                                <p className="text-[12px] sm:text-sm font-black text-zinc-950 uppercase italic tracking-tight">{item.product?.name}</p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[8px] sm:text-[9px] font-black bg-zinc-950 text-[#FFD700] px-2 py-0.5 rounded-md">QTE: {item.quantity}</span>
                                                    <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{Number(item.price).toLocaleString()} F_UNIT</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-lg sm:text-xl font-black text-zinc-950 italic tracking-tighter sm:pr-2 self-end sm:self-center">{(item.price * item.quantity).toLocaleString()} <span className="text-[10px] sm:text-xs opacity-30">F</span></p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Financial Ledger Bar */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="bg-gradient-to-r from-zinc-950 to-zinc-800 p-6 sm:p-8 rounded-[1.8rem] sm:rounded-[2.5rem] relative overflow-hidden text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-[0.05] blur-[100px]" />
                            <div className="space-y-3 sm:space-y-4 relative z-10 text-center sm:text-left">
                                <div className="flex items-center justify-center sm:justify-start gap-3">
                                    <div className="h-1 w-6 sm:w-8 bg-[#FFD700] rounded-full" />
                                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.5em] text-[#FFD700]/70">Capitaux Validés</span>
                                </div>
                                <p className="text-[9px] sm:text-[11px] font-medium text-zinc-500 max-w-[280px] leading-relaxed italic mx-auto sm:mx-0">
                                    Incluant protocole logistique Elite & authentification des certificats.
                                </p>
                            </div>
                            <div className="text-center sm:text-right relative z-10 flex flex-col justify-center items-center sm:items-end pr-0 sm:pr-4">
                                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-1">Impact Financier</span>
                                <p className="text-4xl sm:text-5xl font-black italic tracking-tighter text-[#FFD700] leading-none">
                                    {Number(order.total).toLocaleString()} <span className="text-lg sm:text-xl not-italic opacity-40">F</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Info Bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="bg-zinc-50 border border-zinc-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4 shrink-0"
                        >
                            <div className="h-7 w-7 sm:h-8 sm:w-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                                <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-400" />
                            </div>
                            <p className="text-[7px] sm:text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-tight">
                                Archivage sécurisé via Baraka Registry Protocol v2.5.24.
                            </p>
                        </motion.div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-6 sm:px-10 py-6 sm:py-8 border-t border-zinc-50 bg-white flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 shrink-0">
                        <Button
                            variant="ghost"
                            className="w-full sm:w-auto text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-950 px-8 h-12 sm:h-14 rounded-xl sm:rounded-2xl transition-all order-2 sm:order-1"
                        >
                            Fermer
                        </Button>
                        <Button
                            className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 bg-zinc-950 text-white hover:bg-black rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-zinc-200 flex items-center justify-center gap-3 sm:gap-4 transition-all group active:scale-95 order-1 sm:order-2"
                        >
                            <Download className="h-4 w-4 text-[#FFD700] group-hover:scale-110 transition-transform" />
                            Extraire Facture
                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Button>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}
