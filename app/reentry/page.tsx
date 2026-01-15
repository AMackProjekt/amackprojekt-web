import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ChatBot } from "@/components/ui/ChatBot";
import { CookieConsent } from "@/components/ui/CookieConsent";

export default function ReentryPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <SectionHeading
          eyebrow="Reentry Services"
          title="Reentry Service Provider"
          subtitle="Supporting justice-involved individuals as they successfully transition back into society with dignity, purpose, and opportunity."
        />
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-container px-7 pb-16">
        <GlowCard className="p-8">
          <h3 className="text-2xl font-extrabold tracking-tight text-text mb-4">
            Navigating Life After Incarceration
          </h3>
          <p className="text-muted leading-relaxed mb-4">
            Returning to society after incarceration presents unique challenges that require specialized support 
            and understanding. At T.O.O.L.S Inc, we recognize these challenges and provide comprehensive reentry 
            services designed to help justice-involved individuals successfully reintegrate into their communities.
          </p>
          <p className="text-muted leading-relaxed">
            Our reentry programs are built on a foundation of lived experience, compassion, and proven strategies 
            that address the complex needs of individuals transitioning from incarceration to productive, 
            fulfilling lives in society.
          </p>
        </GlowCard>
      </section>

      {/* Core Services */}
      <section className="mx-auto max-w-container px-7 py-20">
        <div className="mb-10 text-center">
          <h2 className="h2">Comprehensive Reentry Support</h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Our holistic approach addresses every aspect of successful reintegration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "💼",
              title: "Employment Services",
              description: "Job readiness training, resume building, interview preparation, and direct connections to second-chance employers who value your potential."
            },
            {
              icon: "🏠",
              title: "Housing Assistance",
              description: "Support in securing stable housing through connections with landlords, transitional housing programs, and housing voucher assistance."
            },
            {
              icon: "🎓",
              title: "Education & Training",
              description: "Access to GED programs, vocational training, college preparation, and skill development courses to expand your opportunities."
            },
            {
              icon: "⚖️",
              title: "Legal Support",
              description: "Guidance on record expungement, restoration of rights, understanding legal obligations, and navigating probation or parole requirements."
            },
            {
              icon: "🧠",
              title: "Mental Health Services",
              description: "Counseling, trauma-informed care, substance abuse support, and connections to mental health professionals who understand your journey."
            },
            {
              icon: "👥",
              title: "Family Reunification",
              description: "Programs to help rebuild family relationships, parent support services, and guidance on reconnecting with loved ones."
            },
            {
              icon: "💳",
              title: "Financial Literacy",
              description: "Budgeting skills, banking access, credit building, and financial planning to establish economic stability."
            },
            {
              icon: "🚗",
              title: "Transportation Support",
              description: "Help with driver's license reinstatement, public transportation vouchers, and mobility solutions for work and appointments."
            },
            {
              icon: "🤝",
              title: "Community Integration",
              description: "Mentorship programs, peer support groups, and community connections that foster belonging and reduce isolation."
            }
          ].map((service) => (
            <GlowCard key={service.title}>
              <div className="text-4xl mb-4">{service.icon}</div>
              <div className="text-lg font-extrabold tracking-tight text-text mb-2">
                {service.title}
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="mx-auto max-w-container px-7 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlowCard className="p-8">
            <h3 className="text-xl font-extrabold tracking-tight text-text mb-4">
              Understanding Justice Involvement
            </h3>
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <p>
                Justice involvement encompasses any interaction with the criminal justice system, from arrest 
                through incarceration and post-release supervision. We understand that each person&apos;s journey 
                is unique, and we tailor our support to meet individual needs.
              </p>
              <p>
                Whether you&apos;re preparing for release, recently returned home, or years into your reintegration, 
                we&apos;re here to support you. Our team includes individuals with lived experience who understand 
                the challenges you face because they&apos;ve walked the same path.
              </p>
            </div>
          </GlowCard>

          <GlowCard className="p-8">
            <h3 className="text-xl font-extrabold tracking-tight text-text mb-4">
              Breaking Down Barriers
            </h3>
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <p>
                Returning citizens face numerous barriers: employment discrimination, housing denials, 
                loss of professional licenses, and social stigma. These obstacles are real, but they&apos;re 
                not insurmountable. We work to remove these barriers through advocacy, education, and 
                direct support.
              </p>
              <p>
                Our approach combines practical assistance with systems-level advocacy to create lasting 
                change. We don&apos;t just help individuals navigate broken systems—we work to fix those 
                systems so future generations face fewer obstacles.
              </p>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* Success Factors */}
      <section className="mx-auto max-w-container px-7 py-20">
        <div className="mb-10 text-center">
          <h2 className="h2">Keys to Successful Reentry</h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Research and experience show these factors are critical for successful reintegration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Immediate Support",
              description: "The first 72 hours and first 90 days after release are critical. We provide intensive support during this crucial transition period."
            },
            {
              title: "Stable Foundation",
              description: "Housing, employment, and basic needs must be addressed before other goals can be pursued. We help establish this foundation."
            },
            {
              title: "Strong Support Network",
              description: "Connection to positive influences, mentors, and peer support reduces isolation and increases success rates."
            },
            {
              title: "Purpose & Identity",
              description: "Rebuilding identity beyond past mistakes and finding meaningful purpose drives long-term success."
            },
            {
              title: "Skill Development",
              description: "Practical skills in employment, relationships, financial management, and problem-solving are essential tools."
            },
            {
              title: "Ongoing Accountability",
              description: "Regular check-ins, goal setting, and supportive accountability keep progress on track."
            }
          ].map((factor) => (
            <GlowCard key={factor.title} className="p-6">
              <div className="text-lg font-extrabold tracking-tight text-text mb-2">
                {factor.title}
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {factor.description}
              </p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Lived Experience */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="h2 mb-4">Led by Lived Experience</h2>
            <p className="text-muted leading-relaxed mb-6">
              Our reentry services are informed and led by individuals with lived experience of incarceration 
              and reintegration. This isn&apos;t just theory—it&apos;s real-world knowledge from people who have 
              successfully navigated the same journey you&apos;re on. We understand because we&apos;ve been there.
            </p>
            <p className="text-text/80 text-sm italic">
              &quot;The same struggles you&apos;re facing today, we faced yesterday. Let us help you write a different ending to your story.&quot;
            </p>
          </div>
        </GlowCard>
      </section>

      {/* Getting Started */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10 text-center">
          <h2 className="h2 mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Whether you&apos;re preparing for release, recently returned, or seeking support at any stage 
            of your reentry journey, we&apos;re here to help. Your past doesn&apos;t define your future—let&apos;s 
            build it together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" href="/referral">
              Submit a Referral
            </Button>
            <Button variant="ghost" href="/interest">
              Express Interest
            </Button>
          </div>
        </GlowCard>
      </section>

      <ChatBot />
      <CookieConsent />
    </main>
  );
}
