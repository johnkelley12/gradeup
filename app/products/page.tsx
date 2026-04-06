import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#22c55e" }}>All Products</p>
        <h1 className="text-5xl font-black mb-4">Your unfair advantage</h1>
        <p className="text-gray-400 text-xl max-w-xl mx-auto">Everything you need to crush freshman year. Digital downloads, instant delivery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group rounded-2xl p-6 flex flex-col transition-all hover:scale-105 hover:border-green-500/50"
            style={{ background: "#111", border: "1px solid #222" }}
          >
            <div className="text-5xl mb-4">{product.emoji}</div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#22c55e" }}>{product.category}</p>
            <h2 className="font-black text-lg leading-snug mb-3 group-hover:text-green-400 transition-colors">{product.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{product.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">${product.price}</span>
                <span className="text-sm text-gray-500 line-through">${product.compareAt}</span>
              </div>
              <span className="px-3 py-1 rounded-lg text-xs font-bold text-black" style={{ background: "#22c55e" }}>
                Get it →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
