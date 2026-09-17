"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
const links = [
  ["/innovation", "Work"],
  ["/portals", "Platforms"],
  ["/books", "Books"],
  ["/partnerships", "Studio"],
  ["/media-kit", "Brand & media"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="amp-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="amp-wrap amp-nav">
        <Link href="/" className="amp-wordmark" aria-label="A MackProjekt home">
          <img
            src="/brand/amp-logo.jpg"
            alt="A MackProjekt"
            width="126"
            height="70"
          />
          <span>INNOVATION STUDIO</span>
        </Link>
        <nav
          id="amp-navigation"
          className={open ? "amp-navigation open" : "amp-navigation"}
          aria-label="Main navigation"
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/interest" className="amp-button nav-start">
            Start a Projekt <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <button
          className="amp-menu"
          aria-controls="amp-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </div>
    </header>
  );
}
