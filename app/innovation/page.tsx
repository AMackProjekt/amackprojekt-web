import { Navbar } from "@/components/ui/Navbar";
import { Portfolio } from "@/components/Portfolio";
import { AmpCTA } from "@/components/AmpCTA";
export const metadata = {
  title: "Brand Ecosystem",
  alternates: { canonical: "/innovation/" },
};
export default function Work() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">A MackProjekt / Brand ecosystem</p>
        <h1>
          Purpose,
          <br />
          <em>put to work.</em>
        </h1>
        <p>
          Explore the brands, platforms, movements, and creative ventures
          bringing the MackProjekt vision to life.
        </p>
      </section>
      <section className="amp-wrap amp-section amp-no-top">
        <Portfolio />
      </section>
      <AmpCTA />
    </main>
  );
}
