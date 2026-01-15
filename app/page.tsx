"use client";

import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-bg overflow-hidden flex items-center justify-center">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      {/* Animated grid background */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(56,189,248,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.3)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Neon corner decorations */}
      <div className="pointer-events-none fixed top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-brand animate-flicker" />
      <div className="pointer-events-none fixed top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-brand2 animate-flicker animation-delay-300" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-brand2 animate-flicker animation-delay-500" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-brand animate-flicker animation-delay-600" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-7 py-20 text-center">
        {/* Coming Soon Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight2 mb-4">
            <span className="inline-block bg-gradient-to-r from-brand via-brand2 to-brand bg-clip-text text-transparent animate-flicker">
              Coming
            </span>
            <span className="text-muted/40 mx-2">............</span>
            <span className="inline-block bg-gradient-to-r from-brand2 via-brand to-brand2 bg-clip-text text-transparent animate-flicker animation-delay-300">
              Soon
            </span>
            <span className="text-muted/40 ml-2">.........</span>
          </h1>
          
          {/* Neon glow underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="mx-auto mt-8 h-1 w-64 bg-gradient-to-r from-transparent via-brand to-transparent animate-flicker animation-delay-500"
          />
        </motion.div>

        {/* Placeholder Image with Heartbeat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative mb-16 flex items-center justify-center"
        >
          <div className="relative">
            {/* Neon glow effect around image */}
            <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-brand/30 to-brand2/30 blur-3xl animate-flicker" />
            
            {/* Placeholder image container */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-panel to-bg border-2 border-brand/50 flex items-center justify-center animate-heartbeat shadow-glow overflow-hidden">
              {/* Cyberpunk icon/symbol */}
              <div className="text-6xl sm:text-7xl lg:text-8xl">
                <span className="inline-block bg-gradient-to-br from-brand to-brand2 bg-clip-text text-transparent font-extrabold">
                  A
                </span>
                <span className="inline-block bg-gradient-to-br from-brand2 to-accent bg-clip-text text-transparent font-extrabold">
                  M
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-4"
        >
          <div className="text-2xl sm:text-3xl font-bold tracking-wide">
            <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
              AMackProjekt
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-muted text-sm">
            <span className="w-2 h-2 rounded-full bg-brand animate-flicker" />
            <span>Under Construction</span>
            <span className="w-2 h-2 rounded-full bg-brand2 animate-flicker animation-delay-300" />
          </div>
        </motion.div>

        {/* Pulsing scanline effect */}
        <motion.div
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute inset-0 h-1 bg-gradient-to-b from-transparent via-brand/20 to-transparent"
        />
      </div>
    </main>
  );
}
