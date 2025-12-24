import { prisma } from "@/lib/prisma"
import { ProductsList } from "@/components/admin/products-list"
import { ProductFormModal } from "@/components/admin/product-form-modal"
import { SearchInput } from "@/components/admin/search-input"
import { PaginationControl } from "@/components/admin/pagination-control"
import { FilterControl } from "@/components/admin/filter-control"

export default async function AdminProductsPage({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string
        page?: string
        category?: string
    }>
}) {
    const params = await searchParams
    const query = params?.q || ""
    const category = params?.category || ""
    const currentPage = Number(params?.page) || 1
    const itemsPerPage = 10
    const skip = (currentPage - 1) * itemsPerPage

    // Filter Logic
    const where: any = {}

    if (category) {
        where.category = category
    }

    if (query) {
        where.OR = [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
        ]
    }

    // Fetch Data
    const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: itemsPerPage,
        }),
        prisma.product.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / itemsPerPage)

    const categories = [
        { label: "Maillots", value: "jerseys" },
        { label: "Sneakers", value: "sneakers" },
        { label: "Crampons", value: "boots" },
        { label: "Lifestyle", value: "lifestyle" },
    ]

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Inventaire</h1>
                    <p className="text-sm text-gray-500 mt-1">Gérez votre catalogue de produits.</p>
                </div>
                <ProductFormModal />
            </div>

            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col md:flex-row items-center gap-4 justify-between">
                <SearchInput placeholder="Rechercher un produit..." />

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <FilterControl options={categories} paramName="category" label="Catégorie" />
                </div>
            </div>

            <ProductsList products={JSON.parse(JSON.stringify(products))} />

            <PaginationControl totalPages={totalPages} currentPage={currentPage} />
        </div>
    )
}
