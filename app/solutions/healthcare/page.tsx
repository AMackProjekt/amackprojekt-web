import { Navbar } from "@/components/ui/Navbar";
import { AmpCTA } from "@/components/AmpCTA";
export const metadata = {
  title: "Healthcare & care operations",
  alternates: { canonical: "/solutions/healthcare/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">AMP / Healthcare & care operations</p>
        <h1>Keep services connected.</h1>
        <p>
          Digital experiences for organizations coordinating care, services, and
          support. We begin with the people using the system and the workflows
          that need to work together.
        </p>
        <a className="amp-button" href="/careport">
          Explore CarePort ↗
        </a>
      </section>
      <section className="amp-section amp-wrap amp-no-top">
        <div className="amp-services">
          <article>
            <span className="amp-label">01</span>
            <h3>Service coordination</h3>
            <p>Clarify needs, ownership, and follow-through across the team.</p>
          </article>
          <article>
            <span className="amp-label">02</span>
            <h3>Useful interfaces</h3>
            <p>Make important context easier to find and act on.</p>
          </article>
          <article>
            <span className="amp-label">03</span>
            <h3>CarePort Connect</h3>
            <p>Explore AMP’s approach to continuity of care.</p>
          </article>
        </div>
      </section>
      <AmpCTA />
    </main>
  );
}
