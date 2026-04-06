export type Product = {
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAt: number;
  emoji: string;
  category: string;
  tags: string[];
  features: string[];
};

export const products: Product[] = [
  {
    slug: "notion-dashboard",
    title: "The College Command Center — Notion Dashboard",
    description: "One dashboard to rule your entire college life. Track assignments, grades, budget, social events, and goals in one beautiful Notion workspace.",
    price: 19,
    compareAt: 29,
    emoji: "🧠",
    category: "Templates",
    tags: ["notion", "productivity", "planner", "organization"],
    features: [
      "Semester assignment tracker",
      "GPA calculator",
      "Budget & expense tracker",
      "Study schedule planner",
      "Goal setting system",
      "Works on any device",
    ],
  },
  {
    slug: "ai-prompt-pack",
    title: "College AI Prompt Pack — 150+ Prompts",
    description: "Stop getting garbage outputs from ChatGPT. These 150+ prompts are built specifically for college students — essays, studying, emails, career prep, and more.",
    price: 12,
    compareAt: 19,
    emoji: "🤖",
    category: "Digital Download",
    tags: ["AI", "ChatGPT", "studying", "essays", "productivity"],
    features: [
      "50+ essay & writing prompts",
      "30+ study & flashcard prompts",
      "20+ career & resume prompts",
      "Professor email templates",
      "Research assistant prompts",
      "Lifetime updates included",
    ],
  },
  {
    slug: "budget-tracker",
    title: "Budget Boss™ — College Budget Tracker",
    description: "Built for college life — track dining dollars, Venmo splits, part-time job income, and subscriptions. Stop wondering where your money went.",
    price: 8,
    compareAt: 15,
    emoji: "💰",
    category: "Spreadsheet",
    tags: ["budget", "finance", "money", "spreadsheet"],
    features: [
      "Monthly budget dashboard",
      "Dining plan tracker",
      "Subscription manager",
      "Savings goal tracker",
      "Works in Google Sheets & Excel",
      "Beginner friendly",
    ],
  },
  {
    slug: "freshman-survival-bundle",
    title: "The Freshman Survival Cheat Sheet Bundle",
    description: "Everything you wish someone told you before Day 1. Condensed cheat sheets for the hardest freshman courses plus life skills nobody teaches you.",
    price: 15,
    compareAt: 25,
    emoji: "🎓",
    category: "PDF Bundle",
    tags: ["study guide", "cheat sheet", "freshman", "college prep"],
    features: [
      "Bio 101 cheat sheet",
      "Calc I formula sheet",
      "Intro Psych summary",
      "Macro Econ guide",
      "English Comp framework",
      "College life tips PDF",
    ],
  },
  {
    slug: "resume-linkedin-kit",
    title: "The Glow-Up Kit — Resume & LinkedIn Templates",
    description: "Land your first internship with templates that actually get you noticed. 6 ATS-friendly resume templates plus a LinkedIn optimization checklist.",
    price: 15,
    compareAt: 24,
    emoji: "💼",
    category: "Templates",
    tags: ["resume", "LinkedIn", "internship", "career", "jobs"],
    features: [
      "6 ATS-friendly resume templates",
      "LinkedIn profile checklist",
      "Cover letter framework",
      "Canva + Word/Google Docs formats",
      "Internship-focused design",
      "No experience? No problem",
    ],
  },
  {
    slug: "study-planner",
    title: "The Dean's List Daily™ — Study Planner",
    description: "The study schedule that actually works. Built around how college exams are structured — not some generic planner that ignores midterm season.",
    price: 10,
    compareAt: 17,
    emoji: "📅",
    category: "Templates",
    tags: ["study", "planner", "schedule", "exams", "GPA"],
    features: [
      "Weekly study schedule template",
      "Exam countdown system",
      "Daily task prioritizer",
      "Pomodoro timer framework",
      "Works in Notion & Google Sheets",
      "Midterm & finals modes",
    ],
  },
  {
    slug: "meal-prep-guide",
    title: "The Broke But Fed Playbook — Meal Prep Guide",
    description: "Eat well on $50/week. Meal plans, grocery lists, and budget recipes designed for dorm rooms and tiny apartment kitchens.",
    price: 15,
    compareAt: 22,
    emoji: "🍕",
    category: "PDF Guide",
    tags: ["meal prep", "food", "budget", "dorm", "cooking"],
    features: [
      "4-week meal plan",
      "Weekly grocery lists under $50",
      "30 easy dorm-friendly recipes",
      "Dining hall hacks",
      "Nutrition basics for students",
      "Meal prep Sunday guide",
    ],
  },
  {
    slug: "internship-tracker",
    title: "InternReady™ — Internship Application Tracker",
    description: "Track every application, follow-up, and interview in one place. Includes email templates for cold outreach and follow-ups that actually get responses.",
    price: 15,
    compareAt: 22,
    emoji: "🚀",
    category: "Spreadsheet",
    tags: ["internship", "jobs", "career", "applications", "tracker"],
    features: [
      "Application status tracker",
      "Follow-up reminder system",
      "10 cold email templates",
      "Interview prep checklist",
      "Networking contact manager",
      "Works in Google Sheets",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
