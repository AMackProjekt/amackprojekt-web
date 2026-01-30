"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  color?: "green" | "brand" | "brand2" | "accent";
}

export function ElectricBorder({
  children,
  className,
  intensity = "medium",
  color = "green",
}: ElectricBorderProps) {
  const colorMap = {
    green: {
      shadow: "shadow-[0_0_30px_rgba(34,197,94,0.3),0_0_60px_rgba(34,197,94,0.2)]",
      border: "border-green-400/30",
      gradient: "from-green-400/20",
      accent: "border-green-400",
    },
    brand: {
      shadow: "shadow-[0_0_30px_rgba(56,189,248,0.3),0_0_60px_rgba(56,189,248,0.2)]",
      border: "border-brand/30",
      gradient: "from-brand/20",
      accent: "border-brand",
    },
    brand2: {
      shadow: "shadow-[0_0_30px_rgba(45,212,191,0.3),0_0_60px_rgba(45,212,191,0.2)]",
      border: "border-brand2/30",
      gradient: "from-brand2/20",
      accent: "border-brand2",
    },
    accent: {
      shadow: "shadow-[0_0_30px_rgba(167,139,250,0.3),0_0_60px_rgba(167,139,250,0.2)]",
      border: "border-accent/30",
      gradient: "from-accent/20",
      accent: "border-accent",
    },
  };

  const colors = colorMap[color];

  return (
    <div className={cn("relative", className)}>
      <div className={cn("relative rounded-2xl border-2", colors.border, colors.shadow)}>
        {/* Animated Electric Border */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r via-transparent animate-pulse",
              colors.gradient,
              `to-${color}-400/20`
            )}
          />
        </div>

        {/* Corner Accents */}
        <div
          className={cn(
            "absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg",
            colors.accent,
            intensity !== "low" && "animate-pulse"
          )}
        />
        <div
          className={cn(
            "absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 rounded-tr-lg",
            colors.accent,
            intensity !== "low" && "animate-pulse"
          )}
        />
        <div
          className={cn(
            "absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 rounded-bl-lg",
            colors.accent,
            intensity !== "low" && "animate-pulse"
          )}
        />
        <div
          className={cn(
            "absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 rounded-br-lg",
            colors.accent,
            intensity !== "low" && "animate-pulse"
          )}
        />

        {/* Content */}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

interface ElectricTextProps {
  children: React.ReactNode;
  className?: string;
  color?: "green" | "brand" | "brand2" | "accent";
}

export function ElectricText({ children, className, color = "green" }: ElectricTextProps) {
  const colorMap = {
    green: "from-green-400 via-green-300 to-brand2",
    brand: "from-brand via-brand to-brand2",
    brand2: "from-brand2 via-brand2 to-accent",
    accent: "from-accent via-accent to-brand",
  };

  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent font-bold",
        colorMap[color],
        className
      )}
    >
      {children}
    </span>
  );
}

interface ElectricButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: "green" | "brand" | "brand2" | "accent";
  variant?: "solid" | "outline";
}

export function ElectricButton({
  children,
  onClick,
  className,
  color = "green",
  variant = "solid",
}: ElectricButtonProps) {
  const solidColors = {
    green: "bg-gradient-to-r from-green-400 to-green-500 text-bg shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]",
    brand: "bg-gradient-to-r from-brand to-brand text-bg shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]",
    brand2: "bg-gradient-to-r from-brand2 to-brand2 text-bg shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:shadow-[0_0_30px_rgba(45,212,191,0.6)]",
    accent: "bg-gradient-to-r from-accent to-accent text-bg shadow-[0_0_20px_rgba(167,139,250,0.4)] hover:shadow-[0_0_30px_rgba(167,139,250,0.6)]",
  };

  const outlineColors = {
    green: "border-2 border-green-400 text-green-400 hover:bg-green-400/10",
    brand: "border-2 border-brand text-brand hover:bg-brand/10",
    brand2: "border-2 border-brand2 text-brand2 hover:bg-brand2/10",
    accent: "border-2 border-accent text-accent hover:bg-accent/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-lg font-semibold transition-all",
        variant === "solid" ? solidColors[color] : outlineColors[color],
        className
      )}
    >
      {children}
    </motion.button>
  );
}

interface ElectricDividerProps {
  className?: string;
  color?: "green" | "brand" | "brand2" | "accent";
}

export function ElectricDivider({ className, color = "green" }: ElectricDividerProps) {
  const colorMap = {
    green: "from-transparent via-green-400 to-transparent",
    brand: "from-transparent via-brand to-transparent",
    brand2: "from-transparent via-brand2 to-transparent",
    accent: "from-transparent via-accent to-transparent",
  };

  return (
    <div className={cn("relative h-px w-full", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-r", colorMap[color])} />
      <div className={cn("absolute inset-0 bg-gradient-to-r animate-pulse", colorMap[color])} />
    </div>
  );
}
