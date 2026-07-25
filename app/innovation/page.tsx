import { Navbar } from "@/components/ui/Navbar";
import Link from "next/link";

const work = [
  {
    number: "01",
    name: "T.O.O.L.S. Inc.",
    label: "Reentry technology",
    headline: "A clearer path from returning home to moving forward.",
    description:
      "A connected support experience for education, employment readiness, mentorship, and coordinated services.",
    href: "/reentry",
  },
  {
    number: "02",
    name: "MackChat",
    label: "Community infrastructure",
    headline: "Connection designed around trust.",
    description:
      "A focused communication experience for military members, families, civilian supporters, and community partners.",
    href: "/messaging",
  },
  {
    number: "03",
    name: "I Want My Lawyer Present",
    label: "Rights awareness",
    headline: "Critical information made easier to use.",
    description:
      "A plain-language public resource helping people understand and communicate their right to legal representation.",
    href: "https://iwantmylawyerpresent.com",
  },
];

export default function WorkPage() {
  return (
    <main>
      <Navbar />
      <section className="inner-hero site-container">
        <p className="eyebrow">Selected work</p>
        <h1>Products with a reason to exist.</h1>
        <p>
          We build where technology can remove friction, widen access, or create a stronger connection
          between people and the support they need.
        </p>
      </section>

      <section className="site-container case-list">
        {work.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <article className="case-study" key={item.name}>
              <div className="case-meta">
                <span>{item.number}</span>
                <p>{item.label}</p>
              </div>
              <div className="case-body">
                <h2>{item.name}</h2>
                <h3>{item.headline}</h3>
                <p>{item.description}</p>
                <Link href={item.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                  View project <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className={`case-visual case-${item.number}`} aria-hidden="true"><span>{item.number}</span></div>
            </article>
          );
        })}
      </section>

      <section className="section site-container">
        <div className="cta-panel">
          <div><p className="eyebrow">Build with us</p><h2>Bring us the problem worth solving.</h2></div>
          <Link className="button button-light" href="/interest">Start a conversation ↗</Link>
        </div>
      </section>
    </main>
  );
}
