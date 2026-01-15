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
          Empowering Individuals.
          <br />
          <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
            Unlocking Potential.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[760px] p-lead">
          At T.O.O.L.S Inc, we provide support and opportunities for individuals looking to start over. 
          Through comprehensive programs and lived experience, we help people unlock their full potential.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary">Get Started</Button>
          <Button variant="ghost">View Platform</Button>
        </div>

        {/* KPI band */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            ["Support", "Comprehensive Programs"],
            ["Growth", "Job Readiness Training"],
            ["Empathy", "Lived Experience Team"],
            ["Access", "Continued Education"]
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
          eyebrow="How We Help"
          title="Comprehensive Support Programs"
          subtitle="We recognize and address the diverse challenges individuals face, providing the tools and support necessary to unlock their full potential."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Job Readiness", "Professional development programs including resume building, mock interviews, and career planning to prepare for success."],
            ["Continued Education", "Access to educational resources and training programs that open doors to new opportunities and skill development."],
            ["Lived Experience", "Our team shares lived experiences with the challenges our clients face, creating genuine understanding and effective support."],
            ["Personal Growth", "Holistic programs addressing both immediate needs and long-term goals for sustainable personal and professional growth."]
          ].map(([h, p]) => (
            <GlowCard key={h}>
              <div className="text-lg font-extrabold tracking-tight">{h}</div>
              <div className="mt-2 text-sm text-muted leading-relaxed">{p}</div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* REENTRY SERVICE PROVIDER HIGHLIGHT */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10 text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand2/10" />
          <div className="relative">
            <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
              Justice-Involved Support
            </div>
            <h2 className="h2 mt-4 mb-4">
              Reentry Service Provider
            </h2>
            <p className="text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
              Supporting individuals returning to society after incarceration with comprehensive reentry 
              services, employment assistance, housing support, and a pathway to successful reintegration.
            </p>
            <Button variant="primary" href="/reentry">
              Learn More About Reentry Services
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
              Together Overcoming Obstacles and Limitations
            </h2>
            <div className="mt-2 text-lg font-semibold text-muted">
              Leadership: Donyale &quot;DThree&quot; Mack
            </div>
            
            <div className="mt-6 space-y-4 text-text/90 leading-relaxed">
              <p>
                A compassionate advocate and the driving force behind T.O.O.L.S Inc, Donyale Mack is dedicated to 
                providing support and opportunities to those seeking a second chance in life.
              </p>
              <p>
                Born out of lived experience and personal challenges, Donyale&apos;s journey is marked by resilience, 
                overcoming adversity, and an unwavering passion to help others facing similar struggles.
              </p>
              <p className="text-brand font-semibold">
                &quot;Every individual deserves the opportunity to unlock their full potential.&quot;
              </p>
            </div>
          </div>
          
          <GlowCard className="p-8 lg:p-10">
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold text-brand2 uppercase tracking-wider">Mission</div>
                <p className="mt-2 text-text/90">
                  Creating pathways for individuals to transform their lives through empathy, 
                  understanding, and comprehensive support programs.
                </p>
              </div>
              <div>
                <div className="text-sm font-semibold text-brand2 uppercase tracking-wider">Vision</div>
                <p className="mt-2 text-text/90">
                  Building a community where lived experience becomes the foundation for 
                  genuine connection and lasting change.
                </p>
              </div>
              <div>
                <div className="text-sm font-semibold text-brand2 uppercase tracking-wider">Approach</div>
                <p className="mt-2 text-text/90">
                  Combining personal understanding with professional expertise to provide 
                  support that goes beyond sympathy to true empowerment.
                </p>
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* DASHBOARD */}
      <DashboardSection />

      {/* BOOK / SUPPORT SECTION */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10 text-center">
          <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
            Support Our Mission
          </div>
          <h2 className="h2 mt-4">
            Go Check It Out
          </h2>
          <div className="mt-2 text-lg font-semibold text-brand">
            Available Now On Amazon Platform
          </div>
          
          <div className="mx-auto mt-6 max-w-[680px] space-y-4 text-text/90 leading-relaxed">
            <p>
              A portion of the proceeds go to helping program participants with immediate needs such as 
              but not limited to: bus/transit passes, gas cards, work boots and clothing for work.
            </p>
            <p className="text-base font-semibold text-brand2">
              We appreciate Your Support
            </p>
          </div>

          <div className="mt-8">
            <a href="https://www.amazon.com/Navigating-Spiritual-Warfare-UNDERSTANDING-OVERCOMING/dp/B0CX5JB7BL" target="_blank" rel="noopener noreferrer">
              <Button variant="primary">View on Amazon</Button>
            </a>
          </div>

          <div className="mt-6 text-sm text-muted">
            <strong className="text-text">Donyale Mack</strong>
            <div className="mt-1">CEO/Author</div>
          </div>
        </GlowCard>
      </section>

      {/* INTEREST FORM */}
      <section id="contact" className="mx-auto max-w-container px-7 py-20">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
            Get Started
          </div>
          <h2 className="h2 mt-4">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-muted">
            Let us know how we can support you. Fill out the form below and we&apos;ll respond within 48 hours.
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
            title="T.O.O.L.S Inc Interest Form"
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
              For More Information
            </div>
            <a href="mailto:info@sdtoolsinc.org" className="text-text hover:text-brand transition-colors">
              info@sdtoolsinc.org
            </a>
          </GlowCard>

          <GlowCard className="p-6 text-center">
            <div className="text-2xl mb-3">📰</div>
            <div className="text-sm font-semibold text-brand2 uppercase tracking-wider mb-2">
              Subscribe to Newsletter
            </div>
            <a href="mailto:news@sdtoolsinc.org" className="text-text hover:text-brand transition-colors">
              news@sdtoolsinc.org
            </a>
          </GlowCard>

          <GlowCard className="p-6 text-center">
            <div className="text-2xl mb-3">🤝</div>
            <div className="text-sm font-semibold text-brand2 uppercase tracking-wider mb-2">
              Partnership
            </div>
            <a href="mailto:partner@sdtoolsinc.org" className="text-text hover:text-brand transition-colors">
              partner@sdtoolsinc.org
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
          © {new Date().getFullYear()} T.O.O.L.S Inc · Empowering individuals To Step Inito Their Purpose
        </div>
      </section>

      {/* ChatBot */}
      <ChatBot />
      
      {/* Cookie Consent */}
      <CookieConsent />
    </main>
  );
}
