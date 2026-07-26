import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <Link href="/" className="brand-link footer-brand-link" aria-label="A MackProjekt home">
            <img
              src="/logos/amp-logo.jpeg"
              alt="A MackProjekt"
              className="brand-logo footer-brand-logo"
            />
          </Link>
          <p>Independent innovation studio building technology for access, opportunity, and trust.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <Link href="/innovation">Our work</Link>
            <Link href="/partnerships">Studio</Link>
            <Link href="/media-kit">Media kit</Link>
          </div>
          <div>
            <span>Connect</span>
            <Link href="/interest">Start A Projekt</Link>
            <Link href="/waitlist">Join the waitlist</Link>
            <a href="mailto:hello@mackprojekt.com">hello@mackprojekt.com</a>
          </div>
          <div>
            <span>Products</span>
            <Link href="/reentry">T.O.O.L.S. Inc.</Link>
            <Link href="/messaging">MackChat</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MackEnterprises. All rights reserved.</p>
          <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}
