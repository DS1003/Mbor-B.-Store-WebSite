"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import {
    Search,
    ShoppingCart,
    Menu,
    Sun,
    Moon,
    Heart,
    Zap,
    X,
    ChevronRight,
    User,
    LogOut,
    Package,
    Settings,
    Shield
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ShinyText } from "./interactions"
import { useCart } from "./cart-context"

export function SiteHeader() {
    const { setTheme, theme } = useTheme()
    const pathname = usePathname()
    const { data: session, status } = useSession()
    const { cartCount } = useCart()
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (pathname?.startsWith("/admin")) return null

    const navLinks = [
        { href: "/shop", label: "Boutique" },
        { href: "/shop/maillots", label: "Maillots" },
        { href: "/shop/sneakers", label: "Sneakers" },
        { href: "/shop/crampons", label: "Performance" },
        { href: "/about", label: "A Propos" },
        { href: "/contact", label: "Contact" },
    ]

    const userInitials = session?.user?.name
        ? session.user.name.split(" ").map(n => n[0]).join("").toUpperCase()
        : "U"

    return (
        <header className={cn(
            "fixed top-0 z-[100] w-full transition-all duration-500",
            scrolled ? "bg-background/80 backdrop-blur-xl border-b shadow-sm" : "bg-background"
        )}>
            {/* Announcement Bar - Softer colors */}
            <div className="w-full bg-foreground text-background h-8 flex items-center overflow-hidden border-b border-foreground/5">
                <div className="container-custom flex justify-center items-center h-full">
                    <div className="flex items-center space-x-2">
                        <Zap className="h-3 w-3 text-primary" />
                        <ShinyText
                            text="Livraison offerte dès 50 000 FCFA"
                            className="text-[10px] sm:text-[11px] font-semibold tracking-tight text-primary-foreground"
                        />
                    </div>
                </div>
            </div>

            <div className="container-custom">
                <div className={cn(
                    "flex items-center h-16 transition-all duration-500 relative",
                    scrolled && "h-14"
                )}>
                    {/* Desktop Nav - Softer weights */}
                    <nav className="hidden lg:flex items-center space-x-8 flex-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-[13px] font-semibold tracking-tight transition-all hover:text-primary whitespace-nowrap relative group py-2",
                                    pathname === link.href ? "text-primary" : "text-foreground/70"
                                )}
                            >
                                {link.label}
                                <span className={cn(
                                    "absolute bottom-0 left-0 h-[1.5px] bg-primary transition-all duration-300",
                                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                                )} />
                            </Link>
                        ))}
                    </nav>

                    {/* Logo - Elegant & Minimal */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex-shrink-0 z-20">
                        <Link href="/" className="flex items-center group">
                            <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight">
                                Mbor<span className="text-primary font-medium">.Store</span>
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Icon (Left) */}
                    <div className="flex lg:hidden flex-1">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10 -ml-2 rounded-xl hover:bg-muted/50">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full sm:w-[400px] p-0 bg-background/98 backdrop-blur-3xl border-r-0">
                                <div className="flex flex-col h-full bg-background overflow-hidden">
                                    <div className="p-8 border-b flex justify-between items-center">
                                        <span className="font-heading text-2xl font-bold tracking-tight">
                                            Mbor<span className="text-primary font-medium">.Store</span>
                                        </span>
                                    </div>
                                    <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12">
                                        <div className="space-y-6">
                                            <p className="text-[10px] font-bold tracking-widest text-muted-foreground/40 uppercase">Collections</p>
                                            <nav className="flex flex-col space-y-4">
                                                {navLinks.map((link) => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        className={cn(
                                                            "text-3xl sm:text-4xl font-bold tracking-tight transition-colors flex items-center group",
                                                            pathname === link.href ? "text-primary" : "text-foreground/60 hover:text-foreground"
                                                        )}
                                                    >
                                                        {link.label}
                                                        <ChevronRight className="ml-4 h-6 w-6 opacity-0 group-hover:opacity-100 transition-all text-primary" />
                                                    </Link>
                                                ))}
                                            </nav>
                                        </div>

                                        <Separator className="opacity-10" />

                                        <div className="space-y-6">
                                            <p className="text-[10px] font-bold tracking-widest text-muted-foreground/40 uppercase">Compte & Aide</p>
                                            <div className="grid grid-cols-1 gap-4 text-sm font-semibold">
                                                {session ? (
                                                    <>
                                                        <Link href="/account" className="flex items-center hover:text-primary transition-colors text-foreground/80"><User className="h-4 w-4 mr-3" /> Mon Compte</Link>
                                                        <Link href="/account/orders" className="flex items-center hover:text-primary transition-colors text-foreground/80"><Package className="h-4 w-4 mr-3" /> Mes Commandes</Link>
                                                        <button onClick={() => signOut()} className="flex items-center text-rose-500 hover:text-rose-600 transition-colors"><LogOut className="h-4 w-4 mr-3" /> Déconnexion</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link href="/login" className="flex items-center hover:text-primary transition-colors text-foreground/80"><User className="h-4 w-4 mr-3" /> Connexion</Link>
                                                        <Link href="/register" className="flex items-center hover:text-primary transition-colors text-foreground/80">Créer un compte</Link>
                                                    </>
                                                )}
                                                <Link href="/wishlist" className="flex items-center hover:text-primary transition-colors text-foreground/80"><Heart className="h-4 w-4 mr-3" /> Mes Favoris</Link>
                                                <Link href="/faq" className="hover:text-primary transition-colors text-foreground/80">Questions fréquentes</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 border-t space-y-4">
                                        <Button className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold tracking-tight text-sm shadow-lg shadow-primary/20">
                                            Besoin d'aide ? WhatsApp
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Right Side: Actions - Improved responsiveness & Elegance */}
                    <div className="flex items-center justify-end flex-1 space-x-1 sm:space-x-3">
                        {/* Search Bar - Sleeker */}
                        <div className="hidden xl:flex items-center bg-muted/30 h-10 rounded-2xl px-4 border border-transparent focus-within:border-primary/20 transition-all group">
                            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
                            <input
                                type="text"
                                placeholder="Souhaité..."
                                className="bg-transparent border-none focus:ring-0 text-[12px] font-medium tracking-tight ml-3 w-28 focus:w-44 transition-all outline-none md:block"
                            />
                        </div>

                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="h-10 w-10 rounded-2xl hover:bg-muted/50 transition-transform active:scale-90"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>

                        <Link href="/wishlist" className="hidden sm:flex">
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-muted/50">
                                <Heart className="h-4 w-4" />
                            </Button>
                        </Link>

                        {/* Auth UI */}
                        <div className="hidden md:flex items-center space-x-2">
                            {status === "loading" ? (
                                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                            ) : session ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border border-muted hover:border-primary/30 transition-all">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                                                <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">{userInitials}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2 shadow-2xl border-muted/60" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal p-3">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-bold leading-none tracking-tight">{session.user?.name}</p>
                                                <p className="text-[11px] leading-none text-muted-foreground">{session.user?.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="opacity-50" />
                                        <DropdownMenuItem asChild className="rounded-xl p-2.5 focus:bg-primary/5 focus:text-primary cursor-pointer">
                                            <Link href="/account" className="flex items-center w-full"><User className="mr-2 h-4 w-4" /> <span>Mon profil</span></Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="rounded-xl p-2.5 focus:bg-primary/5 focus:text-primary cursor-pointer">
                                            <Link href="/account/orders" className="flex items-center w-full"><Package className="mr-2 h-4 w-4" /> <span>Mes commandes</span></Link>
                                        </DropdownMenuItem>
                                        {(session.user as any).role === "ADMIN" && (
                                            <DropdownMenuItem asChild className="rounded-xl p-2.5 focus:bg-primary/5 focus:text-primary cursor-pointer">
                                                <Link href="/admin" className="flex items-center w-full text-primary font-semibold"><Shield className="mr-2 h-4 w-4" /> <span>Admin Panel</span></Link>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator className="opacity-50" />
                                        <DropdownMenuItem onClick={() => signOut()} className="rounded-xl p-2.5 focus:bg-rose-50 focus:text-rose-600 text-rose-500 cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" /> <span>Déconnexion</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" asChild className="text-[12px] font-bold tracking-tight h-10 px-4 rounded-xl hover:bg-muted/50">
                                        <Link href="/login">Connexion</Link>
                                    </Button>
                                    <Button asChild className="text-[12px] font-bold tracking-tight h-10 px-5 rounded-xl bg-black text-white hover:bg-primary transition-all shadow-md">
                                        <Link href="/register">S'inscrire</Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Cart Button */}
                        <Link href="/cart" className="relative group/cart active:scale-95 transition-transform">
                            <div className="h-10 w-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-xl">
                                <ShoppingCart className="h-4 w-4 group-hover/cart:scale-110 transition-transform" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white border-2 border-background animate-in zoom-in-50 duration-300">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

