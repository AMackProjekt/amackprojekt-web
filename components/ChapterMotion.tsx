"use client";
import { useEffect } from "react";
export function ChapterMotion(){
 useEffect(()=>{
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');const elements=()=>[...document.querySelectorAll<HTMLElement>('.chapter-system-art,.crown-art,.chapter-book-stage,.culture-image')];let frame=0;let previous=0;const positions=new WeakMap<HTMLElement,number>();
 const animate=(time:number)=>{const dt=Math.min(time-previous,50);previous=time;const paused=media.matches||document.documentElement.dataset.ampMotion==='paused';elements().forEach(el=>{const parent=el.parentElement;if(!parent)return;const rect=parent.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const target=paused?0:Math.max(-1,Math.min(1,(innerHeight/2-(rect.top+rect.height/2))/innerHeight))*40;const current=positions.get(el)||0;const next=current+(target-current)*(1-Math.exp(-dt/100));positions.set(el,next);el.style.setProperty('--chapter-depth',next.toFixed(2)+'px');});frame=requestAnimationFrame(animate);};frame=requestAnimationFrame(animate);
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('chapter-in-view');observer.unobserve(entry.target)}}),{threshold:.1});document.querySelectorAll('.chapter-platform-copy,.crown-copy,.chapter-book-copy,.motion-heading,.process-layout').forEach(el=>observer.observe(el));
 return()=>{cancelAnimationFrame(frame);observer.disconnect();elements().forEach(el=>el.style.removeProperty('--chapter-depth'));};
 },[]);return null;
}
