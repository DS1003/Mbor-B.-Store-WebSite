import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Plus, Package, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black">Inventaire</h1>
                    <p className="text-zinc-500 font-medium text-sm mt-1">Gestion des Articles / {products.length} Produits</p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="h-12 px-6 bg-black text-white hover:bg-[#FFD700] hover:text-black font-black uppercase tracking-widest text-xs rounded-sm transition-all group shadow-lg">
                        <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                        Nouveau Produit
                    </Button>
                </Link>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Produit</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Catégorie</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Prix</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Stock</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-zinc-300">
                                            <Package className="h-12 w-12" />
                                            <p className="font-bold uppercase tracking-widest text-sm">Aucun produit trouvé</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-zinc-100 overflow-hidden relative border border-zinc-200">
                                                    {product.images[0] ? (
                                                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-zinc-300">
                                                            <Package className="h-6 w-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-black text-sm">{product.name}</p>
                                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">ID: {product.id.slice(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] px-2 py-1 bg-zinc-100 text-zinc-600 rounded-sm font-black uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-black text-black">{product.price.toString()} FCFA</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className={`font-bold text-sm ${product.stock < 10 ? 'text-red-500' : 'text-zinc-600'}`}>
                                                {product.stock}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-black">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <form action={async () => {
                                                    "use server"
                                                    const { deleteProduct } = await import("./_actions")
                                                    await deleteProduct(product.id)
                                                }}>
                                                    <Button variant="ghost" size="icon" type="submit" className="h-8 w-8 text-zinc-400 hover:text-red-500">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </form>
                                            </div>
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
