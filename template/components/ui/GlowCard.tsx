"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function GlowCard({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className={cn(
        "relative overflow-hidden rounded-xl glass p-6",
        "transition-shadow hover:shadow-glow",
        className
      )}
    >
      {/* subtle animated glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-24 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          background:
            "radial-gradient(600px 220px at 30% 20%, rgba(56,189,248,.18), transparent 60%), radial-gradient(500px 200px at 80% 30%, rgba(167,139,250,.16), transparent 55%)"
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
