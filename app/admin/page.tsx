import { prisma } from "@/lib/prisma"
import { Users2, ShoppingCart, TrendingUp, CreditCard, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react"
import { DashboardCharts } from "@/components/admin/dashboard-charts"
import Link from "next/link"
import { PageTransition } from "@/components/admin/page-transition"

export default async function AdminDashboard() {
  // Fetch real data stats
  const [ordersCount, productsCount, usersCount, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    })
  ])

  // Mock revenue for simplified demo
  const totalRevenue = 15400000

  const stats = [
    {
      title: "Revenu Total",
      value: `${(totalRevenue).toLocaleString()} F`,
      trend: "+12.5%",
      trendUp: true,
      icon: CreditCard,
    },
    {
      title: "Commandes",
      value: ordersCount.toString(),
      trend: "+8.2%",
      trendUp: true,
      icon: ShoppingCart,
    },
    {
      title: "Clients",
      value: usersCount.toString(),
      trend: "+2.4%",
      trendUp: true,
      icon: Users2,
    },
    {
      title: "Produits Actifs",
      value: productsCount.toString(),
      trend: "-1.1%",
      trendUp: false,
      icon: TrendingUp,
    }
  ]

  return (
    <PageTransition>
      <div className="space-y-8 pb-20">
        {/* Header with Date Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-900">Tableau de Bord</h1>
            <p className="text-sm font-medium text-zinc-500 mt-1">Aperçu de vos performances aujourd'hui.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-900 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm group">
            <Calendar className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
            <span>Cette Semaine</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-8 border border-white/60 shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 rounded-[2rem] bg-white/50 backdrop-blur-xl group cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
                <stat.icon className="h-32 w-32" />
              </div>

              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-black text-[#FFD700] shadow-lg shadow-black/10 group-hover:rotate-12 transition-transform duration-500">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${stat.trendUp ? "text-emerald-700 bg-emerald-50 border-emerald-100" : "text-rose-700 bg-rose-50 border-rose-100"}`}>
                  {stat.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{stat.title}</p>
                <h3 className="text-3xl font-black italic tracking-tighter text-zinc-900">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="rounded-[2.5rem] overflow-hidden border border-white/60 shadow-xl shadow-zinc-200/50 bg-white/40 backdrop-blur-sm p-2">
          <DashboardCharts />
        </div>

        {/* Recent Orders */}
        <div className="border border-white/60 shadow-xl shadow-zinc-200/50 rounded-[2rem] overflow-hidden bg-white/60 backdrop-blur-xl">
          <div className="p-8 border-b border-zinc-50 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black italic tracking-tighter text-zinc-900">Commandes Récentes</h3>
              <p className="text-sm font-medium text-zinc-500 mt-1">Les 5 dernières transactions.</p>
            </div>
            <Link href="/admin/orders" className="text-[10px] font-black uppercase tracking-widest text-zinc-900 hover:text-[#FFD700] bg-zinc-100 hover:bg-black px-4 py-2 rounded-xl transition-all duration-300">
              Tout voir &rarr;
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-50/50">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Commande</th>
                  <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Client</th>
                  <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total</th>
                  <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Statut</th>
                  <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/80 transition-colors group">
                    <td className="px-8 py-5 text-sm font-bold text-zinc-900 group-hover:text-black transition-colors">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-8 py-5 text-sm text-zinc-600 font-medium">
                      {order.customerEmail ? (
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-black text-zinc-400 group-hover:bg-black group-hover:text-[#FFD700] transition-colors">
                            {order.customerEmail.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-bold">{order.customerEmail}</span>
                        </div>
                      ) : "Client Invité"}
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-zinc-900 italic tracking-tight">{Number(order.total).toLocaleString()} F</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'PAID' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
                        {order.status === 'PAID' ? "Payé" : "En attente"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right text-xs font-bold text-zinc-400">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
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
