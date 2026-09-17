import { BrandCarousel } from "@/components/BrandCarousel";
import { Navbar } from "@/components/ui/Navbar";
import { AmpCTA } from "@/components/AmpCTA";
export const metadata = {
  title: "AMP Brand & Media",
  description:
    "Official A MackProjekt brand assets, studio information, and media contacts.",
  alternates: { canonical: "/media-kit/" },
};
const assets = [
  ["A MackProjekt", "Primary studio identity", "/brand/amp-logo.jpg"],
  ["MackEnterprises", "Enterprise identity", "/brand/mackenterprises.png"],
  [
    "Projekt Enterprise Portal Suite",
    "Platform identity",
    "/brand/projekt-enterprise-icon.svg",
  ],
  ["T.O.O.L.S. Inc.", "Community organization", "/brand/toolsinc-logo.png"],
  ["KingMe", "Adjust The Krown Movement", "/brand/kingme.jpg"],
  ["QueenMe", "Adjust The Krown Movement", "/brand/queenme.png"],
  ["MacksPoolHall", "Brand family", "/partnerships/mph-logo.png"],
  [
    "A MackProjekt Podcast",
    "Coming soon",
    "/brand/mackprojekt-podcast-logo.webp",
  ],
  ["Mi Minks", "Beauty & commerce", "/brand/miminks.png"],
];
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">A MackProjekt / Brand & media</p>
        <h1>
          A clear identity.
          <br />
          <em>Everywhere we show up.</em>
        </h1>
        <p>
          Official brand artwork, a concise studio profile, and direct contact
          for media and collaboration.
        </p>
        <a className="amp-text-link" href="#brand-assets">
          Explore the brand assets ↓
        </a>
      </section>
      <section className="amp-wrap amp-section amp-no-top">
        <div className="amp-media-profile">
          <div>
            <p className="amp-label">The studio</p>
            <h2>
              Technology.
              <br />
              Culture.
              <br />
              <em>Purpose.</em>
            </h2>
          </div>
          <div>
            <h3>A MackProjekt</h3>
            <p>
              A founder-led innovation studio within MackEnterprises, bringing
              strategy, design, and engineering to digital platforms, community
              movements, and creative ventures.
            </p>
            <h3>Donyale “DThree” Mack</h3>
            <p className="amp-label">
              Founder, A MackProjekt · Founder & CEO, MackEnterprises
            </p>
            <p>
              Donyale’s work connects technology with access, opportunity, and
              lived experience. The portfolio spans enterprise workflows,
              reentry support, community development, and original writing.
            </p>
            <a
              className="amp-text-link"
              href="mailto:hello@mackprojekt.com?subject=AMP%20media%20inquiry"
            >
              Media inquiries: hello@mackprojekt.com ↗
            </a>
          </div>
        </div>
      </section>
      <BrandCarousel assets={assets} />
      <section className="amp-wrap amp-section amp-no-top">
        <p className="amp-label">AMP visual system</p>
        <h2>
          Focused color.
          <br />
          <em>Confident contrast.</em>
        </h2>
        <div className="amp-swatches">
          {[
            ["AMP Teal", "#24B8C8"],
            ["Deep Ink", "#080F17"],
            ["Silver", "#D4D5D2"],
            ["Paper", "#F4F5F1"],
          ].map(([name, hex]) => (
            <div key={hex}>
              <span style={{ background: hex }} />
              <strong>{name}</strong>
              <code>{hex}</code>
            </div>
          ))}
        </div>
        <p className="amp-brand-note">
          AMP leads with deep ink, teal, and silver. Venture logos retain their
          own identities, connected by the studio’s visual language.
        </p>
      </section>
      <AmpCTA />
    </main>
  );
}
