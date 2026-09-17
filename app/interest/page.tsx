import { ContactForm } from "@/components/ui/ContactForm";
import { Navbar } from "@/components/ui/Navbar";
export const metadata = {
  title: "Start a Projekt",
  alternates: { canonical: "/interest/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">Work with AMP</p>
        <h1>
          What’s your
          <br />
          <em>next move?</em>
        </h1>
        <p>
          Tell us what you’re building, who it serves, and what needs to change.
          A meaningful starting point is enough.
        </p>
      </section>
      <section className="amp-wrap amp-section amp-no-top amp-contact-layout">
        <div>
          <p className="amp-label">Start a conversation</p>
          <h2>
            Bring the context.
            <br />
            <em>We’ll bring the questions.</em>
          </h2>
          <p>
            We’ll review your inquiry and discuss the fit, scope, and next
            steps. For direct contact, email the studio.
          </p>
          <a className="amp-text-link" href="mailto:hello@mackprojekt.com">
            hello@mackprojekt.com ↗
          </a>
        </div>
        <div className="amp-form-panel">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
