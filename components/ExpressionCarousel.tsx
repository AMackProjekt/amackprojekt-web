"use client";
import { useEffect, useRef, useState } from "react";
import { ventures } from "@/lib/portfolio";

const slides = [
  { venture: ventures[7], title: "Wear the message.", emphasis: "Own the statement.", copy: "I Want My Lawyer Present. Bold apparel. Unmistakable identity.", image: "/brand/iwmlp.webp" },
  { venture: ventures[5], title: "Show up.", emphasis: "As yourself.", copy: "Your mood. Your look. Your expression.", image: "/brand/miminks.png" },
  { venture: ventures[4], title: "Own your presence.", emphasis: "Keep your crown.", copy: "Self-worth. Sisterhood. The courage to realign.", image: "/brand/queenme.png" },
  { venture: ventures[2], title: "Open the door.", emphasis: "Build a pathway.", copy: "Education. Mentorship. Opportunity that moves people forward.", image: "/brand/toolsinc-logo.png" },
  { venture: ventures[3], title: "Rewrite the script.", emphasis: "Build your legacy.", copy: "Brotherhood. Purpose. Ownership.", image: "/brand/kingme.jpg" },
];

export function ExpressionCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motion, setMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);
  const touch = useRef<number | null>(null);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotion(!media.matches && document.documentElement.dataset.ampMotion !== 'paused' && !document.hidden);
    sync();
    const mutation = new MutationObserver(sync);
    mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['data-amp-motion'] });
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: .2 });
    if (root.current) observer.observe(root.current);
    media.addEventListener('change', sync); document.addEventListener('visibilitychange', sync);
    return () => { mutation.disconnect(); observer.disconnect(); media.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, []);
  const running = motion && visible && !paused && !hovered && !focused;
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setActive(value => (value + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [running]);
  const select = (index: number) => { setActive((index + slides.length) % slides.length); setPaused(true); };
  const current = slides[active];
  return <section id="culture" ref={root} className="expression-carousel" aria-label="Expression without apology" aria-roledescription="carousel"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false); }}
    onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); select(active + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
    <div className="amp-wrap">
      <div className="chapter-kicker"><span>04 / EXPRESSION WITHOUT APOLOGY</span><span>IDENTITY IN MOTION</span></div>
      <div className="expression-layout">
        <div className="expression-copy" aria-live={running ? 'off' : 'polite'} aria-atomic="true">
          <div key={current.venture.id}><p className="chapter-overline">{current.venture.name} / 0{active + 1}</p><h2>{current.title}<br/><em>{current.emphasis}</em></h2><p>{current.copy}</p><a className="chapter-link" href={current.venture.href}>{current.venture.action}<span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="expression-deck" aria-label="Swipe or select a brand" onTouchStart={e => { touch.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touch.current !== null) { const distance = e.changedTouches[0].clientX - touch.current; if (Math.abs(distance) > 35) select(active + (distance < 0 ? 1 : -1)); } touch.current = null; }}>
          <div className="expression-ribbon" aria-hidden="true"/>
          {slides.map((slide, i) => { const offset = (i - active + slides.length) % slides.length; const position = offset === 0 ? 0 : offset === 1 ? 1 : offset === slides.length - 1 ? 3 : 2; return <button key={slide.venture.id} className={'expression-card expression-position-' + position} tabIndex={position === 2 ? -1 : 0} aria-hidden={position === 2} aria-label={'Feature expression: ' + slide.venture.name} aria-pressed={active === i} onClick={() => select(i)}>
            <span className="expression-art"><img src={slide.image} alt="" width="500" height="500" loading="lazy" draggable="false"/></span><span className="expression-card-caption"><span>{slide.venture.name}</span><span aria-hidden="true">↗</span></span>
          </button>; })}
        </div>
      </div>
      <div className="expression-controls"><div className="expression-dots" aria-label="Select expression">{slides.map((slide, i) => <button key={slide.venture.id} aria-label={'Show ' + slide.venture.name} aria-pressed={i === active} onClick={() => select(i)}><span>0{i + 1}</span>{slide.venture.name}</button>)}</div><div className="expression-navigation"><button aria-label="Previous expression" onClick={() => select(active - 1)}>←</button><button aria-label="Next expression" onClick={() => select(active + 1)}>→</button><button onClick={() => { setPaused(!paused); setFocused(false); }}>{paused ? 'Resume' : 'Pause'}</button></div></div>
    </div>
  </section>;
}
