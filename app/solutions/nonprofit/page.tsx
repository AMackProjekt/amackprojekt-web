import { Navbar } from "@/components/ui/Navbar";
import { AmpCTA } from "@/components/AmpCTA";
export const metadata = {
  title: "Nonprofit & community technology",
  alternates: { canonical: "/solutions/nonprofit/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">AMP / Nonprofit & community technology</p>
        <h1>More room for the mission.</h1>
        <p>
          Digital platforms that help mission-driven organizations connect
          people, programs, learning, and service delivery.
        </p>
        <a className="amp-button" href="/portals">
          Explore the enterprise suite ↗
        </a>
      </section>
      <section className="amp-section amp-wrap amp-no-top">
        <div className="amp-services">
          <article>
            <span className="amp-label">01</span>
            <h3>People & programs</h3>
            <p>
              Connect participants to the opportunities and support they need.
            </p>
          </article>
          <article>
            <span className="amp-label">02</span>
            <h3>Operations</h3>
            <p>Bring dashboards, service workflows, and follow-ups together.</p>
          </article>
          <article>
            <span className="amp-label">03</span>
            <h3>Learning pathways</h3>
            <p>Make education and practical resources easier to navigate.</p>
          </article>
        </div>
      </section>
      <AmpCTA />
    </main>
  );
}
