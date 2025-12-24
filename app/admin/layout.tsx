import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Toaster } from "@/components/ui/sonner"
import { CommandPalette } from "@/components/admin/command-palette"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-black selection:text-[#FFD700] flex">

            {/* Sidebar */}
            <AdminSidebar />

            <div className="flex-1 flex flex-col min-h-screen relative z-10 w-0"> {/* w-0 fix for flex overflow */}
                {/* Header */}
                <AdminHeader />

                {/* Main Content Area */}
                <main className="flex-1 w-full p-8 max-w-[1600px] mx-auto">
                    {children}
                </main>
            </div>

            <Toaster />
            <CommandPalette />
        </div>
    )
}
