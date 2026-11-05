/* Galerie des 40 habitants de DIVINE SHADOW. Un portrait = une vignette de la planche officielle. */
(()=>{
 "use strict";
 const data=window.DS_POPULATION,grid=document.getElementById("population-grid"),filter=document.getElementById("population-filters"),counter=document.getElementById("population-count");
 if(!Array.isArray(data)||!grid||!filter)return;
 const groups=["Tous","Afrique","Monde arabe","Hispaniques / Latinos","Asie","Europe","Peuples fantastiques"];
 let current="Tous";
 const picture=(person)=>{
  const wrap=document.createElement("div");wrap.className="population-art";
  const portrait=document.createElement("div");portrait.className="population-portrait";portrait.setAttribute("role","img");
  portrait.setAttribute("aria-label","Portrait de "+person.name+", "+person.origin+", "+person.role);
  const col=person.portraitIndex%10,row=Math.floor(person.portraitIndex/10);
  portrait.dataset.atlasRow=String(row);
  portrait.style.backgroundPosition=(col/9*100).toFixed(4)+"% "+(row/3*100).toFixed(4)+"%";
  wrap.append(portrait);return wrap;
 };
 const build=(person)=>{
  const el=document.createElement("article");
  el.className="population-card"+(person.featured?" population-featured":"");
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
  counter.textContent=visible.length+" habitants présentés"+(current==="Tous"?" · population d'origine":" · "+current);
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