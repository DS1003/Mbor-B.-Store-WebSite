"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, Loader2, X, ArrowRight } from "lucide-react"
import { useDebounce } from "use-debounce"
import { motion, AnimatePresence } from "framer-motion"
import { quickSearchProducts } from "@/lib/actions/public"
import { cn } from "@/lib/utils"

export function HeaderSearch() {
    const router = useRouter()
    const [isOpen, setIsOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [debouncedQuery] = useDebounce(query, 300)

    const containerRef = React.useRef<HTMLDivElement>(null)

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
                setResults([])
                return
            }
            setIsLoading(true)
            try {
                const data = await quickSearchProducts(debouncedQuery)
                setResults(data)
            } catch (error) {
                console.error("Search error:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchResults()
    }, [debouncedQuery])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/shop?query=${encodeURIComponent(query.trim())}`)
            setIsOpen(false)
        }
    }

    const clearSearch = () => {
        setQuery("")
        setResults([])
        setIsOpen(false)
    }

    return (
        <div ref={containerRef} className="relative w-full lg:w-[450px] xl:w-[600px]">
            <form
                onSubmit={handleSearch}
                className={cn(
                    "relative flex items-center bg-muted/30 h-11 rounded-2xl px-5 border border-transparent transition-all group",
                    isOpen && "bg-background border-primary/20 shadow-lg ring-4 ring-primary/5"
                )}
            >

                <Search className={cn(
                    "h-4 w-4 text-muted-foreground transition-colors",
                    isOpen && "text-primary"
                )} />
                <input
                    type="text"
                    placeholder="Recherche ton style..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setIsOpen(true)
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="bg-transparent border-none focus:ring-0 text-[12px] font-medium tracking-tight ml-3 w-full outline-none"
                />

                <div className="flex items-center space-x-2">
                    {isLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin text-primary" />
                    ) : query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="p-1 hover:bg-muted rounded-full transition-colors"
                        >
                            <X className="h-3 w-3 text-muted-foreground" />
                        </button>
                    )}
                </div>
            </form>

            <AnimatePresence>
                {isOpen && (query.length >= 2 || results.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-background border border-muted/60 rounded-2xl shadow-2xl z-[110] overflow-hidden"
                    >
                        <div className="p-4">
                            {results.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Produits suggérés</span>
                                        <button
                                            onClick={handleSearch}
                                            className="text-[10px] font-bold text-primary hover:underline flex items-center"
                                        >
                                            Tout voir <ArrowRight className="ml-1 h-2.5 w-2.5" />
                                        </button>
                                    </div>
                                    <div className="grid gap-2">
                                        {results.map((product) => (
                                            <button
                                                key={product.id}
                                                onClick={() => {
                                                    router.push(`/product/${product.id}`)
                                                    setIsOpen(false)
                                                }}
                                                className="flex items-center p-2 rounded-xl hover:bg-muted/50 transition-colors text-left group"
                                            >
                                                <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="ml-3 flex-1 min-w-0">
                                                    <p className="text-[11px] font-bold truncate group-hover:text-primary transition-colors italic">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground">{product.category}</p>
                                                </div>
                                                <div className="text-[11px] font-black italic text-primary">
                                                    {product.price.toLocaleString()} F
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : query.length >= 2 && !isLoading && (
                                <div className="py-8 text-center">
                                    <p className="text-xs text-muted-foreground font-medium">Aucun résultat pour "{query}"</p>
                                    <button
                                        onClick={handleSearch}
                                        className="mt-2 text-[10px] font-bold text-primary hover:underline"
                                    >
                                        Rechercher dans toute la boutique
                                    </button>
                                </div>
                            )}
                        </div>

                        {query.length >= 2 && (
                            <div className="bg-muted/30 p-3 border-t border-muted/60">
                                <button
                                    onClick={handleSearch}
                                    className="w-full flex items-center justify-center space-x-2 py-2 rounded-xl bg-foreground text-background text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors"
                                >
                                    <span>Résultats complets pour "{query}"</span>
                                    <Search className="h-3 w-3" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
