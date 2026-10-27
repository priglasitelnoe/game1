import type {PointerEvent} from 'react';
export type DragGhost={text:string;x:number;y:number}|null;
/** Pointer-based transfer works for a mouse, stylus and classroom touch screens. */
export function beginTransfer(event:PointerEvent<HTMLElement>, text:string, target:'slot'|'drawer', drop:(index:number)=>void, ghost:(value:DragGhost)=>void){
 if(event.button!==0)return;
 const start={x:event.clientX,y:event.clientY};let moved=false;
 const move=(e:globalThis.PointerEvent)=>{if(e.pointerId!==event.pointerId)return;if(Math.hypot(e.clientX-start.x,e.clientY-start.y)>8)moved=true;if(moved){e.preventDefault();ghost({text,x:e.clientX,y:e.clientY});}};
 const cleanup=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',cancel);ghost(null);};
 const up=(e:globalThis.PointerEvent)=>{if(e.pointerId!==event.pointerId)return;if(moved){const el=document.elementFromPoint(e.clientX,e.clientY)?.closest<HTMLElement>('[data-'+target+']');if(el)drop(Number(el.dataset[target]));}cleanup();};
 const cancel=()=>cleanup();
 window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',up);window.addEventListener('pointercancel',cancel);
}
