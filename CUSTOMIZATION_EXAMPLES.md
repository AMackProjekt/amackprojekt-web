# Customization Examples - Real-World Implementations

This document provides real-world examples of how to customize the A MackProjekt template for different industries and use cases.

## Table of Contents

1. [E-commerce Store](#1-e-commerce-store)
2. [SaaS Landing Page](#2-saas-landing-page)
3. [Professional Portfolio](#3-professional-portfolio)
4. [Non-Profit Organization](#4-non-profit-organization)
5. [Local Business](#5-local-business)
6. [Consulting Firm](#6-consulting-firm)

---

## 1. E-commerce Store

### Overview
Transform the template into an online store for retail products.

### Color Scheme

```typescript
// tailwind.config.ts
colors: {
  brand: "#10B981",      // Fresh green (trust, growth)
  brand2: "#059669",     // Darker green
  accent: "#F59E0B",     // Amber (urgency, sales)
}
```

### Homepage Customization

```tsx
// app/page.tsx
export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />

      {/* Hero with Product Showcase */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="h1">
              <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
                Premium Products
              </span>
              <br />
              Delivered to Your Door
            </h1>
            <p className="mt-6 p-lead">
              Shop our curated collection of high-quality products with fast, 
              free shipping on orders over $50.
            </p>
            <div className="mt-8 flex gap-4">
              <Button variant="solid" onClick={() => window.location.href = '/shop'}>
                Shop Now
              </Button>
              <Button variant="ghost" onClick={() => window.location.href = '/about'}>
                Our Story
              </Button>
            </div>
          </div>
          <GlowCard className="p-8">
            <img 
              src="/images/hero-product.jpg" 
              alt="Featured Product" 
              className="rounded-lg w-full"
            />
          </GlowCard>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mx-auto max-w-container px-7 py-16">
        <SectionHeading
          eyebrow="Shop by Category"
          title="Find What You Love"
        />
        
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((category) => (
            <GlowCard key={category} className="p-8 cursor-pointer hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold text-text mb-2">{category}</h3>
              <p className="text-muted">Browse {category.toLowerCase()}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="mx-auto max-w-container px-7 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-brand/10 p-4">
              <svg className="h-8 w-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-text">Free Shipping</h3>
            <p className="text-muted">On orders over $50</p>
          </div>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-brand2/10 p-4">
              <svg className="h-8 w-8 text-brand2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-text">30-Day Returns</h3>
            <p className="text-muted">No questions asked</p>
          </div>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 p-4">
              <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-text">Secure Checkout</h3>
            <p className="text-muted">SSL encrypted</p>
          </div>
        </div>
      </section>
    </main>
  );
}
```

### Additional Pages

Create `app/shop/page.tsx` for product listings:

```tsx
"use client";
import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

const products = [
  { id: 1, name: "Product 1", price: "$49.99", image: "/images/product1.jpg" },
  { id: 2, name: "Product 2", price: "$79.99", image: "/images/product2.jpg" },
  // Add more products
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />

      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <h1 className="h1 text-center mb-12">
          <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
            Our Products
          </span>
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <GlowCard key={product.id} className="p-6">
              <img src={product.image} alt={product.name} className="rounded-lg mb-4" />
              <h3 className="text-xl font-bold text-text">{product.name}</h3>
              <p className="text-2xl font-bold text-brand mt-2">{product.price}</p>
              <Button variant="solid" className="w-full mt-4">
                Add to Cart
              </Button>
            </GlowCard>
          ))}
        </div>
      </section>
    </main>
  );
}
```

---

## 2. SaaS Landing Page

### Overview
Create a landing page for a Software-as-a-Service product.

### Color Scheme

```typescript
// tailwind.config.ts
colors: {
  brand: "#3B82F6",      // Professional blue
  brand2: "#8B5CF6",     // Purple (innovation)
  accent: "#10B981",     // Green (success)
}
```

### Homepage with Pricing

```tsx
// app/page.tsx
export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm text-brand mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
          </span>
          Now in Beta - Try it Free
        </div>
        
        <h1 className="h1">
          Streamline Your Workflow
          <br />
          <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
            10x Productivity
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[760px] p-lead">
          The all-in-one platform that helps teams collaborate, automate, and scale. 
          Join 10,000+ companies already using our solution.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="solid" size="lg">
            Start Free Trial
          </Button>
          <Button variant="ghost" size="lg">
            Watch Demo
          </Button>
        </div>

        <p className="mt-4 text-sm text-muted">No credit card required • 14-day trial</p>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-container px-7 py-16">
        <SectionHeading
          eyebrow="Features"
          title="Everything You Need"
          subtitle="Powerful tools designed for modern teams"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GlowCard className="p-8">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-brand/10 p-3">
              <svg className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-text">Lightning Fast</h3>
            <p className="text-muted">
              Real-time collaboration with instant sync across all devices.
            </p>
          </GlowCard>

          {/* Add more feature cards */}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mx-auto max-w-container px-7 py-16">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="Choose the plan that's right for you"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Starter Plan */}
          <GlowCard className="p-8">
            <h3 className="text-2xl font-bold text-text">Starter</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold text-text">$29</span>
              <span className="text-muted">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2 text-muted">
                <svg className="h-5 w-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Up to 10 users
              </li>
              <li className="flex items-center gap-2 text-muted">
                <svg className="h-5 w-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                10GB storage
              </li>
              <li className="flex items-center gap-2 text-muted">
                <svg className="h-5 w-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Email support
              </li>
            </ul>
            <Button variant="ghost" className="w-full mt-8">
              Get Started
            </Button>
          </GlowCard>

          {/* Pro Plan (Featured) */}
          <GlowCard className="p-8 border-2 border-brand">
            <div className="inline-block bg-brand text-white px-3 py-1 rounded-full text-sm mb-2">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-text">Pro</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold text-text">$99</span>
              <span className="text-muted">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2 text-muted">
                <svg className="h-5 w-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Unlimited users
              </li>
              <li className="flex items-center gap-2 text-muted">
                <svg className="h-5 w-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100GB storage
              </li>
              <li className="flex items-center gap-2 text-muted">
                <svg className="h-5 w-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Priority support
              </li>
              <li className="flex items-center gap-2 text-muted">
                <svg className="h-5 w-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Advanced features
              </li>
            </ul>
            <Button variant="solid" className="w-full mt-8">
              Start Free Trial
            </Button>
          </GlowCard>

          {/* Enterprise Plan */}
          <GlowCard className="p-8">
            <h3 className="text-2xl font-bold text-text">Enterprise</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold text-text">Custom</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2 text-muted">
                <svg className="h-5 w-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Unlimited everything
              </li>
              <li className="flex items-center gap-2 text-muted">
                <svg className="h-5 w-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Dedicated support
              </li>
              <li className="flex items-center gap-2 text-muted">
                <svg className="h-5 w-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Custom integrations
              </li>
            </ul>
            <Button variant="ghost" className="w-full mt-8">
              Contact Sales
            </Button>
          </GlowCard>
        </div>
      </section>
    </main>
  );
}
```

---

## 3. Professional Portfolio

### Overview
Showcase your work and skills with a portfolio site.

### Color Scheme

```typescript
// tailwind.config.ts
colors: {
  brand: "#F59E0B",      // Warm amber (creativity)
  brand2: "#EF4444",     // Red (passion)
  accent: "#8B5CF6",     // Purple (uniqueness)
}
```

### Homepage

```tsx
// app/page.tsx
export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <p className="text-brand font-medium mb-4">Hi, I'm</p>
            <h1 className="h1">
              <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
                Jane Doe
              </span>
            </h1>
            <p className="mt-6 text-2xl text-text font-medium">
              Creative Designer & Developer
            </p>
            <p className="mt-4 p-lead">
              I craft beautiful digital experiences that combine aesthetics with functionality. 
              With 5+ years of experience, I help brands tell their story through design.
            </p>
            <div className="mt-8 flex gap-4">
              <Button variant="solid">View My Work</Button>
              <Button variant="ghost">Contact Me</Button>
            </div>
          </div>

          <GlowCard className="p-0 overflow-hidden">
            <img 
              src="/images/profile.jpg" 
              alt="Jane Doe" 
              className="w-full h-auto"
            />
          </GlowCard>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="mx-auto max-w-container px-7 py-16">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Works"
          subtitle="A collection of my recent projects"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <GlowCard 
              key={item} 
              className="group cursor-pointer overflow-hidden p-0"
            >
              <div className="relative">
                <img 
                  src={`/images/project${item}.jpg`} 
                  alt={`Project ${item}`}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-text">Project Title {item}</h3>
                    <p className="text-muted">Web Design • Development</p>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-container px-7 py-16">
        <SectionHeading
          eyebrow="Skills"
          title="What I Do Best"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {['UI/UX Design', 'Frontend Dev', 'Branding', 'Motion Design'].map((skill) => (
            <GlowCard key={skill} className="p-8 text-center">
              <h3 className="text-xl font-bold text-text">{skill}</h3>
            </GlowCard>
          ))}
        </div>
      </section>
    </main>
  );
}
```

---

## 4. Non-Profit Organization

### Overview
Inspire action and donations for a charitable cause.

### Color Scheme

```typescript
// tailwind.config.ts
colors: {
  brand: "#10B981",      // Hope green
  brand2: "#3B82F6",     // Trust blue
  accent: "#F59E0B",     // Urgency amber
}
```

### Key Features

```tsx
// app/page.tsx - Impact Section
<section className="mx-auto max-w-container px-7 py-16">
  <SectionHeading
    eyebrow="Our Impact"
    title="Making a Difference"
    subtitle="See how your support changes lives"
  />

  <div className="mt-12 grid gap-6 sm:grid-cols-3">
    <GlowCard className="p-8 text-center">
      <div className="text-5xl font-bold text-brand mb-2">10,000+</div>
      <p className="text-text font-medium">Lives Impacted</p>
    </GlowCard>

    <GlowCard className="p-8 text-center">
      <div className="text-5xl font-bold text-brand2 mb-2">$2M+</div>
      <p className="text-text font-medium">Funds Raised</p>
    </GlowCard>

    <GlowCard className="p-8 text-center">
      <div className="text-5xl font-bold text-accent mb-2">50+</div>
      <p className="text-text font-medium">Projects Completed</p>
    </GlowCard>
  </div>
</section>

{/* Donation CTA */}
<section className="mx-auto max-w-container px-7 py-16">
  <GlowCard className="p-12 text-center bg-gradient-to-r from-brand/10 to-brand2/10">
    <h2 className="h2 mb-4">Help Us Make a Difference</h2>
    <p className="mx-auto mb-8 max-w-[600px] text-lg text-muted">
      Your donation directly supports families in need. Every dollar counts.
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      <Button variant="solid" size="lg">Donate Now</Button>
      <Button variant="ghost" size="lg">Become a Volunteer</Button>
    </div>
  </GlowCard>
</section>
```

---

## 5. Local Business

### Overview
Attract local customers for a service-based business (restaurant, salon, etc.).

### Color Scheme

```typescript
// tailwind.config.ts
colors: {
  brand: "#DC2626",      // Bold red (appetite, energy)
  brand2: "#F59E0B",     // Warm amber
  accent: "#10B981",     // Fresh green
}
```

### Features to Add

1. **Location/Map Section**
2. **Hours of Operation**
3. **Phone Number Prominent**
4. **Reviews/Testimonials**

```tsx
// app/page.tsx - Location Section
<section className="mx-auto max-w-container px-7 py-16">
  <SectionHeading
    eyebrow="Visit Us"
    title="Find Our Location"
  />

  <div className="mt-12 grid gap-6 lg:grid-cols-2">
    <GlowCard className="p-8">
      <h3 className="text-2xl font-bold text-text mb-6">Contact Info</h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-brand/10 p-3">
            <svg className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-text">Address</h4>
            <p className="text-muted">123 Main Street<br />Anytown, ST 12345</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-brand/10 p-3">
            <svg className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-text">Phone</h4>
            <a href="tel:+15551234567" className="text-muted hover:text-brand transition-colors">
              (555) 123-4567
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-brand/10 p-3">
            <svg className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-text">Hours</h4>
            <p className="text-muted">
              Mon-Fri: 9AM - 8PM<br />
              Sat-Sun: 10AM - 6PM
            </p>
          </div>
        </div>
      </div>

      <Button variant="solid" className="w-full mt-8">
        Get Directions
      </Button>
    </GlowCard>

    <GlowCard className="p-0 overflow-hidden h-96">
      {/* Embed Google Maps here */}
      <iframe 
        src="https://www.google.com/maps/embed?pb=..." 
        width="100%" 
        height="100%" 
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </GlowCard>
  </div>
</section>
```

---

## 6. Consulting Firm

### Overview
Professional services firm showcasing expertise and driving leads.

### Color Scheme

```typescript
// tailwind.config.ts
colors: {
  brand: "#1E40AF",      // Professional navy blue
  brand2: "#0891B2",     // Trust cyan
  accent: "#10B981",     // Success green
}
```

### Key Sections

```tsx
// app/page.tsx - Services Section
<section className="mx-auto max-w-container px-7 py-16">
  <SectionHeading
    eyebrow="Our Services"
    title="How We Can Help"
    subtitle="Comprehensive solutions for your business challenges"
  />

  <div className="mt-12 space-y-6">
    {[
      {
        title: "Strategy Consulting",
        description: "Develop winning strategies that drive growth and competitive advantage.",
        icon: "📊"
      },
      {
        title: "Digital Transformation",
        description: "Modernize your operations with cutting-edge technology solutions.",
        icon: "🚀"
      },
      {
        title: "Process Optimization",
        description: "Streamline operations and maximize efficiency across your organization.",
        icon: "⚙️"
      }
    ].map((service) => (
      <GlowCard key={service.title} className="p-8">
        <div className="flex items-start gap-6">
          <div className="text-5xl">{service.icon}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-text mb-2">{service.title}</h3>
            <p className="text-muted mb-4">{service.description}</p>
            <Button variant="ghost">Learn More →</Button>
          </div>
        </div>
      </GlowCard>
    ))}
  </div>
</section>

{/* Testimonials */}
<section className="mx-auto max-w-container px-7 py-16">
  <SectionHeading
    eyebrow="Client Success"
    title="What Our Clients Say"
  />

  <div className="mt-12 grid gap-6 lg:grid-cols-2">
    <GlowCard className="p-8">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src="/images/client1.jpg" 
          alt="Client" 
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h4 className="font-bold text-text">John Smith</h4>
          <p className="text-sm text-muted">CEO, Tech Corp</p>
        </div>
      </div>
      <p className="text-muted italic">
        "Working with this team transformed our business. Their expertise and 
        dedication to our success was evident from day one."
      </p>
    </GlowCard>

    {/* Add more testimonials */}
  </div>
</section>
```

---

## General Tips

### Before/After Pattern

For any customization:

**BEFORE (Template):**
```tsx
<h1 className="h1">
  Welcome to {{CLIENT_NAME}}
</h1>
```

**AFTER (Customized):**
```tsx
<h1 className="h1">
  Welcome to Acme Corporation
</h1>
```

### Testing Checklist

After customization:

- [ ] Test all pages on mobile device
- [ ] Verify all links work
- [ ] Check color contrast (WebAIM)
- [ ] Test forms submission
- [ ] Verify images load correctly
- [ ] Run Lighthouse audit (aim for 90+)
- [ ] Test with screen reader (accessibility)
- [ ] Check loading speed (< 3 seconds)

---

## Need More Help?

- Review [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) for detailed component docs
- Check [SETUP_GUIDE.md](template/SETUP_GUIDE.md) for deployment instructions
- Explore the existing codebase for more examples

**Remember:** Start with colors and logo, then customize content. Take it step by step!
