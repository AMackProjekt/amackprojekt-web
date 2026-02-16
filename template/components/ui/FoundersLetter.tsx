"use client";

import { motion } from "framer-motion";
import { GlowCard } from "./GlowCard";

export function FoundersLetter() {
  return (
    <GlowCard className="p-10 lg:p-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase mb-4">
          Letter from the Founder
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
            Bridging Social Gaps Through Technology
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Letter Content */}
          <div className="lg:col-span-2 space-y-6 text-text/90 leading-relaxed">
            <p className="text-lg font-semibold text-brand2">
              Dear Innovators,
            </p>
            
            <p>
              When I founded A MackProjekt, I had a simple yet powerful vision: <strong className="text-brand">use technology 
              to bridge the gaps that divide us</strong>—whether those gaps are in communication, opportunity, or access to 
              resources that can change lives.
            </p>

            <p>
              Growing up, I witnessed firsthand how the right support at the right time could transform someone's trajectory. 
              I also saw how technology, when wielded thoughtfully, could amplify that support exponentially. That's what 
              drives everything we build at MackEnterprises.
            </p>

            <p>
              <strong className="text-brand2">T.O.O.L.S. Inc.</strong> (Together Overcoming Obstacles and Limitations) 
              isn't just a platform—it's a promise. A promise to justice-involved individuals that their past doesn't 
              define their future. A promise that with the right tools, education, and AI-powered guidance, anyone can 
              rebuild and thrive.
            </p>

            <p>
              <strong className="text-brand">MackChat</strong> emerged from recognizing another gap: the disconnect between 
              military communities and the civilians they protect. Technology should bring us together, not keep us apart.
            </p>

            <p className="text-lg font-semibold text-text">
              This isn't about building startups with cool ideas. This is about building working, high-impact products 
              that solve real problems for real people.
            </p>

            <p>
              We're not generic tech templates. We're a team committed to using AI, data science, and thoughtful 
              engineering to create genuine social impact. Every line of code we write is in service of that mission.
            </p>

            <p className="text-brand2 font-semibold italic">
              "Innovation happens when technology meets purpose. Together, we're building bridges where walls once stood."
            </p>

            <div className="pt-6 border-t border-border">
              <p className="font-semibold text-text">Donyale "DThree" Mack</p>
              <p className="text-sm text-muted">Founder & CEO, MackEnterprises</p>
              <p className="text-sm text-muted">Chief Innovation Officer, A MackProjekt</p>
            </div>
          </div>

          {/* Sidebar Highlights */}
          <div className="space-y-6">
            <div className="glass rounded-xl p-6 border border-brand/20">
              <div className="text-4xl mb-3">🎯</div>
              <div className="text-sm font-semibold text-brand2 uppercase tracking-wider mb-2">
                Our Mission
              </div>
              <p className="text-sm text-text/90">
                Use technology to bridge social gaps and create pathways to opportunity for underserved communities.
              </p>
            </div>

            <div className="glass rounded-xl p-6 border border-brand2/20">
              <div className="text-4xl mb-3">💡</div>
              <div className="text-sm font-semibold text-brand uppercase tracking-wider mb-2">
                Our Approach
              </div>
              <p className="text-sm text-text/90">
                Build working, high-impact products powered by AI and data science—not just ideas, but real solutions.
              </p>
            </div>

            <div className="glass rounded-xl p-6 border border-accent/20">
              <div className="text-4xl mb-3">🚀</div>
              <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                Our Products
              </div>
              <ul className="text-sm text-text/90 space-y-2">
                <li>• <strong>T.O.O.L.S. Inc.</strong> - Reentry platform</li>
                <li>• <strong>MackChat</strong> - Community messaging</li>
                <li>• <strong>MackAI</strong> - AI-powered guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </GlowCard>
  );
}
