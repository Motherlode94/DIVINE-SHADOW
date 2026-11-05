/* DIVINE SHADOW — aventure interactive, prototype de campagne.
   Faits du scénario = chronologie exploratoire, non canonique. */
window.DS_ADVENTURE_DATA = Object.freeze({
  version:1,
  title:"LES NON-DITS — LES SERMENTS BRISÉS",
  portraits:{
    chayah:"chayah_hd_candidate.jpg",aether:"aether_hd_candidate.jpg",
    maileiz:"Guerrière de feu dans les ruines en flammes.png",
    seraphyra:"Image ChatGPT 5 nov. 2026, 17_14_06.png",
    vaelkor:"vaelkor_clean.png",nyssara:"nyssara_clean.png",
    orvann:"orvann_clean.png"
  },
  chapters:[
    {id:"balcon",number:"I",title:"LA NUIT DES SERMENTS",
      introduction:"La fête du Haut-Palais devait célébrer une trêve. Pourtant, une page d'archives a disparu, des serviteurs ont vu des ombres aux portes et MAILEIZ attend une réponse. CHAYAH devra choisir ce qu'il protège en premier.",
      objectives:["Obtenir deux indices sur la disparition","Résoudre l'attaque à la porte extérieure","Rejoindre le Conseil pour conclure l'acte"],
      locations:["balcony","archives","gallery","gate","council"]},
    {id:"cendres",number:"II",title:"LES TRACES DES CENDRES",
      introduction:"Un fragment volé mène aux ruines. VAELKOR avance ses pions, tandis qu'ORVANN propose une aide dont le prix reste obscur. Les conséquences de la cérémonie accompagnent CHAYAH.",
      objectives:["Réunir deux preuves dans les ruines et le laboratoire","Survivre à la confrontation des cendres","Décider à qui confier les preuves"],
      locations:["archives","laboratory","ruins","sanctuary"]}
  ],
  places:{
    balcony:{name:"Balcon des aveux",desc:"Les lanternes tremblent au-dessus de la ville. MAILEIZ attend CHAYAH, sans lui promettre de rester."},
    archives:{name:"Archives d'AETHER",desc:"Un registre amputé de plusieurs pages, des sceaux de connaissance et un silence studieux."},
    gallery:{name:"Galerie céleste",desc:"SERAPHYRA reçoit les invités. Sa courtoisie ne révèle pas ses pensées."},
    gate:{name:"Porte extérieure",desc:"Des bruits de métal et des silhouettes agitent les remparts. Les gardes ne comprennent pas encore l'origine du danger."},
    council:{name:"Salle du Conseil",desc:"Une assemblée inquiète attend le rapport de CHAYAH."},
    laboratory:{name:"Laboratoire d'ORVANN",desc:"Des instruments médicaux, une fiole d'énergie instable et des expériences dont le résultat inquiète."},
    ruins:{name:"Ruines des Cendres",desc:"Des drapeaux brûlés, des armes abandonnées et le signe d'un souverain déchu."},
    sanctuary:{name:"Sanctuaire des serments",desc:"Sous les voûtes, une pierre fracturée porte les traces d'un pacte altéré."}
  },
  enemies:{
    raider:{name:"Éclaireur des Cendres",hp:52,damage:12,armor:2,portrait:"vaelkor",desc:"Une unité de VAELKOR teste les défenses du palais, sans ordre connu de massacre."},
    shade:{name:"Ombre des Serments",hp:68,damage:14,armor:1,portrait:"nyssara",desc:"Une entité liée aux pactes brisés. Sa présence ne prouve pas la culpabilité de NYSSARA."},
    captain:{name:"Capitaine des Cendres",hp:92,damage:16,armor:4,portrait:"vaelkor",desc:"Un officier discipliné, prêt à battre en retraite si son objectif est compromis."}
  },
  abilities:[
    {id:"strike",name:"FRAPPE CIBLÉE",cost:0,hint:"16–22 dégâts avant armure ; restitue 5 énergie."},
    {id:"void",name:"VOID STEP",cost:18,hint:"24–30 dégâts, évite la prochaine attaque."},
    {id:"guard",name:"GARDE",cost:0,hint:"Réduit les dégâts de cette attaque et restaure 10 énergie."},
    {id:"seal",name:"SCEAU DU RÉEL",cost:27,hint:"18 dégâts et affaiblit l'ennemi pendant deux tours."},
    {id:"talk",name:"SOMMATION",cost:0,hint:"Peut convaincre un adversaire humain affaibli de reculer."},
    {id:"flee",name:"REPLI",cost:0,hint:"Quitte l'affrontement, mais la menace demeure."}
  ]
});