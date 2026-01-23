"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

interface WishlistContextType {
    wishlist: any[]
    toggleFavorite: (productId: string) => Promise<void>
    isFavorite: (productId: string) => boolean
    loading: boolean
}

const WishlistContext = React.createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const [wishlist, setWishlist] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(false)

    const fetchWishlist = async () => {
        if (status !== "authenticated") return
        setLoading(true)
        try {
            const res = await fetch("/api/user/favorites")
            if (res.ok) {
                const data = await res.json()
                setWishlist(data)
            }
        } catch (error) {
            console.error("Failed to fetch wishlist", error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchWishlist()
    }, [status])

    const toggleFavorite = async (productId: string) => {
        if (status !== "authenticated") {
            toast.error("Veuillez vous connecter pour ajouter des favoris", {
                action: {
                    label: "Se connecter",
                    onClick: () => window.location.href = "/login"
                }
            })
            return
        }

        try {
            const res = await fetch(`/api/user/favorites/${productId}`, {
                method: "POST"
            })

            if (res.ok) {
                const data = await res.json()
                if (data.isFavorite) {
                    toast.success("Ajouté aux favoris")
                } else {
                    toast.success("Retiré des favoris")
                }
                fetchWishlist()
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        }
    }

    const isFavorite = (productId: string) => {
        return wishlist.some(item => item.id === productId)
    }

    return (
        <WishlistContext.Provider value={{ wishlist, toggleFavorite, isFavorite, loading }}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = React.useContext(WishlistContext)
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider")
    }
    return context
}
