import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <Link href="/" className="wordmark wordmark-footer" aria-label="A MackProjekt home">
            <span className="wordmark-symbol">A</span>
            <span>A MackProjekt</span>
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
            <Link href="/interest">Start a project</Link>
            <Link href="/waitlist">Join the waitlist</Link>
            <a href="mailto:hello@mackprojekt.com">hello@mackprojekt.com</a>
          </div>
          <div>
            <span>Products</span>
            <Link href="/reentry">T.O.O.L.S. Inc.</Link>
            <Link href="/messaging">MackChat</Link>
            <Link href="/portal/auth">Member portal</Link>
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
