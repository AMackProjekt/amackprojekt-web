"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  variant?: "primary" | "ghost";
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

export function Button({ className, variant = "ghost", children, href, ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition will-change-transform";
  const ghost =
    "glass text-text hover:shadow-glow";
  const primary =
    "bg-gradient-to-br from-brand to-brand2 text-[#02131a] shadow-[0_10px_30px_rgba(0,0,0,.35)]";

  const Component = href ? motion.a : motion.button;
  const linkProps = href ? { href } : {};

  return (
    <Component
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      className={cn(base, variant === "primary" ? primary : ghost, className)}
      {...linkProps}
      {...props}
    >
      {children}
    </Component>
  );
}
