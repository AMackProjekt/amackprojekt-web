import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

export default function MessagingPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase mb-4">
          Preview
        </div>
        <h1 className="h1">
          <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
            M.A.C.K.
          </span>
          <br />
          Military And Civilian Kommunication Network
        </h1>

        <p className="mx-auto mt-6 max-w-[760px] p-lead">
          A revolutionary web-based messaging platform designed to bridge the gap between military and civilian communities. 
          Real-time communication with modern features, beautiful design, and seamless integration.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" href="/#contact">Join Waitlist</Button>
          <Button variant="ghost" href="/">Back to Home</Button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-container px-7 py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GlowCard className="p-8">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-extrabold tracking-tight mb-3">Real-Time Messaging</h3>
            <p className="text-sm text-muted leading-relaxed">
              Instant communication with powerful real-time messaging capabilities. Stay connected with your team, family, and community.
            </p>
          </GlowCard>

          <GlowCard className="p-8">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-extrabold tracking-tight mb-3">Secure & Private</h3>
            <p className="text-sm text-muted leading-relaxed">
              Military-grade encryption ensures your conversations remain private and secure. Built with security at its core.
            </p>
          </GlowCard>

          <GlowCard className="p-8">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-extrabold tracking-tight mb-3">Community Groups</h3>
            <p className="text-sm text-muted leading-relaxed">
              Create and manage groups for teams, units, families, or communities. Organize conversations with channels and threads.
            </p>
          </GlowCard>

          <GlowCard className="p-8">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-extrabold tracking-tight mb-3">Cross-Platform</h3>
            <p className="text-sm text-muted leading-relaxed">
              Access your messages from any device. Web, mobile, and desktop apps coming soon for seamless communication.
            </p>
          </GlowCard>

          <GlowCard className="p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-extrabold tracking-tight mb-3">Military-Focused</h3>
            <p className="text-sm text-muted leading-relaxed">
              Built specifically with military and veteran communities in mind, with features tailored to their unique needs.
            </p>
          </GlowCard>

          <GlowCard className="p-8">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-extrabold tracking-tight mb-3">Bridging Communities</h3>
            <p className="text-sm text-muted leading-relaxed">
              Connect military members with civilian supporters, creating stronger bonds between those who serve and those they protect.
            </p>
          </GlowCard>
        </div>
      </section>

      {/* PREVIEW SECTION */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10 lg:p-16 text-center">
          <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase mb-4">
            Coming Soon
          </div>
          <h2 className="h2 mb-6">
            Be Part of Something Revolutionary
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            M.A.C.K. is currently in development. Join our waitlist to be notified when we launch 
            and get early access to the platform that will transform how military and civilian communities connect.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="glass rounded-lg p-6">
              <div className="text-3xl font-extrabold text-brand mb-2">Q2 2026</div>
              <div className="text-sm text-muted">Private Beta Launch</div>
            </div>
            <div className="glass rounded-lg p-6">
              <div className="text-3xl font-extrabold text-brand2 mb-2">Q3 2026</div>
              <div className="text-sm text-muted">Public Beta Release</div>
            </div>
            <div className="glass rounded-lg p-6">
              <div className="text-3xl font-extrabold text-accent mb-2">Q4 2026</div>
              <div className="text-sm text-muted">Full Platform Launch</div>
            </div>
          </div>

          <div className="mt-12">
            <Button variant="primary" href="/#contact">Join the Waitlist</Button>
          </div>
        </GlowCard>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-container px-7 py-16 text-center">
        <div className="text-muted mb-8">
          Questions about M.A.C.K.? Reach out to us.
        </div>
        <Button variant="ghost" href="/#contact">Contact Us</Button>
      </section>
    </main>
  );
}
