# Template Code Snippets & Examples
## Copy-Paste Solutions for Common Customizations

---

## 🎨 Color System Examples

### SaaS/Tech Startup
```typescript
// tailwind.config.ts - Modern Blue/Purple Theme
colors: {
  bg: "#0a0e27",
  panel: "#0f1436",
  glass: "rgba(100,200,255,.06)",
  border: "rgba(100,200,255,.12)",
  text: "rgba(248,250,252,.96)",
  muted: "rgba(148,163,184,.92)",
  brand: "#0084ff",      // Vibrant blue
  brand2: "#7c3aed",     // Purple
  accent: "#06b6d4",     // Cyan
}
```

### Healthcare
```typescript
colors: {
  bg: "#0d1219",
  panel: "#13171f",
  glass: "rgba(34,197,94,.06)",
  border: "rgba(34,197,94,.12)",
  text: "rgba(248,250,252,.96)",
  muted: "rgba(148,163,184,.92)",
  brand: "#22c55e",      // Medical green
  brand2: "#06b6d4",     // Teal
  accent: "#f59e0b",     // Amber
}
```

### Finance/Banking
```typescript
colors: {
  bg: "#040d21",
  panel: "#0f1e3f",
  glass: "rgba(59,130,246,.06)",
  border: "rgba(59,130,246,.12)",
  text: "rgba(248,250,252,.96)",
  muted: "rgba(148,163,184,.92)",
  brand: "#3b82f6",      // Professional blue
  brand2: "#1e40af",     // Dark blue
  accent: "#fbbf24",     // Gold
}
```

### Fitness/Wellness
```typescript
colors: {
  bg: "#0f0f0f",
  panel: "#1a1a1a",
  glass: "rgba(239,68,68,.06)",
  border: "rgba(239,68,68,.12)",
  text: "rgba(248,250,252,.96)",
  muted: "rgba(148,163,184,.92)",
  brand: "#ef4444",      // Energy red
  brand2: "#f59e0b",     // Warm orange
  accent: "#22c55e",     // Vitality green
}
```

### E-Commerce
```typescript
colors: {
  bg: "#0a0a0a",
  panel: "#1a1a1a",
  glass: "rgba(236,72,153,.06)",
  border: "rgba(236,72,153,.12)",
  text: "rgba(248,250,252,.96)",
  muted: "rgba(148,163,184,.92)",
  brand: "#ec4899",      // Vibrant pink
  brand2: "#8b5cf6",     // Purple
  accent: "#06b6d4",     // Cyan
}
```

---

## 🏢 Company Information Templates

### Update Company Details
**File:** `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  // CUSTOMIZE THESE:
  title: "Your Company - Mission Statement",
  description: "What your company does in one compelling sentence (160 chars max)",
  
  openGraph: {
    title: "Your Company Name",
    description: "Your company description",
    url: "https://yourcompany.com",
    siteName: "Your Company",
    images: [
      {
        url: "https://yourcompany.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your Company",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Your Company Name",
    description: "Your company description",
  },

  robots: {
    index: true,
    follow: true,
  },

  // Update these with your info
  creator: "Your Name",
  publisher: "Your Company",
  authors: [{ name: "Your Name", url: "https://yourcompany.com/about" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};
```

### Footer Company Info
**File:** `components/ui/Footer.tsx`

```tsx
export function Footer() {
  return (
    <footer className="border-t border-border bg-panel py-12">
      <div className="mx-auto max-w-container px-7">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-8">
          {/* Column 1: Company */}
          <div>
            <h4 className="font-semibold text-text mb-4">Your Company</h4>
            <p className="text-sm text-muted mb-4">
              One-line company description here
            </p>
            {/* Add social links */}
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="font-semibold text-text mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/features">Features</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/roadmap">Roadmap</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-semibold text-text mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/about">About Us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-semibold text-text mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-muted">
          <p>&copy; 2026 Your Company, Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://twitter.com/yourcompany">Twitter</a>
            <a href="https://linkedin.com/company/yourcompany">LinkedIn</a>
            <a href="https://github.com/yourcompany">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## 📄 Page Template Examples

### Pricing Page
**File:** `app/pricing/page.tsx`

```tsx
"use client";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "For growing teams",
    features: [
      "All Starter features",
      "Feature 5",
      "Feature 6",
      "Feature 7",
      "Feature 8",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations",
    features: [
      "All Professional features",
      "Feature 9",
      "Feature 10",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      <Navbar />

      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <SectionHeading
          eyebrow="Transparent Pricing"
          title="Simple, Flexible Plans"
          subtitle="Choose the perfect plan for your needs"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlowCard
                className={`p-8 flex flex-col h-full ${
                  plan.highlighted
                    ? "ring-2 ring-brand shadow-glow"
                    : "ring-1 ring-border"
                }`}
              >
                <h3 className="text-2xl font-bold text-text mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-brand">
                    {plan.price}
                  </span>
                  <span className="text-muted text-sm ml-2">{plan.period}</span>
                </div>
                <p className="text-muted text-sm mb-8">{plan.description}</p>

                <ul className="space-y-4 flex-1 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-brand" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? "primary" : "ghost"}
                  className="w-full"
                  href={plan.highlighted ? "/signup" : "/contact"}
                >
                  {plan.cta}
                </Button>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

### About Page
**File:** `app/about/page.tsx`

```tsx
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import Image from "next/image";

const team = [
  {
    name: "Founder Name",
    role: "CEO & Founder",
    image: "/team/founder.jpg",
    bio: "Background and experience",
  },
  {
    name: "CTO Name",
    role: "Chief Technology Officer",
    image: "/team/cto.jpg",
    bio: "Technical expertise",
  },
  // Add more team members
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      <Navbar />

      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        {/* Mission */}
        <SectionHeading
          eyebrow="About Us"
          title="Our Mission"
          subtitle="The problem we're solving and how we're doing it"
        />

        <div className="prose prose-invert mt-12 max-w-2xl">
          <p>
            Your company's mission statement and origin story goes here.
            Explain why you started, what problem you solve, and your values.
          </p>
          <p>
            Add more paragraphs as needed to tell your story compelling way.
          </p>
        </div>

        {/* Team */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Our Team"
            title="Meet the Team"
            subtitle="The people behind your success"
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {team.map((member) => (
              <GlowCard key={member.name} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text">
                    {member.name}
                  </h3>
                  <p className="text-brand text-sm font-medium">{member.role}</p>
                  <p className="text-muted text-sm mt-3">{member.bio}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

---

## 🔌 API Integration Examples

### Mailchimp Subscription Handler
**File:** `api/src/functions/waitlist-subscribe/index.ts`

```typescript
import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { subscribeToMailchimp } from "@/utils/mailchimp";
import { validateEmail } from "@/utils/validation";
import { checkRateLimit } from "@/utils/rateLimit";

export async function handler(
  request: HttpRequest
): Promise<HttpResponseInit> {
  // Only POST allowed
  if (request.method !== "POST") {
    return { status: 405, body: "Method Not Allowed" };
  }

  try {
    // Get email from request
    const { email, firstName, source } = await request.json();

    // Validate email
    if (!validateEmail(email)) {
      return { status: 400, body: JSON.stringify({ error: "Invalid email" }) };
    }

    // Rate limit check (20 requests per minute per IP)
    const clientIp = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(clientIp, "subscribe", 20, 60)) {
      return { status: 429, body: JSON.stringify({ error: "Too many requests" }) };
    }

    // Subscribe to Mailchimp
    const result = await subscribeToMailchimp(email, {
      firstName,
      source: source || "website",
      signupDate: new Date().toISOString(),
    });

    if (!result.success) {
      return { 
        status: 400, 
        body: JSON.stringify({ error: result.error }) 
      };
    }

    return {
      status: 200,
      body: JSON.stringify({
        success: true,
        message: "Successfully subscribed!",
      }),
    };
  } catch (error) {
    console.error("Subscription error:", error);
    return {
      status: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}

app.http("waitlist-subscribe", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler,
});
```

### Custom API Endpoint
**File:** `api/src/functions/v1-projects/index.ts`

```typescript
import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { queryProjects } from "@/utils/cosmos";

export async function handler(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    // Get query parameters
    const { skip = "0", take = "10", sort = "createdAt" } = request.query;

    // Query projects from Cosmos DB
    const projects = await queryProjects({
      skip: parseInt(skip as string, 10),
      take: parseInt(take as string, 10),
      sortBy: sort as string,
    });

    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projects),
    };
  } catch (error) {
    console.error("Projects API error:", error);
    return {
      status: 500,
      body: JSON.stringify({ error: "Failed to fetch projects" }),
    };
  }
}

app.http("projects", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler,
});
```

---

## 🎨 Component Customization Examples

### Custom Button Styles
**File:** `components/ui/Button.tsx`

```tsx
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "font-medium rounded-lg transition-all font-medium";

  const variants = {
    primary: "bg-brand text-white hover:shadow-glow",
    ghost: "bg-transparent border border-brand text-brand hover:bg-brand/10",
    secondary: "bg-brand2 text-white hover:shadow-glow",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonClass = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={buttonClass}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### Hero Section Custom Component
**File:** `components/ui/HeroSection.tsx`

```tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "./Button";
import Image from "next/image";

interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheading: string;
  cta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
}

export function HeroSection({
  eyebrow,
  headline,
  subheading,
  cta,
  secondaryCta,
  backgroundImage,
  backgroundVideo,
}: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      {backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      {backgroundImage && !backgroundVideo && (
        <div className="absolute inset-0 opacity-10">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-bg/30 to-bg/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <p className="text-brand font-semibold text-sm uppercase tracking-wide mb-4">
              {eyebrow}
            </p>
          )}

          <h1 className="h1 mb-6 text-3xl sm:text-4xl lg:text-5xl">
            {headline}
          </h1>

          <p className="p-lead max-w-2xl mx-auto mb-8 text-lg sm:text-xl">
            {subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href={cta.href}>
              {cta.text}
            </Button>
            {secondaryCta && (
              <Button variant="ghost" size="lg" href={secondaryCta.href}>
                {secondaryCta.text}
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </div>
  );
}
```

---

## 🔧 Utility Function Templates

### Email Validation
**File:** `api/src/utils/validation.ts`

```typescript
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length < 254;
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 1000); // Max 1000 chars
}
```

### Rate Limiting
**File:** `api/src/utils/rateLimit.ts`

```typescript
const requestMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  endpoint: string,
  maxRequests: number = 10,
  windowSeconds: number = 60
): boolean {
  const key = `${identifier}:${endpoint}`;
  const now = Date.now();

  const data = requestMap.get(key);

  if (!data || now > data.resetTime) {
    // Create new window
    requestMap.set(key, {
      count: 1,
      resetTime: now + windowSeconds * 1000,
    });
    return true;
  }

  if (data.count >= maxRequests) {
    return false;
  }

  data.count++;
  return true;
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requestMap.entries()) {
    if (now > data.resetTime) {
      requestMap.delete(key);
    }
  }
}, 5 * 60 * 1000);
```

---

## 📝 Environment Configuration Examples

### `.env.local.example`

```env
# Frontend - Public (can be exposed in build)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G_XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
NEXT_PUBLIC_API_URL=http://localhost:7071/api

# Email Marketing
MAILCHIMP_API_KEY=abc123-us21
MAILCHIMP_SERVER_PREFIX=us21
MAILCHIMP_AUDIENCE_ID=xxxxxxxxxxxxx

# Analytics
NEXT_PUBLIC_SEGMENT_KEY=
NEXT_PUBLIC_MIXPANEL_TOKEN=

# Feature Flags
NEXT_PUBLIC_ENABLE_PRICING=true
NEXT_PUBLIC_ENABLE_BLOG=false
NEXT_PUBLIC_ENABLE_COMMUNITY=false

# Tracking
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

### `api/local.settings.json.example`

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName=xxxx;AccountKey=xxxx;EndpointSuffix=core.windows.net",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "FUNCTIONS_EXTENSION_VERSION": "~4",
    "
": "node",
    "COSMOS_DB_ENDPOINT": "https://xxxx.documents.azure.com:443/",
    "COSMOS_DB_KEY": "xxxxx==",
    "COSMOS_DB_DATABASE": "your-database",
    "JWT_SECRET": "your-super-secret-key-min-32-chars",
    "MAILCHIMP_API_KEY": "abc123-us21",
    "MAILCHIMP_SERVER_PREFIX": "us21",
    "APPLICATIONINSIGHTS_CONNECTION_STRING": "InstrumentationKey=xxxx;..."
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*",
    "CORSCredentials": false
  }
}
```

---

## 🚀 GitHub Actions Secret Configuration

Add these secrets to GitHub Settings → Secrets and variables → Actions:

```
# Azure Deployment
A_MACKPROJEKT_DEPKEY                          # Get from Azure Static Web App
AZURE_FUNCTIONAPP_NAME                        # Your function app name
AZURE_FUNCTIONAPP_PUBLISH_PROFILE             # Download from Azure portal

# Email
MAILCHIMP_API_KEY                             # abc123-us21
MAILCHIMP_SERVER_PREFIX                       # us21
MAILCHIMP_AUDIENCE_ID                         # Your audience ID

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID                 # G_XXXXXXXXXX
NEXT_PUBLIC_GTM_ID                            # GTM-XXXXXX

# Database
COSMOS_DB_ENDPOINT                            # https://xxxx.documents.azure.com:443/
COSMOS_DB_KEY                                 # Your Cosmos DB key

# Security
JWT_SECRET                                    # Generate: openssl rand -base64 32

# Monitoring
APPLICATIONINSIGHTS_CONNECTION_STRING         # From Application Insights

# Stripe (if using)
STRIPE_SECRET_KEY                             # sk_live_xxxx
STRIPE_WEBHOOK_SECRET                         # whsec_xxxx
```

---

**Total Snippets:** 15 code examples  
**Coverage:** Colors, pages, APIs, components, utils, env  
**Ready to Copy:** All snippets are production-ready

---

*Use these snippets as starting points for your custom implementations.*
