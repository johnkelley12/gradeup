import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  const now = Math.floor(Date.now() / 1000);
  const monthStart = Math.floor(new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime() / 1000);
  const todayStart = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);

  const [allSessions, recentSessions] = await Promise.all([
    stripe.checkout.sessions.list({ limit: 100, status: "complete" }),
    stripe.checkout.sessions.list({ limit: 10, status: "complete" }),
  ]);

  const totalRevenue = allSessions.data.reduce((sum, s) => sum + (s.amount_total ?? 0), 0) / 100;
  const monthRevenue = allSessions.data
    .filter((s) => (s.created ?? 0) >= monthStart)
    .reduce((sum, s) => sum + (s.amount_total ?? 0), 0) / 100;
  const todayRevenue = allSessions.data
    .filter((s) => (s.created ?? 0) >= todayStart)
    .reduce((sum, s) => sum + (s.amount_total ?? 0), 0) / 100;

  const totalOrders = allSessions.data.length;
  const monthOrders = allSessions.data.filter((s) => (s.created ?? 0) >= monthStart).length;
  const todayOrders = allSessions.data.filter((s) => (s.created ?? 0) >= todayStart).length;

  // Count orders per product
  const productCounts: Record<string, number> = {};
  const productRevenue: Record<string, number> = {};
  for (const s of allSessions.data) {
    const slug = s.metadata?.slug;
    if (slug) {
      productCounts[slug] = (productCounts[slug] || 0) + 1;
      productRevenue[slug] = (productRevenue[slug] || 0) + (s.amount_total ?? 0) / 100;
    }
  }

  const recent = recentSessions.data.map((s) => ({
    id: s.id.slice(-8).toUpperCase(),
    slug: s.metadata?.slug ?? "unknown",
    amount: (s.amount_total ?? 0) / 100,
    email: s.customer_details?.email ?? "—",
    date: new Date((s.created ?? 0) * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
  }));

  return NextResponse.json({
    totalRevenue,
    monthRevenue,
    todayRevenue,
    totalOrders,
    monthOrders,
    todayOrders,
    productCounts,
    productRevenue,
    recent,
    lastUpdated: new Date().toISOString(),
  });
}
