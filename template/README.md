# {{CLIENT_NAME}} Website

Welcome to your new website powered by the A MackProjekt template system!

## Quick Start

This project has been pre-configured with your branding and settings. To get started:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Project Structure

```
/
├── app/              # Next.js pages and routes
├── components/       # Reusable UI components
├── lib/              # Utility functions and contexts
├── public/           # Static assets (images, logos, etc.)
├── .env.local        # Environment variables (created from .env.example)
└── tailwind.config.ts # Design system configuration
```

## Customization

### Update Your Content
1. **Homepage**: Edit `app/page.tsx`
2. **About Page**: Edit `app/about/page.tsx`
3. **Contact Page**: Edit `app/contact/page.tsx`
4. **Navigation**: Edit `components/ui/Navbar.tsx`

### Update Your Branding
1. **Colors**: Already configured in `tailwind.config.ts`
2. **Logo**: Replace files in `public/logos/`
3. **Metadata**: Edit `app/layout.tsx`

### Environment Variables
Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SITE_URL` - Your domain
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics (optional)
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager (optional)

## Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Deployment

This project is optimized for deployment on:
- **Azure Static Web Apps** (recommended)
- Vercel
- Netlify
- Any static hosting provider

See `SETUP_GUIDE.md` for detailed deployment instructions.

## Documentation

- `SETUP_GUIDE.md` - Complete setup and deployment guide
- `CUSTOMIZATION_EXAMPLES.md` - Real-world customization examples
- `TEMPLATE_GUIDE.md` - Comprehensive template documentation

## Support

For questions or issues, refer to the documentation or contact A MackProjekt support.

## License

MIT License - See LICENSE file for details.

---

Built with ❤️ using the A MackProjekt template system
