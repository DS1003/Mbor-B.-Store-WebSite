"use client"

import * as React from "react"
import { SessionProvider } from "next-auth/react"
import { CartProvider } from "./cart-context"
import { WishlistProvider } from "./wishlist-context"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <SessionProvider>
            <NextThemesProvider {...props}>
                <CartProvider>
                    <WishlistProvider>
                        {children}
                    </WishlistProvider>
                </CartProvider>
            </NextThemesProvider>
        </SessionProvider>
    )
}
