import { TrendingUp, Zap, Sparkles, BrainCircuit, ArrowUpRight } from "lucide-react"
import { PageTransition } from "@/components/admin/page-transition"

export default function AdminIntelligencePage() {
    return (
        <PageTransition>
            <div className="space-y-8 pb-20">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-900">Intelligence Artificielle</h1>
                        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400 mt-1">Analyses prédictives et insights automatisés.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="h-12 px-6 bg-white border border-zinc-200 text-zinc-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black hover:text-[#FFD700] hover:border-black transition-all shadow-sm">
                            <Zap className="h-4 w-4" />
                            DIAGNOSTIC
                        </button>
                        <button className="h-12 px-8 bg-black text-[#FFD700] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/20 hover:shadow-black/40 hover:scale-105 transition-all">
                            GÉNÉRER PRÉDICTIONS
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Predictive Sales Analysis */}
                    <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-xl shadow-zinc-200/50 flex flex-col justify-between gap-8 group hover:scale-[1.02] transition-all duration-500">
                        <div className="space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="h-14 w-14 bg-black rounded-2xl flex items-center justify-center text-[#FFD700] shadow-lg shadow-black/10 group-hover:rotate-12 transition-transform duration-500">
                                    <BrainCircuit className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black italic tracking-tighter text-zinc-900 uppercase">Analyse de Ventes Prédictive</h3>
                                    <p className="text-[10px] text-[#FFD700] bg-black px-2 py-0.5 rounded w-fit font-black uppercase tracking-widest mt-1">Bêta Q1 2026</p>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-500 leading-relaxed font-bold">
                                Utilisez vos données historiques pour prévoir la demande future et les pics saisonniers. Optimisez votre rotation de stock grâce au machine learning.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Modèle d'entraînement</span>
                                <span className="text-xs font-black text-zinc-900 italic">45% COMPLET</span>
                            </div>
                            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                                <div className="h-full bg-black w-[45%] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
                            </div>
                        </div>
                    </div>

                    {/* Automated Insights */}
                    <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-xl shadow-zinc-200/50 flex flex-col justify-between gap-8 group hover:scale-[1.02] transition-all duration-500">
                        <div className="space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="h-14 w-14 bg-black rounded-2xl flex items-center justify-center text-[#FFD700] shadow-lg shadow-black/10 group-hover:rotate-12 transition-transform duration-500">
                                    <Sparkles className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black italic tracking-tighter text-zinc-900 uppercase">Insights Automatisés</h3>
                                    <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mt-1">Optimisation en temps réel</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between group/item hover:bg-emerald-100 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Opportunité Promo</span>
                                        <span className="text-xs font-bold text-emerald-600">Demande en hausse sur les Maillots</span>
                                    </div>
                                    <span className="text-[10px] font-black text-white bg-emerald-500 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Détecté</span>
                                </div>
                                <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between opacity-60">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Alerte Désabonnement</span>
                                        <span className="text-xs font-bold text-zinc-400">Stable - Aucun risque détecté</span>
                                    </div>
                                    <span className="text-[10px] font-black text-zinc-400 border border-zinc-200 px-3 py-1 rounded-full uppercase tracking-widest">En veille</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upsell Banner */}
                <div className="bg-zinc-950 p-12 lg:p-16 rounded-[3rem] overflow-hidden relative min-h-[400px] flex items-center shadow-2xl shadow-black/20 group">
                    {/* Background Visuals */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,#FFD700_0%,transparent_50%)]" />
                    </div>
                    <div className="absolute top-0 right-0 h-full w-full md:w-1/2 flex items-center justify-center pointer-events-none opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                        <TrendingUp className="h-[400px] w-[400px] text-[#FFD700] -rotate-12 transform group-hover:scale-110 transition-transform duration-1000" />
                    </div>

                    <div className="relative z-10 w-full md:w-3/5 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-[#FFD700]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFD700]">Édition Entreprise</span>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter italic uppercase leading-[0.9]">
                            Libérez la Puissance <br /> de <span className="text-transparent text-stroke-white">Mbor Intelligence.</span>
                        </h2>
                        <p className="text-lg text-zinc-400 leading-relaxed font-bold max-w-lg">
                            Notre moteur d'intelligence surveille en permanence votre chaîne d'approvisionnement et le comportement des clients pour fournir des recommandations exploitables.
                        </p>
                        <button className="h-16 px-12 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FFD700] transition-all shadow-xl shadow-white/5 flex items-center gap-4">
                            PASSER À L'ÉDITION ENTREPRISE
                            <ArrowUpRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
