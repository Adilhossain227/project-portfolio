const form=document.getElementById('project-form');
const fields=['title','category','description','stack','image','source'];
let projects=[];
let editingId=null;
const notice=document.getElementById('notice');

async function init(){
  try{const response=await fetch('projects.json',{cache:'no-store'});if(response.ok){const data=await response.json();if(Array.isArray(data))projects=data;}}
  catch(error){/* Opening the editor directly from a local file may block fetch. */}
  const draft=localStorage.getItem('adilPortfolioDraft');
  if(draft){try{projects=JSON.parse(draft);notice.textContent='Loaded your saved browser draft.';}catch(error){}}
  render();
}
function persist(){localStorage.setItem('adilPortfolioDraft',JSON.stringify(projects));}
function render(){
  const list=document.getElementById('admin-list');
  document.getElementById('item-count').textContent=String(projects.length).padStart(2,'0')+' ITEMS';
  if(!projects.length){list.innerHTML='<div class="list-empty">No projects added. Your project list will appear here.</div>';return;}
  list.innerHTML=projects.map(p=>`<div class="admin-item"><div><strong>${escapeHTML(p.title)}</strong><small>${escapeHTML(p.category||'ENGINEERING PROJECT')}</small></div><div class="item-actions"><button type="button" data-edit="${p.id}">EDIT</button><button type="button" data-delete="${p.id}">DELETE</button></div></div>`).join('');
}
function reset(){form.reset();editingId=null;document.getElementById('edit-id').value='';document.getElementById('form-mode').textContent='NEW PROJECT';document.getElementById('save-button').innerHTML='ADD PROJECT <span>↗</span>';}
form.addEventListener('submit',event=>{
  event.preventDefault();
  const project={id:editingId||String(Date.now()),title:document.getElementById('title').value.trim(),category:document.getElementById('category').value.trim(),description:document.getElementById('description').value.trim(),stack:document.getElementById('stack').value.split(',').map(s=>s.trim()).filter(Boolean),image:document.getElementById('image').value.trim(),source:document.getElementById('source').value.trim()};
  if(editingId){projects=projects.map(p=>p.id===editingId?project:p);notice.textContent='Project updated. Export JSON to publish your changes.';}else{projects.push(project);notice.textContent='Project added. Export JSON to publish your changes.';}
  persist();render();reset();
});
document.getElementById('reset-button').addEventListener('click',reset);
document.getElementById('admin-list').addEventListener('click',event=>{
  const edit=event.target.dataset.edit,del=event.target.dataset.delete;
  if(edit){const p=projects.find(item=>item.id===edit);if(!p)return;editingId=edit;fields.forEach(key=>{document.getElementById(key).value=key==='stack'?(p.stack||[]).join(', '):(p[key]||'');});document.getElementById('form-mode').textContent='EDIT PROJECT';document.getElementById('save-button').innerHTML='SAVE CHANGES <span>↗</span>';window.scrollTo({top:0,behavior:'smooth'});}
  if(del&&confirm('Delete this project from the current list?')){projects=projects.filter(p=>p.id!==del);persist();render();notice.textContent='Project deleted from this browser draft. Export JSON to publish the change.';if(editingId===del)reset();}
});
document.getElementById('export-button').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify(projects,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='projects.json';a.click();URL.revokeObjectURL(url);notice.textContent='Exported projects.json. Replace the existing file in your GitHub repository, then commit the change.';
});
document.getElementById('import-file').addEventListener('change',async event=>{
  const file=event.target.files[0];if(!file)return;
  try{const data=JSON.parse(await file.text());if(!Array.isArray(data))throw new Error('Expected a JSON array');projects=data;persist();render();reset();notice.textContent='Project data imported successfully. Export when ready to publish.';}
  catch(error){notice.textContent='Could not import this file. Please choose a valid projects.json file.';}
  event.target.value='';
});
function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
init();
