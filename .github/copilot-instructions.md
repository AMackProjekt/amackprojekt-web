# T.O.O.L.S Inc - Copilot Instructions

## Project Overview

**T.O.O.L.S Inc** (Together Overcoming Obstacles and Limitations) is a Next.js 14 web application supporting justice-involved individuals through programs, referrals, and a learning portal. The platform includes public pages, form submissions, authenticated user portal, and AI chatbot support.

## Architecture

### Technology Stack
- **Framework**: Next.js 14.2.0 (App Router, Static Export)
- **Styling**: Tailwind CSS 3.4.10 with custom dark theme
- **Animation**: Framer Motion 11.0.0
- **Charts**: Recharts 2.12.7
- **Authentication**: React Context (mock implementation, requires backend)
- **Deployment**: Azure Static Web Apps + Docker support

### Application Structure

The app has **three main areas**:

1. **Public Pages** (`app/`):
   - `/` - Landing page with hero, features, dashboard preview, CTA
   - `/interest` - Interest form with QR code for easy mobile access
   - `/referral` - Referral submission form for justice-involved individuals
   - `/partnerships` - Partnership information and benefits

2. **User Portal** (`app/portal/`):
   - `/portal/auth` - Login/signup page
   - `/portal/dashboard` - User dashboard with stats, progress tracking
   - `/portal/courses` - Course catalog with lessons and video content
   - `/portal/profile` - User profile management and preferences

3. **Shared Components** (`components/ui/`):
   - Design system: Button, GlowCard, Navbar, SectionHeading
   - ChatBot - Floating AI assistant with keyword-based responses
   - CookieConsent - GDPR-compliant banner with granular preferences
   - DashboardSection - Pre-built dashboard layout with KPIs
   - InteractiveTiles - Hover effects for feature showcases

### Next.js Configuration
- **Static Export** (`output: "export"`) - No server-side rendering
- **Images**: Unoptimized (required for static export)
- **Trailing Slash**: Enabled for Azure Static Web Apps
- **Path Alias**: `@/` maps to root directory

## Critical Workflows

### Development
```bash
npm run dev          # Local dev server (http://localhost:3000)
npm run build        # Production build
npm run export       # Build + static export to /out
npm run lint         # ESLint checks
```

### Docker (Optional)
```bash
npm run docker:build      # Build Docker image
npm run docker:run        # Run container on port 3000
npm run compose:up        # Docker Compose stack
```
See [DOCKER.md](../DOCKER.md) for Azure Container Registry and ACI deployment.

### Azure Deployment
- **Trigger**: Push to `main` or pull request
- **Workflow**: `.github/workflows/azure-static-web-apps-blue-desert-08d808f10.yml`
- **Process**:
  1. Install dependencies with `npm ci`
  2. Build with `npm run build` (Node 20, 4GB memory)
  3. Deploy `/out` directory to Azure Static Web Apps
- **PR Previews**: Automatic staging environments for pull requests

## Design System

### Dark Theme Tokens (Tailwind)
```typescript
colors: {
  bg: "#06070b",           // Main background
  panel: "#0c0f17",        // Card/panel background
  glass: "rgba(255,255,255,.06)",  // Glass overlay
  border: "rgba(255,255,255,.12)", // Border color
  text: "rgba(248,250,252,.96)",   // Primary text
  muted: "rgba(148,163,184,.92)",  // Secondary text
  brand: "#38bdf8",        // Sky blue (primary brand)
  brand2: "#2dd4bf",       // Teal (secondary brand)
  accent: "#a78bfa"        // Purple (accent)
}
```

### Typography System (Custom CSS Classes)
```css
.h1 - 42px/56px/72px (responsive), tracking-tight2, font-extrabold
.h2 - 28px/34px/40px (responsive), tracking-tight2, font-extrabold
.p-lead - 16px/18px, text-muted, leading-[1.7]
```

### Glass Morphism Pattern
```tsx
// Option 1: Utility class
<div className="glass rounded-xl p-6">

// Option 2: Component
<GlowCard className="p-6">
```

## Key Conventions

### Component Patterns

**Client Components with Framer Motion**:
```tsx
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function MyButton({ className, ...props }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      className={cn("base-classes", className)}
      {...props}
    />
  );
}
```
**Pattern**: Always mark files using Framer Motion, React hooks, or event handlers with `'use client'`. Extend native HTML props for type safety. Use `cn()` to allow consumer class overrides.

**Scroll Animations**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 14 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
>
```
**Pattern**: `margin: "-60px"` triggers animation before element enters viewport. `viewport={{ once: true }}` prevents re-animation. Use custom easing `[0.22, 1, 0.36, 1]` for smooth motion.

**Gradient Text**:
```tsx
<span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
  Gradient Text
</span>
```

**Page Structure**:
```tsx
export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Fixed background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      
      <Navbar />
      
      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        {/* Content */}
      </section>
    </main>
  );
}
```
**Pattern**: All pages use fixed background glow, consistent section padding (`px-7`), and `max-w-container` (1200px) for content width.

### Authentication Flow

**Current Implementation** (`lib/auth.tsx`):
- React Context with localStorage (Base64 encoded)
- Mock login/signup (no backend)
- Protected routes check `isAuthenticated` in `useEffect`

**CRITICAL**: This is a **mock implementation**. For production:
- Replace with secure backend API
- Use bcrypt/argon2 for password hashing
- Implement JWT tokens or secure session cookies
- Add HTTPS-only, HttpOnly cookies
- Never store passwords in localStorage

**Usage**:
```tsx
"use client";
import { useAuth } from "@/lib/auth";

export default function ProtectedPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) router.push("/portal/auth");
  }, [isAuthenticated]);
}
```

### ChatBot Component

**Implementation** (`components/ui/ChatBot.tsx`):
- Floating button in bottom-right corner
- Keyword-based responses (no AI backend)
- Pre-configured responses for: programs, job readiness, education, lived experience, referral, support, contact

**Adding Responses**:
```tsx
const botResponses: Record<string, string> = {
  "new-key": "Your response here",
  // Triggered when userMessage includes keywords
};

function getBotResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  if (msg.includes("keyword")) return botResponses["new-key"];
  // ...
}
```

## File Organization

### Critical Files
- `next.config.js` - Static export config (DO NOT enable SSR)
- `tailwind.config.ts` - Dark theme design tokens
- `app/layout.tsx` - Root layout with `<AuthProvider>`
- `app/globals.css` - Tailwind + custom typography classes
- `lib/cn.ts` - Class name utility (clsx + tailwind-merge)
- `lib/auth.tsx` - Auth context provider

### Component Library
```
components/ui/
  Button.tsx              # Animated button with variants
  GlowCard.tsx            # Glass card with scroll/hover animations
  SectionHeading.tsx      # Eyebrow + title + subtitle pattern
  Navbar.tsx              # Sticky nav with backdrop blur
  DashboardSection.tsx    # Full dashboard with KPIs, charts, tables
  ChatBot.tsx             # Floating AI assistant
  CookieConsent.tsx       # GDPR compliance banner
  InteractiveTiles.tsx    # Feature showcase with hover effects
```

## Data Patterns

### Recharts Integration
```tsx
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

<ResponsiveContainer width="100%" height="100%">
  <AreaChart data={chartData}>
    <XAxis 
      dataKey="name"
      tick={{ fill: "rgba(148,163,184,.85)", fontSize: 12 }}
      axisLine={false}
      tickLine={false}
    />
    <Tooltip
      contentStyle={{
        background: "rgba(12,15,23,.92)",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 12
      }}
    />
    <Area
      type="monotone"
      dataKey="value"
      stroke="rgba(56,189,248,.85)"
      fill="rgba(56,189,248,.14)"
      strokeWidth={2}
    />
  </AreaChart>
</ResponsiveContainer>
```

### Form Handling
Forms use React state (`useState`) with controlled inputs. No form library currently used.

**Pattern**:
```tsx
const [email, setEmail] = useState("");

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full rounded-lg bg-bg border border-border px-4 py-3"
/>
```

## Important Notes

### Authentication Security
⚠️ **WARNING**: Current auth is a **mock implementation** for development only:
- Passwords stored in plain text in localStorage
- No encryption, only Base64 encoding
- No backend validation

**Before Production**:
1. Implement secure backend API (Node.js/Express, ASP.NET, etc.)
2. Use proper password hashing (bcrypt, argon2)
3. Implement JWT or session-based auth
4. Add HTTPS-only, HttpOnly cookies
5. Never expose secrets in client-side code

### Static Export Limitations
Because `output: "export"` is enabled:
- No server-side rendering (SSR)
- No API routes (`app/api/` won't work)
- No dynamic routing with `getServerSideProps`
- No Image Optimization (use `unoptimized: true`)

### FluentUI Reference
The `.github/fluentui-master/` directory is a FluentUI monorepo (likely for reference). If integrating:
- Uses Nx workspace (`nx` commands)
- See `AGENTS.md` for Nx patterns
- FluentUI React v9 components available

## Common Tasks

### Adding a New Public Page
1. Create `app/new-page/page.tsx`
2. Use standard page structure (see **Page Structure** pattern)
3. Include `<Navbar />` and background glow
4. Add link to navigation in `components/ui/Navbar.tsx`

### Adding a New Portal Page
1. Create `app/portal/new-page/page.tsx`
2. Add `"use client"` directive (uses `useAuth` hook)
3. Check authentication:
   ```tsx
   useEffect(() => {
     if (!isAuthenticated) router.push("/portal/auth");
   }, [isAuthenticated]);
   ```

### Creating a New UI Component
1. Place in `components/ui/NewComponent.tsx`
2. If using hooks/events, add `"use client"` at top
3. Extend native HTML props for type safety
4. Use `cn()` utility for class merging
5. Export type alongside component

### Updating Design Tokens
1. Edit `tailwind.config.ts` for colors, spacing, etc.
2. Update `app/globals.css` for custom utilities
3. Changes apply globally via Tailwind classes

## References
- [Next.js 14 App Router Docs](https://nextjs.org/docs/app)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Recharts Docs](https://recharts.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Azure Static Web Apps Docs](https://learn.microsoft.com/azure/static-web-apps/)
