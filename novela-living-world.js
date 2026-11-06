/* Simulation locale au tour par tour — propositions non canoniques, sans changement de destins. */
(()=>{'use strict';const C=window.DS_CAMPAIGN;if(!C)return;C.livingWorld={
  "valedor": {
    "events": [
      {
        "id": "provisions",
        "title": "Distribution au marché",
        "text": "Les réserves d'un quartier sont en retard. Les habitants organisent eux-mêmes la distribution avec MIREN.",
        "help": "Apporter une aide logistique",
        "observe": "Vérifier les listes avec les commerçants",
        "helpResult": "Le marché peut reprendre ses distributions; les habitants contrôlent les réserves.",
        "observeResult": "Les responsables publient les quantités disponibles avant toute intervention."
      },
      {
        "id": "recoltes",
        "title": "Récolte retardée",
        "text": "Les pluies ralentissent les travaux des champs. MARIN et les paysans discutent d'une nouvelle organisation.",
        "help": "Aider aux récoltes avec les habitants",
        "observe": "Écouter les besoins des fermes",
        "helpResult": "La récolte avance grâce à un effort collectif.",
        "observeResult": "Les fermes choisissent leur calendrier sans ordre divin."
      }
    ]
  },
  "brumelac": {
    "events": [
      {
        "id": "route",
        "title": "Le col encombré",
        "text": "Des charrettes bloquent le passage. Les guides proposent deux itinéraires, sans certitude sur la météo.",
        "help": "Aider à dégager le chemin",
        "observe": "Faire vérifier les deux itinéraires",
        "helpResult": "Les guides rouvrent un chemin praticable.",
        "observeResult": "Le trajet le moins risqué est consigné par les cartographes."
      },
      {
        "id": "carriere",
        "title": "Inspection de la carrière",
        "text": "Les mineurs signalent une fissure et suspendent les travaux en attendant une inspection indépendante.",
        "help": "Fournir du soutien aux inspecteurs",
        "observe": "Consigner le rapport des mineurs",
        "helpResult": "Des renforts matériels permettent d'inspecter les galeries.",
        "observeResult": "Les mineurs conservent la décision de rouvrir ou non."
      }
    ]
  },
  "asterne": {
    "events": [
      {
        "id": "quais",
        "title": "Arrivée de familles",
        "text": "Des embarcations accostent plus tôt que prévu et les bateliers recherchent des abris disponibles.",
        "help": "Aider à préparer les abris",
        "observe": "Coordonner les informations des bateliers",
        "helpResult": "Les volontaires ouvrent des abris supplémentaires.",
        "observeResult": "La répartition des familles est décidée avec les bateliers."
      },
      {
        "id": "maree",
        "title": "Marée imprévue",
        "text": "Le port suspend des départs après un changement soudain des courants.",
        "help": "Aider à sécuriser les quais",
        "observe": "Étudier les relevés des navigateurs",
        "helpResult": "Les quais les plus exposés sont sécurisés.",
        "observeResult": "Les pilotes révisent les horaires selon leurs observations."
      }
    ]
  },
  "solenne": {
    "events": [
      {
        "id": "soins",
        "title": "Affluence au dispensaire",
        "text": "Les soignants demandent du matériel pour accueillir davantage de blessés et refusent de laisser leurs patients sans suivi.",
        "help": "Fournir du matériel",
        "observe": "Recueillir les besoins des soignants",
        "helpResult": "Le dispensaire renforce sa capacité d'accueil.",
        "observeResult": "Les équipes médicales établissent leurs propres priorités."
      },
      {
        "id": "jardin",
        "title": "Jardins endommagés",
        "text": "Des intempéries ont endommagé les sentiers. Les jardiniers préparent une réparation collective.",
        "help": "Aider à réparer les sentiers",
        "observe": "Consulter les habitants du quartier",
        "helpResult": "Un sentier est remis en état.",
        "observeResult": "Les habitants choisissent le plan de restauration."
      }
    ]
  },
  "karthos": {
    "events": [
      {
        "id": "hameau",
        "title": "Réserves au hameau",
        "text": "Une communauté civile manque de provisions près d'un fort ennemi. Ses habitants refusent d'être traités comme des soldats.",
        "help": "Acheminer des provisions civiles",
        "observe": "Identifier des passages non militarisés",
        "helpResult": "Les provisions atteignent des civils sans rallier la garnison.",
        "observeResult": "Un itinéraire de livraison civile est documenté."
      },
      {
        "id": "patrouille",
        "title": "Patrouilles sur la plaine",
        "text": "Les routes commerciales sont perturbées par plusieurs patrouilles. Les habitants proposent de relever les heures de passage.",
        "help": "Protéger une traversée civile",
        "observe": "Recueillir les observations locales",
        "helpResult": "Un convoi civil traverse en sécurité, sans conquête du territoire.",
        "observeResult": "Les observateurs conservent un registre de passages."
      }
    ]
  },
  "neralis": {
    "events": [
      {
        "id": "passeurs",
        "title": "Brouillard des marais",
        "text": "Le brouillard isole plusieurs voyageurs. Les passeurs locaux connaissent les passages et décident des secours.",
        "help": "Fournir des moyens aux passeurs",
        "observe": "Recouper les itinéraires signalés",
        "helpResult": "Les passeurs accompagnent les voyageurs hors des zones instables.",
        "observeResult": "Les témoignages permettent de repérer les trajets dangereux."
      },
      {
        "id": "fragments",
        "title": "Fragments des ruines",
        "text": "Des fragments anciens refont surface. Les archivistes veulent les préserver avant toute interprétation des serments.",
        "help": "Protéger le site archéologique",
        "observe": "Consigner l'origine des fragments",
        "helpResult": "Le site reste accessible à une commission d'archivistes.",
        "observeResult": "La provenance des fragments est enregistrée sans attribution de nouveaux pouvoirs."
      }
    ]
  }
};})();
