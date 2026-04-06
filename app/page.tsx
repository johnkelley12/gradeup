import Link from "next/link";
import { products } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-block px-4 py-1 rounded-full text-xs font-bold mb-6 tracking-widest uppercase" style={{ background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e44" }}>
          For college-bound students
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
          The cheat codes for<br />
          <span style={{ color: "#22c55e" }}>college success.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Digital tools, templates, and guides built for 18-year-olds who want to get ahead fast — without burning out.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products" className="px-8 py-4 rounded-xl text-lg font-black text-black transition-all hover:opacity-90 hover:scale-105" style={{ background: "#22c55e" }}>
            Shop All Products →
          </Link>
          <Link href="/products" className="px-8 py-4 rounded-xl text-lg font-medium text-gray-300 hover:text-white transition-colors" style={{ border: "1px solid #333" }}>
            See what&apos;s inside
          </Link>
        </div>
        <p className="text-gray-600 text-sm mt-6">30-day money back guarantee · Instant digital delivery</p>
      </section>

      {/* Stats */}
      <section style={{ borderTop: "1px solid #222", borderBottom: "1px solid #222" }} className="py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { number: "8+", label: "Digital Products" },
            { number: "$8", label: "Starting Price" },
            { number: "30-day", label: "Money Back Guarantee" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-black" style={{ color: "#22c55e" }}>{stat.number}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#22c55e" }}>Most Popular</p>
            <h2 className="text-4xl font-black">Top picks for freshmen</h2>
          </div>
          <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm font-medium hidden md:block">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="group rounded-2xl p-6 transition-all hover:scale-105 hover:border-green-500/50" style={{ background: "#111", border: "1px solid #222" }}>
              <div className="text-4xl mb-4">{product.emoji}</div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#22c55e" }}>{product.category}</p>
              <h3 className="font-bold text-base leading-snug mb-3 text-white group-hover:text-green-400 transition-colors">{product.title}</h3>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-xl font-black text-white">${product.price}</span>
                <span className="text-sm text-gray-500 line-through">${product.compareAt}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/products" className="inline-block px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90" style={{ background: "#22c55e", color: "#000" }}>
            See All 8 Products →
          </Link>
        </div>
      </section>

      {/* Why GradeUp */}
      <section style={{ borderTop: "1px solid #222" }} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#22c55e" }}>Why GradeUp</p>
            <h2 className="text-4xl font-black">Stop figuring it out the hard way</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: "⚡", title: "Instant Access", desc: "All products are digital downloads. Buy and start using in under 60 seconds." },
              { emoji: "🎯", title: "Built for College", desc: "Not generic productivity tools. Everything is designed specifically for 18-year-old college students." },
              { emoji: "💯", title: "Risk Free", desc: "30-day money back guarantee on everything. If it doesn't help, you get a full refund." },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-2xl text-center" style={{ background: "#111", border: "1px solid #222" }}>
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ borderTop: "1px solid #222" }} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#22c55e" }}>Student Reviews</p>
            <h2 className="text-4xl font-black">Real students. Real results.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Maya R.", school: "UNC Chapel Hill", emoji: "🧠", product: "Notion Dashboard", quote: "I went from missing 3 assignments a week to literally zero. This dashboard is the only reason I survived my first semester." },
              { name: "Jake T.", school: "Michigan State", emoji: "🤖", product: "AI Prompt Pack", quote: "My essays went from Cs to As. The writing prompts alone are worth 10x the price. Wish I had this freshman year." },
              { name: "Priya S.", school: "UT Austin", emoji: "💼", product: "Resume & LinkedIn Kit", quote: "Got 3 internship interviews within 2 weeks of using these templates. The LinkedIn checklist alone got me 4 recruiter messages." },
              { name: "Chris M.", school: "Ohio State", emoji: "💰", product: "Budget Tracker", quote: "I saved $200 in the first month just by knowing where my money was going. This spreadsheet is stupid simple and it works." },
              { name: "Alyssa K.", school: "Florida State", emoji: "🎓", product: "Freshman Bundle", quote: "The Calc I formula sheet saved me on my midterm. I printed it out and studied it for 2 days. Absolute lifesaver." },
              { name: "Devon L.", school: "Arizona State", emoji: "🚀", product: "Internship Tracker", quote: "Applied to 40 companies in 2 weeks using this system. Tracked every follow-up and landed 2 interviews. The email templates are gold." },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl p-6" style={{ background: "#111", border: "1px solid #222" }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#22c55e" }}>★</span>)}
                </div>
                <p className="text-gray-300 leading-relaxed mb-5 text-sm">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black" style={{ background: "#22c55e22", color: "#22c55e" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs" style={{ color: "#636366" }}>{t.school} · {t.emoji} {t.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-3xl p-12 text-center" style={{ background: "linear-gradient(135deg, #22c55e22, #16a34a11)", border: "1px solid #22c55e33" }}>
          <h2 className="text-4xl font-black mb-4">Ready to get ahead?</h2>
          <p className="text-gray-400 text-lg mb-8">Join students who are using GradeUp to crush their first year.</p>
          <Link href="/products" className="inline-block px-10 py-4 rounded-xl text-lg font-black text-black transition-all hover:opacity-90 hover:scale-105" style={{ background: "#22c55e" }}>
            Browse Products →
          </Link>
        </div>
      </section>
    </main>
  );
}
