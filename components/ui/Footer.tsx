import Link from "next/link";
import { family } from "@/lib/portfolio";
export function Footer() {
  return (
    <footer className="amp-footer">
      <div className="amp-wrap">
        <div className="amp-footer-top">
          <div>
            <img
              className="amp-footer-logo"
              src="/brand/amp-premier.webp"
              alt="A MackProjekt"
              width="180"
              height="120"
            />
            <p>
              Technology. Culture. Purpose.
              <br />
              Every move, intentional.
            </p>
          </div>
          <div>
            <span className="amp-label">Explore AMP</span>
            <Link href="/innovation">Work & ventures</Link>
            <Link href="/portals">Enterprise platforms</Link>
            <Link href="/books">Books & ideas</Link>
            <Link href="/partnerships">The studio</Link>
          </div>
          <div>
            <span className="amp-label">Connect</span>
            <Link href="/interest">Start a Projekt</Link>
            <Link href="/media-kit">Brand & media</Link>
            <a href="mailto:hello@mackprojekt.com">hello@mackprojekt.com</a>
          </div>
        </div>
        <div className="amp-family">
          <span className="amp-label">Powered By A MackProjekt</span>
          <div>
            {family.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
        <div className="amp-footer-bottom">
          <span>
            © {new Date().getFullYear()} MackEnterprises. All rights reserved.
          </span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
