"use client";
import { useEffect, useRef } from "react";

/** Decorative light field; stays outside the reading and interaction layers. */
export function ContinuumField() {
  const field = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = field.current;
    const parent = node?.parentElement;
    if (!node || !parent) return;
    let frame = 0;
    let x = 65;
    const move = (event: PointerEvent) => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.ampMotion === 'paused') return;
      x = (event.clientX / innerWidth) * 100;
      if (!frame) frame = requestAnimationFrame(() => {
        node.style.setProperty('--field-x', `${x}%`);
        frame = 0;
      });
    };
    parent.addEventListener('pointermove', move, { passive: true });
    return () => { parent.removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, []);
  return <div className="continuum-field" ref={field} aria-hidden="true">
    <div className="continuum-haze" />
    <svg viewBox="0 0 1440 2200" preserveAspectRatio="none">
      <defs><linearGradient id="amp-stream" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#58e6e4" stopOpacity="0"/><stop offset=".35" stopColor="#58e6e4"/><stop offset=".7" stopColor="#718aef"/><stop offset="1" stopColor="#58e6e4" stopOpacity="0"/></linearGradient></defs>
      {[0,1,2,3,4,5].map(i=><path key={i} d={`M ${1100+i*27} -80 C ${1700+i*20} 360, ${-500+i*45} 320, ${410+i*22} 800 S ${1790-i*25} 1210, ${980+i*20} 1480 S ${-150+i*30} 1810, ${500+i*35} 2280`} />)}
    </svg>
  </div>;
}
