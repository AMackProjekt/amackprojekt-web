"use client";
import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // TODO: Implement your form submission logic here
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <div className="text-center">
          <h1 className="h1">
            <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[760px] p-lead">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-container px-7 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="h2 mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <GlowCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-brand/10 p-3">
                    <svg className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-text">Email</h3>
                    <a href="mailto:{{CONTACT_EMAIL}}" className="text-muted hover:text-brand transition-colors">
                      {{CONTACT_EMAIL}}
                    </a>
                  </div>
                </div>
              </GlowCard>

              <GlowCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-brand2/10 p-3">
                    <svg className="h-6 w-6 text-brand2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-text">Website</h3>
                    <a href="https://{{CLIENT_DOMAIN}}" className="text-muted hover:text-brand2 transition-colors">
                      {{CLIENT_DOMAIN}}
                    </a>
                  </div>
                </div>
              </GlowCard>

              <GlowCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-text">Business Hours</h3>
                    <p className="text-muted">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-muted">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>

          {/* Contact Form */}
          <GlowCard className="p-8">
            <h2 className="mb-6 text-2xl font-bold text-text">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-text">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-text placeholder-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-text">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-text placeholder-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-text">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-text placeholder-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-text">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-text placeholder-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {status === "success" && (
                <div className="rounded-lg border border-brand/20 bg-brand/10 p-4 text-text">
                  <p>✓ Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              {status === "error" && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                  <p>✗ Something went wrong. Please try again later.</p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </GlowCard>
        </div>
      </section>
    </main>
  );
}
