/* DIVINE SHADOW — moteur de novela. Sauvegarde locale, décisions et conséquences. */
(() => {
 "use strict";
 const book=window.DIVINE_NOVELA;
 if(!book || !Array.isArray(book.episodes)) return;
 const KEY="divine-shadow-non-dits-v2";
 const initial=()=>({episode:0,node:book.episodes[0].start,stats:{maileiz:0,aether:0,seraphyra:0,trust:0,court:0},flags:[],completed:[],log:[],history:[],finished:false});
 const el=id=>document.getElementById(id);
 let state;
 try{const loaded=JSON.parse(localStorage.getItem(KEY)||"null");state=loaded&&loaded.stats&&Number.isInteger(loaded.episode)&&book.episodes[loaded.episode]?.nodes[loaded.node]?{...initial(),...loaded}:initial()}catch{state=initial()}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}};
 const episode=()=>book.episodes[state.episode];
 const node=()=>episode().nodes[state.node];
 const clamp=n=>Math.max(-5,Math.min(5,n));
 const metricLabels={maileiz:"Proximité avec MAILEIZ",aether:"Confiance d'AETHER",seraphyra:"Ouverture avec SERAPHYRA",trust:"Franchise",court:"Tension à la cour"};
 const portraitFor=id=>book.actors[id]?.image?("./assets/"+encodeURIComponent(book.actors[id].image)):"";
 function snapshot(){return JSON.parse(JSON.stringify({...state,history:[]}))}
 function status(label){el("save-status").textContent=label;}
 function renderEpisodes(){
   document.querySelectorAll("[data-episode]").forEach((b,i)=>{
     const unlocked=i<=state.episode || state.completed.includes(book.episodes[i].id) || state.finished;
     b.disabled=!unlocked;
     b.setAttribute("aria-disabled",String(!unlocked));
     b.setAttribute("aria-current",String(i===state.episode));
     b.querySelector(".ep-state").textContent=state.completed.includes(book.episodes[i].id)?"TERMINÉ":i===state.episode?(state.finished?"TERMINÉ":"EN COURS"):unlocked?"ACCESSIBLE":"VERROUILLÉ";
   });
 }
 function renderStats(){
   const panel=el("story-stats");panel.replaceChildren();
   for(const [key,name] of Object.entries(metricLabels)){
     const value=state.stats[key]||0;
     const row=document.createElement("div");row.className="stat-row";
     const title=document.createElement("span");title.textContent=name;
     const score=document.createElement("strong");score.textContent=(value>0?"+":"")+value;
     const meter=document.createElement("div");meter.className="stat-meter";
     const fill=document.createElement("span");fill.style.width=(50+value*10)+"%";
     fill.className=value<0?"negative":"positive";meter.append(fill);
     row.append(title,score,meter);panel.append(row);
   }
 }
 function narrativeSummary(){
   const parts=[];
   if(state.flags.includes("aveu"))parts.push("CHAYAH a exprimé son amour sans engagement forcé.");
   else if(state.flags.includes("temps"))parts.push("CHAYAH a demandé du temps, sans garantir l'attente de MAILEIZ.");
   else if(state.flags.includes("fuite"))parts.push("L'esquive de CHAYAH a fragilisé leur dialogue.");
   if(state.flags.includes("enquete"))parts.push("CHAYAH et AETHER ont choisi une enquête discrète.");
   else if(state.flags.includes("alerte"))parts.push("La cour a été prévenue avant toute preuve décisive.");
   if(state.flags.includes("justice"))parts.push("Une enquête impartiale a été demandée.");
   else if(state.flags.includes("silence"))parts.push("Le silence a repoussé les interrogations.");
   else if(state.flags.includes("confrontation"))parts.push("La confrontation a intensifié les tensions.");
   return parts;
 }
 function ending(){
   const s=state.stats;
   if(s.court>=3) return {title:"LA COUR FISSURÉE",text:"Les relations restent possibles, mais les tensions sont désormais visibles. Le prochain acte pourrait transformer une rumeur en conflit ouvert."};
   if(s.trust>=3 && s.aether>=1) return {title:"LA VÉRITÉ D'ABORD",text:"Les personnages n'ont pas résolu tous leurs différends. Ils ont néanmoins préservé une méthode : écouter, vérifier et choisir sans imposer."};
   if(s.maileiz<=-2) return {title:"LES MOTS MANQUANTS",text:"L'amour n'a pas disparu, mais la distance s'est installée. MAILEIZ refuse de suspendre sa vie aux hésitations d'un dieu."};
   return {title:"L'ÉQUILIBRE FRAGILE",text:"Un avenir reste ouvert entre sentiments, loyautés et secrets. Rien n'est acquis, et aucun personnage n'a perdu sa liberté."};
 }
 function showFinal(){
   const outcome=ending();el("final-heading").textContent=outcome.title;el("final-text").textContent=outcome.text;
   const list=el("final-log");list.replaceChildren();
   narrativeSummary().forEach(part=>{const li=document.createElement("li");li.textContent=part;list.append(li)});
   el("final-screen").hidden=false;
 }
 function contextualDialogue(id,original){
   if(id==="p_intro"){
     if(state.flags.includes("fuite"))return "La réception a laissé MAILEIZ blessée par l'esquive de CHAYAH. AETHER l'a remarqué. Il attend CHAYAH près des archives, où se joue un autre dilemme.";
     if(state.flags.includes("aveu"))return "Après la confession sincère de CHAYAH, AETHER l'attend aux archives. Un aveu ne règle pas tout, et leur conversation promet d'être franche.";
   }
   if(id==="p_reproche"){
     if(state.flags.includes("fuite"))return "« Tu as fui sa question avec une plaisanterie. Tu sais pourtant qu'elle est mortelle : tu ne peux pas présumer qu'elle attendra toujours. »";
     if(state.flags.includes("temps"))return "« Tu as demandé du temps, mais sais-tu seulement ce que tu veux en faire ? MAILEIZ n'a pas promis de t'attendre. »";
   }
   if(id==="c_intro"){
     if(state.flags.includes("alerte"))return "La cour se prépare à une cérémonie sous tension : l'alerte lancée par CHAYAH circule déjà, sans coupable identifié. MAILEIZ et SERAPHYRA se retrouvent face à face.";
     if(state.flags.includes("enquete"))return "CHAYAH et AETHER ont conservé leur enquête secrète. La cérémonie s'ouvre sans accusation publique. MAILEIZ croise SERAPHYRA au pied des arches.";
   }
   if(id==="c_interrupt"){
     if(state.flags.includes("enquete"))return "« Nous avons trouvé une anomalie dans les archives », dit AETHER à voix basse. « Les documents ne suffisent pas à accuser quelqu'un. »";
     if(state.flags.includes("alerte"))return "AETHER s'adresse aux invités : « La cour a reçu une alerte. Ne confondons pas soupçon et preuve. » Les conversations s'interrompent.";
   }
   if(id==="c_final" && state.flags.includes("franchise"))return "MAILEIZ n'a pas reculé devant une question difficile. SERAPHYRA conserve ses secrets, et les tensions de la cour laissent entrevoir les conséquences de votre choix.";
   return original;
 }
 function render(){
   const ep=episode(),n=node();
   renderEpisodes();renderStats();
   el("stage-number").textContent="ÉPISODE "+ep.number;
   el("scene-title").textContent=ep.title;
   el("scene-subtitle").textContent=ep.subtitle;
   const background=portraitFor(ep.background);
   if(background)el("stage-backdrop").style.backgroundImage="linear-gradient(90deg,#0c0b12b8,#0c0b129e),url('"+background+"')";
   const actor=book.actors[n.speaker]||book.actors.narration;
   el("speaker").textContent=actor.name;
   el("speaker").style.color=actor.color;
   el("dialogue-text").textContent=contextualDialogue(state.node,n.text);
   const image=el("actor-portrait");if(actor.image){image.src=portraitFor(n.speaker);image.alt="Portrait de "+actor.name;image.hidden=false}else{image.hidden=true;image.removeAttribute("src")}
   const choices=el("scene-choices");choices.replaceChildren();
   const next=el("scene-next");next.hidden=Boolean(n.choices||n.ending);
   next.textContent="CONTINUER →";
   if(n.choices){
     n.choices.forEach((choice,i)=>{
       const b=document.createElement("button");b.type="button";b.className="choice";
       const label=document.createElement("strong");label.textContent=(i+1)+". "+choice.label;
       const hint=document.createElement("span");hint.textContent=choice.hint||"";
       b.append(label,hint);b.addEventListener("click",()=>makeChoice(choice));choices.append(b);
     });
   }
   el("end-actions").hidden=!n.ending || state.finished;el("scene-next").hidden=Boolean(n.choices||n.ending);
   el("undo-choice").disabled=state.history.length===0 || state.finished;
   el("final-screen").hidden=!state.finished;
   el("episode-stage").dataset.ending=String(Boolean(n.ending));
   if(state.finished)showFinal();
   save();status("Progression sauvegardée sur cet appareil.");
 }
 function transition(target){if(!episode().nodes[target])return;state.node=target;render();}
 function makeChoice(choice){
   state.history.push(snapshot());
   for(const [stat,delta] of Object.entries(choice.effects||{}))state.stats[stat]=clamp((state.stats[stat]||0)+delta);
   for(const flag of choice.flags||[])if(!state.flags.includes(flag))state.flags.push(flag);
   state.log.push({episode:episode().title,choice:choice.label,hint:choice.hint||""});
   transition(choice.next);
 }
 function finishEpisode(){
   const current=episode();
   if(!state.completed.includes(current.id))state.completed.push(current.id);
   if(state.episode>=book.episodes.length-1){state.finished=true;state.history=[];render();el("final-screen").scrollIntoView({behavior:"smooth",block:"start"});return}
   state.episode+=1;state.node=episode().start;state.history=[];render();el("episode-stage").scrollIntoView({behavior:"smooth",block:"start"});
 }
 el("scene-next").addEventListener("click",()=>{const n=node();if(n.next)transition(n.next)});
 el("episode-continue").addEventListener("click",finishEpisode);
 el("undo-choice").addEventListener("click",()=>{const prior=state.history.pop();if(!prior)return;const history=state.history;state={...prior,history};render()});
 document.querySelectorAll("[data-episode]").forEach((b,i)=>b.addEventListener("click",()=>{
   if(i!==state.episode || state.finished){status("Termine le chapitre actuel pour avancer, ou recommence la saison pour changer un choix.");return}
   el("episode-stage").scrollIntoView({behavior:"smooth",block:"start"});
 }));
 function restart(){state=initial();render();el("episode-stage").scrollIntoView({behavior:"smooth",block:"start"})}
 el("restart-story").addEventListener("click",()=>{if(window.confirm("Recommencer la saison ? La progression et les décisions enregistrées seront effacées."))restart()});
 el("restart-ending").addEventListener("click",restart);
 el("ending-review").addEventListener("click",()=>{el("story-report").hidden=!el("story-report").hidden});
 el("journal-toggle").addEventListener("click",()=>{
   const panel=el("journal");panel.hidden=!panel.hidden;
   const list=el("journal-list");list.replaceChildren();
   if(!state.log.length){const li=document.createElement("li");li.textContent="Aucune décision enregistrée.";list.append(li)}
   state.log.forEach(entry=>{const li=document.createElement("li");const title=document.createElement("strong");title.textContent=entry.episode;const detail=document.createElement("p");detail.textContent=entry.choice;li.append(title,detail);list.append(li)});
   el("journal-toggle").setAttribute("aria-expanded",String(!panel.hidden));
 });
 const menu=el("menu"),links=el("links");
 menu.addEventListener("click",()=>{const open=links.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});
 links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{links.classList.remove("open");menu.setAttribute("aria-expanded","false")}));
 render();
})();