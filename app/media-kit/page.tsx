import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Press & Media Kit - A MackProjekt",
  description: "Brand assets, logos, and press resources for A MackProjekt and MackEnterprises",
};

export default function MediaKitPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />
      
      <section className="mx-auto max-w-container px-7 pt-32 pb-20">
        <SectionHeading
          eyebrow="For Media & Partners"
          title="Press & Media Kit"
          subtitle="Brand assets, logos, founder information, and press resources"
        />

        {/* Quick Facts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlowCard className="p-6 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <div className="text-2xl font-extrabold text-brand mb-2">2026</div>
            <div className="text-sm text-muted">Founded</div>
          </GlowCard>

          <GlowCard className="p-6 text-center">
            <div className="text-4xl mb-3">🌐</div>
            <div className="text-2xl font-extrabold text-brand2 mb-2">3+</div>
            <div className="text-sm text-muted">Active Products</div>
          </GlowCard>

          <GlowCard className="p-6 text-center">
            <div className="text-4xl mb-3">💡</div>
            <div className="text-2xl font-extrabold text-accent mb-2">AI-First</div>
            <div className="text-sm text-muted">Innovation Focus</div>
          </GlowCard>
        </div>

        {/* Company Overview */}
        <div className="mt-12">
          <GlowCard className="p-10">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">Company Overview</h2>
            
            <div className="space-y-6 text-text/90">
              <div>
                <h3 className="font-semibold text-text mb-2">A MackProjekt</h3>
                <p className="leading-relaxed">
                  A MackProjekt is the innovation lab of MackEnterprises, dedicated to building cutting-edge digital 
                  solutions that leverage AI and data science to bridge social gaps. We create working, high-impact 
                  products that solve real problems for underserved communities.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text mb-2">Mission</h3>
                <p className="leading-relaxed">
                  To use technology to bridge social gaps and create pathways to opportunity for underserved communities, 
                  particularly justice-involved individuals and military families.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text mb-2">Flagship Products</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand">•</span>
                    <div>
                      <strong className="text-text">T.O.O.L.S. Inc.</strong> - Comprehensive reentry platform 
                      empowering justice-involved individuals through AI-powered career matching, education, and mentorship.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand2">•</span>
                    <div>
                      <strong className="text-text">MackChat</strong> - Revolutionary messaging platform bridging 
                      military and civilian communities with real-time communication and military-grade security.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <div>
                      <strong className="text-text">MackAI</strong> - AI-powered guidance system integrated across 
                      our platforms for personalized support and decision-making.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Founder Information */}
        <div className="mt-12">
          <GlowCard className="p-10">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">Founder & Leadership</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="aspect-square bg-gradient-to-br from-brand/20 to-brand2/20 rounded-xl flex items-center justify-center text-6xl">
                  👨‍💼
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4 text-text/90">
                <div>
                  <h3 className="text-xl font-extrabold text-text mb-1">Donyale "DThree" Mack</h3>
                  <p className="text-brand2 font-semibold">Founder & CEO, MackEnterprises</p>
                  <p className="text-muted text-sm">Chief Innovation Officer, A MackProjekt</p>
                </div>

                <p className="leading-relaxed">
                  Donyale Mack is a visionary entrepreneur and technologist with a passion for using AI and data science 
                  to create social impact. With a background in software engineering and a deep understanding of the 
                  challenges facing underserved communities, Donyale founded MackEnterprises to build technology solutions 
                  that truly make a difference.
                </p>

                <div>
                  <h4 className="font-semibold text-text mb-2">Philosophy</h4>
                  <p className="italic text-brand2">
                    "Innovation happens when technology meets purpose. We're not building startups with cool ideas—we're 
                    building working products that solve real problems for real people."
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-text mb-2">Contact for Media Inquiries</h4>
                  <ul className="space-y-1 text-sm">
                    <li>📧 Email: <a href="mailto:ampstudio@mackprojekt.com" className="text-brand hover:text-brand2 underline">ampstudio@mackprojekt.com</a></li>
                    <li>📧 Press: <a href="mailto:press@mackprojekt.com" className="text-brand hover:text-brand2 underline">press@mackprojekt.com</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Brand Assets */}
        <div className="mt-12">
          <GlowCard className="p-10">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">Brand Assets</h2>

            <div className="space-y-6">
              {/* Logos */}
              <div>
                <h3 className="font-semibold text-text mb-4">Logos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="bg-white rounded-lg p-4 mb-3">
                      <img src="/logos/amp-logo.jpeg" alt="AMP Logo" className="w-full h-auto" />
                    </div>
                    <p className="text-sm text-muted">Primary Logo</p>
                    <a 
                      href="/logos/amp-logo.jpeg" 
                      download 
                      className="inline-block mt-2 px-4 py-2 text-xs text-muted hover:text-brand transition-colors border border-border rounded-lg hover:border-brand/50"
                    >
                      Download
                    </a>
                  </div>

                  <div className="glass rounded-xl p-6 text-center">
                    <div className="bg-white rounded-lg p-4 mb-3">
                      <img src="/logos/tools-logo.jpeg" alt="T.O.O.L.S. Logo" className="w-full h-auto" />
                    </div>
                    <p className="text-sm text-muted">T.O.O.L.S. Inc.</p>
                    <a 
                      href="/logos/tools-logo.jpeg" 
                      download 
                      className="inline-block mt-2 px-4 py-2 text-xs text-muted hover:text-brand transition-colors border border-border rounded-lg hover:border-brand/50"
                    >
                      Download
                    </a>
                  </div>

                  <div className="glass rounded-xl p-6 text-center">
                    <div className="bg-white rounded-lg p-4 mb-3">
                      <img src="/partnerships/amp-logo.jpeg" alt="Partnership Logo" className="w-full h-auto" />
                    </div>
                    <p className="text-sm text-muted">Partnership Logo</p>
                    <a 
                      href="/partnerships/amp-logo.jpeg" 
                      download 
                      className="inline-block mt-2 px-4 py-2 text-xs text-muted hover:text-brand transition-colors border border-border rounded-lg hover:border-brand/50"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>

              {/* Brand Colors */}
              <div>
                <h3 className="font-semibold text-text mb-4">Brand Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#38bdf8] mb-2"></div>
                    <p className="text-xs text-text">Brand Blue</p>
                    <p className="text-xs text-muted font-mono">#38bdf8</p>
                  </div>
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-br from-[#2dd4bf] to-[#2dd4bf] mb-2"></div>
                    <p className="text-xs text-text">Brand Teal</p>
                    <p className="text-xs text-muted font-mono">#2dd4bf</p>
                  </div>
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#a78bfa] mb-2"></div>
                    <p className="text-xs text-text">Accent Purple</p>
                    <p className="text-xs text-muted font-mono">#a78bfa</p>
                  </div>
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-br from-[#22c55e] to-[#22c55e] mb-2"></div>
                    <p className="text-xs text-text">Electric Green</p>
                    <p className="text-xs text-muted font-mono">#22c55e</p>
                  </div>
                  <div className="text-center">
                    <div className="h-20 rounded-lg bg-gradient-to-br from-[#06070b] to-[#06070b] mb-2 border border-border"></div>
                    <p className="text-xs text-text">Background</p>
                    <p className="text-xs text-muted font-mono">#06070b</p>
                  </div>
                </div>
              </div>

              {/* Usage Guidelines */}
              <div className="bg-brand/10 border border-brand/30 rounded-lg p-6">
                <h3 className="font-semibold text-text mb-3">Usage Guidelines</h3>
                <ul className="space-y-2 text-sm text-text/90">
                  <li>✓ Use logos on solid backgrounds with sufficient contrast</li>
                  <li>✓ Maintain minimum clear space around logos</li>
                  <li>✓ Use approved brand colors for digital and print materials</li>
                  <li>✗ Do not distort, rotate, or modify logos</li>
                  <li>✗ Do not place logos on busy or conflicting backgrounds</li>
                  <li>✗ Do not use outdated or unauthorized versions</li>
                </ul>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Press Resources */}
        <div className="mt-12">
          <GlowCard className="p-10">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">Press Resources</h2>

            <div className="space-y-6 text-text/90">
              <div>
                <h3 className="font-semibold text-text mb-2">Boilerplate</h3>
                <div className="glass rounded-lg p-6">
                  <p className="leading-relaxed italic">
                    A MackProjekt is the innovation lab of MackEnterprises, building AI-powered platforms that bridge social 
                    gaps and create opportunities for underserved communities. Our flagship products include T.O.O.L.S. Inc., 
                    a comprehensive reentry platform for justice-involved individuals, and MackChat, a revolutionary messaging 
                    platform connecting military and civilian communities. Founded by Donyale "DThree" Mack in 2026, we're 
                    committed to creating working, high-impact technology solutions that make a real difference in people's lives.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-text mb-2">Key Statistics</h3>
                <ul className="space-y-2">
                  <li>• 1,200+ users served through T.O.O.L.S. Inc. platform</li>
                  <li>• 87% success rate for job placement and reentry programs</li>
                  <li>• 3 flagship products launching in 2026</li>
                  <li>• AI-powered career matching with 90%+ accuracy</li>
                  <li>• Military-grade encryption for secure communications</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-text mb-2">Recent Milestones</h3>
                <ul className="space-y-2">
                  <li>• Q1 2026: Platform launch and initial user onboarding</li>
                  <li>• Q2 2026: MackChat private beta release</li>
                  <li>• Q3 2026: Partnership program expansion</li>
                  <li>• Q4 2026: Full platform launch with AI enhancements</li>
                </ul>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Contact Section */}
        <div className="mt-12">
          <GlowCard className="p-10 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">Media Inquiries</h2>
            <p className="text-muted max-w-2xl mx-auto mb-8">
              For press inquiries, interview requests, or additional information, please contact our media team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" href="mailto:press@mackprojekt.com">
                📧 press@mackprojekt.com
              </Button>
              <Button variant="ghost" href="mailto:ampstudio@mackprojekt.com">
                📧 ampstudio@mackprojekt.com
              </Button>
            </div>
          </GlowCard>
        </div>
      </section>
    </main>
  );
}
