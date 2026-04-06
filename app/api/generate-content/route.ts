import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getProduct } from "@/lib/products";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PROMPTS: Record<string, (product: { title: string; description: string; price: number; emoji: string }) => string> = {
  tiktok: (p) => `You are a viral TikTok content creator for GradeUp, a digital product store for college students.

Create 3 TikTok video scripts for this product:
Product: ${p.emoji} ${p.title}
Description: ${p.description}
Price: $${p.price}

For each script, write:
HOOK (first 3 seconds — must stop the scroll):
SCRIPT (15-30 seconds, conversational, relatable to 18-year-olds):
CTA (clear call to action):
HASHTAGS (10 relevant hashtags):
CAPTION (the actual post caption, under 150 chars):

Make it feel authentic, not salesy. Reference real college struggles. Use trending TikTok language naturally.`,

  instagram: (p) => `You are a top Instagram growth strategist for GradeUp, targeting college students.

Create 5 Instagram posts for this product:
Product: ${p.emoji} ${p.title}
Price: $${p.price}

For each post:
POST TYPE (Reel / Carousel / Static):
VISUAL CONCEPT:
CAPTION (engaging, 150-200 words, conversational):
HASHTAGS (25 targeted hashtags):
STORY SEQUENCE (3 story slides that drive swipe-up):

Focus on pain points college students actually feel. Be specific, not generic.`,

  twitter: (p) => `You are a viral Twitter/X strategist for GradeUp targeting college students.

Create a 7-day Twitter content plan for this product:
Product: ${p.emoji} ${p.title}
Price: $${p.price}

For each day, write:
TWEET TYPE (thread / single / poll / hot take):
TWEET CONTENT (max 280 chars, or full thread if applicable):
REPLY STRATEGY (what engagement to chase):

Mix promotional (20%), educational (40%), and relatable/meme content (40%). Make tweets stand-alone valuable even without buying.`,

  email: (p) => `You are an elite email copywriter for GradeUp, a college student digital product store.

Write a 3-email campaign sequence for:
Product: ${p.emoji} ${p.title}
Price: $${p.price}

EMAIL 1 — PROBLEM (day 0):
Subject line:
Preview text:
Body (250 words max):
CTA:

EMAIL 2 — SOLUTION (day 2):
Subject line:
Preview text:
Body (250 words max):
CTA:

EMAIL 3 — URGENCY (day 4, last chance):
Subject line:
Preview text:
Body (200 words max):
CTA:

Write like a friend, not a corporation. Conversational. Specific. No buzzwords.`,

  adcopy: (p) => `You are a high-converting ad copywriter for GradeUp targeting college students on Facebook/Instagram.

Create 5 ad variations for:
Product: ${p.emoji} ${p.title}
Price: $${p.price}

For each ad:
HEADLINE (under 40 chars):
PRIMARY TEXT (under 125 chars):
DESCRIPTION (under 30 chars):
FORMAT (image / video / carousel):
TARGET AUDIENCE NOTES:

Test different angles: FOMO, social proof, problem/solution, price value, aspirational. Make each ad feel different.`,
};

export async function POST(req: NextRequest) {
  const { slug, type } = await req.json();

  const product = getProduct(slug);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const promptFn = PROMPTS[type];
  if (!promptFn) return NextResponse.json({ error: "Invalid content type" }, { status: 400 });

  const message = await anthropic.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 2048,
    messages: [{ role: "user", content: promptFn(product) }],
  });

  const content = message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ content });
}
