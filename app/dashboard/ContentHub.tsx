"use client";

import { useState } from "react";
import { products } from "@/lib/products";

const CONTENT_TYPES = [
  { id: "tiktok", label: "TikTok Scripts", icon: "🎵" },
  { id: "instagram", label: "Instagram Posts", icon: "📸" },
  { id: "twitter", label: "Twitter/X Thread", icon: "🐦" },
  { id: "email", label: "Email Campaign", icon: "📧" },
  { id: "adcopy", label: "Ad Copy", icon: "📣" },
];

export default function ContentHub() {
  const [selectedProduct, setSelectedProduct] = useState(products[0].slug);
  const [selectedType, setSelectedType] = useState("tiktok");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  async function generate() {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: selectedProduct, type: selectedType }),
      });
      const data = await res.json();
      setOutput(data.content || "Error generating content.");
    } catch {
      setOutput("Something went wrong. Check your ANTHROPIC_API_KEY in Vercel.");
    }
    setLoading(false);
  }

  async function copyAll() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#111", border: "1px solid #1d1d1f" }}>
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "1px solid #1d1d1f" }}>
        <div>
          <h2 className="text-white font-bold text-lg">AI Content Generator</h2>
          <p className="text-xs mt-0.5" style={{ color: "#636366" }}>Powered by Claude — instant marketing copy</p>
        </div>
        <span className="text-2xl">🤖</span>
      </div>

      <div className="p-6">
        {/* Controls row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Product selector */}
          <div>
            <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#636366" }}>Product</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white outline-none cursor-pointer"
              style={{ background: "#1c1c1e", border: "1px solid #2c2c2e" }}
            >
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>{p.emoji} {p.title.slice(0, 40)}...</option>
              ))}
            </select>
          </div>

          {/* Content type */}
          <div>
            <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#636366" }}>Content Type</label>
            <div className="flex flex-wrap gap-2">
              {CONTENT_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: selectedType === t.id ? "#22c55e" : "#1c1c1e",
                    color: selectedType === t.id ? "#000" : "#aeaeb2",
                    border: `1px solid ${selectedType === t.id ? "#22c55e" : "#2c2c2e"}`,
                  }}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all hover:opacity-90 disabled:opacity-50 mb-5"
          style={{ background: "#22c55e" }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Generating with Claude...
            </span>
          ) : (
            "⚡ Generate Content"
          )}
        </button>

        {/* Output */}
        {output && (
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #2c2c2e" }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ background: "#1c1c1e", borderBottom: "1px solid #2c2c2e" }}>
              <span className="text-xs font-semibold" style={{ color: "#636366" }}>OUTPUT — {CONTENT_TYPES.find(t => t.id === selectedType)?.label}</span>
              <button
                onClick={copyAll}
                className="text-xs font-semibold px-3 py-1 rounded-md transition-all"
                style={{ background: copied ? "#22c55e" : "#2c2c2e", color: copied ? "#000" : "#aeaeb2" }}
              >
                {copied ? "✓ Copied!" : "Copy All"}
              </button>
            </div>
            <pre className="p-4 text-sm overflow-auto max-h-96 whitespace-pre-wrap" style={{ color: "#e5e5ea", fontFamily: "ui-monospace, monospace", background: "#0a0a0a" }}>
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
