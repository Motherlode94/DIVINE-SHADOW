/* DIVINE SHADOW — Saison 1 : fiction interactive non canonique.
   Les choix modifient uniquement cette sauvegarde locale. */
window.DIVINE_NOVELA = {
  actors:{
    narration:{name:"NARRATION",color:"#cfc4cf"},
    chayah:{name:"CHAYAH VEHUHIA",color:"#e35b73",image:"chayah_hd_candidate.jpg"},
    aether:{name:"AETHER",color:"#63c4ed",image:"aether_hd_candidate.jpg"},
    maileiz:{name:"MAILEIZ",color:"#ff8067",image:"Guerrière de feu dans les ruines en flammes.png"},
    seraphyra:{name:"SERAPHYRA",color:"#c7a0e4",image:"Image ChatGPT 5 nov. 2026, 17_14_06.png"}
  },
  episodes:[
    {id:"regard",number:"01",title:"LE REGARD QUI RESTE",subtitle:"Le balcon des aveux",background:"maileiz",start:"r_intro",
      nodes:{
        r_intro:{speaker:"narration",text:"La musique de la réception traverse les portes du balcon. MAILEIZ regarde les lumières de la ville. CHAYAH la rejoint. Dans la salle, SERAPHYRA observe leur rapprochement.",next:"r_question"},
        r_question:{speaker:"maileiz",text:"« Je ne te demande pas de me promettre l'éternité. Je veux seulement savoir si tu vas continuer à fuir ma question. »",next:"r_decision"},
        r_decision:{speaker:"chayah",text:"CHAYAH éprouve des sentiments réels, mais une réponse peut changer leur avenir. Que dit-il ?",choices:[
          {label:"Avouer son amour, sans promettre l'impossible.",hint:"Sincérité, mais attente toujours ouverte.",effects:{maileiz:2,trust:1},flags:["aveu"],next:"r_aveu"},
          {label:"Demander du temps avec franchise.",hint:"Protège sa liberté, mais risque de blesser MAILEIZ.",effects:{maileiz:-1,trust:1},flags:["temps"],next:"r_temps"},
          {label:"Éluder la question par une plaisanterie.",hint:"Évite la réponse et entame la confiance.",effects:{maileiz:-2,trust:-2},flags:["fuite"],next:"r_fuite"}
        ]},
        r_aveu:{speaker:"chayah",text:"« Je t'aime, MAILEIZ. Je ne te le cache pas. Mais je ne veux pas te faire une promesse que je n'ai pas encore appris à tenir. »",next:"r_reponse"},
        r_temps:{speaker:"chayah",text:"« Je ne te mens pas : j'ai peur de ce qu'une promesse changerait entre nous. Accorde-moi du temps, si tu le souhaites. »",next:"r_reponse"},
        r_fuite:{speaker:"chayah",text:"« Tu sais, même les dieux ont parfois besoin d'un calendrier... » Il sourit ; MAILEIZ ne rit pas.",next:"r_reponse"},
        r_reponse:{speaker:"maileiz",text:"« Je suis mortelle, CHAYAH. Mon temps n'a pas la même valeur que le tien. Et je déciderai moi-même de ce que je suis prête à attendre. »",next:"r_second"},
        r_second:{speaker:"narration",text:"Dans la salle, SERAPHYRA croise leur regard. Elle détourne le sien avant qu'on la remarque. Que fait CHAYAH maintenant ?",choices:[
          {label:"Rester avec MAILEIZ pour l'écouter.",hint:"Renforce leur rapprochement.",effects:{maileiz:1},flags:["ecoute"],next:"r_end"},
          {label:"Revenir à la réception pour désamorcer les tensions.",hint:"Limite le scandale, mais interrompt l'échange.",effects:{seraphyra:1,maileiz:-1},flags:["retour"],next:"r_end"}
        ]},
        r_end:{speaker:"narration",text:"Le balcon retrouve son silence. Une parole a été prononcée — ou esquivée. Les choix de ce soir pèseront sur la conversation suivante.",ending:true}
      }},
    {id:"promesse",number:"02",title:"DEUX DIVINITÉS, UNE PROMESSE",subtitle:"La franchise d'un ami",background:"aether",start:"p_intro",
      nodes:{
        p_intro:{speaker:"narration",text:"À l'écart du palais, AETHER consulte les archives d'une ancienne alliance. CHAYAH lui rend visite. Leur amitié a traversé des disputes bien plus grandes que cette soirée.",next:"p_reproche"},
        p_reproche:{speaker:"aether",text:"« Tu peux remodeler les étoiles, mais tu ne peux pas choisir à la place d'une femme mortelle. Qu'as-tu réellement compris de ce qu'elle t'a dit ? »",next:"p_choice"},
        p_choice:{speaker:"chayah",text:"Comment CHAYAH répond-il à son meilleur ami ?",choices:[
          {label:"Reconnaître qu'AETHER a raison sur un point.",hint:"Renforce la confiance entre les deux amis.",effects:{aether:2,trust:1},flags:["conseil"],next:"p_humble"},
          {label:"Défendre son hésitation sans attaquer AETHER.",hint:"Préserve l'autonomie, sans trancher le dilemme.",effects:{aether:0,trust:0},flags:["defense"],next:"p_defense"},
          {label:"Se fâcher et refuser tout conseil.",hint:"L'amitié résiste, mais la tension augmente.",effects:{aether:-2,trust:-1},flags:["colere"],next:"p_colere"}
        ]},
        p_humble:{speaker:"chayah",text:"« Je sais réécrire le réel, mais ce n'est pas une excuse pour réécrire le choix de MAILEIZ. Je dois lui laisser le sien. »",next:"p_warning"},
        p_defense:{speaker:"chayah",text:"« Je ne lui ai rien imposé. Mon silence est maladroit, pas méprisant. » AETHER acquiesce sans se déclarer convaincu.",next:"p_warning"},
        p_colere:{speaker:"chayah",text:"« Tu n'es pas mon juge. » AETHER referme calmement le registre : « C'est vrai. Je suis ton ami. »",next:"p_warning"},
        p_warning:{speaker:"aether",text:"« Les archives montrent une fracture parmi les anciens serments. Quelqu'un cherche à exploiter les tensions de la cour. Nous pouvons enquêter, ou attendre. »",next:"p_choice2"},
        p_choice2:{speaker:"narration",text:"Que décident-ils pour la suite ?",choices:[
          {label:"Enquêter discrètement ensemble.",hint:"Débloque un indice pour la cérémonie.",effects:{aether:1,trust:1},flags:["enquete"],next:"p_clue"},
          {label:"Prévenir le conseil sans preuve.",hint:"Diffuse l'alerte, au risque de semer la méfiance.",effects:{court:2,aether:-1},flags:["alerte"],next:"p_alert"}
        ]},
        p_clue:{speaker:"aether",text:"« Nous commencerons par les registres, pas par des accusations. Un nom apparaît sur une page effacée, mais aucune preuve ne permet encore de désigner un coupable. »",next:"p_end"},
        p_alert:{speaker:"aether",text:"« Je te suivrai au conseil, mais sois précis : nous avons une anomalie, pas un ennemi identifié. »",next:"p_end"},
        p_end:{speaker:"narration",text:"Les deux divinités se séparent sur un désaccord partiel ou une promesse d'enquête. Leur amitié demeure libre, et rien n'oblige l'autre à obéir.",ending:true}
      }},
    {id:"cour",number:"03",title:"LA COUR DES SILENCES",subtitle:"Le prix de l'apparence",background:"seraphyra",start:"c_intro",
      nodes:{
        c_intro:{speaker:"narration",text:"Les arches du palais s'illuminent. Des invités célèbrent une trêve fragile. MAILEIZ, mortelle parmi les immortels, garde la tête haute. SERAPHYRA l'accueille avec une élégance glacée.",next:"c_greeting"},
        c_greeting:{speaker:"seraphyra",text:"« Une soirée mémorable, n'est-ce pas ? Certains semblent avoir tant de choses à se dire. »",next:"c_react"},
        c_react:{speaker:"narration",text:"MAILEIZ perçoit une froideur dans les mots, mais elle ne connaît ni son origine ni les secrets de SERAPHYRA. Comment réagit-elle ?",choices:[
          {label:"Répondre avec courtoisie et assurance.",hint:"Évite une confrontation publique.",effects:{maileiz:1,seraphyra:1},flags:["diplomatie"],next:"c_polite"},
          {label:"Demander franchement ce qui dérange SERAPHYRA.",hint:"Risque d'attirer les regards.",effects:{maileiz:1,court:1,seraphyra:-2},flags:["franchise"],next:"c_direct"},
          {label:"S'éloigner pour garder sa tranquillité.",hint:"Protège MAILEIZ, mais laisse le malaise entier.",effects:{court:-1,maileiz:-1},flags:["retrait"],next:"c_away"}
        ]},
        c_polite:{speaker:"maileiz",text:"« Je préfère les cérémonies où chacun peut être lui-même. Mais je vous souhaite une belle soirée. »",next:"c_interrupt"},
        c_direct:{speaker:"maileiz",text:"« J'entends quelque chose derrière vos mots. Voulez-vous me le dire clairement ? » SERAPHYRA se contente d'un sourire qui ne répond à rien.",next:"c_interrupt"},
        c_away:{speaker:"narration",text:"MAILEIZ s'éloigne sans se justifier. SERAPHYRA observe son départ sans révéler ce qu'elle ressent.",next:"c_interrupt"},
        c_interrupt:{speaker:"aether",text:"« Une anomalie dans les registres de la cour mérite notre attention. Il nous faut des faits avant de désigner qui que ce soit. »",next:"c_last"},
        c_last:{speaker:"narration",text:"Une rumeur de trahison parcourt la salle. La manière de répondre peut déterminer si la cour reste unie.",choices:[
          {label:"Exiger une enquête impartiale.",hint:"La vérité avant les accusations.",effects:{trust:2,court:-1,aether:1},flags:["justice"],next:"c_final"},
          {label:"Faire taire la rumeur pour préserver la cérémonie.",hint:"Maintient l'ordre, mais reporte les questions.",effects:{court:1,trust:-1},flags:["silence"],next:"c_final"},
          {label:"Confronter les courtisans sur leurs insinuations.",hint:"Rétablit les limites, mais attise la tension.",effects:{court:2,trust:-1},flags:["confrontation"],next:"c_final"}
        ]},
        c_final:{speaker:"narration",text:"Les portes se ferment. Cette fois, les silences n'ont pas tous la même signification. Les conséquences de vos décisions vont se dessiner.",ending:true,final:true}
      }}
  ]
};