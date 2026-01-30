# Modern SaaS Web Framework Template
## Complete Architecture Overview for Multi-Client Deployment

---

## 📋 Table of Contents
1. [Project Structure](#project-structure)
2. [Technology Stack](#technology-stack)
3. [Architecture Patterns](#architecture-patterns)
4. [Component Library](#component-library)
5. [Design System](#design-system)
6. [Customization Guide](#customization-guide)
7. [Deployment](#deployment)
8. [Best Practices](#best-practices)

---

## 🏗️ Project Structure

```
project-root/
├── app/                          # Next.js App Router (frontend pages)
│   ├── page.tsx                  # Homepage (main entry point)
│   ├── layout.tsx                # Root layout wrapper
│   ├── globals.css               # Global styles
│   ├── (feature-name)/
│   │   ├── page.tsx              # Feature page (auto-routed to /feature-name)
│   │   └── layout.tsx            # Feature-specific layout (optional)
│   ├── portal/                   # Authenticated user area
│   │   ├── auth/page.tsx         # Login/signup
│   │   ├── dashboard/page.tsx    # User dashboard
│   │   ├── courses/page.tsx      # Learning/content area
│   │   └── profile/page.tsx      # User settings
│   ├── api-test/                 # Testing/demo pages
│   ├── interest/                 # Lead capture forms
│   ├── referral/                 # Referral/partnership forms
│   ├── messaging/                # Feature preview pages
│   ├── partnerships/             # Partner showcase
│   ├── privacy/                  # Legal pages
│   ├── terms/                    # Legal pages
│   ├── launch/                   # Campaign/launch pages
│   ├── media-kit/                # Press/brand assets
│   └── reentry/                  # Feature-specific pages
│
├── components/
│   ├── ui/                       # Reusable component library
│   │   ├── Button.tsx            # Base button component
│   │   ├── GlowCard.tsx          # Glass card with effects
│   │   ├── Navbar.tsx            # Navigation header
│   │   ├── Footer.tsx            # Footer with branding
│   │   ├── SectionHeading.tsx    # Section title pattern
│   │   ├── ElectricEffects.tsx   # Animated text/borders/effects
│   │   ├── ChatBot.tsx           # Floating AI assistant
│   │   ├── CookieConsent.tsx     # GDPR compliance banner
│   │   ├── ContactForm.tsx       # Lead capture form
│   │   ├── DashboardSection.tsx  # Dashboard layout with KPIs
│   │   ├── WaitlistForm.tsx      # Email signup form
│   │   ├── QRCodeWithTracking.tsx # QR code generator
│   │   ├── LaunchVideo.tsx       # Video player with analytics
│   │   ├── ThemeToggle.tsx       # Dark/light mode switcher
│   │   ├── GoogleAdsConversion.tsx
│   │   ├── GoogleAnalytics.tsx
│   │   └── GoogleTagManager.tsx
│   ├── GoogleAdsConversion.tsx   # Ad conversion tracking
│   ├── GoogleAnalytics.tsx       # GA4 integration
│   └── GoogleTagManager.tsx      # GTM integration
│
├── lib/                          # Utilities & helpers
│   ├── auth.tsx                  # Authentication context
│   ├── theme.tsx                 # Dark/light mode provider
│   ├── cn.ts                     # Class name merger (clsx + tailwind-merge)
│   ├── analytics.ts              # Analytics helper functions
│   └── [custom].ts               # Custom utility functions
│
├── public/                       # Static assets
│   ├── logos/                    # Brand logos
│   │   ├── primary-logo.jpeg    # Main logo
│   │   └── icon.png             # Favicon
│   ├── videos/                   # Demo/campaign videos
│   ├── manifest.json             # PWA manifest
│   └── service-worker.js         # PWA service worker
│
├── api/                          # Azure Functions backend
│   ├── src/
│   │   ├── functions/            # Serverless endpoints
│   │   │   ├── auth-login/
│   │   │   ├── auth-signup/
│   │   │   ├── contact/
│   │   │   ├── waitlist-subscribe/
│   │   │   ├── healthz/
│   │   │   └── v1-projects/      # Custom API routes
│   │   ├── utils/
│   │   │   ├── auth.ts           # Auth helpers
│   │   │   ├── cosmos.ts         # Database queries
│   │   │   ├── mailchimp.ts      # Email marketing integration
│   │   │   ├── validation.ts     # Input validation
│   │   │   └── rateLimit.ts      # Rate limiting
│   │   ├── shared/
│   │   │   └── http.ts           # HTTP response helpers
│   │   └── config/
│   │       └── index.ts          # Environment config
│   ├── host.json                 # Azure Functions config
│   ├── local.settings.json       # Local dev environment
│   └── package.json              # Backend dependencies
│
├── docs/                         # Documentation
│   ├── BACKEND_PLAN.md
│   ├── API_SETUP.md
│   ├── MAILCHIMP_SETUP.md
│   └── [other guides]
│
├── tasks/                        # Project planning
│   ├── backlog/                  # Feature backlogs
│   └── [sprint planning]
│
├── .github/
│   └── workflows/
│       └── azure-static-web-apps-*.yml  # CI/CD pipeline
│
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind design tokens
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.js              # ESLint rules
├── postcss.config.js             # PostCSS plugins
├── package.json                  # Frontend dependencies
├── Dockerfile                    # Docker image
├── docker-compose.yml            # Local dev containers
├── staticwebapp.config.json      # Azure Static Web Apps config
└── .env.local.example            # Environment variables template
```

---

## 🔧 Technology Stack

### Frontend (Client)
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16.1.6 | React meta-framework with App Router |
| **Runtime** | React 18.3.1 | UI component library |
| **Language** | TypeScript 5.7.3 | Type-safe JavaScript |
| **Styling** | Tailwind CSS 3.4.17 | Utility-first CSS framework |
| **Animations** | Framer Motion 11.12.0 | Production-grade animations |
| **Charts** | Recharts 2.15.0 | React charting library |
| **State** | React Context API | Built-in state management |
| **Build** | Turbopack | Fast incremental builds |
| **Export** | Static Export | Pre-rendered HTML/CSS/JS |

### Backend (Serverless)
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Azure Functions v4 | Serverless computing |
| **Language** | TypeScript 4.x | Type-safe backend |
| **Database** | Azure Cosmos DB | NoSQL document store |
| **Auth** | JWT / Cookies | Stateless authentication |
| **Email** | Mailchimp SDK | Email marketing automation |
| **Validation** | Custom validators | Input sanitization |
| **Rate Limit** | In-memory store | API throttling |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **Azure Static Web Apps** | Hosting + Auto CI/CD |
| **Azure Functions** | Serverless API backend |
| **Azure Cosmos DB** | Globally distributed database |
| **Application Insights** | Monitoring & diagnostics |
| **GitHub Actions** | CI/CD pipeline automation |

### DevOps & Tooling
| Tool | Purpose |
|------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Local development environment |
| **ESLint 9** | Code quality (flat config) |
| **GitHub** | Version control & CI/CD |
| **npm/Node 20** | Package management |

---

## 🎨 Architecture Patterns

### 1. **Page Structure Pattern**
Every page follows this layout:

```tsx
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export const metadata = {
  title: "Page Title - Brand Name",
  description: "SEO description",
};

export default function PageName() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Background effects (fixed, z-index -10) */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      <Navbar />

      {/* Main content sections */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        {/* Content here */}
      </section>

      <Footer />
    </main>
  );
}
```

### 2. **Component Pattern with "use client"**
Components using hooks, state, or events:

```tsx
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function MyComponent({ className, ...props }: Props) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={cn("base-classes", className)}
      {...props}
    >
      Content
    </motion.div>
  );
}
```

**Key patterns:**
- Always mark with `"use client"` if using hooks/events
- Extend native HTML props for type safety
- Use `cn()` for class merging (prevents Tailwind conflicts)
- Export type alongside component

### 3. **Scroll Animation Pattern**
Every section that animates in:

```tsx
<motion.div
  initial={{ opacity: 0, y: 14 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
>
  Content animates in when scrolled to
</motion.div>
```

**Key values:**
- `margin: "-60px"` = trigger 60px before entering viewport
- `once: true` = only animate once (performance)
- Custom easing for smooth motion

### 4. **API Endpoint Pattern (Azure Functions)**

```typescript
// api/src/functions/[function-name]/index.ts
import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { validateEmail } from "@/utils/validation";
import { checkRateLimit } from "@/utils/rateLimit";

export async function handler(
  request: HttpRequest
): Promise<HttpResponseInit> {
  // 1. Extract and validate input
  const { email } = await request.json();
  if (!validateEmail(email)) {
    return { status: 400, body: "Invalid email" };
  }

  // 2. Check rate limits
  if (!checkRateLimit(request.ip, "endpoint-name")) {
    return { status: 429, body: "Too many requests" };
  }

  // 3. Business logic
  try {
    // ... process request
    return { status: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, body: "Internal server error" };
  }
}

app.http("function-name", { methods: ["POST"], handler });
```

### 5. **Form Handling Pattern**

```tsx
"use client";
import { useState } from "react";
import { Button } from "./Button";

export function MyForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Request failed");
      // Success handling
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-border bg-bg px-4 py-3"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
}
```

---

## 🎭 Component Library

### Base Components (Reusable across all clients)

#### 1. **Button.tsx** - Versatile CTA Component
```tsx
<Button variant="primary" href="/page" className="custom-class">
  Click Me
</Button>
```
**Variants:** `primary`, `ghost`  
**Props:** `href`, `onClick`, `disabled`, `type`, `className`, HTML attributes

#### 2. **GlowCard.tsx** - Glass Morphism Container
```tsx
<GlowCard className="p-8">
  Content with glass effect + shadow
</GlowCard>
```
**Features:** Glass background, neon border, hover shadow, smooth transitions

#### 3. **Navbar.tsx** - Sticky Header
```tsx
<Navbar /> // Auto-includes theme toggle, logo, nav links, CTA
```
**Features:** Sticky positioning, backdrop blur, responsive mobile menu

#### 4. **SectionHeading.tsx** - Title Pattern
```tsx
<SectionHeading
  eyebrow="Subheading"
  title="Main Title"
  subtitle="Description text"
/>
```
**Features:** Branded eyebrow, gradient text option, responsive sizing

#### 5. **DashboardSection.tsx** - Analytics Layout
```tsx
<DashboardSection
  title="Dashboard"
  stats={[{ label: "Users", value: "1,234" }]}
  charts={[...]}
/>
```
**Features:** KPI cards, chart integration, responsive grid

#### 6. **ElectricEffects.tsx** - Animated Text/Borders
```tsx
<ElectricText color="green">Animated Text</ElectricText>
<ElectricButton color="brand" variant="solid">Button</ElectricButton>
<ElectricBorder color="brand2" intensity="medium">Content</ElectricBorder>
```

#### 7. **ThemeToggle.tsx** - Dark/Light Mode
```tsx
// Auto-detects system preference, allows manual toggle, persists to localStorage
// Include in navbar
```

#### 8. **CookieConsent.tsx** - GDPR Banner
```tsx
// Auto-renders at bottom, respects user choice, hides after consent
```

#### 9. **ChatBot.tsx** - Floating Assistant
```tsx
<ChatBot /> // Floating in bottom-right, keyword-based responses
```

#### 10. **ContactForm.tsx** - Lead Capture
```tsx
<ContactForm source="homepage" />
// Submits to /api/contact endpoint
```

#### 11. **WaitlistForm.tsx** - Email Signup
```tsx
<WaitlistForm source="homepage" />
// Integrates with Mailchimp, validation, success message
```

#### 12. **LaunchVideo.tsx** - Video Player
```tsx
<LaunchVideo 
  title="Video Title"
  videoUrl="/videos/my-video.mp4"
  showSocial={true}
/>
// GA tracking, share buttons, progress bar
```

#### 13. **QRCodeWithTracking.tsx** - QR Generator
```tsx
<QRCodeWithTracking
  url="https://example.com"
  logoUrl="/logos/my-logo.png"
/>
// Generates QR, tracks scans in GA, downloadable
```

#### 14. **Footer.tsx** - Global Footer
```tsx
<Footer /> // Auto-branded, links, copyright, legal links
```

---

## 🎨 Design System (Fully Customizable)

### Color Tokens (Dark Mode - Default)
Edit in `tailwind.config.ts`:

```typescript
colors: {
  bg: "#06070b",              // Background
  panel: "#0c0f17",           // Card/panel background
  glass: "rgba(255,255,255,.06)", // Glass surface
  border: "rgba(255,255,255,.12)", // Border color
  text: "rgba(248,250,252,.96)",   // Primary text
  muted: "rgba(148,163,184,.92)",  // Secondary text
  brand: "#38bdf8",           // Primary CTA
  brand2: "#2dd4bf",          // Secondary CTA
  accent: "#a78bfa",          // Accent/highlights
}
```

### Light Mode Tokens (Auto-applied with `html.light` class)
```typescript
colors: {
  "light-bg": "#ffffff",
  "light-panel": "#f8f9fa",
  "light-text": "rgba(15,23,42,.96)",
  "light-muted": "rgba(100,116,139,.92)",
  // ... rest
}
```

### Typography Classes
```css
.h1   /* 42px/56px/72px responsive, bold */
.h2   /* 28px/34px/40px responsive, bold */
.p-lead /* 16px/18px, muted color, leading relaxed */
.glass /* Glass background with backdrop blur */
```

### Shadow/Glow Presets
```css
shadow-glow          /* Default glow */
shadow-neon          /* Sky blue neon */
shadow-neon-brand2   /* Teal neon */
shadow-neon-accent   /* Purple neon */
shadow-electric      /* Green electric */
```

### Background Glows
```css
bg-dash-glow    /* Soft multi-color gradient (default) */
bg-electric-glow /* Green-dominant electric glow */
```

### Animations
```css
animate-pulse-slow      /* 3s pulse */
animate-electric-pulse  /* Glowing pulse */
animate-flicker         /* Cyberpunk flicker */
animate-heartbeat       /* Image scale bounce */
```

---

## 🔧 Customization Guide

### For New Client Projects:

#### Step 1: Brand Colors
**File:** `tailwind.config.ts`

Replace color tokens:
```typescript
colors: {
  brand: "#YOUR_PRIMARY_COLOR",
  brand2: "#YOUR_SECONDARY_COLOR",
  accent: "#YOUR_ACCENT_COLOR",
  // Keep bg, panel, text, muted for consistency
}
```

#### Step 2: Logo & Favicon
**Files:** `public/logos/`

Replace:
- `primary-logo.jpeg` → client's main logo
- `icon.png` → client's favicon

Update in:
- `app/layout.tsx` (metadata.icons)
- `components/ui/Navbar.tsx` (logo src)
- `public/manifest.json` (PWA icon)

#### Step 3: Content & Copy
**Files:** `app/*.tsx`

- Update page titles, descriptions, body text
- Replace company name references
- Update email addresses, social links
- Modify section content while keeping layout structure

#### Step 4: Features to Include/Exclude
**Files:** `app/page.tsx` and feature pages

```tsx
// Include sections:
{/* HERO */}
{/* FEATURES */}
{/* TESTIMONIALS (optional) */}
{/* PRICING (optional) */}
{/* CTA */}
{/* FAQ (optional) */}
```

Comment out unused sections to keep homepage focused.

#### Step 5: Third-Party Integrations
**Files:** `.env.local`, API endpoints

Configure:
- Mailchimp API key for email
- Google Analytics 4 tracking ID
- Google Tag Manager container ID
- Cosmos DB connection string
- Application Insights key

#### Step 6: Forms & CTAs
**File:** Components and endpoint handlers

Update form submissions:
- Change `/api/contact` destination
- Update success messages
- Modify validation rules
- Customize email templates (Mailchimp)

#### Step 7: Navigation Structure
**Files:** `components/ui/Navbar.tsx`, routing

Update navigation links to match client's site structure:
```tsx
<a href="/features">Features</a>
<a href="/pricing">Pricing</a>
<a href="/about">About</a>
// etc.
```

---

## 🚀 Deployment

### Local Development
```bash
# Install dependencies
npm install
cd api && npm install

# Run frontend + backend
npm run dev                    # Terminal 1: Frontend on :3000
cd api && npm start           # Terminal 2: Functions on :7071

# Or with Docker
docker-compose up             # Both services
```

### Production Deployment (Azure)

#### Prerequisites
```bash
# Install Azure CLI
curl https://aka.ms/InstallAzureCLIDeb | bash

# Login
az login
az account set --subscription "SUBSCRIPTION_ID"

# Install Azure Functions Core Tools
npm install -g azure-functions-core-tools@4
```

#### GitHub Actions Setup
1. Create GitHub repository
2. Add secrets (Settings → Secrets → Actions):
   ```
   A_MACKPROJEKT_DEPKEY    # Azure Static Web Apps deployment key
   COSMOS_DB_ENDPOINT      # Database endpoint
   COSMOS_DB_KEY           # Database key
   JWT_SECRET              # Session signing key
   APPLICATIONINSIGHTS_CONNECTION_STRING
   MAILCHIMP_API_KEY
   MAILCHIMP_SERVER_PREFIX
   MAILCHIMP_AUDIENCE_ID
   ```

3. Push to main branch
4. GitHub Actions auto-deploys via workflow

#### Manual Deployment (if needed)
```bash
# Build
npm run build

# Deploy to Static Web Apps
az staticwebapp upload --name my-swa --source ./out

# Deploy Functions
cd api
func azure functionapp publish my-function-app
```

### Environment Files

**`.env.local.example`** (copy to `.env.local`):
```env
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G_XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX

# Mailchimp
MAILCHIMP_API_KEY=xxxxx-us21
MAILCHIMP_SERVER_PREFIX=us21
MAILCHIMP_AUDIENCE_ID=xxxxx
```

**`api/local.settings.json.example`** (copy to `api/local.settings.json`):
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;...",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "COSMOS_DB_ENDPOINT": "https://xxxx.documents.azure.com:443/",
    "COSMOS_DB_KEY": "xxxxx",
    "JWT_SECRET": "your-secret"
  }
}
```

---

## ✅ Best Practices

### Code Organization
- **One component per file** (keeps imports clean)
- **Barrel exports** in index files for cleaner imports
- **Shared utilities** in `/lib` folder
- **Group related features** in folders

### Performance
- **Use `"use client"` sparingly** (only on interactive components)
- **Lazy load components** with `React.lazy()`
- **Optimize images** with Next.js Image component
- **Tree-shake unused styles** with Tailwind purge
- **Static generation** for SEO pages (pre-render at build time)

### Accessibility
- **ARIA labels** on all interactive elements
- **Semantic HTML** (nav, main, section, footer)
- **Color contrast** meets WCAG AA standards
- **Keyboard navigation** fully supported

### Security
- **Validate all inputs** on client + server
- **Rate limit API endpoints** (prevent abuse)
- **Use environment variables** for secrets
- **HTTPS only** in production
- **CORS properly configured** for API calls
- **No sensitive data** in localStorage (use httpOnly cookies)

### Testing & Monitoring
- **Build verification** before deployment
- **Application Insights** logs for debugging
- **Google Analytics** for user behavior
- **Error tracking** for production issues
- **Type safety** with TypeScript strict mode

### SEO
- **Metadata** on every page (title, description)
- **Open Graph tags** for social sharing
- **Structured data** for rich snippets
- **Sitemap.xml** for crawlability
- **Robots.txt** for crawl control

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes, commit
git commit -m "feat: description"

# Push and create PR
git push origin feature/feature-name

# After review, merge to main
# GitHub Actions auto-deploys
```

---

## 📊 File Size Reference

**Production Bundle (optimized):**
- Initial HTML: ~25KB (gzipped)
- JavaScript: ~85KB (gzipped)
- CSS: ~45KB (gzipped)
- **Total: ~155KB** (very fast load)

**Build Time:**
- First build: ~25 seconds
- Incremental build: ~5-10 seconds
- Static generation: ~30 pages in <1 minute

---

## 🎯 Quick Start for New Client

1. **Clone template repo**
   ```bash
   git clone <template-repo>
   cd new-client-project
   ```

2. **Update branding**
   - [ ] Modify `tailwind.config.ts` colors
   - [ ] Replace logos in `public/logos/`
   - [ ] Update `app/layout.tsx` metadata
   - [ ] Update company name in `components/ui/Navbar.tsx`

3. **Customize content**
   - [ ] Edit `app/page.tsx` (homepage)
   - [ ] Update navigation in `Navbar.tsx`
   - [ ] Modify section content

4. **Setup integrations**
   - [ ] Create Mailchimp account, get API key
   - [ ] Create Google Analytics property
   - [ ] Create Azure resources (Functions, Cosmos DB, etc.)

5. **Deploy**
   - [ ] Push to GitHub
   - [ ] Add secrets to GitHub Actions
   - [ ] Deploy triggers automatically

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Azure Functions Docs](https://learn.microsoft.com/en-us/azure/azure-functions/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Framework Version:** 1.0.0  
**Last Updated:** January 29, 2026  
**License:** [Your License]
