"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/innovation", label: "Work" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/partnerships", label: "Studio" },
  { href: "/media-kit", label: "Media" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="site-container nav-inner">
        <Link href="/" className="brand-link" aria-label="A MackProjekt home">
          <img
            src="/logos/amp-logo.jpeg"
            alt="A MackProjekt"
            className="brand-logo"
          />
        </Link>

        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/interest" className="button button-primary nav-cta">Start A Projekt</Link>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
