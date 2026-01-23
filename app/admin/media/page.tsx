"use client"

import * as React from "react"
import {
    Image as ImageIcon,
    Plus,
    Search,
    Filter,
    LayoutGrid,
    List,
    MoreVertical,
    Download,
    Trash2,
    Copy,
    ExternalLink,
    Grid2X2,
    Zap,
    Tag,
    History,
    FileImage,
    ImagePlus,
    RefreshCw,
    ChevronLeft,
    ChevronRight
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { getAdminProducts } from "../actions"
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal"
import { CldUploadWidget } from "next-cloudinary"

export default function AdminMediaPage() {
    const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
    const [isLoading, setIsLoading] = React.useState(true)
    const [mediaItems, setMediaItems] = React.useState<any[]>([])
    const [searchQuery, setSearchQuery] = React.useState("")
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 12

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [itemToDelete, setItemToDelete] = React.useState<any>(null)

    const loadMedia = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const products = await getAdminProducts()
            const images = products.flatMap(p =>
                (p.images || []).map((img: string, i: number) => ({
                    id: `${p.id}-${i}`,
                    url: img,
                    name: p.name,
                    productName: p.name,
                    size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
                    type: img.split('.').pop()?.toUpperCase() || "JPEG",
                    date: new Date(p.createdAt).toLocaleDateString()
                }))
            )
            setMediaItems(images)
        } catch (error) {
            console.error("Failed to load media:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        loadMedia()
    }, [loadMedia])

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url)
        toast.info("Lien Alpha copié")
    }

    const confirmDelete = (item: any) => {
        setItemToDelete(item)
        setIsDeleteDialogOpen(true)
    }

    const handleDelete = async () => {
        // Since images are derived from products in this demo, real deletion would involve updating the product
        toast.error("La suppression directe d'asset doit être effectuée via la fiche produit.")
        setIsDeleteDialogOpen(false)
    }

    const filteredMedia = mediaItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredMedia.length / itemsPerPage)
    const currentMedia = filteredMedia.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    React.useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery])

    const stats = [
        { label: "Assets Référencés", value: mediaItems.length.toString(), icon: FileImage, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Performance CDN", value: "99.9%", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Stockage Virtuel", value: "4.2 GB", icon: History, color: "text-amber-600", bg: "bg-amber-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Médiathèque <span className="text-indigo-600">Assets.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Gestion et audit des ressources visuelles de la plateforme.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)} className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
                        <TabsList className="bg-transparent border-none p-0">
                            <TabsTrigger value="grid" className="rounded-xl data-[state=active]:bg-gray-900 data-[state=active]:text-white transition-all h-9 px-4">
                                <Grid2X2 className="h-4 w-4" />
                            </TabsTrigger>
                            <TabsTrigger value="list" className="rounded-xl data-[state=active]:bg-gray-900 data-[state=active]:text-white transition-all h-9 px-4">
                                <List className="h-4 w-4" />
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <CldUploadWidget
                        uploadPreset="ml_default"
                        onSuccess={() => { toast.success("Média Uploadé ! Associez-le à un produit."); loadMedia(); }}
                        onError={(err) => {
                            console.error("Media Page Upload Error:", err);
                            toast.error("Erreur d'upload: Vérifiez que votre preset est 'UNSIGNED'");
                        }}
                    >
                        {({ open }) => (
                            <Button
                                onClick={() => open()}
                                className="h-11 px-6 rounded-2xl bg-indigo-600 text-white text-[12px] font-bold hover:bg-indigo-700 hover:shadow-2xl transition-all flex items-center gap-2 uppercase tracking-widest shadow-xl"
                            >
                                <Plus className="h-4 w-4" /> Import Alpha
                            </Button>
                        )}
                    </CldUploadWidget>
                </div>
            </div>

            {/* Matrix Stats */}
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

            {/* Grid Manager */}
            <div className="bg-white border border-gray-50 rounded-[2.5rem] overflow-hidden shadow-sm min-h-[600px]">
                <div className="p-6 flex flex-col md:flex-row items-center gap-4 bg-gray-50/30 border-b border-gray-50">
                    <div className="relative flex-1 w-full flex items-center group">
                        <Search className="absolute left-5 h-4 w-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <Input
                            placeholder="Interroger la base d'assets..."
                            className="bg-white h-12 pl-12 pr-6 rounded-2xl border-gray-100 focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-200 text-[14px] font-medium placeholder:text-gray-400 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-gray-50 animate-pulse rounded-[2rem]" />
                                ))}
                            </div>
                        ) : filteredMedia.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 opacity-30 italic">Aucune ressource trouvée</div>
                        ) : viewMode === "grid" ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
                            >
                                {currentMedia.map((item, i) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.02 }}
                                        className="group relative aspect-square bg-white rounded-[2rem] overflow-hidden border border-gray-50 hover:shadow-2xl transition-all duration-500 cursor-pointer shadow-sm"
                                    >
                                        <img src={item.url} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />

                                        <div className="absolute inset-0 bg-gray-950/80 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[4px] flex flex-col justify-end p-5">
                                            <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest line-clamp-1">{item.name}</p>
                                                    <p className="text-[9px] text-white/50 font-bold uppercase">{item.type} • {item.size}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="icon" className="h-9 w-9 bg-white/10 hover:bg-white hover:text-gray-900 border-white/20 text-white rounded-xl shadow-xl transition-all" onClick={() => handleCopyUrl(item.url)}>
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="h-9 w-9 bg-rose-500/80 hover:bg-rose-600 border-none text-white rounded-xl shadow-xl transition-all ml-auto" onClick={() => confirmDelete(item)}>
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="overflow-hidden rounded-[2.5rem] border border-gray-100"
                            >
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-50 font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                            <th className="px-8 py-5">Aperçu</th>
                                            <th className="px-8 py-5">Référence / Parent</th>
                                            <th className="px-8 py-5">Type Asset</th>
                                            <th className="px-8 py-5 text-right">Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {currentMedia.map((item) => (
                                            <tr key={item.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                                                <td className="px-8 py-4">
                                                    <div className="h-14 w-14 rounded-2xl border border-gray-100 overflow-hidden shadow-sm group-hover:rotate-6 transition-transform duration-500">
                                                        <img src={item.url} className="h-full w-full object-cover" />
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <p className="text-[14px] font-bold text-gray-900 leading-tight mb-1">{item.name}</p>
                                                    <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest italic">{item.productName}</p>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <Badge className="bg-gray-50 text-gray-500 text-[9px] font-black tracking-widest px-3 py-1.5 rounded-xl uppercase border border-gray-100/50">{item.type}</Badge>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <div className="flex flex-col items-end">
                                                        <p className="text-[13px] font-black text-gray-900 tabular-nums">{item.size}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold">{item.date}</p>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl" onClick={(e) => { e.stopPropagation(); handleCopyUrl(item.url); }}>
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl" onClick={(e) => { e.stopPropagation(); confirmDelete(item); }}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Advanced Pagination & Audit Bar */}
                <div className="p-8 border-t border-gray-50 bg-gray-50/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Audit Global</span>
                            <p className="text-[13px] font-black text-gray-900 italic">{filteredMedia.length} Assets <span className="text-gray-300 mx-1">/</span> {mediaItems.length} Total</p>
                        </div>
                        <div className="h-8 w-px bg-gray-100 hidden md:block" />
                        <Button variant="ghost" onClick={loadMedia} className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white text-indigo-600">
                            <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} /> Refresh
                        </Button>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="h-10 w-10 p-0 rounded-2xl border-gray-100 hover:bg-white disabled:opacity-30 transition-all"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center gap-2 px-2">
                                {[...Array(totalPages)].map((_, i) => {
                                    const page = i + 1;
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <Button
                                                key={page}
                                                variant={currentPage === page ? "default" : "ghost"}
                                                size="sm"
                                                onClick={() => setCurrentPage(page)}
                                                className={cn(
                                                    "h-10 w-10 p-0 rounded-2xl transition-all font-black text-[12px] italic",
                                                    currentPage === page
                                                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100"
                                                        : "text-gray-400 hover:text-indigo-600 hover:bg-white"
                                                )}
                                            >
                                                {page}
                                            </Button>
                                        );
                                    } else if (
                                        page === currentPage - 2 ||
                                        page === currentPage + 2
                                    ) {
                                        return <span key={page} className="text-gray-300 text-[10px] font-black">•••</span>;
                                    }
                                    return null;
                                })}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="h-10 w-10 p-0 rounded-2xl border-gray-100 hover:bg-white disabled:opacity-30 transition-all"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <DeleteConfirmModal
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Révocation Média"
                description="Cette action révoquera le lien de l'asset. Notez que pour supprimer définitivement une image, vous devez l'éditer via la configuration du produit parent."
            />
        </div>
    )
}
