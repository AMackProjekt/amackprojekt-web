import { Navbar } from "@/components/ui/Navbar";
import Link from "next/link";

const ventures = [
  {
    index: "01",
    name: "T.O.O.L.S. Inc.",
    type: "Reentry technology",
    description:
      "A guided support platform helping justice-involved people move toward education, employment, and lasting stability.",
    href: "/reentry",
    accent: "lime",
  },
  {
    index: "02",
    name: "MackChat",
    type: "Community infrastructure",
    description:
      "A trust-centered communication platform built to strengthen connection between military and civilian communities.",
    href: "/messaging",
    accent: "cyan",
  },
  {
    index: "03",
    name: "Rights, clearly.",
    type: "Public-interest design",
    description:
      "Accessible digital tools that make high-stakes legal information easier to understand and act on.",
    href: "https://iwantmylawyerpresent.com",
    accent: "violet",
  },
];

const capabilities = [
  ["Product strategy", "Turn a real community or business need into a focused, testable product plan."],
  ["Experience design", "Create clear, accessible interfaces that feel intentional on every screen."],
  ["Full-stack engineering", "Build dependable web platforms, APIs, data systems, and AI-assisted workflows."],
  ["Launch & growth", "Ship the right first version, measure what matters, and improve from evidence."],
];

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <section className="hero-shell">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="hero-beam" aria-hidden="true" />
        <div className="site-container relative z-10">
          <div className="hero-layout">
            <div className="hero-content">
              <div className="hero-kicker">
                <span className="status-dot" />
                Innovation systems online · California
              </div>
              <h1 className="hero-title">
                Technology built
                <br />
                <span>to move people forward.</span>
              </h1>
              <p className="hero-copy">
                A MackProjekt turns ambitious, human-centered ideas into useful digital products—especially
                where access, opportunity, and trust matter most.
              </p>
              <div className="action-row">
                <Link className="button button-primary" href="/waitlist">
                  Get started <span aria-hidden="true">↗</span>
                </Link>
                <Link className="button button-secondary" href="/innovation">
                  Explore our work
                </Link>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="visual-grid" />
              <div className="orbit orbit-one"><i /></div>
              <div className="orbit orbit-two"><i /></div>
              <div className="orbit orbit-three" />
              <div className="signal-core">
                <span className="core-a">A</span>
                <span className="core-pulse" />
              </div>
              <div className="visual-label visual-label-one"><b>01</b> STRATEGY</div>
              <div className="visual-label visual-label-two"><b>02</b> SYSTEMS</div>
              <div className="visual-label visual-label-three"><b>03</b> IMPACT</div>
              <div className="visual-status"><span /> BUILDING WHAT MATTERS</div>
            </div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Studio focus">
        <div className="signal-track">
          <span>PRODUCT STRATEGY</span><i>✦</i>
          <span>EXPERIENCE DESIGN</span><i>✦</i>
          <span>FULL-STACK ENGINEERING</span><i>✦</i>
          <span>AI + DATA SYSTEMS</span><i>✦</i>
          <span>COMMUNITY IMPACT</span><i>✦</i>
          <span>PRODUCT STRATEGY</span><i>✦</i>
          <span>EXPERIENCE DESIGN</span><i>✦</i>
        </div>
      </section>

      <section className="section site-container">
        <div className="section-heading-grid">
          <p className="eyebrow">Selected ventures</p>
          <div>
            <h2 className="display-title">Ideas become credible when they work.</h2>
            <p className="section-intro">
              We build our own ventures and partner with organizations whose work can create meaningful,
              measurable change.
            </p>
          </div>
        </div>

        <div className="venture-list">
          {ventures.map((venture) => {
            const external = venture.href.startsWith("http");
            return (
              <Link
                key={venture.name}
                href={venture.href}
                className={`venture-card accent-${venture.accent}`}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                <span className="venture-index">{venture.index}</span>
                <div className="venture-main">
                  <p>{venture.type}</p>
                  <h3>{venture.name}</h3>
                  <span>{venture.description}</span>
                </div>
                <div className={`venture-orb orb-${venture.accent}`} aria-hidden="true">
                  <span>{venture.index}</span>
                  <i />
                </div>
                <span className="venture-arrow" aria-hidden="true">↗</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="capabilities" className="section section-tinted">
        <div className="site-container">
          <div className="section-heading-grid">
            <p className="eyebrow">What we do</p>
            <div>
              <h2 className="display-title">One studio from first question to real-world launch.</h2>
              <p className="section-intro">
                Less handoff. More shared context. Every decision connects the mission, the user, and the
                technology.
              </p>
            </div>
          </div>
          <div className="capability-grid">
            {capabilities.map(([title, description], index) => (
              <article className="capability-card" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="systems-ribbon" aria-label="Studio system">
            <div><span>DISCOVER</span><i /></div>
            <div><span>DESIGN</span><i /></div>
            <div><span>BUILD</span><i /></div>
            <div><span>LAUNCH</span></div>
          </div>
        </div>
      </section>

      <section className="lab-band">
        <div className="site-container lab-band-inner">
          <div className="lab-mark" aria-hidden="true">
            <span>AMP</span>
            <i />
          </div>
          <div>
            <p className="eyebrow">Inside the lab</p>
            <h2>Technology with pulse, purpose, and a point of view.</h2>
          </div>
          <div className="lab-tags">
            <span>AI systems</span>
            <span>Community platforms</span>
            <span>Digital access</span>
            <span>Founder-led builds</span>
          </div>
        </div>
      </section>

      <section className="section site-container">
        <div className="manifesto">
          <p className="eyebrow">Our point of view</p>
          <blockquote>
            “The best technology doesn’t ask people to adapt to the system. It builds a better system
            around people.”
          </blockquote>
          <div className="manifesto-footer">
            <div>
              <strong>Donyale “DThree” Mack</strong>
              <span>Founder, A MackProjekt</span>
            </div>
            <Link href="/partnerships">Meet the studio <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section site-container">
        <div className="cta-panel">
          <div>
            <p className="eyebrow">Have a meaningful problem?</p>
            <h2>Let’s make the next move real.</h2>
          </div>
          <Link className="button button-light" href="/interest">
            Tell us about it <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
