import Link from "next/link";

const faqs = [
  {
    q: "What exactly do I get when I buy?",
    a: "All GradeUp products are instant digital downloads — PDFs, templates, or spreadsheets. As soon as your payment goes through, you'll receive an email with your download link. No waiting, no shipping.",
  },
  {
    q: "How do I get my download after purchasing?",
    a: "Check your email immediately after checkout — you'll get a delivery email from GradeUp with a direct download link. Check your spam folder if you don't see it within 5 minutes. You can also email us at support@gradeup.com and we'll send it manually.",
  },
  {
    q: "Do these work on Mac and PC?",
    a: "Yes. PDFs work on any device. Notion templates work on any platform (Notion has free apps for Mac, Windows, iOS, and Android). Google Sheets templates work in any browser for free.",
  },
  {
    q: "I'm not tech-savvy. Are these beginner friendly?",
    a: "100%. Everything is designed for students who aren't productivity nerds. Each product comes with clear setup instructions. If you get stuck, email us and we'll walk you through it.",
  },
  {
    q: "What's your refund policy?",
    a: "30-day money back guarantee, no questions asked. If a product doesn't help you, email support@gradeup.com and we'll refund you the same day. We stand behind everything we sell.",
  },
  {
    q: "Can I share these with my friends?",
    a: "Our products are licensed for personal use only. That said — if your friend wants their own copy, they're $8-19. Send them the link! Each person getting their own copy means they get access to all future updates too.",
  },
  {
    q: "Do the products get updated?",
    a: "Yes. Several products (especially the AI Prompt Pack) are updated regularly as new features and strategies emerge. Once you buy, updates are free.",
  },
  {
    q: "I'm not in college yet. Should I still buy?",
    a: "Absolutely. Many of our best customers buy the summer before freshman year. The Freshman Survival Bundle and Study Planner especially — getting a head start is the whole point.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards, Apple Pay, and Google Pay — all processed securely through Stripe. We never store your card information.",
  },
  {
    q: "I have a question that isn't listed here.",
    a: "Email us at support@gradeup.com and we'll get back to you within 24 hours. We actually respond — no bots, no ticket queues.",
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#22c55e" }}>Support</p>
        <h1 className="text-5xl font-black mb-4">FAQ</h1>
        <p className="text-gray-400 text-lg">Everything you need to know. Can&apos;t find your answer? <a href="mailto:support@gradeup.com" className="underline hover:text-white transition-colors">Email us.</a></p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl p-6" style={{ background: "#111", border: "1px solid #222" }}>
            <h2 className="font-black text-lg mb-3 text-white">{faq.q}</h2>
            <p className="text-gray-400 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl p-8 text-center" style={{ background: "#22c55e11", border: "1px solid #22c55e33" }}>
        <p className="text-2xl font-black mb-2">Still have questions?</p>
        <p className="text-gray-400 mb-6">We reply within 24 hours, usually much faster.</p>
        <a href="mailto:support@gradeup.com" className="inline-block px-8 py-3 rounded-xl font-black text-black transition-all hover:opacity-90" style={{ background: "#22c55e" }}>
          Email Support →
        </a>
      </div>

      <div className="text-center mt-12">
        <Link href="/products" className="text-gray-500 hover:text-white transition-colors text-sm">
          ← Browse products
        </Link>
      </div>
    </main>
  );
}
