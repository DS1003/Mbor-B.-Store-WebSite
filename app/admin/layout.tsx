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
    Command
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
import { motion, AnimatePresence } from "framer-motion"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setTheme } = useTheme()
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

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

            {/* Footer Sidebar */}
            <div className="p-4 border-t border-gray-100">
                <div className={cn("flex items-center gap-3 p-2", !isSidebarOpen && !isMobile && "justify-center")}>
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                        JS
                    </div>
                    {(isSidebarOpen || isMobile) && (
                        <div className="flex-1 overflow-hidden">
                            <p className="text-[12px] font-semibold text-gray-900 truncate tracking-tight">Jean Sarr</p>
                            <p className="text-[10px] text-gray-400 truncate tracking-tight">Administrateur</p>
                        </div>
                    )}
                    {(isSidebarOpen || isMobile) && (
                        <button className="text-gray-400 hover:text-gray-900 transition-colors">
                            <LogOut className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
            </div>
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

                        <div className="flex items-center gap-3">
                            <button className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors">
                                <Bell className="h-4 w-4" />
                                <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white" />
                            </button>

                            <div className="h-8 w-px bg-gray-100 mx-1" />

                            <Link href="/">
                                <Button variant="outline" className="h-9 px-4 rounded-lg text-[13px] font-medium border-gray-200 hover:bg-gray-50 flex items-center gap-2">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Voir le store</span>
                                </Button>
                            </Link>
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


