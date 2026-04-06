import { products } from "@/lib/products";
import ContentHub from "./ContentHub";
import Link from "next/link";

type DashboardStats = {
  totalRevenue: number;
  monthRevenue: number;
  todayRevenue: number;
  totalOrders: number;
  monthOrders: number;
  todayOrders: number;
  productCounts: Record<string, number>;
  productRevenue: Record<string, number>;
  recent: { id: string; slug: string; amount: number; email: string; date: string }[];
};

async function getStats(): Promise<DashboardStats | null> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/dashboard`, { cache: "no-store" });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

function StatCard({ label, value, sub, icon, color = "#22c55e" }: { label: string; value: string; sub?: string; icon: string; color?: string }) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: "#111", border: "1px solid #1d1d1f" }}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#636366" }}>{label}</span>
      </div>
      <div>
        <p className="text-3xl font-black tracking-tight" style={{ color }}>{value}</p>
        {sub && <p className="text-xs mt-1" style={{ color: "#48484a" }}>{sub}</p>}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const stats = await getStats();

  const topProducts = products
    .map((p) => ({
      ...p,
      orders: stats?.productCounts[p.slug] ?? 0,
      revenue: stats?.productRevenue[p.slug] ?? 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const bestSeller = topProducts[0];

  return (
    <div className="min-h-screen" style={{ background: "#000", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>

      {/* Top nav bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #1d1d1f" }}>
        <div className="flex items-center gap-3">
          <Link href="/" className="font-black text-lg tracking-tight" style={{ color: "#22c55e" }}>GRADEUP</Link>
          <span style={{ color: "#2c2c2e" }}>|</span>
          <span className="font-semibold text-sm" style={{ color: "#aeaeb2" }}>Command Center</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#30d158" }}>
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: "#30d158" }} />
            LIVE
          </span>
          <span className="text-xs" style={{ color: "#48484a" }}>
            {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-white mb-1">Your Empire. 📊</h1>
          <p className="text-sm" style={{ color: "#636366" }}>Real-time revenue, orders, and AI-powered marketing tools.</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon="💰" label="Total Revenue" value={`$${stats?.totalRevenue.toFixed(2) ?? "0.00"}`} sub="All time" />
          <StatCard icon="📅" label="This Month" value={`$${stats?.monthRevenue.toFixed(2) ?? "0.00"}`} sub={`${stats?.monthOrders ?? 0} orders`} />
          <StatCard icon="⚡" label="Today" value={`$${stats?.todayRevenue.toFixed(2) ?? "0.00"}`} sub={`${stats?.todayOrders ?? 0} orders today`} color="#ffd60a" />
          <StatCard icon="🏆" label="Best Seller" value={bestSeller?.emoji ?? "—"} sub={bestSeller ? `${bestSeller.orders} sold · $${bestSeller.revenue.toFixed(0)}` : "No data yet"} color="#ffd60a" />
        </div>

        {/* Main 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

          {/* Recent Orders */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden" style={{ background: "#111", border: "1px solid #1d1d1f" }}>
            <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "1px solid #1d1d1f" }}>
              <h2 className="text-white font-bold text-base">Recent Orders</h2>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "#1c1c1e", color: "#636366" }}>{stats?.totalOrders ?? 0} total</span>
            </div>
            {stats?.recent && stats.recent.length > 0 ? (
              <div>
                {stats.recent.map((order, i) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-4" style={{ borderBottom: i < stats.recent.length - 1 ? "1px solid #1d1d1f" : "none" }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{products.find(p => p.slug === order.slug)?.emoji ?? "📦"}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{products.find(p => p.slug === order.slug)?.title.split("—")[0].trim() ?? order.slug}</p>
                        <p className="text-xs" style={{ color: "#48484a" }}>{order.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: "#22c55e" }}>${order.amount.toFixed(2)}</p>
                      <p className="text-xs" style={{ color: "#48484a" }}>{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-4xl mb-3">🚀</p>
                <p className="text-sm font-medium text-white mb-1">No orders yet</p>
                <p className="text-xs" style={{ color: "#48484a" }}>Your first sale will appear here. Go market it!</p>
              </div>
            )}
          </div>

          {/* Product Leaderboard */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={{ background: "#111", border: "1px solid #1d1d1f" }}>
            <div className="px-6 py-5" style={{ borderBottom: "1px solid #1d1d1f" }}>
              <h2 className="text-white font-bold text-base">Product Leaderboard</h2>
            </div>
            <div>
              {topProducts.slice(0, 8).map((p, i) => (
                <div key={p.slug} className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: i < 7 ? "1px solid #1d1d1f" : "none" }}>
                  <span className="text-xs font-black w-4" style={{ color: i < 3 ? "#ffd60a" : "#3a3a3c" }}>#{i + 1}</span>
                  <span className="text-lg">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{p.title.split("—")[0].trim()}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="h-1 rounded-full flex-1" style={{ background: "#1c1c1e" }}>
                        <div className="h-1 rounded-full transition-all" style={{ background: "#22c55e", width: `${topProducts[0].orders > 0 ? (p.orders / topProducts[0].orders) * 100 : 0}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: "#22c55e" }}>${p.revenue.toFixed(0)}</p>
                    <p className="text-xs" style={{ color: "#48484a" }}>{p.orders} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Content Generator */}
        <div className="mb-8">
          <ContentHub />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-lg mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🛍️", label: "View Store", sub: "Open your live site", href: "/", external: false },
              { icon: "📦", label: "All Products", sub: "Browse product pages", href: "/products", external: false },
              { icon: "💳", label: "Stripe Dashboard", sub: "Payments & payouts", href: "https://dashboard.stripe.com", external: true },
              { icon: "📬", label: "Resend", sub: "Email delivery logs", href: "https://resend.com", external: true },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="rounded-2xl p-5 flex flex-col gap-3 transition-all hover:scale-105 cursor-pointer"
                style={{ background: "#111", border: "1px solid #1d1d1f", textDecoration: "none" }}
              >
                <span className="text-3xl">{action.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{action.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#636366" }}>{action.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-lg mb-4">Your Products ({products.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="rounded-2xl p-5 transition-all hover:scale-105"
                style={{ background: "#111", border: "1px solid #1d1d1f", textDecoration: "none" }}
              >
                <div className="text-3xl mb-3">{p.emoji}</div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#22c55e" }}>{p.category}</p>
                <p className="text-sm font-bold text-white leading-tight mb-2">{p.title.split("—")[0].trim()}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black" style={{ color: "#22c55e" }}>${p.price}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#1c1c1e", color: "#636366" }}>{p.orders} sold</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="rounded-2xl p-5 text-center" style={{ background: "#0a0a0a", border: "1px solid #1d1d1f" }}>
          <p className="text-xs" style={{ color: "#3a3a3c" }}>
            GradeUp Command Center · Data refreshes on every page load · Run Python agents in terminal for full automation
          </p>
        </div>

      </div>
    </div>
  );
}
