import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";

export default function RetailSolutionsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <div className="text-xs font-semibold tracking-[0.18em] text-brand uppercase mb-4">
          Industry Solutions
        </div>
        <h1 className="h1 mb-6">
          Digital Solutions for <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">Retail & E-Commerce</span>
        </h1>
        <p className="mx-auto max-w-2xl p-lead">
          Transform your retail business with modern e-commerce platforms, inventory management, customer analytics, and marketing automation designed to increase sales and streamline operations.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button variant="primary" href="/portal/auth">Get Started</Button>
          <Button variant="ghost" href="#features">View Features</Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Retail Technology"
          title="Everything Your Store Needs"
          subtitle="From online storefronts to backend management, we build complete retail solutions"
        />

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🛒",
              title: "E-Commerce Platform",
              description: "Custom online stores with product catalogs, shopping carts, secure checkout, and payment processing (Stripe, PayPal).",
            },
            {
              icon: "📊",
              title: "Inventory Management",
              description: "Real-time stock tracking, automated reordering, multi-location support, and SKU management.",
            },
            {
              icon: "📱",
              title: "Mobile POS Integration",
              description: "Connect your physical store with online inventory. Process in-store and online orders seamlessly.",
            },
            {
              icon: "📈",
              title: "Sales Analytics",
              description: "Track revenue, customer behavior, product performance, and marketing ROI with intuitive dashboards.",
            },
            {
              icon: "💳",
              title: "Customer Accounts",
              description: "Let customers create profiles, save payment methods, track orders, and manage wishlists.",
            },
            {
              icon: "📧",
              title: "Marketing Automation",
              description: "Email campaigns, abandoned cart recovery, loyalty programs, and personalized promotions.",
            },
          ].map((feature) => (
            <GlowCard key={feature.title} className="p-6 hover:shadow-brand/20 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-text mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Case Study */}
      <section className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Success Story"
          title="How We Helped a Local Boutique Go Online"
          subtitle="$120K in online revenue in the first 6 months"
        />

        <GlowCard className="p-8 lg:p-12 mt-10">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-text mb-4">The Challenge</h3>
              <p className="text-muted mb-6">
                A local clothing boutique needed to expand beyond foot traffic. They had no online presence, 
                manual inventory tracking in Excel, and were losing customers to online competitors.
              </p>
              <h3 className="text-xl font-bold text-text mb-4">Our Solution</h3>
              <p className="text-muted">
                We built a custom e-commerce platform integrated with their POS system, automated inventory 
                management, and launched targeted social media campaigns. The site features virtual try-on, 
                size recommendations, and a loyalty rewards program.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-text mb-6">Results After 6 Months</h3>
              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <div className="text-3xl font-bold text-brand">$120K</div>
                  <div className="text-sm text-muted">Online Revenue Generated</div>
                </div>
                <div className="glass rounded-lg p-4">
                  <div className="text-3xl font-bold text-brand2">2,400+</div>
                  <div className="text-sm text-muted">New Customers Acquired</div>
                </div>
                <div className="glass rounded-lg p-4">
                  <div className="text-3xl font-bold text-accent">40%</div>
                  <div className="text-sm text-muted">Increase in Total Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </GlowCard>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Investment"
          title="Flexible Pricing for Every Business"
          subtitle="Choose the package that fits your needs and budget"
        />

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter Store",
              price: "$8,500",
              features: [
                "Up to 50 products",
                "Basic e-commerce features",
                "Stripe/PayPal integration",
                "Mobile responsive design",
                "3 months support",
              ],
            },
            {
              name: "Professional Store",
              price: "$18,000",
              features: [
                "Unlimited products",
                "Advanced inventory management",
                "Customer accounts & wishlists",
                "Marketing automation",
                "POS integration",
                "6 months support",
              ],
              highlighted: true,
            },
            {
              name: "Enterprise Platform",
              price: "Custom",
              features: [
                "Multi-location support",
                "Advanced analytics & reporting",
                "Custom integrations",
                "Dedicated account manager",
                "12 months premium support",
              ],
            },
          ].map((plan) => (
            <GlowCard
              key={plan.name}
              className={`p-6 ${plan.highlighted ? "ring-2 ring-brand shadow-glow" : ""}`}
            >
              <h3 className="text-xl font-bold text-text mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-brand mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="text-brand">✓</span>
                    <span className="text-text">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? "primary" : "ghost"}
                href="/portal/auth"
                className="w-full"
              >
                Get Started
              </Button>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-12 text-center">
          <h2 className="h2 mb-4">Ready to Take Your Retail Business Online?</h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Schedule a free 30-minute consultation to discuss your business goals and get a custom quote.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="primary" href="/portal/auth">Schedule Consultation</Button>
            <Button variant="ghost" href="/">View More Solutions</Button>
          </div>
        </GlowCard>
      </section>

      <Footer />
    </main>
  );
}
