export interface AgentTask {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'scheduled';
  dueDate: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface Agent {
  id: number;
  name: string;
  role: string;
  description: string;
  status: 'active' | 'idle' | 'processing';
  icon: string;
  color: string;
  bgColor: string;
  metrics: { label: string; value: string | number; change?: string }[];
  recentTasks: AgentTask[];
  weeklyGoals: string[];
  monthlyGoals: string[];
}

export const agents: Agent[] = [
  {
    id: 1,
    name: "SEO Strategy Director",
    role: "Lead Strategist",
    description: "Leads keyword research, site architecture, competitor analysis, and ranking strategy for search dominance across Google and Bing.",
    status: "active",
    icon: "Search",
    color: "#2563eb",
    bgColor: "#eff6ff",
    metrics: [
      { label: "Keywords Tracked", value: 200, change: "+12" },
      { label: "Top 10 Rankings", value: 18, change: "+3" },
      { label: "Top 3 Rankings", value: 5, change: "+1" },
      { label: "Avg. Position", value: "14.2", change: "-2.1" },
    ],
    recentTasks: [
      { id: "s1", title: "Quarterly keyword gap analysis", status: "in_progress", dueDate: "2026-03-14", priority: "critical" },
      { id: "s2", title: "Competitor backlink audit: Manning & Napier", status: "completed", dueDate: "2026-03-10", priority: "high" },
      { id: "s3", title: "Site architecture optimization plan", status: "pending", dueDate: "2026-03-17", priority: "high" },
      { id: "s4", title: "Internal linking audit", status: "scheduled", dueDate: "2026-03-21", priority: "medium" },
    ],
    weeklyGoals: [
      "Complete keyword gap analysis for all 200 target keywords",
      "Audit internal linking structure across service pages",
      "Review and update meta titles and descriptions for top 20 pages",
    ],
    monthlyGoals: [
      "Achieve 5 new Top 10 keyword rankings",
      "Complete full technical SEO audit",
      "Publish competitor analysis report",
      "Redesign URL structure for suburb landing pages",
    ],
  },
  {
    id: 2,
    name: "Content Authority Engine",
    role: "Content Production",
    description: "Produces 2-3 authoritative long-form articles weekly targeting high-net-worth readers with educational financial insights.",
    status: "active",
    icon: "FileText",
    color: "#16a34a",
    bgColor: "#f0fdf4",
    metrics: [
      { label: "Articles Published", value: 47, change: "+3" },
      { label: "Content Pipeline", value: 12 },
      { label: "Avg. Word Count", value: "2,450" },
      { label: "Organic Sessions", value: "3.2K", change: "+18%" },
    ],
    recentTasks: [
      { id: "c1", title: "Write: 'Retirement Strategies for High Net Worth 2026'", status: "in_progress", dueDate: "2026-03-12", priority: "critical" },
      { id: "c2", title: "Write: 'How to Choose a Financial Advisor in Rochester'", status: "pending", dueDate: "2026-03-14", priority: "high" },
      { id: "c3", title: "Update: 'Tax Planning Guide 2025' → 2026 edition", status: "pending", dueDate: "2026-03-16", priority: "high" },
      { id: "c4", title: "Write: 'Roth Conversion Strategies for Retirees'", status: "scheduled", dueDate: "2026-03-19", priority: "medium" },
    ],
    weeklyGoals: [
      "Publish 3 new long-form articles (2,000+ words each)",
      "Update 2 existing articles with fresh data and links",
      "Create 1 comprehensive guide for lead generation",
    ],
    monthlyGoals: [
      "Publish 12 articles minimum",
      "Create 2 downloadable wealth guides",
      "Achieve 10% increase in organic sessions from content",
      "Build content clusters around 5 primary topics",
    ],
  },
  {
    id: 3,
    name: "Local SEO & Maps Agent",
    role: "Local Domination",
    description: "Dominates Google Maps and local search results across Rochester and affluent suburbs through GBP optimization and local content.",
    status: "processing",
    icon: "MapPin",
    color: "#ea580c",
    bgColor: "#fff7ed",
    metrics: [
      { label: "GBP Views", value: "8.4K", change: "+22%" },
      { label: "Map Pack Rankings", value: 6 },
      { label: "Reviews", value: 78, change: "+5" },
      { label: "Local Citations", value: 42 },
    ],
    recentTasks: [
      { id: "l1", title: "Create Pittsford landing page", status: "in_progress", dueDate: "2026-03-11", priority: "critical" },
      { id: "l2", title: "Create Brighton landing page", status: "pending", dueDate: "2026-03-13", priority: "critical" },
      { id: "l3", title: "Weekly GBP post: Market Commentary", status: "completed", dueDate: "2026-03-10", priority: "high" },
      { id: "l4", title: "NAP consistency audit across 50 directories", status: "scheduled", dueDate: "2026-03-18", priority: "medium" },
    ],
    weeklyGoals: [
      "Publish 2 Google Business Profile posts",
      "Create 1 new suburb landing page",
      "Acquire 2 new five-star reviews",
    ],
    monthlyGoals: [
      "Complete all 8 suburb landing pages",
      "Reach 90+ Google reviews",
      "Achieve Map Pack position for 5+ keywords",
      "Submit to 10 new local directories",
    ],
  },
  {
    id: 4,
    name: "GEO / AI Search Agent",
    role: "AI Search Optimization",
    description: "Ensures Whitney & Company appears in AI-generated answers on ChatGPT, Perplexity, Gemini, and voice search assistants.",
    status: "active",
    icon: "Bot",
    color: "#9333ea",
    bgColor: "#faf5ff",
    metrics: [
      { label: "AI Mentions", value: 12, change: "+4" },
      { label: "FAQ Pages", value: 8 },
      { label: "Structured Data", value: "34 pages" },
      { label: "Voice Queries", value: 23 },
    ],
    recentTasks: [
      { id: "g1", title: "Create FAQ hub: /financial-advisor-faq", status: "in_progress", dueDate: "2026-03-13", priority: "critical" },
      { id: "g2", title: "Add Schema.org markup to all service pages", status: "in_progress", dueDate: "2026-03-15", priority: "critical" },
      { id: "g3", title: "Write 10 Q&A pairs for wealth management", status: "pending", dueDate: "2026-03-14", priority: "high" },
      { id: "g4", title: "Monitor Perplexity mentions for 'Rochester wealth management'", status: "completed", dueDate: "2026-03-10", priority: "high" },
    ],
    weeklyGoals: [
      "Create 10 new Q&A optimized content pieces",
      "Monitor AI search mentions across all platforms",
      "Add structured data to 5 new pages",
    ],
    monthlyGoals: [
      "Achieve AI mentions in 5+ target queries",
      "Complete FAQ hub with 100+ questions",
      "Implement structured data across entire site",
      "Establish brand mention strategy for AI citations",
    ],
  },
  {
    id: 5,
    name: "Authority & Backlink Agent",
    role: "Link Building & PR",
    description: "Builds credibility through backlinks from financial publications, local media, directories, and professional partnerships.",
    status: "idle",
    icon: "Link",
    color: "#dc2626",
    bgColor: "#fef2f2",
    metrics: [
      { label: "Total Backlinks", value: 156, change: "+8" },
      { label: "Domain Authority", value: 34, change: "+2" },
      { label: "Referring Domains", value: 67, change: "+4" },
      { label: "Directory Listings", value: 28 },
    ],
    recentTasks: [
      { id: "b1", title: "Submit to NAPFA Advisor Directory", status: "in_progress", dueDate: "2026-03-12", priority: "critical" },
      { id: "b2", title: "Pitch guest article to Rochester Business Journal", status: "pending", dueDate: "2026-03-14", priority: "high" },
      { id: "b3", title: "Update SmartAsset advisor profile", status: "completed", dueDate: "2026-03-09", priority: "high" },
      { id: "b4", title: "Identify 10 new backlink opportunities", status: "scheduled", dueDate: "2026-03-20", priority: "medium" },
    ],
    weeklyGoals: [
      "Acquire 2 new quality backlinks",
      "Submit to 1 financial directory",
      "Outreach to 3 potential link partners",
    ],
    monthlyGoals: [
      "Increase domain authority by 2+ points",
      "Acquire 10 new referring domains",
      "Get featured in 1 local publication",
      "Complete all major directory submissions",
    ],
  },
];

export const contentCalendar = [
  { week: "Mar 10-16", articles: ["Retirement Strategies for HNW 2026", "How to Choose a Financial Advisor Rochester", "Roth Conversion Guide"], status: "in_progress" },
  { week: "Mar 17-23", articles: ["Estate Planning Checklist", "Tax Efficient Investing Strategies", "Wealth Management Pittsford Landing Page"], status: "scheduled" },
  { week: "Mar 24-30", articles: ["Medicare Planning for HNW", "Business Succession Planning", "Wealth Management Brighton Landing Page"], status: "scheduled" },
  { week: "Apr 1-7", articles: ["Social Security Optimization", "Financial Planning for Business Owners", "FAQ Hub: Part 1"], status: "planned" },
  { week: "Apr 8-14", articles: ["Concentrated Stock Management", "Trust Planning for HNW Families", "Wealth Management Penfield Landing Page"], status: "planned" },
  { week: "Apr 15-21", articles: ["Tax Planning 2026 Update", "Multi-Generational Wealth Guide", "Wealth Management Victor Landing Page"], status: "planned" },
  { week: "Apr 22-28", articles: ["Safe Withdrawal Rate Guide", "Executive Compensation Planning", "FAQ Hub: Part 2"], status: "planned" },
  { week: "May 1-7", articles: ["Bucket Strategy Retirement", "NUA Strategy Guide", "Wealth Management Webster Landing Page"], status: "planned" },
];
