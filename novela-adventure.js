/* DIVINE SHADOW | Aventure narrative v1.
 * Campagne exploratoire et indépendante du canon, sans moteur externe. */
(() => {
"use strict";
const D=window.DS_ADVENTURE_DATA;
if(!D) return;
const KEY="divine-shadow-adventure-v1";
const $=id=>document.getElementById(id);
const initial=mode=>({
 version:1,mode,chapter:0,place:"balcony",health:100,energy:100,
 relations:{maileiz:0,aether:0,seraphyra:0,citizens:0,council:0},
 flags:[],evidence:[],inventory:["Sceau de passage"],clock:0,journey:0,
 combat:null,logs:[],ending:null,sideQuest:0,awareness:0,
 placeVisits:{}, lastEvent:"La soirée commence au palais. Un messager annonce qu'une page manque aux archives."
});
let S;try{S=JSON.parse(localStorage.getItem(KEY)||"null")}catch{S=null}
if(!S || S.version!==1 || !D.chapters[S.chapter] || !D.places[S.place]) S=initial(null);
const has=f=>S.flags.includes(f);
const flag=f=>{if(!has(f))S.flags.push(f)};
const setRel=(key,value)=>{S.relations[key]=Math.max(-6,Math.min(6,(S.relations[key]||0)+value))};
const note=(message)=>{S.lastEvent=message;S.logs.unshift("Jour "+(1+Math.floor(S.clock/8))+" • "+message);S.logs=S.logs.slice(0,80)};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}};
const button=(label,detail,callback,disabled=false)=>{
 const b=document.createElement("button");b.type="button";b.className="adventure-action";
 const top=document.createElement("strong");top.textContent=label;b.append(top);
 if(detail){const small=document.createElement("small");small.textContent=detail;b.append(small)}
 b.disabled=disabled;b.addEventListener("click",callback);return b;
};
function start(mode){S=initial(mode);note("Mode "+(mode==="ruthless"?"IMPITOYABLE":"HISTOIRE")+" activé. CHAYAH entre dans l'intrigue.");render()}
function progress(){
 const first=S.chapter===0;
 return first?{need:2,found:S.evidence.filter(x=>["registre","messager","pacte"].includes(x)).length,foe:has("gateResolved")}:
 {need:2,found:S.evidence.filter(x=>["analyse","ordre","sigil"].includes(x)).length,foe:has("captainResolved")};
}
function canFinish(){const p=progress();return p.found>=p.need&&p.foe}
function showMessage(message,cost=0){if(cost)S.clock+=cost;note(message);render()}
function discover(id,message){
 if(!S.evidence.includes(id)){S.evidence.push(id);S.inventory.push("Indice : "+id);note(message)}
 else note("Cette preuve a déjà été consignée.");
 S.clock++;render();
}
function meet(person){
 const npc=D.npcs[person],actions=[];
 const base=npc.intro+" • "+npc.status+".";
 if(person==="general"){
  if(S.chapter===0)actions.push(button("Organiser la défense avec le Général","Les gardes disposent d'un plan de repli.",()=>{flag("defenses");setRel("citizens",1);showMessage("Le Général fait évacuer les civils proches de la porte.",1)}));
  else actions.push(button("Demander des renforts","La protection civile gagne en priorité.",()=>{flag("reinforcements");setRel("citizens",1);showMessage("Le Général promet des renforts au quartier menacé.",1)}));
 }else if(person==="eleaonor"){
  actions.push(button("Présenter les preuves à ÉLÉAONOR","Le Conseil apprécie une enquête transparente.",()=>{if(S.evidence.length){flag("councilTrust");setRel("council",2);showMessage("ÉLÉAONOR accepte d'ouvrir une commission d'enquête.",1)}else showMessage("ÉLÉAONOR refuse d'accuser sans document.",1)}));
 }else if(person==="brother"){
  actions.push(button("Questionner le frère sur les pactes","Le mystère reste entier, mais un indice peut émerger.",()=>discover("sigil","Un sceau étranger a été retrouvé au sanctuaire. Son origine n'est pas encore prouvée.")));
  actions.push(button("Refuser un pacte suspect","Préserver son indépendance.",()=>{flag("refusedPact");setRel("aether",1);showMessage("CHAYAH refuse de promettre quoi que ce soit à une entité inconnue.",1)}));
 }else if(person==="innkeeper"){
  actions.push(button("Interroger les habitués","Écouter des témoins sans révéler leurs noms.",()=>{setRel("citizens",1);showMessage("MIREN rapporte des déplacements nocturnes près des anciennes portes.",1)}));
 }else if(person==="healer"){
  actions.push(button("Protéger les patients","Consomme une partie des provisions et évite des blessures.",()=>{flag("patientsSafe");setRel("citizens",2);S.health=Math.min(100,S.health+15);showMessage("SELMA soigne les blessés. Le dispensaire reste ouvert.",1)}));
  actions.push(button("Recevoir des soins","Restaurer 25 PV, sans dépasser 100.",()=>{S.health=Math.min(100,S.health+25);showMessage("SELMA traite les plaies et l'épuisement de CHAYAH.",1)}));
 }else if(person==="courier"){
  actions.push(button("Écouter le messager","Obtenir un indice de la ville.",()=>discover("messager","TOMAS signale un chariot portant un sceau brisé près des remparts.")));
 }else if(person==="archivist"){
  actions.push(button("Examiner le registre municipal","Récupérer une pièce vérifiable.",()=>discover("registre","NADIR révèle qu'un registre a été modifié durant la réception.")));
 }
 return {title:npc.name,description:base,actions};
}
function dialogue(id){
 const scenes={
  maileiz:()=>({title:"MAILEIZ • LE BALCON",description:"« Je suis mortelle, CHAYAH. Ton hésitation a un prix pour moi. » Elle attend une réponse, mais sa liberté lui appartient.",actions:[
   button("Répondre avec sincérité","Ne rien promettre d'impossible.",()=>{flag("honest");setRel("maileiz",2);showMessage("MAILEIZ entend l'aveu, mais décide seule de ce qu'elle fera.",1)}),
   button("Demander du temps","Les sentiments demeurent, la confiance peut souffrir.",()=>{flag("hesitation");setRel("maileiz",-1);showMessage("MAILEIZ refuse d'attendre indéfiniment.",1)})
  ]}),
  aether:()=>({title:"AETHER • LES ARCHIVES",description:"« Les documents valent plus que les rumeurs. Je t'aiderai comme ami, pas comme subordonné. »",actions:[
   button("Enquêter ensemble","AETHER apporte son analyse.",()=>{flag("withAether");setRel("aether",2);discover("pacte","AETHER isole une anomalie dans les sceaux du vieux pacte.")}),
   button("Garder ses propres conclusions","L'amitié reste libre, mais le dossier ralentit.",()=>{setRel("aether",-1);showMessage("AETHER te laisse conduire ta propre enquête.",1)})
  ]}),
  seraphyra:()=>({title:"SERAPHYRA • LES APPARENCES",description:"« Les cérémonies sont des lieux où l'on apprend à ne pas dire ce que l'on pense. » Elle ne révèle rien de ses sentiments.",actions:[
   button("Écouter sans la juger","Un dialogue difficile est possible.",()=>{setRel("seraphyra",1);showMessage("SERAPHYRA reste réservée, mais ne ferme pas la conversation.",1)}),
   button("L'interroger frontalement","La tension monte à la cour.",()=>{setRel("seraphyra",-2);setRel("council",-1);showMessage("SERAPHYRA met fin à l'entretien sans révéler ses secrets.",1)})
  ]}),
  orvann:()=>({title:"ORVANN • LE LABORATOIRE",description:"ORVANN affirme pouvoir soigner les blessures que les dieux négligent, mais ses expériences sont opaques.",actions:[
   button("Examiner ses résultats","Collecter une preuve sans conclure à sa culpabilité.",()=>discover("analyse","Une trace anormale apparaît dans le sérum d'ORVANN ; rien ne prouve une intention criminelle.")),
   button("Refuser sa proposition secrète","Préserver la sécurité des patients.",()=>{flag("orvannRefused");setRel("citizens",1);showMessage("CHAYAH exige un protocole ouvert avant toute expérience.",1)})
  ]})
 };
 return scenes[id]?.();
}
function enterCombat(enemyId,event){
 const e=D.enemies[enemyId];if(!e)return;
 S.combat={id:enemyId,hp:e.hp,turn:1,guard:false,dodge:false,weak:0,log:"Un ennemi surgit. Position : mi-distance. CHAYAH choisit son approche.",event};
 note("RENCONTRE HOSTILE : "+e.name+".");render();
}
function endCombat(outcome){
 const c=S.combat;
 if(!c)return;
 const id=c.id;S.combat=null;
 if(id==="raider"){flag("gateResolved");if(outcome==="flee")flag("gateThreat");else flag("gateProtected")}
 if(id==="captain"){flag("captainResolved");if(outcome==="flee")flag("captainEscaped")}
 if(id==="shade"){flag("shadeResolved");if(outcome==="flee")flag("shadeLoose")}
 if(outcome==="win"){setRel("citizens",1);note("L'ennemi a été repoussé. Les civils proches respirent enfin.")}
 else if(outcome==="talk"){setRel("council",1);note("L'adversaire a reculé après négociation. Il conserve son libre arbitre.")}
 else {setRel("citizens",-2);note("Retraite : la zone reste menacée. Les conséquences seront visibles.")}
 render();
}
function enemyTurn(guard,dodge,weak){
 if(!S.combat)return;
 let c=S.combat,e=D.enemies[c.id];
 if(c.hp<=0){endCombat("win");return}
 if(dodge){c.log="VOID STEP : l'adversaire frappe dans le vide.";c.turn++;render();return}
 const base=Math.max(1,e.damage-Math.min(8,weak*4));
 const damage=guard?Math.max(1,Math.floor(base*.25)):base;
 S.health=Math.max(0,S.health-damage);
 c.log=e.name+" inflige "+damage+" PV. "+(weak?"Le sceau atténue son attaque.":"");
 if(c.weak>0)c.weak--;
 c.turn++;
 if(S.health<=0){
   if(S.mode==="ruthless"){flag("majorInjury");flag("casualties");S.ending="defeat";note("CHAYAH est neutralisé ; l'attaque entraîne des pertes civiles dans cette continuité.");S.combat=null;render();return}
   S.health=35;S.energy=25;flag("wounded");note("Mode Histoire : CHAYAH est secouru et reprend des forces. La défaite laisse des conséquences.");
   endCombat("flee");return;
 }
 render();
}
function fight(ability){
 const c=S.combat;if(!c)return;
 const e=D.enemies[c.id],cost=D.abilities.find(a=>a.id===ability)?.cost||0;
 if(S.energy<cost){c.log="Énergie insuffisante pour cette compétence.";render();return}
 S.energy-=cost;S.clock++;
 let guard=false,dodge=false,damage=0,weak=c.weak;
 if(ability==="strike"){damage=18+(c.turn%5);S.energy=Math.min(100,S.energy+5)}
 if(ability==="void"){damage=27;dodge=true}
 if(ability==="seal"){damage=18;c.weak=2}
 if(ability==="guard"){guard=true;S.energy=Math.min(100,S.energy+10)}
 if(ability==="flee"){endCombat("flee");return}
 if(ability==="talk"){
   if(e.name==="Ombre des Serments"){c.log="L'ombre ne négocie pas avec les vivants.";enemyTurn(false,false,weak);return}
   const threshold=c.hp<=Math.ceil(e.hp*.55)||has("defenses")||has("withAether");
   if(threshold){endCombat("talk");return}
   c.log="L'adversaire refuse : son ordre de mission l'emporte sur la sommation.";enemyTurn(false,false,weak);return;
 }
 c.hp=Math.max(0,c.hp-Math.max(0,damage-e.armor));
 c.log="CHAYAH utilise "+D.abilities.find(a=>a.id===ability).name+" : "+Math.max(0,damage-e.armor)+" dégâts.";
 if(c.hp<=0){endCombat("win");return}
 enemyTurn(guard,dodge,weak);
}
function explore(place){
 if(S.combat||S.ending)return;
 if(!D.chapters[S.chapter].locations.includes(place)){note("Ce passage appartient à un autre chapitre.");render();return}
 if(place===S.place){render();return}
 S.place=place;S.clock++;
 S.journey++;
 S.placeVisits[place]=(S.placeVisits[place]||0)+1;
 const encounter=(place==="gate"&&!has("gateResolved")&&S.chapter===0)?"raider":
 (place==="ruins"&&!has("captainResolved")&&S.chapter===1)?"captain":
 (place==="sanctuary"&&!has("shadeResolved")&&S.chapter===1)?"shade":null;
 if(encounter){enterCombat(encounter,"scripted");return}
 if(S.journey>3&&S.journey%5===0&&!has("randomEvent"+S.journey)){
   flag("randomEvent"+S.journey);
   if(Math.random()<.44){enterCombat("raider","patrol");return}
   note("Une patrouille passe sans t'apercevoir. Rencontre évitée.");
 }else note("CHAYAH arrive : "+D.places[place].name+".");
 render();
}
function actions(){
 const place=S.place,result=[];
 const push=(label,hint,fn,disabled=false)=>result.push(button(label,hint,fn,disabled));
 if(place==="balcony"){push("Parler à MAILEIZ","Un choix romantique peut affecter leur relation.",()=>modal(dialogue("maileiz")))}
 if(place==="archives"){
  push("Parler à AETHER","Amitié, autonomie et preuves.",()=>modal(dialogue("aether")));
  push("Consulter NADIR, archiviste municipal","Un civil détient un document important.",()=>modal(meet("archivist")));
 }
 if(place==="gallery"){push("Rencontrer SERAPHYRA","Une conversation aux non-dits.",()=>modal(dialogue("seraphyra")));push("Interroger MIREN","Une aubergiste peut rapporter des rumeurs.",()=>modal(meet("innkeeper")))}
 if(place==="gate"){push("Rencontrer le Général","Coordonner la défense.",()=>modal(meet("general")));push("Parler à TOMAS","Interroger un messager important.",()=>modal(meet("courier")))}
 if(place==="council"){push("Consulter ÉLÉAONOR","Réception du dossier et enquête.",()=>modal(meet("eleaonor")))}
 if(place==="laboratory"){push("Questionner ORVANN","Un savant aux méthodes controversées.",()=>modal(dialogue("orvann")));push("Rencontrer SELMA, médecin de quartier","Soigner les blessés.",()=>modal(meet("healer")))}
 if(place==="ruins"){push("Fouiller le camp","Chercher un ordre signé.",()=>discover("ordre","CHAYAH trouve un ordre de déplacement portant le sceau des Cendres."));push("Protéger des voyageurs","Un groupe de civils demande protection.",()=>{flag("travelersSafe");setRel("citizens",2);showMessage("La route est sécurisée pour les voyageurs.",1)})}
 if(place==="sanctuary"){push("Rencontrer le frère de CHAYAH","Pactes, entités et silences.",()=>modal(meet("brother")))}
 if(S.chapter===0&&place==="council")push("Conclure l'acte I","Deux indices et la menace résolue sont nécessaires.",()=>advance(),!canFinish());
 if(S.chapter===1&&place==="sanctuary")push("Clore le premier arc","Deux preuves et la confrontation des Cendres sont nécessaires.",()=>advance(),!canFinish());
 push("Se reposer et reprendre son souffle","Récupère 10 PV et 12 énergie, avance le temps.",()=>{S.health=Math.min(100,S.health+10);S.energy=Math.min(100,S.energy+12);showMessage("CHAYAH prend un moment de repos. Le temps continue de passer.",1)});
 return result;
}
function advance(){
 if(!canFinish())return;
 if(S.chapter===0){
   flag("chapterOneDone");S.chapter=1;S.place="archives";S.health=Math.min(100,S.health+15);S.energy=100;
   note("ACTE I TERMINÉ : l'enquête révèle la piste des Cendres. La deuxième intrigue s'ouvre.");
   render();return;
 }
 const difficult=S.mode==="ruthless"&&has("casualties");
 S.ending=difficult?"losses":has("councilTrust")&&has("withAether")?"alliance":has("captainEscaped")?"shadows":"uncertain";
 note("L'arc pilote s'achève. La ville en portera les conséquences lors d'une prochaine saison.");
 render();
}
function modal(scene){
 if(!scene)return;
 const modal=$("encounter-modal");const title=$("encounter-title"),desc=$("encounter-text"),opts=$("encounter-options");
 title.textContent=scene.title;desc.textContent=scene.description;opts.replaceChildren();
 for(const b of scene.actions){b.addEventListener("click",()=>{modal.hidden=true},{once:true});opts.append(b)}
 modal.hidden=false;$("encounter-close").focus();
}
function closeModal(){$("encounter-modal").hidden=true}
function render(){
 if(!S.mode){$("mode-setup").hidden=false;$("game-root").hidden=true;save();return}
 $("mode-setup").hidden=true;$("game-root").hidden=false;
 const chapter=D.chapters[S.chapter],place=D.places[S.place],p=progress();
 $("chapter-title").textContent="ACTE "+chapter.number+" — "+chapter.title;
 $("chapter-desc").textContent=chapter.introduction;
 $("current-place").textContent=place.name;
 $("place-desc").textContent=place.desc;
 $("story-event").textContent=S.lastEvent;
 $("mode-name").textContent=S.mode==="ruthless"?"IMPITOYABLE":"HISTOIRE";
 $("hp").textContent=S.health;$("energy").textContent=S.energy;
 $("hp-fill").style.width=S.health+"%";$("energy-fill").style.width=S.energy+"%";
 $("city-state").textContent=(S.relations.citizens||0)>0?"SOUTIEN":"FRAGILE";
 $("chapter-objectives").replaceChildren(...chapter.objectives.map((title,i)=>{
  const li=document.createElement("li");
  li.textContent=(i===0?(p.found>=2?"✓ ":"◻ "):i===1?(p.foe?"✓ ":"◻ "):"◻ ")+title;
  return li;
 }));
 $("evidence-count").textContent=p.found+" / "+p.need;
 const map=$("world-locations");map.replaceChildren();
 for(const id of chapter.locations){const item=D.places[id];map.append(button(item.name,id===S.place?"Position actuelle":"Déplacement • peut provoquer une rencontre",()=>explore(id),id===S.place||!!S.combat||!!S.ending))}
 const interact=$("world-actions");interact.replaceChildren(...actions());
 const enemy=$("combat-panel");enemy.hidden=!S.combat;
 $("exploration-panel").hidden=!!S.combat;
 if(S.combat){
   const c=S.combat,e=D.enemies[c.id];
   $("enemy-name").textContent=e.name;$("enemy-desc").textContent=e.desc;
   $("enemy-hp").textContent=c.hp+" / "+e.hp;$("enemy-hp-fill").style.width=(c.hp/e.hp*100)+"%";
   $("combat-turn").textContent="TOUR "+c.turn;$("combat-log").textContent=c.log;
   const options=$("combat-actions");options.replaceChildren();
   for(const skill of D.abilities)options.append(button(skill.name,skill.hint,()=>fight(skill.id),S.energy<skill.cost));
 }
 const clues=$("clue-list");clues.replaceChildren();
 for(const clue of S.evidence){const li=document.createElement("li");li.textContent=clue;clues.append(li)}
 if(!S.evidence.length){const li=document.createElement("li");li.textContent="Aucune preuve pour l'instant.";clues.append(li)}
 const statuses=$("relation-list");statuses.replaceChildren();
 for(const [name,value] of Object.entries(S.relations)){const li=document.createElement("li");li.textContent=name.toUpperCase()+" : "+(value>0?"+":"")+value;statuses.append(li)}
 const log=$("adventure-journal");log.replaceChildren();
 for(const event of S.logs.slice(0,12)){const li=document.createElement("li");li.textContent=event;log.append(li)}
 const finale=$("adventure-ending");finale.hidden=!S.ending;
 if(S.ending){
  const variations={
   alliance:["LA CITÉ TIENT","La confiance avec AETHER et le Conseil permet de préserver une alliance fragile. Les pactes demeurent mystérieux."],
   losses:["LES CENDRES DE LA VILLE","La victoire n'efface pas les pertes subies. Les habitants exigent des comptes."],
   shadows:["L'ENNEMI RECULE","La menace demeure : un chef a fui avec une partie du dossier."],
   uncertain:["LA VÉRITÉ INCOMPLÈTE","Les indices éclairent une partie des événements, mais les motivations des protagonistes restent ouvertes."],
   defeat:["LA NUIT TOMBE","CHAYAH est neutralisé dans cette continuité exploratoire. Le mode impitoyable met fin à cette route."]
  };
  const [title,desc]=variations[S.ending];$("ending-title").textContent=title;$("ending-text").textContent=desc;
 }
 save();
}
$("history-mode").addEventListener("click",()=>start("story"));
$("ruthless-mode").addEventListener("click",()=>start("ruthless"));
$("reset-adventure").addEventListener("click",()=>{if(confirm("Effacer cette partie et revenir au choix de difficulté ?")){S=initial(null);render()}});
$("encounter-close").addEventListener("click",closeModal);
$("encounter-modal").addEventListener("click",e=>{if(e.target===$("encounter-modal"))closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("journal-button").addEventListener("click",()=>{const panel=$("journal-panel");panel.hidden=!panel.hidden;$("journal-button").setAttribute("aria-expanded",String(!panel.hidden))});
$("menu").addEventListener("click",()=>{const nav=$("links");const open=nav.classList.toggle("open");$("menu").setAttribute("aria-expanded",String(open))});
render();
})();