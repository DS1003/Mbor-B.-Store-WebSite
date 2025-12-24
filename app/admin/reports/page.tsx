import { prisma } from "@/lib/prisma"
import { BarChart3, PieChart, TrendingUp, Download, Calendar, Mail } from "lucide-react"
import { PageTransition } from "@/components/admin/page-transition"

export default async function AdminReportsPage() {
    return (
        <PageTransition>
            <div className="space-y-8 pb-20">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-900">Reporting & Analytics</h1>
                        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400 mt-1">Générez des rapports détaillés sur vos performances.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="h-12 px-6 bg-white border border-zinc-200 text-zinc-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black hover:text-[#FFD700] hover:border-black transition-all shadow-sm">
                            <Download className="h-4 w-4" />
                            EXPORTER DONNÉES
                        </button>
                        <button className="h-12 px-8 bg-black text-[#FFD700] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/20 hover:shadow-black/40 hover:scale-105 transition-all">
                            PLANIFIER RAPPORT
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Revenue Summary */}
                    <div className="group relative bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-xl shadow-zinc-200/50 space-y-8 overflow-hidden hover:scale-[1.02] transition-all duration-500">
                        <TrendingUp className="absolute -bottom-10 -right-10 h-40 w-40 text-black/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        <div className="flex items-center justify-between relative z-10">
                            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Résumé Revenus</h3>
                            <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center text-[#FFD700] shadow-lg shadow-black/10">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="space-y-2 relative z-10">
                            <p className="text-4xl font-black text-zinc-900 italic tracking-tighter">4,280,000 F</p>
                            <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                                +12.5% VS MOIS DERNIER
                            </span>
                        </div>
                        <div className="pt-6 border-t border-zinc-100/50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest relative z-10">
                            <span className="text-zinc-400">Projection Oct.</span>
                            <span className="text-zinc-900 italic">5.1M F</span>
                        </div>
                    </div>

                    {/* Order Volume */}
                    <div className="group relative bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-xl shadow-zinc-200/50 space-y-8 overflow-hidden hover:scale-[1.02] transition-all duration-500">
                        <BarChart3 className="absolute -bottom-10 -right-10 h-40 w-40 text-black/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        <div className="flex items-center justify-between relative z-10">
                            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Volume Commandes</h3>
                            <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center text-[#FFD700] shadow-lg shadow-black/10">
                                <BarChart3 className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="space-y-2 relative z-10">
                            <p className="text-4xl font-black text-zinc-900 italic tracking-tighter">1,248 CMD</p>
                            <span className="inline-flex items-center px-3 py-1 bg-zinc-100 text-zinc-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                                SUR 4 CANAUX
                            </span>
                        </div>
                        <div className="pt-6 border-t border-zinc-100/50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest relative z-10">
                            <span className="text-zinc-400">Panier Moyen</span>
                            <span className="text-zinc-900 italic">4,500 F</span>
                        </div>
                    </div>

                    {/* Audit Health */}
                    <div className="group relative bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-xl shadow-zinc-200/50 space-y-8 overflow-hidden hover:scale-[1.02] transition-all duration-500">
                        <Calendar className="absolute -bottom-10 -right-10 h-40 w-40 text-black/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        <div className="flex items-center justify-between relative z-10">
                            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Santé Audit</h3>
                            <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center text-[#FFD700] shadow-lg shadow-black/10">
                                <Calendar className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="space-y-2 relative z-10">
                            <p className="text-4xl font-black text-zinc-900 italic tracking-tighter">99.2% PRÉCISION</p>
                            <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                                PERFORMANCE OPTIMALE
                            </span>
                        </div>
                        <div className="pt-6 border-t border-zinc-100/50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest relative z-10">
                            <span className="text-zinc-400">Dernier Audit</span>
                            <span className="text-zinc-900 italic">IL Y A 3 JOURS</span>
                        </div>
                    </div>
                </div>

                {/* Empty State / Coming Soon */}
                <div className="bg-white/40 backdrop-blur-md p-16 lg:p-24 rounded-[3rem] border border-white/60 shadow-2xl shadow-zinc-200/30 flex flex-col items-center justify-center text-center space-y-8 min-h-[500px] group transition-all duration-700 hover:bg-white/60">
                    <div className="h-24 w-24 bg-zinc-100 rounded-[2rem] flex items-center justify-center text-zinc-300 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                        <PieChart className="h-12 w-12" />
                    </div>
                    <div className="max-w-lg space-y-4">
                        <h2 className="text-3xl font-black text-zinc-900 italic tracking-tighter uppercase leading-none">Analyses Avancées en Attente.</h2>
                        <p className="text-base text-zinc-500 leading-relaxed font-bold">
                            Connectez plus de canaux de vente ou traitez plus de transactions pour débloquer l'intelligence d'audience prédictive et la cartographie des tendances saisonnières.
                        </p>
                    </div>
                    <button className="h-14 px-10 bg-black text-[#FFD700] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/10 flex items-center gap-3">
                        <Mail className="h-4 w-4" />
                        DEMANDER UN RAPPORT PERSONNALISÉ
                    </button>
                </div>
            </div>
        </PageTransition>
    )
}
