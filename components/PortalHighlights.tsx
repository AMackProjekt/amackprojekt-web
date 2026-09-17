"use client";
import { useState } from "react";

export const portalHighlights = [
  {id:"dashboard",label:"Dashboards",title:"See the bigger picture.",copy:"A shared operations hub for your team, caseload, and next actions."},
  {id:"caseload",label:"Case management",title:"Every case. In context.",copy:"Explore the roster, case status, and participant workspace."},
  {id:"learning",label:"Learning",title:"Keep moving forward.",copy:"A professional development hub for courses and training records."},
  {id:"coordination",label:"Coordination",title:"Make the next move together.",copy:"Bring schedules, team meetings, and workflow tools into view."},
];

export function PortalHighlights(){
  const [active,setActive]=useState(0);
  const item=portalHighlights[active];
  return <div className="portal-highlights">
    <div className="portal-preview-heading"><div><p className="chapter-overline">Inside Projekt-Enterprise</p><h3>See the work. In action.</h3></div><button className="amp-text-link" onClick={()=>window.dispatchEvent(new Event('amp-open-intro'))}>Watch the 30-second introduction <span aria-hidden="true">↗</span></button></div>
    <div className="portal-preview-tabs" role="tablist" aria-label="Explore portal screens">{portalHighlights.map((p,i)=><button key={p.id} role="tab" id={'portal-tab-'+p.id} aria-selected={active===i} aria-controls="portal-preview-panel" tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%4;else if(e.key==='ArrowLeft')next=(i+3)%4;else if(e.key==='Home')next=0;else if(e.key==='End')next=3;else return;e.preventDefault();setActive(next);document.getElementById('portal-tab-'+portalHighlights[next].id)?.focus();}}><img src={'/brand/portal-'+p.id+'.webp'} alt="" width="1280" height="721" loading="lazy"/><span><small>0{i+1}</small>{p.label}</span></button>)}</div>
    <div id="portal-preview-panel" role="tabpanel" aria-labelledby={'portal-tab-'+item.id} tabIndex={0} className="portal-preview-panel"><div className="portal-preview-frame"><img key={item.id} src={'/brand/portal-'+item.id+'.webp'} alt={item.label+' screen from the Projekt-Enterprise staff portal, shown with demo data'} width="1280" height="721" loading="lazy"/></div><div className="portal-preview-caption"><div><h4>{item.title}</h4><p>{item.copy}</p></div><span>Actual portal interface<br/>Demo data</span></div></div>
  </div>;
}
