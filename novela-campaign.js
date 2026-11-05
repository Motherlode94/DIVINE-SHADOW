/* DIVINE SHADOW — simulation narrative pilote v2.
 * Scènes causales, initiative des PNJ, pression temporelle et combats tactiques.
 * Partie exploratoire distincte du canon officiel.
 */
(() => {
"use strict";
const C=window.DS_CAMPAIGN;if(!C)return;
const KEY="divine-shadow-campaign-v2", $=id=>document.getElementById(id);
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const fresh=mode=>({version:2,mode,index:0,tick:0,health:100,energy:100,city:70,defense:35,intel:0,
 trust:0,maileiz:0,aether:0,council:0,civiliansSaved:0,injuries:0,enemyAdvance:0,
 flags:[],log:[],battle:null,finished:false,ending:null,spent:0,maileizStatus:"saine",maileizFate:null,beat:"La réception est encore paisible. Dehors, les premières inquiétudes n’ont pas atteint les invités.",
 npc:{general:"mobilise la garde",eleaonor:"prépare le Conseil",selma:"ouvre le dispensaire",miren:"accueille des réfugiés",tomas:"livre des nouvelles",aether:"examine les archives"}});
let S;try{S=JSON.parse(localStorage.getItem(KEY)||"null")}catch{S=null}
if(!S||S.version!==2||!C.scenes[S.index]||!S.npc)S=fresh(null);
const has=f=>S.flags.includes(f),flag=f=>{if(!has(f))S.flags.push(f)};
function log(text){S.log.unshift("T+"+S.tick+" • "+text);S.log=S.log.slice(0,70)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}}
const button=(title,subtitle,onClick,disabled=false)=>{
 const b=document.createElement("button");b.type="button";b.className="adventure-action";
 const strong=document.createElement("strong");strong.textContent=title;b.append(strong);
 if(subtitle){const small=document.createElement("small");small.textContent=subtitle;b.append(small)}
 b.disabled=disabled;b.addEventListener("click",onClick);return b;
};
function newGame(mode){S=fresh(mode);log("La réception commence. Les habitants n'ont aucune idée de l'attaque.");render()}
function advanceClock(n=1){
 for(let i=0;i<n;i++){
  S.tick++;
  // Les autres acteurs agissent sans attendre une permission du joueur.
  if(S.index<10){
   if(S.tick%3===0){S.enemyAdvance++;S.city=clamp(S.city-(has("evacuation")?1:3),0,100);log("Les assaillants cherchent un passage ; les secouristes poursuivent l'évacuation.")}
   if(S.tick===5){S.npc.general=has("alertePrecoce")?"les barricades sont prêtes":"la garnison arrive en retard";log("Le Général redéploie ses compagnies dans la ville.")}
   if(S.tick===8){S.npc.miren="les réfugiés remplissent l'auberge";S.civiliansSaved+=has("evacuation")?12:5;log("MIREN accueille des familles dans son auberge.")}
  }else{
   if(S.tick%4===0){S.enemyAdvance++;S.city=clamp(S.city-2,0,100);log("Des messagers signalent de nouveaux mouvements ennemis aux frontières.")}
   if(S.tick%5===0){S.npc.eleaonor="organise la réparation du marché";S.city=clamp(S.city+1,0,100);log("ÉLÉAONOR réunit des artisans pour réparer les rues sinistrées.")}
  }
 }
}
function applyDelta(delta={}){
 for(const [k,v] of Object.entries(delta)){
  if(k==="clock"){advanceClock(Math.max(0,v));continue}
  if(Object.hasOwn(S,k)&&typeof S[k]==="number"){S[k]=clamp(S[k]+v,k==="city"||k==="health"||k==="energy"?0:-10,k==="city"||k==="health"||k==="energy"?100:k==="intel"?30:k==="defense"?30:10)}
 }
}
function reaction(){
 const id=C.scenes[S.index].id;
 if(id==="s03" && !has("evacuation"))return " Sans escorte, plusieurs familles restent bloquées derrière les étals ; SELMA exige une voie de sortie.";
 if(id==="s04" && has("alertePrecoce"))return " Grâce à l'alerte, une compagnie était déjà en position avant l'arrivée du Général.";
 if(id==="s06")return S.city<55?" Des maisons brûlent encore et les ambulances manquent de places.":" Le quartier tient debout ; les habitants commencent déjà à organiser des secours.";
 if(id==="s07" && S.maileizStatus==="blessee")return " La blessure subie pendant le siège la fait souffrir. Elle refuse qu'on décide pour elle de sa convalescence.";
 if(id==="s07")return has("couloir")?" Le couloir protégé a permis à SELMA de sauver d'autres blessés.":" Les soignants s'épuisent et des familles attendent des nouvelles.";
 if(id==="s09")return has("dossier")?" NADIR a produit des copies du registre : le Conseil peut vérifier plusieurs éléments.":" Le dossier reste incomplet ; certaines accusations reposent sur des suppositions.";
 if(id==="s11")return S.city<52?" Des nouvelles arrivent : la reconstruction ralentit, faute de personnel et de provisions.":" TOMAS transmet une lettre : la ville reprend prudemment ses activités.";
 if(id==="s14")return has("sabotage")?" Les réserves ennemies ont été détournées, leurs soldats sont désorganisés.":" Les archers tiennent leurs positions, mais l'encerclement n'est pas parfait.";
 if(id==="s16")return has("sceauBrise")?" Le sceau brisé a élargi la faille ; l'énergie qui s'en échappe devient incontrôlable.":" Le passage est instable, sans être complètement ouvert.";
 if(id==="s17" && S.maileizStatus==="morte")return " Le nom de MAILEIZ figure parmi les morts. SELMA exige que cette perte soit reconnue sans instrumentalisation.";
 if(id==="s17")return S.city<50?" Les commerçants réclament des comptes pour les morts et les disparitions.":" Les marchands demandent une aide durable, pas un récit héroïque.";
 return "";
}
const choiceBeats={"s01":["MAILEIZ suit CHAYAH de son propre gré. Elle veut aider, pas se faire protéger de force.","L'alerte parvient au Général avant les premières flèches. MAILEIZ sort tout de même pour aider les blessés."],"s02":["MIREN ouvre son auberge. TOMAS guide les familles dans les ruelles. Plusieurs commerçants refusent d'abandonner leurs voisins.","Des silhouettes approchent des remparts tandis que le marché manque de bras pour évacuer les familles."],"s03":["SELMA fait traverser les blessés sous le passage protégé. Elle remercie CHAYAH, sans cacher ceux qu'elle n'a pas encore sauvés.","Le mur protège la voie principale, mais les secours cherchent encore un chemin vers les maisons basses."],"s04":["Le Général répartit ses escouades et fait dégager un corridor pour les civils.","Les réserves se cachent dans les ruelles. Le quartier avancé devra tenir avec moins de gardes."],"s06":["NADIR recevra le brassard sous scellés. Les témoignages sont recueillis séparément.","CHAYAH aide SELMA aux brancards. Les familles retiennent davantage ses actes que son rang."],"s07":["MAILEIZ décide de poursuivre malgré la douleur. CHAYAH la laisse maître de son choix.","MAILEIZ se raidit : « Je ne suis pas ton sujet, CHAYAH. » Elle quitte l'entretien sans renoncer aux secours."],"s08":["AETHER vérifie les sceaux avec NADIR. Une piste se dessine, pas encore une condamnation.","AETHER ferme le registre : « Un symbole ne remplace pas une preuve. »"],"s09":["ÉLÉAONOR approuve l'enquête et confie la reconstruction des quartiers au Général.","Le Général ne peut quitter les remparts sans relève. Le Conseil considère la décision trop risquée."],"s11":["Les voyageurs reprennent la route, mais la colonne ennemie gagne du temps.","AETHER relève les marques des roues. Une famille reste derrière eux, exposée."],"s12":["ORVANN accepte l'examen. Ses réponses soulèvent de nouvelles questions.","ORVANN proteste et demande un témoin. La méfiance entravera ses prochaines négociations.","La maison de soins accueille les survivants du convoi avant toute accusation."],"s13":["Les réserves ennemies sont dispersées et les sentinelles se retirent pour les récupérer.","AETHER repère les positions des archers. L'encerclement sera moins improvisé."],"s15":["Le frère détourne les yeux. La présence derrière la pierre semble réagir.","AETHER évacue les personnes à proximité tandis que CHAYAH sécurise le seuil.","Le sceau éclate et une onde traverse le sanctuaire."],"s17":["Le Conseil publie les faits vérifiés et reconnaît les zones d'ombre.","ÉLÉAONOR accepte les scellés, mais la population réclame des réponses.","Les matériaux sont affectés aux quartiers détruits avant les monuments."]};
function criticalMaileiz(choice){
 // Unique event, rolled once and saved. MAILEIZ is mortal and not resurrected by a UI choice.
 if(S.maileizFate)return;
 const kind=choice.critical;
 const outcome={choice:kind,result:"",roll:null};
 if(kind==="interpose"){
   S.health=clamp(S.health-42,1,100);
   S.energy=clamp(S.energy-12,0,100);
   S.maileizStatus="saine";outcome.result="protegee";
   S.maileiz=clamp(S.maileiz+2,-10,10);
   S.beat="CHAYAH surgit devant MAILEIZ et reçoit la lance en pleine poitrine. Le pavé se fend sous ses pieds ; elle reste vivante. MAILEIZ le retient lorsqu'il vacille : « Je t'avais dit que je pouvais choisir aussi... Tu aurais pu être blessé ! » Les soldats la conduisent vers le dispensaire, elle le regarde partir sans cacher sa peur.";
   flag("protectionDirecte");S.injuries+=1;
 } else if(kind==="shield"){
   const enough=S.energy>=33;
   S.energy=clamp(S.energy-33,0,100);
   S.health=clamp(S.health-(enough?27:48),1,100);
   if(enough){
     S.maileizStatus="saine";outcome.result="protegee";
     S.beat="À distance, CHAYAH ouvre la main. Un bouclier se referme sur MAILEIZ au moment où la lance frappe. Le choc traverse le lien divin et le projette contre les pierres. MAILEIZ se retourne et vient vers lui, colère et inquiétude mêlées. L'enfant secourue court vers les gardes.";
     S.maileiz=clamp(S.maileiz+1,-10,10);flag("bouclierProjete");
   }else{
     S.maileizStatus="blessee";outcome.result="blessee";
     S.injuries+=2;flag("bouclierInstable");
     S.beat="CHAYAH projette son bouclier, mais l'énergie manque pour absorber tout l'impact. Le choc le frappe et l'onde brûle MAILEIZ à l'épaule. SELMA exige une évacuation immédiate. Le bouclier l'a sauvée, sans annuler la blessure.";
   }
 } else {
   // The chance is influenced by earlier protection, not by arbitrary dialogue affinity.
   const protectedRoute=has("evacuation")||has("couloir");
   const fatalChance=protectedRoute?.36:.68;
   outcome.roll=Math.random();
   if(S.mode==="ruthless"&&outcome.roll<fatalChance){
     S.maileizStatus="morte";outcome.result="morte";
     flag("maileizMorte");S.city=clamp(S.city-7,0,100);S.injuries+=3;
     S.beat="CHAYAH ne bouge pas. MAILEIZ repousse la fillette jusqu'à l'abri, mais la lance la frappe. SELMA accourt, cherche un pouls, puis baisse la tête. MAILEIZ est morte. Sa disparition n'est pas un effet temporaire : la ville devra lui rendre hommage et CHAYAH vivre avec son choix.";
   } else {
     S.maileizStatus="blessee";outcome.result="blessee";
     flag("maileizBlessee");S.injuries+=2;
     S.beat="CHAYAH reste en retrait. MAILEIZ écarte l'enfant et tente d'esquiver ; la lance explose contre la charrette, la projetant au sol. Elle respire encore, mais SELMA diagnostique une blessure profonde qui changera sa vie. Personne ne peut prétendre qu'elle en est sortie indemne.";
   }
   S.maileiz=clamp(S.maileiz-3,-10,10);
 }
 S.maileizFate=outcome;
 log("CHOIX CRITIQUE — MAILEIZ : "+outcome.result+".");
}
function choose(choice){
 if(S.battle||S.finished)return;
 if(choice.requires&&!has(choice.requires))return;
 const current=C.scenes[S.index];const number=current.choices.indexOf(choice);
 S.beat=choiceBeats[current.id]?.[number]||"Ce choix modifiera les réactions des autres personnages.";
 if(choice.critical)criticalMaileiz(choice);
 applyDelta(choice.delta);(choice.flags||[]).forEach(flag);
 advanceClock(1);log("CHAYAH : "+choice.label);
 if(has("evacuation")&&S.index===1)S.civiliansSaved+=20;
 if(has("couloir")&&S.index===2)S.civiliansSaved+=12;
 if(has("barricades")&&S.index===4)S.npc.general="défend la porte avec les gardes";
 if(has("respect")&&S.index===7)S.npc.selma="coordonne les soins avec MAILEIZ";
 if(has("dossier")&&S.index===8)S.npc.aether="consolide les témoignages";
 if(has("mandat")&&S.index===9)S.npc.eleaonor="approuve une opération ciblée";
 if(current.id==="s07" && S.maileizStatus==="morte"){go("s08");return}
 go(choice.next);
}
function go(id){
 const idx=C.scenes.findIndex(x=>x.id===id);if(idx<0)return;
 // Never make a deceased mortal speak in later scenes.
 if(id==="s07"&&S.maileizStatus==="morte"){go("s08");return}
 S.index=idx;const scene=C.scenes[idx];S.battle=null;
 log("Nouveau lieu : "+scene.place+".");
 if(scene.battle)startBattle(scene.battle);
 render();
}
function startBattle(config){
 const enemy=C.enemies[config.enemy];
 S.battle={enemy:config.enemy,hp:enemy.hp+(config.enemy==="captain"&&!has("sabotage")?12:0),max:enemy.hp+(config.enemy==="captain"&&!has("sabotage")?12:0),turn:1,weak:0,guard:false,dodge:false,
 objective:config.enemy==="raider"?"DÉFENDRE LA PORTE ET COUVRIR L'ÉVACUATION":config.enemy==="captain"?"EMPÊCHER UNE DEUXIÈME OFFENSIVE":"CONFINER LA BRÈCHE",limit:config.turnLimit,
 last:"Le combat commence. Pendant chaque tour, l'adversaire agit et la ville subit la pression de l'affrontement."};
}
function outcome(kind){
 const battle=S.battle;if(!battle)return;
 S.battle=null;S.beat=kind==="win"?"La victoire ne met pas fin aux secours. Les gardes cherchent les personnes isolées.":kind==="parley"?"L’adversaire se retire mais ne devient pas un allié.":"Le repli laisse des blessés et un passage vulnérable.";
 if(kind==="win"){S.city=clamp(S.city+3,0,100);log("L'ennemi recule après avoir été vaincu.")}
 if(kind==="parley"){S.trust=clamp(S.trust+1,-10,10);log("L'adversaire accepte de se retirer, sans devenir l'allié de CHAYAH.")}
 if(kind==="retreat"){S.city=clamp(S.city-12,0,100);S.injuries+=3;log("La retraite laisse des blessés et un passage fragilisé.")}
 const chapterBattle=C.scenes[S.index].battle;
 if(chapterBattle)go(chapterBattle.next);else render();
}
function battleTurn(action){
 const b=S.battle;if(!b||S.finished)return;
 const e=C.enemies[b.enemy];let damage=0,guard=false,dodge=false;
 if(action==="strike"){damage=20+((b.turn*3)%5);S.energy=clamp(S.energy+6,0,100)}
 if(action==="void"){if(S.energy<18)return;S.energy-=18;damage=29;dodge=true}
 if(action==="seal"){if(S.energy<25)return;S.energy-=25;damage=18;b.weak=2}
 if(action==="guard"){guard=true;S.energy=clamp(S.energy+14,0,100)}
 if(action==="retreat"){outcome("retreat");return}
 if(action==="parley"){
  if(b.enemy!=="shade"&&(b.hp<b.max*.53||has("barricades")&&b.enemy==="raider")){outcome("parley");return}
  b.last="Le capitaine refuse l'offre : il maintient ses ordres. L'ombre ne peut pas négocier.";
 }
 b.hp=clamp(b.hp-Math.max(0,damage-e.armor),0,b.max);
 if(b.hp===0){outcome("win");return}
 let blow=e.damage+(b.turn%2?2:0);
 if(b.weak>0){blow=Math.max(3,blow-6);b.weak--}
 if(dodge){blow=0;b.last="VOID STEP : CHAYAH échappe à la riposte."}
 if(guard){blow=Math.ceil(blow*.25);b.last="La garde absorbe presque toute l'attaque."}
 if(!guard&&!dodge&&action!=="parley")b.last="L'ennemi riposte après "+Math.max(0,damage-e.armor)+" dégâts reçus.";
 S.health=clamp(S.health-blow,0,100);
 S.spent++;
 advanceClock(1);
 const prepared=S.defense+(has("barricades")?5:0);
 const attrition=Math.max(0,Math.ceil((b.turn+S.enemyAdvance)/3)-(prepared>=5?2:0));
 if(b.enemy==="raider"){S.city=clamp(S.city-attrition,0,100);if(attrition>=2)S.injuries++}
 if(b.enemy==="shade")S.energy=clamp(S.energy-3,0,100);
 b.turn++;
 if(b.turn>b.limit){S.city=clamp(S.city-8,0,100);S.injuries+=2;log("L’ennemi a atteint son objectif avant d’être arrêté : la défense doit décrocher.");outcome("retreat");return;}
 if(S.health===0){
  if(S.mode==="ruthless"){S.finished=true;S.ending="defeat";S.injuries+=6;log("CHAYAH est neutralisé ; la ville affronte l'attaque sans lui.");S.battle=null;render();return}
  S.health=38;S.energy=35;S.injuries+=3;flag("blessureDurable");log("La garde recueille CHAYAH. La défaite coûte du temps, et des civils sont blessés.");outcome("retreat");return;
 }
 render();
}
function finish(){
 S.finished=true;
 let title,text;
 if(S.maileizStatus==="morte"){title="LE PRIX DU SILENCE";text="La cité survit, mais MAILEIZ est morte en sauvant une enfant. Son absence pèse sur le Conseil, les secours et CHAYAH. La mort de cette mortelle reste définitive dans cette continuité.";}
 else if(S.city<=38||S.injuries>=12){title="UNE VICTOIRE AMÈRE";text="La ville survit, mais le prix humain est lourd. Les civils exigent des comptes et le Conseil n'accorde aucune absolution.";}
 else if(has("transparence")&&S.trust>=3&&S.city>=58){title="LA VILLE SE RELÈVE";text="Les habitants voient une alliance entre preuves, secours et responsabilité. Le mystère du pacte demeure, mais la cité peut envisager demain.";}
 else if(has("sceauBrise")||has("secret")){title="LES SERMENTS INACHEVÉS";text="La cité est sauvée pour l'heure, mais les secrets et les blessures nourrissent de nouvelles tensions.";}
 else {title="LA TRÊVE FRAGILE";text="La bataille s'achève sans effacer les contradictions. La ville a besoin de soins, d'enquête et de choix futurs.";}
 S.ending={title,text};
 log("Fin de la campagne pilote : "+title+".");render();
}
function render(){
 if(!S.mode){$("mode-setup").hidden=false;$("game-root").hidden=true;save();return}
 $("mode-setup").hidden=true;$("game-root").hidden=false;
 const n=C.scenes[S.index],chapter=C.chapters[n.chapter];
 $("chapter-title").textContent=chapter.title;
 $("chapter-desc").textContent=chapter.goal;
 $("current-place").textContent=n.place;
 let sceneText=n.text;
 if(n.id==="s18"&&S.maileizStatus==="morte")sceneText="La ville enterre ses morts, dont MAILEIZ, tombée en sauvant une enfant. CHAYAH ne peut pas effacer les décisions de cette route. AETHER l'accompagne sans le décharger de sa responsabilité. Les quartiers cherchent comment vivre après la bataille.";
 else if(n.id==="s18"&&S.maileizStatus==="blessee")sceneText+=" MAILEIZ est vivante mais blessée. Sa convalescence et ses choix futurs lui appartiennent.";
 $("place-desc").textContent=sceneText+reaction();
 $("story-event").textContent=(S.beat||"")+"\n\nSITUATION • "+n.who+" • "+S.tick+" phases écoulées.";
 $("mode-name").textContent=S.mode==="ruthless"?"IMPITOYABLE":"HISTOIRE";
 $("hp").textContent=S.health;$("energy").textContent=S.energy;$("hp-fill").style.width=S.health+"%";$("energy-fill").style.width=S.energy+"%";
 $("city-state").textContent=S.city+" / 100";
 $("evidence-count").textContent="Renseignement "+S.intel;
 const path=$("world-locations");path.replaceChildren();
 const local=C.scenes.filter(x=>x.chapter===n.chapter);
 local.forEach(x=>path.append(button((x.id===n.id?"● ":"○ ")+x.place,x.id===n.id?"SITUATION EN COURS":"Étape de l'intrigue • progression chronologique",()=>{},true)));
 $("game-root").classList.toggle("critical-moment",Boolean(n.critical));
 const actions=$("world-actions");actions.replaceChildren();
 if(n.choices&&!S.battle&&!S.finished)n.choices.forEach((c,i)=>actions.append(button((i+1)+". "+c.label,c.hint,()=>choose(c),Boolean(c.requires&&!has(c.requires)))));
 if(n.ending&&!S.finished)actions.append(button("CONCLURE CETTE CAMPAGNE","Le bilan tient compte des blessures, du temps et de l'état de la ville.",finish));
 $("exploration-panel").hidden=Boolean(S.battle)||Boolean(S.finished);
 const combat=$("combat-panel");combat.hidden=!S.battle;
 if(S.battle){
  const b=S.battle,e=C.enemies[b.enemy];
  $("enemy-name").textContent=e.name;
  $("enemy-desc").textContent=b.objective+" · Les ennemis conservent leur initiative.";
  $("enemy-hp").textContent=b.hp+" / "+b.max;
  $("enemy-hp-fill").style.width=100*b.hp/b.max+"%";
  $("combat-turn").textContent="TOUR "+b.turn+" / "+b.limit;
  $("combat-log").textContent=b.last;
  const skills=$("combat-actions");skills.replaceChildren(
   button("FRAPPE CIBLÉE","Dégâts stables ; récupère un peu d'énergie.",()=>battleTurn("strike")),
   button("VOID STEP","29 dégâts, esquive la riposte. Coût : 18 énergie.",()=>battleTurn("void"),S.energy<18),
   button("GARDE","Réduit la prochaine attaque ; récupère de l'énergie.",()=>battleTurn("guard")),
   button("SCEAU DU RÉEL","Affaiblit les prochaines frappes. Coût : 25.",()=>battleTurn("seal"),S.energy<25),
   button("SOMMATION","Possible pour un ennemi humain en position faible.",()=>battleTurn("parley")),
   button("REPLI TACTIQUE","Met les civils et les soldats en danger, puis poursuit la continuité.",()=>battleTurn("retreat"))
  );
 }
 const objectives=$("chapter-objectives");objectives.replaceChildren();
 const objectivesText=[
 "Situation : "+(S.index+1)+" / "+C.scenes.length,
 "Civils évacués : "+S.civiliansSaved,
 "MAILEIZ : "+(S.maileizStatus==="morte"?"DÉCÉDÉE":S.maileizStatus==="blessee"?"BLESSÉE":"EN VIE"),
 "Blessures civiles recensées : "+S.injuries,
 "Progression des assaillants : "+S.enemyAdvance
 ];objectivesText.forEach(x=>{const li=document.createElement("li");li.textContent=x;objectives.append(li)});
 const clues=$("clue-list");clues.replaceChildren();const points=[
 "Porte : "+(has("barricades")?"fortifiée":has("alertePrecoce")?"alerte avancée":"vulnérable"),
 "NADIR / archives : "+(has("dossier")?"registre recoupé":"enquête en cours"),
 "ORVANN : "+(has("analyse")?"documents vérifiés":"position non établie"),
 "Frère aux pactes : "+(has("ecouteFrere")?"entendu":has("sceauBrise")?"sceau brisé":"mystère ouvert")
 ];points.forEach(x=>{const li=document.createElement("li");li.textContent=x;clues.append(li)});
 const relations=$("relation-list");relations.replaceChildren();
 const stats={MAILEIZ:S.maileiz,AETHER:S.aether,CONSEIL:S.council,CONFIANCE:S.trust,DÉFENSE:S.defense};
 Object.entries(stats).forEach(([k,v])=>{const li=document.createElement("li");li.textContent=k+" : "+(v>0?"+":"")+v;relations.append(li)});
 const npcList=$("npc-status-list");if(npcList){npcList.replaceChildren();Object.entries(S.npc).forEach(([name,activity])=>{const li=document.createElement("li");li.textContent=name.toUpperCase()+" : "+activity;npcList.append(li)})}
 const journal=$("adventure-journal");journal.replaceChildren();
 [ ...S.log.slice(0,12), ...Object.entries(S.npc).map(([k,v])=>k.toUpperCase()+" : "+v)].forEach(line=>{const li=document.createElement("li");li.textContent=line;journal.append(li)});
 const ending=$("adventure-ending");ending.hidden=!S.finished;
 if(S.finished){$("ending-title").textContent=S.ending==="defeat"?"LA VILLE SANS SON PROTECTEUR":S.ending.title;$("ending-text").textContent=S.ending==="defeat"?"CHAYAH a été neutralisé. Dans cette continuité impitoyable, les survivants poursuivent sans lui.":S.ending.text;}
 save();
}
$("history-mode").addEventListener("click",()=>newGame("story"));
$("ruthless-mode").addEventListener("click",()=>newGame("ruthless"));
$("reset-adventure").addEventListener("click",()=>{if(confirm("Recommencer la campagne et ses conséquences ?")){S=fresh(null);render()}});
$("journal-button").addEventListener("click",()=>{const p=$("journal-panel");p.hidden=!p.hidden;$("journal-button").setAttribute("aria-expanded",String(!p.hidden))});
$("menu").addEventListener("click",()=>{const links=$("links");const open=links.classList.toggle("open");$("menu").setAttribute("aria-expanded",String(open))});
render();
})();