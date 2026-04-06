import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GradeUp — The Cheat Codes for College Success",
  description: "Digital tools, templates, and guides built for college students who want to get ahead fast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ borderBottom: "1px solid #222" }} className="sticky top-0 z-50 backdrop-blur-md bg-black/80">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-tight" style={{ color: "#22c55e" }}>
              GradeUp
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/products" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Products
              </Link>
              <Link href="/products" className="px-4 py-2 rounded-lg text-sm font-bold text-black transition-all hover:opacity-90" style={{ background: "#22c55e" }}>
                Shop Now
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <footer style={{ borderTop: "1px solid #222" }} className="mt-24 py-12">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xl font-black" style={{ color: "#22c55e" }}>GradeUp</p>
              <p className="text-gray-500 text-sm mt-1">The cheat codes for college success</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <a href="mailto:support@gradeup.com" className="hover:text-white transition-colors">Support</a>
            </div>
            <p className="text-gray-600 text-sm">30-day money back guarantee. No questions asked.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
