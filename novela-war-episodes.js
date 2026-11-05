/* 13 episodes supplementaires, scenarios relies aux cités */
(()=>{
const C=window.DS_CAMPAIGN;if(!C?.war||!C?.season)return;
const rows=[
[28,"LES APPELS DE VALÉDOR","VALÉDOR","Une messagère blessée arrive : les légions des Cendres assiègent les écoles de VALÉDOR. Il faut envoyer des soldats, mais les remparts de CHAYAH seront affaiblis.","La cavalière déroule une carte du fleuve. Les élèves et les familles attendent encore l'évacuation.","valedor1",null],
[29,"LES BANNIÈRES DE KARTHOS","La Passe des Trois Roches","Trois groupes de soldats humains avancent sous les ordres de DRAEVEN. Le général exécute une directive portant un sceau mystique, visant le ravitaillement des défenseurs.","Les porteurs et les archers avancent ensemble. La bataille ne sera pas un duel : elle concerne la route des réfugiés.",null,"legion"],
[30,"LE PORT DES NEUTRES","BRUMELAC","La ville neutre de BRUMELAC voit ses quais encerclés par des créatures. Sa déléguée demande de l'aide sans renoncer à l'indépendance du port.","Les guildes ferment les entrepôts. Des bateaux cherchent à quitter la baie tandis que des rugissements montent des brumes.","brumelac1",null],
[31,"LA DAME DES MEUTES","Marais d'Ardoise","MORTHYS commande des monstres en deux groupes de six. Des balises mystiques leur permettent de contourner les défenseurs.","Des familles attendent sous les passerelles. Il faut secourir les survivants puis interrompre le commandement ennemi.",null,"beasts"],
[32,"LES GRENIERS DE SOLENNE","SOLENNE","Un ambassadeur de SOLENNE demande une escorte : les légions brûlent les champs pour affamer les cités alliées.","Des moissonneurs protègent leurs dernières gerbes ; les greniers nourrissent plus d'une ville.","solenne1",null],
[33,"LES BIENFAITEURS DU MATIN","Tribunal public","CALDRA VOSS nourrit les pauvres devant les journalistes. EDRIC MORN finance les orphelinats. Leurs agents nocturnes payent les groupes armés.","AETHER découvre des quittances suspectes. Les témoins craignent de dénoncer ceux dont ils dépendent pour manger.",null,null],
[34,"LES MINEURS D'ASTERNE","ASTERNE","Les mineurs d'ASTERNE, cité neutre, sont acculés par les cohortes maudites. Un messager supplie CHAYAH de défendre les galeries.","Des enfants attendent dans les conduits de ventilation. Le Général avertit : une opération ici exposera les routes du nord.","asterne1",null],
[35,"LE GÉNÉRAL DES SERMENTS","Mine du Sceau","VELKHAR déplace trois cohortes maudites de cinq unités par des ordres mystiques. Détruire un soldat ne suffit pas à briser le rituel.","Les mineurs remontent lentement. AETHER cherche la source des ordres pendant que CHAYAH protège le passage.",null,"cursed"],
[36,"LA JUSTICE DE FAÇADE","Archives du Prélat","PRÉLAT VARESS prononce des sentences publiques en faveur des victimes. Dans les caves, ses scribes transmettent des mandats mystiques aux généraux.","Les registres rapprochent VARESS, CALDRA et EDRIC. Le Conseil réclame des preuves capables de tenir devant un tribunal.",null,null],
[37,"LE SECOND SIÈGE DE VALÉDOR","VALÉDOR","VALÉDOR appelle une deuxième fois : les cohortes maudites attaquent après le départ des légions humaines. La ville se souvient si CHAYAH a répondu au premier message.","Des familles se cachent dans les écoles. Les défenseurs n'ont presque plus de réserves.","valedor2",null],
[38,"LA DERNIÈRE MARÉE","BRUMELAC","BRUMELAC a tenté de rester neutre, mais une légion approche par la côte. Les guildes demandent une seconde intervention, sans vouloir devenir un territoire conquis.","Les dockers escortent leurs enfants vers les navires. Les banques de KARTHOS alimentent la flotte ennemie.","brumelac2",null],
[39,"LA CHUTE DES MASQUES","Grand Tribunal","Les notables accusés comparaissent. Leurs discours de justice se heurtent aux preuves des attaques nocturnes. CHAYAH doit décider entre un jugement public et une intervention plus brutale.","Des survivants des six villes attendent devant le tribunal, mais les preuves demeurent imparfaites et contestées.",null,null],
[40,"LES CITÉS SE SOUVIENNENT","Assemblée des Six Cités","Alliés et neutres arrivent au Conseil. Chaque refus, chaque secours et chaque bataille a laissé une trace. Les ennemis vaincus ne représentent pas tous les habitants de leurs villes.","AETHER demande une paix fondée sur les faits. Le Général rappelle que les frontières resteront dangereuses, quelle que soit la décision finale.",null,null]
];
function choice(label,hint,delta,flags,after,extra){return {label,hint,delta,flags,after,...extra}}
for(const row of rows){
 const [ep,title,place,opening,follow,request,battle]=row,info={title,arc:ep<=32?"LA GUERRE DES CITÉS":ep<=38?"LES ORDRES DU VOILE":"LES FINS DU SERMENT",sceneIds:[]};
 const start={id:"front-"+ep+"a",episode:ep,chapter:1,arc:info.arc,episodeTitle:title,place,who:"NARRATEUR",text:opening,choices:[]};
 if(request){start.request=request;start.choices=[choice("Écouter les émissaires et consulter la carte.","Les renforts seront décidés dans cette situation.",{intel:1},["heard-"+request],"Le Général évalue les troupes disponibles et les voies de retraite.")]}
 else if(ep===39){start.choices=[
 choice("Rassembler les témoins et exiger un procès public.","La justice doit reposer sur des preuves.",{trust:3,council:2},["trial"],"Le tribunal ouvre une audience contradictoire."),
 choice("Saisir les comptes des conspirateurs.","Affaiblir leur financement, au risque de la défiance.",{defense:2,trust:-2},["seizure"],"Les biens suspects passent sous contrôle du Conseil."),
 choice("Confronter personnellement les commanditaires.","La colère de CHAYAH peut s'opposer à la justice.",{energy:-15,intel:1},["divineTrial"],"AETHER refuse de confondre la puissance avec la vérité.")]}
 else if(ep===40){start.choices=[
 choice("Proposer une ligue de cités libres.","Respecter l'indépendance des villes neutres.",{trust:3,council:2},["league"],"Les représentants débattent des conditions d'une défense mutuelle."),
 choice("Consacrer le trésor à la reconstruction.","Protéger les survivants et les récoltes.",{city:3,trust:1},["rebuild"],"Des convois d'outils et de nourriture partent vers les cités endommagées."),
 choice("Poursuivre les généraux encore actifs.","La paix sera retardée, mais le risque militaire diminue.",{defense:2,intel:1},["pursue"],"Le Général met les éclaireurs en alerte.")]}
 else {start.choices=[
 choice("Protéger les civils et préparer les routes.","Réduit la pression sur les populations.",{city:2,defense:1},["protect-"+ep],"Les habitants gagnent les abris et le Général adapte les formations."),
 choice("Rechercher les ordres et la chaîne de commandement.","Une enquête sur les responsables.",{intel:2,trust:1},["investigate-"+ep],"AETHER conserve les témoignages et les documents.")]}
 const next={id:"front-"+ep+"b",episode:ep,chapter:1,arc:info.arc,episodeTitle:title,place:place+" — conséquences",who:"NARRATEUR",text:follow,choices:[]};
 if(battle){next.battle={enemy:battle,turnLimit:10,next:null}}
 else if(ep===40){next.ending=true}
 else {next.choices=[
 choice("Soutenir les survivants et les blessés.","Chaque ville compte les conséquences.",{city:2,trust:1},["survivors-"+ep],"SELMA et les habitants coordonnent les soins."),
 choice("Garder les preuves et poursuivre l'enquête.","Préserver les traces du complot.",{intel:2},["records-"+ep],"Les archives consignent les faits vérifiés.")]}
 C.scenes.push(start,next);C.season.episodes.push(info);
}
// L'ancien épilogue de l'épisode 27 devient la fin du premier acte, pas de la saison.
const oldFinal=C.scenes.find(scene=>scene.id==="s18");
if(oldFinal){
 oldFinal.ending=false;
 oldFinal.text+=" Alors qu'ÉLÉAONOR ferme la séance, six messagers surgissent aux portes du Conseil. Les cités voisines demandent audience : la guerre déborde désormais les frontières.";
 oldFinal.choices=[
  {label:"Recevoir les délégations des cités voisines.",hint:"Ouvre la guerre des cités sans interrompre la campagne.",delta:{intel:1,council:1},flags:["citesAttendues"],after:"Le Conseil réserve un siège à chaque cité, même neutre, et prépare les cartes des frontières."},
  {label:"Ordonner d'abord un bilan des pertes et des réserves.",hint:"La cité doit connaître ses moyens avant d'accueillir de nouveaux fronts.",delta:{defense:1,trust:1},flags:["bilanAvantFrontiere"],after:"Le Général rassemble les comptes des soldats, et SELMA remet la liste des blessés."}
 ];
}
for(let i=0;i<C.scenes.length;i++){
 const x=C.scenes[i],next=C.scenes[i+1]?.id;
 if(x.choices&&next)x.choices.forEach(a=>a.next=next);
 if(x.battle&&next)x.battle.next=next;
}
for(let ep=1;ep<=C.season.episodes.length;ep++)C.season.episodes[ep-1].sceneIds=C.scenes.filter(s=>s.episode===ep).map(s=>s.id);
C.season.totalEpisodes=C.season.episodes.length;
})();
