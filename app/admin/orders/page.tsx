import { prisma } from "@/lib/prisma"
import { OrdersList } from "@/components/admin/orders-list"
import { Download } from "lucide-react"
import { SearchInput } from "@/components/admin/search-input"
import { PaginationControl } from "@/components/admin/pagination-control"
import { FilterControl } from "@/components/admin/filter-control"

export default async function AdminOrdersPage({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string
        page?: string
        status?: string
    }>
}) {
    const params = await searchParams
    const query = params?.q || ""
    const status = params?.status || ""
    const currentPage = Number(params?.page) || 1
    const itemsPerPage = 10
    const skip = (currentPage - 1) * itemsPerPage

    const where: any = {}

    if (status) {
        where.status = status
    }

    if (query) {
        where.OR = [
            { id: { contains: query, mode: 'insensitive' } },
            { customerName: { contains: query, mode: 'insensitive' } },
            { customerEmail: { contains: query, mode: 'insensitive' } },
        ]
    }

    const [orders, totalCount] = await Promise.all([
        prisma.order.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: itemsPerPage,
            include: { items: { include: { product: true } } }
        }),
        prisma.order.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / itemsPerPage)

    const statusOptions = [
        { label: "En attente", value: "PENDING" },
        { label: "Payé", value: "PAID" },
        { label: "Expédié", value: "SHIPPED" },
        { label: "Livré", value: "DELIVERED" },
        { label: "Annulé", value: "CANCELLED" },
    ]

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Commandes</h1>
                    <p className="text-sm text-gray-500 mt-1">Gérez et suivez les commandes clients.</p>
                </div>
                <button className="h-10 px-4 bg-white border border-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 hover:text-gray-900 flex items-center gap-2 transition-all shadow-sm">
                    <Download className="h-4 w-4" />
                    Exporter
                </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col md:flex-row items-center gap-4 justify-between">
                <SearchInput placeholder="Rechercher une commande..." />

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <FilterControl options={statusOptions} paramName="status" label="Statut" />
                </div>
            </div>

            <OrdersList orders={JSON.parse(JSON.stringify(orders))} />

            <PaginationControl totalPages={totalPages} currentPage={currentPage} />
        </div>
    )
}
