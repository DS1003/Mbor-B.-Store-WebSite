"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Search,
    Plus,
    LayoutDashboard
} from "lucide-react"

export function CommandPalette() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <div className="p-2 bg-white rounded-[2rem] border border-zinc-100 shadow-2xl overflow-hidden">
                <CommandInput
                    placeholder="PROTOCOLE DE RECHERCHE..."
                    className="h-14 border-none focus:ring-0 text-[10px] font-black uppercase tracking-widest placeholder:text-zinc-300"
                />
                <CommandList className="max-h-[450px] p-2 space-y-2 scrollbar-hide">
                    <CommandEmpty className="py-12 text-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        Aucun résultat trouvé dans la base.
                    </CommandEmpty>

                    <CommandGroup heading="NAVIGATION SYSTÈME">
                        <CommandItem
                            className="rounded-xl p-3 flex items-center gap-3 cursor-pointer aria-selected:bg-black aria-selected:text-[#FFD700] transition-colors"
                            onSelect={() => runCommand(() => router.push("/admin"))}
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight italic">Tableau de Bord</span>
                        </CommandItem>
                        <CommandItem
                            className="rounded-xl p-3 flex items-center gap-3 cursor-pointer aria-selected:bg-black aria-selected:text-[#FFD700] transition-colors"
                            onSelect={() => runCommand(() => router.push("/admin/products"))}
                        >
                            <Package className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight italic">Inventaire Produits</span>
                        </CommandItem>
                        <CommandItem
                            className="rounded-xl p-3 flex items-center gap-3 cursor-pointer aria-selected:bg-black aria-selected:text-[#FFD700] transition-colors"
                            onSelect={() => runCommand(() => router.push("/admin/orders"))}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight italic">Gestion Commandes</span>
                        </CommandItem>
                        <CommandItem
                            className="rounded-xl p-3 flex items-center gap-3 cursor-pointer aria-selected:bg-black aria-selected:text-[#FFD700] transition-colors"
                            onSelect={() => runCommand(() => router.push("/admin/customers"))}
                        >
                            <Users className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight italic">Base Clients</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator className="bg-zinc-100 my-2" />

                    <CommandGroup heading="ACTIONS RAPIDES">
                        <CommandItem
                            className="rounded-xl p-3 flex items-center gap-3 cursor-pointer aria-selected:bg-black aria-selected:text-[#FFD700] transition-colors"
                            onSelect={() => runCommand(() => router.push("/admin/products"))}
                        >
                            <Plus className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight italic">Nouveau Produit</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator className="bg-zinc-100 my-2" />

                    <CommandGroup heading="CONFIGURATIONS">
                        <CommandItem
                            className="rounded-xl p-3 flex items-center gap-3 cursor-pointer aria-selected:bg-black aria-selected:text-[#FFD700] transition-colors"
                            onSelect={() => runCommand(() => router.push("/admin/settings"))}
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight italic">Réglages Système</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </div>
        </CommandDialog>
    )
}
