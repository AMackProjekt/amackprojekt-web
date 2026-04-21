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
