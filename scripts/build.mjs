import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const assets={};
for(const name of ['index.html','giao-dien.css','ung-dung.js','qr-diem-danh.js','qr-diem-danh.css','vendor/qrcode.js','vendor/html5-qrcode.min.js']){
  assets['/'+name]={content:fs.readFileSync(path.join(root,'dist',name),'utf8'),type:name.endsWith('.html')?'text/html;charset=utf-8':name.endsWith('.css')?'text/css;charset=utf-8':'text/javascript;charset=utf-8'};
}
const members=JSON.parse(fs.readFileSync('server/members.json','utf8'));
const worker=fs.readFileSync('server/worker.mjs','utf8');
fs.mkdirSync('dist/server',{recursive:true});
fs.mkdirSync('dist/.openai',{recursive:true});
fs.writeFileSync('dist/server/index.js','const STATIC_ASSETS='+JSON.stringify(assets)+';\nconst MEMBER_NAMES='+JSON.stringify(members)+';\n'+worker);
fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
console.log('Built QR/GPS worker with '+members.length+' demo identities.');
