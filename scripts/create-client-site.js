#!/usr/bin/env node

/**
 * A MackProjekt Client Site Generator
 * 
 * This script creates a new client website from the template.
 * It prompts for client information and automatically sets up the project.
 * 
 * Usage:
 *   node scripts/create-client-site.js                    # Interactive mode
 *   node scripts/create-client-site.js --config config.json  # Config file mode
 *   node scripts/create-client-site.js --name "Client" --slug client-name --domain client.com --primary-color "#3B82F6" --output ../client-site  # CLI flags mode
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for prettier output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Helper functions for colored output
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  step: (msg) => console.log(`${colors.cyan}→${colors.reset} ${msg}`),
};

/**
 * Create readline interface for user input
 */
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * Prompt user for input
 */
function question(rl, query) {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}?${colors.reset} ${query}: `, resolve);
  });
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];
    
    switch (arg) {
      case '--name':
        config.clientName = nextArg;
        i++;
        break;
      case '--slug':
        config.projectName = nextArg;
        i++;
        break;
      case '--domain':
        config.domain = nextArg;
        i++;
        break;
      case '--primary-color':
        config.primaryColor = nextArg;
        i++;
        break;
      case '--secondary-color':
        config.secondaryColor = nextArg;
        i++;
        break;
      case '--accent-color':
        config.accentColor = nextArg;
        i++;
        break;
      case '--email':
        config.contactEmail = nextArg;
        i++;
        break;
      case '--description':
        config.companyDescription = nextArg;
        i++;
        break;
      case '--output':
        config.outputPath = nextArg;
        i++;
        break;
      case '--config':
        const configPath = nextArg;
        try {
          const configFile = fs.readFileSync(configPath, 'utf8');
          Object.assign(config, JSON.parse(configFile));
        } catch (err) {
          log.error(`Failed to load config file: ${err.message}`);
          process.exit(1);
        }
        i++;
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
    }
  }
  
  return config;
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
${colors.bright}A MackProjekt Client Site Generator${colors.reset}

${colors.cyan}Usage:${colors.reset}
  node scripts/create-client-site.js [options]

${colors.cyan}Options:${colors.reset}
  --name <name>              Client name
  --slug <slug>              Project slug (lowercase, hyphens)
  --domain <domain>          Client domain (e.g., client.com)
  --primary-color <color>    Primary brand color (hex)
  --secondary-color <color>  Secondary brand color (hex)
  --accent-color <color>     Accent color (hex)
  --email <email>            Contact email
  --description <desc>       Company description
  --output <path>            Output directory path
  --config <file>            Load configuration from JSON file
  --help, -h                 Show this help message

${colors.cyan}Examples:${colors.reset}
  ${colors.yellow}# Interactive mode${colors.reset}
  node scripts/create-client-site.js

  ${colors.yellow}# Non-interactive mode${colors.reset}
  node scripts/create-client-site.js \\
    --name "Acme Corporation" \\
    --slug acme-corp \\
    --domain acmecorp.com \\
    --primary-color "#3B82F6" \\
    --output ../acme-corp

  ${colors.yellow}# Using config file${colors.reset}
  node scripts/create-client-site.js --config client-config.json
  `);
}

/**
 * Validate configuration
 */
function validateConfig(config) {
  const errors = [];
  
  if (!config.clientName || config.clientName.trim() === '') {
    errors.push('Client name is required');
  }
  
  if (!config.projectName || config.projectName.trim() === '') {
    errors.push('Project slug is required');
  } else if (!/^[a-z0-9-]+$/.test(config.projectName)) {
    errors.push('Project slug must contain only lowercase letters, numbers, and hyphens');
  }
  
  if (!config.domain || config.domain.trim() === '') {
    errors.push('Domain is required');
  }
  
  if (!config.primaryColor || !/^#[0-9A-Fa-f]{6}$/.test(config.primaryColor)) {
    errors.push('Primary color must be a valid hex color (e.g., #3B82F6)');
  }
  
  if (!config.contactEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail)) {
    errors.push('Valid contact email is required');
  }
  
  return errors;
}

/**
 * Interactive prompts for configuration
 */
async function promptForConfig() {
  const rl = createInterface();
  const config = {};
  
  console.log(`\n${colors.bright}🚀 A MackProjekt Client Site Generator${colors.reset}\n`);
  
  // Client name
  config.clientName = await question(rl, 'Client name (e.g., Acme Corporation)');
  
  // Project slug (auto-generate from client name)
  const defaultSlug = config.clientName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const slugInput = await question(rl, `Project slug [${defaultSlug}]`);
  config.projectName = slugInput || defaultSlug;
  
  // Domain
  config.domain = await question(rl, 'Domain (e.g., acmecorp.com)');
  
  // Primary color
  const primaryInput = await question(rl, 'Primary brand color [#38bdf8]');
  config.primaryColor = primaryInput || '#38bdf8';
  
  // Secondary color
  const secondaryInput = await question(rl, 'Secondary brand color [#2dd4bf]');
  config.secondaryColor = secondaryInput || '#2dd4bf';
  
  // Accent color
  const accentInput = await question(rl, 'Accent color [#a78bfa]');
  config.accentColor = accentInput || '#a78bfa';
  
  // Contact email
  config.contactEmail = await question(rl, 'Contact email');
  
  // Company description
  const descInput = await question(rl, 'Company description (optional)');
  config.companyDescription = descInput || `${config.clientName} - Professional services and solutions`;
  
  // Social media (optional)
  console.log(`\n${colors.cyan}Social Media Links (optional - press Enter to skip):${colors.reset}`);
  config.twitterUrl = await question(rl, 'Twitter URL');
  config.linkedinUrl = await question(rl, 'LinkedIn URL');
  config.facebookUrl = await question(rl, 'Facebook URL');
  config.instagramUrl = await question(rl, 'Instagram URL');
  
  // Features
  console.log(`\n${colors.cyan}Features (y/n):${colors.reset}`);
  const enableChatbot = await question(rl, 'Enable chatbot? [Y/n]');
  config.enableChatbot = !enableChatbot || enableChatbot.toLowerCase() !== 'n';
  
  const enableAnalytics = await question(rl, 'Enable analytics? [Y/n]');
  config.enableAnalytics = !enableAnalytics || enableAnalytics.toLowerCase() !== 'n';
  
  // Output path
  const defaultOutput = path.join(process.cwd(), '..', config.projectName);
  const outputInput = await question(rl, `Output path [${defaultOutput}]`);
  config.outputPath = outputInput || defaultOutput;
  
  rl.close();
  
  return config;
}

/**
 * Copy directory recursively
 */
function copyDirectory(src, dest, replacements) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, replacements);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      
      // Replace placeholders in file content
      Object.keys(replacements).forEach(placeholder => {
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        content = content.replace(regex, replacements[placeholder]);
      });
      
      fs.writeFileSync(destPath, content, 'utf8');
    }
  }
}

/**
 * Main function to create client site
 */
async function createClientSite() {
  try {
    // Parse command line arguments
    let config = parseArgs();
    
    // If no config provided via args, prompt interactively
    if (Object.keys(config).length === 0 || !config.clientName) {
      config = await promptForConfig();
    }
    
    // Validate configuration
    const errors = validateConfig(config);
    if (errors.length > 0) {
      log.error('Configuration validation failed:');
      errors.forEach(err => console.log(`  - ${err}`));
      process.exit(1);
    }
    
    // Display configuration summary
    console.log(`\n${colors.bright}Configuration Summary:${colors.reset}`);
    console.log(`  Client Name:    ${config.clientName}`);
    console.log(`  Project Slug:   ${config.projectName}`);
    console.log(`  Domain:         ${config.domain}`);
    console.log(`  Primary Color:  ${config.primaryColor}`);
    console.log(`  Output Path:    ${config.outputPath}`);
    
    // Confirm before proceeding
    const rl = createInterface();
    const confirm = await question(rl, '\nProceed with project creation? [Y/n]');
    rl.close();
    
    if (confirm && confirm.toLowerCase() === 'n') {
      log.info('Project creation cancelled.');
      return;
    }
    
    console.log('');
    
    // Create project directory
    log.step('Creating project directory...');
    const projectPath = path.resolve(config.outputPath);
    
    if (fs.existsSync(projectPath)) {
      log.error(`Directory already exists: ${projectPath}`);
      log.error('Please choose a different output path or remove the existing directory.');
      process.exit(1);
    }
    
    fs.mkdirSync(projectPath, { recursive: true });
    log.success(`Created directory: ${projectPath}`);
    
    // Prepare replacements
    const replacements = {
      '{{CLIENT_NAME}}': config.clientName,
      '{{PROJECT_NAME}}': config.projectName,
      '{{CLIENT_DOMAIN}}': config.domain,
      '{{PRIMARY_COLOR}}': config.primaryColor,
      '{{SECONDARY_COLOR}}': config.secondaryColor || '#2dd4bf',
      '{{ACCENT_COLOR}}': config.accentColor || '#a78bfa',
      '{{CONTACT_EMAIL}}': config.contactEmail,
      '{{COMPANY_DESCRIPTION}}': config.companyDescription,
      '{{TWITTER_URL}}': config.twitterUrl || '',
      '{{LINKEDIN_URL}}': config.linkedinUrl || '',
      '{{FACEBOOK_URL}}': config.facebookUrl || '',
      '{{INSTAGRAM_URL}}': config.instagramUrl || '',
      '{{GITHUB_URL}}': '',
      '{{GA_MEASUREMENT_ID}}': '',
      '{{GTM_ID}}': '',
      '{{ENABLE_CHATBOT}}': config.enableChatbot ? 'true' : 'false',
      '{{ENABLE_ANALYTICS}}': config.enableAnalytics ? 'true' : 'false',
      '{{ENABLE_NEWSLETTER}}': 'true',
    };
    
    // Copy template files
    log.step('Copying template files...');
    const templatePath = path.join(__dirname, '..', 'template');
    copyDirectory(templatePath, projectPath, replacements);
    log.success('Template files copied');
    
    // Rename template files
    log.step('Processing template files...');
    const packageTemplatePath = path.join(projectPath, 'package.template.json');
    const packagePath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageTemplatePath)) {
      let packageContent = fs.readFileSync(packageTemplatePath, 'utf8');
      Object.keys(replacements).forEach(placeholder => {
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        packageContent = packageContent.replace(regex, replacements[placeholder]);
      });
      fs.writeFileSync(packagePath, packageContent, 'utf8');
      fs.unlinkSync(packageTemplatePath);
    }
    
    const tailwindTemplatePath = path.join(projectPath, 'tailwind.config.template.ts');
    const tailwindPath = path.join(projectPath, 'tailwind.config.ts');
    if (fs.existsSync(tailwindTemplatePath)) {
      let tailwindContent = fs.readFileSync(tailwindTemplatePath, 'utf8');
      Object.keys(replacements).forEach(placeholder => {
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        tailwindContent = tailwindContent.replace(regex, replacements[placeholder]);
      });
      fs.writeFileSync(tailwindPath, tailwindContent, 'utf8');
      fs.unlinkSync(tailwindTemplatePath);
    }
    
    const staticwebappTemplatePath = path.join(projectPath, 'staticwebapp.config.template.json');
    const staticwebappPath = path.join(projectPath, 'staticwebapp.config.json');
    if (fs.existsSync(staticwebappTemplatePath)) {
      fs.renameSync(staticwebappTemplatePath, staticwebappPath);
    }
    
    log.success('Template files processed');
    
    // Create .env.local from .env.example
    log.step('Creating environment file...');
    const envExamplePath = path.join(projectPath, '.env.example');
    const envLocalPath = path.join(projectPath, '.env.local');
    if (fs.existsSync(envExamplePath)) {
      let envContent = fs.readFileSync(envExamplePath, 'utf8');
      Object.keys(replacements).forEach(placeholder => {
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        envContent = envContent.replace(regex, replacements[placeholder]);
      });
      fs.writeFileSync(envLocalPath, envContent, 'utf8');
      log.success('Created .env.local');
    }
    
    // Create PROJECT_SETUP.md with next steps
    log.step('Creating setup guide...');
    const setupContent = `# ${config.clientName} - Project Setup

## ✅ Project Created Successfully!

Your new website has been generated with the following configuration:

- **Client Name**: ${config.clientName}
- **Project Name**: ${config.projectName}
- **Domain**: ${config.domain}
- **Primary Color**: ${config.primaryColor}
- **Contact Email**: ${config.contactEmail}

## 📋 Next Steps

### 1. Navigate to Project
\`\`\`bash
cd ${projectPath}
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see your site!

### 4. Customize Your Site

#### Update Logo
- Replace files in \`public/logos/\`
- See \`public/logos/README.md\` for specifications

#### Update Content
- Homepage: \`app/page.tsx\`
- About page: \`app/about/page.tsx\`
- Contact page: \`app/contact/page.tsx\`
- Navigation: \`components/ui/Navbar.tsx\`

#### Update Styles
- Colors are already configured in \`tailwind.config.ts\`
- Modify as needed for fine-tuning

### 5. Configure Analytics (Optional)

Add your Google Analytics ID to \`.env.local\`:
\`\`\`
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
\`\`\`

### 6. Deploy

#### To Azure Static Web Apps:
\`\`\`bash
# Build your project
npm run build

# Deploy using Azure CLI or GitHub Actions
\`\`\`

#### To Vercel:
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

## 📖 Documentation

- \`README.md\` - Project overview
- \`SETUP_GUIDE.md\` - Detailed setup instructions
- \`template.config.js\` - Configuration reference

## 🆘 Need Help?

- Review the documentation files
- Check [Next.js documentation](https://nextjs.org/docs)
- Contact A MackProjekt support

---

**Happy building!** 🚀
`;
    
    fs.writeFileSync(path.join(projectPath, 'PROJECT_SETUP.md'), setupContent, 'utf8');
    log.success('Created PROJECT_SETUP.md');
    
    // Install dependencies
    log.step('Installing dependencies (this may take a few minutes)...');
    try {
      await execAsync('npm install', { cwd: projectPath });
      log.success('Dependencies installed');
    } catch (err) {
      log.warning('Failed to install dependencies automatically');
      log.info('Please run "npm install" manually in the project directory');
    }
    
    // Initialize git repository
    log.step('Initializing git repository...');
    try {
      await execAsync('git init', { cwd: projectPath });
      await execAsync('git add .', { cwd: projectPath });
      await execAsync(`git commit -m "Initial commit: ${config.clientName} website"`, { cwd: projectPath });
      log.success('Git repository initialized with initial commit');
    } catch (err) {
      log.warning('Failed to initialize git repository');
      log.info('You can initialize git manually later');
    }
    
    // Success message
    console.log(`\n${colors.bright}${colors.green}✨ Project created successfully!${colors.reset}\n`);
    console.log(`${colors.bright}📂 Location:${colors.reset} ${projectPath}`);
    console.log(`\n${colors.bright}🚀 Next steps:${colors.reset}`);
    console.log(`   1. ${colors.cyan}cd ${config.outputPath}${colors.reset}`);
    console.log(`   2. ${colors.cyan}npm run dev${colors.reset}`);
    console.log(`   3. Open ${colors.cyan}http://localhost:3000${colors.reset}`);
    console.log(`   4. Read ${colors.cyan}PROJECT_SETUP.md${colors.reset} for detailed instructions`);
    console.log('');
    
  } catch (err) {
    log.error(`An error occurred: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
}

// Run the script
createClientSite();
