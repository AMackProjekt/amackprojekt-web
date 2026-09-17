import { Navbar } from "@/components/ui/Navbar";
import { Books } from "@/components/Books";
import { AmpCTA } from "@/components/AmpCTA";
export const metadata = {
  title: "Books by Donyale Mack",
  alternates: { canonical: "/books/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">Donyale Mack / Books & ideas</p>
        <h1>
          Every page.
          <br />
          <em>A next move.</em>
        </h1>
        <p>
          Explore Navigating Spiritual Warfare and the forthcoming AlphaKode:
          Navigating Workplace Environments.
        </p>
      </section>
      <section className="amp-wrap amp-section amp-no-top">
        <Books />
      </section>
      <AmpCTA />
    </main>
  );
}
