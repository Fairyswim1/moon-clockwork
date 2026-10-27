export const campaign=[
 {title:'공방의 첫 밤',rods:[12,18],periods:[4,6],count:5,gap:2,boss:0},
 {title:'세 갈래 침입',rods:[16,24],periods:[6,8],count:7,gap:2,boss:0},
 {title:'갑옷을 두른 손님',rods:[18,30],periods:[3,5],count:8,gap:2,boss:12},
 {title:'톱니의 폭주',rods:[24,36],periods:[4,10],count:9,gap:1,boss:14},
 {title:'세 금속의 합금',rods:[18,30,42],periods:[4,6,9],count:10,gap:1,boss:16},
 {title:'서로소의 반격',rods:[8,15],periods:[5,7],count:10,gap:1,boss:18},
 {title:'자정의 포위',rods:[24,40,56],periods:[6,10,15],count:12,gap:1,boss:20},
 {title:'달을 삼키는 왕',rods:[30,45,60],periods:[8,12,18],count:14,gap:1,boss:26}
].map((x,i)=>({...x,id:i+1,spawns:Array.from({length:x.count},(_,j)=>({at:j*x.gap,lane:(j+i)%3,hp:j===x.count-1&&x.boss?x.boss:(j%4===3?7:4),boss:!!(j===x.count-1&&x.boss)}))}));
