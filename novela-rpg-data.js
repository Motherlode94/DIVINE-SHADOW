/* DIVINE SHADOW — registres RPG: descriptions basées sur les événements déjà jouables. */
(()=>{"use strict";const C=window.DS_CAMPAIGN;if(!C)return;C.rpg={
 items:[
 {id:"registre",name:"Registre recoupé",type:"PREUVE",source:"dossier",description:"Une copie des témoignages et signatures étudiés dans l'enquête des archives."},
 {id:"recon",name:"Notes des remparts",type:"RENSEIGNEMENT",source:"recon",description:"Observations recueillies lors de la reconnaissance des assaillants."},
 {id:"accord",name:"Compte rendu du Conseil",type:"DOCUMENT",source:"mandat",description:"Trace de la décision d'organiser une opération encadrée."},
 {id:"carte",name:"Relevés de Brumelac",type:"CARTE",visit:"brumelac-cartes",description:"Notes de terrain partagées par les cartographes après l'intervention."},
 {id:"port",name:"Archives maritimes",type:"DOCUMENT",visit:"asterne-archives",description:"Notes comparées à partir des récits étudiés à la Bibliothèque des Mers."},
 {id:"pactes",name:"Fragments consignés",type:"PREUVE",visit:"neralis-ruines",description:"Inventaire de fragments remis à une commission de plusieurs peuples."},
 {id:"citadelle",name:"Rapport sur la citadelle",type:"RENSEIGNEMENT",visit:"neralis-citadelle",description:"Relevé des ordres mystiques et des mouvements observés."},
 {id:"frontiere",name:"Mouvements de Karthos",type:"RENSEIGNEMENT",visit:"karthos-plaine",description:"Synthèse des mouvements militaires documentés sur la plaine."}
 ],
 quests:[
 {id:"tactique",title:"Maîtriser les postures au combat",kind:"COMBAT",start:1,objective:"Remporter trois affrontements.",target:"combatHistory",total:3},
 {id:"evacuer",title:"Sauver les habitants du marché",kind:"PRINCIPALE",start:2,objective:"Organiser une évacuation et protéger les civils.",flag:"evacuation"},
 {id:"preuves",title:"Reconstituer le dossier du convoi",kind:"ENQUÊTE",start:8,objective:"Recouper les témoignages et conserver les preuves.",flag:"dossier"},
 {id:"conseil",title:"Décider avec le Conseil",kind:"POLITIQUE",start:9,objective:"Établir un mandat pour la suite de l'enquête.",flag:"mandat"},
 {id:"allies",title:"Répondre aux appels des cités",kind:"DIPLOMATIE",start:28,objective:"Traiter les six demandes de renforts, sans imposer une issue.",target:"aidDecisions",total:6},
 {id:"continents",title:"Découvrir les six cités",kind:"EXPLORATION",start:1,objective:"Visiter chaque cité disponible depuis la carte.",target:"cities",total:6},
 {id:"lieux",title:"Agir dans les lieux du continent",kind:"EXPLORATION",start:1,objective:"Intervenir dans six lieux différents, en respectant leurs habitants.",target:"sites",total:6}
 ]
};})();
