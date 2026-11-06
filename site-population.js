/* Galerie des 40 habitants de DIVINE SHADOW. Un portrait = une vignette de la planche officielle. */
(()=>{
 "use strict";
 const data=window.DS_POPULATION,grid=document.getElementById("population-grid"),filter=document.getElementById("population-filters"),counter=document.getElementById("population-count");
 if(!Array.isArray(data)||!grid||!filter)return;
 const groups=["Tous","Afrique","Monde arabe","Hispaniques / Latinos","Asie","Europe","Peuples fantastiques"];
 let current="Tous";
 const picture=(person)=>{
  const wrap=document.createElement("div");wrap.className="population-art";
  const portrait=document.createElement("img");
  portrait.className="population-portrait population-photo";
  portrait.alt="Portrait de "+person.name+", "+person.origin+", "+person.role;
  portrait.loading="lazy";
  portrait.decoding="async";
  const index=Number(person.portraitIndex);
  if(!Number.isInteger(index)||index<0||index>39)return wrap;
  // Portraits nouvellement illustrés pour les 12 premiers habitants : fichier individuel
  // et identité strictement liée à portraitIndex; les autres gardent leur source existante.
  const hasFreshPhoto=index<12;
  const file=String(index).padStart(2,"0")+".webp";
  portrait.src="./assets/population/"+(hasFreshPhoto?"new/":"hd/")+"portrait-"+file;
  portrait.dataset.fresh=String(hasFreshPhoto);
  portrait.onerror=()=>{
    if(portrait.dataset.fresh==="true"&&!portrait.dataset.oldSourceTried){
      portrait.dataset.oldSourceTried="true";
      portrait.src="./assets/population/hd/portrait-"+String(index).padStart(2,"0")+".webp";
      return;
    }
    portrait.remove();
    const fallback=document.createElement("div");
    fallback.className="population-portrait population-atlas-fallback";
    fallback.setAttribute("role","img");
    fallback.setAttribute("aria-label",portrait.alt);
    const col=index%10,row=Math.floor(index/10);
    fallback.dataset.atlasRow=String(row);
    fallback.style.backgroundPosition=(col/9*100).toFixed(4)+"% "+(row/3*100).toFixed(4)+"%";
    wrap.append(fallback);
  };
  wrap.append(portrait);return wrap;
 };
 const build=(person)=>{
  const el=document.createElement("article");
  el.className="population-card"+(person.featured?" population-featured":"")+(person.portraitIndex<12?" population-new-photo":"");
  const art=picture(person);
  const body=document.createElement("div");body.className="population-copy";
  const origin=document.createElement("span");origin.className="population-origin";origin.textContent=person.origin+" · "+person.species;
  const name=document.createElement("h3");name.textContent=person.name;
  const profession=document.createElement("strong");profession.textContent=person.role;
  const text=document.createElement("p");text.textContent=person.description;
  body.append(origin,name,profession,text);
  if(person.featured){
   const note=document.createElement("div");note.className="population-marin-note";note.textContent="PÈRE ADOPTIF DE CHAYAH · LÉGATAIRE DE LA MÈRE";
   body.append(note);
  }
  el.append(art,body);return el;
 };
 function render(){
  grid.replaceChildren();
  const visible=current==="Tous"?data:data.filter(x=>x.group===current);
  const fragment=document.createDocumentFragment();
  visible.forEach(x=>fragment.append(build(x)));
  grid.append(fragment);
  counter.textContent=visible.length+" habitants présentés"+(current==="Tous"?" · 12 nouveaux portraits photo / 40 habitants":" · "+current);
  for(const button of filter.querySelectorAll("button")){
   const active=button.dataset.peopleGroup===current;button.setAttribute("aria-pressed",String(active));button.classList.toggle("selected",active);
  }
 }
 groups.forEach(name=>{
  const btn=document.createElement("button");
  btn.type="button";btn.dataset.peopleGroup=name;btn.textContent=name;
  btn.addEventListener("click",()=>{current=name;render()});
  filter.append(btn);
 });
 render();
})();