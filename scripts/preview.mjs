import http from 'node:http';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import worker from '../dist/server/index.js';
const db=new DatabaseSync(':memory:');
db.exec(fs.readFileSync('drizzle/0000_qr_attendance.sql','utf8'));
const env = {
  DB: {
    prepare(sql) {
      return {
        bind(...values) {
          const query = db.prepare(sql);
          return {
            async first() { return query.get(...values) || null; },
            async all() { return { results: query.all(...values) }; },
            async run() { return { meta: { changes: query.run(...values).changes } }; }
          };
        }
      };
    }
  }
};
http.createServer(async(req,res)=>{
 try{const chunks=[];for await(const c of req)chunks.push(c);const init={method:req.method,headers:req.headers};
 if(!['GET','HEAD'].includes(req.method))init.body=Buffer.concat(chunks);
 const response=await worker.fetch(new Request('http://127.0.0.1:8766'+req.url,init),env);
 res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch(e){console.error(e);res.writeHead(500);res.end('Preview error');}
}).listen(8766,'127.0.0.1',()=>console.log('Preview http://127.0.0.1:8766'));
