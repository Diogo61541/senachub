(function(root){
'use strict';
const labels={draft:'Rascunho',review:'Em revisão',changes:'Ajustes solicitados',approval:'Aguardando coordenação',published:'Publicado',rejected:'Recusado'};
function create(D){
function stage(p){return p.workflow|| (p.published?'published':'draft');}
function validate(p){const fields=[['title','Título'],['desc','Resumo'],['problem','Problema'],['solution','Solução'],['orientador','Orientador']];const missing=fields.filter(([key])=>!String(p[key]||'').trim()).map(([,label])=>label);if(!p.team?.length)missing.push('Equipe');return missing;}
function move(id,action,role,note=''){
const p=D.get(id);if(!p)throw Error('Projeto não encontrado.');
const current=stage(p),rules={submit:{from:['draft','changes','rejected'],role:'aluno',to:'review'},request:{from:['review'],role:'professor',to:'changes'},forward:{from:['review'],role:'professor',to:'approval'},return:{from:['approval'],role:'coordenacao',to:'changes'},reject:{from:['approval'],role:'coordenacao',to:'rejected'},publish:{from:['approval'],role:'coordenacao',to:'published'}};
const rule=rules[action];if(!rule||rule.role!==role||!rule.from.includes(current))throw Error('Esta ação não está disponível para este perfil e etapa.');
if(action==='submit'){const missing=validate(p);if(missing.length)throw Error('Complete antes de enviar: '+missing.join(', ')+'.');}
if(action==='reject'&&!note.trim())throw Error('Informe a justificativa da recusa.');
if(['request','return'].includes(action)&&!note.trim())throw Error('Descreva os ajustes necessários.');
const event={action,from:current,to:rule.to,role,note:note.trim().slice(0,3000),date:new Date().toISOString()};
return D.update(id,{workflow:rule.to,published:rule.to==='published',history:[...(p.history||[]),event]});
}
return {stage,validate,move,labels};
}
root.HubWorkflow={create,labels};
if(typeof module!=='undefined')module.exports=root.HubWorkflow;
})(typeof window!=='undefined'?window:globalThis);
