import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Package, ShoppingCart, Users, TrendingUp, MoreVertical, Plus, Eye, Edit, Download } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  // Real data from DB
  const [productCount, orderCount, userCount, latestOrders, recentProducts, revenueData] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.aggregate({
      where: {
        status: { in: ["PAID", "DELIVERED", "SHIPPED"] }
      },
      _sum: {
        total: true
      }
    })
  ])

  const totalRevenue = `${(revenueData._sum.total || 0).toLocaleString()} FCFA`

  const stats = [
    { label: "Revenu Total", value: totalRevenue, change: "+0%", icon: TrendingUp, color: "text-[#FFD700]" },
    { label: "Total Commandes", value: orderCount.toString(), change: "+0%", icon: ShoppingCart, color: "text-blue-500" },
    { label: "Total Produits", value: productCount.toString(), change: "+0%", icon: Package, color: "text-black" },
    { label: "Total Utilisateurs", value: userCount.toString(), change: "+0%", icon: Users, color: "text-purple-500" },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black">Tableau de Bord</h1>
          <p className="text-zinc-500 font-medium text-sm mt-1">Rapport d'État / {new Date().toLocaleDateString()}</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="h-12 px-6 bg-black text-white hover:bg-[#FFD700] hover:text-black font-black uppercase tracking-widest text-xs rounded-sm transition-all group shadow-lg">
            <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
            Ajouter Article
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 bg-white border border-zinc-200 hover:border-black/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{stat.label}</p>
                <p className="text-3xl font-black mt-2 text-black italic">{stat.value}</p>
                <p className={`text-[10px] font-bold mt-1 ${stat.color}`}>{stat.change} tendance</p>
              </div>
              <div
                className={`h-10 w-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="bg-white border border-zinc-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black uppercase italic tracking-tighter text-black">Transactions Récentes</h2>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black hover:bg-zinc-100">
                Voir Tout
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {latestOrders.length === 0 ? (
              <p className="text-center py-10 text-zinc-400 font-bold uppercase tracking-widest text-xs">Aucune commande</p>
            ) : (
              latestOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 transition-colors group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-black text-xs">{order.id.slice(0, 8)}</p>
                      <span className="text-[9px] px-2 py-0.5 rounded-sm font-black uppercase tracking-wider bg-zinc-100 text-zinc-600">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 mt-1 font-bold">{order.customerName || "Anonyme"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-black">{order.total.toString()} FCFA</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Top Products / Recent Products */}
        <Card className="bg-white border border-zinc-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black uppercase italic tracking-tighter text-black">Nouveautés Inventaire</h2>
            <Link href="/admin/products">
              <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black hover:bg-zinc-100">
                Voir Tout
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentProducts.length === 0 ? (
              <p className="text-center py-10 text-zinc-400 font-bold uppercase tracking-widest text-xs">Aucun produit</p>
            ) : (
              recentProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-md bg-[#FFD700] flex items-center justify-center text-black font-black text-xs shadow-sm capitalize">
                      {product.category.slice(0, 1)}
                    </div>
                    <div>
                      <p className="font-bold text-black text-sm">{product.name}</p>
                      <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-black">{product.price.toString()} FCFA</p>
                    <p className="text-[10px] text-zinc-400 font-medium">Stock: {product.stock}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
