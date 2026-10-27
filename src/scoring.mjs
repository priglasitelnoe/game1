export function structureScore(order, attempts) { return order.length === 3 && order.every((v,i)=>v===i) ? (attempts===0 ? 20 : 10) : null; }
export function classificationScore(mistakes) { return Math.max(0,20-Math.max(0,mistakes)*2); }
export function awardOnce(scores,index,points) { return scores[index]!==null ? scores : scores.map((v,i)=>i===index ? Math.max(0,Math.min(20,points)) : v); }
export function headlineScore(choice) { return 10+(choice===0?10:0); }
export function matchesExactly(selected,expected) { return selected.length===expected.length && new Set(selected).size===selected.length && expected.every(id=>selected.includes(id)); }
