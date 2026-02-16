"use client";
import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <div className="text-center">
          <h1 className="h1">
            <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
              About {{CLIENT_NAME}}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[760px] p-lead">
            Learn more about our story, mission, and the team behind {{CLIENT_NAME}}.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="mx-auto max-w-container px-7 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="h2 mb-6">Our Story</h2>
            <div className="space-y-4 text-muted">
              <p>
                {{CLIENT_NAME}} was founded with a simple mission: to provide exceptional 
                service and innovative solutions to our customers.
              </p>
              <p>
                Since our inception, we've grown from a small startup to a trusted partner 
                for businesses and individuals alike. Our commitment to excellence and 
                customer satisfaction drives everything we do.
              </p>
              <p>
                Today, we continue to evolve and adapt, always staying ahead of industry 
                trends to deliver the best possible experience to our clients.
              </p>
            </div>
          </div>

          <GlowCard className="p-8">
            <h3 className="mb-4 text-2xl font-bold text-text">Our Mission</h3>
            <p className="mb-6 text-muted">
              To empower our clients with cutting-edge solutions and exceptional service, 
              helping them achieve their goals and exceed their expectations.
            </p>
            
            <h3 className="mb-4 text-2xl font-bold text-text">Our Values</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-muted"><strong className="text-text">Excellence:</strong> We strive for the highest quality in everything we do</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-muted"><strong className="text-text">Innovation:</strong> We embrace new ideas and technologies</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-muted"><strong className="text-text">Integrity:</strong> We operate with honesty and transparency</span>
              </li>
            </ul>
          </GlowCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-container px-7 py-16">
        <GlowCard className="p-12 text-center">
          <h2 className="h2 mb-4">Want to Learn More?</h2>
          <p className="mx-auto mb-8 max-w-[600px] text-lg text-muted">
            Get in touch with us to discuss how we can help you achieve your goals.
          </p>
          <Button 
            variant="primary"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </Button>
        </GlowCard>
      </section>
    </main>
  );
}
