(function(root){
const themes=['Inteligência artificial','Saúde','Sustentabilidade','Internet das coisas','Gestão e negócios','Segurança digital','Educação','Desenvolvimento web'];
function topics(p){if(p.themes?.length)return [...new Set(p.themes)];const t=(p.title+' '+p.desc+' '+p.tag).toLowerCase();const out=[];if(/\bia\b|inteligência|modelo|computacional/.test(t))out.push(themes[0]);if(/saúde|clínic|laudo|venos|radiológ/.test(t))out.push(themes[1]);if(/reaproveit|sustent|feira|produtor|rebanho/.test(t))out.push(themes[2]);if(/seguran|vulnerab/.test(t))out.push(themes[5]);if(/gestão|chamado|suporte/.test(t))out.push(themes[4]);return out.length?out:['Tecnologia aplicada'];}
function date(p){const n=Date.parse(p.createdAt||'');if(Number.isFinite(n))return n;if(p.id>1e12)return p.id;return Date.UTC(Number(p.year)||2026,0,1)+Number(p.id||0);}
function relevance(p){return Number(p.likes||0)+(p.following?3:0)+(p.status==='Concluído'?2:0);}
function sort(list,mode='recent'){return [...list].sort((a,b)=>mode==='oldest'?date(a)-date(b):mode==='liked'?Number(b.likes||0)-Number(a.likes||0)||date(b)-date(a):mode==='relevant'?relevance(b)-relevance(a)||date(b)-date(a):date(b)-date(a));}
function counts(list){const map=new Map();list.filter(p=>p.published).forEach(p=>topics(p).forEach(t=>map.set(t,(map.get(t)||0)+1)));return [...map].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));}
const api={themes,topics,sort,counts,relevance};root.ProjectTools=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
