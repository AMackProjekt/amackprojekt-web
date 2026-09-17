import { Navbar } from "@/components/ui/Navbar";
import { AmpCTA } from "@/components/AmpCTA";
export const metadata = {
  title: "Commerce & brand experiences",
  alternates: { canonical: "/solutions/retail/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">AMP / Commerce & brand experiences</p>
        <h1>Identity meets experience.</h1>
        <p>
          Build a clear brand presence and an intuitive path from discovery to
          action. AMP connects visual identity, digital experience, and
          practical implementation.
        </p>
        <a className="amp-button" href="https://miminks.mackprojekt.com">
          Explore Mi Minks ↗
        </a>
      </section>
      <section className="amp-section amp-wrap amp-no-top">
        <div className="amp-services">
          <article>
            <span className="amp-label">01</span>
            <h3>Brand foundations</h3>
            <p>Establish a visual identity people can recognize.</p>
          </article>
          <article>
            <span className="amp-label">02</span>
            <h3>Digital storefronts</h3>
            <p>Help customers understand the offer and take the next step.</p>
          </article>
          <article>
            <span className="amp-label">03</span>
            <h3>Mi Minks</h3>
            <p>Explore a venture built around individual expression.</p>
          </article>
        </div>
      </section>
      <AmpCTA />
    </main>
  );
}
