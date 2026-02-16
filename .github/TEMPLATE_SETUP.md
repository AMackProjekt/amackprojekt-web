# Using This Repository as a Template

This guide explains how to use the amackprojekt-web repository as a template for creating new client websites.

## Option 1: GitHub Template Feature (Recommended for GitHub Users)

### Step 1: Use This Template

1. Go to the repository on GitHub
2. Click the green **"Use this template"** button at the top
3. Choose "Create a new repository"
4. Fill in:
   - **Owner**: Your username or organization
   - **Repository name**: e.g., `client-name-website`
   - **Description**: Brief description of the client project
   - **Visibility**: Private (recommended for client work)
5. Click **"Create repository from template"**

### Step 2: Clone Your New Repository

```bash
git clone https://github.com/your-username/client-name-website.git
cd client-name-website
```

### Step 3: Run CLI Generator

```bash
npm install
npm run create-client-site
```

Follow the prompts to customize for your client.

---

## Option 2: Fork and Customize

### When to Fork
- You want to contribute changes back to the template
- You want to keep sync with template updates

### Steps

1. Click **"Fork"** button on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/amackprojekt-web.git
   cd amackprojekt-web
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/AMackProjekt/amackprojekt-web.git
   ```
4. Run CLI generator for client customization:
   ```bash
   npm install
   npm run create-client-site
   ```

### Keeping Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge changes from template
git merge upstream/main

# Push to your fork
git push origin main
```

---

## Option 3: Direct Clone with CLI

### Best For
- Quick one-off projects
- Don't need GitHub integration
- Local development only

### Steps

```bash
# Clone repository
git clone https://github.com/AMackProjekt/amackprojekt-web.git my-client-site
cd my-client-site

# Install dependencies
npm install

# Run CLI generator
npm run create-client-site
```

This creates a new project in `../your-client-name/` with all customizations applied.

---

## Option 4: Download ZIP

### Steps

1. Go to repository on GitHub
2. Click **"Code"** → **"Download ZIP"**
3. Extract ZIP to your desired location
4. Open terminal in extracted directory
5. Run:
   ```bash
   npm install
   npm run create-client-site
   ```

---

## What Happens After Using Template?

### File Structure After CLI Generation

```
your-new-project/
├── app/              # Your customized pages
├── components/       # UI components
├── public/           # Your logos and assets
├── .env.local        # Your environment variables
├── tailwind.config.ts # Your brand colors
└── package.json      # Your project name
```

### Automatic Replacements

The CLI automatically replaces:
- ✅ `{{CLIENT_NAME}}` → Your client name
- ✅ `{{CLIENT_DOMAIN}}` → Your domain
- ✅ `{{PRIMARY_COLOR}}` → Your brand color
- ✅ All other placeholders

### What You Need to Do

1. **Add Logo**: Replace files in `public/logos/`
2. **Customize Content**: Edit pages in `app/`
3. **Deploy**: Push to GitHub for automatic deployment

---

## Deployment Options

### Azure Static Web Apps (Recommended)

**Prerequisites:**
- Azure account
- Azure CLI installed

**Steps:**
```bash
az staticwebapp create \
  --name client-site \
  --resource-group my-rg \
  --source https://github.com/your-username/client-site \
  --location centralus \
  --branch main \
  --app-location "/" \
  --output-location "out"
```

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

---

## Best Practices

### For Client Work

1. **Use Private Repositories** - Protect client code
2. **Document Customizations** - Keep notes of changes
3. **Version Control** - Commit frequently with clear messages
4. **Environment Variables** - Never commit secrets
5. **Test Thoroughly** - Check all pages before launch

### For Template Maintenance

1. **Keep Template Updated** - Pull latest changes regularly
2. **Report Issues** - Open GitHub issues for bugs
3. **Contribute Back** - Submit PRs for improvements
4. **Documentation** - Update docs when making changes

---

## Troubleshooting

### "Use this template" Button Not Showing

- Make sure you're logged into GitHub
- Repository owner may need to enable template feature
- Try forking instead

### CLI Generator Fails

```bash
# Check Node.js version (requires 18+)
node --version

# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run create-client-site
```

### Permission Errors

```bash
# Make script executable (Unix/Mac)
chmod +x scripts/create-client-site.js

# Or run directly with node
node scripts/create-client-site.js
```

---

## Support

Need help?

- 📖 Review [TEMPLATE_GUIDE.md](../TEMPLATE_GUIDE.md)
- 📖 Check [CUSTOMIZATION_EXAMPLES.md](../CUSTOMIZATION_EXAMPLES.md)
- 🐛 Open a GitHub Issue
- 📧 Email: support@mackprojekt.com

---

## Contributing

Want to improve the template?

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

**Built with ❤️ by A MackProjekt**

*Making client website launches faster and easier, one project at a time.*
