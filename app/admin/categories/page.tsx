"use client"

import * as React from "react"
import Link from "next/link"
import {
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash,
    ImageIcon,
    ChevronRight,
    LayoutGrid,
    Eye,
    Tag,
    Layers,
    Activity,
    ArrowUpRight,
    MousePointer2,
    Database,
    Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { getCategories, createCategory, updateCategory, deleteCategory } from "../actions"

export default function AdminCategoriesPage() {
    const [categoriesData, setCategoriesData] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [isSaving, setIsSaving] = React.useState(false)
    const [editingCategory, setEditingCategory] = React.useState<any>(null)
    const [formData, setFormData] = React.useState({
        name: "",
        description: "",
        image: ""
    })

    const loadData = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await getCategories()
            setCategoriesData(data)
        } catch (error) {
            console.error("Failed to load categories:", error)
            toast.error("Erreur de chargement")
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        loadData()
    }, [loadData])

    const handleOpenModal = (category: any = null) => {
        if (category) {
            setEditingCategory(category)
            setFormData({
                name: category.name,
                description: category.description || "",
                image: category.image || ""
            })
        } else {
            setEditingCategory(null)
            setFormData({
                name: "",
                description: "",
                image: ""
            })
        }
        setIsModalOpen(true)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, formData)
                toast.success("Catégorie mise à jour")
            } else {
                await createCategory(formData)
                toast.success("Catégorie créée")
            }
            setIsModalOpen(false)
            loadData()
        } catch (error) {
            toast.error("Erreur d'enregistrement")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm("Supprimer cette catégorie ?")) {
            try {
                await deleteCategory(id)
                toast.success("Catégorie supprimée")
                loadData()
            } catch (error) {
                toast.error("Erreur de suppression")
            }
        }
    }

    const totalItems = categoriesData.reduce((acc, cat) => acc + (cat._count?.products || 0), 0)

    const stats = [
        { label: "Univers Actifs", value: categoriesData.length.toString(), icon: LayoutGrid, color: "text-gray-600", bg: "bg-gray-50" },
        { label: "Articles Total", value: totalItems.toLocaleString(), icon: Layers, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Status Système", value: "Optimal", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Architecture <span className="text-indigo-600">Univers.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Organisation structurelle des catégories du catalogue.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-6 rounded-2xl text-[12px] font-bold border-gray-100 hover:bg-white hover:shadow-xl transition-all flex items-center gap-2 uppercase tracking-widest">
                        <Database className="h-4 w-4 text-gray-400" /> Flux Tags
                    </Button>
                    <Button
                        onClick={() => handleOpenModal()}
                        className="h-11 px-6 rounded-2xl bg-gray-900 text-white text-[12px] font-bold hover:bg-black hover:shadow-2xl transition-all flex items-center gap-2 uppercase tracking-widest"
                    >
                        <Plus className="h-4 w-4" /> Nouvelle Catégorie
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white border border-gray-50 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <stat.icon className="h-10 w-10" />
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner", stat.bg, stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                            <h3 className="text-2xl font-black tracking-tighter text-gray-900 italic">
                                {isLoading ? <span className="h-8 w-16 bg-gray-50 animate-pulse block rounded-lg" /> : stat.value}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Matrix View */}
            <div className="bg-white border border-gray-50 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-6 flex flex-col md:flex-row items-center gap-4 bg-gray-50/30 border-b border-gray-50">
                    <div className="relative flex-1 w-full flex items-center group">
                        <Search className="absolute left-5 h-4 w-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <Input
                            placeholder="Rechercher un univers structurel..."
                            className="bg-white h-12 pl-12 pr-6 rounded-2xl border-gray-100 focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-200 text-[14px] font-medium placeholder:text-gray-400 shadow-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Aperçu</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Désignation</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Répartition</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(3)].map((_, i) => (
                                    <tr key={i}><td colSpan={5} className="px-8 py-6"><div className="h-12 w-full bg-gray-50 animate-pulse rounded-2xl" /></td></tr>
                                ))
                            ) : categoriesData.length === 0 ? (
                                <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Aucune entité trouvée</td></tr>
                            ) : (
                                categoriesData.map((category) => (
                                    <tr key={category.id} className="group hover:bg-gray-50/30 transition-all cursor-pointer">
                                        <td className="px-8 py-5" onClick={() => handleOpenModal(category)}>
                                            <div className="h-14 w-28 rounded-2xl overflow-hidden border border-gray-100 bg-gray-100 relative shrink-0 rotate-1 group-hover:rotate-0 transition-transform duration-500 shadow-sm">
                                                {category.image ? (
                                                    <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center">
                                                        <ImageIcon className="h-6 w-6 text-gray-300" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5" onClick={() => handleOpenModal(category)}>
                                            <p className="text-[15px] font-black text-gray-900 leading-tight mb-1 uppercase italic">{category.name}</p>
                                            <p className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.2em]">ID-{category.id.slice(0, 8).toUpperCase()}</p>
                                        </td>
                                        <td className="px-8 py-5" onClick={() => handleOpenModal(category)}>
                                            <div className="flex flex-col gap-2 w-40">
                                                <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                    <span>{category._count?.products || 0} Articles</span>
                                                    <span className="text-gray-900">{totalItems > 0 ? Math.round(((category._count?.products || 0) / totalItems) * 100) : 0}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                                    <div
                                                        className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                                                        style={{ width: `${totalItems > 0 ? ((category._count?.products || 0) / totalItems) * 100 : 0}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50">
                                                Opérationnel
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                                                        <MoreVertical className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[200px] rounded-[1.5rem] shadow-2xl border-gray-50 p-2">
                                                    <DropdownMenuLabel className="text-[10px] font-black text-gray-400 px-3 py-2 uppercase tracking-widest border-b border-gray-50 mb-1">Actions Rapides</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleOpenModal(category)} className="text-[12px] font-bold py-3 px-3 focus:bg-indigo-50 focus:text-indigo-600 rounded-xl transition-colors cursor-pointer">
                                                        <Edit className="mr-3 h-4 w-4" /> Éditer l'univers
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-[12px] font-bold py-3 px-3 rounded-xl transition-colors cursor-pointer">
                                                        <Tag className="mr-3 h-4 w-4" /> Gérer les Tags
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(category.id)} className="text-[12px] font-bold py-3 px-3 text-rose-600 focus:bg-rose-50 focus:text-rose-600 rounded-xl transition-colors cursor-pointer">
                                                        <Trash className="mr-3 h-4 w-4" /> Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest opacity-60">Architecture : {categoriesData.length} Univers Structurels</p>
                    <Link href="/admin/products" className="text-[11px] font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-2 transition-all group uppercase tracking-widest">
                        Gérer le catalogue <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Category Sheet */}
            <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
                <SheetContent className="sm:max-w-xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-xl font-black uppercase italic tracking-tight">Configuration <span className="text-indigo-600">Univers</span></SheetTitle>
                        <SheetDescription className="font-medium text-gray-400">
                            Définition structurelle de cette catégorie.
                        </SheetDescription>
                    </SheetHeader>

                    <form onSubmit={handleSave} className="space-y-8 py-8 pb-20">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom de l'Univers</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="ex: Footwear, Streetwear, Accessoires..."
                                    className="h-12 rounded-2xl border-gray-100 focus:ring-indigo-100 focus:border-indigo-200"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Manifesto (Description)</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Décrivez l'univers de cette catégorie..."
                                    className="rounded-[1.5rem] border-gray-100 focus:ring-indigo-100 focus:border-indigo-200 p-4"
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">URL de la Bannière (Aperçu)</Label>
                                <Input
                                    id="image"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                    className="h-12 rounded-2xl border-gray-100"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex items-center gap-4 sticky bottom-0 bg-white py-4 -mx-6 px-6 border-t border-gray-50">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 h-14 rounded-[1.5rem] font-bold text-gray-500 uppercase tracking-widest"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 h-14 rounded-[1.5rem] bg-gray-900 text-white font-black uppercase tracking-widest shadow-2xl shadow-indigo-100"
                                disabled={isSaving}
                            >
                                {isSaving ? "Flux en cours..." : editingCategory ? "Actualiser" : "Déployer"}
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
