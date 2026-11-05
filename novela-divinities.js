/* Statut isekai : niveaux et rangs NON ATTRIBUÉS sans validation canonique.
   LVL n'est pas l'énergie disponible ni une révélation du potentiel caché. */
(()=>{
const C=window.DS_CAMPAIGN;if(!C)return;
C.statusSystem={stats:["FOR","END","AGI","MAG","RES","PER"],ranks:["F","E","D","C","B","A","S","SS","SSS","EX"],levelCap:null};
C.divinities={
 chayah:{name:"CHAYAH VEHUHIA",level:null,rank:null,className:"Divinité",title:"Statut scellé",power:"Altération du réel",skills:[{id:"realityWard",name:"Rempart de réalité",active:true},{id:"void",name:"Void Step",active:true},{id:"seal",name:"Sceau du réel",active:true}],knownStats:{},hidden:true},
 aether:{name:"AETHER",level:null,rank:null,className:"Divinité",title:"Analyste des lois",power:"Analyse des lois et constructions d’énergie",skills:[{id:"energyConstruct",name:"Construction énergétique",active:true},{id:"lawAnalysis",name:"Analyse des lois",active:true}],knownStats:{},hidden:true},
 seraphyra:{name:"SERAPHYRA",level:null,rank:null,className:"Divinité",title:"Compétences à confirmer",power:null,skills:[],knownStats:{},hidden:true}
};
for(const [id,data] of Object.entries(C.divinities)){if(C.roster[id]){C.roster[id].level=data.level;C.roster[id].rank=data.rank}}
})();