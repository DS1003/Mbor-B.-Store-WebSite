"use client"

import { MoreVertical, Eye, FileText, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OrderDetailsModal } from "@/components/admin/order-details-modal"

interface OrdersListProps {
    orders: any[]
}

const statusConfig: any = {
    PAID: { label: "Payé", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    PENDING: { label: "En attente", color: "bg-amber-100 text-amber-800 border-amber-200" },
    SHIPPED: { label: "Expédié", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
    DELIVERED: { label: "Livré", color: "bg-zinc-100 text-zinc-800 border-zinc-200" },
    CANCELLED: { label: "Annulé", color: "bg-rose-100 text-rose-800 border-rose-200" },
}

export function OrdersList({ orders }: OrdersListProps) {
    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-xl shadow-zinc-200/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/40 border-b border-white/60">
                            <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Commande</th>
                            <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Client</th>
                            <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Statut</th>
                            <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total</th>
                            <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Date</th>
                            <th className="px-8 py-6 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-8 py-16 text-center text-zinc-400 text-sm font-bold uppercase tracking-wider">
                                    Aucune commande trouvée.
                                </td>
                            </tr>
                        )}
                        {orders.map((order) => {
                            const status = statusConfig[order.status] || statusConfig.PENDING

                            return (
                                <tr key={order.id} className="hover:bg-white/80 transition-colors group">
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-zinc-900 group-hover:text-black">#{order.id.slice(0, 8)}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-zinc-900 uppercase tracking-wide">{order.customerName || "Client Invité"}</span>
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{order.customerEmail || "-"}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${status.color}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black italic tracking-tighter text-zinc-900">{Number(order.total).toLocaleString()} F</span>
                                    </td>
                                    <td className="px-8 py-6 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-8 py-6 text-right flex items-center justify-end gap-2">
                                        <OrderDetailsModal order={order} />

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-lg">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 bg-white border border-zinc-100 rounded-xl shadow-xl shadow-zinc-200/50">
                                                <DropdownMenuItem className="gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 cursor-pointer hover:bg-zinc-50 hover:text-black">
                                                    <FileText className="h-4 w-4" />
                                                    Facture
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 cursor-pointer hover:bg-zinc-50 hover:text-black">
                                                    <Truck className="h-4 w-4" />
                                                    Marquer Expédié
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
