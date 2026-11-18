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
        "transition-colors",
        className
      )}
    >
      <div className="relative">{children}</div>
    </motion.div>
  );
}
