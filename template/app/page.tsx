"use client";
import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChatBot } from "@/components/ui/ChatBot";

export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Background glow effect */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      <Navbar />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <h1 className="h1">
          <span className="relative inline-block">
            <span className="absolute inset-0 blur-xl bg-gradient-to-r from-brand to-brand2 opacity-50"></span>
            <span className="relative bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
              Welcome to {{CLIENT_NAME}}
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[760px] p-lead">
          {{COMPANY_DESCRIPTION}}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button 
            variant="primary"
            onClick={() => window.location.href = '/contact'}
            aria-label="Get in touch with us"
          >
            Get Started
          </Button>
          <Button 
            variant="ghost"
            onClick={() => window.location.href = '/about'}
            aria-label="Learn more about us"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="mx-auto max-w-container px-7 py-16">
        <SectionHeading
          eyebrow="Our Services"
          title="What We Offer"
          subtitle="Discover how we can help transform your business"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GlowCard className="p-8">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-brand/10 p-3">
              <svg className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-text">Fast & Reliable</h3>
            <p className="text-muted">
              Lightning-fast performance and reliable service you can count on.
            </p>
          </GlowCard>

          <GlowCard className="p-8">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-brand2/10 p-3">
              <svg className="h-6 w-6 text-brand2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-text">Customizable</h3>
            <p className="text-muted">
              Tailored solutions designed to meet your specific needs.
            </p>
          </GlowCard>

          <GlowCard className="p-8">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
              <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-text">Secure</h3>
            <p className="text-muted">
              Enterprise-grade security to keep your data safe and protected.
            </p>
          </GlowCard>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="mx-auto max-w-container px-7 py-16">
        <GlowCard className="p-12 text-center">
          <h2 className="h2 mb-4">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-[600px] text-lg text-muted">
            Join thousands of satisfied customers who trust {{CLIENT_NAME}} for their needs.
          </p>
          <Button 
            variant="primary"
            onClick={() => window.location.href = '/contact'}
            aria-label="Contact us today"
          >
            Contact Us Today
          </Button>
        </GlowCard>
      </section>

      {/* ChatBot */}
      <ChatBot />
    </main>
  );
}
