/* DIVINE SHADOW — simulation narrative pilote v2.
 * Scènes causales, initiative des PNJ, pression temporelle et combats tactiques.
 * Partie exploratoire distincte du canon officiel.
 */
(() => {
"use strict";
const C=window.DS_CAMPAIGN;if(!C)return;
const KEY="divine-shadow-campaign-v8", $=id=>document.getElementById(id);
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const initialResources=()=>Object.fromEntries(Object.entries(C.roster||{}).map(([id,actor])=>[id,actor.initial]));
const fresh=mode=>({version:8,mode,introDone:false,introFrame:0,index:0,tick:0,health:100,energy:100,resources:initialResources(),city:70,defense:35,intel:0,
 trust:0,maileiz:0,aether:0,council:0,civiliansSaved:0,injuries:0,enemyAdvance:0,
 flags:[],log:[],battle:null,finished:false,ending:null,spent:0,injuryLevel:0,injuryNotes:[],battleTone:'idle',fallen:[],grief:0,fury:0,defianceCount:0,cityStates:Object.fromEntries(Object.entries(C.war?.cities||{}).map(([id,c])=>[id,{trust:c.trust,threat:c.threat,security:c.strength,alignment:c.alignment}])),aidDecisions:{},troops:8,warInfluence:0,provenPatrons:0,lastDefiance:"",maileizStatus:"saine",maileizFate:null,beat:"La réception est encore paisible. Dehors, les premières inquiétudes n’ont pas atteint les invités.",
 npc:{general:"mobilise la garde",eleaonor:"prépare le Conseil",selma:"ouvre le dispensaire",miren:"accueille des réfugiés",tomas:"livre des nouvelles",aether:"examine les archives"}});
let S;try{S=JSON.parse(localStorage.getItem(KEY)||"null")}catch{S=null}
if(!S||S.version!==8||!C.scenes[S.index]||!S.npc||!S.resources)S=fresh(null);
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
  if(S.tick%5===0&&S.maileizStatus!=="morte")restoreForce("maileiz",6);
  if(S.tick%4===0)restoreForce("general",4);
  // La ville vit avant le conflit. L'attrition ne commence PAS au prologue.
  const ep=C.scenes[S.index]?.episode||1;
  if(ep<8){
   if(S.tick%4===0){S.npc.miren="accueille les voyageurs";S.npc.tomas="transmet les nouvelles des routes";log("Dans la ville encore paisible, les artisans ouvrent leurs échoppes et les messagers circulent.");}
  }else if(ep<=19){
   if(S.tick%3===0){S.enemyAdvance++;S.city=clamp(S.city-(has("evacuation")?1:3),0,100);log("Les assaillants cherchent un passage ; les secouristes poursuivent l'évacuation.")}
   if(ep>=12&&!has("militiaDeployed")){flag("militiaDeployed");S.npc.general=has("alertePrecoce")?"les barricades sont prêtes":"la garnison arrive en retard";log("Le Général redéploie ses compagnies dans la ville.")}
   if(ep>=10&&!has("refugeesArrived")){flag("refugeesArrived");S.npc.miren="les réfugiés remplissent l'auberge";S.civiliansSaved+=has("evacuation")?12:5;log("MIREN accueille des familles dans son auberge.")}
  }else{
   if(S.tick%4===0){
    S.enemyAdvance++;S.city=clamp(S.city-2,0,100);
    if(ep>=28){
      for(const [id,c] of Object.entries(S.cityStates)){
       if(c.alignment!=="enemy"){
        c.threat=clamp(c.threat+2,0,100);
        if(c.threat>65)c.security=clamp(c.security-2,0,100);
       }
      }
    }
    log("Des messagers signalent de nouveaux mouvements ennemis aux frontières.");
   }
   if(S.tick%5===0){S.npc.eleaonor="organise la réparation du marché";S.city=clamp(S.city+1,0,100);log("ÉLÉAONOR réunit des artisans pour réparer les rues sinistrées.")}
  }
 }
}
function spendForce(id,amount){
 const actor=C.roster?.[id];if(!actor||actor.resource!=="force")return;
 S.resources[id]=clamp((S.resources[id]??actor.initial)-amount,0,100);
}
function restoreForce(id,amount){
 const actor=C.roster?.[id];if(!actor||actor.resource!=="force")return;
 S.resources[id]=clamp((S.resources[id]??actor.initial)+amount,0,100);
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
 const force=S.resources.maileiz??100;
 // Sprinting through flames consumes the mortal character's physical strength.
 spendForce("maileiz",28);
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
   const fatalChance=clamp((protectedRoute?.36:.68)+(force<50?.12:0),0,.9);
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
function honorFallen(id){
 if(!C.allies?.[id]||S.fallen.includes(id))return;
 S.fallen.push(id);S.grief++;
 S.fury=clamp(S.fury+18,0,100);
 S.city=clamp(S.city-2,0,100);
 S.npc[id]="tombé au cours du conflit";
 log("DEUIL : "+C.allies[id].name+" a perdu la vie. Sa disparition est définitive dans cette continuité.");
}
function canDefy(scene,choice){
 // CHAYAH ne désobéit pas arbitrairement : seulement quand le deuil a ébranlé sa maîtrise.
 if(S.grief<3||S.fury<36||!scene.choices||scene.loss)return false;
 return choice.defianceRisk===true || (S.grief>=7&&scene.id==="s15"&&choice.flags?.includes("ecouteFrere"));
}
function defyPlayer(scene,choice){
 S.defianceCount++;
 const original=choice.label;
 const ex="CHAYAH refuse : « Non. Plus cette fois. » La mémoire de "+S.fallen.slice(-2).map(id=>C.allies[id]?.name).filter(Boolean).join(" et ")+" l'emporte sur son hésitation. Il agit seul, contre la décision proposée.";
 S.lastDefiance=ex;
 S.beat=ex+" Une vague écarlate fend la pierre ; les troupes ennemies reculent devant cette force déchaînée. AETHER tente de lui rappeler qu'une victoire sans limites n'est pas une justice.";
 S.fury=clamp(S.fury-28,0,100);S.energy=clamp(S.energy-27,0,100);
 S.trust=clamp(S.trust-2,-10,10);S.city=clamp(S.city-3,0,100);
 S.intel=clamp(S.intel+2,0,30);
 flag("chayahDefiance");
 log("RUPTURE DE VOLONTÉ : CHAYAH a refusé le choix « "+original+" ». L'ennemi a subi sa fureur, mais la ville en paye le prix.");
}
function respondToCity(reqId,accept){
 const r=C.war.requests.find(x=>x.id===reqId);if(!r||S.aidDecisions[r.id])return;
 const target=S.cityStates[r.city],city=C.war.cities[r.city];
 const cost=Math.min(S.troops,r.units);
 S.aidDecisions[r.id]=accept?(cost>=r.units?"accepted":"partial"):"refused";
 if(accept){
   const adequate=cost>=r.units,shortfall=r.units-cost;
   S.troops=clamp(S.troops-cost,0,16);
   target.trust=clamp(target.trust+(adequate?3:cost>0?1:-2),-10,10);
   target.threat=clamp(target.threat-(adequate?17:cost>0?6:-1),0,100);
   target.security=clamp(target.security+(adequate?8:cost>0?3:-2),0,100);
   S.defense=clamp(S.defense-(cost>0?2:0),0,30);
   S.trust=clamp(S.trust+(adequate?1:0),-10,10);
   S.warInfluence+=adequate?1:0;
   S.beat=adequate?
    "CHAYAH accepte l'appel de "+city.name+". "+cost+" unités partent réellement et les habitants saluent leur arrivée. Leurs propres frontières restent moins protégées.":
    "CHAYAH accepte l'appel de "+city.name+", mais ses réserves sont insuffisantes : "+cost+" unités partent, "+shortfall+" manquent. Cette promesse incomplète ne suffit pas à briser le siège, et la cité s'en souviendra.";
   log("RENFORTS À "+city.name+": "+cost+"/"+r.units+" unités disponibles. "+(adequate?"Secours complet.":"Secours insuffisant."));
 }else{
   target.trust=clamp(target.trust-4,-10,10);
   target.threat=clamp(target.threat+24,0,100);
   target.security=clamp(target.security-14,0,100);
   S.troops=clamp(S.troops+1,0,16);
   S.warInfluence--;
   S.beat="CHAYAH refuse la demande de "+city.name+". Les gardes locaux restent disponibles, mais la cité assiégée doit lutter seule. Les émissaires repartent sans cacher leur colère. La Coalition apprend qu'elle est isolée.";
   log("SECOURS REFUSÉS À "+city.name+": confiance effondrée, menace accrue, ressources locales préservées.");
 }
 advanceClock(2);
 const current=C.scenes[S.index];go(current.choices?.[0]?.next);
}
function choose(choice){
 if(S.battle||S.finished)return;
 if(choice.requires&&!has(choice.requires))return;
 const current=C.scenes[S.index];const number=current.choices.indexOf(choice);
 const override=canDefy(current,choice);
 S.beat=choice.after||choiceBeats[current.id]?.[number]||"Ce choix modifiera les réactions des autres personnages.";
 if(current.loss)honorFallen(current.loss);
 if(override)defyPlayer(current,choice);
 if(choice.critical)criticalMaileiz(choice);
 if(!override){applyDelta(choice.delta);(choice.flags||[]).forEach(flag);}else{flag("choiceOverridden"+current.id)}
 // En combat ou en secours, l'effort des mortels réduit leur Force.
 if(current.id==="s01"&&number===0)spendForce("maileiz",8);
 if(current.id==="s03")spendForce("maileiz",number===0?18:26);
 if(current.id==="s04")spendForce("general",12);
 if(current.id==="s07"&&S.maileizStatus!=="morte")restoreForce("maileiz",12);
 advanceClock(1);
 log(override?"CHAYAH agit selon sa propre volonté.":"CHAYAH : "+choice.label);
 if(has("evacuation")&&current.id==="s02")S.civiliansSaved+=20;
 if(has("couloir")&&current.id==="s03")S.civiliansSaved+=12;
 if(has("barricades")&&current.id==="s04")S.npc.general="défend la porte avec les gardes";
 if(has("respect")&&current.id==="s07")S.npc.selma="coordonne les soins avec MAILEIZ";
 if(has("dossier")&&current.id==="s08")S.npc.aether="consolide les témoignages";
 if(has("mandat")&&current.id==="s09")S.npc.eleaonor="approuve une opération ciblée";
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
 S.battle={enemy:config.enemy,hp:enemy.hp+(config.enemy==="captain"&&!has("sabotage")?12:0),max:enemy.hp+(config.enemy==="captain"&&!has("sabotage")?12:0),force:enemy.resource==="force"?enemy.force:null,turn:1,weak:0,guard:false,dodge:false,
 objective:C.war?.armies?.[config.enemy]?"AFFRONTER "+C.war.armies[config.enemy].groups+" GROUPES SOUS LES ORDRES DE "+C.war.armies[config.enemy].general:config.enemy==="raider"?"DÉFENDRE LA PORTE ET COUVRIR L'ÉVACUATION":config.enemy==="captain"?"EMPÊCHER UNE DEUXIÈME OFFENSIVE":"CONFINER LA BRÈCHE",limit:config.turnLimit,
 last:"Le combat commence. Pendant chaque tour, l'adversaire agit et la ville subit la pression de l'affrontement."};
}
function outcome(kind){
 const battle=S.battle;if(!battle)return;
 S.battle=null;S.beat=kind==="win"?"La victoire ne met pas fin aux secours. Les gardes cherchent les personnes isolées.":kind==="parley"?"L’adversaire se retire mais ne devient pas un allié.":"Le repli laisse des blessés et un passage vulnérable.";
 if(kind==="win"){S.city=clamp(S.city+3,0,100);log("L'ennemi recule après avoir été vaincu.")}
 if(kind==="parley"){S.trust=clamp(S.trust+1,-10,10);log("L'adversaire accepte de se retirer, sans devenir l'allié de CHAYAH.")}
 if(kind==="retreat"){S.city=clamp(S.city-12,0,100);S.injuries+=3;log("La retraite laisse des blessés et un passage fragilisé.")}
 if(C.war?.armies?.[battle.enemy]){
   if(kind==="win"||kind==="parley"){S.warInfluence+=2;S.provenPatrons+=1;log("Formation ennemie dispersée, ordre mystique récupéré et chaîne de commandement mieux connue.");}
   if(kind==="retreat"){S.warInfluence-=2;S.troops=clamp(S.troops-1,0,16);log("Les escouades adverses maintiennent leur position après le repli.");}
 }
 const chapterBattle=C.scenes[S.index].battle;
 if(chapterBattle)go(chapterBattle.next);else render();
}
function battleTurn(action){
 const b=S.battle;if(!b||S.finished)return;
 const e=C.enemies[b.enemy];let damage=0,guard=false,dodge=false,recoil=0,cost=0;
 const fatigue=Math.min(12,S.injuryLevel*2);
 const narrative={
 strike:"CHAYAH glisse au ras des pavés. Ses talons arrachent des étincelles et sa frappe percute la ligne des boucliers. Le choc traverse la place comme un coup de tonnerre.",
 void:"Le monde semble perdre une image. CHAYAH réapparaît derrière les lances, mais le déplacement laisse un goût de sang au fond de sa gorge.",
 guard:"Il se campe devant ses alliés. Des impacts font trembler ses épaules ; protéger n'a jamais voulu dire ne rien ressentir.",
 seal:"Des glyphes s'enroulent autour de son avant-bras et ralentissent la charge. La chaleur surnaturelle lui déchire la peau.",
 counter:"Il attend le dernier instant, détourne la lame et frappe en retour. L'élan ennemi lui tord le poignet.",
 ward:"Un rempart translucide jaillit entre la colonne et les habitants. La surface résiste ; l'onde de retour traverse les côtes de CHAYAH.",
 fury:"Sa colère fend la poussière en une onde écarlate contrôlée. Le sol vibre, les ennemis reculent, mais CHAYAH refuse de libérer ce qui sommeille en lui.",
 parley:"Sa sommation domine un instant le tumulte. Les adversaires hésitent, puis certains resserrent leurs rangs."
 };
 if(action==="strike"){damage=22-fatigue;S.energy=clamp(S.energy+4,0,100)}
 if(action==="void"){cost=19;if(S.energy<cost)return;damage=27-fatigue;dodge=true;recoil=3}
 if(action==="seal"){cost=26;if(S.energy<cost)return;damage=17-fatigue;b.weak=2;recoil=5}
 if(action==="guard"){guard=true;S.energy=clamp(S.energy+8,0,100)}
 if(action==="counter"){cost=9;if(S.energy<cost)return;damage=24-fatigue;guard=true;recoil=5}
 if(action==="ward"){cost=23;if(S.energy<cost)return;damage=6;guard=true;recoil=7;S.city=clamp(S.city+1,0,100)}
 if(action==="fury"){
  if(S.grief<3||S.fury<32||S.energy<29)return;
  cost=29;damage=Math.max(10,Math.min(38,29+S.grief)-fatigue);recoil=13;
  S.fury=clamp(S.fury-32,0,100);S.trust=clamp(S.trust-1,-10,10);
  log("RAGE CONTENUE : puissance non révélée ; dégâts et contrecoup physiques.");
 }
 if(action==="retreat"){outcome("retreat");return}
 if(action==="parley"&&b.enemy!=="shade"&&(b.hp<b.max*.53||has("barricades")&&b.enemy==="raider")){outcome("parley");return}
 S.energy=clamp(S.energy-cost,0,100);
 damage=Math.max(0,damage);
 b.hp=clamp(b.hp-Math.max(0,damage-e.armor),0,b.max);
 let blow=0;
 if(b.hp>0){
  if(e.resource==="force")b.force=clamp((b.force??100)-12,0,100);
  blow=e.damage+(b.turn%2?2:0);
  if(e.resource==="force"&&b.force<30)blow=Math.max(3,blow-5);
  if(b.weak>0){blow=Math.max(3,blow-6);b.weak--}
  if(dodge)blow=0;
  if(guard)blow=Math.ceil(blow*(action==="ward"?.18:action==="counter"?.45:.27));
 }
 const physical=blow+recoil;S.health=clamp(S.health-physical,0,100);
 if(physical>=11){
  S.injuryLevel=clamp(S.injuryLevel+(physical>=25?2:1),0,8);
  S.injuryNotes.unshift((physical>=25?"Fracture et tissu déchiré":"Contusion profonde")+" — "+(action==="ward"?"contrecoup du rempart":action==="seal"?"sceau divin":"attaque ennemie"));
  S.injuryNotes=S.injuryNotes.slice(0,8);
  log("BLESSURE : le corps immortel de CHAYAH conserve ses lésions.");
 }
 b.last=(narrative[action]||"Les deux camps hésitent.")+" "+(physical>0?"La riposte frappe son corps. Immortel, il saigne et vacille sans mourir.":"L'adversaire manque sa cible.")+" "+(S.injuryLevel>=3?"Ses anciennes blessures limitent désormais sa vitesse.":"");
 S.beat=b.last;S.battleTone=action==="ward"?"defense":action==="fury"?"fury":action==="void"?"speed":physical>=15?"impact":"attack";
 S.spent++;advanceClock(1);
 if(b.hp<=0){outcome("win");return}
 const prepared=S.defense+(has("barricades")?5:0);
 const attrition=Math.max(0,Math.ceil((b.turn+S.enemyAdvance)/3)-(prepared>=5?2:0));
 if(b.enemy==="raider"){S.city=clamp(S.city-attrition,0,100);if(attrition>=2)S.injuries++}
 if(b.enemy==="shade")S.energy=clamp(S.energy-3,0,100);
 b.turn++;
 if(b.turn>b.limit){S.city=clamp(S.city-8,0,100);S.injuries+=2;log("L'ennemi gagne du terrain ; les défenseurs doivent décrocher.");outcome("retreat");return}
 if(S.health===0){
  if(S.mode==="ruthless"){S.finished=true;S.ending="defeat";S.injuries+=6;S.battle=null;log("CHAYAH EST NEUTRALISÉ, NON MORT. La cité perd son défenseur.");render();return}
  S.health=30;S.energy=Math.min(S.energy,30);S.injuryLevel=clamp(S.injuryLevel+2,0,8);flag("blessureDurable");log("Ses compagnons évacuent CHAYAH inconscient. Ses blessures ne disparaissent pas.");outcome("retreat");return
 }
 render();
}
function finish(){
 S.finished=true;
 let title,text;
 const rescued=Object.values(S.aidDecisions).filter(v=>v==="accepted").length;
 const refused=Object.values(S.aidDecisions).filter(v=>v==="refused").length;
 const neutralTrust=["brumelac","asterne"].reduce((total,id)=>total+(S.cityStates[id]?.trust||0),0);
 if(S.maileizStatus==="morte"&&S.fury>=40){title="LES CENDRES DE LA VENGEANCE";text="CHAYAH a écrasé ses ennemis, mais la disparition de MAILEIZ et la rage ont brisé plusieurs alliances. Les cités redoutent désormais celui qui prétendait les protéger.";}
 else if(rescued>=5&&S.trust>=0&&has("trial")&&S.provenPatrons>=2){title="LA LIGUE DES CITÉS LIBRES";text="CHAYAH a aidé la plupart des cités, et des preuves ont conduit les commanditaires devant la justice. Les alliances restent indépendantes, mais un ordre nouveau se dessine.";}
 else if(refused>=4){title="LES PORTES CLOSES";text="CHAYAH a privilégié la défense de sa ville. Les voisins abandonnés ferment leurs routes et de nouveaux ennemis encerclent ses frontières.";}
 else if(neutralTrust<=-5){title="LA PAIX SANS LES NEUTRES";text="La guerre s'apaise, mais les villes neutres refusent la protection de CHAYAH après les décisions qui les ont laissées seules.";}
 else if(S.provenPatrons>=3&&S.intel>=12){title="LES MASQUES TOMBENT";text="Les ordres mystiques et les financiers cachés sont révélés. La victoire appartient aux témoins autant qu'aux armes.";}
 else if(S.cityStates.valedor.security<=30||S.cityStates.solenne.security<=30){title="LE PRIX DES FRONTIÈRES";text="Des villes alliées ont été ravagées. La victoire militaire n'efface pas les familles perdues ni la confiance trahie.";}
 else if(S.maileizStatus==="morte"){title="LE PRIX DU SILENCE";text="La cité survit, mais MAILEIZ est morte en sauvant une enfant. Son absence pèse sur le Conseil, les secours et CHAYAH. La mort de cette mortelle reste définitive dans cette continuité.";}
 else if(S.city<=38||S.injuries>=12){title="UNE VICTOIRE AMÈRE";text="La ville survit, mais le prix humain est lourd. Les civils exigent des comptes et le Conseil n'accorde aucune absolution.";}
 else if(has("transparence")&&S.trust>=3&&S.city>=58){title="LA VILLE SE RELÈVE";text="Les habitants voient une alliance entre preuves, secours et responsabilité. Le mystère du pacte demeure, mais la cité peut envisager demain.";}
 else if(has("sceauBrise")||has("secret")){title="LES SERMENTS INACHEVÉS";text="La cité est sauvée pour l'heure, mais les secrets et les blessures nourrissent de nouvelles tensions.";}
 else {title="LA TRÊVE FRAGILE";text="La bataille s'achève sans effacer les contradictions. La ville a besoin de soins, d'enquête et de choix futurs.";}
 S.ending={title,text};
 log("Fin de la campagne pilote : "+title+".");render();
}
const introArt={
 chayah:"chayah_hd_candidate.jpg",
 aether:"aether_hd_candidate.jpg",
 maileiz:"Guerrière de feu dans les ruines en flammes.png",
 vaelkor:"vaelkor_clean.png"
};
function showCinematic(){
 const frames=C.season?.cinematic||[];const i=Math.min(S.introFrame||0,frames.length-1),frame=frames[i];
 if(!frame){S.introDone=true;render();return}
 $("cinematic-kicker").textContent=frame.eyebrow;
 $("cinematic-title").textContent=frame.title;
 $("cinematic-narration").textContent=frame.text;
 $("cinematic-count").textContent=String(i+1).padStart(2,"0")+" / "+String(frames.length).padStart(2,"0");
 $("cinematic-next").textContent=i===frames.length-1?"COMMENCER L'ÉPISODE 01 →":"SUIVANT →";
 const image=introArt[frame.art]||introArt.chayah;
 $("cinematic-backdrop").style.backgroundImage="linear-gradient(90deg,#090911d9,#130914b3),url('./assets/"+encodeURIComponent(image)+"')";
 save();
}
function endCinematic(){S.introDone=true;S.introFrame=C.season.cinematic.length;render();$("adventure-game").scrollIntoView({block:"start",behavior:"smooth"});}
$("cinematic-next").addEventListener("click",()=>{
 if(S.introFrame>=C.season.cinematic.length-1){endCinematic();return}
 S.introFrame++;showCinematic();
});
$("cinematic-skip").addEventListener("click",endCinematic);
function render(){
 if(S.mode&&!S.introDone){
  $("mode-setup").hidden=true;$("game-root").hidden=true;
  $("opening-cinematic").hidden=false;showCinematic();return;
 }
 $("opening-cinematic").hidden=true;
 if(!S.mode){$("mode-setup").hidden=false;$("game-root").hidden=true;save();return}
 $("mode-setup").hidden=true;$("game-root").hidden=false;
 const n=C.scenes[S.index],chapter=C.chapters[n.chapter];
 const episode=C.season?.episodes[n.episode-1];
 $("episode-label").textContent="ÉPISODE "+String(n.episode).padStart(2,"0")+" / "+(C.season?.totalEpisodes||25);
 $("episode-name").textContent=episode?.title||"LA NUIT DES SERMENTS";
 $("episode-arc").textContent=episode?.arc||"SAISON I";
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
 const available=C.season?.episodes||[];
 available.forEach((item,i)=>{
  const first=C.scenes.findIndex(x=>x.episode===i+1);
  const done=first<S.index,active=i+1===n.episode;
  path.append(button((active?"● ":done?"✓ ":"○ ")+String(i+1).padStart(2,"0")+" — "+item.title,
   active?"EN COURS":done?"TERMINÉ":"À DÉCOUVRIR",()=>{},true));
 });
 $("game-root").classList.toggle("critical-moment",Boolean(n.critical));
 const actions=$("world-actions");actions.replaceChildren();
 if(n.request&&!S.battle&&!S.finished){
  const r=C.war.requests.find(x=>x.id===n.request);
  const city=r&&C.war.cities[r.city];const cstate=r&&S.cityStates[r.city];
  if(r&&city){
    actions.append(button("OUI — ENVOYER DES RENFORTS À "+city.name,
       "Coût : "+r.units+" unités de garde. Menace réduite, confiance renforcée, mais une autre frontière devient vulnérable.",
       ()=>respondToCity(r.id,true)));
    actions.append(button("NON — REFUSER L'APPEL DE "+city.name,
       "Conserve tes troupes. Cette ville risque de perdre ses défenses et de se détourner de CHAYAH.",
       ()=>respondToCity(r.id,false)));
  }
 }else if(n.choices&&!S.battle&&!S.finished)n.choices.forEach((c,i)=>actions.append(button((i+1)+". "+c.label,c.hint,()=>choose(c),Boolean(c.requires&&!has(c.requires)))));
 if(n.ending&&!S.finished)actions.append(button("CONCLURE CETTE CAMPAGNE","Le bilan tient compte des blessures, du temps et de l'état de la ville.",finish));
 $("exploration-panel").hidden=Boolean(S.battle)||Boolean(S.finished);
 const combat=$("combat-panel");combat.hidden=!S.battle;
 if(S.battle){
  const b=S.battle,e=C.enemies[b.enemy];
  $("enemy-name").textContent=e.name;
  $("enemy-desc").textContent=b.objective+" · Les ennemis conservent leur initiative.";
  $("enemy-hp").textContent=b.hp+" / "+b.max;
  $("enemy-hp-fill").style.width=100*b.hp/b.max+"%";
  $("enemy-force-panel").hidden=e.resource!=="force";
  if(e.resource==="force"){$("enemy-force").textContent=b.force??100;$("enemy-force-fill").style.width=(b.force??100)+"%"}
  $("combat-turn").textContent="TOUR "+b.turn+" / "+b.limit;
  $("combat-log").textContent=b.last;
  $("combat-panel").dataset.impact=S.battleTone||"idle";
  const wounds=$("combat-wounds");if(wounds)wounds.textContent="LÉSIONS : "+S.injuryLevel+"/8 — "+(S.injuryNotes[0]||"Aucune blessure durable");
  const skills=$("combat-actions");skills.replaceChildren(
   button("FRAPPE CIBLÉE","Dégâts stables ; récupère un peu d'énergie.",()=>battleTurn("strike")),
   button("VOID STEP","Esquive et contre, 19 énergie, 3 vitalité de contrecoup.",()=>battleTurn("void"),S.energy<19),
   button("GARDE","Réduit la prochaine attaque ; récupère de l'énergie.",()=>battleTurn("guard")),
   button("CONTRE D'APPUI","Dévier et frapper. Coût 9 : contrecoup physique.",()=>battleTurn("counter"),S.energy<9),
   button("REMPART DIVIN","Protéger les civils. Coût 23 : choc absorbé par CHAYAH.",()=>battleTurn("ward"),S.energy<23),
   button("SCEAU DU RÉEL","Sceau de ralentissement : 26 énergie et 5 vitalité.",()=>battleTurn("seal"),S.energy<26),
   button("SOMMATION","Possible pour un ennemi humain en position faible.",()=>battleTurn("parley")),
   button("REPLI TACTIQUE","Met les civils et les soldats en danger, puis poursuit la continuité.",()=>battleTurn("retreat")),
   ...(S.grief>=3?[button("RAGE CONTENUE","Frappe violente mais limitée ; blessures et énergie consommée.",()=>battleTurn("fury"),S.fury<32||S.energy<29)]:[])
  );
 }
 const objectives=$("chapter-objectives");objectives.replaceChildren();
 const objectivesText=[
 "Situation : "+(S.index+1)+" / "+C.scenes.length,
 "Civils évacués : "+S.civiliansSaved,
 "MAILEIZ : "+(S.maileizStatus==="morte"?"DÉCÉDÉE":S.maileizStatus==="blessee"?"BLESSÉE":"EN VIE"),
 "Blessures civiles recensées : "+S.injuries,
 "Progression des assaillants : "+S.enemyAdvance,
 "Alliés tombés : "+S.fallen.length+" / 15",
 "Lésions de CHAYAH : "+S.injuryLevel+" / 8",
 "Renforts disponibles : "+S.troops,
 "Renforts complets : "+Object.values(S.aidDecisions).filter(x=>x==="accepted").length+" / "+(C.war?.requests?.length||0)+", partiels : "+Object.values(S.aidDecisions).filter(x=>x==="partial").length
 ];objectivesText.forEach(x=>{const li=document.createElement("li");li.textContent=x;objectives.append(li)});
 const clues=$("clue-list");clues.replaceChildren();const points=[
 "Porte : "+(has("barricades")?"fortifiée":has("alertePrecoce")?"alerte avancée":"vulnérable"),
 "NADIR / archives : "+(has("dossier")?"registre recoupé":"enquête en cours"),
 "ORVANN : "+(has("analyse")?"documents vérifiés":"position non établie"),
 "Frère aux pactes : "+(has("ecouteFrere")?"entendu":has("sceauBrise")?"sceau brisé":"mystère ouvert")
 ];points.forEach(x=>{const li=document.createElement("li");li.textContent=x;clues.append(li)});
 const relations=$("relation-list");relations.replaceChildren();
 const stats={"BLESSURES DE CHAYAH":S.injuryLevel,MAILEIZ:S.maileiz,AETHER:S.aether,CONSEIL:S.council,CONFIANCE:S.trust,DÉFENSE:S.defense,DEUIL:S.grief,FUREUR:S.fury,DÉSOBÉISSANCES:S.defianceCount};
 Object.entries(stats).forEach(([k,v])=>{const li=document.createElement("li");li.textContent=k+" : "+(v>0?"+":"")+v;relations.append(li)});
 const list=$("character-list");if(list){
  list.replaceChildren();
  const discovered=["chayah","maileiz","aether","seraphyra","general","eleaonor","miren","selma","tomas","nadir","brother"].filter(id=>{
    if(["chayah","maileiz","aether"].includes(id))return true;
    if(id==="seraphyra")return S.index>=1;
    if(id==="general")return S.index>=4;
    if(id==="eleaonor")return S.index>=9;
    if(["miren","selma","tomas"].includes(id))return S.index>=2;
    if(id==="nadir")return S.index>=8;
    if(id==="brother")return S.index>=15;
    return false;
  });
  for(const id of discovered){
   const actor=C.roster[id];if(!actor)continue;
   const item=document.createElement("div");item.className="resource-character";
   const top=document.createElement("div");top.className="resource-character-head";
   const name=document.createElement("strong");name.textContent=actor.name;
   const category=document.createElement("span");category.textContent=actor.nature==="immortal"?"IMMORTEL":actor.nature==="human"?"MORTEL":"NON CONFIRMÉ";top.append(name,category);item.append(top);
   const detail=document.createElement("p");
   const value=actor.resource==="energy"?(id==="chayah"?S.energy:S.resources[id]):S.resources[id];
   detail.textContent=actor.resource?actor.resourceLabel+" : "+value+" / 100":actor.resourceLabel;
   item.append(detail);
   if(actor.resource){const track=document.createElement("div");track.className="progress-track "+(actor.resource==="energy"?"energy":"force");const bar=document.createElement("i");bar.style.width=value+"%";track.append(bar);item.append(track)}
   if(id==="maileiz"&&S.maileizStatus!=="saine"){const health=document.createElement("small");health.textContent="État : "+(S.maileizStatus==="morte"?"décédée":"blessée");item.append(health)}
   list.append(item);
  }
 }
 const alliesPanel=$("allies-list");
 if(alliesPanel){
  alliesPanel.replaceChildren();
  const members=Object.values(C.allies||{}).filter(a=>a.entry<=n.episode);
  for(const a of members){
   const row=document.createElement("div");row.className="ally-record"+(S.fallen.includes(a.id)?" fallen":"");
   const title=document.createElement("strong");title.textContent=a.name;
   const meta=document.createElement("span");meta.textContent=a.role+" • "+(S.fallen.includes(a.id)?"TOMBÉ AU COMBAT":"EN VIE");
   const story=document.createElement("p");story.textContent=a.personality;
   row.append(title,meta,story);
   alliesPanel.append(row);
  }
  const count=$("allies-counter");if(count)count.textContent=members.length+" / 20 connus • "+S.fallen.length+" disparus";
 }
 const cityList=$("city-diplomacy-list");
 if(cityList&&C.war){
  cityList.replaceChildren();
  for(const [id,city] of Object.entries(C.war.cities)){
   const state=S.cityStates[id];
   const item=document.createElement("div");item.className="city-record";
   const title=document.createElement("strong");title.textContent=city.name+" · "+(state.alignment==="allied"?"ALLIÉE":state.alignment==="neutral"?"NEUTRE":"ENNEMIE");
   const detail=document.createElement("p");detail.textContent="Défense "+state.security+"/100 · Menace "+state.threat+"/100 · Confiance "+state.trust;
   item.append(title,detail);cityList.append(item);
  }
 }
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
const drawer=$("info-drawer"),menuToggle=$("info-menu-toggle"),menuClose=$("info-menu-close");
function openInfo(open){
 drawer.hidden=!open;
 menuToggle.setAttribute("aria-expanded",String(open));
 $("info-menu-indicator").textContent=open?"FERMER":"OUVRIR";
}
menuToggle.addEventListener("click",()=>openInfo(drawer.hidden));
menuClose.addEventListener("click",()=>openInfo(false));
const tabs=[...document.querySelectorAll("[data-info-tab]")];
function switchInfo(id){
 tabs.forEach(t=>{const selected=t.dataset.infoTab===id;t.setAttribute("aria-selected",String(selected));t.tabIndex=selected?0:-1});
 document.querySelectorAll(".info-tab-panel").forEach(p=>p.hidden=p.id!=="info-"+id);
}
tabs.forEach(t=>t.addEventListener("click",()=>switchInfo(t.dataset.infoTab)));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!drawer.hidden)openInfo(false)});
switchInfo("city");
$("menu").addEventListener("click",()=>{const links=$("links");const open=links.classList.toggle("open");$("menu").setAttribute("aria-expanded",String(open))});
render();
})();