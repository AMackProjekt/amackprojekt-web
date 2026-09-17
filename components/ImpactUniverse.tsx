"use client";
import { useEffect, useRef, useState } from "react";
import { ventures } from "@/lib/portfolio";
export function ImpactUniverse({ paused }: { paused: boolean }) {
  const [selected, setSelected] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const angle = useRef(-0.9);
  const drag = useRef<{x:number;angle:number;moved:boolean} | null>(null);
  const held = useRef(false);
  const visible = useRef(true);
  const venture = ventures[selected];
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {visible.current=entries[0].isIntersecting;});
    observer.observe(element);
    const nodes = [...element.querySelectorAll<HTMLElement>('.universe-node')];
    const lines = [...element.querySelectorAll<SVGLineElement>('.universe-link')];
    let frame=0, previous=0;
    const render = (time:number) => {
      const delta=Math.min(time-previous,40);previous=time;
      if(visible.current && !document.hidden){
        if(!paused && !held.current && !drag.current) angle.current+=delta*0.000025;
        nodes.forEach((node,i)=>{
          const a=angle.current+i*Math.PI*2/nodes.length;
          const x=50+Math.cos(a)*36;
          const y=50+Math.sin(a)*35;
          const depth=(Math.sin(a)+1)/2;
          node.style.left=x+'%';node.style.top=y+'%';node.style.transform=`translate(-50%,-50%) scale(${.82+depth*.18})`;node.style.zIndex=String(3+Math.round(depth*5));
          lines[i]?.setAttribute('x2',String(x));lines[i]?.setAttribute('y2',String(y));
        });
      }
      frame=requestAnimationFrame(render);
    };
    frame=requestAnimationFrame(render);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();};
  },[paused]);
  const choose=(index:number)=>{if(drag.current?.moved)return;setSelected(index);};
  return <div className="amp-universe" aria-label="Interactive AMP ecosystem">
    <div className="universe-heading"><span>Explore the AMP ecosystem</span><span>07 connected ventures</span></div>
    <div ref={root} className="universe-world" aria-label="Drag horizontally or select a venture" onPointerDown={e=>{if(e.button!==0)return;drag.current={x:e.clientX,angle:angle.current,moved:false};}} onPointerMove={e=>{if(!drag.current)return;const distance=e.clientX-drag.current.x;if(Math.abs(distance)>5){drag.current.moved=true;angle.current=drag.current.angle+distance*.008;e.currentTarget.setPointerCapture(e.pointerId);}}} onPointerUp={e=>{const moved=drag.current?.moved;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);if(moved){setTimeout(()=>{drag.current=null},0)}else drag.current=null;}} onPointerCancel={()=>{drag.current=null}} onPointerLeave={()=>{if(!drag.current?.moved)drag.current=null;held.current=false;}} onMouseEnter={()=>{held.current=true}} onMouseLeave={()=>{held.current=false}} onFocusCapture={()=>{held.current=true}} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))held.current=false;}}>
      <div className="universe-halo" aria-hidden="true" /><div className="universe-track" aria-hidden="true" />
      <svg className="universe-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{ventures.map((v,i)=><line key={v.id} className={i===selected?'universe-link selected':'universe-link'} x1="50" y1="50" x2={50+Math.cos(-.9+i*Math.PI*2/7)*36} y2={50+Math.sin(-.9+i*Math.PI*2/7)*35} />)}</svg>
      <div className="universe-core"><img src="/brand/thumb-amp.webp" width="130" height="130" alt="A MackProjekt connects the ecosystem" /><span>THE STUDIO</span></div>
      {ventures.map((v,i)=><button className={'universe-node node-'+v.id} key={v.id} style={{left:(50+Math.cos(-.9+i*Math.PI*2/7)*36)+'%',top:(50+Math.sin(-.9+i*Math.PI*2/7)*35)+'%'}} onClick={()=>choose(i)} aria-label={'Feature '+v.name} aria-pressed={selected===i} aria-controls="universe-detail">{v.image?<img src={'/brand/thumb-'+v.id+'.webp'} alt="" width="90" height="90" draggable="false" />:<span className="universe-cp" aria-hidden="true">CP<span>CONNECT</span></span>}<span className="universe-node-label">{['Enterprise','CarePort','T.O.O.L.S.','KingMe','QueenMe','Mi Minks','Podcast'][i]}</span></button>)}
      <p className="universe-instruction">Drag to rotate <span>·</span> Select to discover</p>
    </div>
    <div className={'universe-detail detail-'+venture.id} id="universe-detail" aria-live="polite" aria-atomic="true">
      <div className="universe-detail-copy" key={venture.id}><p className="amp-label">0{selected+1} / {venture.category}</p><h2>{venture.name}</h2><p>{venture.description}</p><a href={venture.href} className="amp-text-link">{venture.action} <span aria-hidden="true">↗</span></a></div>
      <div className="universe-controls"><button aria-label="Previous venture" onClick={()=>setSelected((selected+6)%7)}>←</button><button aria-label="Next venture" onClick={()=>setSelected((selected+1)%7)}>→</button></div>
    </div>
  </div>;
}
