export type SoundKind='click'|'paper'|'confirm'|'success'|'error'|'unlock';

/** Local instrumental recording plus quiet procedural effects. No speech or external services. */
export class GameAudio {
 private music:HTMLAudioElement;
 private ctx:AudioContext|null=null;
 private effects:GainNode|null=null;
 private enabled=false;
 private effectsVolume=.55;
 private lastEffect=0;
 private disposed=false;
 constructor(){
  this.music=new Audio(`${import.meta.env.BASE_URL}audio/investigation-ambient.wav`);
  this.music.loop=true;this.music.preload='none';this.music.hidden=true;this.music.id='background-score';this.music.setAttribute('aria-hidden','true');document.body.append(this.music);
 }
 configure(enabled:boolean,musicVolume:number,effectsVolume:number){
  this.enabled=enabled;this.music.volume=Math.max(0,Math.min(1,musicVolume));this.effectsVolume=effectsVolume;
  if(this.effects&&this.ctx)this.effects.gain.setTargetAtTime(enabled?effectsVolume:0,this.ctx.currentTime,.04);
  if(!enabled||musicVolume===0)this.music.pause();
 }
 async start(){
  if(!this.enabled||this.disposed)return;
  if(!this.ctx){this.ctx=new AudioContext();this.effects=this.ctx.createGain();this.effects.gain.value=this.effectsVolume;this.effects.connect(this.ctx.destination);}
  if(this.ctx.state==='suspended')await this.ctx.resume();
  if(this.enabled&&this.music.volume>0&&this.music.paused){try{await this.music.play();}catch(error){if(this.enabled&&this.music.volume>0)throw error;}}
 }
 effect(kind:SoundKind='click'){
  if(!this.enabled||!this.ctx||!this.effects||this.ctx.state!=='running')return;
  const now=this.ctx.currentTime;
  if(kind==='click'&&now-this.lastEffect<.06)return;
  this.lastEffect=now;
  const tone=(frequency:number,offset:number,duration:number,volume:number,type:OscillatorType='sine')=>{
   const osc=this.ctx!.createOscillator(),gain=this.ctx!.createGain();osc.type=type;osc.frequency.value=frequency;
   gain.gain.setValueAtTime(0,now+offset);gain.gain.linearRampToValueAtTime(volume,now+offset+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+offset+duration);
   osc.connect(gain);gain.connect(this.effects!);osc.start(now+offset);osc.stop(now+offset+duration+.03);osc.onended=()=>{osc.disconnect();gain.disconnect();};
  };
  if(kind==='paper'){
   const length=Math.floor(this.ctx.sampleRate*.22),buffer=this.ctx.createBuffer(1,length,this.ctx.sampleRate),data=buffer.getChannelData(0);
   for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/length)*.1;
   const source=this.ctx.createBufferSource(),filter=this.ctx.createBiquadFilter();source.buffer=buffer;filter.type='bandpass';filter.frequency.value=1700;filter.Q.value=.7;source.connect(filter);filter.connect(this.effects);source.start();source.onended=()=>{source.disconnect();filter.disconnect();};
  }else if(kind==='success'||kind==='unlock'){
   const notes=kind==='unlock'?[220,329.63,440,554.37,659.25]:[440,554.37,659.25];
   notes.forEach((n,i)=>tone(n,i*.1,.65,.06));
  }else if(kind==='error'){tone(185,0,.22,.07);tone(164.81,.11,.25,.05);}
  else if(kind==='confirm'){tone(392,0,.23,.07);tone(523.25,.07,.3,.05);}
  else {tone(780,0,.045,.055);tone(390,.008,.065,.025);}
 }
 dispose(){this.disposed=true;this.music.pause();this.music.removeAttribute('src');this.music.load();this.music.remove();void this.ctx?.close();}
}
