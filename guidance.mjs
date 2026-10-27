import {target} from './engine.mjs';

// Guidance describes legal actions in the actual battle state; it never advances time.
export function guidance(level,s,tutorial=false){
  const demo=tutorial&&level.id===1;
  const make=(phase,title,body,action,label,selector)=>({phase,title,body,action,label,selector});
  if(s.status!=='playing')return make('finished',s.status==='won'?'공방을 지켰어요!':'다시 배치해볼까요?','체력이 남은 채 마지막 침입까지 버티면 성공이에요.','restart','이번 밤 다시 시작','#restart');
  if(!s.power||(demo&&s.power<3&&s.turn===0&&!s.towers.some(Boolean))){
    const best=target({mode:'gcd',values:level.rods});
    return make('forge','1. 먼저 자동 발사기 부품을 만드세요',demo?`${level.rods.join('칸과 ')}칸 막대를 남김없이 나누는 가장 긴 길이는 ${best}칸이에요. 부품 길이에 ${best}을 입력하고 ‘제작’을 누르세요. 그러면 자동 발사기 공격력이 3이 돼요.`:'오른쪽 부품 공방에서 모든 막대를 남김없이 나누는 길이를 입력하고 제작하세요. 최대공약수로 만들면 공격력 3이에요.','forge','부품 제작창으로 이동','#forge-panel');
  }
  if(!s.towers.some(Boolean)&&s.coins>=2){const lane=level.spawns.find(e=>e.at>=s.turn)?.lane??0;return make('place','2. 벌레가 올 통로에 자동 발사기를 설치하세요',`${lane+1}번 통로부터 벌레가 와요. 톱니 2개로 설치하면 그 통로의 벌레를 자동 공격해요. 설치만으로 차례가 지나가지는 않아요.`,`buy:${lane}`,`${lane+1}번 통로에 자동 발사기 설치 · 톱니 2`,`[data-buy="${lane}"]`);}
  if(s.turn===0)return make('first-shot','3. 이제 첫 공격을 해보세요','‘한 차례 진행’을 눌러야 벌레가 들어와요. 자동 발사기가 자기 통로의 적을 공격하고, 살아남은 벌레가 왼쪽으로 한 칸 움직여요.','advance','한 차례 진행 · 첫 공격 보기','#advance');
  if(demo&&s.turn===1){const e=s.enemies[0];return make('observe','공격 결과를 확인하세요',e?`벌레의 남은 체력은 ${e.hp}이에요. 1번 자동 발사기는 차례마다 벌레 체력을 ${s.towers[0]?.damage??s.power} 줄여요. 한 차례 더 진행해 물리치고 톱니를 얻어보세요.`:'첫 벌레를 물리쳤어요. 벌레를 물리친 보상은 톱니 1개예요. 다음 침입을 살펴보세요.','advance','한 차례 더 진행','#advance');}
  if(demo&&!s.synced)return make('charge','4. 전체 공격을 한 번 충전해보세요','등불은 4초와 6초마다 켜져요. 처음 다시 함께 켜지는 12초를 입력하고 ‘충전’을 누르세요. 이 초는 수학 문제의 시간이며 게임의 진행 횟수와 별개예요.','charge','전체 공격 충전창으로 이동','#clock-panel');
  if(demo&&s.pulseReady&&s.enemies.length)return make('pulse','5. 충전한 달빛 전체 공격을 사용해보세요','이번 연습에서는 전체 공격 버튼을 눌러보세요. 모든 통로의 적에게 피해 6을 주고 살아남은 벌레를 한 차례 멈춰요. 밤마다 한 번뿐이므로 다음 밤부터는 적이 모였을 때 쓰는 게 좋아요.','pulse','달빛 전체 공격 사용 · 이번 밤 1회','#pulse');
  const incoming=[...s.enemies.map(e=>({lane:e.lane,priority:e.pos})),...level.spawns.filter(e=>e.at>=s.turn).map(e=>({lane:e.lane,priority:10+e.at-s.turn}))].sort((a,b)=>a.priority-b.priority);
  const open=incoming.find(e=>!s.towers[e.lane]);
  if(open&&s.coins>=2)return make('expand',`${open.lane+1}번 통로에도 방어가 필요해요`,`${open.lane+1}번 통로에 벌레가 있거나 곧 들어와요. 모은 톱니로 자동 발사기를 추가하세요. 같은 통로의 설치 버튼은 이후 ‘강화’로 바뀌어요.`,`buy:${open.lane}`,`${open.lane+1}번 자동 발사기 설치 · 톱니 2`,`[data-buy="${open.lane}"]`);
  if(s.hp<=4&&s.coins>=2)return make('repair','공방 체력을 회복할 수 있어요','수리는 톱니 2개로 체력을 3 회복해요. 방어 장치 강화와 수리 중 필요한 쪽을 선택하세요.','repair','공방 수리 · 톱니 2','#repair');
  if(s.pulseReady&&s.enemies.some(e=>e.boss))return make('boss','큰 벌레에게 전체 공격을 쓸 수 있어요','달빛 전체 공격은 모든 적에게 피해 6을 주고 살아남은 적을 한 차례 멈춰요. 큰 벌레가 있는 통로를 강화하는 것도 도움이 돼요.','pulse','달빛 전체 공격 사용','#pulse');
  return make('defend','침입 예고를 보고 한 차례씩 지켜보세요',`기본 자동 발사기는 한 번에 벌레 체력을 ${s.power} 줄여요. 벌레를 물리친 보상으로 빈 통로에 설치하거나 강화하세요. 자동 발사기는 자기 통로만 공격해요. 모든 침입이 끝날 때 체력이 1 이상이면 승리예요.`,'advance','한 차례 진행 · 발사기 공격','#advance');
}
