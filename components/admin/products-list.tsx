"use client"

import { Product } from "@prisma/client"
import { MoreVertical, ExternalLink, Edit3, Trash2, Box, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteProduct } from "@/app/admin/products/_actions"
import { toast } from "sonner"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ProductDetailsModal } from "@/components/admin/product-details-modal"
import { ProductFormModal } from "@/components/admin/product-form-modal"

interface ProductsListProps {
    products: any[]
}

export function ProductsList({ products }: ProductsListProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const confirmDelete = async () => {
        if (!deleteId) return
        try {
            await deleteProduct(deleteId)
            toast.success("Produit supprimé avec succès")
        } catch (error) {
            toast.error("Erreur lors de la suppression")
        } finally {
            setDeleteId(null)
        }
    }

    return (
        <>
            <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-xl shadow-zinc-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/40 border-b border-white/60">
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest w-20">Image</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Produit</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Catégorie</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Prix</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Stock</th>
                                <th className="px-8 py-6 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-8 py-16 text-center text-zinc-400 text-sm font-bold uppercase tracking-wider">
                                        Aucun produit trouvé.
                                    </td>
                                </tr>
                            )}
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-white/80 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="h-14 w-14 rounded-2xl bg-white border border-zinc-100 overflow-hidden relative shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            {product.images[0] ? (
                                                <img src={product.images[0]} className="h-full w-full object-cover" alt="" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full w-full bg-zinc-50">
                                                    <Box className="h-5 w-5 text-zinc-300" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-zinc-900 group-hover:text-black uppercase tracking-wide">{product.name}</span>
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">#{product.id.slice(0, 8)}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-600 border border-zinc-200">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black italic tracking-tighter text-zinc-900">{Number(product.price).toLocaleString()} F</span>
                                            {product.discountPrice && (
                                                <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-wider bg-black px-2 py-0.5 rounded w-fit mt-1">Promo</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-2 max-w-[140px]">
                                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                                                <span className="text-zinc-500">{product.stock} en stock</span>
                                                <span className={`${product.stock < 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                                    {product.stock < 5 ? 'Bas' : 'OK'}
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${product.stock < 5 ? 'bg-amber-400' : 'bg-black'}`}
                                                    style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right flex items-center justify-end gap-2">
                                        <ProductDetailsModal product={product} />

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-lg">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 bg-white border border-zinc-100 rounded-xl shadow-xl shadow-zinc-200/50 p-2">
                                                <ProductFormModal
                                                    product={product}
                                                    trigger={
                                                        <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 cursor-pointer hover:bg-zinc-50 hover:text-black rounded-lg transition-colors">
                                                            <Edit3 className="h-4 w-4" />
                                                            Modifier
                                                        </div>
                                                    }
                                                />
                                                <DropdownMenuItem
                                                    className="gap-2 text-[10px] font-bold uppercase tracking-widest text-rose-600 cursor-pointer hover:bg-rose-50 hover:text-rose-700 rounded-lg mt-1"
                                                    onClick={() => setDeleteId(product.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent className="bg-white rounded-[2rem] border border-zinc-100 shadow-2xl p-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black italic tracking-tighter uppercase text-zinc-900">Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-2">
                            Cette action est irréversible. Cela supprimera définitivement le produit et toutes les données associées.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 gap-3">
                        <AlertDialogCancel className="rounded-xl border-zinc-200 text-xs font-bold uppercase tracking-wider h-10 w-full hover:bg-zinc-50 hover:text-black hover:border-black">Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-black hover:bg-zinc-900 text-[#FFD700] rounded-xl text-xs font-black uppercase tracking-wider h-10 w-full shadow-lg shadow-black/20">
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
