"use client"

import * as React from "react"
import {
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Package,
    ArrowUpDown,
    ExternalLink,
    Layers,
    AlertTriangle,
    CheckCircle2,
    MoreHorizontal,
    ImageIcon,
    Zap,
    Tag,
    Star
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
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
import { Switch } from "@/components/ui/switch"

import { getAdminProducts, deleteProduct, createProduct, updateProduct, getCategories } from "../actions"
import { ImageUpload } from "@/components/admin/image-upload"
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal"

export default function AdminProductsPage() {
    const [productsData, setProductsData] = React.useState<any[]>([])
    const [categories, setCategories] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isSaving, setIsSaving] = React.useState(false)
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [editingProduct, setEditingProduct] = React.useState<any>(null)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState("all")
    const [stockFilter, setStockFilter] = React.useState("all")
    const [sortBy, setSortBy] = React.useState("newest")

    // Delete state
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [idToDelete, setIdToDelete] = React.useState<string | null>(null)
    const [isDeleting, setIsDeleting] = React.useState(false)

    const [formData, setFormData] = React.useState<any>({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        categoryId: "",
        subCategory: "",
        featured: false,
        allowFlocage: false,
        allowGravure: false,
        images: [],
        sizes: []
    })

    const loadData = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const [pData, cData] = await Promise.all([
                getAdminProducts(),
                getCategories()
            ])
            setProductsData(pData)
            setCategories(cData)
        } catch (error) {
            console.error("Failed to load data:", error)
            toast.error("Erreur de chargement")
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        loadData()
    }, [loadData])

    const handleOpenModal = (product: any = null) => {
        if (product) {
            setEditingProduct(product)
            setFormData({
                name: product.name,
                description: product.description || "",
                price: product.price.toString(),
                discountPrice: product.discountPrice?.toString() || "",
                stock: product.stock.toString(),
                categoryId: product.categoryId || "",
                subCategory: product.subCategory || "",
                featured: product.featured,
                allowFlocage: product.allowFlocage,
                allowGravure: product.allowGravure,
                images: product.images || [],
                sizes: product.sizes?.map((s: any) => ({ size: s.size, stock: s.stock })) || []
            })
        } else {
            setEditingProduct(null)
            setFormData({
                name: "",
                description: "",
                price: "",
                discountPrice: "",
                stock: "",
                categoryId: "",
                subCategory: "",
                featured: false,
                allowFlocage: false,
                allowGravure: false,
                images: [],
                sizes: []
            })
        }
        setIsModalOpen(true)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.images.length === 0) {
            toast.error("Veuillez ajouter au moins une image")
            return
        }
        setIsSaving(true)
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, formData)
                toast.success("Produit mis à jour")
            } else {
                await createProduct(formData)
                toast.success("Produit créé")
            }
            setIsModalOpen(false)
            loadData()
        } catch (error) {
            console.error("Failed to save product:", error)
            toast.error("Erreur d'enregistrement")
        } finally {
            setIsSaving(false)
        }
    }

    const confirmDelete = (id: string) => {
        setIdToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const handleDelete = async () => {
        if (!idToDelete) return
        setIsDeleting(true)
        try {
            await deleteProduct(idToDelete)
            toast.success("Produit supprimé")
            loadData()
        } catch (error) {
            toast.error("Erreur de suppression")
        } finally {
            setIsDeleting(false)
            setIsDeleteDialogOpen(false)
        }
    }

    const filteredProducts = productsData
        .filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategory === "all" || p.categoryId === selectedCategory
            const matchesStock = stockFilter === "all" ||
                (stockFilter === "low" && p.stock > 0 && p.stock <= 10) ||
                (stockFilter === "out" && p.stock === 0) ||
                (stockFilter === "in" && p.stock > 10)

            return matchesSearch && matchesCategory && matchesStock
        })
        .sort((a, b) => {
            if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            if (sortBy === "price-asc") return Number(a.price) - Number(b.price)
            if (sortBy === "price-desc") return Number(b.price) - Number(a.price)
            if (sortBy === "name-asc") return a.name.localeCompare(b.name)
            return 0
        })

    // Pagination logic
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategory, stockFilter, sortBy])

    const stats = [
        { label: "Total Produits", value: productsData.length, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Stock Faible", value: productsData.filter(p => p.stock > 0 && p.stock <= 10).length, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "En Rupture", value: productsData.filter(p => p.stock === 0).length, icon: Zap, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Catégories", value: categories.length, icon: Layers, color: "text-indigo-600", bg: "bg-indigo-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Catalogue <span className="text-indigo-600">Produits.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Gestion et référencement des articles de la boutique.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-6 rounded-2xl text-[12px] font-bold border-gray-100 hover:bg-white hover:shadow-xl transition-all flex items-center gap-2 uppercase tracking-widest bg-white shadow-sm">
                        <Layers className="h-4 w-4 text-gray-400" /> Catégories
                    </Button>
                    <Button
                        onClick={() => handleOpenModal()}
                        className="h-11 px-6 rounded-2xl bg-gray-900 text-white text-[12px] font-bold hover:bg-black hover:shadow-2xl transition-all flex items-center gap-2 uppercase tracking-widest shadow-xl"
                    >
                        <Plus className="h-4 w-4" /> Nouveau Produit
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* List Manager */}
            <div className="bg-white border border-gray-50 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-6 flex flex-col md:flex-row items-center gap-4 bg-gray-50/30 border-b border-gray-50">
                    <div className="relative flex-1 w-full flex items-center group">
                        <Search className="absolute left-5 h-4 w-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <Input
                            placeholder="Rechercher par nom, SKU ou attribut..."
                            className="bg-white h-12 pl-12 pr-6 rounded-2xl border-gray-100 focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-200 text-[14px] font-medium placeholder:text-gray-400 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="h-12 px-4 rounded-2xl border border-gray-100 bg-white text-[12px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-100"
                        >
                            <option value="all">Toutes Catégories</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>

                        <select
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                            className="h-12 px-4 rounded-2xl border border-gray-100 bg-white text-[12px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-100"
                        >
                            <option value="all">Tous les Stocks</option>
                            <option value="in">En Stock</option>
                            <option value="low">Stock Faible</option>
                            <option value="out">Rupture</option>
                        </select>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-12 px-5 rounded-2xl border-gray-100 hover:bg-white shadow-sm gap-2">
                                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                                    <span className="text-[12px] font-black uppercase tracking-widest">Trier</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="rounded-2xl p-2 w-48 shadow-2xl border-gray-50">
                                <DropdownMenuItem onClick={() => setSortBy("newest")} className="rounded-xl py-3 px-3 text-[12px] font-bold cursor-pointer">Plus récent</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("price-asc")} className="rounded-xl py-3 px-3 text-[12px] font-bold cursor-pointer">Prix Croissant</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("price-desc")} className="rounded-xl py-3 px-3 text-[12px] font-bold cursor-pointer">Prix Décroissant</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("name-asc")} className="rounded-xl py-3 px-3 text-[12px] font-bold cursor-pointer">Nom (A-Z)</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Identité</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Catégorie</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tarification</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Volume</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}><td colSpan={6} className="px-8 py-6"><div className="h-12 w-full bg-gray-50 animate-pulse rounded-2xl" /></td></tr>
                                ))
                            ) : currentItems.length === 0 ? (
                                <tr><td colSpan={6} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Aucune entité trouvée</td></tr>
                            ) : (
                                currentItems.map((p) => (
                                    <tr key={p.id} className="group hover:bg-gray-50/30 transition-all cursor-pointer">
                                        <td className="px-8 py-5" onClick={() => handleOpenModal(p)}>
                                            <div className="flex items-center gap-5">
                                                <div className="h-14 w-14 rounded-2xl bg-gray-100 overflow-hidden relative border border-gray-50 shrink-0 rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-sm">
                                                    {p.images?.[0] ? (
                                                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center">
                                                            <ImageIcon className="h-6 w-6 text-gray-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="text-[14px] font-bold text-gray-900 leading-tight">{p.name}</p>
                                                        {p.featured && <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />}
                                                    </div>
                                                    <p className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.15em]">SKU-{p.id.slice(0, 8).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <Badge variant="outline" className="bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border border-gray-100/50">
                                                {p.category?.name || "Sans catégorie"}
                                            </Badge>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="space-y-0.5">
                                                <p className="text-[15px] font-black text-gray-900 tabular-nums">{Number(p.price).toLocaleString()} F</p>
                                                {p.discountPrice && <p className="text-[11px] text-rose-500 line-through tabular-nums opacity-60 font-bold">{Number(p.discountPrice).toLocaleString()} F</p>}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="text-[13px] font-black text-gray-900 tabular-nums">{p.stock}</span>
                                                <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                                    <div className={cn(
                                                        "h-full transition-all duration-700",
                                                        p.stock > 10 ? "bg-emerald-500 w-full" : p.stock > 0 ? "bg-amber-500 w-1/2" : "bg-rose-500 w-0"
                                                    )} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={cn(
                                                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                                p.stock > 10 ? "text-emerald-600 bg-emerald-50" :
                                                    p.stock > 0 ? "text-amber-600 bg-amber-50" : "text-rose-600 bg-rose-50",
                                            )}>
                                                {p.stock > 10 ? "Optimal" : p.stock > 0 ? "Faible" : "Rupture"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[200px] rounded-[1.5rem] shadow-2xl border-gray-50 p-2">
                                                    <DropdownMenuLabel className="text-[10px] font-black text-gray-400 px-3 py-2 uppercase tracking-widest border-b border-gray-50 mb-1">Actions Rapides</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleOpenModal(p)} className="text-[12px] font-bold py-3 px-3 focus:bg-indigo-50 focus:text-indigo-600 rounded-xl transition-colors cursor-pointer">
                                                        <Edit className="mr-3 h-4 w-4" /> Éditer l'entité
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-[12px] font-bold py-3 px-3 rounded-xl transition-colors cursor-pointer focus:bg-gray-50">
                                                        <ExternalLink className="mr-3 h-4 w-4" /> Voir sur Store
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => confirmDelete(p.id)} className="text-[12px] font-bold py-3 px-3 text-rose-600 focus:bg-rose-50 focus:text-rose-600 rounded-xl transition-colors cursor-pointer">
                                                        <Trash2 className="mr-3 h-4 w-4" /> Supprimer
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
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest opacity-60">
                        Affichage : {Math.min(currentItems.length, itemsPerPage)} sur {filteredProducts.length} articles
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-xl border-gray-100 hover:bg-white shadow-sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <Button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={cn(
                                        "h-10 w-10 rounded-xl font-black text-[11px] transition-all",
                                        currentPage === i + 1
                                            ? "bg-gray-900 text-white shadow-xl"
                                            : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
                                    )}
                                >
                                    {i + 1}
                                </Button>
                            )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-xl border-gray-100 hover:bg-white shadow-sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            <Sheet open={isModalOpen} onOpenChange={setIsModalOpen} modal={false}>
                <SheetContent
                    className="sm:max-w-2xl overflow-y-auto"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <SheetHeader>
                        <SheetTitle className="text-xl font-black uppercase italic tracking-tight">Configuration <span className="text-indigo-600">Produit</span></SheetTitle>
                        <SheetDescription className="font-medium text-gray-400">
                            Propriétés physiques et commerciales de l'article.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-10 py-8 pb-20">
                        {/* Media Section */}
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Assets Visuels (Max 5)</Label>
                            <ImageUpload
                                value={formData.images}
                                onChange={(url) => setFormData((prev: any) => ({ ...prev, images: [...prev.images, url] }))}
                                onRemove={(url) => setFormData((prev: any) => ({ ...prev, images: prev.images.filter((i: string) => i !== url) }))}
                            />
                        </div>

                        <form onSubmit={handleSave} className="space-y-10">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Identifiant Commercial</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="ex: Maillot Arsenal Domicile 24/25"
                                        className="h-12 rounded-2xl border-gray-100 focus:ring-indigo-100 focus:border-indigo-200"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Assignation Univers</Label>
                                    <select
                                        id="category"
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        className="w-full h-12 px-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 text-[14px] font-bold bg-white outline-none appearance-none transition-all shadow-sm"
                                        required
                                    >
                                        <option value="">Sélectionner</option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Manifesto Produit (Description)</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Détails techniques et arguments de vente..."
                                    className="rounded-[2rem] border-gray-100 focus:ring-indigo-100 focus:border-indigo-200 p-6 text-[14px] leading-relaxed bg-gray-50/30"
                                    rows={4}
                                />
                            </div>

                            {/* Pricing Section (Restored) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Prix Brut (F CFA)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="h-12 rounded-2xl border-gray-100 font-black tabular-nums"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="discountPrice" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Promo (Optionnel)</Label>
                                    <Input
                                        id="discountPrice"
                                        type="number"
                                        value={formData.discountPrice}
                                        onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                                        className="h-12 rounded-2xl border-gray-100 border-dashed text-rose-500 font-bold tabular-nums"
                                    />
                                </div>
                            </div>

                            {/* Sizes & Stock Manager */}
                            <div className="space-y-4 pt-4 border-t border-gray-50">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Gestion des Tailles</Label>
                                    <div className="text-[11px] font-bold text-gray-900 tabular-nums">
                                        Total: {formData.sizes.reduce((acc: number, s: any) => acc + Number(s.stock || 0), 0)}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {formData.sizes.map((item: any, idx: number) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <Input
                                                placeholder="Taille (ex: M, 42)"
                                                value={item.size}
                                                onChange={(e) => {
                                                    const newSizes = [...formData.sizes]
                                                    newSizes[idx].size = e.target.value
                                                    setFormData({ ...formData, sizes: newSizes })
                                                }}
                                                className="h-10 rounded-xl border-gray-100 text-[13px] font-bold flex-1"
                                            />
                                            <Input
                                                type="number"
                                                placeholder="Stock"
                                                value={item.stock}
                                                onChange={(e) => {
                                                    const newSizes = [...formData.sizes]
                                                    newSizes[idx].stock = e.target.value
                                                    // Update total stock automatically
                                                    const total = newSizes.reduce((acc: number, s: any) => acc + Number(s.stock || 0), 0)
                                                    setFormData({ ...formData, sizes: newSizes, stock: total })
                                                }}
                                                className="h-10 w-24 rounded-xl border-gray-100 text-[13px] font-black tabular-nums"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                                                onClick={() => {
                                                    const newSizes = formData.sizes.filter((_: any, i: number) => i !== idx)
                                                    const total = newSizes.reduce((acc: number, s: any) => acc + Number(s.stock || 0), 0)
                                                    setFormData({ ...formData, sizes: newSizes, stock: total })
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full h-10 rounded-xl border-dashed border-gray-200 text-[12px] font-bold text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50"
                                        onClick={() => setFormData({ ...formData, sizes: [...formData.sizes, { size: "", stock: 0 }] })}
                                    >
                                        <Plus className="mr-2 h-3.5 w-3.5" /> Ajouter une variante
                                    </Button>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50/50 rounded-[2rem] p-6 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                                    <div className="space-y-1">
                                        <Label className="text-[13px] font-black text-gray-900 uppercase">Vedette</Label>
                                        <p className="text-[10px] text-gray-500 font-medium">Page d'accueil.</p>
                                    </div>
                                    <Switch
                                        checked={formData.featured}
                                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                                    />
                                </div>
                                <div className="bg-gray-50/50 rounded-[2rem] p-6 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                                    <div className="space-y-1">
                                        <Label className="text-[13px] font-black text-gray-900 uppercase">Flocage</Label>
                                        <p className="text-[10px] text-gray-500 font-medium">Nom + Numéro.</p>
                                    </div>
                                    <Switch
                                        checked={formData.allowFlocage}
                                        onCheckedChange={(checked) => setFormData({ ...formData, allowFlocage: checked })}
                                    />
                                </div>
                                <div className="bg-gray-50/50 rounded-[2rem] p-6 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                                    <div className="space-y-1">
                                        <Label className="text-[13px] font-black text-gray-900 uppercase">Gravure</Label>
                                        <p className="text-[10px] text-gray-500 font-medium">Texte personnalisé.</p>
                                    </div>
                                    <Switch
                                        checked={formData.allowGravure}
                                        onCheckedChange={(checked) => setFormData({ ...formData, allowGravure: checked })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex items-center gap-4 sticky bottom-0 bg-white py-4 -mx-6 px-6 border-t border-gray-50 z-20">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-14 rounded-[1.5rem] font-bold text-gray-500 uppercase tracking-widest border-gray-100"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-14 rounded-[1.5rem] bg-gray-900 text-white font-black uppercase tracking-widest shadow-2xl shadow-indigo-100"
                                    disabled={isSaving}
                                >
                                    {isSaving ? "Synchronisation..." : editingProduct ? "Actualiser" : "Déployer"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Custom Delete Modal */}
            <DeleteConfirmModal
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Séquence de Suppression"
                description="Êtes-vous certain de vouloir révoquer cet article du catalogue ? Cette action est irréversible et affectera les flux d'inventaire."
            />
        </div>
    )
}
