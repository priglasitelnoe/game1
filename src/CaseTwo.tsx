import {ArrowRight,Check,ShieldCheck} from 'lucide-react';
export const headlineOptions = [
 'Абай көшесінің бір бөлігі жөндеу жұмыстарына байланысты үш күнге жабылды',
 'Жол жөндеу жұмыстары бүкіл қаладағы көлік қозғалысын тоқтатты',
];
type Props={marks:number[];choice:number|null;checked:boolean;points:number|null;onMark:(id:number)=>void;onChoice:(id:number)=>void;onConfirm:()=>void};
export function CaseTwo({marks,choice,checked,points,onMark,onChoice,onConfirm}:Props){
 const found=marks.length===2;
 return <>
  <div className="mission-steps" aria-label="Тапсырма қадамдары"><span className={found?'step-done':'step-current'}><b>{found?<Check size={15}/>:1}</b> Екі тіркесті белгілеңіз</span><ArrowRight size={17}/><span className={found?'step-current':''}><b>2</b> Нақты тақырыпты таңдаңыз</span></div>
  {!found&&<div className="headline-layout">
   <article className="newspaper paper"><div className="newspaper-masthead">ҚАЛА ХАБАРШЫСЫ <span>ОҚУ МАКЕТІ · №017</span></div><div className="newspaper-label">ОЙДАН ШЫҒАРЫЛҒАН ОҚУ ЖАҒДАЯТЫ</div>
    <h2 className="sensational">ҚАЛАДА <button aria-pressed={marks.includes(0)} disabled={checked} className={marks.includes(0)?'marked':''} onClick={()=>onMark(0)}>СҰМДЫҚ ЖАҒДАЙ</button>! ТҰРҒЫНДАР <button aria-pressed={marks.includes(1)} disabled={checked} className={marks.includes(1)?'marked':''} onClick={()=>onMark(1)}>ҮРЕЙ ҚҰШАҒЫНДА</button>!</h2>
    <div className="newspaper-foot"><span className="stamp small-stamp">КҮМӘНДІ</span><span>{marks.length}/2 тіркес белгіленді</span></div>
   </article>
   <aside className="fact-card paper"><div className="eyebrow"><ShieldCheck size={19}/> ТЕКСЕРІЛГЕН ДЕРЕК</div><p>Қаладағы Абай көшесінің бір бөлігі жол жөндеу жұмыстарына байланысты <strong>3 күнге уақытша жабылды.</strong> Қоғамдық көлік қозғалысы балама бағытпен ұйымдастырылады.</p><div className="source-note">Нақты орын, себеп және мерзімге назар аударыңыз.</div></aside>
  </div>}
  {!found&&<div className="instruction-strip"><span>01</span><p>Оқырманды негізсіз үрейлендіретін екі тіркесті тақырыптан басып белгілеңіз.</p></div>}
  {found&&<><div className="verified-summary paper"><ShieldCheck size={26}/><div><span className="eyebrow">ТЕКСЕРІЛГЕН ДЕРЕК</span><p>Абай көшесінің бір бөлігі жол жөндеу жұмыстарына байланысты <strong>3 күнге уақытша жабылды.</strong> Қоғамдық көлік балама бағытпен жүреді.</p></div></div><section className="headline-choice paper" aria-labelledby="headline-question"><span className="eyebrow">ЕКІНШІ ҚАДАМ</span><h2 id="headline-question">Қай тақырып берілген дерекке сәйкес келеді?</h2><p>Топпен талқылап, бір тақырыпты таңдаңыз. Жауапты оқытушы экранда белгілейді.</p>
   <div className="headline-options" role="group" aria-label="Тақырып нұсқалары">{headlineOptions.map((text,i)=><button key={text} className={'headline-option '+(choice===i?'option-selected ':'')+(checked&&i===0?'option-correct':'')} aria-pressed={choice===i} disabled={checked} onClick={()=>onChoice(i)}><span className="option-letter">{'АБ'[i]}</span><span>{text}</span>{checked&&i===0?<Check size={22}/>:choice===i?<span className="option-dot"/>:null}</button>)}</div>
   {checked&&<div className={'choice-feedback '+(choice===0?'correct':'incorrect')} role="status"><strong>{choice===0?'Дұрыс! Тақырып дерекке сәйкес келеді.':'Таңдау тіркелді. Дерекке сәйкес келетіні — А нұсқасы.'}</strong><p>Нақты орын, себеп пен мерзім көрсетілген. Бүкіл қаладағы қозғалыс тоқтағаны туралы дерек жоқ.</p><span>Екі тіркес: 10 ұпай · Тақырып: {Math.max(0,(points||0)-10)} ұпай</span></div>}
   <div className="task-actions"><p>{checked?'Жауап бағаланды. Істі аяқтап, дәлелді жинаңыз.':'Таңдауды растағаннан кейін жауап бағаланады.'}</p><button className="primary" disabled={choice===null||checked} onClick={onConfirm}>ЖАУАПТЫ РАСТАУ <Check size={18}/></button></div>
  </section></>}
 </>;
}
