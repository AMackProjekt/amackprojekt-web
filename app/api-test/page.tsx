import { Navbar } from "@/components/ui/Navbar";
export const metadata = {
  title: "AMP Platform Information",
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">A MackProjekt</p>
        <h1>Platform support.</h1>
        <p>
          For platform access and technical inquiries, contact the AMP studio.
        </p>
        <a
          className="amp-button"
          href="mailto:hello@mackprojekt.com?subject=Platform%20support"
        >
          Contact AMP ↗
        </a>
      </section>
    </main>
  );
}
