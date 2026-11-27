async function loadProjects(){
  const list=document.getElementById('project-list');
  const empty=document.getElementById('empty-state');
  const count=document.getElementById('project-count');
  try{
    const response=await fetch('projects.json',{cache:'no-store'});
    if(!response.ok) throw new Error('Could not load projects');
    const projects=await response.json();
    count.textContent=String(projects.length).padStart(2,'0')+' PROJECTS';
    if(!projects.length){empty.hidden=false;return;}
    list.innerHTML=projects.map((p,i)=>{
      const stacks=(p.stack||[]).map(s=>`<span class="stack-tag">${escapeHTML(s)}</span>`).join('');
      const image=p.image?`<img class="project-image" src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title)}" loading="lazy" onerror="this.outerHTML='<div class=&quot;image-placeholder&quot;>IMAGE UNAVAILABLE</div>'">`:'<div class="image-placeholder">IMAGE NOT ADDED</div>';
      const source=p.source?`<a class="source-link" href="${escapeAttr(p.source)}" target="_blank" rel="noopener noreferrer">VIEW SOURCE <span>↗</span></a>`:'';
      return `<article class="project-card"><div class="project-number">${String(i+1).padStart(2,'0')}</div><div class="project-copy"><div class="project-type">${escapeHTML(p.category||'ENGINEERING PROJECT')}</div><h3 class="project-title">${escapeHTML(p.title)}</h3><p class="project-description">${escapeHTML(p.description||'')}</p><div class="stack-label">TECHNOLOGY / STACK</div><div class="stack-list">${stacks}</div>${source}</div>${image}</article>`;
    }).join('');
  }catch(error){empty.hidden=false;empty.querySelector('h3').textContent='Projects could not be loaded.';empty.querySelector('p').textContent='Check that projects.json exists beside index.html.';}
}
function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function escapeAttr(value){return escapeHTML(value);}
loadProjects();
