import { ContactForm } from "@/components/ui/ContactForm";
import { Navbar } from "@/components/ui/Navbar";

export default function StartProjectPage() {
  return (
    <main>
      <Navbar />
      <section className="inner-hero site-container contact-hero">
        <p className="eyebrow">Start a project</p>
        <h1>Tell us what needs to change.</h1>
        <p>
          Share the challenge, who it affects, and what a better outcome could look like. You do not need
          a finished brief—just a meaningful starting point.
        </p>
      </section>
      <section className="site-container contact-layout">
        <div className="contact-aside">
          <p className="eyebrow">What happens next</p>
          <ol>
            <li><span>01</span><p>We review the context and respond within two business days.</p></li>
            <li><span>02</span><p>If there is a fit, we schedule a focused discovery conversation.</p></li>
            <li><span>03</span><p>You receive a clear recommendation for scope, approach, and next steps.</p></li>
          </ol>
          <a href="mailto:hello@mackprojekt.com">hello@mackprojekt.com</a>
        </div>
        <div className="contact-card">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
