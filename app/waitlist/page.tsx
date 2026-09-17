import { Navbar } from "@/components/ui/Navbar";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
export const metadata = {
  title: "AMP Updates & Early Access",
  alternates: { canonical: "/waitlist/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">A MackProjekt / Stay connected</p>
        <h1>
          The next chapter.
          <br />
          <em>Stay in the loop.</em>
        </h1>
        <p>
          Register your interest in AMP updates and upcoming releases. You can
          also reach us directly at hello@mackprojekt.com.
        </p>
      </section>
      <section className="amp-wrap amp-section amp-no-top">
        <div className="amp-form-panel">
          <WaitlistForm />
        </div>
      </section>
    </main>
  );
}
