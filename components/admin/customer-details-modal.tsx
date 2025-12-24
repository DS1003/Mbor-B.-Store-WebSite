"use client"

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, ShoppingBag, TrendingUp, Award, User, MessageCircle, Calendar, CreditCard, Activity, ShieldCheck, ArrowRight, Info } from "lucide-react"
import { motion } from "framer-motion"

export function CustomerDetailsModal({ customer }: { customer: any }) {
    if (!customer) return null

    const totalOrders = customer.orders?.length || 0
    const totalSpent = customer.orders?.reduce((acc: number, order: any) => acc + Number(order.total), 0) || 0
    const isVIP = totalSpent > 150000

    return (
        <Dialog>
            <DialogTrigger asChild>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2.5 cursor-pointer hover:bg-zinc-50 p-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-all group w-full border border-transparent hover:border-zinc-100/50"
                >
                    <User className="h-4 w-4 group-hover:scale-110 transition-transform duration-500" />
                    Profil Client
                </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-[95vw] sm:w-full bg-white p-0 border-none rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col h-full max-h-[95vh] sm:max-h-[90vh]"
                >

                    {/* Identity Profile Header */}
                    <div className="p-6 sm:p-10 pb-4 sm:pb-6 space-y-6 sm:space-y-8 flex flex-col sm:flex-row sm:items-start justify-between shrink-0 bg-white z-10">
                        <div className="space-y-4 sm:space-y-6 flex-1">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-4 sm:gap-6"
                            >
                                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-[1.5rem] sm:rounded-[2rem] bg-zinc-950 text-[#FFD700] flex items-center justify-center text-3xl sm:text-4xl font-black shadow-2xl uppercase italic group relative overflow-hidden shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {customer.name?.charAt(0) || "C"}
                                </div>
                                <div className="space-y-1">
                                    <div className="px-2.5 py-1 bg-[#FFD700] text-zinc-950 rounded-lg text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] inline-flex items-center gap-2 shadow-sm border border-black/5">
                                        <ShieldCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                        Elite Identité
                                    </div>
                                    <DialogTitle className="text-2xl sm:text-4xl font-black uppercase italic tracking-tighter text-zinc-950 leading-none py-0.5">
                                        {customer.name}
                                    </DialogTitle>
                                    <p className="text-[10px] sm:text-[12px] font-medium text-zinc-400 italic lowercase truncate max-w-[180px] sm:max-w-none">{customer.email}</p>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0"
                        >
                            <span className="text-[8px] sm:text-[9px] font-black text-zinc-300 uppercase tracking-widest italic pt-2 order-2 sm:order-1">Signature ID</span>
                            <span className="text-[9px] sm:text-[11px] font-black bg-zinc-50 border border-zinc-100 px-3 py-1.5 sm:px-4 rounded-xl text-zinc-600 shadow-sm order-1 sm:order-2">
                                REG_#{customer.id.slice(0, 8).toUpperCase()}
                            </span>
                        </motion.div>
                    </div>

                    {/* Dashboard Metrics Area */}
                    <div className="px-6 sm:px-10 space-y-8 sm:space-y-10 overflow-y-auto custom-scrollbar pb-6 flex-1">

                        {/* Summary Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="p-6 sm:p-8 bg-zinc-50/50 border border-zinc-100 rounded-[1.8rem] sm:rounded-[2.5rem] space-y-3 sm:space-y-4 group hover:bg-white transition-all duration-500 shadow-sm"
                            >
                                <div className="flex items-center gap-3 text-zinc-400">
                                    <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Acquisitions totales</span>
                                </div>
                                <div className="flex items-baseline gap-2 sm:gap-3">
                                    <span className="text-4xl sm:text-6xl font-black text-zinc-950 italic tracking-tighter leading-none">{totalOrders}</span>
                                    <span className="text-[8px] sm:text-[10px] uppercase font-black text-zinc-300 italic tracking-widest">Flux</span>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="p-6 sm:p-8 bg-zinc-50/50 border border-zinc-100 rounded-[1.8rem] sm:rounded-[2.5rem] space-y-3 sm:space-y-4 group hover:bg-white transition-all duration-500 shadow-sm"
                            >
                                <div className="flex items-center gap-3 text-zinc-400">
                                    <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Capital Transit</span>
                                </div>
                                <div className="flex items-baseline gap-2 sm:gap-3">
                                    <span className="text-4xl sm:text-6xl font-black text-zinc-950 italic tracking-tighter leading-none">{totalSpent.toLocaleString()}</span>
                                    <span className="text-lg italic font-black text-zinc-200">F</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Order History Timeline */}
                        <div className="space-y-4 sm:space-y-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center justify-between ml-2"
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FFD700]" />
                                    <h4 className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-zinc-400 italic">Chronologie des Flux</h4>
                                </div>
                                <button className="text-[8px] sm:text-[9px] font-black text-zinc-300 uppercase tracking-widest hover:text-zinc-950 transition-colors">Registre complet</button>
                            </motion.div>
                            <div className="space-y-3">
                                {customer.orders && customer.orders.length > 0 ? (
                                    customer.orders.slice(0, 3).map((order: any, i: number) => (
                                        <motion.div
                                            key={order.id}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.7 + i * 0.1 }}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 bg-white border border-zinc-100 rounded-[1.5rem] sm:rounded-[2rem] hover:bg-zinc-50 group transition-all duration-500 gap-4"
                                        >
                                            <div className="flex items-center gap-4 sm:gap-6">
                                                <div className="h-10 w-10 sm:h-14 sm:w-14 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-300 group-hover:bg-zinc-950 group-hover:text-[#FFD700] transition-all border border-zinc-50">
                                                    <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-md sm:text-lg font-black text-zinc-950 uppercase italic tracking-tight group-hover:translate-x-1 transition-transform truncate max-w-[150px] sm:max-w-none">REGISTRY_#{order.id.slice(0, 8).toUpperCase()}</p>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[8px] sm:text-[9px] font-black text-zinc-400 uppercase tracking-widest italic">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                        <div className="h-2.5 w-px bg-zinc-200" />
                                                        <span className="text-[8px] sm:text-[9px] font-black text-emerald-500 uppercase tracking-widest">Validé</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xl sm:text-2xl font-black text-zinc-950 italic tracking-tighter self-end sm:self-center">
                                                {Number(order.total).toLocaleString()} <span className="text-xs opacity-30 italic">F</span>
                                            </p>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="py-12 sm:py-16 flex flex-col items-center justify-center bg-zinc-50/50 border border-zinc-100 border-dashed rounded-[2rem] sm:rounded-[3rem]">
                                        <ShoppingBag className="h-10 w-10 sm:h-12 text-zinc-100 mb-4" />
                                        <p className="text-[9px] sm:text-[11px] font-black text-zinc-300 uppercase tracking-widest italic">Néant Digital localisé</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Membership Status Bar */}
                        {isVIP && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.9 }}
                                className="bg-gradient-to-r from-[#FFD700]/10 via-[#FFD700]/5 to-transparent p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2.5rem] border border-[#FFD700]/20 flex items-center gap-4 sm:gap-6 shrink-0"
                            >
                                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-sm shrink-0">
                                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                                </div>
                                <div className="space-y-0.5 sm:space-y-1">
                                    <p className="text-[8px] sm:text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Elite Membership Validé</p>
                                    <p className="text-[9px] sm:text-[11px] font-medium text-zinc-400 leading-relaxed italic">
                                        Accès prioritaire aux canaux logistiques de Mbor Business Store.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Footer Tray */}
                    <div className="px-6 sm:px-10 py-6 sm:py-8 border-t border-zinc-50 bg-white flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-5 shrink-0">
                        <Button
                            variant="ghost"
                            className="w-full sm:w-auto text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-950 px-8 h-12 sm:h-14 rounded-xl sm:rounded-2xl transition-all order-2 sm:order-1"
                        >
                            Quitter
                        </Button>
                        <Button
                            className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 bg-zinc-950 text-white hover:bg-black rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-zinc-200 transition-all active:scale-95 flex items-center justify-center gap-4 group order-1 sm:order-2"
                        >
                            <MessageCircle className="h-4 w-4 text-[#FFD700] group-hover:rotate-12 transition-transform duration-500" />
                            Canal Direct
                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Button>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}
