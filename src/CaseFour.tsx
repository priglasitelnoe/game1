import {Check,FileText} from 'lucide-react';
import {broadcastSegments} from './content';
type Props={marks:number[];done:boolean;onMark:(index:number)=>void;onCheck:()=>void};
export function CaseFour({marks,done,onMark,onCheck}:Props){
 return <>
  <article className="transcript text-only paper"><div className="document-id"><span>ЭФИР МӘТІНІ / ОҚУ ЖАҒДАЯТЫ</span><FileText size={22}/></div>
   <div className="transcript-intro"><span className="eyebrow">РЕДАКТОРҒА КЕЛГЕН МӘТІН</span><h2>Эфирге шығар алдында тексеріңіз.</h2><p>Мәтінді оқып, орынсыз қолданылған үш тіркесті табыңыз. Күмәнді тіркесті басып белгілеңіз. Қайта бассаңыз, белгі алынады.</p></div>
   <p className="report-text">{broadcastSegments.map((segment,i)=><span key={i}><button className={'transcript-fragment '+(marks.includes(i)?'marked':'')} aria-pressed={marks.includes(i)} disabled={done} onClick={()=>onMark(i)}>{segment.text}</button>{' '}</span>)}</p>
   <div className="document-bottom"><span>{marks.length} / 3 ТІРКЕС БЕЛГІЛЕНДІ</span><span>НАҚТЫЛЫҚ · ТҮСІНІКТІЛІК · ЖАУАПКЕРШІЛІК</span></div>
  </article>
  <div className="task-actions"><p>{done?'Үш тіркес те дұрыс анықталды. Себебін топпен талқылаңыз.':'Таңдауыңызды мәтіндегі деректерге сүйеніп түсіндіріңіз.'}</p><button className="primary" disabled={marks.length!==3||done} onClick={onCheck}>ТАЛДАУДЫ ТЕКСЕРУ <Check size={18}/></button></div>
 </>;
}
