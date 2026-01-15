"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";

export function Navbar() {
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
            src="/logos/main-logo.png"
            alt="T.O.O.LS Inc Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="font-extrabold tracking-tight text-text">
            T.O.O.LS Inc
          </span>
        </motion.a>

        <nav className="hidden items-center gap-6 md:flex">
          <a className="text-sm font-medium text-muted hover:text-text" href="/#platform">Programs</a>
          <a className="text-sm font-medium text-muted hover:text-text" href="/reentry">Reentry</a>
          <a className="text-sm font-medium text-muted hover:text-text" href="/#dashboard">Impact</a>
          <a className="text-sm font-medium text-muted hover:text-text" href="/partnerships">Partnerships</a>
          <a className="text-sm font-medium text-muted hover:text-text" href="/api-test">API</a>
          <a className="text-sm font-medium text-muted hover:text-text" href="/referral">Referral</a>
          <a className="text-sm font-medium text-muted hover:text-text" href="/#contact">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            <a href="/referral">Submit Referral</a>
          </Button>
          <Button variant="primary">
            <a href="/#contact">Get Support</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
