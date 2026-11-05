/* DIVINE SHADOW — population validée de la planche des 40 habitants.
   Les origines décrivent la représentation culturelle et la nature des personnages,
   sans prédire leur moralité, leur puissance ni leur rôle politique. */
(()=>{
 const residents=[
 ["marin","MARIN","Africain (Bantou)","Afrique","Humain","Agriculteur","Père adoptif de CHAYAH, légataire de la Mère. Vie modeste et présence familiale essentielle."],
 ["aicha","AÏCHA","Arabe (Maghreb)","Monde arabe","Humaine","Fermière","Cultive les terres communes et protège ses récoltes."],
 ["diego","DIEGO","Hispanique","Hispaniques / Latinos","Humain","Éleveur","S'occupe des bêtes et des chemins de transhumance."],
 ["li-wei","LI WEI","Asiatique (Est)","Asie","Humain","Marchand","Marchande entre villages et cités sans appartenir à la noblesse."],
 ["amara-civile","AMARA","Africaine (Ouest)","Afrique","Humaine","Herboriste","Récolte des plantes et prépare des remèdes simples."],
 ["torin","TORIN","Européen","Europe","Humain","Charpentier","Construit les maisons et répare les charrettes du village."],
 ["nafis","NAFIS","Arabe (Levant)","Monde arabe","Humain","Forgeron","Entretient les outils des fermiers et artisans."],
 ["kian","KIAN","Asiatique (Sud)","Asie","Humain","Tisserand","Travaille le lin et les tissus populaires."],
 ["lucia","LUCÍA","Hispanique","Hispaniques / Latinos","Humaine","Cuisinière","Nourrit les ouvriers et voyageurs de passage."],
 ["orik","ORIK","Européen","Europe","Humain","Mineur","Travaille aux galeries de minerai dans des conditions difficiles."],
 ["zola","ZOLA","Africaine (Centrale)","Afrique","Humaine","Chasseuse","Ravitaille sa communauté et connaît les forêts."],
 ["yassin","YASSIN","Arabe","Monde arabe","Humain","Apothicaire","Prépare des médicaments et négocie leurs prix."],
 ["mateo","MATEO","Hispanique","Hispaniques / Latinos","Humain","Caravanier","Transporteur des marchandises entre les villes."],
 ["ayaka","AYAKA","Asiatique (Est)","Asie","Humaine","Soigneuse","Assiste les malades et les blessés du village."],
 ["kofi","KOFI","Africain (Ouest)","Afrique","Humain","Bûcheron","Fournit du bois et aide aux réparations après les tempêtes."],
 ["elise","ÉLISE","Européenne","Europe","Humaine","Boulangère","Tient le four qui nourrit le quartier."],
 ["rashid","RASHID","Arabe","Monde arabe","Humain","Marchand ambulant","Colporte des biens et des nouvelles entre les hameaux."],
 ["suri","SURI","Asiatique (Sud)","Asie","Humaine","Éleveuse","Prend soin du troupeau familial."],
 ["javier","JAVIER","Hispanique","Hispaniques / Latinos","Humain","Menuisier","Fabrique du mobilier accessible aux familles modestes."],
 ["nala","NALA","Africaine (Est)","Afrique","Humaine","Pêcheuse","Connaît les rivières, les crues et les embarcations."],
 ["driss","DRISS","Arabe (Maghreb)","Monde arabe","Humain","Garde de ville","Patrouille dans les quartiers populaires."],
 ["mei","MEI","Asiatique (Est)","Asie","Humaine","Tisserande","Travaille pour les ateliers et la communauté."],
 ["cesar","CÉSAR","Hispanique","Hispaniques / Latinos","Humain","Maçon","Répare les murs abîmés et les maisons."],
 ["binta","BINTA","Africaine (Sahel)","Afrique","Humaine","Vendeuse","Vend ses produits sur les marchés."],
 ["lukas","LUKAS","Européen","Europe","Humain","Journalier","Cherche du travail à la journée."],
 ["farah","FARAH","Arabe","Monde arabe","Humaine","Sage du village","Conseillère écoutée pour sa connaissance des habitants."],
 ["chen","CHEN","Asiatique (Est)","Asie","Humain","Érudit","Transmet le savoir à ceux qui ne peuvent payer de maître."],
 ["ilias","ILIAS","Européen","Europe","Humain","Orphelin","Enfant de la cité, dépendant de l'entraide du quartier."],
 ["samira-civile","SAMIRA","Africaine (Nord)","Afrique","Humaine","Couturière","Répare les vêtements des familles."],
 ["raul","RAÚL","Hispanique","Hispaniques / Latinos","Humain","Chasseur","Surveille les sentiers et nourrit sa famille."],
 ["kemi","KEMI","Africain (Ouest)","Afrique","Humain","Mendiant","Survit grâce à l'entraide, avec une histoire qui reste à raconter."],
 ["zhang","ZHANG","Asiatique (Est)","Asie","Humain","Armurier","Fabrique et répare les armes ordinaires des gardes."],
 ["valeria","VALÉRIA","Hispanique","Hispaniques / Latinos","Humaine","Musicienne / Porte-faix","Cumule les métiers pour gagner sa vie."],
 ["bakari","BAKARI","Africain (Est)","Afrique","Humain","Porteur","Travaille sur les quais et les marchés."],
 ["nya","NYA","Africaine (Centrale)","Afrique","Humaine","Orpheline","Petite habitante sous la protection fragile de sa communauté."],
 ["eren","EREN","Européen","Europe","Humain","Réfugié","Arrivé après la destruction d'un hameau."],
 ["kazu","KAZU","Asiatique (Est)","Asie","Humain","Pêcheur","Travaille sur les rives au gré des saisons."],
 ["tharog","THAROG","Orque","Peuples fantastiques","Orque","Ouvrier des mines","Gagne sa vie à la mine, loin des stéréotypes de guerrier."],
 ["lyra","LYRA","Elfe sylvaine","Peuples fantastiques","Elfe","Herboriste","Vit du soin des cultures et de l'échange d'herbes."],
 ["drek","DREK","Drakéide","Peuples fantastiques","Drakéide","Guide caravanier","Connaît les voies difficiles et protège les caravanes."]
 ];
 const people=residents.map((r,i)=>({id:r[0],name:r[1],origin:r[2],group:r[3],species:r[4],role:r[5],description:r[6],portraitIndex:i,featured:i===0}));
 window.DS_POPULATION=people;
})();
