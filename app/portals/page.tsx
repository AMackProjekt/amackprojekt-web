import { Navbar } from "@/components/ui/Navbar";
import { AmpCTA } from "@/components/AmpCTA";
import Link from "next/link";
export const metadata = {
  title: "Projekt Enterprise Portal Suite",
  alternates: { canonical: "/portals/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">AMP / Enterprise platforms</p>
        <h1>
          Bring the work
          <br />
          <em>together.</em>
        </h1>
        <p>
          Projekt Enterprise brings CaseFlow Operations together with participant, staff, and admin portals. Case management, records, scheduling, and enterprise oversight in one connected workspace.
        </p>
        <div className="amp-actions">
          <a className="amp-button" href="https://www.sdtoolsinc.org">
            Explore the T.O.O.L.S. deployment ↗
          </a>
          <Link className="amp-text-link" href="/interest">
            Discuss your organization ↗
          </Link>
        </div>
      </section>
      <section className="amp-wrap amp-section amp-no-top">
        <div className="amp-system-panel">
          <img
            src="/brand/projekt-enterprise-icon.svg"
            alt="Projekt Enterprise Portal Suite identity"
            width="400"
            height="400"
          />
          <div>
            <p className="amp-label">CaseFlow Operations / By A MackProjekt</p>
            <h2>
              People. Programs.
              <br />
              <em>Progress.</em>
            </h2>
            <p>
              Give teams a shared starting point for service delivery, learning,
              and the next action.
            </p>
            <div className="amp-system-steps">
              <span>Dashboards</span>
              <span>Case management</span>
              <span>Learning</span>
              <span>Coordination</span>
            </div>
          </div>
        </div>
        <div className="amp-services">
          {[
            [
              "01",
              "Dashboards",
              "A clear starting point for the people, tasks, and services that need attention.",
            ],
            [
              "02",
              "Case management",
              "Keep plans, documents, follow-ups, and service coordination connected.",
            ],
            [
              "03",
              "Learning",
              "Connect course access and guided pathways to the next practical step.",
            ],
            [
              "04",
              "CarePort Connect",
              "Explore the dedicated workspace for continuity of care.",
            ],
          ].map(([n, title, copy]) => (
            <article key={n}>
              <span className="amp-label">{n}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              {n === "04" && (
                <Link className="amp-text-link" href="/careport">
                  Explore CarePort ↗
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
      <AmpCTA />
    </main>
  );
}
