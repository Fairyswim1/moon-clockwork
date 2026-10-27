function natural(n){if(!Number.isSafeInteger(n)||n<1||n>10000)throw new RangeError('Expected a small positive integer');}
export function factors(n){natural(n);const result={};for(let p=2;p*p<=n;p++){while(n%p===0){result[p]=(result[p]||0)+1;n/=p;}}if(n>1)result[n]=(result[n]||0)+1;return result;}
export function gcd(a,b){natural(a);natural(b);while(b)[a,b]=[b,a%b];return a;}
export function target(level){if(!['gcd','lcm'].includes(level.mode)||level.values.length<2)throw Error('Invalid level');level.values.forEach(natural);return level.values.reduce((a,b)=>level.mode==='gcd'?gcd(a,b):a/gcd(a,b)*b);}
export function judge(level,value){
 if(!Number.isSafeInteger(value)||value<1)return {ok:false,kind:'zero',message:level.mode==='lcm'?'0초는 출발 순간이에요. 0보다 큰 첫 만남을 찾아요.':'부품 길이는 1 이상의 자연수예요.'};
 const answer=target(level),match=level.values.every(n=>level.mode==='gcd'?n%value===0:value%n===0);
 if(!match)return {ok:false,kind:'mismatch',message:level.mode==='gcd'?'자투리가 남는 막대가 있어요. 모든 막대를 남김없이 나누어 보세요.':'아직 모든 등불이 함께 켜지지 않았어요. 각 주기의 배수를 찾아보세요.'};
 if(value!==answer)return {ok:false,kind:'extreme',message:level.mode==='gcd'?'남김없이 나누었어요! 하지만 더 긴 공통 부품을 만들 수 있어요.':'모두 켜졌지만 더 이른 만남이 있어요. 처음 함께 켜지는 때로 되돌려 보세요.'};
 return {ok:true,kind:'correct',message:level.mode==='gcd'?`가장 긴 공통 부품은 ${answer}칸! 최대공약수를 찾았어요.`:`처음 다시 만나는 순간은 ${answer}초! 최소공배수를 찾았어요.`};
}
export function award(previous,misses){return Math.max(previous||0,misses===0?3:misses<3?2:1);}
export function restore(raw,count){try{const x=JSON.parse(raw);return Array.from({length:count},(_,i)=>Number.isInteger(x?.[i])&&x[i]>=0&&x[i]<=3?x[i]:0);}catch{return Array(count).fill(0);}}
export function factorExplanation(level){const maps=level.values.map(factors),primes=[...new Set(maps.flatMap(x=>Object.keys(x)))].map(Number).sort((a,b)=>a-b);return primes.map(prime=>{const exponents=maps.map(x=>x[prime]||0);return {prime,exponents,selected:Math[level.mode==='gcd'?'min':'max'](...exponents)};});}
