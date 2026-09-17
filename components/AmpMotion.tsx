"use client";
import { useEffect, useRef, useState } from "react";
export function HeroWords() {
  const words = [
    "move people forward.",
    "turn purpose into progress.",
    "restore dignity.",
    "widen access.",
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((v) => (v + 1) % words.length),
      5000,
    );
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="amp-hero-words">
      <span className="sr-only">move people forward.</span>
      <span aria-hidden="true" key={active}>
        {words[active]}
      </span>
    </span>
  );
}
export function HighlightFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="amp-film">
      <video
        ref={ref}
        loop
        muted
        playsInline
        controls={playing}
        preload="none"
        poster="/brand/kingme.jpg"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/brand/mackprojekt-highlight.mp4" type="video/mp4" />
      </video>
      {!playing && (
        <button
          className="amp-film-play"
          onClick={() => ref.current?.play().catch(() => setPlaying(false))}
          aria-label="Play the MackProjekt highlight film"
        >
          <span aria-hidden="true">▶</span> Play the highlight film{" "}
          <small>00:10 · AMP ventures</small>
        </button>
      )}
    </div>
  );
}
