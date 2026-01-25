"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
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
    const router = useRouter()
    const { setTheme, theme } = useTheme()
    const pathname = usePathname()
    const { data: session, status } = useSession()
    const { cartCount } = useCart()
    const [scrolled, setScrolled] = React.useState(false)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery("")
        }
    }

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (pathname?.startsWith("/admin")) return null

    const navLinks = [
        { href: "/shop", label: "Boutique" },
        { href: "/shop/maillot", label: "Maillot", category: "maillot" },
        { href: "/shop/sneakers", label: "Sneakers", category: "sneakers" },
        { href: "/shop/crampons", label: "Crampons", category: "crampons" },
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
                    {/* Main Header Grid - Prevent Overlap */}
                    <div className="hidden lg:flex items-center gap-8 mr-auto">
                        <Link href="/" className="flex items-center group">
                            <Image
                                src="https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271852/mbor_store/mbor-logo-new.png"
                                alt="Mbor.Store"
                                width={180}
                                height={60}
                                className="h-[60px] w-auto object-contain"
                            />
                        </Link>

                        <nav className="flex items-center space-x-6">
                            {navLinks.slice(0, 4).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-[12px] xl:text-[13px] font-semibold tracking-tight transition-all hover:text-primary whitespace-nowrap relative group py-2",
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
                    </div>

                    {/* Mobile/Tablet Fallback & Actions */}
                    <div className="lg:hidden flex items-center justify-between w-full h-full">
                        {/* Mobile Menu Icon (Left) */}
                        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10 -ml-2 rounded-xl hover:bg-muted/50">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full sm:w-[400px] p-0 border-r-0 bg-white text-black shadow-2xl z-[150] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2 duration-500">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Navigation</SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col h-full overflow-hidden relative bg-white">
                                    {/* Header Menu - Clean White */}
                                    <div className="px-8 pt-14 pb-6 flex justify-between items-end border-b border-zinc-100">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold mb-2">Menu</span>
                                            <span className="font-heading text-4xl font-black tracking-tighter text-black">
                                                Mbor<span className="text-primary">.</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Scrollable Content */}
                                    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-12 scrollbar-none">
                                        {/* Collections */}
                                        <div className="space-y-2">
                                            <nav className="flex flex-col space-y-1">
                                                {navLinks.map((link, index) => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="group flex items-baseline justify-between py-2 overflow-hidden"
                                                    >
                                                        <span className={cn(
                                                            "text-[28px] leading-tight font-bold tracking-tight transition-all duration-300",
                                                            pathname === link.href ? "text-primary translate-x-4" : "text-black group-hover:text-primary group-hover:translate-x-4"
                                                        )}>
                                                            {link.label}
                                                        </span>
                                                        <span className="text-[10px] font-mono text-zinc-300 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                                            {(index + 1).toString().padStart(2, '0')}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </nav>
                                        </div>

                                        {/* User Space - Clean & Boxed */}
                                        <div className="pt-6 border-t border-zinc-100 space-y-6">
                                            <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Espace Membre</p>

                                            {session ? (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                                            <AvatarImage src={session.user?.image || ""} />
                                                            <AvatarFallback className="bg-primary text-white font-bold">{userInitials}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-black">{session.user?.name}</span>
                                                            <span className="text-xs text-zinc-500">{session.user?.email}</span>
                                                        </div>
                                                    </div>

                                                    {/* ADMIN LINK - Explicit & Bold */}
                                                    {(session.user as any).role === "ADMIN" && (
                                                        <Link
                                                            href="/admin"
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="flex items-center justify-between p-4 rounded-2xl bg-black text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                                                        >
                                                            <span className="font-bold text-sm">Tableau de Bord Admin</span>
                                                            <Shield className="h-4 w-4 text-primary animate-pulse" />
                                                        </Link>
                                                    )}

                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Link href="/account" onClick={() => setIsMenuOpen(false)} className="h-14 flex items-center justify-center rounded-2xl bg-white border-2 border-zinc-100 font-bold text-xs text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 transition-all">
                                                            Mon Profil
                                                        </Link>
                                                        <Link href="/account/orders" onClick={() => setIsMenuOpen(false)} className="h-14 flex items-center justify-center rounded-2xl bg-white border-2 border-zinc-100 font-bold text-xs text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 transition-all">
                                                            Commandes
                                                        </Link>
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            signOut({ callbackUrl: "/" });
                                                            setIsMenuOpen(false);
                                                        }}
                                                        className="w-full py-3 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                                                    >
                                                        Déconnexion
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex w-full items-center justify-center h-14 rounded-2xl border-2 border-zinc-100 font-bold text-zinc-900 hover:bg-zinc-50 transition-all">
                                                        Se connecter
                                                    </Link>
                                                    <Link href="/register" onClick={() => setIsMenuOpen(false)} className="flex w-full items-center justify-center h-14 rounded-2xl bg-black text-white font-bold hover:bg-zinc-800 transition-all shadow-lg">
                                                        Créer un compte
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="p-8 bg-zinc-50 space-y-4">
                                        <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
                                            <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 hover:text-black transition-colors">
                                                <Heart className="h-4 w-4" /> Favoris
                                            </Link>
                                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-black transition-colors">
                                                Besoin d'aide ?
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Center Logo for Mobile */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex-shrink-0 z-20">
                            <Link href="/" className="flex items-center group">
                                <Image
                                    src="https://res.cloudinary.com/da1dmwqhb/image/upload/v1769271852/mbor_store/mbor-logo-new.png"
                                    alt="Mbor.Store"
                                    width={140}
                                    height={48}
                                    className="h-10 w-auto object-contain"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: Actions - Improved responsiveness & Elegance */}
                    <div className="flex items-center justify-end flex-1 space-x-1 sm:space-x-3">
                        {/* Search Bar - Sleeker */}
                        <form onSubmit={handleSearch} className="hidden xl:flex items-center bg-muted/30 h-10 rounded-2xl px-4 border border-transparent focus-within:border-primary/20 transition-all group">
                            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
                            <input
                                type="text"
                                placeholder="Souhaité..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 text-[12px] font-medium tracking-tight ml-3 w-28 focus:w-44 transition-all outline-none md:block"
                            />
                        </form>

                        {/* Theme Toggle - Hidden on very small mobile to save space if needed, or just smaller */}


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
                                        <DropdownMenuItem
                                            onSelect={(e) => {
                                                e.preventDefault();
                                                signOut({ callbackUrl: "/" });
                                            }}
                                            className="rounded-xl p-2.5 focus:bg-rose-50 focus:text-rose-600 text-rose-500 cursor-pointer"
                                        >
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
