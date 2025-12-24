"use client"

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Tag, Package, Image as ImageIcon, Sparkles, Edit3, Trash2, ArrowRight, ShieldCheck, Box, Info, Activity } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ProductDetailsModal({ product }: { product: any }) {
    if (!product) return null

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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col h-full max-h-[95vh] sm:max-h-[90vh]"
                >

                    {/* Editorial Header */}
                    <div className="p-6 sm:p-10 pb-4 sm:pb-6 space-y-4 sm:space-y-6 shrink-0 bg-white z-10">
                        <div className="flex items-center justify-between">
                            <motion.div
                                initial={{ scale: 0.8, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="h-10 w-10 sm:h-14 sm:w-14 bg-zinc-950 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-zinc-200 group relative"
                            >
                                <Box className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700] relative z-10" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="px-3 py-1 sm:px-4 sm:py-1.5 bg-zinc-50 border border-zinc-100 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2"
                            >
                                <ShieldCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#FFD700]" />
                                Authentification 2025
                            </motion.div>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                            <DialogTitle className="text-2xl sm:text-4xl font-black uppercase italic tracking-tighter text-zinc-950 leading-tight">
                                Profil de l'Article
                            </DialogTitle>
                            <p className="text-[10px] sm:text-sm font-medium text-zinc-400 italic">Configuration technique & Narration de l'actif.</p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="px-6 sm:px-10 space-y-6 sm:space-y-8 overflow-y-auto custom-scrollbar pb-6 flex-1">

                        {/* Featured Asset Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="p-4 sm:p-6 bg-zinc-50/50 border border-zinc-100 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col sm:flex-row items-center gap-6 sm:gap-8 group hover:bg-white hover:border-[#FFD700]/30 transition-all duration-500"
                        >
                            <div className="h-40 w-40 sm:h-48 sm:w-48 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-zinc-100 shadow-sm group-hover:scale-105 transition-transform duration-700 shrink-0">
                                {product.images?.[0] || product.imageUrl ? (
                                    <motion.img
                                        initial={{ filter: "blur(10px)" }}
                                        animate={{ filter: "blur(0px)" }}
                                        src={product.images?.[0] || product.imageUrl}
                                        className="h-full w-full object-contain p-2 sm:p-4 drop-shadow-xl"
                                        alt="item"
                                    />
                                ) : (
                                    <ImageIcon className="h-10 w-10 sm:h-12 text-zinc-100" />
                                )}
                            </div>
                            <div className="flex-1 space-y-4 sm:space-y-5 text-center sm:text-left">
                                <div className="space-y-1 sm:space-y-2">
                                    <p className="text-2xl sm:text-4xl font-black text-zinc-950 uppercase italic tracking-tighter leading-none">{product.name}</p>
                                    <p className="text-[8px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] sm:tracking-widest">Secteur: {product.category || "Elite"}</p>
                                </div>
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                                    <div className="px-3 py-1 bg-zinc-950 text-[#FFD700] rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-widest border border-zinc-800">
                                        REF_{product.id.slice(0, 8).toUpperCase()}
                                    </div>
                                    <div className="hidden sm:block h-4 w-px bg-zinc-200" />
                                    <p className="text-2xl sm:text-3xl font-black text-zinc-950 italic tracking-tighter">{Number(product.price).toLocaleString()} <span className="text-sm sm:text-lg opacity-30 italic">F</span></p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Interactive Metrics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-2 sm:space-y-3"
                            >
                                <label className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic ml-2">Stock Disponible</label>
                                <div className="h-14 sm:h-16 bg-white border border-zinc-100 px-5 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-between group hover:border-[#FFD700]/50 transition-all cursor-default">
                                    <p className="text-lg sm:text-xl font-black text-zinc-950 italic tracking-tighter">{product.stock} <span className="text-[8px] sm:text-[10px] not-italic text-zinc-300 uppercase font-black">Unités</span></p>
                                    <Package className="h-4 w-4 text-zinc-200 group-hover:text-[#FFD700] transition-colors" />
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-2 sm:space-y-3"
                            >
                                <label className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic ml-2">Classification</label>
                                <div className="h-14 sm:h-16 bg-white border border-zinc-100 px-5 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-between group hover:border-[#FFD700]/50 transition-all cursor-default">
                                    <p className="text-xs sm:text-sm font-black text-zinc-950 uppercase italic tracking-widest">{product.category || "Lifestyle"}</p>
                                    <Tag className="h-4 w-4 text-zinc-200 group-hover:text-[#FFD700] transition-colors" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Narrative Detail */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="space-y-3"
                        >
                            <label className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic ml-2">Narration de l'Actif</label>
                            <div className="bg-zinc-50/50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-zinc-100/50 relative overflow-hidden group min-h-[100px] flex items-center">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-5 transition-opacity duration-700">
                                    <Activity className="h-12 w-12 text-zinc-950" />
                                </div>
                                <p className="text-xs sm:text-sm font-medium text-zinc-500 leading-relaxed italic relative z-10 w-full">
                                    {product.description || "Aucune narration digitale spécifiée pour cet actif d'exception."}
                                </p>
                            </div>
                        </motion.div>

                        {/* Mobile Optimized Status Bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="bg-gradient-to-r from-[#FFD700]/10 via-[#FFD700]/5 to-transparent p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#FFD700]/10 flex items-center gap-3 sm:gap-4 shrink-0"
                        >
                            <div className="h-7 w-7 sm:h-8 sm:w-8 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FFD700]" />
                            </div>
                            <p className="text-[7px] sm:text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-tight">
                                Données synchronisées avec les serveurs Baraka Elite Cloud V3.
                            </p>
                        </motion.div>
                    </div>

                    {/* Adaptive Footer Tray */}
                    <div className="px-6 sm:px-10 py-6 sm:py-8 border-t border-zinc-50 bg-white flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-5 shrink-0">
                        <Button
                            variant="ghost"
                            className="w-full sm:w-auto text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-950 px-8 h-12 sm:h-14 rounded-xl sm:rounded-2xl transition-all order-2 sm:order-1"
                        >
                            Fermer
                        </Button>
                        <Button
                            className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 bg-zinc-950 text-white hover:bg-black font-black text-[9px] sm:text-[11px] uppercase tracking-[0.2em] rounded-xl sm:rounded-2xl shadow-xl shadow-zinc-200 flex items-center justify-center gap-3 sm:gap-4 transition-all group active:scale-95 order-1 sm:order-2"
                        >
                            <Edit3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FFD700] group-hover:rotate-12 transition-transform duration-500" />
                            Édition Premium
                        </Button>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}
