import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";

export default function HealthcareSolutionsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />

      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <div className="text-xs font-semibold tracking-[0.18em] text-brand uppercase mb-4">
          Healthcare Technology
        </div>
        <h1 className="h1 mb-6">
          HIPAA-Compliant <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">Healthcare Solutions</span>
        </h1>
        <p className="mx-auto max-w-2xl p-lead">
          Secure patient portals, telemedicine platforms, health data analytics, and practice management systems built with privacy and compliance at the core.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button variant="primary" href="/portal/auth">Request Demo</Button>
          <Button variant="ghost" href="#features">Learn More</Button>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Healthcare IT"
          title="Built for Patient Care & Compliance"
          subtitle="Technology that improves outcomes while protecting patient privacy"
        />

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🏥",
              title: "Patient Portals",
              description: "Secure portals for appointment scheduling, medical records access, prescription refills, and provider messaging.",
            },
            {
              icon: "💊",
              title: "Telemedicine Platform",
              description: "HIPAA-compliant video consultations, e-prescribing, remote patient monitoring, and virtual waiting rooms.",
            },
            {
              icon: "📋",
              title: "EHR Integration",
              description: "Seamless integration with Epic, Cerner, and other EHR systems for unified patient data.",
            },
            {
              icon: "🔒",
              title: "HIPAA Compliance",
              description: "End-to-end encryption, secure authentication, audit logs, and BAA agreements included.",
            },
            {
              icon: "📊",
              title: "Health Analytics",
              description: "Population health insights, treatment effectiveness tracking, and outcomes reporting dashboards.",
            },
            {
              icon: "📱",
              title: "Mobile Health Apps",
              description: "iOS and Android apps for patient engagement, medication reminders, and health tracking.",
            },
          ].map((feature) => (
            <GlowCard key={feature.title} className="p-6 hover:shadow-brand2/20 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-text mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-text mb-6 text-center">Why Healthcare Organizations Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-brand mb-4">🔐 Security First</h3>
              <p className="text-muted text-sm leading-relaxed">
                We implement industry-leading security practices including encryption at rest and in transit, 
                multi-factor authentication, role-based access control, and comprehensive audit logging. 
                All systems are regularly penetration tested and security audited.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-brand mb-4">✅ Compliance Guaranteed</h3>
              <p className="text-muted text-sm leading-relaxed">
                Full HIPAA compliance with Business Associate Agreements (BAA), SOC 2 Type II certification in progress, 
                and adherence to HL7 FHIR standards for interoperability. We handle all compliance documentation and training.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-brand mb-4">🚀 Rapid Deployment</h3>
              <p className="text-muted text-sm leading-relaxed">
                Cloud-native architecture on Azure ensures quick setup, automatic scaling, and 99.9% uptime SLA. 
                Most patient portals go live within 6-8 weeks from kickoff.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-brand mb-4">💰 Cost-Effective</h3>
              <p className="text-muted text-sm leading-relaxed">
                Serverless infrastructure reduces operational costs by 60% compared to traditional hosting. 
                Pay only for actual usage with no expensive server maintenance or long-term contracts required.
              </p>
            </div>
          </div>
        </GlowCard>
      </section>

      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-12 text-center">
          <h2 className="h2 mb-4">Ready to Modernize Your Healthcare Technology?</h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Schedule a HIPAA-compliant consultation to discuss your needs and receive a detailed proposal.
          </p>
          <Button variant="primary" href="/portal/auth">Schedule Consultation</Button>
        </GlowCard>
      </section>

      <Footer />
    </main>
  );
}
