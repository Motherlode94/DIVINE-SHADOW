/* Galerie du casting secondaire : entrées vérifiées dans le projet de Novela. */
(()=>{
"use strict";
const data=window.DS_CAST,host=document.getElementById("expanded-cast-grid"),filters=document.getElementById("expanded-cast-filters"),count=document.getElementById("expanded-cast-count");
if(!data||!host||!filters)return;
const categories=[
 {id:"allies",label:"20 alliés de CHAYAH",items:data.allies},
 {id:"civic",label:"7 figures de la ville",items:data.civic},
 {id:"enemy",label:"6 chefs et commanditaires",items:data.enemy}
];
let selected="allies";
function itemCard(item,category,index){
 const article=document.createElement("article");article.className="cast-item";article.dataset.category=category;
 const art=document.createElement("div");art.className="cast-item-art "+(category==="enemy"?"cast-enemy":category==="civic"?"cast-civic":"cast-ally");
 if(typeof window.DS_renderPose==="function"){
  art.innerHTML=window.DS_renderPose(item,category);
 }else{
  const fallback=document.createElement("p");fallback.textContent="Illustration en préparation";art.append(fallback);
 }
 const artLabel=document.createElement("small");artLabel.className="cast-art-note";
 artLabel.textContent="ILLUSTRATION DE POSTURE — CONCEPT";
 art.append(artLabel);
 const body=document.createElement("div");body.className="cast-item-body";
 const label=document.createElement("span");label.className="cast-item-meta";label.textContent=category==="enemy"?"COMMANDANT / CONSPIRATEUR":category==="civic"?"VIE DE LA CITÉ":"ALLIÉ / "+(item.entry?"ENTRÉE ÉP. "+String(item.entry).padStart(2,"0"):"NOVELA");
 const heading=document.createElement("h3");heading.textContent=item.name;
 const role=document.createElement("strong");role.textContent=item.role;
 const desc=document.createElement("p");desc.textContent=item.description;
 body.append(label,heading,role,desc);
 if(category==="allies"){const fate=document.createElement("span");fate.className="cast-story";fate.textContent="Destin à découvrir dans la Novela";body.append(fate)}
 article.append(art,body);return article;
}
function render(){
 host.replaceChildren();
 const active=categories.find(x=>x.id===selected);
 active.items.forEach((item,i)=>host.append(itemCard(item,selected,i)));
 count.textContent=active.items.length+" personnages présentés • "+active.label;
 [...filters.querySelectorAll("button")].forEach(b=>{const on=b.dataset.cast===selected;b.setAttribute("aria-pressed",String(on));b.classList.toggle("selected",on)});
}
categories.forEach(cat=>{
 const b=document.createElement("button");b.type="button";b.dataset.cast=cat.id;b.textContent=cat.label;b.addEventListener("click",()=>{selected=cat.id;render()});filters.append(b)
});
render();
})();
