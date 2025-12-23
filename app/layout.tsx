import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers"
import "./globals.css"

const _geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "MBOR BUSINESS STORE | Vêtements de Sport et Streetwear Premium",
  description:
    "Achetez des maillots de football premium, des sneakers, des Jordans et du streetwear. Une marque aux racines africaines avec des standards internationaux.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}>
        {/* Noise Overlay Global */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-noise" />
        <ThemeProvider defaultTheme="dark" enableSystem>
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
