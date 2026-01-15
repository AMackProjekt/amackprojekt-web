"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/50 bg-panel/50 backdrop-blur-xl overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 footer-grid-bg" />
      </div>

      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent animate-pulse" />

      <div className="relative mx-auto max-w-container px-7 py-12">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Logo with glow effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 blur-2xl bg-brand/30 animate-pulse" />
            <img
              src="/partnerships/amp-logo.jpeg"
              alt="A MackProjekt"
              className="relative h-16 w-auto object-contain"
            />
          </motion.div>

          {/* Neon text with electric effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="text-center">
              <div className="relative inline-block">
                {/* Multiple glowing text layers for cyberpunk effect */}
                <span className="absolute inset-0 text-xl md:text-2xl font-extrabold tracking-wider blur-sm text-brand animate-pulse">
                  POWERED BY A MACKPROJEKT
                </span>
                <span className="absolute inset-0 text-xl md:text-2xl font-extrabold tracking-wider blur-md text-brand2 animate-pulse animation-delay-300">
                  POWERED BY A MACKPROJEKT
                </span>
                <span className="absolute inset-0 text-xl md:text-2xl font-extrabold tracking-wider blur-lg text-accent animate-pulse animation-delay-600">
                  POWERED BY A MACKPROJEKT
                </span>
                <span className="relative text-xl md:text-2xl font-extrabold tracking-wider bg-gradient-to-r from-brand via-brand2 to-accent bg-clip-text text-transparent animate-flicker">
                  POWERED BY A MACKPROJEKT
                </span>
              </div>
            </div>
          </motion.div>

          {/* Electric line decoration */}
          <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-brand to-transparent animate-pulse" />

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs text-muted/60 text-center font-mono"
          >
            © {new Date().getFullYear()} T.O.O.L.S Inc. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* Animated corner accents */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-brand/30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-brand2/30 animate-pulse animation-delay-500" />
    </footer>
  );
}
