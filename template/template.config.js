/**
 * Template Configuration
 * 
 * This file contains configuration for your website.
 * Values are injected during project creation by the CLI tool.
 */

module.exports = {
  // Client information
  client: {
    name: "{{CLIENT_NAME}}",
    domain: "{{CLIENT_DOMAIN}}",
    email: "{{CONTACT_EMAIL}}",
    description: "{{COMPANY_DESCRIPTION}}"
  },
  
  // Brand colors
  theme: {
    colors: {
      primary: "{{PRIMARY_COLOR}}",      // Main brand color
      secondary: "{{SECONDARY_COLOR}}",  // Secondary brand color
      accent: "{{ACCENT_COLOR}}"         // Accent color
    }
  },
  
  // Feature flags - Enable/disable features
  features: {
    blog: false,                // Blog/articles section
    shop: false,                // E-commerce functionality
    chatbot: true,              // AI chatbot assistant
    analytics: true,            // Google Analytics tracking
    newsletter: true,           // Email newsletter signup
    darkMode: true,             // Dark mode toggle
    cookieConsent: true         // GDPR cookie consent banner
  },
  
  // Social media links (optional)
  social: {
    twitter: "{{TWITTER_URL}}",
    linkedin: "{{LINKEDIN_URL}}",
    facebook: "{{FACEBOOK_URL}}",
    instagram: "{{INSTAGRAM_URL}}",
    github: "{{GITHUB_URL}}"
  },
  
  // Integrations
  integrations: {
    // Mailchimp configuration
    mailchimp: {
      enabled: false,
      apiKey: "",
      listId: "",
      serverPrefix: ""
    },
    
    // Google Analytics configuration
    googleAnalytics: {
      enabled: true,
      measurementId: "{{GA_MEASUREMENT_ID}}"
    },
    
    // Google Tag Manager configuration
    googleTagManager: {
      enabled: false,
      containerId: "{{GTM_ID}}"
    },
    
    // Azure Application Insights
    appInsights: {
      enabled: false,
      connectionString: ""
    }
  },
  
  // Navigation menu items
  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" }
    ],
    footer: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  },
  
  // SEO settings
  seo: {
    defaultTitle: "{{CLIENT_NAME}}",
    defaultDescription: "{{COMPANY_DESCRIPTION}}",
    keywords: [],
    ogImage: "/logos/og-image.png"
  }
};
