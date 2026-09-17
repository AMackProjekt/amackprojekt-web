"use client";
import Link from "next/link";
import { IntroTrigger } from "@/components/IntroVideo";
import { useEffect, useState } from "react";
import { ImpactUniverse } from "@/components/ImpactUniverse";

export function ImpactHero() {

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(media.matches);
    sync(); media.addEventListener("change", sync);
  return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => { document.documentElement.dataset.ampMotion = paused ? "paused" : "active"; return () => { delete document.documentElement.dataset.ampMotion; }; }, [paused]);

  return (
    <section className={`impact-hero ${paused ? "motion-paused" : ""}`} aria-labelledby="impact-title">
      <div className="impact-field" aria-hidden="true"><div className="impact-orbit orbit-one" /><div className="impact-orbit orbit-two" /><div className="impact-orbit orbit-three" /><div className="impact-grid" /></div>
      <div className="amp-wrap impact-content">
        <div className="impact-top"><p className="amp-label">A MackProjekt · Independent innovation studio</p><button className="impact-motion" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Enable motion" : "Pause motion"}<span aria-hidden="true">{paused ? "+" : "Ⅱ"}</span></button></div>
        <div className="impact-layout">
          <div className="impact-statement">
            <p className="impact-eyebrow">Technology. Culture. Purpose.</p>
            <h1 id="impact-title">Built to<br /><span className="impact-outline">move</span><br /><em>what’s next.</em></h1>
            <p className="impact-intro">One independent studio connecting technology, creative identity, and community ventures.</p>
            <div className="amp-actions"><a href="#work" className="amp-button">Enter the AMP portfolio <span aria-hidden="true">↗</span></a><Link href="/interest" className="amp-text-link">Bring your vision <span aria-hidden="true">↗</span></Link></div>
            <IntroTrigger />
          </div>
          <ImpactUniverse paused={paused} />
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
