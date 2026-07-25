import { Navbar } from "@/components/ui/Navbar";
import Link from "next/link";

const principles = [
  ["Lived experience is expertise.", "The people closest to a problem often see the most useful path through it."],
  ["Clarity earns trust.", "Straightforward language, transparent decisions, and useful interfaces beat spectacle."],
  ["Shipping creates evidence.", "A focused working product teaches more than a long deck ever will."],
  ["Access belongs in the architecture.", "Accessibility, privacy, and dignity are product requirements from day one."],
];

export default function StudioPage() {
  return (
    <main>
      <Navbar />
      <section className="inner-hero site-container">
        <p className="eyebrow">The studio</p>
        <h1>Purpose sets the direction. Craft makes it real.</h1>
        <p>
          A MackProjekt is a founder-led innovation studio inside MackEnterprises. We work across
          strategy, design, and engineering to build technology with a clear public or business purpose.
        </p>
      </section>

      <section className="section section-tinted">
        <div className="site-container studio-split">
          <div>
            <p className="eyebrow">Why we exist</p>
            <h2>Too many systems are designed without the people who must live with them.</h2>
          </div>
          <div>
            <p>
              We started this studio to close that distance. Our work combines hard-earned perspective
              with modern product practice—asking better questions, reducing unnecessary complexity, and
              building with the communities a product is meant to serve.
            </p>
            <p>
              That can mean launching one of our own ventures, helping a nonprofit modernize its service
              delivery, or giving an ambitious founder the technical partner needed to get moving.
            </p>
          </div>
        </div>
      </section>

      <section className="section site-container">
        <div className="section-heading-grid">
          <p className="eyebrow">Working principles</p>
          <h2 className="display-title">The standards behind every engagement.</h2>
        </div>
        <div className="principle-list">
          {principles.map(([title, copy], index) => (
            <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>
          ))}
        </div>
      </section>

      <section className="section site-container founder-panel">
        <div className="founder-mark" aria-hidden="true">DM</div>
        <div>
          <p className="eyebrow">Founder</p>
          <h2>Donyale “DThree” Mack</h2>
          <p>
            Donyale founded A MackProjekt around a straightforward belief: thoughtful technology can
            bridge gaps in communication, opportunity, and access—but only when it is grounded in real
            experience and accountable to real outcomes.
          </p>
          <Link href="/media-kit">Founder profile and media kit →</Link>
        </div>
      </section>

      <section className="section site-container">
        <div className="cta-panel">
          <div><p className="eyebrow">Work together</p><h2>Good partnerships start with a real conversation.</h2></div>
          <Link className="button button-light" href="/interest">Introduce yourself ↗</Link>
        </div>
      </section>
    </main>
  );
}
