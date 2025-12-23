import { Card } from "@/components/ui/card"
import { Settings as SettingsIcon, User, Shield, Bell, Database } from "lucide-react"

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black">Paramètres</h1>
                <p className="text-zinc-500 font-medium text-sm mt-1">Configuration du Système MBOR</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-8 bg-white border border-zinc-200 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-black text-[#FFD700] flex items-center justify-center">
                            <Shield className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-black uppercase italic tracking-tighter">Sécurité & Accès</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Rôle Actuel</p>
                            <p className="font-bold text-black mt-1">SUPER_ADMIN</p>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium italic">
                            Les permissions sont gérées via les rôles de la base de données Prisma.
                        </p>
                    </div>
                </Card>

                <Card className="p-8 bg-white border border-zinc-200 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-black text-[#FFD700] flex items-center justify-center">
                            <Database className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-black uppercase italic tracking-tighter">Système & DB</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Statut Connexion</p>
                            <p className="font-bold text-green-500 mt-1 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                Connecté (Neon PostgreSQL)
                            </p>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium italic">
                            Moteur: Prisma ORM v7.2.0 (Driver Adapter)
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
