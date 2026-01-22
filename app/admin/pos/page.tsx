"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import {
    Plus,
    Search,
    ShoppingBag,
    Minus,
    Trash,
    Zap,
    Printer,
    User,
    Box,
    Shirt,
    Phone,
    MapPin,
    ArrowLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { getAdminProducts, createInStoreOrder, getStoreConfig } from "../actions"
import { toast } from "sonner"
import { Receipt } from "@/components/admin/receipt"
import Link from "next/link"

export default function POSPage() {
    const [products, setProducts] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [mounted, setMounted] = React.useState(false)

    // POS state
    const [posCustomerName, setPosCustomerName] = React.useState("")
    const [posCustomerPhone, setPosCustomerPhone] = React.useState("")
    const [posCustomerAddress, setPosCustomerAddress] = React.useState("")
    const [posItems, setPosItems] = React.useState<any[]>([])
    const [posSearchSearch, setPosSearch] = React.useState("")
    const [isSavingPos, setIsSavingPos] = React.useState(false)
    const [config, setConfig] = React.useState<any>(null)
    const [printOrder, setPrintOrder] = React.useState<any>(null)

    const loadData = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const [pData, cData] = await Promise.all([
                getAdminProducts(),
                getStoreConfig()
            ])
            setProducts(pData)
            setConfig(cData)
        } catch (error) {
            console.error("Failed to load POS data:", error)
            toast.error("Erreur de chargement")
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        loadData()
        setMounted(true)
    }, [loadData])

    // POS Logic
    const addToPos = (product: any) => {
        const existing = posItems.find(i => i.productId === product.id)
        if (existing) {
            setPosItems(posItems.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        } else {
            setPosItems([...posItems, {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                hasCustomization: false,
                customName: "",
                customNumber: "",
                allowFlocage: product.allowFlocage,
                allowGravure: product.allowGravure
            }])
        }
        toast.info(`${product.name} ajouté`)
    }

    const removeFromPos = (productId: string) => {
        setPosItems(posItems.filter(i => i.productId !== productId))
    }

    const updatePosQty = (productId: string, delta: number) => {
        setPosItems(posItems.map(item => {
            if (item.productId === productId) {
                const newQty = Math.max(1, item.quantity + delta)
                return { ...item, quantity: newQty }
            }
            return item
        }))
    }

    const updatePosItemCustomization = (productId: string, data: any) => {
        setPosItems(posItems.map(item =>
            item.productId === productId ? { ...item, ...data } : item
        ))
    }

    const posTotal = posItems.reduce((acc, current) => acc + (current.price * current.quantity), 0)

    const handleCreatePosOrder = async () => {
        if (!posCustomerName) return toast.error("Nom du client requis")
        if (posItems.length === 0) return toast.error("Aucun article")

        setIsSavingPos(true)
        try {
            const order = await createInStoreOrder({
                customerName: posCustomerName,
                customerPhone: posCustomerPhone,
                customerAddress: posCustomerAddress,
                items: posItems.map(i => ({
                    productId: i.productId,
                    quantity: i.quantity,
                    price: i.price,
                    customName: i.hasCustomization ? i.customName : undefined,
                    customNumber: i.hasCustomization ? i.customNumber : undefined
                })),
                total: posTotal
            })
            toast.success("Commande Boutique Enregistrée")

            // Auto-print receipt
            setPrintOrder(order)
            setTimeout(() => {
                window.print()
                setTimeout(() => {
                    setPrintOrder(null)
                    setPosItems([])
                    setPosCustomerName("")
                    setPosCustomerPhone("")
                    setPosCustomerAddress("")
                }, 1000)
            }, 500)
        } catch (error) {
            toast.error("Erreur POS")
        } finally {
            setIsSavingPos(false)
        }
    }

    const filteredProductsPos = products.filter(p =>
        p.name.toLowerCase().includes(posSearchSearch.toLowerCase()) ||
        p.id.toLowerCase().includes(posSearchSearch.toLowerCase())
    )

    return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] gap-6">
            {/* Hidden Receipt for Printing (Thermal Style) - Portaled to Body */}
            {mounted && createPortal(
                <div id="thermal-receipt" className="receipt-print-only">
                    <Receipt order={printOrder} config={config} />
                </div>,
                document.body
            )}

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black uppercase italic tracking-tighter text-gray-900">
                        Terminal <span className="text-indigo-600">Vente Boutique.</span>
                    </h1>
                    <p className="text-sm font-bold text-gray-400">Génération immédiate de facture et encaissement en point de vente.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/orders">
                        <Button variant="outline" className="h-10 rounded-xl font-bold gap-2">
                            <ArrowLeft className="h-4 w-4" /> Retour aux commandes
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Product Selection (8 columns) */}
                <div className="lg:col-span-7 flex flex-col gap-6 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative">
                    <div className="relative group shrink-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <Input
                            placeholder="Scanner ou rechercher un produit..."
                            className="h-12 pl-12 rounded-2xl bg-gray-50/50 border-gray-100 focus:bg-white transition-all font-medium"
                            value={posSearchSearch}
                            onChange={(e) => setPosSearch(e.target.value)}
                        />
                    </div>

                    <div className="max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredProductsPos.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex flex-col p-4 bg-white border border-gray-50 rounded-2xl hover:border-indigo-100 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                                    onClick={() => addToPos(p)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-xl bg-gray-50 overflow-hidden relative shrink-0">
                                            {p.images?.[0] && <img src={p.images[0]} className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-bold text-gray-900 leading-tight truncate">{p.name}</p>
                                            <p className="text-[11px] text-gray-400 font-bold mt-1">STOCK: {p.stock}</p>
                                            <p className="text-[14px] font-black text-indigo-600 mt-0.5">{Number(p.price).toLocaleString()} F</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 h-7 w-7 rounded-full bg-indigo-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-lg">
                                        <Plus className="h-4 w-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cart & Billing (5 columns) */}
                <div className="lg:col-span-5 flex flex-col bg-white rounded-[2rem] border border-indigo-50 shadow-sm overflow-hidden sticky top-6">
                    {/* Customer Info Section */}
                    <div className="p-6 space-y-4 bg-gray-50/30 shrink-0 border-b border-gray-50">
                        <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                            <User className="h-3 w-3" /> Informations Client
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5 col-span-2 sm:col-span-1">
                                <Label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Nom Complet</Label>
                                <Input
                                    placeholder="ex: Moussa Diop"
                                    className="h-11 rounded-xl bg-white border-gray-100 shadow-none font-medium text-[13px]"
                                    value={posCustomerName}
                                    onChange={(e) => setPosCustomerName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5 col-span-2 sm:col-span-1">
                                <Label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Téléphone</Label>
                                <Input
                                    placeholder="+221 ..."
                                    className="h-11 rounded-xl bg-white border-gray-100 shadow-none font-medium text-[13px]"
                                    value={posCustomerPhone}
                                    onChange={(e) => setPosCustomerPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Adresse de Livraison</Label>
                            <Input
                                placeholder="Quartier, Rue, Ville..."
                                className="h-11 rounded-xl bg-white border-gray-100 shadow-none font-medium text-[13px]"
                                value={posCustomerAddress}
                                onChange={(e) => setPosCustomerAddress(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto p-6 space-y-4 custom-scrollbar">
                        <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 sticky top-0 bg-white pb-2 z-10 w-full">
                            <ShoppingBag className="h-3 w-3" /> Articles Sélectionnés ({posItems.length})
                        </h4>

                        {posItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Box className="h-12 w-12 text-gray-100 mb-2" />
                                <p className="text-[13px] text-gray-300 italic font-medium">Panier vide</p>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {posItems.map((item) => (
                                    <div key={item.productId} className="space-y-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="space-y-0.5 min-w-0">
                                                <p className="text-[12px] font-black text-gray-900 truncate uppercase">{item.name}</p>
                                                <p className="text-[11px] text-indigo-600 font-black tabular-nums">{Number(item.price).toLocaleString()} F</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => updatePosQty(item.productId, -1)}><Minus className="h-3 w-3" /></Button>
                                                    <span className="text-[12px] font-black tabular-nums min-w-[1.5rem] text-center">{item.quantity}</span>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => updatePosQty(item.productId, 1)}><Plus className="h-3 w-3" /></Button>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50 rounded-xl" onClick={() => removeFromPos(item.productId)}><Trash className="h-4 w-4" /></Button>
                                            </div>
                                        </div>

                                        {/* Customization (Only if allowed) */}
                                        {(item.allowFlocage || item.allowGravure) && (
                                            <div className="pt-3 border-t border-gray-100">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Shirt className="h-3.5 w-3.5 text-indigo-400" />
                                                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-tight">
                                                            {item.allowFlocage ? "Flocage" : "Gravure"}
                                                        </span>
                                                    </div>
                                                    <Switch
                                                        checked={item.hasCustomization}
                                                        onCheckedChange={(val) => updatePosItemCustomization(item.productId, { hasCustomization: val })}
                                                    />
                                                </div>

                                                <AnimatePresence>
                                                    {item.hasCustomization && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="grid grid-cols-2 gap-3 mt-3 overflow-hidden"
                                                        >
                                                            <div className="space-y-1">
                                                                <Label className="text-[9px] font-bold text-gray-400 uppercase">{item.allowGravure ? "Texte" : "Nom"}</Label>
                                                                <Input
                                                                    placeholder={item.allowGravure ? "ex: Initiales" : "ex: SALLY"}
                                                                    className="h-8 text-[11px] rounded-lg bg-white"
                                                                    value={item.customName}
                                                                    onChange={(e) => updatePosItemCustomization(item.productId, { customName: e.target.value })}
                                                                />
                                                            </div>
                                                            {!item.allowGravure && (
                                                                <div className="space-y-1">
                                                                    <Label className="text-[9px] font-bold text-gray-400 uppercase">N°</Label>
                                                                    <Input
                                                                        placeholder="ex: 10"
                                                                        className="h-8 text-[11px] rounded-lg bg-white text-center"
                                                                        value={item.customNumber}
                                                                        onChange={(e) => updatePosItemCustomization(item.productId, { customNumber: e.target.value })}
                                                                    />
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer / Summary Area */}
                    <div className="p-8 bg-white border-t border-gray-100 space-y-6 shrink-0">
                        <div className="flex justify-between items-center">
                            <div className="space-y-0.5">
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Montant Total</p>
                                <p className="text-[10px] font-bold text-indigo-400 italic">Net à payer immédiatement</p>
                            </div>
                            <span className="text-4xl font-black text-gray-900 tabular-nums italic tracking-tighter shrink-0">{Number(posTotal).toLocaleString()} F</span>
                        </div>

                        <Button
                            className="w-full h-16 bg-gray-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 text-sm"
                            disabled={isSavingPos || posItems.length === 0}
                            onClick={handleCreatePosOrder}
                        >
                            {isSavingPos ? (
                                <>
                                    <Zap className="h-5 w-5 animate-pulse text-yellow-400" />
                                    Traitement...
                                </>
                            ) : (
                                <>
                                    <Printer className="h-5 w-5" />
                                    Encaisser & Imprimer
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Printing specific Styles (Copied from Orders for consistency) */}
            <style jsx global>{`
                @media print {
                    body > *:not(#thermal-receipt) {
                        display: none !important;
                    }
                    #thermal-receipt {
                        display: block !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 80mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        visibility: visible !important;
                    }
                    #thermal-receipt * {
                        visibility: visible !important;
                    }
                    @page {
                        size: 80mm auto;
                        margin: 0;
                    }
                    html, body {
                        background: white !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                }
                .receipt-print-only {
                    display: none;
                }
            `}</style>
        </div>
    )
}
