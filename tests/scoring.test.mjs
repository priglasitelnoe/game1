import test from 'node:test';
import assert from 'node:assert/strict';
import {awardOnce,structureScore,classificationScore,headlineScore,matchesExactly} from '../src/scoring.mjs';
test('балл бір рет беріледі, нөлдік нәтиже де бекітіледі',()=>{let scores=awardOnce([null,null,null,null,null],0,0);scores=awardOnce(scores,0,20);assert.equal(scores[0],0);assert.equal(awardOnce(scores,1,50)[1],20);});
test('құрылым үшін алғашқы және қайталау бағасы',()=>{assert.equal(structureScore([0,1,2],0),20);assert.equal(structureScore([0,1,2],3),10);assert.equal(structureScore([2,0,1],0),null);assert.equal(structureScore([null,1,2],0),null);});
test('жіктеу бағасы шектеледі және жалпы нәтиже 100',()=>{assert.equal(classificationScore(0),20);assert.equal(classificationScore(2),16);assert.equal(classificationScore(30),0);let scores=[null,null,null,null,null];for(let i=0;i<5;i++)scores=awardOnce(scores,i,20);assert.equal(scores.reduce((a,b)=>a+b,0),100);});
test('тақырып нұсқасы: екі тіркеске 10, дұрыс тақырыпқа тағы 10; баға өзгермейді',()=>{assert.equal(headlineScore(0),20);assert.equal(headlineScore(1),10);const scores=awardOnce([null,null,null,null,null],1,headlineScore(1));assert.equal(awardOnce(scores,1,headlineScore(0))[1],10);});
test('эфирдегі белгілеу тек үш қате тіркестің бәрі табылғанда дұрыс',()=>{assert.equal(matchesExactly([8,2,5],[2,5,8]),true);assert.equal(matchesExactly([0,2,5],[2,5,8]),false);assert.equal(matchesExactly([2,5],[2,5,8]),false);assert.equal(matchesExactly([2,2,5],[2,5,8]),false);assert.equal(matchesExactly([2,5,8,9],[2,5,8]),false);});
