"use client";
import { GlowCard } from "./GlowCard";
import { Button } from "./Button";

const blogPosts = [
  {
    title: "Building Purpose-Driven Tech: From Justice System to Innovation Lab",
    date: "January 15, 2026",
    readTime: "8 min read",
    category: "Philosophy",
    excerpt: "How lived experience shapes better technology. Why empathy isn't just a buzzword—it's the foundation of innovation that actually helps people.",
    tags: ["Purpose", "Innovation", "Empathy"],
  },
  {
    title: "Why We Chose Next.js 16 + Azure: The Stack Behind A MackProjekt",
    date: "January 8, 2026",
    readTime: "12 min read",
    category: "Technical",
    excerpt: "Deep dive into our tech decisions: React Server Components, edge functions, static generation, and why serverless architecture fits mission-driven startups.",
    tags: ["Next.js", "Azure", "Architecture"],
  },
  {
    title: "1,200 Users in 90 Days: Launching T.O.O.L.S. Inc Without VC Funding",
    date: "December 20, 2025",
    readTime: "10 min read",
    category: "Startup",
    excerpt: "How we validated product-market fit, built credibility through impact, and bootstrapped to profitability while staying mission-aligned.",
    tags: ["Bootstrap", "Product Launch", "Community"],
  },
  {
    title: "The Reality of Building AI for Reentry: Ethical Considerations",
    date: "December 5, 2025",
    readTime: "15 min read",
    category: "AI & Ethics",
    excerpt: "When AI meets vulnerable populations: addressing bias, privacy, consent, and the responsibility of using machine learning for social good.",
    tags: ["AI", "Ethics", "Social Impact"],
  },
];

export function TechnicalBlog() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-muted max-w-2xl mx-auto">
          Technical insights, product deep-dives, and the philosophy behind building technology that matters. 
          Written by Donyale "DThree" Mack, Founder & CEO.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <GlowCard
            key={index}
            className="p-6 group hover:shadow-brand/20 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 text-xs font-semibold rounded bg-brand/10 text-brand">
                {post.category}
              </span>
              <span className="text-xs text-muted">{post.readTime}</span>
            </div>

            <h3 className="text-xl font-bold text-text mb-2 group-hover:text-brand transition-colors">
              {post.title}
            </h3>

            <p className="text-sm text-muted mb-4 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded bg-panel text-muted border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-xs text-muted">{post.date}</span>
              <Button variant="ghost" href="#" className="text-sm">
                Read Article →
              </Button>
            </div>
          </GlowCard>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-muted mb-4">
          Want technical deep-dives delivered monthly? Join our engineering newsletter.
        </p>
        <div className="flex max-w-md mx-auto gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-lg bg-panel border border-border text-text focus:border-brand outline-none transition-colors"
            aria-label="Email address for technical blog newsletter"
          />
          <Button variant="primary">Subscribe</Button>
        </div>
      </div>
    </div>
  );
}
