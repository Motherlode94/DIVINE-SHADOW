(function extend175(){
"use strict";
const C=window.DS_CAMPAIGN,arcs=C?.extendedArcs;
if(!C?.season||C.season.episodes.length!==40||!Array.isArray(arcs)||arcs.length!==9)throw Error("135 épisodes: les neuf arcs doivent être chargés après l'épisode 40");
C.roster.sama={name:"SAMA",nature:"human",resource:"force",resourceLabel:"Force",initial:100};
C.enemies.ancien={name:"L'ENTITÉ ANTÉRIEURE",hp:210,damage:13,armor:4,desc:"Une loi vivante, antérieure à CHAYAH. Sa puissance n'est pas un simple score."};
const co=(label,hint,delta,flags,after,extra={})=>({label,hint,delta,flags,after,...extra});
const last=C.scenes[C.scenes.length-1];if(last.episode!==40)throw Error("La saison existante ne se termine pas à l'épisode 40");
last.ending=false;
last.choices=[
 co("Écouter les cités et aider à reconstruire.","La guerre militaire a laissé une paix incomplète.",{city:2,trust:1},["nouvelActeSecours"],"MARIN attend CHAYAH aux champs. Les quartiers n'ont pas encore retrouvé leurs morts."),
 co("Sécuriser les témoignages et reprendre l'enquête.","Les commanditaires ont encore des complices.",{intel:2,defense:1},["nouvelActePreuves"],"AETHER conserve les dossiers; un messager apporte des nouvelles des frontières.")
];
const approaches=[
 ["Aider les habitants à définir leurs priorités.","Préserver leur libre arbitre.",{city:2,trust:1},"CHAYAH travaille à leur côté sans réclamer de reconnaissance.",
  "Sécuriser les chantiers et les routes.","Les gardes seront moins disponibles ailleurs.",{defense:2,intel:1},"Le Général organise une garde mais manque de bras."],
 ["Accueillir les émissaires sans imposer d'allégeance.","Une ville sauvée reste libre.",{trust:2,council:1},"Les délégations fixent leurs propres conditions.",
  "Déployer une force préventive aux frontières.","Accélère la défense mais inquiète les neutres.",{defense:2,trust:-1},"Les troupes avancent; les cités neutres demandent des garanties."],
 ["Protéger les témoins et recouper les faits.","Les preuves priment sur la colère.",{intel:2,trust:1},"AETHER distingue les récits des faits établis.",
  "Interrompre immédiatement l'opération clandestine.","Empêche un danger mais expose les témoins.",{defense:2,trust:-1},"Les conspirateurs prennent la fuite et effacent des traces."],
 ["Parler franchement sans promettre l'impossible.","Ne pas décider à la place de SAMA ou MAILEIZ.",{trust:1,maileiz:1},"CHAYAH reconnaît son trouble au lieu d'accuser les autres.",
  "Se réfugier dans le silence pour ne blesser personne.","Le silence n'est pas forcément une protection.",{trust:-1,maileiz:-1},"Les non-dits deviennent plus lourds sans que SAMA puisse les deviner."],
 ["Écouter le frère mais vérifier chaque pacte.","Comprendre ne signifie pas approuver.",{intel:2,aether:1},"AETHER observe les signes tandis que le frère répond aux questions.",
  "Fermer les voies des entités avant de discuter.","Protège les civils mais détruit des pistes.",{defense:2,energy:-9},"Le sceau se referme en brûlant la peau de CHAYAH."],
 ["Protéger les évacuations sous le commandement du Général.","Les civils d'abord.",{city:2,defense:1},"Le Général organise les colonnes pendant que les blessés avancent.",
  "Contre-attaquer et reprendre une position stratégique.","Peut coûter des blessés et des ressources.",{defense:2,city:-2},"La ligne ennemie recule, mais les secouristes manquent de gardes."],
 ["Observer les lois sans les déformer prématurément.","Protéger les témoins et la connaissance.",{intel:2,aether:1},"AETHER consigne ce qui peut réellement être vérifié.",
  "Installer un périmètre de sceaux énergétiques.","Risque de révéler votre présence.",{defense:2,energy:-8},"L'air tremble autour des sceaux et les habitants ressentent la pression."],
 ["Évacuer les mortels et contenir les premières distorsions.","L'immortalité ne supprime pas la douleur.",{city:2,energy:-7},"CHAYAH place les témoins à l'abri, même quand ses os protestent.",
  "Interroger directement l'Ancien par l'intermédiaire d'AETHER.","Une loi inconnue peut avoir un prix.",{intel:2,energy:-7},"AETHER découvre une faille qu'il ne peut pas encore nommer."],
 ["Réparer ce que les mortels peuvent encore réparer.","La paix nécessite des actes plutôt que des promesses.",{city:2,trust:1},"Les habitants répondent avec leurs propres projets.",
  "Confier les décisions futures aux Conseils indépendants.","La liberté des cités l'emporte sur la puissance du dieu.",{council:2,trust:1},"Les villes votent leurs lois sans demander une autorisation divine."]
];
for(let a=0;a<arcs.length;a++){
 const arc=arcs[a],actions=approaches[a];
 if(arc.rows.length!==15)throw Error("Arc incomplet "+arc.arc);
 for(let j=0;j<15;j++){
  const ep=41+a*15+j,id="season175-"+ep,[title,place,hook]=arc.rows[j],common={episode:ep,chapter:ep<86?0:1,arc:arc.arc,episodeTitle:title};
  const sceneIds=[];
  const intro={...common,id:id+"-arrivee",place,who:"NARRATEUR",text:hook+" "+arc.mood+" CHAYAH n'est pas le seul acteur de ce monde: le choix des habitants et les décisions des Conseils modifient la suite.",choices:[
   co(actions[0],actions[1],actions[2],[id+"-agir"],actions[3]),
   co(actions[4],actions[5],actions[6],[id+"-prudence"],actions[7])
  ]};
  const second={...common,id:id+"-tension",place:place+" — tournant",who:arc.who,
   text:hook+" Derrière chaque situation se trouvent des témoins qui ne disparaissent pas une fois la décision prise. "+arc.mood,
   choices:[
    co("Protéger les personnes et leur droit de décider.","Le secours ne remplace pas le consentement.",{city:1,trust:1},[id+"-personnes"],"Les habitants demandent des protections durables plutôt qu'une démonstration divine."),
    co("Prendre l'initiative malgré les risques.","Les blessures et la confiance peuvent en payer le prix.",{defense:2,energy:-5,trust:-1},[id+"-risque"],"CHAYAH accélère l'action. Ses proches lui rappellent que la force ne donne pas toujours raison.",{defianceRisk:j%4===0&&ep>50})
   ]};
  if(ep===98||ep===109){
    second.text="SAMA questionne CHAYAH sur ses sentiments: aime-t-il quelqu'un d'autre? Elle ignore les sentiments réciproques entre CHAYAH et MAILEIZ tant qu'il ne lui en a rien dit ou qu'elle n'en a pas obtenu la preuve.";
    second.choices=[
     co("Dire à SAMA la vérité sur MAILEIZ.","Elle choisira librement sa réaction.",{trust:1,maileiz:1},["samaConnaîtMaileiz",id+"-aveu"],"CHAYAH lui parle. SAMA demande du temps et n'accorde aucun pardon automatique."),
     co("Garder ce sentiment secret.","La connaissance de SAMA ne peut pas apparaître comme par magie.",{trust:-2,maileiz:-1},[id+"-silence"],"SAMA ignore toujours la vérité, mais remarque la distance de CHAYAH.")
    ];
  }
  if(ep===150){
    second.text="ÉPISODE 150 — Une entité plus vieille que CHAYAH attend devant le seuil. AETHER peut étudier ses lois, non les abolir. CHAYAH peut dévoiler une part de sa puissance véritable; son immortalité ne le protège ni des fractures du corps ni des conséquences sur le monde.";
    second.choices=[
     co("RÉVÉLER une part profonde de la puissance de CHAYAH.","30 énergie et lésions durables; la réalité gardera une cicatrice.",{energy:-30,injuryLevel:2,trust:1},["pouvoirRevele150"],"Les lois s'ouvrent sous les mains de CHAYAH. Des dizaines de vies sont sauvées, mais la contradiction déchire ses muscles et laisse une faille dans le ciel."),
     co("RETENIR cette puissance et coopérer avec AETHER.","Conserve le secret mais expose les remparts et les blessés.",{energy:-15,city:-5,defense:-2},["pouvoirRetenu150"],"AETHER élève une construction énergétique. Les civils sont évacués, mais certains gardes tombent.")
    ];
  }
  let third,after;
  const selectedBattles={
 45:"legion",50:"legion",
 60:"beasts",66:"beasts",70:"legion",
 80:"cursed",84:"cursed",
 105:"cursed",112:"cursed",115:"cursed",
 119:"legion",122:"beasts",124:"cursed",126:"legion",129:"legion",
 143:"cursed",144:"cursed",
 150:"ancien",
 169:"beasts"
 };
 const battleEnemy=selectedBattles[ep];
 const battle=Boolean(battleEnemy);
  if(battle){
   third={...common,id:id+"-bataille",place:place+" — attaque",who:"NARRATEUR",text:hook+" La tension s'embrase: des formations ennemies attaquent la position, chacune sous un commandement. CHAYAH doit choisir quand attaquer ou se faire bouclier pour protéger les mortels. Chaque technique consomme de l'énergie et peut blesser son corps immortel.",battle:{enemy:battleEnemy,turnLimit:11,next:null}};
   after={...common,id:id+"-apres",place:place+" — conséquences",who:arc.who,text:"Les formations se replient. Les survivants doivent encore secourir leurs camarades; une victoire ne fait pas revivre les morts.",choices:[
    co("Soigner les blessés des deux camps.","Préserver des vies après la bataille.",{city:2,trust:1},[id+"-soin"],"SELMA et les secours prennent les blessés en charge."),
    co("Préserver les preuves et sécuriser les routes.","Empêcher une nouvelle attaque.",{intel:2,defense:1},[id+"-preuve"],"Les éclaireurs isolent les sceaux et consignent les ordres ennemis.")
   ]};
  }else{
   third={...common,id:id+"-consequences",place:place+" — conséquences",who:arc.who,text:"Les personnes concernées continuent de vivre avec les décisions de CHAYAH. "+hook+" "+arc.mood,choices:[
    co("Aider ceux qui subiront les conséquences.","Le temps et l'attention comptent autant que l'énergie.",{city:1,trust:1},[id+"-suite-civils"],"Les habitants organisent une réponse à leur mesure."),
    co("Préparer la suite des investigations ou des opérations.","Le risque demeure au prochain épisode.",{intel:1,defense:1},[id+"-suite-enquete"],"Un dossier ou une carte passe aux mains des responsables.")
   ]};
  }
  if(ep===100){third.textIfSamaAware="SAMA sait que CHAYAH éprouve des sentiments pour MAILEIZ. Elle refuse de confondre une excuse avec le pardon.";third.textIfSamaUnaware="SAMA ne connaît toujours pas l'histoire avec MAILEIZ; elle perçoit une distance sans pouvoir lire ses pensées.";}
  if(ep===151||ep===155||ep===160){const sc=after||third;sc.textIfPowerRevealed="La révélation de CHAYAH a laissé des blessures dans sa chair et des cicatrices dans le monde. AETHER ne prétend pas pouvoir les effacer.";sc.textIfPowerHidden="CHAYAH n'a pas dévoilé cette part de sa puissance. Les blessés du seuil rappellent le prix de ce choix.";}
  if(ep===170||ep===175){third.textIfMaileizDead="MAILEIZ est morte dans cette continuité. Les survivants honorent sa mémoire sans parler en son nom.";third.textIfMaileizAlive="MAILEIZ, mortelle et libre, décide seule de son avenir; CHAYAH ne lui impose pas de destin.";}
  const elements=[intro,second,third,...(after?[after]:[])];
  // L'arc sentimental change si MAILEIZ est morte dans la continuité impitoyable.
  // Aucun PNJ décédé ne réapparaît pour accomplir une action dans un épisode ultérieur.
  if([88,91,92,95,100,165].includes(ep)){
   const mourning="Dans cette continuité, MAILEIZ est morte pendant les attaques. Les gens évoquent ses décisions, sa liberté et son absence, sans lui prêter de nouvelles paroles ni de nouveaux actes. CHAYAH traverse ce lieu avec le souvenir de son amour, tandis que SAMA conserve sa propre autonomie.";
   for(const sc of elements)if(!sc.textIfMaileizDead)sc.textIfMaileizDead=mourning+" "+arc.mood;
  }
  for(const sc of elements){C.scenes.push(sc);sceneIds.push(sc.id);}
  C.season.episodes.push({title,arc:arc.arc,sceneIds});
 }
}
const final=C.scenes[C.scenes.length-1];
final.ending=true;delete final.choices;
final.text+=" MARIN retourne à ses terres. SAMA et MAILEIZ, si elles vivent, conservent leur libre arbitre. Les cités ont leur avenir. La fin de la saison n'efface pas les pertes.";
for(let i=0;i<C.scenes.length;i++){const x=C.scenes[i],next=C.scenes[i+1]?.id;if(!next)continue;if(x.choices)x.choices.forEach(c=>c.next=next);if(x.battle)x.battle.next=next;}
C.season.totalEpisodes=C.season.episodes.length;
C.season.phaseBreaks=[40,55,70,85,100,115,130,145,160,175];
if(C.season.totalEpisodes!==175)throw Error("Saison incomplète: "+C.season.totalEpisodes);
})();