import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Download,
    Store
} from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-zinc-50 text-black font-sans selection:bg-[#FFD700] selection:text-black">
            {/* Background Texture placeholder - Light Mode */}
            <div className="fixed inset-0 z-0 bg-white opacity-90 pointer-events-none" />

            {/* Admin Header */}
            <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
                <div className="flex h-16 items-center gap-4 px-6">
                    <Link href="/admin" className="flex items-center gap-4">
                        <div className="flex items-center justify-center h-8 w-8 bg-[#FFD700] rounded-lg shadow-sm">
                            <span className="font-serif font-black text-lg italic text-black">M</span>
                        </div>
                        <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded-sm uppercase tracking-widest border border-black shadow-sm">Commande Admin</span>
                    </Link>
                    <div className="flex-1" />
                    <Button variant="outline" size="sm" className="hidden sm:flex border-zinc-200 bg-white text-black hover:bg-black hover:text-white hover:border-black text-xs font-bold uppercase tracking-widest shadow-sm">
                        <Download className="mr-2 h-3 w-3" />
                        Exporter Données
                    </Button>
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-black hover:bg-zinc-100 text-xs font-bold uppercase tracking-widest">
                            <Store className="mr-2 h-3 w-3" />
                            Boutique
                        </Button>
                    </Link>
                    <LogoutButton />
                </div>
            </header>

            <div className="flex relative z-10">
                {/* Sidebar */}
                <aside className="hidden md:flex w-64 flex-col border-r border-zinc-200 bg-white/50 min-h-[calc(100vh-4rem)] backdrop-blur-sm">
                    <nav className="flex flex-col gap-2 p-4">
                        <Link href="/admin">
                            <Button variant="ghost" className="w-full justify-start mt-1 font-bold text-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all">
                                <LayoutDashboard className="mr-3 h-4 w-4" />
                                Tableau de Bord
                            </Button>
                        </Link>
                        <div className="my-2 border-t border-zinc-100 mx-2" />
                        <Link href="/admin/products">
                            <Button variant="ghost" className="w-full justify-start text-zinc-500 hover:text-black hover:bg-zinc-100 uppercase tracking-widest text-xs font-bold transition-all">
                                <Package className="mr-3 h-4 w-4" />
                                Inventaire
                            </Button>
                        </Link>
                        <Link href="/admin/orders">
                            <Button variant="ghost" className="w-full justify-start text-zinc-500 hover:text-black hover:bg-zinc-100 uppercase tracking-widest text-xs font-bold transition-all">
                                <ShoppingCart className="mr-3 h-4 w-4" />
                                Commandes
                            </Button>
                        </Link>
                        <Link href="/admin/customers">
                            <Button variant="ghost" className="w-full justify-start text-zinc-500 hover:text-black hover:bg-zinc-100 uppercase tracking-widest text-xs font-bold transition-all">
                                <Users className="mr-3 h-4 w-4" />
                                Clients
                            </Button>
                        </Link>
                        <div className="my-2 border-t border-zinc-100 mx-2" />
                        <Link href="/admin/settings">
                            <Button variant="ghost" className="w-full justify-start text-zinc-500 hover:text-black hover:bg-zinc-100 uppercase tracking-widest text-xs font-bold transition-all">
                                <Settings className="mr-3 h-4 w-4" />
                                Paramètres
                            </Button>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-10 overflow-auto bg-zinc-50">
                    {children}
                </main>
            </div>
        </div>
    )
}
