import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";

export default function NonprofitSolutionsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />

      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase mb-4">
          Social Impact Technology
        </div>
        <h1 className="h1 mb-6">
          Purpose-Driven Tech for <span className="bg-gradient-to-r from-brand2 to-accent bg-clip-text text-transparent">Nonprofits</span>
        </h1>
        <p className="mx-auto max-w-2xl p-lead">
          Affordable donation platforms, volunteer management, impact tracking, and community engagement tools designed for organizations changing the world.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button variant="primary" href="/portal/auth">Apply for Nonprofit Pricing</Button>
        </div>
      </section>

      <section className="mx-auto max-w-container px-7 py-20">
        <div className="glass rounded-xl p-8 text-center mb-12 border border-brand2/30">
          <h3 className="text-xl font-bold text-text mb-2">💚 Special Nonprofit Pricing</h3>
          <p className="text-muted">
            We offer <span className="text-brand2 font-semibold">40% discounts</span> for 501(c)(3) nonprofits and mission-driven organizations. 
            Because technology should empower changemakers, not drain budgets.
          </p>
        </div>

        <SectionHeading
          eyebrow="Solutions"
          title="Everything Your Organization Needs"
          subtitle="From fundraising to impact reporting, we've got you covered"
        />

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "💝",
              title: "Donation Platform",
              description: "Secure online giving with recurring donations, tribute gifts, employer matching, and automated thank-you emails.",
            },
            {
              icon: "👥",
              title: "Volunteer Management",
              description: "Sign-ups, scheduling, hour tracking, background checks integration, and volunteer appreciation tools.",
            },
            {
              icon: "📊",
              title: "Impact Dashboards",
              description: "Visual storytelling of your impact with real-time metrics, annual report generators, and donor impact statements.",
            },
            {
              icon: "📧",
              title: "Email Campaigns",
              description: "Segmented donor communications, event invitations, newsletters, and automated stewardship sequences.",
            },
            {
              icon: "🎟️",
              title: "Event Management",
              description: "Ticketing, registration, check-in apps, auction platforms, and post-event surveys.",
            },
            {
              icon: "📱",
              title: "Mobile Apps",
              description: "Custom apps for members, volunteers, or beneficiaries with push notifications and offline support.",
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
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent, Mission-Aligned Investment"
          subtitle="No hidden fees, no surprises. Just honest pricing for organizations doing good."
        />

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <GlowCard className="p-8">
            <h3 className="text-2xl font-bold text-text mb-4">Nonprofit Package</h3>
            <div className="text-4xl font-bold text-brand2 mb-2">$4,500</div>
            <div className="text-sm text-muted mb-6">(40% discount applied)</div>
            
            <h4 className="font-semibold text-text mb-3">Includes:</h4>
            <ul className="space-y-2 text-sm text-muted mb-8">
              <li>✓ Custom website with donation integration</li>
              <li>✓ Volunteer sign-up and management</li>
              <li>✓ Email marketing (up to 5,000 contacts)</li>
              <li>✓ Basic impact dashboard</li>
              <li>✓ 6 months support & hosting</li>
              <li>✓ Training for your team</li>
            </ul>

            <Button variant="primary" href="/portal/auth" className="w-full">
              Apply Now
            </Button>
          </GlowCard>

          <GlowCard className="p-8 ring-2 ring-brand2 shadow-glow">
            <div className="text-xs font-semibold text-brand2 uppercase tracking-wide mb-2">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-text mb-4">Advanced Nonprofit</h3>
            <div className="text-4xl font-bold text-brand2 mb-2">$9,000</div>
            <div className="text-sm text-muted mb-6">(40% discount applied)</div>
            
            <h4 className="font-semibold text-text mb-3">Everything in Nonprofit, plus:</h4>
            <ul className="space-y-2 text-sm text-muted mb-8">
              <li>✓ Advanced impact reporting & analytics</li>
              <li>✓ Event ticketing & registration</li>
              <li>✓ CRM integration (Salesforce, etc.)</li>
              <li>✓ Grant tracking & reporting tools</li>
              <li>✓ Mobile app for beneficiaries</li>
              <li>✓ 12 months premium support</li>
            </ul>

            <Button variant="primary" href="/portal/auth" className="w-full">
              Apply Now
            </Button>
          </GlowCard>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted text-sm">
            Payment plans available. We also accept equity partnerships and pro-bono work for select organizations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-12 text-center">
          <h2 className="h2 mb-4">Ready to Amplify Your Impact?</h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Let's discuss how technology can help you reach more people, raise more funds, and measure your impact more effectively.
          </p>
          <Button variant="primary" href="/portal/auth">Schedule Free Consultation</Button>
        </GlowCard>
      </section>

      <Footer />
    </main>
  );
}
