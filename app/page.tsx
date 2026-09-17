import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { ExperienceChapters } from "@/components/ExperienceChapters";
import { AmpCTA } from "@/components/AmpCTA";
import { ImpactHero, ImpactReveal } from "@/components/ImpactHero";
import { ChapterMotion } from "@/components/ChapterMotion";
import { IntroVideo } from "@/components/IntroVideo";
export default function Home() {
  return (
    <main id="main-content">
      <Navbar />
      <ImpactHero />
      <ImpactReveal />
      <ChapterMotion />
      <IntroVideo />
      <ExperienceChapters />
      <section id="studio" className="amp-section amp-wrap amp-founder">
        <div>
          <p className="amp-label">Founder’s perspective</p>
          <h2>
            Purpose isn’t a layer.
            <br />
            <em>It’s the foundation.</em>
          </h2>
        </div>
        <div>
          <blockquote>
            “The best technology doesn’t ask people to adapt to the system. It
            builds a better system around people.”
          </blockquote>
          <p className="amp-founder-name">
            Donyale “DThree” Mack<span>Founder, A MackProjekt</span>
          </p>
          <Link className="amp-text-link" href="/partnerships">
            Meet the studio ↗
          </Link>
        </div>
      </section>
      <section className="amp-legacy">
        <div className="amp-wrap amp-legacy-grid">
          <div>
            <p className="amp-label">On a personal note</p>
            <h2>
              Legacy for
              <br />
              <em>generations.</em>
            </h2>
          </div>
          <p>
            Every Projekt is inspired and motivated through my father Donald
            “DT” Mack, my uncle Robert Ingram Sr., and my father Paul Cruz Sr.
          </p>
          <img
            src="/brand/mackenterprises.png"
            alt="MackEnterprises legacy identity"
            width="450"
            height="300"
            loading="lazy"
          />
        </div>
      </section>
      <AmpCTA />
    </main>
  );
}
