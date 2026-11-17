const fs=require('node:fs'),path=require('node:path');
const root=__dirname,out=path.join(root,'dist');
const pages=['index.html','login.html','submissoes.html','meus-projetos.html','gestao.html','painel.html','biblioteca.html','projeto.html','mapa.html'];
const scripts=['app.js','carousel.js','data.js','enhancements.js','experience.js','project-extras.js','project-tools.js','theme.js','workflow-data.js','workflow.js'];
const assets=['style.css','logo-senac.png','senachub-logo-azul-v3.png',...scripts];
fs.mkdirSync(path.join(out,'assets','img'),{recursive:true});
for(const p of pages)fs.copyFileSync(path.join(root,p),path.join(out,p));
for(const asset of assets)fs.copyFileSync(path.join(root,'assets',asset),path.join(out,'assets',asset));
for(const file of fs.readdirSync(path.join(root,'assets','img')))if(/\.(svg|png|jpg|webp)$/i.test(file))fs.copyFileSync(path.join(root,'assets','img',file),path.join(out,'assets','img',file));
fs.writeFileSync(path.join(out,'.nojekyll'),'');
for(const p of pages){const html=fs.readFileSync(path.join(out,p),'utf8');for(const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g)){const target=match[1];if(/^(https?:|mailto:|blob:|data:)/.test(target))continue;if(!fs.existsSync(path.join(out,target)))throw new Error('Referência ausente em '+p+': '+target);}}
console.log('GitHub Pages: dist/ pronto, com '+pages.length+' páginas e somente os arquivos públicos necessários.');
