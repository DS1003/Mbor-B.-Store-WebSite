"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    BarChart3,
    Bell,
    Search,
    Sun,
    Moon,
    Image as ImageIcon,
    LogOut,
    ChevronRight,
    Layers,
    Database,
    ExternalLink,
    Menu,
    Plus,
    Activity,
    Shield,
    Calendar,
    Command,
    ShoppingBag
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

import { useSession, signOut } from "next-auth/react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setTheme } = useTheme()
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
    const { data: session } = useSession()

    // Derived user data
    const user = session?.user
    const userInitials = user?.name
        ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
        : "AD" // AD for Admin

    // Force light theme for admin
    React.useEffect(() => {
        setTheme("light")
    }, [setTheme])

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        { icon: Package, label: "Produits", href: "/admin/products" },
        { icon: Layers, label: "Catégories", href: "/admin/categories" },
        { icon: Database, label: "Stock", href: "/admin/stock" },
        { icon: ImageIcon, label: "Médiathèque", href: "/admin/media" },
        { icon: ShoppingBag, label: "Vente (POS)", href: "/admin/pos" },
        { icon: ShoppingCart, label: "Commandes", href: "/admin/orders" },
        { icon: Users, label: "Clients", href: "/admin/customers" },
        { icon: BarChart3, label: "Analytiques", href: "/admin/analytics" },
        { icon: Settings, label: "Paramètres", href: "/admin/settings" },
    ]

    const SidebarContent = ({ isMobile = false }) => (
        <div className="flex flex-col h-full bg-white border-r border-gray-100">
            {/* Branding */}
            <div className={cn("px-6 py-8 flex items-center justify-between", !isSidebarOpen && !isMobile && "px-4")}>
                <Link href="/admin" className={cn("transition-all duration-300", (isSidebarOpen || isMobile) ? "opacity-100" : "opacity-0 invisible w-0")}>
                    <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 bg-gray-900 rounded-lg flex items-center justify-center text-white shadow-sm">
                            <Command className="h-4 w-4" />
                        </div>
                        <span className="font-semibold text-sm tracking-tight text-gray-900 whitespace-nowrap">
                            Mbor <span className="text-gray-400 font-normal">Admin</span>
                        </span>
                    </div>
                </Link>
                {!isMobile && (
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <Menu className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-4 py-3 rounded-2xl transition-all group relative overflow-hidden",
                                isActive
                                    ? "bg-gray-900 text-white shadow-xl shadow-gray-200"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <div className={cn(
                                "flex items-center justify-center transition-all duration-300",
                                isActive ? "text-white scale-110" : "text-gray-400 group-hover:text-gray-900",
                                (isSidebarOpen || isMobile) ? "mr-3" : "mx-auto"
                            )}>
                                <item.icon className="h-4.5 w-4.5 stroke-[1.5px]" />
                            </div>
                            {(isSidebarOpen || isMobile) && <span className="text-[13px] font-bold tracking-tight">{item.label}</span>}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-1/2 bg-indigo-500 rounded-full"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>


        </div>
    )

    return (
        <div className="fixed inset-0 flex bg-[#F9FAFB] overflow-hidden font-sans selection:bg-gray-900 selection:text-white z-[50]">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex transition-all duration-300 flex-col z-50 relative",
                    isSidebarOpen ? "w-60" : "w-16"
                )}
            >
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar (Sheet) */}
            <Sheet>
                {/* Main Content Area */}
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                    {/* Header */}
                    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-8 shrink-0 z-40 sticky top-0">
                        <div className="flex items-center gap-4 flex-1">
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="lg:hidden h-9 w-9 text-gray-400"
                                >
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>

                            <div className="hidden md:flex items-center bg-gray-50 px-4 h-9 rounded-lg w-full max-w-sm border border-gray-100 focus-within:border-gray-200 focus-within:bg-white transition-all group">
                                <Search className="h-3.5 w-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="bg-transparent border-none focus:ring-0 text-[13px] ml-2.5 w-full outline-none text-gray-600 placeholder:text-gray-400"
                                />
                                <div className="flex items-center gap-1 opacity-20 group-focus-within:opacity-50">
                                    <kbd className="text-[10px] font-sans">⌘</kbd>
                                    <kbd className="text-[10px] font-sans">K</kbd>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 lg:gap-4">
                            <Link href="/" target="_blank">
                                <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100/50">
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="text-xs font-medium">Voir le store</span>
                                </Button>
                            </Link>

                            <div className="h-8 w-px bg-gray-100 hidden sm:block" />

                            {/* Notifications */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100/50">
                                        <Bell className="h-4.5 w-4.5" />
                                        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80">
                                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="flex flex-col gap-1 p-1">
                                        <div className="px-3 py-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                                            <div className="flex items-start gap-3">
                                                <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                                    <ShoppingCart className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium leading-none">Nouvelle commande #4291</p>
                                                    <p className="text-xs text-muted-foreground">Il y a 2 minutes • 25,000 FCFA</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-3 py-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                                            <div className="flex items-start gap-3">
                                                <div className="h-8 w-8 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                                    <Users className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium leading-none">Nouveau client inscrit</p>
                                                    <p className="text-xs text-muted-foreground">Il y a 15 minutes • Mamadou Diop</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="w-full text-center justify-center cursor-pointer text-xs text-muted-foreground">
                                        Voir toutes les notifications
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* User Profile */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-gray-100 hover:ring-gray-200 transition-all p-0 overflow-hidden">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user?.image || ""} alt={user?.name || "Admin"} />
                                            <AvatarFallback className="bg-gray-900 text-white font-bold">{userInitials}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user?.name || "Administrateur"}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user?.email || "admin@example.com"}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>Profil</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Paramètres</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => signOut()} className="text-red-600 focus:text-red-600 cursor-pointer bg-red-50/50 hover:bg-red-50 focus:bg-red-50">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Se déconnecter</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    <SheetContent side="left" className="p-0 w-64">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Navigation Admin</SheetTitle>
                        </SheetHeader>
                        <SidebarContent isMobile />
                    </SheetContent>

                    {/* Content View */}
                    <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
                        <div className="max-w-[1400px] mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={pathname}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                >
                                    {children}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </main>
            </Sheet>
        </div>
    )
}


