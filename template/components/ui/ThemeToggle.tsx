"use client";

import { useTheme } from "@/lib/theme";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-glass border border-border flex items-center px-1">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand2 flex items-center justify-center text-xs">
          🌙
        </div>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-glass border border-border hover:border-brand/50 transition-colors flex items-center px-1"
      aria-label="Toggle theme"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand2 flex items-center justify-center text-xs"
        style={{
          marginLeft: theme === "light" ? "auto" : "0"
        }}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </motion.div>
    </motion.button>
  );
}
