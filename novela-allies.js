/* DIVINE SHADOW : 20 alliés récurrents, 15 pertes tragiques liées à l'intrigue.
  Dossiers fictifs proposés. Les morts restent dans la continuité de jeu, pas dans le canon. */
(() => {
const C=window.DS_CAMPAIGN;if(!C?.season)return;
const raw=[["isha","ISHA N'DALA","Capitaine des ponts","Pragmatique, courageuse, redoute de perdre ses recrues.",2,14,"Protège la retraite du pont quand la première brèche cède."],["lucien","LUCIEN MOREAU","Cartographe","Ironique, patient, passionné par les quartiers oubliés.",1,10,"Meurt en indiquant un passage aux réfugiés."],["samira","SAMIRA EL-KHOURY","Éclaireuse","Tenace, indépendante, ne demande jamais d'être sauvée.",3,12,"Retient une patrouille pour laisser passer les enfants."],["ren","REN TAKEDA","Archer des toits","Discret, préfère écouter avant d'agir.",4,15,"Tombe en défendant les derniers remparts."],["amaka","AMAKA OKON","Intendante des réserves","Franc-parler, organise mieux qu'elle ne commande.",2,16,"Reste auprès des blessés quand les entrepôts brûlent."],["diego","DIEGO VARELA","Conducteur des convois","Rieur en public, hanté par une ancienne fuite.",5,18,"Sacrifie son attelage pour ouvrir un couloir d'évacuation."],["hana","HANA SEO","Médecin de terrain","Rigoureuse, refuse de traiter les ennemis comme des monstres.",3,19,"Protège SELMA et des patients pendant la seconde offensive."],["youssef","YOUSSEF BENALI","Forgeron","Créatif, obstiné, protecteur de ses apprentis.",1,20,"Périt en fermant la forge qui fabrique les armes ennemies."],["alina","ALINA PETROVA","Gardienne des portes","Calme, superstitieuse, profondément loyale à la ville.",4,21,"Ferme la herse au prix de sa vie."],["kwame","KWAME BOATENG","Messager des frontières","Audacieux, généreux, parfois imprudent.",2,22,"Rapporte l'itinéraire ennemi avant de succomber."],["ines","INÈS DA COSTA","Navigatrice","Observatrice, refuse les promesses irréalistes.",5,23,"Couvre la traversée de ses compagnons."],["arjun","ARJUN RAO","Ingénieur des sceaux","Curieux, sceptique, méfiant envers les miracles.",6,24,"Désamorce un dispositif instable au dernier instant."],["freya","FREYA LIND","Cheffe des sentinelles","Fière, protectrice, respecte la discipline sans cruauté.",4,25,"Tient la position pendant le retrait des civils."],["nadia","NADIA HADDAD","Juge itinérante","Intransigeante sur les preuves, sensible aux petites injustices.",5,26,"Refuse de livrer les témoins aux assaillants."],["elias","ELIAS VOSS","Érudit des pactes","Tourmenté par ses fautes, déterminé à les réparer.",6,27,"Protège l'archive des serments durant le dernier affrontement."],["solene","SOLÈNE ARMAND","Capitaine des secours","Froide sous pression, tendre avec les enfants.",1,null,null],["amara","AMARA DIALLO","Diplomate des guildes","Désarme les disputes par l'écoute, tient à ses principes.",3,null,null],["soren","SØREN HALD","Maître des éclaireurs","Maladroit dans ses sentiments, méthodique sur le terrain.",5,null,null],["livia","LIVIA CONTI","Chroniqueuse municipale","Intègre, têtue, garde les noms que l'on voudrait effacer.",1,null,null],["meilin","MEILIN ZHAO","Apothicaire","Ingénieuse, prudente et courageuse sans le rechercher.",2,null,null]];
const intros={"1":"LIVIA note déjà chaque blessure et chaque victoire de la cité, persuadée que la mémoire importe plus que les statues. LUCIEN déplie une carte tachée de café ; SOLÈNE vérifie les lanternes des secours. YOUSSEF travaille à la forge avant que le soleil soit haut.","2":"ISHA patrouille sur les ponts, AMAKA compte les vivres, MEILIN prépare les herbes et KWAME apporte les nouvelles de la frontière. Personne n'ignore que son travail peut sembler banal jusqu'au jour où la cité en aura besoin.","3":"SAMIRA revient du nord, HANA dispute une caisse de pansements à un officier, AMARA s'entretient avec les guildes. MAILEIZ salue ces gens qu'elle connaît depuis longtemps : ils ont des vies hors de la guerre.","4":"REN fixe les cordes des arcs et ALINA inspecte les gonds de la porte. FREYA forme des recrues, prenant le temps de connaître chaque prénom.","5":"DIEGO plaisante avec INÈS à propos d'une charrette qui fuit. SØREN étudie le relief ; NADIA réclame les preuves d'une ancienne arrestation abusive.","6":"ARJUN refuse d'appeler miracle un sceau mal dessiné. ELIAS, l'air épuisé, apporte un manuscrit qu'il n'ose pas encore ouvrir."};
C.allies=Object.fromEntries(raw.map(([id,name,role,personality,entry,death,reason])=>[id,{id,name,role,personality,entry,death,reason,nature:"human"}]));
C.alliesFated=raw.filter(x=>x[5]!==null).map(x=>x[0]);
for(const [id,name] of raw){
 if(!C.roster[id])C.roster[id]={name,nature:"human",resource:"force",resourceLabel:"Force",initial:100};
}
const make=(id,episode,place,who,text,choices)=>({
 id,chapter:episode<=17?0:1,episode,arc:C.season.episodes[episode-1].arc,
 episodeTitle:C.season.episodes[episode-1].title,place,who,text,
 choices:choices.map(([label,hint,delta,flags,after])=>({label,hint,delta,flags,after}))
});
const entries=[];
for(const [ep,text] of Object.entries(intros)){
 const n=Number(ep),people=raw.filter(x=>x[4]===n);
 entries.push({episode:n,kind:"intro",scene:make("allies-intro-"+ep,n,"La cité — ses habitants","NARRATEUR",text,
 [["Partager un moment avec les habitants.","Les connaître avant qu'ils ne deviennent des noms dans un rapport.",{city:1,trust:1},["alliesIntroduced"+ep],"CHAYAH écoute leurs histoires. Une relation n'est pas un nombre : chacun poursuit ses propres projets."],
 ["Les aider dans leurs tâches.","Améliore leur préparation, sans supprimer tous les dangers futurs.",{city:1,defense:1},["alliesHelped"+ep],"Quelques heures passent en travaux, en soins et en plaisanteries. Ils n'oublieront pas ce geste."]])});
}
for(const [id,name,role,personality,entry,death,reason] of raw){
 if(death===null)continue;
 const scene=make("loss-"+id,death,"Au cœur du conflit — "+name,"NARRATEUR",
 name+", "+role.toLowerCase()+", a longtemps servi la cité. "+personality+" Aujourd'hui, alors que les ennemis frappent, "+reason.charAt(0).toLowerCase()+reason.slice(1)+" Un messager rapporte sa mort. Ce n'est ni un simple compteur ni un sacrifice exigé par CHAYAH : "+name+" a pris sa propre décision. Les survivants refusent que son nom soit oublié.",
 [
 ["Rester auprès des survivants et organiser les secours.","CHAYAH essaie de contenir sa colère et d'aider ceux qui restent.",{trust:1,city:1},["griefCare"+id],"CHAYAH veut rester. L'absence laisse une douleur vive ; elle ne s'efface pas avec un miracle."],
 ["Promettre de poursuivre les responsables.","La vengeance monte ; les habitants craignent ce qu'une divinité pourrait faire.",{trust:-1,intel:1},["griefHunt"+id],"Le silence de CHAYAH devient plus menaçant que ses paroles. Les ennemis ont provoqué quelque chose qu'ils ne comprennent pas."]
 ]);
 scene.loss=id;entries.push({episode:death,kind:"loss",scene});
}
const byEp=new Map();
for(const item of entries){const group=byEp.get(item.episode)||[];group.push(item);byEp.set(item.episode,group)}
const original=[...C.scenes];const result=[];
for(const ep of C.season.episodes){
 const current=original.filter(x=>x.episode===C.season.episodes.indexOf(ep)+1);
 const add=byEp.get(C.season.episodes.indexOf(ep)+1)||[];
 // Introductions happen early and deaths interrupt the episode, before its climax.
 const intro=add.filter(x=>x.kind==="intro").map(x=>x.scene);
 const loss=add.filter(x=>x.kind==="loss").map(x=>x.scene);
 result.push(...intro);
 if(loss.length){result.push(...current.slice(0,1),...loss,...current.slice(1))}
 else result.push(...current);
}
for(let i=0;i<result.length;i++){
 const scene=result[i],next=result[i+1]?.id;
 if(scene.choices&&next)scene.choices.forEach(c=>c.next=next);
 if(scene.battle&&next)scene.battle.next=next;
}
C.scenes=result;
for(let ep=1;ep<=C.season.episodes.length;ep++){
 C.season.episodes[ep-1].sceneIds=result.filter(x=>x.episode===ep).map(x=>x.id);
}
})();