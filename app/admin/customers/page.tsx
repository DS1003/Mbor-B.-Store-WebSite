import { prisma } from "@/lib/prisma"
import { Download } from "lucide-react"
import { SearchInput } from "@/components/admin/search-input"
import { PaginationControl } from "@/components/admin/pagination-control"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Mail } from "lucide-react"
import { PageTransition } from "@/components/admin/page-transition"
import { CustomerDetailsModal } from "@/components/admin/customer-details-modal"

export default async function AdminCustomersPage({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string
        page?: string
    }>
}) {
    const params = await searchParams
    const query = params?.q || ""
    const currentPage = Number(params?.page) || 1
    const itemsPerPage = 10
    const skip = (currentPage - 1) * itemsPerPage

    const where: any = {
        role: 'USER'
    }

    if (query) {
        where.OR = [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
        ]
    }

    const [customers, totalCount] = await Promise.all([
        prisma.user.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: itemsPerPage,
            include: {
                orders: true
            }
        }),
        prisma.user.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / itemsPerPage)

    return (
        <PageTransition>
            <div className="space-y-8 pb-20">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-900">Clients</h1>
                        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400 mt-1">Consultez et gérez vos clients.</p>
                    </div>
                    <button className="h-12 px-6 bg-black text-[#FFD700] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-900 flex items-center gap-3 shadow-lg shadow-black/20 hover:shadow-black/40 hover:scale-105 transition-all">
                        <Download className="h-4 w-4" />
                        Exporter
                    </button>
                </div>

                {/* Controls Bar */}
                <div className="bg-white/60 backdrop-blur-xl p-4 rounded-[2rem] border border-white/60 shadow-xl shadow-zinc-200/50 flex flex-col md:flex-row items-center gap-4 justify-between">
                    <SearchInput placeholder="Rechercher un client..." />
                </div>

                {/* Customers Table */}
                <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-xl shadow-zinc-200/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/40 border-b border-white/60">
                                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Client</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Contact</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Statut</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center">Commandes</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total Dépensé</th>
                                    <th className="px-8 py-6 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {customers.map((customer) => {
                                    const ltv = customer.orders.reduce((acc, order) => acc + Number(order.total), 0)
                                    const isPremium = ltv > 150000

                                    return (
                                        <tr key={customer.id} className="hover:bg-white/80 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-10 w-10 border border-zinc-100 ring-2 ring-white shadow-sm">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.email}`} />
                                                        <AvatarFallback className="bg-black text-[#FFD700] text-xs font-black">
                                                            {customer.name?.slice(0, 2).toUpperCase() || "C"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-zinc-900 group-hover:text-black transition-colors">{customer.name || "Utilisateur"}</span>
                                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">#{customer.id.slice(0, 8)}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                                                    <Mail className="h-3 w-3" />
                                                    {customer.email}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                {isPremium ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#FFD700]/10 text-black border border-[#FFD700]/50 shadow-sm">
                                                        VIP
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-500 border border-zinc-200">
                                                        Client
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-sm font-black text-zinc-900">{customer.orders.length}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-sm font-black italic tracking-tighter text-zinc-900">{ltv.toLocaleString()} F</span>
                                            </td>
                                            <td className="px-8 py-6 text-right flex items-center justify-end gap-2">
                                                <CustomerDetailsModal customer={customer} />

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-lg">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48 bg-white border border-zinc-100 rounded-xl shadow-xl shadow-zinc-200/50">
                                                        <DropdownMenuItem className="gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 cursor-pointer hover:bg-zinc-50 hover:text-black">
                                                            <Mail className="h-4 w-4" />
                                                            Contacter
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

                <PaginationControl totalPages={totalPages} currentPage={currentPage} />
            </div>
        </PageTransition>
    )
}
