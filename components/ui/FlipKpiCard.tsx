"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface FlipKpiCardProps {
  icon: string;
  title: string;
  desc: string;
  back: string;
  index?: number;
  className?: string;
}

export function FlipKpiCard({ icon, title, desc, back, index = 0, className }: FlipKpiCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
      className={cn("h-36 cursor-pointer select-none", className)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((v) => !v)}
      aria-label={`${title}: ${flipped ? back : desc}`}
    >
      {/* Spin wrapper */}
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* FRONT */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 glass rounded-xl p-4 border border-accent/15 flex flex-col justify-between"
        >
          <div className="text-2xl">{icon}</div>
          <div>
            <div className="text-sm font-bold text-text mb-1">{title}</div>
            <div className="text-xs text-muted leading-snug">{desc}</div>
          </div>
          {/* Flip hint */}
          <div className="absolute bottom-2 right-2 text-[9px] text-muted/50 uppercase tracking-widest">hover</div>
        </div>

        {/* BACK */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 rounded-xl p-4 border border-brand2/25 bg-brand2/8 flex flex-col justify-center gap-2"
        >
          <div className="text-base font-extrabold text-brand2 leading-tight">{title}</div>
          <div className="text-xs text-text/90 leading-relaxed">{back}</div>
        </div>
      </div>
    </motion.div>
  );
}
