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
        { label: "Total Produits", value: productsData.length, icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Stock Faible", value: productsData.filter(p => p.stock > 0 && p.stock <= 10).length, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "En Rupture", value: productsData.filter(p => p.stock === 0).length, icon: Zap, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Catégories", value: categories.length, icon: Layers, color: "text-amber-600", bg: "bg-amber-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Catalogue <span className="text-amber-600">Produits.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Gestion et référencement des articles de la boutique Mbor B. Store.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 px-5 rounded-xl text-[12px] font-semibold border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm bg-white">
                        <Layers className="h-4 w-4 text-gray-400" /> Catégories
                    </Button>
                    <Button
                        onClick={() => handleOpenModal()}
                        className="h-10 px-5 rounded-xl bg-gray-900 text-white text-[12px] font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-sm"
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
                        className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">{stat.label}</p>
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                                {isLoading ? <span className="h-8 w-16 bg-gray-50 animate-pulse block rounded-lg" /> : stat.value}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* List Manager */}
            <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-6 flex flex-col md:flex-row items-center gap-4 bg-gray-50/10 border-b border-gray-100/50">
                    <div className="relative flex-1 w-full flex items-center group">
                        <Search className="absolute left-5 h-4 w-4 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                        <Input
                            placeholder="Rechercher un produit, SKU..."
                            className="bg-white h-11 pl-12 pr-6 rounded-xl border-gray-100 focus-visible:ring-2 focus-visible:ring-amber-50 focus-visible:border-amber-200 text-[14px] font-medium placeholder:text-gray-400 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="h-11 px-4 rounded-xl border border-gray-100 bg-white text-[12px] font-bold text-gray-600 outline-none focus:ring-2 focus:ring-amber-50 transition-all shadow-sm"
                        >
                            <option value="all">Toutes Catégories</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>

                        <select
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                            className="h-11 px-4 rounded-xl border border-gray-100 bg-white text-[12px] font-bold text-gray-600 outline-none focus:ring-2 focus:ring-amber-50 transition-all shadow-sm"
                        >
                            <option value="all">Tous les Stocks</option>
                            <option value="in">En Stock</option>
                            <option value="low">Stock Faible</option>
                            <option value="out">Rupture</option>
                        </select>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-11 px-4 rounded-xl border-gray-100 hover:bg-white shadow-sm gap-2">
                                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                                    <span className="text-[12px] font-bold text-gray-600">Trier</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="rounded-xl p-2 w-48 shadow-xl border-gray-100">
                                <DropdownMenuItem onClick={() => setSortBy("newest")} className="rounded-lg py-2.5 px-3 text-[12px] font-semibold cursor-pointer">Plus récent</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("price-asc")} className="rounded-lg py-2.5 px-3 text-[12px] font-semibold cursor-pointer">Prix Croissant</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("price-desc")} className="rounded-lg py-2.5 px-3 text-[12px] font-semibold cursor-pointer">Prix Décroissant</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("name-asc")} className="rounded-lg py-2.5 px-3 text-[12px] font-semibold cursor-pointer">Nom (A-Z)</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Produit</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Catégorie</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Prix</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Stock</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
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
                                    <tr key={p.id} className="group hover:bg-gray-50/20 transition-all cursor-pointer border-b border-gray-50 last:border-0">
                                        <td className="px-8 py-4" onClick={() => handleOpenModal(p)}>
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-gray-100 overflow-hidden relative border border-gray-100 shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                                                    {p.images?.[0] ? (
                                                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center">
                                                            <ImageIcon className="h-5 w-5 text-gray-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <p className="text-[14px] font-bold text-gray-900 leading-tight">{p.name}</p>
                                                        {p.featured && <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />}
                                                    </div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">SKU-{p.id.slice(0, 8).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <Badge variant="outline" className="bg-gray-50/50 text-gray-500 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border-gray-100">
                                                {p.category?.name || "Sans catégorie"}
                                            </Badge>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-[14px] font-bold text-gray-900 tabular-nums">{Number(p.price).toLocaleString()} F</p>
                                                {p.discountPrice && <p className="text-[11px] text-rose-500 line-through tabular-nums opacity-60 font-semibold">{Number(p.discountPrice).toLocaleString()} F</p>}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <span className="text-[13px] font-bold text-gray-900 tabular-nums">{p.stock}</span>
                                                <div className="h-1.5 w-14 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                                    <div className={cn(
                                                        "h-full transition-all duration-700",
                                                        p.stock > 10 ? "bg-emerald-500 w-full" : p.stock > 0 ? "bg-amber-500 w-1/2" : "bg-rose-500 w-0"
                                                    )} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                                                p.stock > 10 ? "text-emerald-700 bg-emerald-50" :
                                                    p.stock > 0 ? "text-amber-700 bg-amber-50" : "text-rose-700 bg-rose-50",
                                            )}>
                                                {p.stock > 10 ? "Optimal" : p.stock > 0 ? "Faible" : "Rupture"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[180px] rounded-xl shadow-xl border-gray-100 p-1.5">
                                                    <DropdownMenuLabel className="text-[10px] font-bold text-gray-400 px-3 py-1.5 uppercase tracking-wider border-b border-gray-50 mb-1">Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleOpenModal(p)} className="text-[12px] font-semibold py-2.5 px-3 focus:bg-amber-50 focus:text-amber-600 rounded-lg transition-colors cursor-pointer">
                                                        <Edit className="mr-3 h-4 w-4" /> Modifier
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-[12px] font-semibold py-2.5 px-3 rounded-lg transition-colors cursor-pointer focus:bg-gray-50">
                                                        <ExternalLink className="mr-3 h-4 w-4" /> Voir Boutique
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => confirmDelete(p.id)} className="text-[12px] font-semibold py-2.5 px-3 text-rose-600 focus:bg-rose-50 focus:text-rose-600 rounded-lg transition-colors cursor-pointer">
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

                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/10">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        {Math.min(currentItems.length, itemsPerPage)} sur {filteredProducts.length} ARTICLES
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-lg border-gray-100 hover:bg-gray-50 transition-all"
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
                                        "h-9 w-9 rounded-lg font-bold text-[12px] transition-all",
                                        currentPage === i + 1
                                            ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
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
                            className="h-9 w-9 rounded-lg border-gray-100 hover:bg-gray-50 transition-all"
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
                        <SheetTitle className="text-xl font-bold tracking-tight text-gray-900">Configuration <span className="text-amber-600">Produit</span></SheetTitle>
                        <SheetDescription className="font-medium text-gray-500">
                            Gérer les informations détaillées de l'article pour le catalogue.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-10 py-8 pb-20">
                        {/* Media Section */}
                        <div className="space-y-4">
                            <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Images du Produit (Max 5)</Label>
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
                                    <Label htmlFor="name" className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Nom du Produit</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="ex: Maillot Arsenal Domicile 24/25"
                                        className="h-11 rounded-xl border-gray-100 focus:ring-amber-50 focus:border-amber-200"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Catégorie</Label>
                                    <select
                                        id="category"
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        className="w-full h-11 px-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-amber-50 focus:border-amber-200 text-[14px] font-semibold bg-white outline-none appearance-none transition-all shadow-sm"
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
                                <Label htmlFor="description" className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Détails techniques et arguments de vente..."
                                    className="rounded-2xl border-gray-100 focus:ring-amber-50 focus:border-amber-200 p-6 text-[14px] leading-relaxed bg-gray-50/30"
                                    rows={4}
                                />
                            </div>

                            {/* Pricing Section (Restored) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Prix (F CFA)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="h-11 rounded-xl border-gray-100 font-bold tabular-nums"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="discountPrice" className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Prix Promo (Optionnel)</Label>
                                    <Input
                                        id="discountPrice"
                                        type="number"
                                        value={formData.discountPrice}
                                        onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                                        className="h-11 rounded-xl border-gray-100 border-dashed text-rose-500 font-bold tabular-nums"
                                    />
                                </div>
                            </div>

                            {/* Sizes & Stock Manager */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Gestion des Tailles</Label>
                                    <div className="text-[11px] font-bold text-gray-900 tabular-nums">
                                        Total Stock: {formData.sizes.reduce((acc: number, s: any) => acc + Number(s.stock || 0), 0)}
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
                                                className="h-10 rounded-xl border-gray-100 text-[13px] font-semibold flex-1"
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
                                                className="h-10 w-24 rounded-xl border-gray-100 text-[13px] font-bold tabular-nums"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
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
                                        className="w-full h-10 rounded-lg border-dashed border-gray-200 text-[12px] font-semibold text-gray-400 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50/50 transition-all"
                                        onClick={() => setFormData({ ...formData, sizes: [...formData.sizes, { size: "", stock: 0 }] })}
                                    >
                                        <Plus className="mr-2 h-3.5 w-3.5" /> Ajouter une variante
                                    </Button>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                                    <div className="space-y-1">
                                        <Label className="text-[13px] font-bold text-gray-900">En Vedette</Label>
                                        <p className="text-[11px] text-gray-500 font-medium">Afficher sur l'accueil.</p>
                                    </div>
                                    <Switch
                                        checked={formData.featured}
                                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                                    />
                                </div>
                                <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                                    <div className="space-y-1">
                                        <Label className="text-[13px] font-bold text-gray-900">Flocage</Label>
                                        <p className="text-[11px] text-gray-500 font-medium">Autoriser Nom + Numéro.</p>
                                    </div>
                                    <Switch
                                        checked={formData.allowFlocage}
                                        onCheckedChange={(checked) => setFormData({ ...formData, allowFlocage: checked })}
                                    />
                                </div>
                                <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                                    <div className="space-y-1">
                                        <Label className="text-[13px] font-bold text-gray-900">Gravure</Label>
                                        <p className="text-[11px] text-gray-500 font-medium">Autoriser texte gravé.</p>
                                    </div>
                                    <Switch
                                        checked={formData.allowGravure}
                                        onCheckedChange={(checked) => setFormData({ ...formData, allowGravure: checked })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex items-center gap-3 sticky bottom-0 bg-white py-4 -mx-6 px-6 border-t border-gray-100/60 z-20">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-12 rounded-xl font-bold text-gray-500 border-gray-100"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-12 rounded-xl bg-gray-900 text-white font-bold shadow-lg shadow-gray-200"
                                    disabled={isSaving}
                                >
                                    {isSaving ? "Synchronisation..." : editingProduct ? "Enregistrer" : "Créer"}
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
