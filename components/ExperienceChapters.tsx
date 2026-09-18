"use client";
import { MovementArtwork } from "./MovementArtwork";
import { ExpressionCarousel } from "./ExpressionCarousel";
import { PortalHighlights } from "./PortalHighlights";
import { CarePortShowcase } from "./CarePortShowcase";
import { useState } from "react";
import { ContinuumField } from "./ContinuumField";
import dynamic from "next/dynamic";
const Sculpture = dynamic(() => import("./Sculpture").then(m => m.Sculpture), { ssr: false });
import Link from "next/link";
import { DeviceShowcase } from "@/components/DeviceShowcase";
import { IntroTrigger } from "@/components/IntroVideo";
import { ventures } from "@/lib/portfolio";
const publications = [
  {title:"Navigating Spiritual Warfare",subtitle:"Understanding, Overcoming, and Protecting Oneself",image:"/brand/spiritual-warfare.png",eyebrow:"Available now",copy:"Understand the battle. Protect your spiritual ground. A practical guide to moving forward with intention.",href:"https://www.amazon.com/Navigating-Spiritual-Warfare-UNDERSTANDING-OVERCOMING/dp/B0CX5JB7BL",action:"Explore on Amazon",theme:"warfare"},
  {title:"AlphaKode",subtitle:"Navigating Workplace Environments",image:"/brand/alphakode.jpg",eyebrow:"Coming soon",copy:"Strategy. Adaptation. Respect. Execution. Read the workplace, understand the dynamics, and make your next move with intention.",href:"mailto:hello@mackprojekt.com?subject=AlphaKode%20early%20access",action:"Request a first look",theme:"alphakode"}
];
export function ExperienceChapters() {
  const [platform,setPlatform]=useState(0);
  const [crown,setCrown]=useState<"king"|"queen">("king");
  const [book,setBook]=useState(0);
  const [step,setStep]=useState(0);
  const product=ventures[platform];const publication=publications[book];
  const process=[['Find the real problem.','Strategy','Start with the people, their obstacles, and the change that would actually matter. Define the purpose before the product.'],['Make the idea tangible.','Experience','Shape the identity, the interface, and the path through it. Give people something clear enough to understand and compelling enough to use.'],['Connect the moving parts.','Engineering','Bring interfaces, data, and workflows together. Build the systems that let the experience work beyond the presentation.'],['Put it into the world.','Launch','Release, listen, and refine. Keep improving around the people who use the work.']];
  return <div className="amp-continuum"><ContinuumField/>
    <nav className="chapter-nav" aria-label="Explore AMP chapters"><span>THE WORLD OF AMP</span><a href="#platforms">01 / Systems</a><a href="#movements">02 / Movements</a><a href="#books">03 / Perspectives</a><a href="#culture">04 / Expression</a></nav>
    <section id="work" className="chapter-intro"><div className="amp-wrap"><p className="amp-label">Independent ideas. Shared ambition.</p><h2>Purpose.<br /><span>AMP-lified.</span></h2><p>Explore what we’re building—and what each venture stands for.</p></div></section>
    <section id="platforms" className={'chapter-platform platform-'+product.id}>
      <div className="amp-wrap"><div className="chapter-kicker"><span>01 / SYSTEMS THAT CONNECT</span><span>A MACKPROJEKT / TECHNOLOGY</span></div>
      <div className="chapter-platform-layout"><div className="chapter-platform-copy"><div className="chapter-switch" aria-label="Select a platform">{['Enterprise','CarePort'].map((name,i)=><button key={name} aria-pressed={platform===i} onClick={()=>setPlatform(i)}>{name}</button>)}</div><p className="chapter-overline">{product.label}</p><h2>{platform===0?<>Complex work.<br /><em>Connected.</em></>:<>Every handoff.<br /><em>Human.</em></>}</h2><h3>{product.name}</h3><p>{platform===0?'People. Programs. One connected place to work.':'Keep the context. Coordinate care. Move to the next action.'}</p><Link className="chapter-link" href={product.href}>{product.action}<span aria-hidden="true">↗</span></Link></div>
      <div className="chapter-system-art" key={product.id}><div className="system-reticle reticle-one"/><div className="system-reticle reticle-two"/>{platform===0?<DeviceShowcase/>:<CarePortShowcase/>}<div className="system-coordinate" aria-hidden="true">AMP / {platform===0?'ENTERPRISE':'CAREPORT'}<br/>PEOPLE → SYSTEMS → PROGRESS</div></div></div>
      {platform===0?<PortalHighlights/>:<div className="system-strip">{['Needs','Services','Context','Next actions'].map((label,i)=><span key={label}><small>0{i+1}</small>{label}</span>)}</div>}</div>
    </section>
    <section id="movements" className={'chapter-crown crown-'+crown}>
      <div className="amp-wrap"><div className="chapter-kicker"><span>02 / ADJUST THE CROWN</span><span>IDENTITY. DIGNITY. OWNERSHIP.</span></div>
      <div className="crown-top"><h2>Change the game.<br /><em>Keep your Crown.</em></h2><div className="chapter-switch" aria-label="Select a movement"><button aria-pressed={crown==='king'} onClick={()=>setCrown('king')}>KingMe</button><button aria-pressed={crown==='queen'} onClick={()=>setCrown('queen')}>QueenMe</button></div></div>
      <div className="crown-stage" key={crown}><div className="crown-art"><span className={"crown-type crown-lettering lettering-"+crown} aria-hidden="true"><span>{crown==='king'?'KING':'QUEEN'}</span><span>ME</span></span><Sculpture kind={crown}/></div><div className="crown-copy"><p className="chapter-overline">{crown==='king'?'Brotherhood. Purpose. Ownership.':'Self-worth. Sisterhood. Realignment.'}</p><h3>{crown==='king'?<>From survival<br/>to ownership.</>:<>Your Crown<br/>never left.</>}</h3><p>{crown==='king'?'Break inherited scripts. Restore dignity. Build what comes next.':'Self-worth. Sisterhood. The courage to realign.'}</p><a className="chapter-link" href={crown==='king'?ventures[3].href:ventures[4].href}>Enter {crown==='king'?'KingMe':'QueenMe'}<span aria-hidden="true">↗</span></a></div></div>
      <MovementArtwork key={crown} movement={crown}/><div className="tools-bridge"><img src="/brand/thumb-tools.webp" width="80" height="80" alt="T.O.O.L.S. Inc." loading="lazy"/><div><p className="chapter-overline">Opportunity needs a pathway.</p><p>T.O.O.L.S. Inc. — education, mentorship, and pathways forward.</p></div><a href="https://www.sdtoolsinc.org">Explore T.O.O.L.S. <span aria-hidden="true">↗</span></a></div></div>
    </section>
    <section id="books" className={'chapter-books book-'+publication.theme}><div className="amp-wrap"><div className="chapter-kicker"><span>03 / THE WRITTEN PERSPECTIVE</span><span>BY DONYALE MACK</span></div><div className="chapter-book-layout"><div className="chapter-book-stage"><span className="book-oversize" aria-hidden="true">{book===0?'SPIRIT':'STRATEGY'}</span><div className="book-plinth"/><img key={publication.image} src={publication.image} alt={publication.title+' book cover'} width="400" height="600" loading="lazy"/></div><div className="chapter-book-copy"><p className="chapter-overline">{publication.eyebrow} / 0{book+1}</p><h2>{publication.title}</h2><h3>{publication.subtitle}</h3><p>{publication.copy}</p><a className="chapter-link" href={publication.href}>{publication.action}<span aria-hidden="true">↗</span></a><div className="book-selector" aria-label="Select a book">{publications.map((p,i)=><button key={p.title} aria-pressed={book===i} onClick={()=>setBook(i)}><span>0{i+1}</span>{p.title}</button>)}</div></div></div></div></section>
    <ExpressionCarousel/>
    <section className="chapter-motion"><div className="amp-wrap"><div className="chapter-kicker"><span>THE WORK, IN MOTION</span><span>A MACKPROJEKT</span></div><div className="motion-heading"><h2>Ideas don’t<br /><em>stand still.</em></h2><p>Get a glimpse of the ventures behind the vision.</p></div><IntroTrigger large/><div className="podcast-strip"><img src="/brand/thumb-podcast.webp" alt="A MackProjekt Podcast" width="90" height="90" loading="lazy"/><div><p className="chapter-overline">A MackProjekt Podcast / Coming soon</p><h3>The conversation continues.</h3></div><a className="chapter-link" href={ventures[6].href}>Stay connected <span aria-hidden="true">↗</span></a></div></div></section>
    <section id="capabilities" className="chapter-process"><div className="amp-wrap"><div className="chapter-kicker"><span>FROM VISION TO RELEASE</span><span>HOW AMP BUILDS</span></div><div className="process-layout"><div><h2>Ambition.<br /><em>With a method.</em></h2><div className="process-switch" aria-label="Explore our process">{process.map((p,i)=><button key={p[1]} aria-pressed={step===i} onClick={()=>setStep(i)}><span>0{i+1}</span>{p[1]}<span aria-hidden="true">↗</span></button>)}</div></div><div className="process-story" key={step}><span className="process-number" aria-hidden="true">0{step+1}</span><h3>{process[step][0]}</h3><p>{process[step][2]}</p><Link className="chapter-link" href="/interest">Bring us your next challenge <span aria-hidden="true">↗</span></Link></div></div></div></section>
  </div>;
}
