import type { Metadata, Viewport } from "next"
import { Outfit, Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileNavbar } from "@/components/mobile-navbar"

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
})

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
})

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
}

export const metadata: Metadata = {
    metadataBase: new URL('https://mborbusiness.store'),
    title: {
        default: "Mborbusiness’Store | Le Temple du Football & Streetwear",
        template: "%s | Mbor Store"
    },
    description: "La référence du sport et de la mode urbaine au Sénégal. Maillots officiels, sneakers rares et équipements pro. Livraison express à Dakar et partout au Sénégal.",
    keywords: ["football", "maillots", "sneakers", "dakar", "senegal", "sportswear", "mercurial", "adidas", "nike", "puma"],
    authors: [{ name: "Mbor Store Team" }],
    creator: "Mbor Store",
    openGraph: {
        type: "website",
        locale: "fr_SN",
        url: "https://mborbusiness.store",
        title: "Mborbusiness’Store | Le Temple du Football & Streetwear",
        description: "La référence du sport et de la mode urbaine au Sénégal.",
        siteName: "Mbor Store",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mborbusiness’Store | Le Temple du Football & Streetwear",
        description: "La référence du sport et de la mode urbaine au Sénégal.",
        creator: "@mborstore",
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    }
}

import { getStoreConfig } from "./admin/actions"
import { ThemeVariables } from "@/components/theme-variables"

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const storeConfig = await getStoreConfig()

    return (
        <html lang="fr" suppressHydrationWarning>
            <body
                className={`min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-primary selection:text-primary-foreground`}
                style={{
                    '--font-sans-base': inter.style.fontFamily,
                    '--font-heading-base': outfit.style.fontFamily
                } as React.CSSProperties}
            >
                {storeConfig && (
                    <ThemeVariables config={{
                        primaryColor: storeConfig.primaryColor,
                        secondaryColor: storeConfig.secondaryColor,
                        accentColor: storeConfig.accentColor,
                        fontFamily: storeConfig.fontFamily
                    }} />
                )}
                <Providers
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                '@context': 'https://schema.org',
                                '@type': 'Store',
                                name: 'Mborbusiness’Store',
                                description: 'La référence du sport et de la mode urbaine au Sénégal.',
                                url: 'https://mborbusiness.store',
                                telephone: '+221774272354',
                                address: {
                                    '@type': 'PostalAddress',
                                    streetAddress: 'Pikine',
                                    addressLocality: 'Dakar',
                                    addressRegion: 'DK',
                                    postalCode: '10000',
                                    addressCountry: 'SN'
                                },
                                sameAs: [
                                    'https://facebook.com/MborBusinessCenter',
                                    'https://instagram.com/MborbusinessstoreSN'
                                ]
                            })
                        }}
                    />
                    <SiteHeader />
                    <main className="flex-1 pt-[84px]">
                        {children}
                    </main>
                    <SiteFooter />
                    <MobileNavbar />
                    <Toaster position="bottom-right" richColors />
                </Providers>

            </body>
        </html>
    )
}
