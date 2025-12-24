import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Upload, Package } from "lucide-react"
import Link from "next/link"
import { createProduct } from "../_actions"

export default function NewProductPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/products">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-900 rounded-lg">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Nouveau Produit</h1>
                    <p className="text-sm text-gray-500 mt-1">Ajoutez un nouvel article à votre inventaire.</p>
                </div>
            </div>

            <form action={createProduct} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Nom du Produit</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="w-full h-10 bg-gray-50 border border-gray-200 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all text-sm"
                                placeholder="Ex: Maillot Real Madrid 24/25"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                rows={4}
                                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all text-sm"
                                placeholder="Détails du produit..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="price" className="text-sm font-medium text-gray-700">Prix (FCFA)</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    required
                                    className="w-full h-10 bg-gray-50 border border-gray-200 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all text-sm"
                                    placeholder="45000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock Initial</label>
                                <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    required
                                    className="w-full h-10 bg-gray-50 border border-gray-200 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all text-sm"
                                    placeholder="50"
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900">Images</h3>
                        <div className="space-y-4">
                            <div className="h-40 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer bg-gray-50">
                                <Upload className="h-6 w-6" />
                                <span className="text-xs font-medium">Cliquez pour uploader une image</span>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">Ou via URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    id="imageUrl"
                                    className="w-full h-10 bg-gray-50 border border-gray-200 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900">Catégorisation</h3>
                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium text-gray-700">Catégorie</label>
                            <select
                                name="category"
                                id="category"
                                required
                                className="w-full h-10 bg-gray-50 border border-gray-200 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all text-sm appearance-none cursor-pointer"
                            >
                                <option value="jerseys">Maillots</option>
                                <option value="sneakers">Sneakers</option>
                                <option value="boots">Crampons</option>
                                <option value="lifestyle">Lifestyle</option>
                            </select>
                        </div>
                    </Card>

                    <div className="space-y-3">
                        <Button type="submit" className="w-full h-12 bg-indigo-600 text-white hover:bg-indigo-700 font-medium text-sm rounded-lg shadow-sm transition-all">
                            Publier le Produit
                        </Button>
                        <Link href="/admin/products" className="block">
                            <Button type="button" variant="outline" className="w-full h-12 border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium text-sm rounded-lg">
                                Annuler
                            </Button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
