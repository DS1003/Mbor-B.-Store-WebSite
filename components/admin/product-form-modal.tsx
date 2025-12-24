"use client"

import { Button } from "@/components/ui/button"
import { Upload, Package, Tag, Coins, Type, Image as ImageIcon, CheckCircle2, X, Plus, Edit3, Sparkles } from "lucide-react"
import { createProduct, updateProduct } from "@/app/admin/products/_actions"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

interface ProductFormModalProps {
    product?: any
    trigger?: React.ReactNode
}

export function ProductFormModal({ product, trigger }: ProductFormModalProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const isEditing = !!product

    const handleSubmit = async (formData: FormData) => {
        setLoading(true)
        try {
            const result = isEditing
                ? await updateProduct(product.id, formData)
                : await createProduct(formData)

            if (result.success) {
                toast.success(isEditing ? "Article synchronisé" : "Produit archivé avec succès")
                setOpen(false)
            }
        } catch (error) {
            toast.error("Échec de la synchronisation")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="bg-zinc-950 hover:bg-black text-white gap-2.5 rounded-2xl px-6 h-12 font-bold uppercase tracking-widest text-[10px] shadow-2xl shadow-zinc-200 transition-all active:scale-95 group">
                        <Plus className="h-4 w-4 text-[#FFD700] group-hover:rotate-90 transition-transform duration-500" />
                        Nouveau Produit
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white p-0 border-none rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                <form action={handleSubmit} className="flex flex-col max-h-[90vh]">
                    {/* Editorial Header */}
                    <div className="px-10 py-8 border-b border-zinc-50 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 bg-zinc-950 rounded-[1.25rem] flex items-center justify-center shadow-xl shadow-zinc-200 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Sparkles className="h-5 w-5 text-[#FFD700]" />
                            </div>
                            <div className="space-y-0.5">
                                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-zinc-950 leading-none">
                                    {isEditing ? "Édition Premium" : "Nouvel Article"}
                                </DialogTitle>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Inventory Configuration System v2.5</p>
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setOpen(false)}
                            className="rounded-full hover:bg-zinc-50 h-10 w-10 transition-colors"
                        >
                            <X className="h-5 w-5 text-zinc-300" />
                        </Button>
                    </div>

                    {/* Clean Form Body */}
                    <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
                        {/* Row 1: Designation */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 ml-1">
                                <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Désignation de l'article</label>
                            </div>
                            <input
                                type="text"
                                name="name"
                                defaultValue={product?.name}
                                required
                                className="w-full h-14 bg-zinc-50/50 border border-zinc-100 px-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-zinc-950/5 focus:border-zinc-900 transition-all text-sm font-bold text-zinc-950 placeholder:text-zinc-300"
                                placeholder="ex: Maillot Collector 2025"
                            />
                        </div>

                        {/* Row 2: Metrics Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 ml-1">
                                    <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Valeur (CFA)</label>
                                </div>
                                <div className="relative group">
                                    <Coins className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300 group-focus-within:text-[#FFD700] transition-colors" />
                                    <input
                                        type="number"
                                        name="price"
                                        defaultValue={product?.price ? Number(product.price) : ""}
                                        required
                                        className="w-full h-14 bg-zinc-50/50 border border-zinc-100 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-zinc-950/5 focus:border-zinc-900 transition-all text-sm font-black italic"
                                        placeholder="00"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 ml-1">
                                    <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Inaccessible / Stock</label>
                                </div>
                                <div className="relative group">
                                    <Package className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300 group-focus-within:text-[#FFD700] transition-colors" />
                                    <input
                                        type="number"
                                        name="stock"
                                        defaultValue={product?.stock}
                                        required
                                        className="w-full h-14 bg-zinc-50/50 border border-zinc-100 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-zinc-950/5 focus:border-zinc-900 transition-all text-sm font-black italic"
                                        placeholder="50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 3: Class & Visuals */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 ml-1">
                                    <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Secteur / Catégorie</label>
                                </div>
                                <div className="relative group">
                                    <Tag className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300 z-10 group-focus-within:text-[#FFD700] transition-colors" />
                                    <select
                                        name="category"
                                        defaultValue={product?.category || "lifestyle"}
                                        required
                                        className="w-full h-14 bg-zinc-50/50 border border-zinc-100 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-zinc-950/5 focus:border-zinc-900 transition-all text-[11px] font-black uppercase tracking-widest appearance-none cursor-pointer"
                                    >
                                        <option value="Maillots">Maillots de Football</option>
                                        <option value="Sneakers">Sneakers Elite</option>
                                        <option value="Crampons">Crampons Performance</option>
                                        <option value="Lifestyle">Lifestyle Urban</option>
                                        <option value="Accessoires">Accessoires</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 ml-1">
                                    <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Capture Visuelle (URL)</label>
                                </div>
                                <div className="relative group">
                                    <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300 group-focus-within:text-[#FFD700] transition-colors" />
                                    <input
                                        type="url"
                                        name="imageUrl"
                                        defaultValue={product?.images?.[0] || ""}
                                        className="w-full h-14 bg-zinc-50/50 border border-zinc-100 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-zinc-950/5 focus:border-zinc-900 transition-all text-sm font-medium italic text-zinc-500"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 4: Narrative */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 ml-1">
                                <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Narration / Description</label>
                            </div>
                            <textarea
                                name="description"
                                defaultValue={product?.description}
                                rows={4}
                                className="w-full bg-zinc-50/50 border border-zinc-100 p-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-zinc-950/5 focus:border-zinc-900 transition-all text-sm font-medium text-zinc-600 resize-none placeholder:text-zinc-300 leading-relaxed italic"
                                placeholder="..."
                            />
                        </div>
                    </div>

                    {/* Functional Footer Tray */}
                    <div className="px-10 py-8 border-t border-zinc-50 flex items-center justify-end gap-4 bg-white">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="h-14 px-8 border border-zinc-100 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50 transition-all"
                        >
                            Interrompre
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-14 px-10 bg-zinc-950 text-white hover:bg-black font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-zinc-200 flex items-center gap-3 transition-all active:scale-95 group"
                        >
                            {loading ? (
                                <div className="h-4 w-4 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isEditing ? "Synchroniser" : "Enregistrer"}
                                    <CheckCircle2 className="h-4 w-4 text-[#FFD700] group-hover:scale-125 transition-transform duration-500" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
