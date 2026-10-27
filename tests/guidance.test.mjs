import test from 'node:test';
import assert from 'node:assert/strict';
import {campaign} from '../campaign.mjs';
import {createBattle,forge,calibrate,buy,repair,pulse,step} from '../battle.mjs';
import {guidance} from '../guidance.mjs';

test('first-night instructions lead through actual legal actions to victory',()=>{
  const l=campaign[0];let s=createBattle();const phases=[];
  for(let i=0;i<40&&s.status==='playing';i++){
    const g=guidance(l,s,true);phases.push(g.phase);let result;
    if(g.action==='forge')result=forge(l,s,6);
    else if(g.action==='charge')result=calibrate(l,s,12);
    else if(g.action.startsWith('buy:'))result=buy(s,Number(g.action.split(':')[1]));
    else if(g.action==='pulse')result=pulse(l,s);
    else if(g.action==='repair')result=repair(s);
    else result=step(l,s);
    assert.ok(result.ok,`${g.phase}: ${result.message}`);s=result.state;
  }
  assert.equal(s.status,'won');assert.equal(s.hp,8);
  for(const phase of ['forge','place','first-shot','observe','charge','pulse','expand'])assert.ok(phases.includes(phase),phase);
  assert.equal(s.synced,true);assert.equal(s.pulseUsed,true);
});
test('guidance never asks for an unavailable install before forging and re-teaches weak first-night parts',()=>{
  const l=campaign[0],initial=createBattle();assert.equal(guidance(l,initial,true).action,'forge');
  const weak=forge(l,initial,1).state;assert.equal(guidance(l,weak,true).action,'forge');assert.equal(guidance(l,weak,false).action,'buy:0');
  assert.equal(guidance(campaign[1],forge(campaign[1],initial,8).state,true).action,'buy:1');
});
test('terminal guidance describes survival and offers restart; game seconds do not silently advance battle turns',()=>{
  const l=campaign[0],s=forge(l,createBattle(),6).state,c=calibrate(l,s,12).state;
  assert.equal(c.turn,0);assert.equal(buy(c,0).state.turn,0);
  assert.equal(guidance(l,{...c,status:'lost'}).action,'restart');
  assert.match(guidance(l,{...c,status:'won'}).body,/내구도/);
});
