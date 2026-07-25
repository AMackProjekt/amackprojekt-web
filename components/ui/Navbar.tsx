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
        <Link href="/" className="wordmark" aria-label="A MackProjekt home">
          <span className="wordmark-symbol">A</span>
          <span>A MackProjekt</span>
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
          <Link href="/portal/auth" className="nav-mobile-only">Portal sign in</Link>
          <Link href="/interest" className="button button-primary nav-mobile-only">Start a project</Link>
        </nav>

        <div className="nav-actions">
          <Link href="/portal/auth" className="portal-link">Portal sign in</Link>
          <Link href="/interest" className="button button-primary">Start a project</Link>
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
