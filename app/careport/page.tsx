import { CarePortShowcase } from "@/components/CarePortShowcase";
import { Navbar } from "@/components/ui/Navbar";
import { AmpCTA } from "@/components/AmpCTA";
import Link from "next/link";
export const metadata = {
  title: "CarePort Connect",
  alternates: { canonical: "/careport/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">AMP / CarePort Connect</p>
        <h1>
          Keep the context.
          <br />
          <em>Continue the care.</em>
        </h1>
        <p>
          A staff workspace designed around needs, services, team coordination,
          and the next action. Support should stay connected through every
          handoff.
        </p>
        <div className="amp-actions">
          <Link className="amp-button" href="/interest">
            Discuss CarePort ↗
          </Link>
          <Link className="amp-text-link" href="/portals">
            Explore enterprise platforms ↗
          </Link>
        </div>
      </section>
      <section className="amp-wrap amp-section amp-no-top">
        <div className="amp-system-panel careport-panel">
          <CarePortShowcase />
          <div>
            <p className="amp-label">Designed around continuity</p>
            <h2>
              Context stays.
              <br />
              <em>Care moves forward.</em>
            </h2>
            <div className="amp-system-steps">
              <span>Understand needs</span>
              <span>Coordinate services</span>
              <span>Assign next actions</span>
              <span>Follow through</span>
            </div>
          </div>
        </div>
        <div className="amp-services">
          {[
            [
              "01",
              "Shared context",
              "Keep needs and service history visible within the workflow.",
            ],
            [
              "02",
              "Coordination",
              "Bring team communication closer to the work it supports.",
            ],
            [
              "03",
              "Next actions",
              "Make follow-ups and responsibilities easier to identify.",
            ],
            [
              "04",
              "Continuity",
              "Support a consistent handoff between people and services.",
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
