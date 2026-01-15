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
            alt="A MackProjekt Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="font-extrabold tracking-tight text-text">
            MackEnterprises
          </span>
        </motion.a>

        <nav className="hidden items-center gap-6 md:flex">
          <a className="text-sm font-medium text-muted hover:text-text" href="/#platform">Services</a>
          <a className="text-sm font-medium text-muted hover:text-text" href="/messaging">MackChat</a>
          <a className="text-sm font-medium text-muted hover:text-text" href="/#dashboard">Platform</a>
          <a className="text-sm font-medium text-muted hover:text-text" href="/portal">Portal</a>
          <a className="text-sm font-medium text-muted hover:text-text" href="/#contact">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            <a href="/portal/auth">Sign In</a>
          </Button>
          <Button variant="primary">
            <a href="/#contact">Get Started</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
