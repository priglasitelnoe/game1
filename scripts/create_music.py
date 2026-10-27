"""Reproducible original instrumental loop. No samples, vocals or external assets."""
from pathlib import Path
import wave
import numpy as np

SR=22050
beat=60/68
bar=beat*4
length=bar*16
n=round(length*SR)
mix=np.zeros((n,2),dtype=np.float64)
rng=np.random.default_rng(17)
def hz(midi):return 440*2**((midi-69)/12)
def add(signal,start,pan=0):
    idx=(np.arange(len(signal))+round(start*SR))%n
    mix[idx,0]+=signal*np.sqrt((1-pan)/2)
    mix[idx,1]+=signal*np.sqrt((1+pan)/2)
def pad(notes,start):
    duration=bar*2.2;t=np.arange(round(duration*SR))/SR
    env=np.minimum(t/1.2,1)*np.minimum((duration-t)/1.7,1)
    for j,midi in enumerate(notes):
        f=hz(midi);phase=rng.uniform(0,2*np.pi)
        sig=(np.sin(2*np.pi*f*t+phase)+.17*np.sin(2*np.pi*f*2.002*t+phase))
        sig*=.014*env*(.93+.07*np.sin(2*np.pi*.13*t))
        add(sig,start,(j-2)*.2)
def pluck(midi,start,pan):
    t=np.arange(round(3.6*SR))/SR;f=hz(midi)
    env=(1-np.exp(-t*85))*np.exp(-t*1.9)
    sig=(np.sin(2*np.pi*f*t)+.28*np.sin(2*np.pi*f*2*t)*np.exp(-t*3)+.08*np.sin(2*np.pi*f*3*t)*np.exp(-t*6))*env*.035
    add(sig,start,pan)
    add(sig*.24,start+beat*.75,-pan)
    add(sig*.09,start+beat*1.5,pan)
chords=[[50,57,60,64,65],[46,53,57,60,62],[43,50,53,57,62],[45,52,55,59,64]]
melodies=[[74,69,77,76],[74,72,69,65],[74,69,70,77],[76,71,69,64]]
for b in range(0,16,2):
    chord=chords[(b//2)%4];pad(chord,b*bar)
    notes=melodies[(b//2)%4]
    for j,midi in enumerate(notes):pluck(midi,b*bar+(j*1.5+.5)*beat,(-1 if j%2 else 1)*.32)
    # Soft sustained bass anchors the investigation theme.
    t=np.arange(round(bar*2.05*SR))/SR
    env=np.minimum(t/.6,1)*np.minimum((t[-1]-t)/1.3,1)
    add(np.sin(2*np.pi*hz(chord[0]-12)*t)*env*.018,b*bar,0)
mix=np.tanh(mix*2.5)
peak=np.max(np.abs(mix));mix*=.56/peak
audio=(mix*32767).astype('<i2')
out=Path(__file__).resolve().parents[1]/'public'/'audio'/'investigation-ambient.wav'
out.parent.mkdir(parents=True,exist_ok=True)
with wave.open(str(out),'wb') as w:
    w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes(audio.tobytes())
print(f'{out.name}: {length:.2f}s, stereo, {out.stat().st_size} bytes, peak {np.max(np.abs(mix)):.2f}')
