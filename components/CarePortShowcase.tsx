"use client";
import { useState } from "react";

const stages = [
  { name: 'Context', title: 'See the whole story.', copy: 'Keep needs and service history together.' },
  { name: 'Coordinate', title: 'Connect the next handoff.', copy: 'Bring team communication closer to the work.' },
  { name: 'Act', title: 'Make the next move clear.', copy: 'Identify responsibilities, follow-ups, and next actions.' },
];
export function CarePortShowcase() {
  const [active, setActive] = useState(0);
  return <div className="careport-showcase">
    <div className="careport-material" onPointerMove={event => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.ampMotion === 'paused') return;
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--careport-turn', `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
    }} onPointerLeave={event => event.currentTarget.style.setProperty('--careport-turn', '0deg')}>
      <img className="careport-ribbon" src="/brand/careport-fluid.webp" alt="Sculptural blue glass ribbon connecting softly rounded interface layers" width="1600" height="900" loading="lazy"/>
      <div className="careport-signature"><span className="careport-symbol" aria-hidden="true">C<span>↗</span></span><div>CarePort<small>CONNECT</small></div></div>
      <div className="careport-glass-note" key={active}><p>CONTINUITY / 0{active + 1}</p><h3>{stages[active].title}</h3><span>{stages[active].copy}</span></div>
    </div>
    <div className="careport-flow" aria-label="Explore CarePort workflow">{stages.map((stage, i) => <button key={stage.name} aria-pressed={active === i} onClick={() => setActive(i)}><span>0{i + 1}</span>{stage.name}<span aria-hidden="true">{active === i ? '↗' : '·'}</span></button>)}</div>
    <p className="careport-concept">Workflow overview · Concept visualization</p>
  </div>;
}
