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
 const portraits={"ines":"ines.webp","arjun":"arjun.webp","freya":"freya.webp","nadia":"nadia.webp","elias":"elias.webp","solene":"solene.webp","amara":"amara.webp","soren":"soren.webp","livia":"livia.webp","meilin":"meilin.webp","isha":"isha.webp","lucien":"lucien.webp","samira":"samira.webp","ren":"ren.webp","amaka":"amaka.webp","diego":"diego.webp","hana":"hana.webp","youssef":"youssef.webp","alina":"alina.webp","kwame":"kwame.webp","general":"general.webp","eleaonor":"eleaonor.webp","brother":"brother.webp","miren":"miren.webp","selma":"selma.webp","tomas":"tomas.webp","nadir":"nadir.webp"};
 const portrait=portraits[item.id];
 if(portrait){
  const img=document.createElement("img");img.className="cast-real-portrait";img.alt="Portrait conceptuel de "+item.name;img.loading="lazy";img.decoding="async";img.src="./assets/cast/"+portrait;
  img.onerror=()=>{img.remove();art.classList.add("cast-awaiting-portrait");const msg=document.createElement("span");msg.className="cast-missing-image";msg.textContent="Portrait temporairement indisponible";art.append(msg)};
  art.append(img);
 }else{
  art.classList.add("cast-concept-art");
  // Illustration vectorielle originale, liée au rôle. Pas un portrait canonique.
  if(typeof window.DS_renderPose==="function"){
   const visual=document.createElement("div");visual.className="cast-vector-illustration";
   visual.innerHTML=window.DS_renderPose(item,category);
   art.append(visual);
  }else{
   const mark=document.createElement("span");mark.className="cast-illustration-mark";
   mark.textContent=item.name.split(" ").map(w=>w[0]||"").join("").slice(0,3);art.append(mark);
  }
 }
 const artLabel=document.createElement("small");artLabel.className="cast-art-note";artLabel.textContent=portrait?"PORTRAIT CINÉMATOGRAPHIQUE — CONCEPT":"ILLUSTRATION 2D — POSTURE / MÉTIER";art.append(artLabel);
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
