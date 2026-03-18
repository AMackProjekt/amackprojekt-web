"use client";

import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChatBot } from "@/components/ui/ChatBot";
import { ElectricText, ElectricDivider } from "@/components/ui/ElectricEffects";
import { motion } from "framer-motion";

export default function InnovationPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-electric-glow" />
      
      <Navbar />
      <ChatBot />

      {/* HERO */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="h1">
            <ElectricText color="green">Innovation</ElectricText>
            <br />
            <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
              Through Inclusion
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[860px] p-lead">
            We believe untapped genius exists in underserved, underrepresented, and overlooked 
            inner-city communities. Self-taught programmers aren't just builders—they're innovators 
            who see problems differently because they've lived them.
          </p>
        </motion.div>
      </section>

      {/* VISION STATEMENT */}
      <section className="mx-auto max-w-container px-7 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlowCard className="bg-gradient-to-br from-panel via-bg to-panel border-green-400/20 p-8 md:p-12">
            <div className="text-center">
              <h2 className="h2 mb-4">
                <span className="text-green-400">From Underserved</span> to Unstoppable
              </h2>
              <p className="text-lg text-muted leading-relaxed max-w-[900px] mx-auto">
                Traditional tech pipelines overlook the most resourceful problem-solvers: those who taught 
                themselves to code with borrowed laptops, public library internet, and sheer determination. 
                We're building pathways for self-educated developers from inner-city communities to access 
                opportunities, mentorship, and capital that match their talent—not their pedigree.
              </p>
            </div>
          </GlowCard>
        </motion.div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7" color="green" />

      {/* THE PROBLEM */}
      <section className="mx-auto max-w-container px-7 py-16">
        <SectionHeading
          eyebrow="The Reality"
          title="Why Traditional Paths Exclude Brilliance"
          subtitle="The tech industry has a talent problem—not because talent doesn't exist, but because we're looking in the wrong places."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowCard className="h-full">
              <h3 className="text-xl font-extrabold text-text mb-3">🚫 Gatekeeping by Credentials</h3>
              <p className="text-muted leading-relaxed">
                Job postings demand CS degrees from elite universities, filtering out self-taught developers 
                who've built production apps, contributed to open source, and solved real-world problems with code.
              </p>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowCard className="h-full">
              <h3 className="text-xl font-extrabold text-text mb-3">💰 Access to Capital</h3>
              <p className="text-muted leading-relaxed">
                Venture capital flows to networks, not ideas. Founders from underrepresented communities 
                receive less than 2% of VC funding—not because their ideas lack merit, but because they 
                lack access to the rooms where deals are made.
              </p>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <GlowCard className="h-full">
              <h3 className="text-xl font-extrabold text-text mb-3">🔗 Network Effects</h3>
              <p className="text-muted leading-relaxed">
                Silicon Valley thrives on referrals and warm introductions. Inner-city developers don't have 
                Stanford roommates who work at FAANG companies, so their resumes die in ATS systems.
              </p>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <GlowCard className="h-full">
              <h3 className="text-xl font-extrabold text-text mb-3">📚 Resource Scarcity</h3>
              <p className="text-muted leading-relaxed">
                While bootcamps cost $15K-$20K and promise job placement, underserved communities face 
                barriers to entry: no savings, unstable housing, family obligations, and lack of mentorship.
              </p>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7" color="green" />

      {/* OUR SOLUTION */}
      <section className="mx-auto max-w-container px-7 py-16">
        <SectionHeading
          eyebrow="Our Approach"
          title="Building Bridges, Not Barriers"
          subtitle="We're creating infrastructure that connects overlooked talent with opportunities that match their skills."
        />

        <div className="mt-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowCard className="border-green-400/30">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-5xl">🎓</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-text mb-3">Skills-Based Learning Platforms</h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Free, project-based learning paths that teach production-level skills: version control, 
                    cloud deployment, API design, database architecture. No lectures—just build real apps 
                    that go on your portfolio.
                  </p>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Curriculum designed by senior engineers from FAANG/unicorn startups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Peer code reviews and mentorship from experienced developers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Career services: resume reviews, mock interviews, salary negotiation coaching</span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <GlowCard className="border-green-400/30">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-5xl">💼</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-text mb-3">Job Placement Network</h3>
                  <p className="text-muted leading-relaxed mb-4">
                    We partner with companies committed to hiring based on demonstrated ability, not credentials. 
                    Our network includes startups, scale-ups, and enterprises looking for hungry, capable developers.
                  </p>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Direct referrals to hiring managers (skip the ATS black hole)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Portfolio-based hiring: showcase your GitHub, live projects, and code quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Job-readiness support: technical interview prep, system design coaching</span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <GlowCard className="border-green-400/30">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-text mb-3">Founder Support Program</h3>
                  <p className="text-muted leading-relaxed mb-4">
                    For self-taught developers building startups, we provide technical guidance, business 
                    strategy, and introductions to angel investors and VCs who understand unconventional founders.
                  </p>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>MVP development support: architecture reviews, tech stack recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Pitch deck coaching and investor intro warm handoffs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Community of founders who've walked the same path (peer mentorship)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <GlowCard className="border-green-400/30">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-5xl">🌍</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-text mb-3">Community Hubs</h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Physical and virtual spaces where inner-city developers can access high-speed internet, 
                    equipment, mentorship, and a community of peers committed to mutual success.
                  </p>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Co-working spaces with free wifi, monitors, and development tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Weekly meetups: code jams, hackathons, technical talks from industry pros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Safe, dedicated space to learn without distractions or instability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7" color="green" />

      {/* WHAT WE'VE BUILT */}
      <section className="mx-auto max-w-container px-7 py-16">
        <SectionHeading
          eyebrow="Proof of Work"
          title="What We&apos;ve Built"
          subtitle="Real products, real platforms, and real problem-solving already in motion."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowCard className="h-full border-green-400/30">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-extrabold text-text mb-3">T.O.O.L.S. Inc.</h3>
              <p className="text-sm text-muted leading-relaxed">
                A reentry platform supporting justice-involved individuals through guided pathways,
                job readiness, education support, and AI-powered direction.
              </p>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <GlowCard className="h-full border-green-400/30">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-extrabold text-text mb-3">MackChat</h3>
              <p className="text-sm text-muted leading-relaxed">
                A community messaging platform connecting military members and civilian supporters
                through secure, structured, real-time communication.
              </p>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <GlowCard className="h-full border-green-400/30">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-extrabold text-text mb-3">A MackProjekt</h3>
              <p className="text-sm text-muted leading-relaxed">
                The parent innovation lab and digital platform brand behind the products, strategy,
                engineering execution, and community-facing experiences we build.
              </p>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <GlowCard className="h-full border-green-400/30">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-extrabold text-text mb-3">IWantMyLawyerPresent</h3>
              <p className="text-sm text-muted leading-relaxed">
                A rights-awareness website built to help people better understand legal representation,
                accountability, and high-stakes interactions.
              </p>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      <ElectricDivider className="mx-auto max-w-container px-7" color="green" />

      {/* PRINCIPLES */}
      <section className="mx-auto max-w-container px-7 py-16">
        <SectionHeading
          eyebrow="Our Principles"
          title="What We Stand For"
          subtitle="These aren't just words—they're commitments we hold ourselves accountable to."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowCard className="h-full text-center">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-extrabold text-text mb-3">Skills Over Pedigree</h3>
              <p className="text-sm text-muted leading-relaxed">
                We evaluate developers by what they've built and how they solve problems—not where 
                they went to school or who they know.
              </p>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <GlowCard className="h-full text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-extrabold text-text mb-3">Community First</h3>
              <p className="text-sm text-muted leading-relaxed">
                We lift as we climb. Every success story becomes a mentor, investor, or advocate 
                for the next generation of overlooked talent.
              </p>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <GlowCard className="h-full text-center">
              <div className="text-4xl mb-4">🔓</div>
              <h3 className="text-xl font-extrabold text-text mb-3">Open Access</h3>
              <p className="text-sm text-muted leading-relaxed">
                Knowledge shouldn't be paywalled. Our resources are free, our network is accessible, 
                and our doors are open to anyone willing to put in the work.
              </p>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-container px-7 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlowCard className="bg-gradient-to-br from-green-950/20 via-panel to-green-950/20 border-green-400/40 p-8 md:p-12 text-center">
            <h2 className="h2 mb-4">
              <span className="text-green-400">Join the Movement</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed max-w-[700px] mx-auto mb-8">
              Whether you're a self-taught developer looking for opportunity, a company seeking exceptional 
              talent, or an investor backing unconventional founders—there's a place for you here.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" href="/portal/auth">
                Join Our Platform
              </Button>
              <Button variant="ghost" href="/partnerships">
                Partner With Us
              </Button>
              <Button variant="ghost" href="/referral">
                Refer Someone
              </Button>
            </div>
          </GlowCard>
        </motion.div>
      </section>
    </main>
  );
}
