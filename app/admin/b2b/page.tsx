import { AppWindow, Lock, ShieldCheck, Globe, ArrowRight } from "lucide-react"
import { PageTransition } from "@/components/admin/page-transition"

export default function AdminB2BPage() {
    return (
        <PageTransition>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-900">eCommerce B2B</h1>
                        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400 mt-1">Gérez vos relations avec les grossistes.</p>
                    </div>
                    <button className="h-12 px-8 bg-black text-[#FFD700] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-900 shadow-lg shadow-black/20 hover:shadow-black/40 hover:scale-105 transition-all flex items-center gap-3">
                        CONFIGURER PORTAL GROSSISTE
                    </button>
                </div>

                {/* Hero Feature Card */}
                <div className="bg-white/60 backdrop-blur-xl p-12 lg:p-20 rounded-[3rem] border border-white/60 shadow-xl shadow-zinc-200/50 flex flex-col items-center justify-center text-center space-y-12 min-h-[500px] relative overflow-hidden group">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#FFD700]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="h-28 w-28 bg-black rounded-[2.5rem] rotate-6 flex items-center justify-center text-[#FFD700] shadow-2xl shadow-black/20 group-hover:rotate-0 transition-transform duration-500 relative z-10">
                        <AppWindow className="h-14 w-14" />
                    </div>

                    <div className="max-w-2xl space-y-6 relative z-10">
                        <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 italic tracking-tighter uppercase leading-[0.9]">Gestion des Canaux de <span className="text-stroke-black text-transparent">Vente en Gros.</span></h2>
                        <p className="text-base text-zinc-500 leading-relaxed font-bold max-w-lg mx-auto">
                            Créez des vitrines privées pour vos clients à fort volume. Activez les prix de gros, les remises sur quantité et des règles d'expédition spécialisées pour vos partenaires.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl relative z-10">
                        <div className="p-8 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all">
                            <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center text-[#FFD700] mx-auto">
                                <Lock className="h-5 w-5" />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900">Accès Sécurisé</h4>
                        </div>
                        <div className="p-8 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all">
                            <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center text-[#FFD700] mx-auto">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900">Comptes Vérifiés</h4>
                        </div>
                        <div className="p-8 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all">
                            <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center text-[#FFD700] mx-auto">
                                <Globe className="h-5 w-5" />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900">Multi-Région</h4>
                        </div>
                    </div>

                    <button className="group h-14 px-12 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-4 relative z-10 shadow-xl shadow-black/10">
                        OPTIMISATION B2B
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </PageTransition>
    )
}
