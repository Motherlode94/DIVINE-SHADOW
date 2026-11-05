/* DIVINE SHADOW — système des divinités.
 * Niveaux OBSERVÉS pour le jeu, jamais puissance totale ni hiérarchie canonique.
 * Le voile de SERAPHYRA est provisoire, en attente de validation de l'auteur. */
(()=>{
 const C=window.DS_CAMPAIGN;if(!C)return;
 C.divinities={
  chayah:{name:"CHAYAH VEHUHIA",level:38,ceiling:"INCONNU",domain:"Altération locale du réel",status:"Capacités partielles seulement",power:"RÉÉCRITURE LOCALISÉE",role:"Contrôle du terrain, protection et contrepartie physique",provisional:false},
  aether:{name:"AETHER",level:44,ceiling:"INCONNU",domain:"Nexus Umbra — ombres et liens",status:"Interprétation jouable à confirmer",power:"LIENS D'OMBRE",role:"Entrave, interception et collecte de preuves",provisional:true},
  seraphyra:{name:"SERAPHYRA",level:34,ceiling:"INCONNU",domain:"Voile des serments",status:"Pouvoir provisoire à valider",power:"VOILE DES SERMENTS",role:"Protection indirecte, occultation et diversion",provisional:true}
 };
 C.roster.chayah.level=C.divinities.chayah.level;
 C.roster.aether.level=C.divinities.aether.level;
 C.roster.seraphyra.level=C.divinities.seraphyra.level;
})();
