import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChatBot } from "@/components/ui/ChatBot";
import { CookieConsent } from "@/components/ui/CookieConsent";

export default function PartnershipsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <SectionHeading
          eyebrow="Collaboration"
          title="In Partnership"
          subtitle="Together, we're building a stronger community through strategic partnerships and collaborative support networks."
        />
      </section>

      {/* Partnership Organizations */}
      <section className="mx-auto max-w-container px-7 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "MPH", logo: "/partnerships/mph-logo.png" },
            { name: "AMP", logo: "/partnerships/amp-logo.jpeg" },
          ].map((partner) => (
            <GlowCard key={partner.name} className="p-8 flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-24 w-auto object-contain"
              />
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Our Mentorship Program */}
      <section className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Growth & Development"
          title="Our Mentorship Program"
          subtitle="Connecting individuals with experienced mentors who provide guidance, support, and real-world insights for personal and professional growth."
        />

        <div className="mt-10 flex justify-center">
          <GlowCard className="p-8 flex items-center justify-center max-w-md w-full">
            <img
              src="/partnerships/kingme-logo.png"
              alt="Mentorship Program"
              className="max-h-32 w-auto object-contain"
            />
          </GlowCard>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="mx-auto max-w-container px-7 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🤝",
              title: "Collaborative Support",
              description: "Working together to provide comprehensive services and resources to our community.",
            },
            {
              icon: "🎯",
              title: "Shared Mission",
              description: "United in our commitment to empowering individuals and creating lasting positive change.",
            },
            {
              icon: "🌟",
              title: "Enhanced Resources",
              description: "Combining expertise and resources to maximize impact and reach more people in need.",
            },
          ].map((benefit) => (
            <GlowCard key={benefit.title}>
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <div className="text-lg font-extrabold tracking-tight text-text mb-2">
                {benefit.title}
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {benefit.description}
              </p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Technology Partners */}
      <section className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Technology & Development"
          title="Technology Partners"
          subtitle="Leveraging cutting-edge platforms and tools to build innovative solutions for our community."
        />

        <div className="mt-10">
          <GlowCard className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <svg className="h-16 w-16 text-text" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-extrabold tracking-tight text-text">GitHub</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Open source development and version control platform powering our digital infrastructure.
                </p>
                <a
                  href="https://github.com/AMackProjekt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand2 transition-colors"
                >
                  Visit our GitHub
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="text-xs text-muted/60 font-mono">
                <div>Secure Repository</div>
                <div className="mt-1 text-[10px]">SHA-256 Verified</div>
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-container px-7 py-20 text-center">
        <GlowCard className="p-12">
          <h2 className="h2">Interested in Partnering?</h2>
          <p className="mt-4 text-muted max-w-[680px] mx-auto">
            We&apos;re always looking for like-minded organizations to collaborate with. 
            If you share our mission and want to make a difference, let&apos;s connect.
          </p>
          <div className="mt-8">
            <a href="/#contact">
              <button className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold bg-gradient-to-br from-brand to-brand2 text-[#02131a] hover:shadow-glow transition-shadow">
                Get in Touch
              </button>
            </a>
          </div>
        </GlowCard>
      </section>

      <ChatBot />
      <CookieConsent />
    </main>
  );
}
