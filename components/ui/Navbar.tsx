"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";

export function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-container items-center justify-between px-7 py-4">
        <motion.a
          href="/"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <img
            src="/logos/amp-logo.jpeg"
            alt="AMP Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="font-extrabold tracking-tight text-text">
            MackEnterprises
          </span>
        </motion.a>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="/launch" className="text-sm font-medium text-green-400 hover:text-green-300 transition-colors">Launch</a>
          <span className="text-sm font-medium text-muted cursor-not-allowed" title="Coming Soon">Innovation</span>
          <span className="text-sm font-medium text-muted cursor-not-allowed" title="Coming Soon">Design</span>
          <span className="text-sm font-medium text-muted cursor-not-allowed" title="Coming Soon">Technology</span>
          <span className="text-sm font-medium text-muted cursor-not-allowed" title="Coming Soon">Growth</span>
        </nav>

        <div className="flex items-center gap-3">
          {mounted && <ThemeToggle />}
          <Button variant="primary" href="mailto:ampstudio@mackprojekt.com?subject=ATTN%20Waitlist">
            Join Waitlist
          </Button>
        </div>
      </div>
    </header>
  );
}
