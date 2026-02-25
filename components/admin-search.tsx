"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2, X, Package, ShoppingCart, Users, ChevronRight, Calculator } from "lucide-react"
import { useDebounce } from "use-debounce"
import { motion, AnimatePresence } from "framer-motion"
import { globalAdminSearch } from "@/app/admin/actions"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AdminSearch() {
    const router = useRouter()
    const [isOpen, setIsOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState<{
        products: any[],
        orders: any[],
        customers: any[]
    }>({ products: [], orders: [], customers: [] })
    const [isLoading, setIsLoading] = React.useState(false)
    const [debouncedQuery] = useDebounce(query, 300)

    const containerRef = React.useRef<HTMLDivElement>(null)

    // Keyboard shortcut (⌘K or Ctrl+K)
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setIsOpen(true)
                const input = containerRef.current?.querySelector("input")
                input?.focus()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Fetch results
    React.useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.length < 2) {
                setResults({ products: [], orders: [], customers: [] })
                return
            }
            setIsLoading(true)
            try {
                const data = await globalAdminSearch(debouncedQuery)
                setResults(data)
            } catch (error) {
                console.error("Admin search error:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchResults()
    }, [debouncedQuery])

    const hasResults = results.products.length > 0 || results.orders.length > 0 || results.customers.length > 0

    return (
        <div ref={containerRef} className="relative w-full lg:w-[450px] xl:w-[600px] z-[60]">
            <div
                className={cn(
                    "relative flex items-center bg-gray-50 h-9 rounded-xl px-4 border border-gray-100 transition-all group",
                    isOpen && "bg-white border-amber-200 shadow-xl ring-4 ring-amber-50"
                )}
            >
                <Search className={cn(
                    "h-3.5 w-3.5 text-gray-400 transition-colors",
                    isOpen && "text-amber-600"
                )} />
                <input
                    type="text"
                    placeholder="Recherche globale (Produits, Commandes, Clients...)"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setIsOpen(true)
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="bg-transparent border-none focus:ring-0 text-[13px] ml-2.5 w-full outline-none text-gray-600 placeholder:text-gray-400 font-medium"
                />

                <div className="flex items-center space-x-2">
                    {isLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin text-amber-600" />
                    ) : query ? (
                        <button
                            type="button"
                            onClick={() => { setQuery(""); setResults({ products: [], orders: [], customers: [] }) }}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="h-3 w-3 text-gray-400" />
                        </button>
                    ) : (
                        <div className="flex items-center gap-1 opacity-20 group-focus-within:opacity-50">
                            <kbd className="text-[10px] font-sans">⌘</kbd>
                            <kbd className="text-[10px] font-sans">K</kbd>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (query.length >= 2 || hasResults) && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.99 }}
                        className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-[70] overflow-hidden max-h-[85vh] flex flex-col"
                    >
                        <div className="overflow-y-auto p-2 custom-scrollbar flex-1">
                            {/* Products Section */}
                            {results.products.length > 0 && (
                                <div className="mb-4">
                                    <div className="px-3 py-2 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Package className="h-3.5 w-3.5 text-blue-500" />
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Produits</span>
                                        </div>
                                        <span className="text-[10px] font-medium text-gray-300">{results.products.length} résultats</span>
                                    </div>
                                    <div className="grid gap-1">
                                        {results.products.map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() => { router.push(`/admin/products?id=${p.id}`); setIsOpen(false) }}
                                                className="flex items-center p-2 rounded-xl hover:bg-gray-50 transition-all text-left group"
                                            >
                                                <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                                    <img src={p.image} className="h-full w-full object-cover" alt="" />
                                                </div>
                                                <div className="ml-3 flex-1 min-w-0">
                                                    <p className="text-[13px] font-bold text-gray-900 truncate group-hover:text-amber-600 transition-colors">{p.name}</p>
                                                    <p className="text-[11px] text-gray-400 font-medium">{p.category} • {p.price.toLocaleString()} F</p>
                                                </div>
                                                <ChevronRight className="h-3.5 w-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Orders Section */}
                            {results.orders.length > 0 && (
                                <div className="mb-4">
                                    <div className="px-3 py-2 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <ShoppingCart className="h-3.5 w-3.5 text-amber-500" />
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Commandes</span>
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        {results.orders.map((o) => (
                                            <button
                                                key={o.id}
                                                onClick={() => { router.push(`/admin/orders/${o.id}`); setIsOpen(false) }}
                                                className="flex items-center p-2 rounded-xl hover:bg-gray-50 transition-all text-left group"
                                            >
                                                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                                                    <Calculator className="h-5 w-5 text-amber-600" />
                                                </div>
                                                <div className="ml-3 flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-[13px] font-bold text-gray-900 truncate group-hover:text-amber-600 transition-colors">#{o.id.slice(-6).toUpperCase()}</p>
                                                        <span className={cn(
                                                            "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                                                            o.status === 'PAID' ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"
                                                        )}>{o.status}</span>
                                                    </div>
                                                    <p className="text-[11px] text-gray-400 font-medium">{o.customerName} • {o.total.toLocaleString()} F</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Customers Section */}
                            {results.customers.length > 0 && (
                                <div className="mb-1">
                                    <div className="px-3 py-2 flex items-center gap-2">
                                        <Users className="h-3.5 w-3.5 text-green-500" />
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Clients</span>
                                    </div>
                                    <div className="grid gap-1">
                                        {results.customers.map((c) => (
                                            <button
                                                key={c.id}
                                                onClick={() => { router.push(`/admin/customers?id=${c.id}`); setIsOpen(false) }}
                                                className="flex items-center p-2 rounded-xl hover:bg-gray-50 transition-all text-left group"
                                            >
                                                <Avatar className="h-10 w-10 rounded-lg border border-gray-100">
                                                    <AvatarImage src={c.image} />
                                                    <AvatarFallback className="bg-green-50 text-green-600 font-bold text-xs">{c.name?.[0] || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <div className="ml-3 flex-1 min-w-0">
                                                    <p className="text-[13px] font-bold text-gray-900 truncate group-hover:text-amber-600 transition-colors">{c.name}</p>
                                                    <p className="text-[11px] text-gray-400 font-medium truncate">{c.email}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!hasResults && query.length >= 2 && !isLoading && (
                                <div className="py-12 text-center">
                                    <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Search className="h-6 w-6 text-gray-300" />
                                    </div>
                                    <p className="text-[13px] text-gray-900 font-bold">Aucun résultat trouvé</p>
                                    <p className="text-[11px] text-gray-400 font-medium max-w-[200px] mx-auto mt-1">
                                        Nous n'avons rien trouvé pour "{query}". Essayez un autre terme.
                                    </p>
                                </div>
                            )}
                        </div>

                        {query.length >= 2 && (
                            <div className="p-3 bg-gray-50 border-t border-gray-100">
                                <button className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group">
                                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Recherche approfondie...</span>
                                    <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-gray-200 bg-gray-50 px-1.5 font-sans text-[10px] font-medium text-gray-400">
                                        Enter
                                    </kbd>
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
