"use client";
import { useEffect, useRef, useState } from "react";

export function BrandCarousel({ assets }: { assets: string[][] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const root = useRef<HTMLElement>(null);
  const running = !paused && !hovered && !focused && visible && pageVisible;
  const [name, label, src] = assets[active];

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => { if (media.matches) setPaused(true); };
    preference(); media.addEventListener('change', preference);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility); visibility();
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.removeEventListener('change', preference); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setActive(i => (i + 1) % assets.length), 6500);
    return () => clearTimeout(timer);
  }, [running, active, assets.length]);
  const select = (index: number) => { setPaused(true); setActive((index + assets.length) % assets.length); };

  return <section id="brand-assets" ref={root} className="brand-gallery amp-wrap" aria-label="Official brand artwork" aria-roledescription="carousel"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
    onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); select(active + (e.key === 'ArrowRight' ? 1 : -1)); } }}>
    <div className="brand-gallery-heading"><div><p className="amp-label">The AMP identities</p><h2>One world. <em>Distinct signatures.</em></h2></div><span className="brand-gallery-count">{String(active + 1).padStart(2, '0')} <span>/ {String(assets.length).padStart(2, '0')}</span></span></div>
    <div className="brand-gallery-stage" aria-live={paused ? 'polite' : 'off'} aria-atomic="true">
      <div className="brand-gallery-slide" key={name} role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${assets.length}: ${name}`}>
        <div className="brand-gallery-art"><div className="brand-gallery-orbit" aria-hidden="true"/><img src={src} alt={`${name} official artwork`} width="560" height="350" /></div>
        <div className="brand-gallery-story"><p className="amp-label">{label}</p><h3>{name}</h3><a href={src} download className="brand-download">Download artwork <span aria-hidden="true">↓</span></a></div>
      </div>
    </div>
    <div className="brand-gallery-toolbar"><div className="brand-gallery-controls"><button onClick={() => select(active - 1)} aria-label="Previous artwork">←</button><button onClick={() => select(active + 1)} aria-label="Next artwork">→</button><button className="brand-rotation" onClick={() => { setPaused(p => !p); setFocused(false); }} aria-label={paused ? 'Resume artwork rotation' : 'Pause artwork rotation'}>{paused ? 'Play' : 'Pause'} <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button></div><div className="brand-gallery-progress" aria-hidden="true"><span key={`${active}-${running}`} style={{animationPlayState:running?'running':'paused'}} /></div><span className="brand-gallery-hint">Explore the identities</span></div>
    <div className="brand-gallery-thumbs" aria-label="Choose brand artwork">{assets.map(([title,,image],i) => <button key={title} aria-label={`Show ${title} artwork`} aria-pressed={i === active} onClick={() => select(i)}><img src={image} alt="" width="60" height="42" loading="lazy"/><span>{title === 'Projekt Enterprise Portal Suite' ? 'CaseFlow' : title === 'A MackProjekt Podcast' ? 'Podcast' : title}</span></button>)}</div>
  </section>;
}
