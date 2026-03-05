"use client";

import { Navbar } from "@/components/ui/Navbar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { motion } from "framer-motion";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-container px-7 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="h1">
            <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
              Join the Waitlist
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[760px] p-lead">
            Be the first to experience AMP — our platform destroying the digital divide.
            Early access, exclusive updates, and special perks await.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="mx-auto max-w-container px-7 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <GlowCard className="p-8 h-full">
              <h2 className="text-xl font-bold text-text mb-6">Quick Sign Up</h2>
              <WaitlistForm />
            </GlowCard>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <GlowCard className="p-8">
              <h3 className="text-lg font-semibold text-brand mb-4">✨ What Waitlist Members Get:</h3>
              <ul className="space-y-3">
                {[
                  "Early access to AMP platform before public launch",
                  "Exclusive founder pricing and special beta rates",
                  "Direct feedback channel with the AMP team",
                  "Monthly newsletter with AI insights and updates",
                  "Invitation to exclusive AMP community events",
                  "First to know about new features and programs",
                ].map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex gap-3 text-text"
                  >
                    <span className="text-brand text-lg flex-shrink-0">→</span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </GlowCard>

            {/* Alternative Contact */}
            <GlowCard className="p-8">
              <h3 className="text-lg font-semibold text-brand2 mb-4">💬 Prefer to Connect?</h3>
              <p className="text-muted mb-4">
                Beyond the form, you can reach our team through multiple channels:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-text">Email:</span> <a href="mailto:waitlist@mackprojekt.com" className="text-brand hover:text-brand2 transition">waitlist@mackprojekt.com</a>
                </p>
                <p>
                  <span className="font-semibold text-text">Support:</span> <a href="mailto:support@mackprojekt.com" className="text-brand hover:text-brand2 transition">support@mackprojekt.com</a>
                </p>
                <p>
                  <span className="font-semibold text-text">General:</span> <a href="mailto:hello@mackprojekt.com" className="text-brand hover:text-brand2 transition">hello@mackprojekt.com</a>
                </p>
              </div>
            </GlowCard>

            {/* Trust & Privacy */}
            <GlowCard className="p-8 bg-gradient-to-r from-brand/5 to-brand2/5">
              <h3 className="text-lg font-semibold text-text mb-3">🔒 Your Privacy Matters</h3>
              <p className="text-sm text-muted">
                We never sell your data. You'll only receive updates about AMP and can unsubscribe anytime. 
                By joining, you agree to our <a href="/privacy" className="text-brand hover:text-brand2">Privacy Policy</a>.
              </p>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-container px-7 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted mb-4">
            Questions about the waitlist?
          </p>
          <p className="text-sm text-muted">
            <a href="/#contact" className="text-brand hover:text-brand2 font-semibold transition">
              Contact us directly
            </a>
            {" "}or check out our{" "}
            <a href="/partnerships" className="text-brand hover:text-brand2 font-semibold transition">
              partnerships page
            </a>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
