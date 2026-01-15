import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { DashboardSection } from "@/components/ui/DashboardSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InteractiveTiles } from "@/components/ui/InteractiveTiles";
import { ChatBot } from "@/components/ui/ChatBot";
import { CookieConsent } from "@/components/ui/CookieConsent";

export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <h1 className="h1">
          Welcome to
          <br />
          <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
            A MackProjekt
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[760px] p-lead">
          The visionary startup behind MackEnterprises. We build innovative digital solutions 
          that transform businesses and empower communities through technology and creativity.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary">Get Started</Button>
          <Button variant="ghost">View Platform</Button>
        </div>

        {/* KPI band */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            ["Innovation", "Cutting-Edge Solutions"],
            ["Design", "Beautiful User Experiences"],
            ["Technology", "Modern Tech Stack"],
            ["Growth", "Scalable Architecture"]
          ].map(([v, t]) => (
            <GlowCard key={t} className="p-5 text-left">
              <div className="text-2xl font-extrabold tracking-tight">{v}</div>
              <div className="mt-2 text-sm text-muted">{t}</div>
            </GlowCard>
          ))}
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
            <GlowCard key={h}>
              <div className="text-lg font-extrabold tracking-tight">{h}</div>
              <div className="mt-2 text-sm text-muted leading-relaxed">{p}</div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* MESSAGING APP HIGHLIGHT */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10 text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand2/10" />
          <div className="relative">
            <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
              Coming Soon
            </div>
            <h2 className="h2 mt-4 mb-4">
              MackChat - Next-Gen Messaging
            </h2>
            <p className="text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
              A revolutionary web-based messaging platform bringing teams and communities together. 
              Real-time communication with modern features, beautiful design, and seamless integration.
            </p>
            <Button variant="primary" href="/messaging">
              Learn More
            </Button>
          </div>
        </GlowCard>
      </section>

      {/* INTERACTIVE TILES */}
      <InteractiveTiles />

      {/* FOUNDER STORY */}
      <section className="mx-auto max-w-container px-7 py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
              About Us
            </div>
            <h2 className="h2 mt-4">
              MackEnterprises - Building the Future
            </h2>
            <div className="mt-2 text-lg font-semibold text-muted">
              Founder: Donyale &quot;DThree&quot; Mack
            </div>
            
            <div className="mt-6 space-y-4 text-text/90 leading-relaxed">
              <p>
                A MackProjekt is the innovation lab behind MackEnterprises, dedicated to creating 
                cutting-edge digital solutions that make a difference in people&apos;s lives.
              </p>
              <p>
                Founded by visionary entrepreneur Donyale Mack, we combine technical excellence with 
                creative thinking to build platforms that connect, empower, and inspire.
              </p>
              <p className="text-brand font-semibold">
                &quot;Innovation happens when technology meets purpose.&quot;
              </p>
            </div>
          </div>
          
          <GlowCard className="p-8 lg:p-10">
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold text-brand2 uppercase tracking-wider">Mission</div>
                <p className="mt-2 text-text/90">
                  To deliver innovative digital solutions that drive business growth and create 
                  meaningful connections in the digital age.
                </p>
              </div>
              <div>
                <div className="text-sm font-semibold text-brand2 uppercase tracking-wider">Vision</div>
                <p className="mt-2 text-text/90">
                  Building a future where technology seamlessly integrates into every aspect of 
                  business and life, making things simpler and more connected.
                </p>
              </div>
              <div>
                <div className="text-sm font-semibold text-brand2 uppercase tracking-wider">Approach</div>
                <p className="mt-2 text-text/90">
                  Combining modern technology stacks with user-centered design to create 
                  solutions that are both powerful and delightful to use.
                </p>
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* DASHBOARD */}
      <DashboardSection />

      {/* PORTFOLIO / PROJECTS SECTION */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10 text-center">
          <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
            Our Work
          </div>
          <h2 className="h2 mt-4">
            Projects & Innovations
          </h2>
          <div className="mt-2 text-lg font-semibold text-brand">
            Transforming Ideas Into Reality
          </div>
          
          <div className="mx-auto mt-6 max-w-[680px] space-y-4 text-text/90 leading-relaxed">
            <p>
              From web platforms to messaging applications, we build solutions that combine 
              technical excellence with user-centered design.
            </p>
            <p className="text-base font-semibold text-brand2">
              Let&apos;s Build Something Amazing Together
            </p>
          </div>

          <div className="mt-8">
            <Button variant="primary" href="/portal">Explore Our Platform</Button>
          </div>
        </GlowCard>
      </section>

      {/* INTEREST FORM */}
      <section id="contact" className="mx-auto max-w-container px-7 py-20">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
            Get In Touch
          </div>
          <h2 className="h2 mt-4">
            Let&apos;s Work Together
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-muted">
            Have a project in mind? Want to learn more about our services? Reach out and let&apos;s start a conversation.
          </p>
        </div>

        <GlowCard className="p-8">
          <iframe
            src="https://forms.cloud.microsoft/r/G0kkRW4F7q"
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="A MackProjekt Contact Form"
            className="rounded-lg"
          >
            Loading…
          </iframe>
        </GlowCard>

        {/* Contact Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlowCard className="p-6 text-center">
            <div className="text-2xl mb-3">📧</div>
            <div className="text-sm font-semibold text-brand2 uppercase tracking-wider mb-2">
              General Inquiries
            </div>
            <a href="mailto:info@amackprojekt.com" className="text-text hover:text-brand transition-colors">
              info@amackprojekt.com
            </a>
          </GlowCard>

          <GlowCard className="p-6 text-center">
            <div className="text-2xl mb-3">💼</div>
            <div className="text-sm font-semibold text-brand2 uppercase tracking-wider mb-2">
              Business Development
            </div>
            <a href="mailto:business@amackprojekt.com" className="text-text hover:text-brand transition-colors">
              business@amackprojekt.com
            </a>
          </GlowCard>

          <GlowCard className="p-6 text-center">
            <div className="text-2xl mb-3">🤝</div>
            <div className="text-sm font-semibold text-brand2 uppercase tracking-wider mb-2">
              Partnership
            </div>
            <a href="mailto:partner@amackprojekt.com" className="text-text hover:text-brand transition-colors">
              partner@amackprojekt.com
            </a>
          </GlowCard>
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
