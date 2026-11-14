import { Navbar } from "@/components/ui/Navbar";
import { HighlightFilm } from "@/components/AmpMotion";
import { Portfolio } from "@/components/Portfolio";
export const metadata = {
  title: "MackProjekt In Motion",
  alternates: { canonical: "/launch/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">A MackProjekt / In motion</p>
        <h1>
          Ideas become
          <br />
          <em>real work.</em>
        </h1>
        <p>
          Explore the movements, platforms, and creative ventures bringing the
          MackProjekt brand to life.
        </p>
      </section>
      <section className="amp-wrap amp-section amp-no-top">
        <HighlightFilm />
      </section>
      <section className="amp-wrap amp-section amp-no-top">
        <Portfolio />
      </section>
    </main>
  );
}
