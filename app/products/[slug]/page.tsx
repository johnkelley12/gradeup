import Link from "next/link";
import { products, getProduct } from "@/lib/products";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);

  if (!product) notFound();

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/products" className="text-sm text-gray-500 hover:text-white transition-colors mb-8 inline-block">
        ← Back to all products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-4">
        {/* Left — product info */}
        <div>
          <div className="text-7xl mb-6">{product.emoji}</div>
          <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#22c55e" }}>{product.category}</p>
          <h1 className="text-3xl font-black leading-tight mb-6">{product.title}</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl font-black">${product.price}</span>
            <span className="text-xl text-gray-500 line-through">${product.compareAt}</span>
            <span className="px-3 py-1 rounded-lg text-xs font-black text-black" style={{ background: "#22c55e" }}>
              {Math.round((1 - product.price / product.compareAt) * 100)}% OFF
            </span>
          </div>

          <button className="w-full py-4 rounded-xl text-lg font-black text-black transition-all hover:opacity-90 hover:scale-105 mb-4" style={{ background: "#22c55e" }}>
            Buy Now — ${product.price}
          </button>
          <p className="text-center text-gray-500 text-sm">⚡ Instant digital delivery · 30-day money back guarantee</p>
        </div>

        {/* Right — features */}
        <div>
          <div className="rounded-2xl p-8" style={{ background: "#111", border: "1px solid #222" }}>
            <h2 className="text-xl font-black mb-6">What&apos;s included</h2>
            <ul className="space-y-4">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span style={{ color: "#22c55e" }} className="text-lg mt-0.5">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8" style={{ borderTop: "1px solid #222" }}>
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs text-gray-400" style={{ background: "#1a1a1a", border: "1px solid #333" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-6 rounded-2xl" style={{ background: "#22c55e11", border: "1px solid #22c55e33" }}>
            <p className="font-bold mb-1" style={{ color: "#22c55e" }}>30-Day Money Back Guarantee</p>
            <p className="text-gray-400 text-sm">If this doesn&apos;t help you, email us and we&apos;ll refund you instantly. No questions asked.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
