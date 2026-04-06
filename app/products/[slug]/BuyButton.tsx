"use client";

import { useState } from "react";

export default function BuyButton({ slug, price }: { slug: string; price: number }) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="w-full py-4 rounded-xl text-lg font-black text-black transition-all hover:opacity-90 hover:scale-105 mb-4 disabled:opacity-60 disabled:scale-100"
      style={{ background: "#22c55e" }}
    >
      {loading ? "Loading..." : `Buy Now — $${price}`}
    </button>
  );
}
