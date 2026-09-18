"use client";
import { useState } from "react";
const artwork = {
 king: [
  { image: "kingme-mission.webp", label: "The mission", alt: "KingMe mission: Transform mindsets. Restore dignity. Strengthen brotherhood. Equip Black Men to heal, grow, build, and lead." },
  { image: "kingme-pillars.webp", label: "Eight pillars", alt: "KingMe pillars: Identity and Mindset; Brotherhood and Respect; Healing and Mental Wellness; Self-Love and Self-Care; Confidence and Communication; Goals and Discipline; Business and Entrepreneurship; Leadership and Service." }
 ],
 queen: [
  { image: "queenme-mission.webp", label: "The movement", alt: "QueenMe: A crown can tilt. Your worth doesn't. A space for women and girls to remember their power, reclaim their voice, and move with intention. KingMe and QueenMe heal together." },
  { image: "queenme-pledge.webp", label: "The pledge", alt: "The QueenMe Pledge: I honor the woman I am, the woman I've been, and the woman I'm becoming. I will not dim to make others comfortable. I will adjust my Krown and help my sisters adjust theirs." }
 ]
};
export function MovementArtwork({ movement }: { movement: "king" | "queen" }) {
 const [active, setActive] = useState(0);
 const slides = artwork[movement];
 const current = slides[active];
 return <div className="movement-artwork"><div className="movement-artwork-toolbar"><p className="chapter-overline">{movement === "king" ? "KingMe / Heal. Grow. Build. Lead." : "QueenMe / Your worth doesn't tilt."}</p><div className="chapter-switch" aria-label="Select movement artwork">{slides.map((slide,i)=><button key={slide.image} aria-pressed={active===i} onClick={()=>setActive(i)}>{slide.label}</button>)}</div></div><a className="movement-artwork-frame" href={'/brand/'+current.image} target="_blank" rel="noopener noreferrer" aria-label={'View '+current.label+' artwork at full size in a new tab'}><img key={current.image} src={'/brand/'+current.image} alt={current.alt} width="2000" height="1100" loading="lazy"/></a><p className="movement-artwork-hint">{current.label} <span>Open artwork to explore in full ↗</span></p></div>;
}
