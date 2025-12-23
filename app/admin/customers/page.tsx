import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Users, Mail, ShoppingBag, Calendar } from "lucide-react"

export default async function AdminCustomersPage() {
    const customers = await prisma.user.findMany({
        where: { role: "USER" },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { orders: true }
            }
        }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black">Clients</h1>
                <p className="text-zinc-500 font-medium text-sm mt-1">Base de Données / {customers.length} Utilisateurs</p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Utilisateur</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Contact</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Commandes</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Inscrit le</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-zinc-300">
                                            <Users className="h-12 w-12" />
                                            <p className="font-bold uppercase tracking-widest text-sm">Aucun client trouvé</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 font-black text-sm uppercase">
                                                    {customer.name?.slice(0, 2) || customer.email.slice(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-black text-sm">{customer.name || "Sans Nom"}</p>
                                                    <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-tighter">ID: {customer.id.slice(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-zinc-600 font-bold text-xs">
                                                <Mail className="h-3 w-3 text-zinc-300" />
                                                {customer.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-black font-black text-xs">
                                                <ShoppingBag className="h-3 w-3 text-[#FFD700]" />
                                                {customer._count.orders} commande(s)
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-zinc-400 font-medium text-xs">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(customer.createdAt).toLocaleDateString("fr-FR")}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black">
                                                Détails
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
