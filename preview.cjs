const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname;
http.createServer((req,res)=>{
 let file;try{file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));}catch{res.writeHead(400);return res.end();}
 if(file===root)file=path.join(root,'index.html');
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 const relative=path.relative(root,file).replaceAll('\\','/');
 if(!/^[a-z-]+\.html$/.test(relative)&&!/^assets\/[a-zA-Z0-9_./-]+\.(js|css|svg|png)$/.test(relative)){res.writeHead(404);return res.end();}
 res.setHeader('Cache-Control','no-cache');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Content-Type-Options','nosniff');
 fs.readFile(file,(err,body)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'html':'text/html; charset=utf-8','js':'text/javascript; charset=utf-8','css':'text/css','svg':'image/svg+xml','png':'image/png'})[path.extname(file).slice(1)]||'application/octet-stream');res.end(body);});
}).listen(4186,'127.0.0.1',()=>console.log('HUB: http://127.0.0.1:4186'));
