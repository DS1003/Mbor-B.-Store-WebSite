import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Eye, Clock, CheckCircle2, Truck, XCircle } from "lucide-react"
import Link from "next/link"

const statusConfig = {
    PENDING: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    PAID: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
    SHIPPED: { icon: Truck, color: "text-blue-500", bg: "bg-blue-50" },
    DELIVERED: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    CANCELLED: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
}

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: { name: true, email: true }
            },
            items: {
                include: {
                    product: {
                        select: { name: true }
                    }
                }
            }
        }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black">Commandes</h1>
                <p className="text-zinc-500 font-medium text-sm mt-1">Gestion des Ventes / {orders.length} Transactions</p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Commande</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Client</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Statut</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Articles</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Total</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-zinc-300">
                                            <ShoppingCart className="h-12 w-12" />
                                            <p className="font-bold uppercase tracking-widest text-sm">Aucune commande trouvée</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => {
                                    const config = statusConfig[order.status as keyof typeof statusConfig]
                                    const StatusIcon = config.icon

                                    return (
                                        <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-black text-black text-sm">#{order.id.slice(0, 8).toUpperCase()}</p>
                                                    <p className="text-[10px] text-zinc-400 font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-bold text-black text-sm">{order.customerName || order.user?.name || "Invité"}</p>
                                                    <p className="text-[10px] text-zinc-400 lowercase">{order.customerEmail || order.user?.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} ${config.color}`}>
                                                    <StatusIcon className="h-3 w-3" />
                                                    <span className="text-[10px] font-black uppercase tracking-wider">{order.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-zinc-600 font-bold text-xs">{order.items.length} produit(s)</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-black text-black">{order.total.toLocaleString()} FCFA</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-black">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
