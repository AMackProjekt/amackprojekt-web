import { Navbar } from "@/components/ui/Navbar";
import { AmpCTA } from "@/components/AmpCTA";
import Link from "next/link";
export const metadata = {
  title: "The AMP Studio",
  alternates: { canonical: "/partnerships/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">A MackProjekt / The studio</p>
        <h1>
          Purpose sets
          <br />
          <em>the direction.</em>
        </h1>
        <p>
          AMP brings strategy, design, and engineering together to create
          technology, movements, and original work grounded in real experience.
        </p>
      </section>
      <section className="amp-wrap amp-section amp-no-top amp-founder">
        <div>
          <img
            className="amp-studio-logo"
            src="/brand/amp-logo.jpg"
            alt="A MackProjekt"
            width="500"
            height="500"
          />
        </div>
        <div>
          <p className="amp-label">Founder</p>
          <h2>
            Donyale
            <br />
            <em>“DThree” Mack</em>
          </h2>
          <p>
            Founder of A MackProjekt and MackEnterprises. Author. Builder. The
            work begins with a belief that access, opportunity, and dignity
            belong in the design of a product—not as an afterthought.
          </p>
          <blockquote>
            “The best technology doesn’t ask people to adapt to the system. It
            builds a better system around people.”
          </blockquote>
          <Link className="amp-text-link" href="/media-kit">
            Brand & media resources ↗
          </Link>
        </div>
      </section>
      <section className="amp-legacy">
        <div className="amp-wrap amp-legacy-grid">
          <div>
            <p className="amp-label">On a personal note</p>
            <h2>
              Legacy for
              <br />
              <em>generations.</em>
            </h2>
          </div>
          <p>
            Every Projekt is inspired and motivated through my father Donald
            “DT” Mack, my uncle Robert Ingram Sr., and my father Paul Cruz Sr.
          </p>
          <img
            src="/brand/mackenterprises.png"
            alt="MackEnterprises legacy identity"
            width="450"
            height="300"
            loading="lazy"
          />
        </div>
      </section>
      <section className="amp-section amp-wrap">
        <p className="amp-label">Our principles</p>
        <div className="amp-services">
          {[
            [
              "01",
              "Experience matters.",
              "Build with the people closest to the problem.",
            ],
            [
              "02",
              "Clarity earns trust.",
              "Make decisions and interfaces understandable.",
            ],
            [
              "03",
              "Craft is a commitment.",
              "Carry the same care from the first idea through the final detail.",
            ],
            [
              "04",
              "Progress is practical.",
              "Put useful work into people’s hands and learn from it.",
            ],
          ].map(([n, title, copy]) => (
            <article key={n}>
              <span className="amp-label">{n}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <AmpCTA />
    </main>
  );
}
