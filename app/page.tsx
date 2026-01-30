"use client";
import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChatBot } from "@/components/ui/ChatBot";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ElectricText, ElectricButton, ElectricDivider } from "@/components/ui/ElectricEffects";
import { MackChatDemo } from "@/components/ui/MackChatDemo";
import { FoundersLetter } from "@/components/ui/FoundersLetter";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Background glow with electric accent */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-electric-glow" />

      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <h1 className="h1">
          <ElectricText color="green">Welcome To</ElectricText>
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-0 blur-xl bg-gradient-to-r from-brand to-brand2 opacity-50"></span>
            <span className="relative bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
              A MackProjekt
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[760px] p-lead">
          The visionary startup behind MackEnterprises. We build innovative digital solutions 
          that transform businesses and empower communities through technology and creativity.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ElectricButton color="green" variant="solid" onClick={() => window.location.href = '/launch'}>
            Watch Launch Video
          </ElectricButton>
          <Button variant="primary" href="/portal/auth">Get Started</Button>
          <Button variant="ghost" href="/portal/dashboard">View Platform</Button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="platform" className="mx-auto max-w-container px-7 pt-8 pb-20">
        <SectionHeading
          eyebrow="What We Do"
          title="Digital Solutions That Matter"
          subtitle="We create innovative web applications, platforms, and digital experiences that drive business growth and community engagement."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Web Development", "Custom websites and web applications built with modern technologies like Next.js, React, and TypeScript."],
            ["Platform Engineering", "Scalable platforms and APIs designed to grow with your business needs and user base."],
            ["User Experience", "Beautiful, intuitive interfaces that users love, backed by research and best practices in UX design."],
            ["Digital Strategy", "Comprehensive planning and execution to help your business thrive in the digital landscape."]
          ].map(([h, p]) => (
            <GlowCard key={h} className="group hover:shadow-neon-green transition-all duration-300 hover:border-green-400/20">
              <div className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-text to-green-400 bg-clip-text text-transparent">{h}</div>
              <div className="mt-2 text-sm text-muted leading-relaxed">{p}</div>
            </GlowCard>
          ))}
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7" color="green" />

      {/* T.O.O.L.S. INC FLAGSHIP PRODUCT */}
      <section className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Flagship Innovation"
          title="Proof of Impact, Not Just Ideas"
          subtitle="We don't just talk about innovation—we build working products that change lives."
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* T.O.O.L.S. Inc Card */}
          <GlowCard className="p-8 lg:p-10 group hover:shadow-brand2/25 transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">🎓</div>
              <div className="flex-1">
                <h3 className="text-2xl font-extrabold tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-brand2 to-accent bg-clip-text text-transparent">
                    T.O.O.L.S. Inc.
                  </span>
                </h3>
                <p className="text-lg font-semibold text-brand2">
                  Empowering Reentry through AI & Data Science
                </p>
              </div>
            </div>

            <p className="text-text/90 leading-relaxed mb-6">
              Together Overcoming Obstacles and Limitations—a comprehensive platform supporting 
              justice-involved individuals with job readiness, education programs, lived-experience 
              mentorship, and AI-powered career guidance.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-extrabold text-brand">1,200+</div>
                <div className="text-xs text-muted">Users Served</div>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-extrabold text-brand2">87%</div>
                <div className="text-xs text-muted">Success Rate</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-brand">✓</span>
                <span className="text-text/90">AI-Powered Career Matching</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-brand">✓</span>
                <span className="text-text/90">Live Job Board & Referrals</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-brand">✓</span>
                <span className="text-text/90">Education & Skill Development</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-brand">✓</span>
                <span className="text-text/90">Peer Mentorship Network</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" href="/reentry" className="flex-1">
                Learn More
              </Button>
              <Button variant="ghost" href="/portal/auth">
                Get Started
              </Button>
            </div>
          </GlowCard>

          {/* MackChat Card */}
          <GlowCard className="p-8 lg:p-10 group hover:shadow-brand/25 transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">💬</div>
              <div className="flex-1">
                <h3 className="text-2xl font-extrabold tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
                    MackChat
                  </span>
                </h3>
                <p className="text-lg font-semibold text-brand">
                  Bridging Military & Civilian Communities
                </p>
              </div>
            </div>

            <p className="text-text/90 leading-relaxed mb-6">
              A revolutionary web-based messaging platform designed to connect military members with 
              civilian supporters. Real-time communication with modern features, beautiful design, 
              and military-grade security.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="glass rounded-lg p-3 text-center">
                <div className="text-xl font-extrabold text-brand">Q2</div>
                <div className="text-xs text-muted">Beta Launch</div>
              </div>
              <div className="glass rounded-lg p-3 text-center">
                <div className="text-xl font-extrabold text-brand2">Q3</div>
                <div className="text-xs text-muted">Public Release</div>
              </div>
              <div className="glass rounded-lg p-3 text-center">
                <div className="text-xl font-extrabold text-accent">Q4</div>
                <div className="text-xs text-muted">Full Launch</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-brand">✓</span>
                <span className="text-text/90">Real-Time Messaging & Groups</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-brand">✓</span>
                <span className="text-text/90">Military-Grade Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-brand">✓</span>
                <span className="text-text/90">Cross-Platform Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-brand">✓</span>
                <span className="text-text/90">Community Channels</span>
              </div>
            </div>

            <Button variant="primary" href="/messaging" className="w-full">
              Learn More & Join Waitlist
            </Button>
          </GlowCard>
        </div>
      </section>

      {/* MACKCHAT INTERACTIVE DEMO */}
      <section className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Live Preview"
          title="Experience MackChat"
          subtitle="See our revolutionary messaging platform in action with this interactive demo."
        />

        <div className="mt-10 max-w-4xl mx-auto">
          <MackChatDemo />
        </div>
      </section>

      {/* FOUNDER'S LETTER */}
      <section className="mx-auto max-w-container px-7 py-20">
        <FoundersLetter />
      </section>

      {/* INNOVATION LAB WAITLIST */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10 lg:p-16">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
              Join the Innovation Lab
            </div>
            <h2 className="h2 mt-4 mb-4">
              Get Early Access to Our Products
            </h2>
            <p className="text-muted max-w-2xl mx-auto leading-relaxed">
              Be the first to know about new features, product launches, and exclusive opportunities. 
              Get our 2026 Innovation Roadmap PDF when you join.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <WaitlistForm source="homepage" />
          </div>
        </GlowCard>
      </section>

      {/* FOOTER CTA */}
      <section className="mx-auto max-w-container px-7 py-16 text-center">
        <a href="#">
          <Button variant="primary">Back to Top</Button>
        </a>

        <div className="mt-10 text-xs text-muted">
          © {new Date().getFullYear()} A MackProjekt · MackEnterprises · Building the Future
        </div>
      </section>

      {/* ChatBot */}
      <ChatBot />
      
      {/* Cookie Consent */}
      <CookieConsent />
    </main>
  );
}
