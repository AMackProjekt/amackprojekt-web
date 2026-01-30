# Client Customization Checklist
## Step-by-Step Template Configuration Guide

---

## 📋 Pre-Setup Requirements

- [ ] Client brand guidelines (colors, logo, fonts)
- [ ] Client content/copy (homepage text, features, etc.)
- [ ] Domain name ready
- [ ] Azure subscription with credits
- [ ] GitHub account for repository
- [ ] Mailchimp account (if using email)
- [ ] Google Analytics 4 property (if tracking)

---

## 🎨 Phase 1: Visual Branding (2-3 hours)

### Color System
**File:** `tailwind.config.ts` (lines 15-30)

```typescript
// OLD (A MackProjekt):
colors: {
  brand: "#38bdf8",
  brand2: "#2dd4bf",
  accent: "#a78bfa",
}

// NEW (Your Client):
colors: {
  brand: "#YOUR_PRIMARY",      // Main CTA buttons
  brand2: "#YOUR_SECONDARY",   // Secondary elements
  accent: "#YOUR_ACCENT",      // Highlights/borders
}
```

**Tasks:**
- [ ] Extract primary brand color (hex) from client logo/guidelines
- [ ] Extract secondary brand color
- [ ] Extract accent color
- [ ] Update `tailwind.config.ts` lines 15-30
- [ ] Test colors in dev: `npm run dev` → Check homepage
- [ ] Verify contrast ratios (use WebAIM tool)

**Verification:**
```bash
npm run dev
# Visit http://localhost:3000 - buttons should be new color
```

### Logo & Favicon
**Directory:** `public/logos/`

**Current files:**
- `primary-logo.jpeg` → Main logo in navbar
- `icon.png` → Favicon in browser tab

**Tasks:**
- [ ] Save client logo as `primary-logo.jpeg` (300x80px recommended)
- [ ] Save client favicon as `icon.png` (512x512px PNG)
- [ ] Update `app/layout.tsx` metadata:
  ```tsx
  icons: {
    icon: "/logos/icon.png",
    apple: "/logos/icon.png",
  }
  ```
- [ ] Clear browser cache and reload to see new favicon

**Logo Optimization:**
```bash
# If logo is larger than 100KB:
npx sharp --input /path/to/logo.jpg --output /path/to/logo-optimized.jpeg --resize 300 80 --withoutEnlargement
```

### Favicon Setup
**File:** `app/layout.tsx` (lines 20-25)

```tsx
icons: {
  icon: [
    { url: "/logos/icon.png", sizes: "any" },
    { url: "/logos/icon.svg", type: "image/svg+xml", rel: "icon" },
  ],
  apple: "/logos/apple-touch-icon.png",
}
```

**Tasks:**
- [ ] Upload client icon to `/public/logos/icon.png`
- [ ] Test: Refresh browser → Check browser tab for new icon
- [ ] Test on mobile: Add to home screen → See correct icon

---

## ✍️ Phase 2: Content & Copy (4-6 hours)

### Homepage Hero Section
**File:** `app/page.tsx` (lines 1-80)

**Current:**
```tsx
export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="...">
        <h1>Welcome to A MackProjekt</h1>
        <p>Innovation lab building solutions...</p>
      </section>
```

**Tasks:**
- [ ] Update hero headline (h1 text)
- [ ] Update hero subtitle/description
- [ ] Update CTA button text ("Get Started" vs "Learn More", etc.)
- [ ] Update CTA button link `href="/page"`
- [ ] Add client contact email where needed
- [ ] Update company name throughout page

**Key Copy Points to Update:**
- [ ] `<h1>` - Main headline
- [ ] `<p className="p-lead">` - Subheading
- [ ] Button `.children` text
- [ ] Feature cards titles/descriptions
- [ ] CTAs throughout

### Feature Cards
**File:** `app/page.tsx` (lines 100-180)

Current template:
```tsx
const features = [
  {
    title: "Feature 1",
    description: "What this feature does",
    icon: "icon-name",
  },
  // ... more features
];
```

**Tasks:**
- [ ] Identify client's 3-5 key features
- [ ] Update feature titles
- [ ] Update feature descriptions (2-3 sentences each)
- [ ] Update feature order (most important first)
- [ ] Keep or remove features based on client needs

### Product/Service Section
**File:** `app/page.tsx` (search for "Product" or specific product names)

**Tasks:**
- [ ] Replace "T.O.O.L.S. Inc" with client's main product name
- [ ] Update product description
- [ ] Update "1,200+ users, 87% success" stats with client's actual metrics
- [ ] Update product links
- [ ] Repeat for secondary products (if applicable)

### Footer & Legal
**File:** `app/page.tsx` → imports from `components/ui/Footer.tsx`

**Tasks:**
- [ ] Update company name in footer
- [ ] Update social links (LinkedIn, Twitter, etc.)
- [ ] Update copyright year
- [ ] Update privacy policy link destination
- [ ] Update terms of service link

### Navigation Menu
**File:** `components/ui/Navbar.tsx` (lines 30-50)

Current:
```tsx
<a href="/launch">Launch</a>
<a href="/messaging">Messaging</a>
// ... more links
```

**Tasks:**
- [ ] Update nav items to match client site structure
- [ ] Example structure:
  - Home (`/`)
  - Solutions (`/solutions`)
  - Pricing (`/pricing`)
  - About (`/about`)
  - Contact (`/contact`)
- [ ] Update or remove "coming soon" items
- [ ] Update CTA button text ("Join Waitlist" → "Get Started", etc.)

### Meta Data
**File:** `app/layout.tsx` (lines 1-20)

```tsx
export const metadata: Metadata = {
  title: "A MackProjekt - Innovation Lab",
  description: "Building solutions for justice-involved individuals...",
  openGraph: {
    title: "A MackProjekt",
    description: "...",
  },
};
```

**Tasks:**
- [ ] Update page `title`
- [ ] Update page `description` (160 chars max for SEO)
- [ ] Update Open Graph title
- [ ] Update Open Graph description
- [ ] Update site URL in metadata

---

## 🔌 Phase 3: Integrations (2-4 hours)

### Email Marketing (Mailchimp)

**If client wants email capture:**

1. **Create Mailchimp Account**
   - [ ] Go to mailchimp.com
   - [ ] Create free account
   - [ ] Create new "Audience" (mailing list)
   - [ ] Note audience ID

2. **Get API Credentials**
   - [ ] Account → Extras → API keys
   - [ ] Generate new API key
   - [ ] Format: `{key}-{prefix}` (e.g., `abc123-us21`)
   - [ ] Extract prefix: `us21`

3. **Configure Environment Variables**
   - [ ] Copy `.env.local.example` → `.env.local`
   - [ ] Add:
     ```env
     MAILCHIMP_API_KEY=abc123-us21
     MAILCHIMP_SERVER_PREFIX=us21
     MAILCHIMP_AUDIENCE_ID=xxxxx
     ```
   - [ ] Restart dev server: `npm run dev`

4. **Test Email Signup**
   - [ ] Visit http://localhost:3000
   - [ ] Scroll to waitlist form
   - [ ] Enter test email
   - [ ] Check Mailchimp dashboard → contacts added ✓

**File to verify:** `components/ui/WaitlistForm.tsx`

### Google Analytics 4

**If client wants traffic tracking:**

1. **Create GA4 Property**
   - [ ] Go to analytics.google.com
   - [ ] Create new property
   - [ ] Get Measurement ID (format: `G_XXXXXXXXXX`)

2. **Add to Environment**
   - [ ] `.env.local`:
     ```env
     NEXT_PUBLIC_GA_MEASUREMENT_ID=G_XXXXXXXXXX
     ```
   - [ ] Restart: `npm run dev`

3. **Test Tracking**
   - [ ] Visit site → Open DevTools
   - [ ] Google Analytics should appear in Network tab
   - [ ] Check GA dashboard (takes 24h to show data)

**File:** `app/layout.tsx` (imports GoogleAnalytics)

### Google Tag Manager (Optional)

**If client wants advanced tracking:**

1. **Create GTM Container**
   - [ ] Go to tagmanager.google.com
   - [ ] Create new container for web
   - [ ] Get Container ID (format: `GTM-XXXXXX`)

2. **Add to Environment**
   - [ ] `.env.local`:
     ```env
     NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
     ```

3. **Set Up Conversion Tracking**
   - [ ] In GTM, create triggers for:
     - [ ] Form submissions
     - [ ] Button clicks
     - [ ] Page views
   - [ ] Link to GA4

---

## 🌐 Phase 4: Pages & Routing (3-5 hours)

### Remove Unused Pages
**Files in `/app`:**

**Keep (essential):**
- [ ] `page.tsx` - Homepage
- [ ] `layout.tsx` - Root layout
- [ ] `globals.css` - Styles

**Remove (optional):**
- [ ] `/launch` - If no launch video
- [ ] `/messaging` - If no MackChat demo
- [ ] `/reentry` - If not relevant
- [ ] `/api-test` - If not needed
- [ ] `page.tsx.backup` - Always remove backups

**Commands:**
```bash
# Remove unused directories
rm -rf app/api-test app/messaging app/reentry
```

### Add Client-Specific Pages

**Example structure for SaaS:**
```
/pricing       - Pricing plans
/about         - Company info
/features      - Detailed features
/solutions     - Use case pages
/blog          - Blog/resources
/contact       - Contact form
/faq           - FAQ
```

**To add a page:**
1. Create folder: `app/pricing/`
2. Create file: `app/pricing/page.tsx`
3. Use standard page template from Phase 1

### Update Navigation Links

**File:** `components/ui/Navbar.tsx`

```tsx
// OLD:
<a href="/launch">Launch</a>
<a href="/messaging">Messaging</a>

// NEW:
<a href="/features">Features</a>
<a href="/pricing">Pricing</a>
<a href="/about">About</a>
```

---

## ☁️ Phase 5: Azure Setup (2-3 hours)

### Prerequisites
```bash
# Install Azure CLI
curl https://aka.ms/InstallAzureCLIDeb | bash
az login

# Install Functions CLI
npm install -g azure-functions-core-tools@4
```

### Create Azure Resources

**1. Resource Group**
```bash
az group create \
  --name client-name-rg \
  --location eastus
```
- [ ] Note resource group name

**2. Storage Account (for Functions)**
```bash
az storage account create \
  --name clientnamestg \
  --resource-group client-name-rg \
  --location eastus
```

**3. Function App**
```bash
az functionapp create \
  --resource-group client-name-rg \
  --consumption-plan-location eastus \
  --runtime node \
  --runtime-version 20 \
  --functions-version 4 \
  --name client-name-api \
  --storage-account clientnamestg
```
- [ ] Note function app name

**4. Cosmos DB (Optional, for data storage)**
```bash
az cosmosdb create \
  --name client-name-cosmosdb \
  --resource-group client-name-rg
```

### Create Static Web App

```bash
az staticwebapp create \
  --name client-name-swa \
  --resource-group client-name-rg \
  --source https://github.com/YOUR_ORG/client-repo \
  --branch main \
  --location eastus
```
- [ ] Note deployment token
- [ ] Add to GitHub Secrets as `A_MACKPROJEKT_DEPKEY`

---

## 🚀 Phase 6: Deployment Setup (1-2 hours)

### GitHub Repository

1. **Create Repository**
   - [ ] Create new private repo on GitHub
   - [ ] Clone template:
     ```bash
     git clone <template-repo> client-project
     cd client-project
     ```

2. **Update Git Remote**
   ```bash
   git remote remove origin
   git remote add origin https://github.com/YOUR_ORG/client-project.git
   git push -u origin main
   ```

3. **Add GitHub Secrets**
   - [ ] Go to Settings → Secrets and variables → Actions
   - [ ] Add secrets:
     ```
     A_MACKPROJEKT_DEPKEY        [Get from Azure Static Web App]
     MAILCHIMP_API_KEY           [From Mailchimp]
     MAILCHIMP_SERVER_PREFIX     [From Mailchimp]
     MAILCHIMP_AUDIENCE_ID       [From Mailchimp]
     COSMOS_DB_ENDPOINT          [From Azure, if used]
     COSMOS_DB_KEY               [From Azure, if used]
     JWT_SECRET                  [Generate random string]
     APPLICATIONINSIGHTS_CONNECTION_STRING [Optional]
     ```

### Environment Files

**Local Development:**
```bash
# Copy example to local
cp .env.local.example .env.local

# Edit with client secrets
# Save (git ignores .env.local)
```

**Production (GitHub Secrets):**
- [ ] All secrets added to GitHub Actions
- [ ] CI/CD workflow will inject at deploy time

### GitHub Actions Workflow

**File:** `.github/workflows/azure-static-web-apps-*.yml`

**What it does:**
1. Triggers on push to `main`
2. Runs `npm run build`
3. Deploys `/out` folder to Azure
4. Auto-scales functions

**Verify workflow:**
- [ ] Push to main branch
- [ ] Check GitHub Actions tab
- [ ] Watch deployment progress
- [ ] Check Azure Static Web App when complete

---

## ✅ Phase 7: Pre-Launch Testing (2-3 hours)

### Functional Testing

**Homepage:**
- [ ] All sections load correctly
- [ ] Images visible
- [ ] Links work (test 10 random links)
- [ ] Buttons clickable
- [ ] Forms submit successfully
- [ ] No console errors (DevTools)

**Responsive:**
- [ ] Mobile (375px) - buttons accessible, readable
- [ ] Tablet (768px) - layout clean
- [ ] Desktop (1920px) - not too stretched
- [ ] Test on actual devices if possible

**Dark/Light Mode:**
- [ ] Theme toggle works
- [ ] Preference persists after refresh
- [ ] Colors readable in both modes
- [ ] Test system preference (OS setting)

**Forms:**
- [ ] Email validation works
- [ ] Error messages display
- [ ] Submit success message shows
- [ ] Data appears in Mailchimp/backend

### Performance Testing

```bash
# Lighthouse score (Google)
npm run build
# Visit deployed site, open DevTools, Lighthouse tab
# Target: 90+ score
```

**Checklist:**
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total blocking time < 200ms

### Security Testing

- [ ] No console errors
- [ ] No exposed API keys
- [ ] HTTPS enabled (Azure default)
- [ ] Form submissions encrypted
- [ ] No sensitive data in localStorage
- [ ] CORS properly configured

### SEO Testing

```bash
# Check meta tags
# Visit site → Right-click → Inspect → <head> section
```

- [ ] Page title present
- [ ] Meta description present
- [ ] OG tags present
- [ ] Favicon loads
- [ ] Robots.txt accessible
- [ ] Structured data (Schema.org) valid

**Test with:**
- [ ] Google Search Console (submit sitemap)
- [ ] Bing Webmaster Tools
- [ ] SEO browser extensions

### Browser Compatibility

- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

**Test:** Responsive Design Mode in DevTools

---

## 📋 Phase 8: Launch Checklist (1 hour before)

### Final Verification
- [ ] All content finalized (no typos)
- [ ] Brand colors correct
- [ ] Logo/favicon in place
- [ ] All links working
- [ ] Forms tested
- [ ] Email capture working
- [ ] Analytics tracking
- [ ] No console errors

### Domain Setup
- [ ] Domain purchased (GoDaddy, Namecheap, etc.)
- [ ] DNS records updated to point to Azure:
  ```
  CNAME: yourdomain.com → xxx.azurestaticapps.net
  TXT: Azure domain verification record
  ```
- [ ] SSL certificate auto-provisioned (Azure handles)
- [ ] HTTPS working (check browser lock icon)

### Post-Launch
- [ ] Monitor Azure Static Web App dashboard
- [ ] Check Application Insights for errors
- [ ] Verify analytics data flowing
- [ ] Test email delivery (check Mailchimp)
- [ ] Monitor Lighthouse scores
- [ ] Get user feedback

### Documentation
- [ ] Client gets access to:
  - [ ] GitHub repository
  - [ ] Azure dashboard
  - [ ] Mailchimp account
  - [ ] Google Analytics property
  - [ ] Environment variables
  - [ ] Admin passwords (secure handoff)
- [ ] Create README for client team
- [ ] Setup handoff meeting

---

## 🔄 Maintenance Tasks (Ongoing)

### Weekly
- [ ] Monitor error logs (Application Insights)
- [ ] Check Mailchimp unsubscribe rates
- [ ] Verify links still working

### Monthly
- [ ] Lighthouse performance report
- [ ] Review Google Analytics data
- [ ] Check Azure cost/usage
- [ ] Update dependencies: `npm update`

### Quarterly
- [ ] Security audit (dependencies)
- [ ] SEO audit (rankings, traffic)
- [ ] Content refresh (if needed)
- [ ] Plan next feature release

### Annually
- [ ] Update Next.js version
- [ ] Update Tailwind CSS
- [ ] Security review
- [ ] Performance optimization

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Deployment Fails
- [ ] Check GitHub Actions logs
- [ ] Verify all GitHub Secrets are set
- [ ] Check Azure Static Web App logs
- [ ] Clear build cache in Azure

### Email Not Sending
- [ ] Verify Mailchimp API key in `.env.local`
- [ ] Check Mailchimp audience ID
- [ ] Test with Mailchimp sandbox
- [ ] Check Azure Function logs

### Styling Looks Wrong
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Clear Tailwind cache: `npm run build -- --reset`
- [ ] Check color values in `tailwind.config.ts`
- [ ] Verify TailwindCSS installed: `npm list tailwindcss`

### Form Not Submitting
- [ ] Check browser console for errors
- [ ] Verify API endpoint exists
- [ ] Check CORS configuration
- [ ] Verify Azure Function running

---

## 📞 Support Resources

- **Next.js Issues:** https://github.com/vercel/next.js/issues
- **Tailwind Issues:** https://github.com/tailwindlabs/tailwindcss/issues
- **Azure Functions:** https://learn.microsoft.com/azure/azure-functions
- **GitHub Actions:** https://docs.github.com/actions

---

**Estimated Total Setup Time:** 16-26 hours  
**Difficulty Level:** Intermediate (requires basic coding knowledge)  
**Date Created:** January 29, 2026

---

*Use this checklist for every new client project. It ensures consistent quality and reduces setup time by 60%.*
