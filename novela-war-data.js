/* DIVINE SHADOW — guerre des cités : données fictives, non canoniques */
(()=>{
const C=window.DS_CAMPAIGN;if(!C)return;
C.war={
cities:{
valedor:{name:"VALÉDOR",alignment:"allied",strength:65,trust:2,threat:35},
brumelac:{name:"BRUMELAC",alignment:"neutral",strength:55,trust:0,threat:48},
asterne:{name:"ASTERNE",alignment:"neutral",strength:49,trust:0,threat:42},
solenne:{name:"SOLENNE",alignment:"allied",strength:68,trust:3,threat:32},
karthos:{name:"KARTHOS",alignment:"enemy",strength:85,trust:-5,threat:8},
neralis:{name:"NÉRALIS",alignment:"enemy",strength:82,trust:-5,threat:8}
},
generals:[
{name:"DRAEVEN",army:"legion",orders:"Formation humaine, arbalétriers et boucliers",patron:"EDRIC MORN"},
{name:"MORTHYS",army:"beasts",orders:"Meutes dirigées par balises mystiques",patron:"CALDRA VOSS"},
{name:"VELKHAR",army:"cursed",orders:"Cohortes maudites sous ordres mystiques",patron:"PRÉLAT VARESS"}],
patrons:[
{name:"CALDRA VOSS",public:"Bienfaitrice et juge populaire",secret:"Finance les meutes et les enlèvements"},
{name:"EDRIC MORN",public:"Banquier protecteur des orphelins",secret:"Arme les légions des Cendres"},
{name:"PRÉLAT VARESS",public:"Arbitre public des lois",secret:"Signe les ordres mystiques des cohortes maudites"}],
armies:{
legion:{name:"LÉGION DES CENDRES",type:"humain",general:"DRAEVEN",groups:3,perGroup:7,hp:132,damage:17,armor:4,resource:"force",force:100},
beasts:{name:"MEUTE DU GOUFFRE",type:"monstre",general:"MORTHYS",groups:2,perGroup:6,hp:120,damage:20,armor:2},
cursed:{name:"COHORTE DES SERMENTS BRISÉS",type:"maudit",general:"VELKHAR",groups:3,perGroup:5,hp:155,damage:22,armor:5}
},
requests:[
{id:"valedor1",episode:28,city:"valedor",enemy:"legion",units:2},
{id:"brumelac1",episode:30,city:"brumelac",enemy:"beasts",units:2},
{id:"solenne1",episode:32,city:"solenne",enemy:"legion",units:2},
{id:"asterne1",episode:34,city:"asterne",enemy:"cursed",units:3},
{id:"valedor2",episode:37,city:"valedor",enemy:"cursed",units:3},
{id:"brumelac2",episode:38,city:"brumelac",enemy:"legion",units:2}]
};
for(const [key,army] of Object.entries(C.war.armies)){
C.enemies[key]={name:army.name,hp:army.hp,damage:army.damage,armor:army.armor,resource:army.resource||null,force:army.force||null,desc:army.type+" : "+army.groups+" groupes de "+army.perGroup+" unités dirigés par "+army.general};
}
})();
