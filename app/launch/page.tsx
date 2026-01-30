"use client";

import { Navbar } from "@/components/ui/Navbar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QRCodeWithTracking } from "@/components/ui/QRCodeWithTracking";
import { LaunchVideo } from "@/components/ui/LaunchVideo";
import { ElectricBorder, ElectricText, ElectricButton, ElectricDivider } from "@/components/ui/ElectricEffects";
import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

export default function LaunchPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Electric Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-electric-glow" />

      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="h1">
            <ElectricText color="green">AMP Launch</ElectricText>
            <br />
            <span className="text-text">Destroying the Digital Divide</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[760px] p-lead">
            Join us in our mission to harness the power of AI and innovation to create 
            cutting-edge digital solutions that empower communities and bridge the digital divide.
          </p>
        </motion.div>

        <ElectricDivider className="my-12" color="green" />

        {/* Launch Video Section */}
        <div className="mt-16">
          <SectionHeading
            eyebrow="Watch Our Story"
            title="The AMP Launch Video"
            subtitle="Discover how we're transforming digital experiences through innovation and technology"
          />
          
          <div className="mt-10">
            <LaunchVideo 
              title="AMP Launch - A MackProjekt Revolution"
              description="Experience the future of digital innovation. Watch how AMP is destroying the digital divide through cutting-edge technology and AI-powered solutions."
            />
          </div>
        </div>

        <ElectricDivider className="my-16" color="green" />

        {/* QR Code Section */}
        <div className="mt-16">
          <SectionHeading
            eyebrow="Connect With Us"
            title="Scan & Share"
            subtitle="Share AMP with your network and help us spread innovation"
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* QR Code */}
            <div className="flex justify-center">
              <QRCodeWithTracking
                url="https://mackprojekt.com"
                size={300}
                title="Scan to Visit AMP"
                logoUrl="/logos/amp-logo.jpeg"
              />
            </div>

            {/* QR Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <ElectricBorder color="green" intensity="medium">
                <GlowCard>
                  <h3 className="text-xl font-bold text-text mb-4">
                    Share the <ElectricText color="green">AMP Experience</ElectricText>
                  </h3>
                  <div className="space-y-4 text-muted">
                    <p>
                      <strong className="text-green-400">📱 Mobile Optimized:</strong> Perfect for sharing 
                      on the go. Scan with your phone camera to instantly visit our site.
                    </p>
                    <p>
                      <strong className="text-green-400">📊 Tracked Analytics:</strong> Every scan is tracked 
                      to help us understand our reach and impact.
                    </p>
                    <p>
                      <strong className="text-green-400">💾 Downloadable:</strong> Download the QR code 
                      for print materials, presentations, and social media.
                    </p>
                    <p>
                      <strong className="text-green-400">🔗 Share Anywhere:</strong> Use the share button 
                      to spread AMP across all your platforms.
                    </p>
                  </div>
                </GlowCard>
              </ElectricBorder>

              <ElectricBorder color="brand2" intensity="low">
                <GlowCard>
                  <h4 className="font-bold text-brand2 mb-3">Why Share AMP?</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">⚡</span>
                      <span>Help us bridge the digital divide in communities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">⚡</span>
                      <span>Spread innovation and AI-powered solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">⚡</span>
                      <span>Connect with like-minded innovators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">⚡</span>
                      <span>Support the growth of digital literacy</span>
                    </li>
                  </ul>
                </GlowCard>
              </ElectricBorder>
            </motion.div>
          </div>
        </div>

        <ElectricDivider className="my-16" color="brand" />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <ElectricBorder color="green" intensity="high">
            <GlowCard className="p-10">
              <h2 className="h2 mb-4">
                Ready to <ElectricText color="green">Join the Revolution</ElectricText>?
              </h2>
              <p className="text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
                Whether you&apos;re an innovator, entrepreneur, or community leader, 
                AMP has the tools and solutions to help you succeed in the digital age.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <ElectricButton color="green" variant="solid">
                  Get Started Now
                </ElectricButton>
                <ElectricButton color="green" variant="outline">
                  Learn More
                </ElectricButton>
              </div>
            </GlowCard>
          </ElectricBorder>
        </motion.div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: "100%", label: "AI-Powered", color: "green" as const },
            { number: "24/7", label: "Innovation Lab", color: "brand" as const },
            { number: "∞", label: "Possibilities", color: "brand2" as const },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ElectricBorder color={stat.color} intensity="medium">
                <GlowCard className="text-center p-8">
                  <div className="text-4xl font-extrabold mb-2">
                    <ElectricText color={stat.color}>{stat.number}</ElectricText>
                  </div>
                  <div className="text-sm text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </GlowCard>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
