# 🎯 Modern SaaS Web Template - Quick Start

Welcome! This is a **production-ready, multi-client template** designed for rapid deployment of modern SaaS websites.

## 📚 Documentation

### 1. **FRAMEWORK_TEMPLATE.md** ← START HERE
Complete architectural overview covering:
- Project structure & file organization
- Technology stack (Next.js 16, React 18, Tailwind CSS 3.4)
- 14+ reusable UI components
- Design system with full customization
- Best practices & patterns

**Read this first to understand the bones of the framework.**

### 2. **CLIENT_SETUP_CHECKLIST.md** 
Step-by-step guide for launching each new client project:
- Phase 1: Visual Branding (colors, logo, favicon)
- Phase 2: Content & Copy (homepage, features, navigation)
- Phase 3: Integrations (Mailchimp, GA4, GTM)
- Phase 4: Pages & Routing
- Phase 5: Azure Setup (Functions, Static Web Apps, Cosmos DB)
- Phase 6: Deployment (GitHub, CI/CD, GitHub Secrets)
- Phase 7: Testing & Launch
- Phase 8: Maintenance tasks

**Use this for every new client project - it's a proven workflow.**

### 3. **CODE_SNIPPETS.md**
Copy-paste ready code for common customizations:
- 5 color system examples (SaaS, Healthcare, Finance, Fitness, E-commerce)
- Company information templates
- Page templates (Pricing, About, Hero)
- API integration examples (Mailchimp, custom endpoints)
- Component customization examples
- Utility functions (validation, rate limiting)
- Environment configuration templates

**Refer to this when building specific features.**

---

## 🚀 Quick Start (5 minutes)

### For New Client Project:

```bash
# 1. Clone this repo
git clone <this-repo> client-name
cd client-name

# 2. Install dependencies
npm install
cd api && npm install && cd ..

# 3. Create .env.local (copy from .env.local.example)
cp .env.local.example .env.local

# 4. Start development
npm run dev              # Terminal 1: Frontend :3000
cd api && npm start     # Terminal 2: Backend :7071

# 5. Open browser
# Visit http://localhost:3000
```

### Customization (in order):

1. **Brand Colors** → `tailwind.config.ts` (15-30 minutes)
2. **Logo & Favicon** → `public/logos/` (5 minutes)
3. **Content** → `app/page.tsx` + other pages (1-2 hours)
4. **Navigation** → `components/ui/Navbar.tsx` (15 minutes)
5. **Integrations** → `.env.local` + GitHub Secrets (1 hour)
6. **Deploy** → Push to GitHub (auto-deploys to Azure)

**Total setup time: 16-26 hours for a complete client site**

---

## 🏗️ Architecture at a Glance

```
Frontend (Next.js 16 + React 18 + TypeScript)
  ├── Pages: /app/page.tsx, /app/pricing/page.tsx, etc.
  ├── Components: Navbar, Button, GlowCard, etc.
  ├── Styles: Tailwind CSS 3.4 + custom design tokens
  └── Utilities: Auth context, theme provider, analytics

Backend (Azure Functions v4 + TypeScript)
  ├── /api/src/functions/waitlist-subscribe/
  ├── /api/src/functions/auth-login/
  ├── /api/src/utils/mailchimp.ts
  ├── /api/src/utils/cosmos.ts
  └── /api/src/utils/validation.ts

Infrastructure
  ├── Azure Static Web Apps (hosting)
  ├── Azure Functions (serverless API)
  ├── Azure Cosmos DB (database)
  └── GitHub Actions (CI/CD)
```

---

## 📋 File Reference

| File | Purpose | Customize For |
|------|---------|---------------|
| `tailwind.config.ts` | Design tokens (colors, shadows, animations) | Brand colors |
| `app/page.tsx` | Homepage | Main content, CTAs |
| `app/layout.tsx` | Root layout & metadata | SEO, company info |
| `components/ui/Navbar.tsx` | Header navigation | Logo, nav items |
| `.env.local.example` | Environment variables | Mailchimp, GA4, API keys |
| `.github/workflows/*.yml` | CI/CD pipeline | Azure deployment |
| `public/logos/` | Brand assets | Logo & favicon |

---

## 🎨 Design System

### Colors (Customizable)
```
Primary Brand: #38bdf8 (Sky Blue)
Secondary: #2dd4bf (Teal)
Accent: #a78bfa (Purple)
Background: #06070b (Dark)
Text: rgba(248,250,252,.96) (Off-white)
```

### Components (14+ included)
- Button (variants: primary, ghost, secondary)
- GlowCard (glass morphism with effects)
- Navbar (sticky header with theme toggle)
- SectionHeading (eyebrow + title pattern)
- DashboardSection (KPI layout with charts)
- ElectricEffects (animated text/borders)
- CookieConsent (GDPR banner)
- ChatBot (floating assistant)
- WaitlistForm (email signup)
- LaunchVideo (video player with tracking)
- And 4+ more...

### Typography
```
.h1 - Main headline (responsive sizing)
.h2 - Section heading
.p-lead - Descriptive paragraph
```

---

## 🔧 Key Technologies

| Layer | Tools |
|-------|-------|
| **Frontend** | Next.js 16, React 18, TypeScript 5.7, Tailwind CSS 3.4, Framer Motion 11 |
| **Backend** | Azure Functions v4, TypeScript 4.x |
| **Database** | Azure Cosmos DB (NoSQL) |
| **Email** | Mailchimp SDK |
| **Analytics** | Google Analytics 4, Google Tag Manager |
| **Hosting** | Azure Static Web Apps |
| **CI/CD** | GitHub Actions |
| **Containerization** | Docker + Docker Compose |

---

## ✅ Pre-Launch Checklist

Before deploying to production:

- [ ] All colors updated to client brand
- [ ] Logo and favicon uploaded
- [ ] All page content customized
- [ ] Navigation links working
- [ ] Forms tested (email, contact, etc.)
- [ ] Mailchimp integration verified
- [ ] Google Analytics tracking confirmed
- [ ] Meta tags (title, description) updated
- [ ] Mobile responsive (tested on real device)
- [ ] Lighthouse score 90+
- [ ] No console errors
- [ ] GitHub Secrets added
- [ ] Domain DNS configured
- [ ] HTTPS enabled (Azure default)

---

## 🚀 Deployment

### Development
```bash
npm run dev              # Frontend
cd api && npm start     # Backend (separate terminal)
```

### Production
```bash
# 1. Push to GitHub main branch
git push origin main

# 2. GitHub Actions automatically:
#    - Builds Next.js frontend
#    - Builds Azure Functions backend
#    - Deploys to Azure Static Web Apps
#    - Deploys functions to Azure Functions

# 3. Monitor deployment:
#    - GitHub Actions tab (real-time logs)
#    - Azure portal (resources)
#    - Site goes live at: https://your-domain.com
```

**Deployment takes 3-5 minutes after push.**

---

## 📞 Troubleshooting

### Build Fails
```bash
rm -rf .next node_modules
npm install
npm run build
npx tsc --noEmit  # Check TypeScript errors
```

### Styling Wrong
```bash
# Hard refresh
Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

# Clear Tailwind cache
npm run build -- --reset
```

### Email Not Working
- Check Mailchimp API key in `.env.local`
- Verify audience ID
- Check Azure Function logs for errors

### Deployment Stuck
- Check GitHub Actions logs
- Verify all GitHub Secrets are set
- Check Azure Static Web App build logs

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Azure Functions Docs](https://learn.microsoft.com/azure/azure-functions/)
- [GitHub Actions Docs](https://docs.github.com/actions)

---

## 💡 Tips for Success

1. **Start with colors** - Visual branding first
2. **Then copy** - Update all text content
3. **Then integrations** - Mailchimp, GA4, etc.
4. **Then deploy** - Push to GitHub when ready
5. **Test thoroughly** - Use the checklist

---

## 📊 Performance Targets

- **First Contentful Paint:** < 2 seconds
- **Lighthouse Score:** 90+ 
- **Build Time:** < 1 minute
- **Bundle Size:** ~155KB (gzipped)
- **Pages Generated:** 17+ (static)

---

## 🎯 Next Steps

1. Read **FRAMEWORK_TEMPLATE.md** (understand architecture)
2. Read **CLIENT_SETUP_CHECKLIST.md** (follow the workflow)
3. Use **CODE_SNIPPETS.md** (customize components)
4. Deploy to production (follow deployment guide)

---

## 📝 Version

**Template Version:** 1.0.0  
**Last Updated:** January 29, 2026  
**Next.js:** 16.1.6  
**React:** 18.3.1  
**TypeScript:** 5.7.3  
**Tailwind CSS:** 3.4.17  

---

## 📧 Support

For questions or issues:
1. Check the documentation files
2. Review GitHub Actions logs for deployment issues
3. Check Azure portal for backend issues
4. Review browser console for frontend errors

---

**Happy building! 🚀**

*This template is designed to save 60% of development time on new client projects. Use it, customize it, and scale it to your other clients.*
