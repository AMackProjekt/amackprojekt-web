# A MackProjekt Website Template - Comprehensive Guide

> **Transform your client websites from concept to deployment in hours, not days**

## Table of Contents

1. [Philosophy & Design Principles](#philosophy--design-principles)
2. [Architecture Overview](#architecture-overview)
3. [Getting Started](#getting-started)
4. [Component Library](#component-library)
5. [Customization Guide](#customization-guide)
6. [Best Practices](#best-practices)
7. [Deployment Guide](#deployment-guide)
8. [Advanced Features](#advanced-features)
9. [Troubleshooting](#troubleshooting)

---

## Philosophy & Design Principles

### Why This Template Exists

The A MackProjekt template system was created to solve a common challenge: building production-ready client websites quickly without sacrificing quality, performance, or customization.

**Core Principles:**

1. **Speed Without Compromise** - Deploy professional sites in hours while maintaining high quality
2. **Flexibility First** - Easy to customize for any industry or brand
3. **Production-Ready** - Built with enterprise-grade patterns and performance
4. **Developer-Friendly** - Clear code structure, comprehensive documentation
5. **Future-Proof** - Modern tech stack with active community support

### Design Philosophy

- **Glass Morphism** - Modern, depth-filled UI with translucent effects
- **Dark Mode First** - Optimized for reduced eye strain and professional aesthetics
- **Motion Design** - Subtle animations that enhance UX without distraction
- **Responsive Always** - Mobile-first approach with seamless desktop scaling
- **Performance** - Lighthouse 90+ scores out of the box

---

## Architecture Overview

### Technology Stack

```
┌─────────────────────────────────────────┐
│          Frontend Layer                  │
├─────────────────────────────────────────┤
│ • Next.js 15.5 (App Router)             │
│ • React 18 (Server & Client Components) │
│ • TypeScript 5.7 (Type Safety)          │
│ • Tailwind CSS 3.4 (Utility-First)      │
│ • Framer Motion 11 (Animations)         │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│         Build & Deploy                   │
├─────────────────────────────────────────┤
│ • Static Site Generation (SSG)          │
│ • Azure Static Web Apps (Hosting)       │
│ • GitHub Actions (CI/CD)                │
│ • Docker (Optional Containerization)    │
└─────────────────────────────────────────┘
```

### Directory Structure

```
project-root/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── about/page.tsx      # About page
│   ├── contact/page.tsx    # Contact page
│   ├── layout.tsx          # Root layout with metadata
│   └── globals.css         # Global styles
│
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── GlowCard.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── GoogleAnalytics.tsx
│   └── GoogleTagManager.tsx
│
├── lib/                    # Utility libraries
│   ├── auth.tsx            # Authentication context
│   ├── theme.tsx           # Theme provider
│   ├── cn.ts               # Class name utility
│   └── analytics.ts        # Analytics utilities
│
├── public/                 # Static assets
│   ├── logos/              # Brand logos
│   ├── images/             # Images
│   └── manifest.json       # PWA manifest
│
├── scripts/                # Automation scripts
│   └── create-client-site.js
│
├── template.config.js      # Site configuration
├── tailwind.config.ts      # Design system tokens
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

### Key Concepts

#### 1. App Router (Next.js 14+)

The template uses Next.js App Router for:
- File-based routing
- React Server Components by default
- Built-in metadata API for SEO
- Nested layouts

#### 2. Static Site Generation (SSG)

All pages are pre-rendered at build time:
- ⚡ Lightning-fast page loads
- 🔍 SEO-friendly (crawlable by search engines)
- 💰 Cost-effective hosting (static assets only)
- 🚀 Global CDN distribution

#### 3. Design Tokens

Centralized design system in `tailwind.config.ts`:
- Colors, spacing, typography
- Brand consistency across all pages
- Easy theme customization

---

## Getting Started

### Quick Start (5 Minutes)

#### Option 1: Using the CLI Generator (Recommended)

```bash
# From the repository root
npm run create-client-site

# Follow the interactive prompts
# The CLI will:
# - Create project directory
# - Copy template files
# - Replace all placeholders
# - Install dependencies
# - Initialize git repository
```

#### Option 2: Non-Interactive CLI

```bash
npm run create-client-site -- \
  --name "Acme Corporation" \
  --slug acme-corp \
  --domain acmecorp.com \
  --primary-color "#3B82F6" \
  --secondary-color "#10B981" \
  --accent-color "#F59E0B" \
  --email contact@acmecorp.com \
  --description "Professional consulting services" \
  --output ../acme-corp
```

#### Option 3: Manual Setup

```bash
# 1. Copy template directory
cp -r template my-client-site
cd my-client-site

# 2. Replace placeholders manually
#    Find and replace in all files:
#    {{CLIENT_NAME}} → Your Client Name
#    {{CLIENT_DOMAIN}} → yourclient.com
#    {{PRIMARY_COLOR}} → #3B82F6
#    etc.

# 3. Rename template files
mv package.template.json package.json
mv tailwind.config.template.ts tailwind.config.ts

# 4. Install dependencies
npm install

# 5. Start development
npm run dev
```

### Development Workflow

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run start

# Lint code
npm run lint
```

---

## Component Library

### Core UI Components

#### Button

Versatile button component with multiple variants.

```tsx
import { Button } from "@/components/ui/Button";

// Variants
<Button variant="solid">Primary Action</Button>
<Button variant="ghost">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

// With icon
<Button>
  <Icon />
  Click Me
</Button>
```

**Props:**
- `variant`: "solid" | "ghost" | "outline"
- `size`: "sm" | "md" | "lg"
- `className`: Additional CSS classes
- All native button props

---

#### GlowCard

Card component with glass morphism and glow effects.

```tsx
import { GlowCard } from "@/components/ui/GlowCard";

<GlowCard className="p-8">
  <h3>Card Title</h3>
  <p>Card content with automatic glow effects on scroll</p>
</GlowCard>
```

**Features:**
- Translucent background (glass morphism)
- Scroll-triggered glow animation
- Hover effects
- Responsive padding

---

#### Navbar

Sticky navigation header with theme toggle.

```tsx
import { Navbar } from "@/components/ui/Navbar";

<Navbar />
```

**Features:**
- Sticky positioning with backdrop blur
- Responsive mobile menu
- Dark/light theme toggle
- Logo support
- Active link highlighting

**Customization:**
Edit `components/ui/Navbar.tsx` to modify navigation items:

```tsx
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];
```

---

#### SectionHeading

Consistent heading pattern for sections.

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";

<SectionHeading
  eyebrow="Our Services"
  title="What We Offer"
  subtitle="Discover how we can help transform your business"
/>
```

**Props:**
- `eyebrow`: Small text above title (optional)
- `title`: Main heading
- `subtitle`: Description text (optional)
- `align`: "left" | "center" | "right"

---

#### ChatBot

Floating AI assistant for user support.

```tsx
import { ChatBot } from "@/components/ui/ChatBot";

<ChatBot />
```

**Features:**
- Keyword-based responses
- Floating button in corner
- Expandable chat interface
- Customizable responses

**Customization:**
Edit `components/ui/ChatBot.tsx` to add responses:

```tsx
const botResponses: Record<string, string> = {
  "pricing": "Our pricing starts at $99/month...",
  "contact": "You can reach us at contact@example.com",
  // Add more keyword-response pairs
};
```

---

#### Footer

Site footer with links and social media.

```tsx
import { Footer } from "@/components/ui/Footer";

<Footer />
```

**Customization:**
Edit `components/ui/Footer.tsx` to modify footer content, links, and social media icons.

---

#### CookieConsent

GDPR-compliant cookie consent banner.

```tsx
import { CookieConsent } from "@/components/ui/CookieConsent";

<CookieConsent />
```

**Features:**
- Granular cookie preferences (essential, analytics, marketing)
- Persistent storage of user preferences
- GDPR compliant
- Customizable text and styling

---

### Advanced Components

#### DashboardSection

Pre-built dashboard layout with KPIs and charts.

```tsx
import { DashboardSection } from "@/components/ui/DashboardSection";

<DashboardSection />
```

**Includes:**
- KPI cards with statistics
- Chart visualizations (Recharts)
- Responsive grid layout
- Data tables

---

#### ElectricEffects

Animated text and UI elements with electric/neon effects.

```tsx
import { ElectricText, ElectricButton, ElectricDivider } from "@/components/ui/ElectricEffects";

<ElectricText color="green">Animated Text</ElectricText>
<ElectricButton color="blue">Glowing Button</ElectricButton>
<ElectricDivider />
```

---

## Customization Guide

### Step 1: Brand Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  brand: "#3B82F6",      // Primary brand color
  brand2: "#10B981",     // Secondary color
  accent: "#F59E0B",     // Accent color
}
```

**Tips:**
- Use your logo's primary color for `brand`
- Choose complementary colors for `brand2` and `accent`
- Test contrast ratios at [WebAIM](https://webaim.org/resources/contrastchecker/)

---

### Step 2: Logo & Favicon

Replace files in `public/logos/`:

1. **Primary Logo**
   - File: `primary-logo.png` or `primary-logo.svg`
   - Recommended size: 300x80px
   - Format: PNG with transparent background, or SVG

2. **Favicon**
   - File: `icon.png`
   - Required size: 512x512px
   - Format: PNG with transparent background

3. **Open Graph Image**
   - File: `og-image.png`
   - Recommended size: 1200x630px
   - Used for social media previews

---

### Step 3: Site Metadata

Edit `app/layout.tsx` to update SEO metadata:

```typescript
export const metadata: Metadata = {
  title: "Your Company Name | Tagline",
  description: "Your company description for search engines",
  keywords: ["keyword1", "keyword2", "keyword3"],
  // ... other metadata
};
```

---

### Step 4: Homepage Content

Edit `app/page.tsx`:

1. **Hero Section** - Update headline and call-to-action
2. **Features Section** - Customize feature cards
3. **CTA Section** - Modify final call-to-action

---

### Step 5: Navigation

Edit `components/ui/Navbar.tsx`:

```tsx
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" }, // Add your pages
  { label: "Contact", href: "/contact" },
];
```

---

### Step 6: Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Company
NEXT_PUBLIC_CONTACT_EMAIL=contact@yourdomain.com

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## Best Practices

### 1. Performance Optimization

**Image Optimization:**
```tsx
// Use Next.js Image component
import Image from "next/image";

<Image
  src="/images/hero.jpg"
  alt="Description"
  width={1200}
  height={630}
  priority // For above-the-fold images
/>
```

**Code Splitting:**
```tsx
// Lazy load heavy components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});
```

---

### 2. SEO Best Practices

**Page Metadata:**
```tsx
// In each page.tsx
export const metadata: Metadata = {
  title: "Page Title | Site Name",
  description: "Page description (150-160 characters)",
  openGraph: {
    title: "OG Title",
    description: "OG Description",
    images: ["/og-image.png"],
  },
};
```

**Semantic HTML:**
```tsx
// Use proper HTML5 semantic tags
<header>
<nav>
<main>
  <article>
  <section>
  <aside>
</main>
<footer>
```

---

### 3. Accessibility

**ARIA Labels:**
```tsx
<button aria-label="Close menu">
  <CloseIcon />
</button>
```

**Keyboard Navigation:**
- Test tab order
- Ensure focus states are visible
- Support Escape key for modals

**Color Contrast:**
- Use WebAIM Contrast Checker
- Ensure 4.5:1 ratio for normal text
- Ensure 3:1 ratio for large text

---

### 4. Code Organization

**Component Structure:**
```tsx
// 1. Imports
import React from "react";
import { cn } from "@/lib/cn";

// 2. Types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost";
}

// 3. Component
export function Button({ variant = "solid", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "base-classes",
        variant === "solid" && "solid-classes",
        className
      )}
      {...props}
    />
  );
}
```

**File Naming:**
- Components: PascalCase (e.g., `Button.tsx`)
- Utilities: camelCase (e.g., `cn.ts`)
- Pages: lowercase (e.g., `page.tsx`)

---

## Deployment Guide

### Option 1: Azure Static Web Apps (Recommended)

#### Prerequisites
- Azure account
- Azure CLI installed
- GitHub repository

#### Steps

1. **Create Azure Static Web App:**

```bash
az staticwebapp create \
  --name my-client-site \
  --resource-group my-resource-group \
  --source https://github.com/username/my-client-site \
  --location centralus \
  --branch main \
  --app-location "/" \
  --output-location "out" \
  --login-with-github
```

2. **Configure GitHub Secrets:**

Go to GitHub repository → Settings → Secrets → Actions

Add secret:
- Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- Value: (Copy from Azure portal)

3. **Push to Deploy:**

```bash
git push origin main
```

GitHub Actions will automatically build and deploy.

4. **Configure Custom Domain:**

In Azure portal:
- Go to Static Web App → Custom domains
- Add your domain
- Update DNS records as instructed

---

### Option 2: Vercel

#### Steps

1. **Install Vercel CLI:**

```bash
npm i -g vercel
```

2. **Deploy:**

```bash
vercel
```

Follow prompts to link to your account.

3. **Configure Domain:**

In Vercel dashboard:
- Go to your project → Domains
- Add custom domain
- Update DNS records

---

### Option 3: Netlify

#### Steps

1. **Install Netlify CLI:**

```bash
npm i -g netlify-cli
```

2. **Deploy:**

```bash
netlify deploy --prod
```

3. **Configure Domain:**

In Netlify dashboard:
- Go to Site settings → Domain management
- Add custom domain

---

### Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify forms submit successfully
- [ ] Check mobile responsiveness
- [ ] Test navigation links
- [ ] Verify images load
- [ ] Check SSL/HTTPS enabled
- [ ] Test analytics tracking (if enabled)
- [ ] Run Lighthouse audit (aim for 90+)
- [ ] Submit sitemap to Google Search Console

---

## Advanced Features

### Custom API Integration

Add custom API routes (requires server-side hosting):

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  
  // Process form submission
  // Send email, save to database, etc.
  
  return Response.json({ success: true });
}
```

---

### Analytics Setup

#### Google Analytics 4

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (starts with `G-`)
3. Add to `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The template automatically includes GA4 in `app/layout.tsx`.

---

### Mailchimp Integration

1. Get API key from Mailchimp account
2. Get Audience ID
3. Add to `.env.local`:

```env
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_AUDIENCE_ID=your-audience-id
MAILCHIMP_SERVER_PREFIX=us1
```

4. Use `WaitlistForm` component for email signups

---

### Progressive Web App (PWA)

The template includes PWA support:

1. **Manifest** - Already configured in `public/manifest.json`
2. **Service Worker** - Add `public/service-worker.js` for offline support
3. **Icons** - Ensure icon sizes in `public/logos/`

---

## Troubleshooting

### Build Errors

**Issue: "Cannot find module"**

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**Issue: TypeScript errors**

```bash
# Check types without building
npx tsc --noEmit
```

---

### Styling Issues

**Issue: Styles not applying**

```bash
# Hard refresh browser
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Clear Tailwind cache
rm -rf .next
npm run dev
```

**Issue: Colors not updating**

- Verify `tailwind.config.ts` changes saved
- Restart dev server: `npm run dev`
- Check class names use Tailwind tokens (e.g., `text-brand`)

---

### Deployment Issues

**Issue: Build fails on Azure/Vercel**

- Check build logs for errors
- Test build locally: `npm run build`
- Verify environment variables set correctly

**Issue: Images not loading**

- For static export, use `unoptimized: true` in `next.config.js`
- Check image paths (should be relative to `public/`)

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Azure Static Web Apps Docs](https://learn.microsoft.com/azure/static-web-apps/)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Support

For questions, issues, or feature requests:

- 📧 Email: support@mackprojekt.com
- 📖 Documentation: Review this guide and other docs
- 🐛 GitHub Issues: Report bugs or request features

---

**Built with ❤️ by A MackProjekt**

*Last updated: February 2026*
