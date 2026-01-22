"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export interface CartItem {
    id: string
    productId: string
    name: string
    price: number
    quantity: number
    image: string
    size?: string
    customName?: string
    customNumber?: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "id">) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    subtotal: number
    cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("mbor-cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
    }, [])

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem("mbor-cart", JSON.stringify(items))
    }, [items])

    const addItem = (newItem: Omit<CartItem, "id">) => {
        setItems((currentItems) => {
            // Check if item already exists (with same size and personalization)
            const existingItemIndex = currentItems.findIndex(
                (item) =>
                    item.productId === newItem.productId &&
                    item.size === newItem.size &&
                    item.customName === newItem.customName &&
                    item.customNumber === newItem.customNumber
            )

            if (existingItemIndex > -1) {
                const updatedItems = [...currentItems]
                updatedItems[existingItemIndex].quantity += newItem.quantity
                return updatedItems
            }

            return [...currentItems, { ...newItem, id: Math.random().toString(36).substr(2, 9) }]
        })
    }

    const removeItem = (id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                subtotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
