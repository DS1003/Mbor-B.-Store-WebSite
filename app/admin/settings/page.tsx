"use client"

import * as React from "react"
import {
    Bell,
    Lock,
    User,
    Store,
    CreditCard,
    Globe,
    Shield,
    Save,
    Camera,
    Check,
    Zap,
    LayoutGrid,
    Mail,
    Smartphone,
    Instagram,
    Eye,
    ChevronRight,
    Search,
    MousePointer2,
    Database,
    Palette
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

import { getStoreConfig, updateStoreConfig } from "../actions"
import { toast } from "sonner"
import { ImageUpload } from "@/components/admin/image-upload"

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = React.useState("Général")
    const [isLoading, setIsLoading] = React.useState(true)
    const [isSaving, setIsSaving] = React.useState(false)
    const [formData, setFormData] = React.useState<any>({
        name: "",
        slogan: "",
        description: "",
        logoUrl: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
        facebookUrl: "",
        instagramUrl: "",
        whatsappNumber: "",
        deliveryFee: 2000,
        freeDeliveryOver: 50000,
        shippingPolicy: "",
        waveNumber: "",
        omNumber: "",
        bankAccount: "",
        paymentPolicy: "",
        returnPolicy: "",
        aboutUs: ""
    })

    const loadConfig = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const config = await getStoreConfig()
            if (config) {
                setFormData({
                    name: config.name || "Mbor B. Store",
                    slogan: config.slogan || "",
                    description: config.description || "",
                    logoUrl: config.logoUrl || "",
                    contactEmail: config.contactEmail || "",
                    contactPhone: config.contactPhone || "",
                    address: config.address || "",
                    facebookUrl: config.facebookUrl || "",
                    instagramUrl: config.instagramUrl || "",
                    whatsappNumber: config.whatsappNumber || "",
                    deliveryFee: config.deliveryFee || 2000,
                    freeDeliveryOver: config.freeDeliveryOver || 50000,
                    shippingPolicy: config.shippingPolicy || "",
                    waveNumber: config.waveNumber || "",
                    omNumber: config.omNumber || "",
                    bankAccount: config.bankAccount || "",
                    paymentPolicy: config.paymentPolicy || "",
                    returnPolicy: config.returnPolicy || "",
                    aboutUs: config.aboutUs || ""
                })
            }
        } catch (error) {
            console.error("Failed to load settings:", error)
            toast.error("Erreur de chargement")
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        loadConfig()
    }, [loadConfig])

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await updateStoreConfig(formData)
            toast.success("Configuration synchronisée")
        } catch (error) {
            toast.error("Erreur de synchronisation")
        } finally {
            setIsSaving(false)
        }
    }

    const menuItems = [
        { label: "Général", icon: Store, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Profil Admin", icon: User, color: "text-gray-600", bg: "bg-gray-50" },
        { label: "Sécurité", icon: Lock, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Notifications", icon: Bell, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Paiements", icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Livraison", icon: Globe, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Apparence", icon: Palette, color: "text-indigo-600", bg: "bg-indigo-50" },
    ]

    return (
        <div className="space-y-10 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Configuration <span className="text-indigo-600">Système.</span></h1>
                    <p className="text-[13px] text-gray-500 font-medium">Réglages structurels et identité de l'écosystème Mbor B. Store.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-6 rounded-2xl text-[12px] font-bold border-gray-100 hover:bg-white hover:shadow-xl transition-all flex items-center gap-2 uppercase tracking-widest bg-white shadow-sm">
                        <Database className="h-4 w-4 text-gray-400" /> Back-up DB
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="h-11 px-6 rounded-2xl bg-gray-900 text-white text-[12px] font-bold hover:bg-black hover:shadow-2xl transition-all flex items-center gap-2 uppercase tracking-widest shadow-xl"
                    >
                        {isSaving ? <Zap className="h-4 w-4 animate-pulse" /> : <Save className="h-4 w-4" />}
                        {isSaving ? "Sync Flow..." : "Enregistrer"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Sidebar Navigation */}
                <aside className="lg:col-span-3 space-y-6">
                    <div className="bg-white border border-gray-50 p-3 rounded-[2.5rem] shadow-sm space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => setActiveTab(item.label)}
                                className={cn(
                                    "w-full flex items-center px-5 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                    activeTab === item.label
                                        ? "bg-gray-900 text-white shadow-xl shadow-gray-200"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn(
                                    "h-4.4 w-4.4 mr-3 transition-colors",
                                    activeTab === item.label ? "text-white" : item.color
                                )} />
                                <span className="text-[12px] font-black tracking-widest uppercase italic">
                                    {item.label}
                                </span>
                                {activeTab === item.label && <Check className="ml-auto h-3.5 w-3.5 opacity-50" />}
                            </button>
                        ))}
                    </div>

                    <div className="bg-gray-950 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap className="h-20 w-20 text-indigo-400" />
                        </div>
                        <div className="flex items-center gap-2 relative z-10">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Node Status</h4>
                        </div>
                        <div className="space-y-1 relative z-10">
                            <p className="text-lg font-black text-white italic tracking-tight">Full Operational</p>
                            <p className="text-[11px] text-gray-500 font-medium">Gateway Latency: <span className="text-indigo-400 tabular-nums">24ms</span></p>
                        </div>
                    </div>
                </aside>

                {/* Main Settings Area */}
                <div className="lg:col-span-9 space-y-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-10"
                        >
                            {activeTab === "Général" && (
                                <>
                                    {/* Visual Identity */}
                                    <section className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm space-y-12">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-1.5 bg-indigo-600 rounded-full" />
                                            <h3 className="text-xl font-black text-gray-900 uppercase italic">Identité <span className="text-indigo-600">Visuelle.</span></h3>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-12 items-start">
                                            <div className="space-y-4 w-full md:w-auto">
                                                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Asset Logo Alpha</Label>
                                                <ImageUpload
                                                    value={formData.logoUrl ? [formData.logoUrl] : []}
                                                    onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                                                    onRemove={() => setFormData({ ...formData, logoUrl: "" })}
                                                />
                                            </div>

                                            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <Label htmlFor="store-name" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identifiant Public</Label>
                                                    <Input
                                                        id="store-name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="h-12 border-gray-100 focus:ring-indigo-100 focus:border-indigo-200 rounded-2xl text-[14px] font-black uppercase italic"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="slogan" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Manifesto (Slogan)</Label>
                                                    <Input
                                                        id="slogan"
                                                        value={formData.slogan}
                                                        onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                                                        className="h-12 border-gray-100 focus:ring-indigo-100 focus:border-indigo-200 rounded-2xl text-[14px] font-medium italic"
                                                    />
                                                </div>
                                                <div className="md:col-span-2 space-y-2">
                                                    <Label htmlFor="manifesto-seo" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description Narrative (SEO)</Label>
                                                    <Textarea
                                                        id="manifesto-seo"
                                                        rows={5}
                                                        className="border-gray-100 focus:ring-indigo-100 focus:border-indigo-200 rounded-[2rem] p-6 text-[14px] leading-relaxed resize-none bg-gray-50/30"
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Channels */}
                                    <section className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm space-y-10">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-1.5 bg-gray-900 rounded-full" />
                                            <h3 className="text-xl font-black text-gray-900 uppercase italic">Canaux de <span className="text-indigo-600">Flux.</span></h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3 group">
                                                <div className="flex items-center justify-between px-2">
                                                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp Business</Label>
                                                    <Smartphone className="h-4 w-4 text-gray-200 group-focus-within:text-emerald-500 transition-colors" />
                                                </div>
                                                <Input
                                                    value={formData.whatsappNumber}
                                                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                                    className="h-12 border-gray-100 focus:ring-emerald-100 focus:border-emerald-200 rounded-2xl text-[14px] font-black tabular-nums bg-gray-50/30 shadow-inner"
                                                />
                                            </div>
                                            <div className="space-y-3 group">
                                                <div className="flex items-center justify-between px-2">
                                                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instagram Handler</Label>
                                                    <Instagram className="h-4 w-4 text-gray-200 group-focus-within:text-rose-500 transition-colors" />
                                                </div>
                                                <Input
                                                    value={formData.instagramUrl}
                                                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                                                    className="h-12 border-gray-100 focus:ring-rose-100 focus:border-rose-200 rounded-2xl text-[14px] font-black bg-gray-50/30 shadow-inner"
                                                />
                                            </div>
                                            <div className="space-y-3 group">
                                                <div className="flex items-center justify-between px-2">
                                                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Audit Email</Label>
                                                    <Mail className="h-4 w-4 text-gray-200 group-focus-within:text-indigo-500 transition-colors" />
                                                </div>
                                                <Input
                                                    value={formData.contactEmail}
                                                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                                    className="h-12 border-gray-100 focus:ring-indigo-100 focus:border-indigo-200 rounded-2xl text-[14px] font-black bg-gray-50/30 shadow-inner"
                                                />
                                            </div>
                                            <div className="space-y-3 group">
                                                <div className="flex items-center justify-between px-2">
                                                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Physique</Label>
                                                    <Globe className="h-4 w-4 text-gray-200 group-focus-within:text-blue-500 transition-colors" />
                                                </div>
                                                <Input
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    className="h-12 border-gray-100 focus:ring-blue-100 focus:border-blue-200 rounded-2xl text-[14px] font-bold bg-gray-50/30 shadow-inner"
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </>
                            )}

                            {activeTab === "Paiements" && (
                                <section className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm space-y-12">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-1.5 bg-emerald-600 rounded-full" />
                                        <h3 className="text-xl font-black text-gray-900 uppercase italic">Canaux de <span className="text-emerald-600">Paiement.</span></h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <Label className="text-emerald-600">Wave Sénégal (Numéro)</Label>
                                            <Input
                                                value={formData.waveNumber}
                                                onChange={(e) => setFormData({ ...formData, waveNumber: e.target.value })}
                                                placeholder="ex: 77 000 00 00"
                                                className="h-12 border-emerald-100 focus:ring-emerald-100 rounded-2xl font-black"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-orange-500">Orange Money (Numéro)</Label>
                                            <Input
                                                value={formData.omNumber}
                                                onChange={(e) => setFormData({ ...formData, omNumber: e.target.value })}
                                                placeholder="ex: 77 000 00 00"
                                                className="h-12 border-orange-100 focus:ring-orange-100 rounded-2xl font-black"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <Label>Coordonnées Bancaires (RIB)</Label>
                                            <Textarea
                                                value={formData.bankAccount}
                                                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                                                rows={3}
                                                className="border-gray-100 rounded-2xl p-4 font-mono text-[12px]"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <Label>Politique de Paiement</Label>
                                            <Textarea
                                                value={formData.paymentPolicy}
                                                onChange={(e) => setFormData({ ...formData, paymentPolicy: e.target.value })}
                                                rows={4}
                                                className="border-gray-100 rounded-2xl p-4 text-[13px]"
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {activeTab === "Livraison" && (
                                <section className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm space-y-12">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-1.5 bg-blue-600 rounded-full" />
                                        <h3 className="text-xl font-black text-gray-900 uppercase italic">Paramètres <span className="text-blue-600">Logistiques.</span></h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <Label>Frais de Livraison Standard (CFA)</Label>
                                            <Input
                                                type="number"
                                                value={formData.deliveryFee}
                                                onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
                                                className="h-12 border-gray-100 rounded-2xl font-black tabular-nums"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Livraison Offerte à partir de (CFA)</Label>
                                            <Input
                                                type="number"
                                                value={formData.freeDeliveryOver}
                                                onChange={(e) => setFormData({ ...formData, freeDeliveryOver: e.target.value })}
                                                className="h-12 border-gray-100 rounded-2xl font-black tabular-nums text-emerald-600"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <Label>Politique d'Expédition</Label>
                                            <Textarea
                                                value={formData.shippingPolicy}
                                                onChange={(e) => setFormData({ ...formData, shippingPolicy: e.target.value })}
                                                rows={6}
                                                className="border-gray-100 rounded-2xl p-4 text-[13px]"
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {activeTab === "Apparence" && (
                                <section className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm space-y-12 text-center">
                                    <div className="py-20 space-y-6">
                                        <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600">
                                            <Palette className="h-10 w-10" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-black uppercase italic">Customisation Thématique</h3>
                                            <p className="text-[13px] text-gray-400 max-w-sm mx-auto">Sélectionnez les couleurs et polices de l'espace client. (Arrive bientôt)</p>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {["Profil Admin", "Sécurité", "Notifications"].includes(activeTab) && (
                                <div className="bg-white border border-gray-50 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                                        <Database className="h-10 w-10" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900 uppercase italic">Module Système {activeTab}</h3>
                                        <p className="text-[13px] text-gray-400 font-medium max-w-sm">Les réglages de "{activeTab}" sont gérés automatiquement par le noyau d'authentification.</p>
                                    </div>
                                    <Button onClick={() => setActiveTab("Général")} className="rounded-2xl bg-gray-900 px-8 font-black uppercase text-[11px] tracking-widest">Retour au Panneau Général</Button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

function Label({ children, className, ...props }: any) {
    return (
        <label className={cn("text-[10px] font-black text-gray-400 uppercase tracking-widest", className)} {...props}>
            {children}
        </label>
    )
}
