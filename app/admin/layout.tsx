"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

import { useSession, signOut } from "next-auth/react"
import { getNotifications } from "./actions"
import { toast } from "sonner"

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

function SidebarContent({ isSidebarOpen, isMobile, pathname, setIsMobileMenuOpen }: any) {
    return (
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
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => isMobile && setIsMobileMenuOpen(false)}
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
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setTheme } = useTheme()
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
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

    const router = useRouter()
    const audioRef = React.useRef<HTMLAudioElement | null>(null)

    // Initialize audio once
    React.useEffect(() => {
        audioRef.current = new Audio("https://res.cloudinary.com/dgro5x4h8/video/upload/v1769202662/mixkit-correct-answer-tone-2870_xaxd8b.wav")
        audioRef.current.crossOrigin = "anonymous"
        audioRef.current.volume = 1.0
        audioRef.current.load()
    }, [])

    // Notifications state
    const [notifications, setNotifications] = React.useState<any[]>([])
    const [lastChecked, setLastChecked] = React.useState<string>(new Date().toISOString())

    // Initial load of notifications (Server Action)
    React.useEffect(() => {
        const fetchInitialNotifications = async () => {
            try {
                const data = await getNotifications()
                if (data) {
                    setNotifications(data)
                }
                // Set the initial checkpoint to now
                setLastChecked(new Date().toISOString())
            } catch (error) {
                console.error("Failed to load initial notifications:", error)
            }
        }
        fetchInitialNotifications()
    }, [])

    // Poll for NEW notifications
    const checkForNewNotifications = React.useCallback(async () => {
        try {
            const res = await fetch(`/api/admin/notifications/check?lastChecked=${lastChecked}`)
            if (!res.ok) return

            const data = await res.json()
            const { newOrders, newUsers, timestamp } = data

            if (newOrders.length === 0 && newUsers.length === 0) {
                // Update timestamp even if empty to avoid refetching old window if this call took time
                setLastChecked(timestamp)
                return
            }

            // Play sound
            if (newOrders.length > 0 || newUsers.length > 0) {
                try {
                    if (audioRef.current) {
                        const playPromise = audioRef.current.play()
                        if (playPromise !== undefined) {
                            playPromise.catch(e => console.log("Audio waiting for interaction"))
                        }
                    }
                } catch (e) {
                    console.log("Audio error", e)
                }
            }

            const newNotificationItems: any[] = []

            // Process New Orders
            newOrders.forEach((order: any) => {
                const formattedPrice = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF" }).format(Number(order.total))

                toast(
                    <div className="flex items-center w-full gap-3 p-1">
                        <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100 shrink-0">
                            <ShoppingCart className="h-5 w-5 text-blue-600 animate-bounce" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                            <p className="font-bold text-sm text-gray-900 leading-none mb-1">Nouvelle commande !</p>
                            <p className="text-xs text-gray-500 font-medium truncate">
                                {order.customerName || 'Client'} • <span className="text-green-600 font-bold">{formattedPrice}</span>
                            </p>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => router.push(`/admin/orders/${order.id}`)}
                            className="h-7 px-3 text-xs font-bold bg-gray-900 text-white hover:bg-black shrink-0 rounded-lg shadow-sm"
                        >
                            Voir
                        </Button>
                    </div>,
                    {
                        duration: 30000,
                        closeButton: true,
                        className: "!bg-white !border !border-gray-100 !shadow-[0_8px_30px_rgb(0,0,0,0.06)] !rounded-xl !p-2 !w-full !max-w-md",
                    }
                )

                newNotificationItems.push({
                    id: `order-${order.id}`,
                    type: 'ORDER',
                    title: `Nouvelle commande #${order.id.slice(-4).toUpperCase()}`,
                    description: `${order.customerName || 'Client'} • ${formattedPrice.replace('F\u202FCFA', '').trim()} FCFA`,
                    time: order.createdAt,
                    icon: 'ShoppingCart',
                    color: 'text-blue-600',
                    bg: 'bg-blue-50'
                })
            })

            // Process New Users
            newUsers.forEach((user: any) => {
                toast(
                    <div className="flex items-center w-full gap-3 p-1">
                        <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shrink-0">
                            <Users className="h-5 w-5 text-green-600 animate-bounce" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                            <p className="font-bold text-sm text-gray-900 leading-none mb-1">Nouvel utilisateur !</p>
                            <p className="text-xs text-gray-500 font-medium truncate">
                                {user.name || 'Nouveau membre'} a rejoint.
                            </p>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => router.push(`/admin/customers`)}
                            className="h-7 px-3 text-xs font-bold bg-gray-900 text-white hover:bg-black shrink-0 rounded-lg shadow-sm"
                        >
                            Profil
                        </Button>
                    </div>,
                    {
                        duration: 30000,
                        closeButton: true,
                        className: "!bg-white !border !border-gray-100 !shadow-[0_8px_30px_rgb(0,0,0,0.06)] !rounded-xl !p-2 !w-full !max-w-md",
                    }
                )

                newNotificationItems.push({
                    id: `user-${user.id}`,
                    type: 'USER',
                    title: 'Nouveau client inscrit',
                    description: `${user.name || (user.email ? user.email.split('@')[0] : 'Inconnu')}`,
                    time: user.createdAt,
                    icon: 'Users',
                    color: 'text-green-600',
                    bg: 'bg-green-50'
                })
            })

            // Update state: existing + new items at the top
            if (newNotificationItems.length > 0) {
                setNotifications(prev => [...newNotificationItems, ...prev])
            }

            // Update checkpoint
            setLastChecked(timestamp)

        } catch (error) {
            console.error("Polling error:", error)
        }
    }, [lastChecked])

    // Set up polling interval
    React.useEffect(() => {
        const interval = setInterval(checkForNewNotifications, 30000) // Poll every 30s
        return () => clearInterval(interval)
    }, [checkForNewNotifications])

    return (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <div className="fixed inset-0 flex bg-[#F9FAFB] overflow-hidden font-sans selection:bg-gray-900 selection:text-white z-[50]">
                {/* Desktop Sidebar */}
                <aside
                    className={cn(
                        "hidden lg:flex transition-all duration-300 flex-col z-50 relative",
                        isSidebarOpen ? "w-60" : "w-16"
                    )}
                >
                    <SidebarContent
                        isSidebarOpen={isSidebarOpen}
                        isMobile={false}
                        pathname={pathname}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />

                    {/* Toggle Button for Desktop Sidebar */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="absolute -right-3 top-10 h-6 w-6 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm z-[60] hover:scale-110 transition-all"
                    >
                        <ChevronRight className={cn("h-3.5 w-3.5 transition-transform duration-300", isSidebarOpen && "rotate-180")} />
                    </button>
                </aside>

                {/* Mobile Sidebar (SheetContent) */}
                <SheetContent side="left" className="p-0 w-64">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Navigation Admin</SheetTitle>
                    </SheetHeader>
                    <SidebarContent
                        isSidebarOpen={true}
                        isMobile={true}
                        pathname={pathname}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                </SheetContent>

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
                                    <DropdownMenuLabel className="flex items-center justify-between">
                                        <span>Notifications</span>
                                        {notifications.length > 0 && (
                                            <Badge variant="outline" className="text-[10px] font-black bg-indigo-50 text-indigo-600 border-none">
                                                {notifications.length} Live
                                            </Badge>
                                        )}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="flex flex-col gap-1 p-1 max-h-[400px] overflow-y-auto custom-scrollbar">
                                        {notifications.length === 0 ? (
                                            <div className="py-10 text-center opacity-30 italic text-xs font-medium">
                                                Aucun signal détecté.
                                            </div>
                                        ) : (
                                            notifications.map((n) => (
                                                <div key={n.id} className="px-3 py-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors group">
                                                    <div className="flex items-start gap-3">
                                                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-inner", n.bg, n.color)}>
                                                            {n.icon === 'ShoppingCart' ? <ShoppingCart className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5" />}
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <p className="text-[12px] font-bold leading-tight group-hover:text-indigo-600 transition-colors">{n.title}</p>
                                                            <p className="text-[11px] text-gray-400 font-medium line-clamp-1">{n.description}</p>
                                                            <p className="text-[9px] text-gray-300 font-black uppercase tracking-widest pt-1">
                                                                {new Date(n.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <DropdownMenuSeparator />
                                    <Link href="/admin/orders">
                                        <DropdownMenuItem className="w-full text-center justify-center cursor-pointer text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 py-3">
                                            Audit Complet Flux
                                        </DropdownMenuItem>
                                    </Link>
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
            </div>
        </Sheet>
    )
}
