"use client"

import * as React from "react"
import {
    Plus,
    X,
    Upload,
    Box,
    Image as ImageIcon,
    Loader2,
} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createProduct } from "@/app/admin/products/_actions"
import { toast } from "sonner"

const categories = [
    { value: "Maillots", label: "Maillots" },
    { value: "Crampons", label: "Crampons" },
    { value: "Sneakers", label: "Sneakers" },
    { value: "Accessoires", label: "Accessoires" },
]

export function ProductModal() {
    const [open, setOpen] = React.useState(false)
    const [isPending, setIsPending] = React.useState(false)
    const [preview, setPreview] = React.useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsPending(true)

        const formData = new FormData(event.currentTarget)

        try {
            const result = await createProduct(formData)
            if (result.success) {
                toast.success("Product created successfully")
                setOpen(false)
                setPreview(null)
            } else {
                toast.error("An error occurred.")
            }
        } catch (error) {
            toast.error("Connection error.")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-12 px-8 bg-black text-[#FFD700] rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-black/20 hover:shadow-black/40 hover:scale-105 transition-all flex items-center gap-3">
                    <Plus className="h-4 w-4" />
                    ADD PRODUCT
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-white rounded-[2rem] p-0 overflow-hidden border border-zinc-100 shadow-2xl">
                <DialogHeader className="px-8 py-6 border-b border-zinc-100 bg-zinc-50/50 backdrop-blur-xl">
                    <DialogTitle className="text-2xl font-black italic tracking-tighter text-zinc-900 uppercase">Create New Sales Product</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="px-8 py-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Product Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g. Senegal Home Jersey"
                                    required
                                    className="h-12 bg-zinc-50 border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-black/5 focus:border-black transition-all font-bold"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Category</Label>
                                    <div className="relative">
                                        <Select name="category" required>
                                            <SelectTrigger className="h-12 bg-zinc-50 border-zinc-200 rounded-xl text-sm font-bold">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat.value} value={cat.value} className="font-bold uppercase tracking-wide text-xs">{cat.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="stock" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Stock</Label>
                                    <Input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        required
                                        className="h-12 bg-zinc-50 border-zinc-200 rounded-xl text-sm font-bold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Price (F)</Label>
                                    <Input id="price" name="price" type="number" required className="h-12 bg-zinc-50 border-zinc-200 rounded-xl text-sm font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="discountPrice" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Sale Price</Label>
                                    <Input id="discountPrice" name="discountPrice" type="number" className="h-12 bg-zinc-50 border-zinc-200 rounded-xl text-sm font-bold" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Product Image URL</Label>
                                <div className="aspect-video bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center relative overflow-hidden group hover:border-black transition-colors">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-zinc-400 group-hover:text-black transition-colors">
                                            <ImageIcon className="h-8 w-8" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <Input
                                    name="imageUrl"
                                    placeholder="https://..."
                                    onChange={(e) => setPreview(e.target.value)}
                                    className="h-12 bg-zinc-50 border-zinc-200 rounded-xl text-sm font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Description</Label>
                        <textarea
                            name="description"
                            id="description"
                            rows={3}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none resize-none"
                            placeholder="Describe your product..."
                        />
                    </div>

                    <div className="flex items-center justify-between p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center text-[#FFD700]">
                                <Box className="h-5 w-5" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-xs font-black uppercase tracking-wide text-zinc-900">Customization</p>
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Flocking & Engraving</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Flocage</span>
                                <Switch name="allowFlocage" defaultChecked />
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Gravure</span>
                                <Switch name="allowGravure" defaultChecked />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-zinc-100">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="h-12 px-8 rounded-xl text-xs font-bold text-zinc-400 hover:text-black uppercase tracking-wider hover:bg-zinc-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="h-12 px-10 bg-black text-[#FFD700] rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-black/20 hover:shadow-black/40 hover:scale-105 transition-all"
                        >
                            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Product"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
