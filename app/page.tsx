import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Portfolio } from "@/components/Portfolio";
import { HighlightFilm } from "@/components/AmpMotion";
import { Books } from "@/components/Books";
import { AmpCTA } from "@/components/AmpCTA";
import { ImpactHero, ImpactReveal } from "@/components/ImpactHero";
export default function Home() {
  return (
    <main id="main-content">
      <Navbar />
      <ImpactHero />
      <ImpactReveal />
      <section className="impact-manifesto" aria-label="Our conviction"><div className="amp-wrap"><p className="amp-label">The AMP conviction</p><p>Ideas are only the beginning.<br /><span>What we build with them changes the story.</span></p><a href="/partnerships">Meet the studio <span aria-hidden="true">↗</span></a></div></section>
      <section id="work" className="amp-section amp-wrap">
        <div className="amp-section-heading">
          <div>
            <p className="amp-label">The AMP portfolio</p>
            <h2>
              One studio.
              <br />
              <em>Many ways forward.</em>
            </h2>
          </div>
          <p>
            Digital products, community movements, and original ideas. Explore
            the work—and the people it is built to move forward.
          </p>
        </div>
        <Portfolio />
      </section>
      <section className="amp-feature">
        <div className="amp-wrap amp-feature-grid">
          <div>
            <p className="amp-label">In motion / The AMP story</p>
            <h2>
              Build the idea.
              <br />
              <em>Move the culture.</em>
            </h2>
            <p>
              From KingMe and QueenMe to enterprise tools and creative ventures,
              the work starts with a point of view—and becomes something people
              can experience.
            </p>
            <Link className="amp-text-link" href="/partnerships">
              Inside the studio ↗
            </Link>
          </div>
          <HighlightFilm />
        </div>
      </section>
      <section id="capabilities" className="amp-section amp-wrap">
        <div className="amp-section-heading">
          <div>
            <p className="amp-label">From first question to launch</p>
            <h2>
              Think clearly.
              <br />
              <em>Build deliberately.</em>
            </h2>
          </div>
          <p>
            Strategy, experience design, engineering, and launch support under
            one studio. The mission stays connected to the work.
          </p>
        </div>
        <div className="amp-services">
          {[
            [
              "01",
              "Strategy",
              "Define the problem, the people, and the most useful next move.",
            ],
            [
              "02",
              "Experience",
              "Build a clear visual identity and intuitive paths through complex work.",
            ],
            [
              "03",
              "Engineering",
              "Connect interfaces, data, and workflows into dependable digital products.",
            ],
            [
              "04",
              "Launch",
              "Put the work in people’s hands, learn from use, and keep improving.",
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
      <section id="books" className="amp-section amp-books-section">
        <div className="amp-wrap">
          <div className="amp-section-heading">
            <div>
              <p className="amp-label">Written by Donyale Mack</p>
              <h2>
                Read the battle.
                <br />
                <em>Master the board.</em>
              </h2>
            </div>
            <p>
              The ideas go beyond the screen. Books on spiritual ground,
              workplace strategy, and making your next move with intention.
            </p>
          </div>
          <Books />
        </div>
      </section>
      <section id="studio" className="amp-section amp-wrap amp-founder">
        <div>
          <p className="amp-label">Founder’s perspective</p>
          <h2>
            Purpose isn’t a layer.
            <br />
            <em>It’s the foundation.</em>
          </h2>
        </div>
        <div>
          <blockquote>
            “The best technology doesn’t ask people to adapt to the system. It
            builds a better system around people.”
          </blockquote>
          <p className="amp-founder-name">
            Donyale “DThree” Mack<span>Founder, A MackProjekt</span>
          </p>
          <Link className="amp-text-link" href="/partnerships">
            Meet the studio ↗
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
      <AmpCTA />
    </main>
  );
}
