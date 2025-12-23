import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Upload, Package } from "lucide-react"
import Link from "next/link"
import { createProduct } from "../_actions"

export default function NewProductPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/products">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-black">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter text-black">Nouveau Produit</h1>
                    <p className="text-zinc-500 font-medium text-sm mt-1">Ajouter à l'Inventaire MBOR</p>
                </div>
            </div>

            <form action={createProduct} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="p-8 bg-white border border-zinc-200 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Nom du Produit</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="w-full h-12 bg-zinc-50 border border-zinc-100 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all font-bold"
                                placeholder="Ex: Real Madrid 24/25 Jersey"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                rows={4}
                                className="w-full bg-zinc-50 border border-zinc-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all font-medium"
                                placeholder="Détails du produit, matériaux, coupe..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="price" className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Prix (FCFA)</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    required
                                    className="w-full h-12 bg-zinc-50 border border-zinc-100 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all font-bold"
                                    placeholder="45000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="stock" className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Stock Initial</label>
                                <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    required
                                    className="w-full h-12 bg-zinc-50 border border-zinc-100 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all font-bold"
                                    placeholder="50"
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8 bg-white border border-zinc-200 space-y-6">
                        <h3 className="text-sm font-black uppercase italic tracking-tighter text-black">Média du Produit</h3>
                        <div className="space-y-4">
                            <div className="h-48 border-2 border-dashed border-zinc-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-zinc-400 hover:border-black hover:text-black transition-all cursor-pointer bg-zinc-50">
                                <Upload className="h-8 w-8" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Glissez vos images ou cliquez ici</p>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="imageUrl" className="text-[10px] font-black uppercase tracking-widest text-zinc-400">URL de l'image (Alternative)</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    id="imageUrl"
                                    className="w-full h-12 bg-zinc-50 border border-zinc-100 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all font-medium"
                                    placeholder="https://images.com/product.jpg"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="p-8 bg-white border border-zinc-200 space-y-6">
                        <h3 className="text-sm font-black uppercase italic tracking-tighter text-black">Organisation</h3>
                        <div className="space-y-2">
                            <label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Catégorie</label>
                            <select
                                name="category"
                                id="category"
                                required
                                className="w-full h-12 bg-zinc-50 border border-zinc-100 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all font-bold appearance-none cursor-pointer"
                            >
                                <option value="jerseys">Maillots</option>
                                <option value="sneakers">Sneakers</option>
                                <option value="boots">Crampons</option>
                                <option value="lifestyle">Lifestyle</option>
                            </select>
                        </div>
                    </Card>

                    <div className="space-y-4">
                        <Button type="submit" className="w-full h-16 bg-black text-white hover:bg-[#FFD700] hover:text-black font-black uppercase tracking-widest text-xs rounded-xl shadow-2xl transition-all">
                            Publier le Produit
                        </Button>
                        <Link href="/admin/products" className="block">
                            <Button type="button" variant="ghost" className="w-full h-12 text-zinc-400 hover:text-red-500 font-bold uppercase tracking-widest text-[10px]">
                                Annuler
                            </Button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
