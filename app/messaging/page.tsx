import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
export const metadata = {
  title: "Explore AMP",
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">A MackProjekt</p>
        <h1>
          Discover what
          <br />
          <em>we’re building.</em>
        </h1>
        <p>
          Explore our current platforms, community movements, and creative
          ventures.
        </p>
        <Link className="amp-button" href="/innovation">
          Explore current work ↗
        </Link>
      </section>
    </main>
  );
}
