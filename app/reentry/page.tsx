import { Navbar } from "@/components/ui/Navbar";
import { AmpCTA } from "@/components/AmpCTA";
export const metadata = {
  title: "T.O.O.L.S. Inc. | Reentry & Opportunity",
  alternates: { canonical: "/reentry/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">AMP / Community technology</p>
        <h1>
          A clearer path
          <br />
          <em>forward.</em>
        </h1>
        <p>
          T.O.O.L.S. Inc.—Together Overcoming Obstacles and Limitations—connects
          justice-involved individuals with practical resources, education,
          employment preparation, and mentorship.
        </p>
        <div className="amp-actions">
          <a className="amp-button" href="https://www.sdtoolsinc.org">
            Visit T.O.O.L.S. Inc. ↗
          </a>
          <a className="amp-text-link" href="/referral">
            Explore referral options ↗
          </a>
        </div>
      </section>
      <section className="amp-wrap amp-section amp-no-top">
        <div className="amp-system-panel">
          <img
            src="/brand/toolsinc-logo.png"
            alt="T.O.O.L.S. Inc. official logo"
            width="400"
            height="400"
          />
          <div>
            <p className="amp-label">
              Together Overcoming Obstacles and Limitations
            </p>
            <h2>
              Opportunity
              <br />
              <em>takes connection.</em>
            </h2>
            <p>
              Explore programs, support, and service information through the
              organization’s own website.
            </p>
          </div>
        </div>
      </section>
      <AmpCTA />
    </main>
  );
}
