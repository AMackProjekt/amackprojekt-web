"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ventures } from "@/lib/portfolio";
const featured = [ventures[0], ventures[3], ventures[4], ventures[1], ventures[5]];
export function ImpactHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(media.matches);
    sync(); media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const venture = featured[active];
  return (
    <section className={`impact-hero ${paused ? "motion-paused" : ""}`} aria-labelledby="impact-title">
      <div className="impact-field" aria-hidden="true"><div className="impact-orbit orbit-one" /><div className="impact-orbit orbit-two" /><div className="impact-orbit orbit-three" /><div className="impact-grid" /></div>
      <div className="amp-wrap impact-content">
        <div className="impact-top"><p className="amp-label">A MackProjekt · Independent innovation studio</p><button className="impact-motion" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Enable motion" : "Pause motion"}<span aria-hidden="true">{paused ? "+" : "Ⅱ"}</span></button></div>
        <div className="impact-layout">
          <div className="impact-statement">
            <p className="impact-eyebrow">Technology. Culture. Purpose.</p>
            <h1 id="impact-title">Built to<br /><span className="impact-outline">move</span><br /><em>what’s next.</em></h1>
            <p className="impact-intro">Platforms that connect. Movements that empower. Ideas that become part of people’s lives.</p>
            <div className="amp-actions"><a href="#work" className="amp-button">Enter the AMP portfolio <span aria-hidden="true">↗</span></a><Link href="/interest" className="amp-text-link">Bring your vision <span aria-hidden="true">↗</span></Link></div>
          </div>
          <div className="impact-showcase" aria-label="Featured ventures">
            <div className="impact-showcase-top"><span>Inside the AMP ecosystem</span><span>0{active + 1} / 05</span></div>
            <div className={`impact-stage stage-${venture.id}`} key={venture.id}>
              <span className="impact-stage-label">{venture.category} / {venture.label}</span>
              <div className="impact-art">{venture.image ? <img src={venture.image} alt={venture.name} width="700" height="600" fetchPriority={active === 0 ? "high" : "auto"} /> : <div className="impact-careport"><span>CarePort</span><strong>Connect</strong><small>Every handoff. A human connection.</small></div>}</div>
              <div className="impact-stage-caption"><div><span className="amp-label">Featured venture</span><h2>{venture.name}</h2></div><a href={venture.href} aria-label={`Explore ${venture.name}`} className="impact-launch">↗</a></div>
            </div>
            <div className="impact-venture-controls" aria-label="Choose a featured venture">{featured.map((item, index) => <button key={item.id} onClick={() => setActive(index)} aria-pressed={index === active} aria-label={`Feature ${item.name}`}><span>0{index + 1}</span>{["Enterprise", "KingMe", "QueenMe", "CarePort", "Mi Minks"][index]}</button>)}</div>
            <p className="impact-showcase-note">Independent ventures. Connected by A MackProjekt.</p>
          </div>
        </div>
        <div className="impact-bottom"><span>From possibility to something people can use.</span><a href="#work">Explore the ecosystem <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  );
}
export function ImpactReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("impact-entered"); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll(".amp-section-heading, .amp-feature-grid, .amp-services, .amp-founder, .amp-legacy-grid").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
