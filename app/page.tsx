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
import { ApiDocsPreview } from "@/components/ui/ApiDocsPreview";
import { TechnicalBlog } from "@/components/ui/TechnicalBlog";
import { Web3Connect } from "@/components/ui/Web3Connect";
import { MackAssistant } from "@/components/ui/MackAssistant";

export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Background glow with electric accent */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-electric-glow" />

      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-8 md:pb-16 text-center">
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
          <ElectricButton 
            color="green" 
            variant="solid" 
            onClick={() => window.location.href = '/launch'}
            aria-label="Watch our product launch video demo"
          >
            Watch Launch Video
          </ElectricButton>
          <Button 
            variant="primary" 
            href="/portal/auth"
            aria-label="Sign up and get started with our platform"
          >
            Get Started
          </Button>
          <Button 
            variant="ghost" 
            href="/portal/dashboard"
            aria-label="View the user dashboard and platform overview"
          >
            View Platform
          </Button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="platform" className="mx-auto max-w-container px-7 pt-4 pb-10 md:pt-8 md:pb-20">
        <SectionHeading
          eyebrow="Strategic Development"
          title="We Build Systems Engineered to Win"
          subtitle="Technology is a means to an end. We align architecture with business strategy, ensuring every feature drives measurable results."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["🚀 Full-Stack Systems", "Production-grade applications from frontend to backend API. We architect for scale, performance, and reliability from day one—not afterthoughts."],
            ["📊 Data-Driven Design", "Every pixel serves a purpose. We craft interfaces that convert users into customers, measure success, and iterate on what works."],
            ["🔗 API & Integration", "Powerful, well-documented APIs that connect your systems. Secure, fast, and built for partners and third-party developers to build on."],
            ["🎯 Strategic Development", "We don't just code—we align tech with business goals. Market analysis, competitive positioning, and GTM strategy baked into every project."]
          ].map(([h, p]) => (
            <GlowCard key={h} className="group hover:shadow-neon-green transition-all duration-300 hover:border-green-400/20">
              <div className="text-lg font-extrabold tracking-tight text-text">{h}</div>
              <div className="mt-2 text-sm text-muted leading-relaxed">{p}</div>
            </GlowCard>
          ))}
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7" color="green" />

      {/* WHAT WE DELIVER */}
      <section className="mx-auto max-w-container px-7 py-10 md:py-20">
        <SectionHeading
          eyebrow="Real Outcomes"
          title="Here's What Actually Gets Built"
          subtitle="We don't sell hours—we deliver results. Here's the toolkit we bring to every project."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            <GlowCard className="p-6 group hover:shadow-brand/25 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div className="flex-1">
                  <h3 className="font-bold text-text mb-2">Lightning-Fast Performance</h3>
                  <p className="text-xs text-muted">Sub-second page loads, optimized for mobile-first. We measure performance obsessively.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="p-6 group hover:shadow-brand/25 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🔒</div>
                <div className="flex-1">
                  <h3 className="font-bold text-text mb-2">Military-Grade Security</h3>
                  <p className="text-xs text-muted">Encryption, HTTPS, secure auth, GDPR-compliant. Security isn't optional—it's foundational.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="p-6 group hover:shadow-brand/25 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📈</div>
                <div className="flex-1">
                  <h3 className="font-bold text-text mb-2">Built for Growth</h3>
                  <p className="text-xs text-muted">Scalable architecture from day one. Handle 100 users or 100K—your app grows with you.</p>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <GlowCard className="p-6 group hover:shadow-brand2/25 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🧠</div>
                <div className="flex-1">
                  <h3 className="font-bold text-text mb-2">Smart Infrastructure</h3>
                  <p className="text-xs text-muted">AI integration, data pipelines, real-time analytics. Modern problems = modern solutions.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="p-6 group hover:shadow-brand2/25 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎯</div>
                <div className="flex-1">
                  <h3 className="font-bold text-text mb-2">Conversion-Optimized Design</h3>
                  <p className="text-xs text-muted">Every interface is tested, measured, and refined. We design for outcomes, not beauty.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="p-6 group hover:shadow-brand2/25 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📋</div>
                <div className="flex-1">
                  <h3 className="font-bold text-text mb-2">Documentation & Support</h3>
                  <p className="text-xs text-muted">Every project ships with API docs, deployment guides, and ongoing technical support.</p>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* T.O.O.L.S. INC FLAGSHIP PRODUCT */}
      <section className="mx-auto max-w-container px-7 py-10 md:py-20">
        <SectionHeading
          eyebrow="Flagship Innovation"
          title="Proof of Impact, Not Just Ideas"
          subtitle="We don't just talk about innovation—we build working products that change lives."
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* T.O.O.L.S. Inc Card */}
          <article aria-label="T.O.O.L.S. Inc - Reentry support platform with 1200 plus views and 87 percent success rate">
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

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                ["💼", "Workforce Readiness"],
                ["🧭", "Guided Reentry Paths"],
                ["🎓", "Learning Tracks"],
                ["🤝", "Mentor Support"],
              ].map(([icon, label]) => (
                <div key={label} className="glass rounded-lg p-4 border border-brand2/15">
                  <div className="text-lg mb-2">{icon}</div>
                  <div className="text-sm font-semibold text-text">{label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-extrabold text-brand">1200+</div>
                <div className="text-xs text-muted">Views</div>
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
          </article>

          {/* MackChat Card */}
          <article aria-label="MackChat - Military and civilian messaging platform launching Q2-Q4 2026">
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
                <div className="mt-3 inline-flex rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand2">
                  Preview Build
                </div>
              </div>
            </div>

            <p className="text-text/90 leading-relaxed mb-6">
              A preview of our web-based messaging platform designed to connect military members with 
              civilian supporters. The current build focuses on real-time communication, clear UX, 
              secure architecture, and the trust layer required for military-to-civilian collaboration.
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

            <div className="mb-6 rounded-xl border border-brand/20 bg-brand/5 p-4">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-brand2">What We&apos;re Building Now</div>
              <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-text/90">
                <div>• Trusted onboarding and identity-aware member flows</div>
                <div>• Secure group channels for units, families, and supporters</div>
                <div>• Moderation, safety, and encrypted communication foundations</div>
                <div>• Mobile-friendly messaging UX for fast, low-friction access</div>
              </div>
            </div>

            <Button variant="primary" href="/messaging" className="w-full">
              View Preview & Join Waitlist
            </Button>
          </GlowCard>
          </article>

          {/* IWantMyLawyerPresent Card */}
          <article className="lg:col-span-2" aria-label="IWantMyLawyerPresent - Rights-awareness website built by MackProjekt">
            <GlowCard className="p-8 lg:p-10 group hover:shadow-accent/25 transition-all duration-300 border border-accent/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">⚖️</div>
                <div className="flex-1">
                  <div className="mb-2 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Built by Us
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight mb-2">
                    <span className="bg-gradient-to-r from-accent to-brand bg-clip-text text-transparent">
                      IWantMyLawyerPresent
                    </span>
                  </h3>
                  <p className="text-lg font-semibold text-accent">
                    A rights-awareness website rooted in lived experience
                  </p>
                </div>
              </div>

              <p className="text-text/90 leading-relaxed mb-8">
                IWantMyLawyerPresent is a website we built — a clear, accessible resource helping people understand their legal rights during high-stakes interactions.
                Designed from lived experience, it centers on one core message: you have the right to ask for legal representation, and knowing when and how to exercise that right matters.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="glass rounded-xl p-5 border border-accent/15">
                  <div className="text-2xl mb-3">📋</div>
                  <div className="font-semibold text-text mb-2">Rights Education</div>
                  <div className="text-muted leading-relaxed">Clear, plain-language guidance on when and how to invoke your right to legal representation.</div>
                </div>
                <div className="glass rounded-xl p-5 border border-accent/15">
                  <div className="text-2xl mb-3">🛡️</div>
                  <div className="font-semibold text-text mb-2">Accountability Focus</div>
                  <div className="text-muted leading-relaxed">Structured around transparency and documentation — tools for navigating high-pressure moments with more confidence.</div>
                </div>
                <div className="glass rounded-xl p-5 border border-accent/15">
                  <div className="text-2xl mb-3">🤝</div>
                  <div className="font-semibold text-text mb-2">Community-Driven</div>
                  <div className="text-muted leading-relaxed">Built to serve those who need it most — people who face legal exposure without access to clear, immediate guidance.</div>
                </div>
              </div>
            </GlowCard>
          </article>
        </div>

        <div className="mt-8">
          <GlowCard className="p-8 lg:p-10 border border-brand/20">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand2 mb-2">Current Focus</div>
            <h3 className="text-2xl font-extrabold tracking-tight text-text">Where MackChat Is Headed</h3>
            <p className="mt-3 text-text/90 leading-relaxed">
              MackChat is the active buildout right now. The current sprint is centered on the product foundations needed to move from preview to trusted beta.
            </p>

            <div className="mt-6 space-y-4">
              {[
                ["01", "Messaging Core", "Reliable chat flows, fast interaction states, and group channel behavior."],
                ["02", "Security Layer", "Encrypted transport, access controls, and safer member-to-member communication."],
                ["03", "Community Design", "Experiences that make military and civilian participation feel structured and welcoming."],
                ["04", "Beta Readiness", "Waitlist capture, onboarding, analytics, and the operational basics for launch."],
              ].map(([step, title, body]) => (
                <div key={step} className="flex gap-4 rounded-lg border border-border bg-panel/60 p-4">
                  <div className="text-lg font-extrabold text-brand2">{step}</div>
                  <div>
                    <div className="font-semibold text-text">{title}</div>
                    <div className="mt-1 text-sm text-muted">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </section>

      {/* MACKCHAT INTERACTIVE DEMO */}
      <section className="mx-auto max-w-container px-7 py-10 md:py-20">
        <SectionHeading
          eyebrow="Live Preview"
          title="Experience MackChat"
          subtitle="See our revolutionary messaging platform in action with this interactive demo."
        />

        <div className="mt-10 max-w-4xl mx-auto">
          <MackChatDemo />
        </div>
      </section>

      {/* LIVE ROADMAP & PROGRESS TRACKER */}
      <section className="mx-auto max-w-container px-7 py-10 md:py-20">
        <SectionHeading
          eyebrow="Our Journey"
          title="2026 Innovation Roadmap"
          subtitle="See what we're building right now and what's coming next. Transparency drives accountability."
        />

        <div className="mt-12 space-y-6">
          {/* Phase 1: Foundation */}
          <div className="glass rounded-xl p-6 border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-text mb-1">Phase 1: Foundation</h3>
                <p className="text-sm text-muted">Core infrastructure & MVP launch</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-xs text-muted">COMPLETE</div>
              </div>
            </div>
            <div className="w-full h-2 bg-panel rounded-full overflow-hidden">
              <div className="h-full w-full bg-green-400 rounded-full"></div>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>✓ Homepage</div>
              <div>✓ Brand System</div>
              <div>✓ T.O.O.L.S. Inc</div>
              <div>✓ MackChat MVP</div>
            </div>
          </div>

          {/* Phase 2: Expansion */}
          <div className="glass rounded-xl p-6 border border-brand/20 hover:border-brand/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-text mb-1">Phase 2: Expansion</h3>
                <p className="text-sm text-muted">Feature releases & community building</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-brand">60%</div>
                <div className="text-xs text-muted">IN PROGRESS</div>
              </div>
            </div>
            <div className="w-full h-2 bg-panel rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-brand rounded-full"></div>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>✓ MackChat Beta</div>
              <div>✓ API Docs</div>
              <div>⟳ Analytics Dashboard</div>
              <div>⟳ Community Portal</div>
            </div>
          </div>

          {/* Phase 3: Scaling */}
          <div className="glass rounded-xl p-6 border border-brand2/20 hover:border-brand2/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-text mb-1">Phase 3: Scaling</h3>
                <p className="text-sm text-muted">Enterprise features & integrations</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-brand2">30%</div>
                <div className="text-xs text-muted">PLANNING</div>
              </div>
            </div>
            <div className="w-full h-2 bg-panel rounded-full overflow-hidden">
              <div className="h-full w-3/10 bg-brand2 rounded-full"></div>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>⟳ Enterprise Suite</div>
              <div>⟳ Mobile Apps</div>
              <div>⟳ AI Integration</div>
              <div>⟳ Web3 Support</div>
            </div>
          </div>
        </div>

      </section>

      <ElectricDivider className="mx-auto max-w-container px-7 hidden md:block" color="green" />

      {/* API DOCUMENTATION PREVIEW */}
      <section className="mx-auto max-w-container px-7 py-10 md:py-20 hidden md:block">
        <SectionHeading
          eyebrow="For Developers"
          title="Platform Engineering at Scale"
          subtitle="Production-ready APIs with comprehensive documentation. Built for developers who value clean code and reliable infrastructure."
        />

        <div className="mt-12">
          <ApiDocsPreview />
        </div>

        <div className="mt-12 text-center">
          <Button variant="primary" href="/api-test" aria-label="View full API documentation">
            View Full Documentation →
          </Button>
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7 hidden md:block" color="brand" />

      {/* WEB3 INNOVATION */}
      <section className="mx-auto max-w-container px-7 py-10 md:py-20 hidden md:block">
        <SectionHeading
          eyebrow="Next Generation"
          title="Web3 Integration (Beta)"
          subtitle="We're at the forefront of decentralized technology. Connect your wallet and experience the future of digital identity."
        />

        <div className="mt-12 max-w-2xl mx-auto">
          <Web3Connect />
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7 hidden md:block" color="brand2" />

      {/* FOUNDER'S LETTER */}
      <section className="mx-auto max-w-container px-7 py-10 md:py-20">
        <FoundersLetter />
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7 hidden md:block" color="accent" />

      {/* TECHNICAL BLOG */}
      <section className="mx-auto max-w-container px-7 py-10 md:py-20 hidden md:block">
        <SectionHeading
          eyebrow="Thought Leadership"
          title="Engineering & Philosophy Blog"
          subtitle="Deep dives into the technology, strategy, and purpose behind everything we build. Written by Donyale 'DThree' Mack."
        />

        <div className="mt-12">
          <TechnicalBlog />
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7 hidden md:block" color="green" />

      {/* INNOVATION LAB WAITLIST */}
      <section className="mx-auto max-w-container px-7 py-10 md:py-20">
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

      <ElectricDivider className="mx-auto max-w-container px-7 hidden md:block" color="accent" />

      {/* MACKASSISTANT RAG AI SEARCH */}
      <section className="mx-auto max-w-container px-7 py-10 md:py-20">
        <SectionHeading
          eyebrow="AI-Powered Search"
          title="Ask MackAssistant Anything"
          subtitle="Natural language search for our products, services, pricing, and capabilities"
        />

        <div className="mt-10">
          <MackAssistant />
        </div>
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
