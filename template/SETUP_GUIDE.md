# {{CLIENT_NAME}} Website - Setup Guide

Complete step-by-step guide to set up and deploy your new website.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Environment Configuration](#environment-configuration)
4. [Development](#development)
5. [Customization](#customization)
6. [Deployment](#deployment)
7. [Post-Deployment](#post-deployment)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- [Node.js](https://nodejs.org/) 18.x or later installed
- [Git](https://git-scm.com/) installed
- A code editor (VS Code recommended)
- GitHub account (for deployment)
- Azure account (if using Azure Static Web Apps)

## Initial Setup

### 1. Install Dependencies

```bash
cd {{PROJECT_NAME}}
npm install
```

This will install all required packages including Next.js, React, Tailwind CSS, and other dependencies.

### 2. Environment Variables

Create your local environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://{{CLIENT_DOMAIN}}
NEXT_PUBLIC_SITE_NAME={{CLIENT_NAME}}

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
NEXT_PUBLIC_GTM_ID=your-gtm-id

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL={{CONTACT_EMAIL}}
```

### 3. Verify Installation

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see your website with placeholder content.

## Environment Configuration

### Google Analytics Setup (Optional)

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (starts with `G-`)
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Google Tag Manager Setup (Optional)

1. Create a GTM container at [tagmanager.google.com](https://tagmanager.google.com)
2. Get your Container ID (starts with `GTM-`)
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

## Development

### File Structure

```
app/
├── layout.tsx          # Root layout, metadata, providers
├── page.tsx            # Homepage
├── about/page.tsx      # About page
├── contact/page.tsx    # Contact page
└── globals.css         # Global styles

components/ui/
├── Navbar.tsx          # Navigation header
├── Footer.tsx          # Site footer
├── Button.tsx          # Reusable button component
├── GlowCard.tsx        # Card with glow effects
└── ...                 # Other UI components

lib/
├── auth.tsx            # Authentication context (if needed)
├── theme.tsx           # Theme provider
└── cn.ts               # Utility for class names
```

### Development Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check for code issues
```

### Making Changes

1. **Edit Content**: Modify files in `/app` directory
2. **Edit Components**: Modify files in `/components` directory
3. **Edit Styles**: Modify `tailwind.config.ts` or component-specific styles
4. **View Changes**: Changes auto-reload in browser (hot reload enabled)

## Customization

### 1. Update Logo

Replace these files in `public/logos/`:
- `primary-logo.png` - Your main logo (recommended: 300x80px)
- `icon.png` - Favicon (recommended: 512x512px)

### 2. Update Colors

Your brand colors are already configured in `tailwind.config.ts`:

```typescript
colors: {
  brand: "{{PRIMARY_COLOR}}",      // Primary brand color
  brand2: "{{SECONDARY_COLOR}}",   // Secondary color
  accent: "{{ACCENT_COLOR}}",      // Accent color
}
```

To change them, edit `tailwind.config.ts` lines 38-40.

### 3. Update Navigation

Edit `components/ui/Navbar.tsx` to modify navigation links:

```tsx
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  // Add more items here
];
```

### 4. Update Homepage Content

Edit `app/page.tsx` to customize:
- Hero section text
- Features section
- Call-to-action buttons
- Any other content

### 5. Update Metadata (SEO)

Edit `app/layout.tsx` to update:
- Page title
- Meta description
- Open Graph tags
- Twitter card tags

## Deployment

### Option 1: Azure Static Web Apps (Recommended)

1. **Create Azure Static Web App**:
   ```bash
   az staticwebapp create \
     --name {{PROJECT_NAME}} \
     --resource-group your-rg \
     --source https://github.com/your-username/{{PROJECT_NAME}} \
     --location centralus \
     --branch main \
     --app-location "/" \
     --output-location "out"
   ```

2. **Configure GitHub Secrets**:
   - Go to GitHub repository → Settings → Secrets
   - Add required secrets (AZURE_STATIC_WEB_APPS_API_TOKEN, etc.)

3. **Push to Deploy**:
   ```bash
   git push origin main
   ```

4. **Monitor Deployment**:
   - Go to GitHub Actions tab
   - Watch the deployment workflow

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts to link to your account and deploy

### Option 3: Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

## Post-Deployment

### 1. Configure Custom Domain

**Azure Static Web Apps**:
1. Go to Azure Portal → Your Static Web App
2. Click "Custom domains"
3. Add your domain ({{CLIENT_DOMAIN}})
4. Update DNS records as instructed

**Vercel**:
1. Go to Vercel Dashboard → Your Project
2. Click "Domains"
3. Add your domain
4. Update DNS records

### 2. Setup SSL/HTTPS

SSL is automatically configured on:
- Azure Static Web Apps
- Vercel
- Netlify

No additional setup required.

### 3. Test Production Site

Visit your deployed site and verify:
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms submit successfully
- [ ] Images load
- [ ] Mobile responsive
- [ ] Analytics tracking (if enabled)

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port 3000 Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Styles Not Updating

```bash
# Hard refresh browser
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Environment Variables Not Working

1. Ensure `.env.local` exists and has correct values
2. Restart dev server after changing `.env.local`
3. Environment variables must start with `NEXT_PUBLIC_` to be accessible in browser

### Deployment Issues

1. Check GitHub Actions logs for build errors
2. Verify all required secrets are set in GitHub
3. Ensure `next.config.js` has correct output configuration
4. Check Azure portal for deployment status

## Next Steps

1. ✅ Complete this setup guide
2. ✅ Customize your content
3. ✅ Test locally
4. ✅ Deploy to production
5. ✅ Configure custom domain
6. ✅ Test production site
7. 📖 Review [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) for advanced features
8. 📖 Review [CUSTOMIZATION_EXAMPLES.md](CUSTOMIZATION_EXAMPLES.md) for inspiration

## Support

- 📧 Email: support@mackprojekt.com
- 📖 Documentation: [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)
- 🐛 Issues: GitHub Issues

---

**Congratulations!** 🎉 Your website is now set up and ready to go live!
