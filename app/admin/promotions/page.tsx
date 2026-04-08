"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
    Tag, 
    Plus, 
    Calendar,
    Percent,
    Trash,
    MoreVertical,
    Clock,
    XCircle,
    ArrowRight,
    Search,
    Check,
    ChevronDown,
    Edit
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import { getPromotions, createPromotion, updatePromotion, deletePromotion, getCategories, adminSearchProducts } from "../actions"

export default function PromotionsPage() {
    const router = useRouter()
    const [promotions, setPromotions] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isCreateOpen, setIsCreateOpen] = React.useState(false)
    const [editingPromoId, setEditingPromoId] = React.useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // Form State
    const [newPromo, setNewPromo] = React.useState({
        title: "",
        code: "",
        discount: "",
        startDate: "",
        endDate: "",
        isActive: true,
        isGlobal: true,
        categoryIds: [] as string[],
        productIds: [] as string[]
    })

    const [categories, setCategories] = React.useState<any[]>([])
    const [productSearch, setProductSearch] = React.useState("")
    const [searchResults, setSearchResults] = React.useState<any[]>([])
    const [isSearching, setIsSearching] = React.useState(false)

    const loadData = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const [promoData, catData] = await Promise.all([
                getPromotions(),
                getCategories()
            ])
            setPromotions(promoData)
            setCategories(catData)
        } catch (error) {
            console.error("Failed to load promotions:", error)
            toast.error("Erreur lors du chargement des données")
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        const timer = setTimeout(async () => {
            if (productSearch.length > 1) {
                setIsSearching(true)
                try {
                    const results = await adminSearchProducts(productSearch)
                    setSearchResults(results)
                } catch (e) {
                    console.error(e)
                } finally {
                    setIsSearching(false)
                }
            } else {
                setSearchResults([])
            }
        }, 300)
        return () => clearTimeout(timer)
    }, [productSearch])

    React.useEffect(() => {
        loadData()
    }, [loadData])

    const handleOpenCreate = () => {
        setEditingPromoId(null)
        setNewPromo({ title: "", code: "", discount: "", startDate: "", endDate: "", isActive: true, isGlobal: true, categoryIds: [], productIds: [] })
        setIsCreateOpen(true)
    }

    const handleOpenEdit = (promo: any) => {
        setEditingPromoId(promo.id)
        setNewPromo({
            title: promo.title,
            code: promo.code,
            discount: promo.discount.toString(),
            startDate: promo.startDate ? new Date(promo.startDate).toISOString().slice(0, 16) : "",
            endDate: promo.endDate ? new Date(promo.endDate).toISOString().slice(0, 16) : "",
            isActive: promo.isActive,
            isGlobal: promo.isGlobal,
            categoryIds: promo.categoryIds || [],
            productIds: promo.productIds || []
        })
        setIsCreateOpen(true)
    }

    const handleSave = async () => {
        if (!newPromo.title || !newPromo.code || !newPromo.discount) {
            toast.error("Veuillez remplir les champs obligatoires (Titre, Code, Réduction)")
            return
        }

        setIsSubmitting(true)
        try {
            const promoData = {
                ...newPromo,
                discount: Number(newPromo.discount),
                startDate: newPromo.startDate ? new Date(newPromo.startDate) : null,
                endDate: newPromo.endDate ? new Date(newPromo.endDate) : null,
            }

            if (editingPromoId) {
                await updatePromotion(editingPromoId, promoData)
                toast.success("Promotion mise à jour avec succès")
            } else {
                await createPromotion(promoData)
                toast.success("Promotion créée avec succès")
            }

            setIsCreateOpen(false)
            setNewPromo({ title: "", code: "", discount: "", startDate: "", endDate: "", isActive: true, isGlobal: true, categoryIds: [], productIds: [] })
            loadData()
        } catch (error) {
            console.error("Creation failed:", error)
            toast.error("Erreur lors de la création de la promotion")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cette promotion ?")) return
        
        try {
            await deletePromotion(id)
            toast.success("Promotion supprimée")
            setPromotions(prev => prev.filter(p => p.id !== id))
        } catch (error) {
            console.error("Deletion failed:", error)
            toast.error("Erreur lors de la suppression")
        }
    }

    const getStatusInfo = (promo: any) => {
        const now = new Date()
        let isActive = promo.isActive
        let label = "Active"
        let colorClass = "bg-green-50 text-green-700"

        if (!isActive) {
            label = "Inactif"
            colorClass = "bg-gray-100 text-gray-500"
        } else if (promo.endDate && new Date(promo.endDate) < now) {
            label = "Expirée"
            colorClass = "bg-rose-50 text-rose-700"
        } else if (promo.startDate && new Date(promo.startDate) > now) {
            label = "Programmée"
            colorClass = "bg-blue-50 text-blue-700"
        }

        return { label, colorClass }
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
                        Promotions & <span className="text-primary">Offres</span>
                    </h1>
                    <p className="text-sm font-medium text-gray-500 max-w-lg">
                        Gérez vos campagnes promotionnelles, codes de réduction et offres spéciales pour booster vos ventes.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <Button 
                        onClick={handleOpenCreate}
                        className="h-11 px-6 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary/20 transition-all hover:scale-105"
                    >
                        <Plus className="mr-2 h-4 w-4" /> 
                        Créer une Campagne
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-gray-100"
            >
                <div className="overflow-x-auto custom-scrollbar">
                    <Table className="min-w-[800px]">
                        <TableHeader>
                            <TableRow className="border-b-2 border-gray-100/50 hover:bg-transparent">
                                <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400 py-6">Campagne</TableHead>
                                <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400 py-6">Code & Valeur</TableHead>
                                <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400 py-6">Période</TableHead>
                                <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400 py-6 text-center">Statut</TableHead>
                                <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400 py-6 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={5} className="py-6">
                                            <div className="h-14 w-full bg-gray-50 animate-pulse rounded-xl" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : promotions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-[400px] text-center">
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Tag className="h-10 w-10 text-primary opacity-50" />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-bold text-gray-900">Aucune promotion active</h3>
                                                <p className="text-sm text-gray-500 max-w-sm mx-auto">Créez votre première campagne promotionnelle pour stimuler vos ventes.</p>
                                            </div>
                                            <Button 
                                                variant="outline" 
                                                className="mt-4 rounded-xl border-dashed"
                                                onClick={() => setIsCreateOpen(true)}
                                            >
                                                <Plus className="mr-2 h-4 w-4 text-gray-400" />
                                                Ajouter une offre
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                promotions.map((promo) => {
                                    const { label, colorClass } = getStatusInfo(promo)
                                    return (
                                        <TableRow key={promo.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <TableCell className="py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                                        <Tag className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-[14px] leading-tight">{promo.title}</p>
                                                        {promo.description && (
                                                            <p className="text-[12px] font-medium text-gray-500 mt-0.5 line-clamp-1">{promo.description}</p>
                                                        )}
                                                        {promo.isGlobal ? (
                                                            <div className="mt-1.5 flex items-center gap-1.5">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                                                <span className="text-[10px] font-black uppercase text-primary tracking-widest">Offre Globale</span>
                                                            </div>
                                                        ) : (
                                                            <div className="mt-1.5 flex flex-wrap gap-1">
                                                                {promo.categoryIds?.length > 0 && (
                                                                    <span className="text-[9px] px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded-md font-bold uppercase tracking-wider">{promo.categoryIds.length} Catégories</span>
                                                                )}
                                                                {promo.productIds?.length > 0 && (
                                                                    <span className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-md font-bold uppercase tracking-wider">{promo.productIds.length} Produits</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-6">
                                                <div>
                                                    <div className="inline-block px-3 py-1 bg-gray-900 text-white font-black tracking-widest text-[11px] rounded-lg mb-1">
                                                        {promo.code}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[13px] font-bold text-primary">
                                                        <Percent className="h-3.5 w-3.5" />
                                                        {promo.discount}% de réduction
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-6">
                                                {(promo.startDate || promo.endDate) ? (
                                                    <div className="space-y-1">
                                                        {promo.startDate && (
                                                            <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                                                                <ArrowRight className="h-3 w-3 text-gray-400" />
                                                                {new Date(promo.startDate).toLocaleDateString()}
                                                            </div>
                                                        )}
                                                        {promo.endDate && (
                                                            <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                                                                <Clock className="h-3 w-3 text-gray-400" />
                                                                {new Date(promo.endDate).toLocaleDateString()}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-[12px] font-medium text-gray-400 italic">Illimitée</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="py-6 text-center">
                                                <span className={cn(
                                                    "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                                    colorClass
                                                )}>
                                                    {label}
                                                </span>
                                            </TableCell>
                                             <TableCell className="py-6 text-right flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-xl"
                                                    onClick={() => handleOpenEdit(promo)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl"
                                                    onClick={() => handleDelete(promo.id)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </motion.div>

            {/* Create Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-2xl p-0 border-none rounded-[2.5rem] shadow-2xl bg-white overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="px-8 pt-8 pb-6 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
                                {editingPromoId ? "Modifier la Campagne" : "Nouvelle Campagne"}
                            </DialogTitle>
                            <DialogDescription className="text-sm font-medium text-gray-500 mt-1">
                                {editingPromoId ? "Mettre à jour les paramètres de l'offre." : "Configurez une nouvelle offre promotionnelle."}
                            </DialogDescription>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Tag className="h-5 w-5 text-primary" />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar">
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Titre de la campagne *</Label>
                                    <Input 
                                        placeholder="ex: Soldes d'Hiver 2024"
                                        className="h-12 rounded-xl bg-gray-50 border-transparent font-medium"
                                        value={newPromo.title}
                                        onChange={(e) => setNewPromo({...newPromo, title: e.target.value})}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Code Promo *</Label>
                                    <Input 
                                        placeholder="WINTER24"
                                        className="h-12 rounded-xl bg-gray-50 border-transparent font-black tracking-widest uppercase text-primary"
                                        value={newPromo.code}
                                        onChange={(e) => setNewPromo({...newPromo, code: e.target.value.toUpperCase()})}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Réduction (%) *</Label>
                                    <Input 
                                        type="number"
                                        placeholder="20"
                                        className="h-12 rounded-xl bg-gray-50 border-transparent font-bold tabular-nums"
                                        value={newPromo.discount}
                                        min="1"
                                        max="100"
                                        onChange={(e) => setNewPromo({...newPromo, discount: e.target.value})}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Date de début (optionnel)</Label>
                                    <Input 
                                        type="datetime-local"
                                        className="h-12 rounded-xl bg-gray-50 border-transparent font-medium text-gray-700"
                                        value={newPromo.startDate}
                                        onChange={(e) => setNewPromo({...newPromo, startDate: e.target.value})}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Date de fin (optionnel)</Label>
                                    <Input 
                                        type="datetime-local"
                                        className="h-12 rounded-xl bg-gray-50 border-transparent font-medium text-gray-700"
                                        value={newPromo.endDate}
                                        onChange={(e) => setNewPromo({...newPromo, endDate: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Scope Selection Card */}
                            <div className="p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-[11px] font-black uppercase tracking-widest text-primary">Cible de la promotion</Label>
                                        <p className="text-[11px] font-medium text-gray-500">Choisissez à qui s'applique cette réduction.</p>
                                    </div>
                                    <div className="flex bg-white p-1 rounded-xl border border-gray-200">
                                        <button
                                            type="button"
                                            onClick={() => setNewPromo({ ...newPromo, isGlobal: true })}
                                            className={cn(
                                                "px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                                                newPromo.isGlobal ? "bg-gray-900 text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
                                            )}
                                        >
                                            Global
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNewPromo({ ...newPromo, isGlobal: false })}
                                            className={cn(
                                                "px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                                                !newPromo.isGlobal ? "bg-gray-900 text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
                                            )}
                                        >
                                            Sélectif
                                        </button>
                                    </div>
                                </div>

                                {!newPromo.isGlobal && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="space-y-6 pt-4 border-t border-gray-200/50"
                                    >
                                        {/* Categories Picker */}
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Par Catégories ({newPromo.categoryIds.length})</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {categories.map((cat) => (
                                                    <button
                                                        key={cat.id}
                                                        type="button"
                                                        onClick={() => {
                                                            const ids = newPromo.categoryIds.includes(cat.id)
                                                                ? newPromo.categoryIds.filter(id => id !== cat.id)
                                                                : [...newPromo.categoryIds, cat.id]
                                                            setNewPromo({ ...newPromo, categoryIds: ids })
                                                        }}
                                                        className={cn(
                                                            "px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5",
                                                            newPromo.categoryIds.includes(cat.id)
                                                                ? "bg-amber-100 text-amber-700 border-transparent"
                                                                : "bg-white border border-gray-200 text-gray-400 hover:border-gray-300"
                                                        )}
                                                    >
                                                        {newPromo.categoryIds.includes(cat.id) && <Check className="h-3 w-3" />}
                                                        {cat.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Products Picker */}
                                        <div className="space-y-3 pt-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Par Produits ({newPromo.productIds.length})</Label>
                                            <div className="relative group">
                                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                                                <Input 
                                                    placeholder="Rechercher des produits à ajouter..."
                                                    className="h-11 pl-11 rounded-xl bg-white border-gray-200"
                                                    value={productSearch}
                                                    onChange={(e) => setProductSearch(e.target.value)}
                                                />
                                                {isSearching && (
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                        <div className="h-4 w-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                                    </div>
                                                )}

                                                {searchResults.length > 0 && (
                                                    <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl border border-gray-200 shadow-xl z-50 p-2 space-y-1">
                                                        {searchResults.map((p) => (
                                                            <button
                                                                key={p.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    if (!newPromo.productIds.includes(p.id)) {
                                                                        setNewPromo({ ...newPromo, productIds: [...newPromo.productIds, p.id] })
                                                                    }
                                                                    setProductSearch("")
                                                                    setSearchResults([])
                                                                }}
                                                                disabled={newPromo.productIds.includes(p.id)}
                                                                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-8 w-8 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-100">
                                                                        {p.image && <Image src={p.image} alt={p.name} fill className="object-cover" />}
                                                                    </div>
                                                                    <div className="text-left">
                                                                        <p className="text-[12px] font-bold text-gray-900">{p.name}</p>
                                                                        <p className="text-[10px] font-medium text-gray-400 uppercase">{p.category}</p>
                                                                    </div>
                                                                </div>
                                                                {newPromo.productIds.includes(p.id) ? (
                                                                    <Check className="h-4 w-4 text-primary" />
                                                                ) : (
                                                                    <Plus className="h-4 w-4 text-gray-300" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Selected Products List */}
                                            {newPromo.productIds.length > 0 && (
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {newPromo.productIds.map(id => (
                                                        <div key={id} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-[11px] font-bold border border-blue-100">
                                                            <span>ID: {id.slice(0, 6).toUpperCase()}</span>
                                                            <button 
                                                                type="button"
                                                                onClick={() => setNewPromo({ ...newPromo, productIds: newPromo.productIds.filter(pid => pid !== id) })}
                                                                className="hover:text-rose-500"
                                                            >
                                                                <XCircle className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 pt-4 border-t border-gray-100 bg-gray-50/30">
                        <Button 
                            onClick={handleSave}
                            disabled={isSubmitting}
                            className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 text-sm"
                        >
                            {isSubmitting ? "Enregistrement..." : editingPromoId ? "Mettre à jour" : "Créer la Campagne"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
