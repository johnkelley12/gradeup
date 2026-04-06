import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-32 text-center">
      <div className="text-7xl mb-6">🎉</div>
      <h1 className="text-4xl font-black mb-4">You&apos;re all set!</h1>
      <p className="text-gray-400 text-xl mb-4">
        Your order is confirmed. Check your email for your download link.
      </p>
      <p className="text-gray-500 mb-10">
        Questions? Email us at <a href="mailto:support@gradeup.com" className="underline hover:text-white">support@gradeup.com</a>
      </p>
      <Link
        href="/products"
        className="inline-block px-8 py-4 rounded-xl font-black text-black hover:opacity-90 transition-all"
        style={{ background: "#22c55e" }}
      >
        Browse More Products →
      </Link>
    </main>
  );
}
