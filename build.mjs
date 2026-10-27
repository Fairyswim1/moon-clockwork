import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const f of ['index.html','battle.css','play.mjs','battle.mjs','campaign.mjs','engine.mjs'])await copyFile(f,`dist/${f}`);
await cp('assets','dist/assets',{recursive:true});
console.log('Static game built in dist/');

const {execFileSync}=await import('node:child_process');
let commit=process.env.VERCEL_GIT_COMMIT_SHA||null; if(!commit)try{commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();}catch{}
await (await import('node:fs/promises')).writeFile('dist/build-info.json',JSON.stringify({id:"moon-clockwork",commit}));
