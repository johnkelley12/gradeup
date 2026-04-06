import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getProduct } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

const DOWNLOAD_BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://gradeup-zeta.vercel.app";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const slug = session.metadata?.slug;
    const email = session.customer_details?.email;
    const customerName = session.customer_details?.name?.split(" ")[0] || "there";

    if (!slug || !email) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const product = getProduct(slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 400 });
    }

    const downloadUrl = `${DOWNLOAD_BASE}/downloads/${slug}.pdf`;

    await resend.emails.send({
      from: "GradeUp <hello@gradeup.com>",
      to: email,
      subject: `Your download is ready — ${product.title}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your GradeUp Order</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;overflow:hidden;border:1px solid #222;">

          <!-- Header -->
          <tr>
            <td style="background:#0a0a0a;padding:32px 40px;border-bottom:1px solid #222;">
              <span style="color:#22c55e;font-size:20px;font-weight:900;letter-spacing:-0.5px;">GRADEUP</span>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:40px 40px 24px;">
              <div style="font-size:48px;margin-bottom:16px;">${product.emoji}</div>
              <h1 style="color:#ffffff;font-size:28px;font-weight:900;margin:0 0 8px;line-height:1.2;">
                You're all set, ${customerName}! 🎉
              </h1>
              <p style="color:#888;font-size:16px;margin:0;">
                Your download is ready. Click the button below to get it.
              </p>
            </td>
          </tr>

          <!-- Product Info -->
          <tr>
            <td style="padding:0 40px 24px;">
              <div style="background:#1a1a1a;border-radius:12px;padding:20px;border:1px solid #333;">
                <p style="color:#22c55e;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 4px;">${product.category}</p>
                <p style="color:#ffffff;font-size:16px;font-weight:700;margin:0 0 4px;">${product.title}</p>
                <p style="color:#666;font-size:14px;margin:0;">Order confirmed · $${product.price}</p>
              </div>
            </td>
          </tr>

          <!-- Download Button -->
          <tr>
            <td style="padding:0 40px 32px;" align="center">
              <a href="${downloadUrl}"
                 style="display:inline-block;background:#22c55e;color:#000000;font-weight:900;font-size:18px;text-decoration:none;padding:18px 48px;border-radius:12px;letter-spacing:-0.3px;">
                Download Now →
              </a>
              <p style="color:#555;font-size:12px;margin:16px 0 0;">
                Or copy this link: <a href="${downloadUrl}" style="color:#22c55e;">${downloadUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:#222;"></div>
            </td>
          </tr>

          <!-- What's Included -->
          <tr>
            <td style="padding:32px 40px;">
              <h3 style="color:#ffffff;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;">What's Inside</h3>
              ${product.features.map(f => `
              <div style="display:flex;align-items:center;margin-bottom:10px;">
                <span style="color:#22c55e;font-size:14px;margin-right:10px;">✓</span>
                <span style="color:#aaa;font-size:14px;">${f}</span>
              </div>`).join("")}
            </td>
          </tr>

          <!-- Guarantee -->
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="background:#22c55e11;border:1px solid #22c55e33;border-radius:12px;padding:20px;">
                <p style="color:#22c55e;font-size:14px;font-weight:700;margin:0 0 4px;">30-Day Money Back Guarantee</p>
                <p style="color:#666;font-size:13px;margin:0;">
                  Not happy? Email us at <a href="mailto:support@gradeup.com" style="color:#22c55e;">support@gradeup.com</a> and we'll refund you instantly. No questions asked.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a0a0a;padding:24px 40px;border-top:1px solid #222;">
              <p style="color:#444;font-size:12px;margin:0;text-align:center;">
                GradeUp · <a href="mailto:support@gradeup.com" style="color:#444;">support@gradeup.com</a> · <a href="${DOWNLOAD_BASE}" style="color:#444;">gradeup.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });
  }

  return NextResponse.json({ received: true });
}
