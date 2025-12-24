import { prisma } from "@/lib/prisma"
import { Search, Filter, AlertCircle, TrendingDown, ArrowRight, Box, PackageOpen } from "lucide-react"
import { PageTransition } from "@/components/admin/page-transition"

export default async function AdminStockPage() {
    const products = await prisma.product.findMany({
        orderBy: { stock: 'asc' }
    })

    const lowStockCount = products.filter(p => p.stock < 5).length

    return (
        <PageTransition>
            <div className="space-y-12 pb-20">
                {/* Immersive Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-0.5 w-16 bg-black" />
                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Logistique d'Inventaire</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-zinc-900 leading-[0.8]">
                            Contrôle <br />
                            <span className="text-transparent text-stroke-black">Physique.</span>
                        </h1>
                    </div>
                    <div className="pb-2">
                        <button className="h-16 px-10 bg-black text-[#FFD700] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:scale-105 transition-all flex items-center gap-3">
                            AUDIO D'INVENTAIRE
                            <PackageOpen className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Critical Alerts Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-xl shadow-zinc-200/50 transition-all hover:scale-[1.02]">
                        <div className="flex items-center gap-8">
                            <div className="h-20 w-20 bg-rose-50 border border-rose-100 rounded-3xl flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/5 group-hover:rotate-6 transition-transform">
                                <AlertCircle className="h-10 w-10" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-2">Actifs Critiques</p>
                                <p className="text-4xl font-black text-zinc-900 italic tracking-tighter">{lowStockCount} UNITÉS SOUS LE SEUIL</p>
                            </div>
                        </div>
                        <ArrowRight className="absolute top-10 right-10 h-6 w-6 text-zinc-300 group-hover:text-black transition-colors" />
                    </div>
                    <div className="group relative bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-xl shadow-zinc-200/50 transition-all hover:scale-[1.02]">
                        <div className="flex items-center gap-8">
                            <div className="h-20 w-20 bg-amber-50 border border-amber-100 rounded-3xl flex items-center justify-center text-amber-500 shadow-xl shadow-amber-500/5 group-hover:rotate-6 transition-transform">
                                <TrendingDown className="h-10 w-10" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-2">Approvisionnement</p>
                                <p className="text-4xl font-black text-zinc-900 italic tracking-tighter">12 EXPÉDITIONS EN ATTENTE</p>
                            </div>
                        </div>
                        <ArrowRight className="absolute top-10 right-10 h-6 w-6 text-zinc-300 group-hover:text-black transition-colors" />
                    </div>
                </div>

                {/* Main Inventory Ledger */}
                <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white/60 overflow-hidden shadow-2xl shadow-zinc-200/50">
                    <div className="p-12 border-b border-zinc-100/50 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div>
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-900">Grand Livre des Stocks</h2>
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mt-2">État en temps réel de tous les actifs physiques</p>
                        </div>
                        <div className="relative w-full max-w-sm group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                placeholder="IDENTIFIER UN ACTIF..."
                                className="w-full h-14 pl-14 pr-6 bg-zinc-50/50 border border-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-900 focus:ring-4 focus:ring-black/5 focus:bg-white transition-all shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/40 border-b border-zinc-100/50 text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">
                                    <th className="px-12 py-8">Spécification de l'Actif</th>
                                    <th className="px-12 py-8">Détention Actuelle</th>
                                    <th className="px-12 py-8 text-center">Statut de Sécurité</th>
                                    <th className="px-12 py-8">Seuil de Réappro</th>
                                    <th className="px-12 py-8 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {products.map((p) => (
                                    <tr key={p.id} className="hover:bg-white/80 transition-all group">
                                        <td className="px-12 py-8">
                                            <div className="flex items-center gap-6">
                                                <div className="h-16 w-16 rounded-2xl bg-white border border-zinc-100 overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                    {p.images[0] ? (
                                                        <img src={p.images[0]} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                                                    ) : (
                                                        <Box className="h-7 w-7 text-zinc-200 m-auto" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-base font-black uppercase text-zinc-900 group-hover:text-black transition-colors italic tracking-tight">{p.name}</span>
                                                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Ref: {p.id.slice(0, 8).toUpperCase()}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-12 py-8">
                                            <span className="text-base font-black text-zinc-900 italic">{p.stock} UNITÉS</span>
                                        </td>
                                        <td className="px-12 py-8 text-center">
                                            <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${p.stock < 5 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                }`}>
                                                {p.stock < 5 ? 'RENDEMENT BAS - ALERTE' : 'OPÉRATIONNEL'}
                                            </span>
                                        </td>
                                        <td className="px-12 py-8">
                                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-lg">5 UNITÉS (FIXE)</span>
                                        </td>
                                        <td className="px-12 py-8 text-right">
                                            <button className="group h-12 px-8 bg-black text-[#FFD700] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all shadow-lg shadow-black/5 active:scale-95 flex items-center gap-3 ml-auto">
                                                ORDRE RÉAPPRO
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
