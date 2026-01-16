import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function MessagingPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase mb-6">
          Coming Soon
        </div>
        <h1 className="h1">
          <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
            M.A.C.K
          </span>
          <br />
          Military And Civilian Kommunication Network
        </h1>

        <p className="mx-auto mt-6 max-w-[760px] p-lead">
          A revolutionary web-based messaging platform designed for modern teams and communities. 
          Real-time communication meets beautiful design.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary">Join Waitlist</Button>
          <Button variant="ghost">Learn More</Button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-container px-7 pt-8 pb-20">
        <SectionHeading
          eyebrow="Key Features"
          title="Everything You Need"
          subtitle="Built from the ground up with modern teams in mind, M.A.C.K delivers the features you need with the experience you deserve."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "💬",
              title: "Real-Time Messaging",
              description: "Instant message delivery with read receipts, typing indicators, and seamless synchronization across all devices."
            },
            {
              icon: "🔒",
              title: "End-to-End Encryption",
              description: "Bank-grade security ensuring your conversations remain private and protected at all times."
            },
            {
              icon: "👥",
              title: "Team Channels",
              description: "Organize conversations by topics, projects, or teams with flexible channel management."
            },
            {
              icon: "📁",
              title: "File Sharing",
              description: "Share documents, images, and files up to 100MB with preview support and drag-and-drop functionality."
            },
            {
              icon: "🔔",
              title: "Smart Notifications",
              description: "Customizable alerts that keep you informed without overwhelming you, with do-not-disturb modes."
            },
            {
              icon: "🎨",
              title: "Rich Media Support",
              description: "Share GIFs, emojis, code snippets, and formatted text to express yourself clearly."
            },
            {
              icon: "📱",
              title: "Cross-Platform",
              description: "Access your messages from any device - web, mobile, or desktop - with seamless sync."
            },
            {
              icon: "🔍",
              title: "Powerful Search",
              description: "Find any message, file, or conversation instantly with advanced search capabilities."
            },
            {
              icon: "🤖",
              title: "Bot Integration",
              description: "Extend functionality with custom bots and integrations with your favorite tools."
            }
          ].map(({ icon, title, description }) => (
            <GlowCard key={title} className="p-6">
              <div className="text-4xl mb-4">{icon}</div>
              <div className="text-lg font-extrabold tracking-tight">{title}</div>
              <div className="mt-2 text-sm text-muted leading-relaxed">{description}</div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* PREVIEW */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-brand2/5" />
          <div className="relative">
            <div className="text-center mb-10">
              <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
                Preview
              </div>
              <h2 className="h2 mt-4">
                Built for the Modern Web
              </h2>
              <p className="mx-auto mt-4 max-w-[680px] text-muted">
                M.A.C.K is built with the latest web technologies, delivering a native-app experience right in your browser.
              </p>
            </div>

            {/* Mock Interface */}
            <div className="bg-panel border border-border rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
              <div className="bg-glass border-b border-border p-4 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <div className="text-sm text-muted ml-4">M.A.C.K - General</div>
              </div>

              <div className="flex" style={{ height: "400px" }}>
                {/* Sidebar */}
                <div className="w-64 bg-bg border-r border-border p-4 space-y-2">
                  <div className="text-xs font-semibold text-brand2 uppercase tracking-wider mb-3">Channels</div>
                  {["general", "random", "team-updates", "projects"].map((channel) => (
                    <div
                      key={channel}
                      className={
                        channel === "general" 
                          ? "px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer bg-brand/20 text-text font-semibold" 
                          : "px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer text-muted hover:bg-glass"
                      }
                    >
                      # {channel}
                    </div>
                  ))}
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                  {[
                    { user: "Donyale Mack", time: "10:30 AM", message: "Welcome to M.A.C.K! 🎉" },
                    { user: "Team Member", time: "10:32 AM", message: "This looks amazing! Love the design." },
                    { user: "You", time: "10:35 AM", message: "Can't wait to use this for our team!" }
                  ].map((msg, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand2 flex items-center justify-center text-sm font-bold text-bg">
                        {msg.user[0]}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-semibold">{msg.user}</span>
                          <span className="text-xs text-muted">{msg.time}</span>
                        </div>
                        <div className="text-sm text-text/90 mt-1">{msg.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="bg-glass border-t border-border p-4">
                <div className="bg-panel border border-border rounded-lg px-4 py-3 text-sm text-muted">
                  Type a message...
                </div>
              </div>
            </div>
          </div>
        </GlowCard>
      </section>

      {/* TECH STACK */}
      <section className="mx-auto max-w-container px-7 py-20">
        <SectionHeading
          eyebrow="Technology"
          title="Built With Modern Tools"
          subtitle="M.A.C.K leverages cutting-edge technologies to deliver a fast, reliable, and scalable messaging experience."
        />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Next.js", desc: "React Framework" },
            { name: "TypeScript", desc: "Type Safety" },
            { name: "WebSocket", desc: "Real-time" },
            { name: "PostgreSQL", desc: "Database" },
            { name: "Redis", desc: "Caching" },
            { name: "Docker", desc: "Deployment" },
            { name: "AWS", desc: "Cloud Hosting" },
            { name: "Tailwind", desc: "Styling" }
          ].map(({ name, desc }) => (
            <GlowCard key={name} className="p-6 text-center">
              <div className="text-lg font-extrabold tracking-tight">{name}</div>
              <div className="text-xs text-muted mt-1">{desc}</div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10 text-center">
          <h2 className="h2">
            Be Among the First
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-muted">
            M.A.C.K (Military And Civilian Kommunication Network) is currently in development. Join our waitlist to get early access and be notified when we launch.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary">Join Waitlist</Button>
            <Button variant="ghost" href="/#contact">Contact Us</Button>
          </div>

          <div className="mt-8 text-sm text-muted">
            Expected Launch: Coming Soon
          </div>
        </GlowCard>
      </section>

      {/* FOOTER CTA */}
      <section className="mx-auto max-w-container px-7 py-16 text-center">
        <a href="/">
          <Button variant="ghost">Back to Home</Button>
        </a>
      </section>
    </main>
  );
}
