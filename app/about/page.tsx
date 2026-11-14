import { AmpCTA } from "@/components/AmpCTA";
import { Navbar } from "@/components/ui/Navbar";

export const metadata = {
  title: "About A MackProjekt",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">A MackProjekt / About</p>
        <h1>
          Built on legacy.
          <br />
          <em>Moving forward.</em>
        </h1>
        <p>
          The story behind MackProjekt is rooted in family, purpose, and work
          built to last.
        </p>
      </section>

      <section className="amp-legacy">
        <div className="amp-wrap amp-legacy-grid">
          <div>
            <p className="amp-label">Heritage &amp; Commercial Logistics</p>
            <p className="amp-label">Legacy Brand</p>
            <h2>
              MackEnterprises
              <br />
              <em>LTD</em>
            </h2>
            <p>Commercial Operations, Procurement &amp; Logistics</p>
          </div>
          <div>
            <p>
              The brand logo was intentionally created from a personal
              photograph taken of the founder&apos;s father, serving as the
              enduring foundation and heart behind MackEnterprises across
              commercial logistics, supplier coordination, and procurement
              contracts.
            </p>
            <p>
              Serving as a bridge between commercial supply chains and
              community enterprise, preserving generational work ethic, pride,
              and integrity.
            </p>
            <p className="amp-label">Father&apos;s Photo Logo Preserved</p>
          </div>
          <div className="about-heritage-art">
            <figure>
              <img
                src="/brand/mackenterprises.png"
                alt="MackEnterprises original father illustration"
                width="450"
                height="300"
                loading="lazy"
              />
              <figcaption>Legacy identity</figcaption>
            </figure>
            <figure>
              <img
                src="/brand/mackenterprises-family-photo.png"
                alt="Two family members sharing a chess game outdoors"
                width="768"
                height="1024"
                loading="lazy"
              />
              <figcaption>Family heritage</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <AmpCTA />
    </main>
  );
}
