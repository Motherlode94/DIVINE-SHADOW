/* Saison 1 : 27 épisodes scénarisés, chacun en plusieurs scènes.
   Conserve les mécanismes historiques mais réordonne les événements de manière causale.
   Continuité exploratoire : ni canon, ni promesse de 25 heures de contenu. */
(() => {
 const C=window.DS_CAMPAIGN;if(!C) return;
 const original=new Map(C.scenes.map(s=>[s.id,s]));
 const s=(place,who,text,choices)=>({place,who,text,choices:choices.map(([label,hint,delta,flags,after])=>({label,hint,delta:delta||{},flags:flags||[],after}))});
 const E=[
 {title:"AVANT LES SIRÈNES",arc:"LES VISAGES DE LA CITÉ",scenes:[
 s("Les toits au matin","NARRATEUR","Avant la guerre, il y avait les matins ordinaires : le pain qui brûle dans les fours, les enfants qui traversent les placettes, les charretiers qui jurent en remontant la pente. La ville de CHAYAH ne sait pas encore qu'elle comptera bientôt ses morts. Il l'observe depuis une terrasse sans se montrer. Sous ses yeux, des vies qui n'ont rien demandé à un dieu.",[
 ["Descendre dans les rues sans escorte.","Écouter ce que vivent les habitants.",{city:1,trust:1},["visiteIncognito"],"CHAYAH mêle ses pas aux passants. Personne ne s'incline ; il découvre ce qu'ils craignent vraiment."],
 ["Rejoindre AETHER pour comprendre l'état du royaume.","Une analyse politique avant les événements.",{aether:1,intel:1},["consultation"],"AETHER referme son livre et rejoint CHAYAH. « Tu veux des chiffres ? Je te montrerai surtout des noms. »"]]),
 s("La fontaine des artisans","MIREN","MIREN, aubergiste, réclame des réparations à la fontaine dont l'eau se trouble chaque nuit. Autour d'elle, les artisans se disputent le coût des travaux. Aucun démon ne se cache derrière chaque problème : certaines injustices sont parfaitement humaines.",[
 ["Financer la réparation sans réclamer de reconnaissance.","Un service discret, mais pas une solution à tous les problèmes.",{city:2},["fontaine"],"Les ouvriers reprennent le chantier ; MIREN demande au dieu de revenir comme client, pas comme sauveur."],
 ["Demander aux habitants de choisir eux-mêmes la priorité.","Respecter leur organisation et écouter leurs besoins.",{trust:2,city:1},["assemblee"],"Les habitants votent. Leur décision n'est pas celle que CHAYAH aurait prise, et c'est précisément ce qui la rend importante."]])]},
 {title:"LES MAINS DE LA VILLE",arc:"LES VISAGES DE LA CITÉ",scenes:[
 s("Le dispensaire des bas quartiers","SELMA","Une odeur de savon et d'herbes médicinales monte du dispensaire. SELMA manque d'aide ; la garde a réquisitionné une partie de ses réserves. À la porte, un ouvrier vient de se blesser en portant des pierres. Le quotidien est déjà une lutte.",[
 ["Rendre les fournitures au dispensaire.","SELMA pourra préparer des soins en cas de crise.",{city:2,trust:1},["reserveMedicale"],"SELMA range les pansements retrouvés. « Ce dont j'ai besoin, c'est qu'on se souvienne de nous demain. »"],
 ["Négocier avec la garnison le partage des stocks.","Équilibrer les besoins civils et militaires.",{defense:1,council:1},["partageStocks"],"Un compromis fragile est trouvé ; aucun service n'obtient tout ce qu'il demandait."]]),
 s("Le relais des messagers","TOMAS","TOMAS ramène les plis du marché nord et signale des retards inhabituels sur la route des Cendres. Il n'a vu ni armée ni bannière, seulement des voyageurs qui refusent d'expliquer pourquoi ils rebroussent chemin.",[
 ["Faire vérifier les routes sans inquiéter la population.","Une prudence utile, mais du temps consommé.",{intel:1,defense:1},["routeSurveillee"],"Deux sentinelles partent à cheval. TOMAS, inquiet, insiste pour accompagner l'une d'elles."],
 ["Demander des témoignages aux voyageurs.","Les récits sont incomplets, mais leurs contradictions comptent.",{intel:2,clock:1},["temoinsRoute"],"Certains parlent de fumée ; d'autres d'un silence étrange. CHAYAH refuse de confondre les deux."]])]},
 {title:"UNE MORTELLE ET UN DIEU",arc:"LES VISAGES DE LA CITÉ",scenes:[
 s("Terrain d'entraînement","MAILEIZ","MAILEIZ s'entraîne avec des soldats depuis l'aube. Elle rate volontairement une parade pour apprendre à tomber sans se blesser. Elle est mortelle, elle le sait et n'en éprouve aucune honte. CHAYAH l'observe trop longtemps ; elle le remarque aussitôt.",[
 ["Lui proposer un duel d'entraînement loyal.","La force brute ne remplace pas le respect.",{maileiz:2,trust:1},["entrainement"],"Elle remporte la première touche et sourit. « Même toi, tu peux perdre une manche. »"],
 ["Lui demander pourquoi elle s'expose autant.","Elle peut répondre sans chercher à le rassurer.",{maileiz:1,intel:1},["questionMaileiz"],"« Parce que j'existe en dehors de ton regard », dit-elle. Sa franchise demeure avec lui."]]),
 s("Promenade au jardin des orangers","MAILEIZ","L'après-midi, MAILEIZ parle de sa famille, des chemins qu'elle aurait voulu emprunter et des jours qu'elle ne retrouvera jamais. CHAYAH sent ses mots peser davantage que ses pouvoirs. Entre eux, il existe de l'amour, et une hésitation qui n'a pas encore de nom.",[
 ["Lui dire qu'il l'aime sans promettre l'éternité.","Un aveu sincère ne supprime pas les contradictions.",{maileiz:2,trust:1},["aveuJardin"],"Elle prend sa main puis la relâche. « Je te crois. Mais cela ne répond pas encore à tout. »"],
 ["Lui avouer qu'il craint de la perdre.","La vulnérabilité n'oblige pas MAILEIZ à le consoler.",{maileiz:1,trust:1},["peurPerte"],"Elle lui répond doucement : « Alors ne transforme pas ta peur en cage. »"]])]},
 {title:"LE REGISTRE DES ABSENTS",arc:"LES VISAGES DE LA CITÉ",scenes:[
 s("Bibliothèque de l'Archiviste","AETHER","AETHER présente à CHAYAH une colonne de noms rayés d'un registre civil. Personne n'a disparu du monde : des familles ont quitté la ville sans déclarer leur départ. Pourtant, plusieurs ont emprunté la même route.",[
 ["Comparer les départs avec les taxes du marché.","Une enquête patiente et vérifiable.",{intel:2,aether:1},["registresTaxes"],"AETHER souligne trois dates. Les départs ont précédé l'arrivée d'un mystérieux convoi."],
 ["Interroger les autorités qui ont signé les registres.","Peut susciter la méfiance politique.",{intel:1,council:-1},["audition"],"Un greffier hésite avant de répondre. AETHER note soigneusement ce qu'il ne sait pas."]]),
 s("Terrasse des Archives","AETHER","À la tombée du jour, les deux meilleurs amis contemplent les lumières du quartier populaire. AETHER se moque doucement des silences de CHAYAH au sujet de MAILEIZ. Mais dès que la conversation devient sérieuse, il n'hésite pas à le contredire.",[
 ["Admettre que MAILEIZ n'a pas une éternité à attendre.","Respecter son temps et son autonomie.",{maileiz:1,aether:2,trust:1},["lucidite"],"AETHER sourit : « Voilà une vérité qu'aucune puissance n'avait besoin d'inventer. »"],
 ["Parler de l'enquête plutôt que de ses sentiments.","L'amitié demeure, la question reste ouverte.",{intel:1,aether:0},["detour"],"AETHER ne force pas la confidence. Il garde cependant la remarque pour une autre nuit."]])]},
 {title:"LES AMBITIONS DU CONSEIL",arc:"LES VISAGES DE LA CITÉ",scenes:[
 s("Salle des audiences","ÉLÉAONOR","ÉLÉAONOR reçoit un marchand de grain, deux officiers et une délégation de lavandières. Chacun demande une priorité différente. Elle ne se prétend pas infaillible, mais refuse qu'une décision du Conseil puisse condamner un quartier sans le consulter.",[
 ["Soutenir une audience publique.","Les habitants participent aux décisions.",{city:2,council:1,trust:1},["audience"],"ÉLÉAONOR ouvre les portes. Les voix se heurtent, puis une proposition commune finit par émerger."],
 ["Proposer une commission restreinte en attendant les preuves.","Réponse plus rapide, moins transparente.",{council:2,intel:1},["commission"],"Elle accepte à condition que les conclusions soient rendues publiques ensuite."]]),
 s("Escalier du Conseil","LE GÉNÉRAL","Le Général étudie les rotations de ses hommes. Plusieurs garnisons manquent d'entraînement ; les dépenses ont été détournées vers des cérémonies. Il veut éviter la guerre, mais ne croit pas que les ennemis aient les mêmes intentions.",[
 ["Réorganiser les postes de garde avant toute fête.","Anticiper sans déclencher la panique.",{defense:2,council:1},["postesReformes"],"Les compagnies changent de position. La mesure dérange quelques courtisans, mais rassure les veilleurs."],
 ["Financer l'entraînement des réservistes.","La protection demande du temps et des efforts humains.",{defense:2,clock:1},["reservistes"],"Le Général répond : « L'armure ne suffit pas. Un soldat doit savoir pourquoi il protège. »"]])]},
 {title:"LA COUR DES MASQUES",arc:"LES VISAGES DE LA CITÉ",scenes:[
 s("Galerie des miroirs","SERAPHYRA","SERAPHYRA accompagne CHAYAH devant les portraits d'anciennes divinités. Elle parle de devoir, de mémoire et des mensonges que l'on se raconte pour préserver une apparence. Elle appartient à sa famille divine, sans parenté biologique. Elle ne dévoile rien de ce qu'elle garde pour elle.",[
 ["Écouter sans réclamer ses secrets.","Le respect peut précéder les confidences.",{trust:1},["respectSeraphyra"],"Elle le remercie avec une politesse trop parfaite pour être transparente."],
 ["Lui demander de surveiller les intrigues du Conseil.","Une alliance prudente autour de l'enquête.",{intel:1,council:1},["veilleCour"],"SERAPHYRA accepte, mais précise qu'elle choisira elle-même ce qu'elle rapportera."]]),
 s("Le jardin après la pluie","SERAPHYRA","Au bord d'une vasque, SERAPHYRA aperçoit MAILEIZ rire avec un garde. L'émotion traverse son visage avant qu'elle ne reprenne sa contenance. CHAYAH peut interpréter ce geste ; il ne peut pas lire un sentiment comme une preuve.",[
 ["Ne pas la confronter sur ce regard.","Préserver l'intimité d'autrui.",{trust:1},["discretion"],"SERAPHYRA remet son masque de courtoisie. Un silence demeure entre eux."],
 ["Lui demander si quelque chose la préoccupe.","Une question honnête, qu'elle peut refuser.",{maileiz:0,trust:1},["seraphyraQuestion"],"« Beaucoup de choses me préoccupent », répond-elle. Elle ne va pas plus loin."]])]},
 {title:"UN VISAGE À LA FENÊTRE",arc:"LES VISAGES DE LA CITÉ",scenes:[
 s("Auberge des Quatre Vents","MIREN","Un inconnu paie sa chambre avec une pièce frappée d'un blason inconnu. MIREN n'appelle pas immédiatement la garde : elle a appris à distinguer les fugitifs des criminels. Mais cette monnaie trouble les clients.",[
 ["Parler au voyageur sans le menacer.","Une possibilité de révéler une piste.",{intel:2,trust:1},["voyageur"],"L'homme parle d'un dépôt abandonné sur la route des Cendres, puis demande à être laissé tranquille."],
 ["Confier l'enquête discrète à TOMAS.","Des informations sans provoquer de confrontation.",{intel:1,defense:1},["filatureConvoi"],"TOMAS accepte, bien qu'il ne soit pas un soldat. Il sait se rendre invisible dans une foule."]]),
 s("Atelier des scellés","NADIR","NADIR découvre un sceau commercial reproduit à l'encre sur un parchemin très ancien. À première vue, il ne prouve aucune trahison. Il semble néanmoins destiné à tromper une personne habituée à reconnaître les originaux.",[
 ["Comparer le document aux archives d'AETHER.","Préserver la chaîne des preuves.",{intel:2,aether:1},["sceauCompare"],"Une légère différence de gravure apparaît. Quelqu'un a voulu que ce soit presque parfait."],
 ["Avertir ÉLÉAONOR avant d'identifier le faussaire.","Une alerte institutionnelle sans nommer de coupable.",{council:1,trust:1},["alerteSceau"],"ÉLÉAONOR ordonne de surveiller les accès aux dépôts plutôt que d'arrêter des innocents."]])]},
 {title:"LA FÊTE DES DEUX LUNES",arc:"LES PREMIÈRES CENDRES",scenes:[
 s("Préparatifs de la réception","NARRATEUR","La grande réception s'annonce comme un refuge hors des inquiétudes. Le Général doute de la sécurité des portes ; ÉLÉAONOR veut offrir un peu de paix aux habitants. Dans les cuisines, SELMA aide une servante blessée au lieu de rejoindre les invités. La fête révèle autant la cité que ses fractures.",[
 ["Soutenir la fête tout en maintenant les veilleurs.","Un équilibre entre célébration et préparation.",{city:1,defense:1},["fetePrudente"],"Les lanternes sont allumées, mais des soldats restent de garde aux accès."],
 ["Rester au jardin avec MAILEIZ avant la cérémonie.","Un moment personnel avant la crise.",{maileiz:2},["jardinAvantFete"],"Le temps semble ralentir. MAILEIZ exige seulement que CHAYAH lui parle sans détour."]]),
 "s01"]},
 {title:"LE MESSAGER ÉPUISÉ",arc:"LES PREMIÈRES CENDRES",scenes:[
 s("Escalier du Palais","TOMAS","TOMAS s'effondre sur une marche. Son cheval est resté sur la route et la manche du jeune homme est coupée. La peur dans ses yeux n'est pas feinte. Il a vu des fourgons bloquer le chemin du marché, pas encore une armée.",[
 ["Lui laisser le temps de décrire les faits.","Un témoignage fiable plutôt qu'une rumeur.",{intel:2,trust:1},["temoignageTomas"],"TOMAS finit par donner l'heure exacte et la couleur des bannières. On peut vérifier ses dires."],
 ["Faire partir deux éclaireurs pendant qu'il reçoit des soins.","Une réaction rapide sans sacrifier le messager.",{defense:2,city:1},["eclaireurs"],"Deux cavaliers disparaissent dans la rue ; SELMA mène TOMAS à l'infirmerie."]]),
 s("Balcon des lanternes","MAILEIZ","MAILEIZ retire sa tenue de réception pour revêtir son équipement. Elle rappelle à CHAYAH qu'elle connaît mieux que lui certains quartiers bas. Au-dehors, des cloches sonnent, non pour l'attaque, mais pour appeler les gardes.",[
 ["Accepter de suivre son itinéraire.","Faire confiance à son expérience.",{maileiz:2,defense:1},["itineraireMaileiz"],"Elle prend la tête vers le marché. CHAYAH découvre qu'il ne doit pas toujours guider."],
 ["Demander une escorte pour le groupe.","Plus de protection, mais un déplacement ralenti.",{defense:2,clock:1},["escorte"],"MAILEIZ accepte la présence des gardes, non parce qu'elle est faible, mais parce qu'ils protègent aussi les civils."]])]},
 {title:"LE MARCHÉ NORD",arc:"LES PREMIÈRES CENDRES",scenes:[
 "s02",
 s("L'auberge ouverte","MIREN","Des familles arrivent une à une. MIREN ne demande ni origine ni allégeance. Sa salle devient un refuge, et les habitants apportent du pain, des couvertures et des récits contradictoires sur l'ennemi.",[
 ["Organiser les soins avec SELMA.","Éviter que la panique ne devienne un second danger.",{city:2},["soinsMarche"],"Le dispensaire établit une liste de blessés ; personne ne peut prétendre que la crise n'existe pas."],
 ["Envoyer TOMAS prévenir les fermes.","Permettre aux familles isolées de se mettre à l'abri.",{city:1,intel:1},["alerteFermes"],"Le messager repart avec l'angoisse de devoir revenir par la même route."]])]},
 {title:"LA ROUTE INTERDITE",arc:"LES PREMIÈRES CENDRES",scenes:[
 s("Porte du sud","LE GÉNÉRAL","Le Général interdit temporairement le passage des chariots. Une marchande proteste : elle transporte des vivres pour le dispensaire. De l'autre côté, des soldats inexpérimentés croient voir des torches ennemies dans la brume.",[
 ["Laisser passer les vivres avec escorte.","Protéger les patients sans désarmer la porte.",{city:2,defense:1},["vivresPasses"],"La marchande rejoint les soignants. Un soldat apprend à distinguer discipline et rigidité."],
 ["Garder la route fermée jusqu'au contrôle des signaux.","Préserver la sécurité, au risque de pénuries.",{defense:2,city:-1},["routeFermee"],"La marchande attend, furieuse. Le Général accepte de porter la responsabilité de l'ordre."]]),
 s("Camp des éclaireurs","AETHER","AETHER retrouve un paquet abandonné et un bout de carte. Des marques désignent des carrefours, mais aucune ne mène directement au palais. « On prépare peut-être une diversion », avance-t-il. Ce n'est encore qu'une hypothèse.",[
 ["Vérifier chaque carrefour avec TOMAS.","Une enquête coûteuse, mais méthodique.",{intel:2,clock:1},["carrefours"],"Ils découvrent des traces de roues lourdes près des entrepôts."],
 ["Protéger les archives dès maintenant.","Prévenir le vol de documents potentiels.",{defense:2,aether:1},["archivesProtegees"],"NADIR renforce les serrures et inventorie les coffres sans alerter inutilement la cour."]])]},
 {title:"LES RUES S'ENFLAMMENT",arc:"LES PREMIÈRES CENDRES",scenes:[
 "s03",
 s("Les premiers foyers","SELMA","Les premiers toits brûlent dans la rue des Tisserands. Des habitants lancent des seaux depuis les fenêtres ; d'autres fuient avec seulement leurs enfants. Les assaillants testent les défenses de la ville au lieu de mener une charge totale.",[
 ["Former une équipe de pompiers improvisée.","Sauver des maisons et maintenir des passages.",{city:2,defense:1},["brigadeIncendie"],"Les seaux circulent de main en main. La ville trouve des gestes de solidarité qui ne dépendent pas d'un dieu."],
 ["Suivre les tireurs pour connaître leur objectif.","Des informations pour le Général.",{intel:2,city:-1},["traceTireurs"],"Les flèches visent d'abord les dépôts ; la ligne de défense s'ajuste aussitôt."]])]},
 {title:"LE CONSEIL DE GUERRE",arc:"LES PREMIÈRES CENDRES",scenes:[
 "s04",
 s("Sur les remparts","LE GÉNÉRAL","Les gardes tiennent des sacs de sable, tandis que la foule réclame des nouvelles. Le Général refuse que CHAYAH fasse la guerre seul : la ville doit pouvoir se défendre quand il sera ailleurs.",[
 ["Confier la défense du quartier aux officiers entraînés.","Le commandement local gagne en autonomie.",{defense:2,trust:1},["officiers"],"Les capitaines prennent leurs positions, sans attendre une nouvelle intervention divine."],
 ["Demander à AETHER de coordonner les informations.","Une défense fondée sur l'observation et la communication.",{intel:2,aether:1},["commandementInfos"],"Les signaux des tours deviennent plus cohérents ; les alarmes inutiles diminuent."]])]},
 {title:"LA PREMIÈRE BRÈCHE",arc:"LES PREMIÈRES CENDRES",scenes:[
 "s05","s06"]},
 {title:"LES NOMS DES VIVANTS",arc:"LE PRIX DES CHOIX",scenes:[
 s("Le dispensaire au petit matin","SELMA","La première bataille a laissé des blessures plus difficiles à réparer qu'une muraille. SELMA inscrit des noms sur les registres ; certains seront simplement soignés, d'autres ne rentreront pas. CHAYAH rencontre une fillette qui cherche son frère parmi les brancards.",[
 ["Aider à rechercher les disparus.","Une responsabilité concrète envers les familles.",{city:2,trust:1},["rechercheDisparus"],"Le frère est retrouvé vivant dans une cave. D'autres recherches restent sans réponse."],
 ["Accorder au dispensaire les ressources nécessaires.","Permettre aux soignants humains d'agir.",{city:2,council:1},["budgetDispensaire"],"SELMA pourra engager deux apprentis. Elle remercie CHAYAH sans oublier de parler de la pénurie."]]),
 s("Veillée au monument","MAILEIZ","MAILEIZ participe à la veillée sans uniforme. La lumière des chandelles éclaire ses blessures légères. Elle s'approche de CHAYAH : « Il y a des choses que tu peux réparer. Et d'autres qu'il faut simplement apprendre à porter. »",[
 ["L'écouter et rester jusqu'au départ des familles.","Partager le deuil plutôt que le gouverner.",{maileiz:2,trust:1},["veille"],"Elle s'appuie un instant contre lui. Rien n'est résolu, mais ce geste a une valeur réelle."],
 ["Promettre une enquête sur les responsables.","Une démarche nécessaire, pas un réconfort instantané.",{intel:2,council:1},["promesseEnquete"],"MAILEIZ hoche la tête : « Alors trouve la vérité, même si elle nous déplaît. »"]])]},
 {title:"UNE PAIX QUI MENT",arc:"LE PRIX DES CHOIX",scenes:[
 s("Les jardins réparés","NARRATEUR","La ville reprend lentement sa respiration. Les marchés rouvrent, les enfants sortent avec leurs parents, mais les portes restent gardées. Certains marchands veulent oublier la bataille ; d'autres y voient la première étape d'un siège plus vaste.",[
 ["Maintenir les patrouilles tout en rouvrant le marché.","Réduire la peur sans abandonner la vigilance.",{city:2,defense:1},["patrouillesCalmes"],"Les boutiques reprennent leur activité sous la protection des sentinelles."],
 ["Envoyer des secours aux hameaux voisins.","L'attaque n'a pas concerné que le centre-ville.",{city:1,trust:2},["hameaux"],"TOMAS transporte des médicaments et revient avec des nouvelles inquiétantes."]]),
 s("Le rapport du Général","LE GÉNÉRAL","Les éclaireurs ont repéré un chariot de guerre intact près de la porte occidentale. L'ennemi n'a pas perdu ses moyens ; il attend. Le Général soupçonne qu'on cherche autre chose que des vivres.",[
 ["Faire surveiller les armes de siège sans provoquer l'ennemi.","Anticiper le deuxième coup.",{defense:2,intel:1},["enginSurveille"],"Les gardes découvrent un dispositif alimenté par un sceau inconnu."],
 ["Convaincre ÉLÉAONOR de préparer des abris souterrains.","Les habitants auront une protection alternative.",{city:2,council:1},["abris"],"Les ouvriers ouvrent des passages vers les anciennes caves des guildes."]])]},
 {title:"L'ARME DES SERMENTS",arc:"LE PRIX DES CHOIX",scenes:[
 s("Décombres de la porte ouest","AETHER","Dans les débris de la bataille, AETHER récupère un fragment d'alliage qui n'appartient à aucune arme ordinaire. L'objet vibre au contact des sceaux anciens. Il pourrait blesser un être divin, mais son effet sur un corps mortel serait dévastateur.",[
 ["Étudier l'arme avec NADIR avant toute intervention.","Gagner un début de connaissance sur la lance.",{intel:2,aether:1},["lanceEtudiee"],"AETHER établit un premier principe : le métal réagit à la déformation de la réalité."],
 ["Prévenir la garde et MAILEIZ du danger.","L'information peut sauver des vies.",{defense:2,maileiz:1},["lanceSignalee"],"MAILEIZ écoute le rapport. « Je connais le risque. Je ne laisserai pas pour autant les autres mourir seuls. »"]]),
 s("La table des cartes","ÉLÉAONOR","ÉLÉAONOR présente la carte d'un quartier encore habité. La ville n'a ni le temps ni les moyens d'évacuer tous ses résidents. Une seconde attaque contre la porte pourrait piéger des familles entières.",[
 ["Préparer un corridor d'évacuation avec SELMA.","Réduit le risque pour les mortels exposés.",{city:2,defense:1},["corridorSecond"],"SELMA fait distribuer des brassards aux volontaires ; plusieurs habitants refusent de quitter leur maison."],
 ["Répartir des sentinelles sur les toits.","Détecter plus tôt une nouvelle offensive.",{defense:2,intel:1},["toitsVeilles"],"Les archers reconnaissent des silhouettes vers l'ancienne route des forges."]])]},
 {title:"LES FLAMMES REVIENNENT",arc:"LE PRIX DES CHOIX",scenes:[
 s("Alarmes du quartier nord","TOMAS","Une deuxième cloche sonne, plus grave que la première. TOMAS arrive à bout de souffle : « Le chariot est revenu. Cette fois, il porte une lance. Les hommes du Général maintiennent la rue, mais les familles sont encore dehors. » CHAYAH découvre que ses préparatifs ont eu des effets, bons ou mauvais.",[
 ["Rejoindre les secours et guider les familles vers l'abri.","Améliore le bilan civil avant le moment critique.",{city:2,defense:1},["secoursSecond"],"MIREN accueille une nouvelle vague de réfugiés. SELMA garde deux brancards disponibles."],
 ["Désarmer les arbalétriers au nord de la rue.","Réduit les tirs, mais laisse la foule trouver un passage.",{defense:2,energy:-12},["tireursDesarmes"],"Une partie des ennemis se disperse, tandis que d'autres se rapprochent du chariot."]]),
 s("La petite place des Tisserands","MAILEIZ","Une fillette se trouve enfermée derrière une charrette à moitié incendiée. MAILEIZ reconnaît l'enfant de la veillée. Elle refuse de rester à l'abri : elle connaît les gestes pour traverser les flammes. Au-dessus du chariot ennemi, le sceau de la lance s'allume. CHAYAH comprend enfin pourquoi AETHER s'inquiétait de cette arme.",[
 ["S'approcher de MAILEIZ pour couvrir les civils.","Prépare une réponse plus rapide au danger.",{maileiz:1,defense:1},["procheMaileiz"],"CHAYAH se place en soutien sans lui ordonner de partir. Elle acquiesce d'un regard, puis poursuit sa course."],
 ["Se tenir à distance pour contenir les autres assaillants.","Préserve un périmètre défensif, mais complique l'intervention directe.",{defense:2,energy:5},["enRetrait"],"CHAYAH détourne un tir ennemi. La fillette crie : MAILEIZ a déjà franchi le dernier obstacle."]])]},
 {title:"LA LANCE MORTELLE",arc:"LE PRIX DES CHOIX",scenes:[
 "s03_critical","s07"]},
 {title:"LE PACTE VOLÉ",arc:"LES ENQUÊTES",scenes:[
 "s08","s09"]},
 {title:"LA ROUTE DES CENDRES",arc:"LES ENQUÊTES",scenes:[
 "s10","s11"]},
 {title:"LA SCIENCE DES ÂMES",arc:"LES ENQUÊTES",scenes:[
 s("Maison de soins abandonnée","SELMA","Le groupe trouve une maison de soins dont le matériel est plus récent que le bâtiment. SELMA a reconnu certains emblèmes : ils figuraient sur des caisses du convoi. Une silhouette les attend à l'étage. ORVANN n'a pas été pris en flagrant délit ; il affirme chercher un moyen de sauver des malades.",[
 ["Interroger les patients avant ORVANN.","Leur témoignage doit compter autant que celui du savant.",{intel:2,trust:1},["patientsOrvann"],"Certains remercient ORVANN. D'autres disent avoir subi des examens qu'ils ne comprenaient pas."],
 ["Inspecter les équipements avec AETHER.","Éviter les conclusions faciles.",{intel:2,aether:1},["materielOrvann"],"Les fioles contiennent des traces d'énergie perturbée ; leur origine reste incertaine."]]),
 "s12"]},
 {title:"LE PRIX D'UNE PISTE",arc:"LES ENQUÊTES",scenes:[
 s("Caravane dans les collines","TOMAS","Des voyageurs ont installé un camp entre deux routes. La famille qui conduit le convoi porte des marques de fouet récentes. Un chef de caravane affirme avoir été arrêté par des hommes aux couleurs des Cendres, mais refuse de livrer le nom d'un soldat qui l'a aidé.",[
 ["Promettre aux témoins la protection de la ville.","Recueillir des informations sans menacer les survivants.",{city:2,intel:1},["protectionTemoins"],"Le chef révèle le passage emprunté par les prisonniers sans trahir celui qui l'a aidé."],
 ["Faire envoyer une escorte au camp.","Sécuriser les voyageurs malgré le retard.",{defense:1,city:2,clock:1},["escorteVoyageurs"],"Les gardes dressent une petite ligne défensive jusqu'au matin."]]),
 "s13"]},
 {title:"LES BANNIÈRES BRÛLÉES",arc:"LES ENQUÊTES",scenes:[
 "s14",
 s("Le camp après le combat","AETHER","Après la confrontation, le camp est silencieux. Des hommes gémissent parmi les pierres, et l'odeur du feu se mêle à celle des herbes écrasées. AETHER demande qu'on ne confonde pas la victoire militaire avec la vérité. Les officiers ennemis avaient aussi des ordres et des peurs.",[
 ["Soigner les prisonniers et conserver les documents.","Une victoire qui ne détruit pas ses preuves.",{trust:2,city:1},["prisonniersSoignes"],"Plusieurs soldats acceptent de témoigner, sans devenir les alliés de CHAYAH."],
 ["Relever les positions et poursuivre la piste du sceau.","L'enquête avance vers un lieu plus dangereux.",{intel:2,aether:1},["traceSceau"],"Les marques des caisses convergent vers un sanctuaire abandonné."]])]},
 {title:"LE FRÈRE AUX PACTES",arc:"LES DERNIERS SERMENTS",scenes:[
 "s15","s16"]},
 {title:"L'OMBRE DES CONSÉQUENCES",arc:"LES DERNIERS SERMENTS",scenes:[
 s("Escalier du sanctuaire","AETHER","Une fois la brèche contenue, AETHER voit des habitants descendre du sanctuaire, certains blessés, d'autres silencieux. Le frère de CHAYAH n'a ni disparu ni livré toute la vérité. Une menace a été stoppée ; son origine demande encore une enquête.",[
 ["Mettre le sanctuaire en quarantaine et laisser partir les civils.","Préserver les preuves et la vie des témoins.",{city:2,defense:1},["quarantaine"],"Les sentinelles sécurisent les lieux ; SELMA promet d'examiner les survivants."],
 ["Parler seul à son frère sans le condamner.","Les réponses ne viendront pas toutes aujourd'hui.",{intel:2,trust:1},["entretienFrere"],"Son frère admet avoir pris des risques. Il refuse pourtant de donner le nom de toutes les entités."]]),
 "s17"]},
 {title:"LE NOM DES ABSENTS",arc:"LES DERNIERS SERMENTS",scenes:[
 s("Veillée de la ville","NARRATEUR","La ville se rassemble autour des noms des blessés, des disparus et des morts. Les enfants ont grandi trop vite en quelques nuits. La place du marché porte encore les traces du feu. Ce soir, personne ne parle du pouvoir de CHAYAH sans parler aussi de son choix devant MAILEIZ.",[
 ["Laisser parler les survivants avant CHAYAH.","Leur mémoire et leur colère méritent de l'espace.",{trust:2,city:1},["paroleSurvivants"],"Les habitants racontent des gestes courageux et des pertes qui ne peuvent être ramenées à des statistiques."],
 ["Demander au Conseil une aide durable pour les familles.","Réparation plutôt que célébration.",{city:2,council:2},["fondsVictimes"],"ÉLÉAONOR engage la cité à financer les soins et la reconstruction."],
 ]),
 "s18"]}
 ];
 const all=[];
 E.forEach((ep,index)=>{
  const episode=index+1,ids=[];
  ep.scenes.forEach((part,j)=>{
   const scene=typeof part==="string"?JSON.parse(JSON.stringify(original.get(part))):{...part};
   if(!scene)throw Error("Scène manquante "+part);
   scene.id=scene.id||"season-"+String(episode).padStart(2,"0")+"-"+(j+1);
   scene.episode=episode;scene.chapter=episode<=17?0:1;
   scene.episodeTitle=ep.title;scene.arc=ep.arc;
   all.push(scene);ids.push(scene.id);
  });
  ep.sceneIds=ids;delete ep.scenes;
 });
 for(let i=0;i<all.length;i++){
  const here=all[i],next=all[i+1]?.id;
  if(here.choices)here.choices.forEach(c=>{if(next)c.next=next});
  if(here.battle&&next)here.battle.next=next;
 }
 C.season={title:"LA NUIT DES SERMENTS",totalEpisodes:E.length,episodes:E,
  cinematic:[
   {eyebrow:"PROLOGUE / PREMIÈRE LUMIÈRE",title:"UNE VILLE QUI RESPIRE",text:"Avant qu'une guerre ait un nom, les rues étaient pleines de vies ordinaires. Des marchands levaient leurs étals. Des enfants couraient derrière les roues des chariots. Les gens aimaient, se disputaient, vieillissaient. La ville ne savait pas encore qu'elle aurait bientôt besoin de courage.",art:"maileiz"},
   {eyebrow:"PROLOGUE / DEUXIÈME LUMIÈRE",title:"CEUX QUI VEILLENT",text:"Parmi les vivants marchaient des êtres qui ne connaissaient pas la même fin. CHAYAH pouvait réécrire le réel. AETHER lui parlait comme à un ami et non à un maître. Aucun de leurs pouvoirs ne leur donnait le droit de décider à la place de tous.",art:"aether"},
   {eyebrow:"PROLOGUE / TROISIÈME LUMIÈRE",title:"LE TEMPS DE MAILEIZ",text:"MAILEIZ n'était pas immortelle. Elle connaissait la douleur, la fatigue et le prix d'une journée perdue. Elle aimait CHAYAH sans lui avoir cédé sa liberté. Il l'aimait en retour, mais craignait ce qu'une promesse pourrait signifier pour une vie si différente de la sienne.",art:"maileiz"},
   {eyebrow:"PROLOGUE / QUATRIÈME LUMIÈRE",title:"LES PREMIÈRES FISSURES",text:"Plus loin, des archives étaient copiées en secret. Des routes se vidaient. Un frère écoutait des entités qu'il aurait dû craindre. Des seigneurs déchus préparaient des gestes dont les habitants ne soupçonnaient pas la portée.",art:"vaelkor"},
   {eyebrow:"SAISON I / OUVERTURE",title:"AVANT LA PREMIÈRE ALARME",text:"Cette histoire ne commence pas par un coup d'épée. Elle commence par un choix banal, un visage rencontré, une promesse retenue. Les batailles viendront. Pour savoir ce qu'elles coûteront, il faut d'abord connaître ceux qui pourraient tout perdre.",art:"chayah"}
  ]
 };
 C.scenes=all;
})();
