/* DIVINE SHADOW — monde explorable par excursions, continuité indépendante du canon. */
(()=>{const C=window.DS_CAMPAIGN;if(!C)return;C.world={
  "intro": "Carte narrative du continent. Les voyages sont des excursions : ils ne sautent pas les épisodes et le temps continue de s'écouler.",
  "cities": [
    {
      "id": "valedor",
      "name": "VALÉDOR",
      "x": 35,
      "y": 57,
      "unlock": 1,
      "description": "Capitale des conseils, marchés, remparts et fermes riveraines.",
      "sites": [
        {
          "id": "capital",
          "name": "Quartier du Palais",
          "npc": "ÉLÉAONOR",
          "text": "ÉLÉAONOR reçoit les pétitions des quartiers et confronte les rapports du Conseil.",
          "action": "Présenter les doléances des habitants",
          "effect": {
            "council": 1,
            "trust": 1
          },
          "result": "Les pétitions entrent au registre public; la réponse prendra du temps."
        },
        {
          "id": "ferme",
          "name": "Terres de MARIN",
          "npc": "MARIN",
          "text": "MARIN supervise les récoltes avec les paysans. Son rôle est celui de père adoptif de CHAYAH.",
          "action": "Aider à la récolte sans privilège",
          "effect": {
            "city": 2,
            "energy": -4
          },
          "result": "Les greniers gagnent quelques réserves. MARIN conserve ses propres décisions."
        },
        {
          "id": "marche",
          "name": "Marché des Tisserands",
          "npc": "MIREN",
          "text": "MIREN coordonne les commerçants et les familles de passage.",
          "action": "Organiser des distributions vérifiables",
          "effect": {
            "city": 1,
            "trust": 1
          },
          "result": "Les commerçants fixent leurs quotas et rendent leurs comptes."
        }
      ]
    },
    {
      "id": "brumelac",
      "name": "BRUMELAC",
      "x": 16,
      "y": 32,
      "unlock": 28,
      "description": "Cité neutre des cartographes, carrières et cols.",
      "sites": [
        {
          "id": "cartes",
          "name": "Maison des Cartographes",
          "npc": "NADIA",
          "text": "NADIA demande des preuves avant de laisser une divinité modifier ses cartes.",
          "action": "Partager des relevés sans imposer de carte",
          "effect": {
            "intel": 2,
            "trust": 1
          },
          "result": "Brumelac conserve la propriété de ses relevés."
        },
        {
          "id": "col",
          "name": "Col de Brumelac",
          "npc": "ARJUN",
          "text": "ARJUN examine les pistes et les passages utilisés par les caravanes.",
          "action": "Aider à baliser un chemin sûr",
          "effect": {
            "defense": 2,
            "energy": -4
          },
          "result": "Les caravanes reçoivent un nouveau balisage."
        },
        {
          "id": "carriere",
          "name": "Carrière des Veilleurs",
          "npc": "LES MINEURS",
          "text": "Les mineurs refusent de reprendre le chantier tant que le terrain reste instable.",
          "action": "Sécuriser le chantier avec leur accord",
          "effect": {
            "city": 1,
            "defense": 1
          },
          "result": "Une inspection indépendante confirme les portions exploitables."
        }
      ]
    },
    {
      "id": "asterne",
      "name": "ASTERNE",
      "x": 26,
      "y": 82,
      "unlock": 30,
      "description": "Port neutre, quais, marchés et archives maritimes.",
      "sites": [
        {
          "id": "port",
          "name": "Port d'Asterne",
          "npc": "LIVIA",
          "text": "LIVIA organise les navires et demande des garanties pour ses équipages.",
          "action": "Fournir des cartes et des provisions",
          "effect": {
            "trust": 1,
            "city": 1
          },
          "result": "Les équipages choisissent leurs routes et fixent leurs conditions."
        },
        {
          "id": "archives",
          "name": "Bibliothèque des Mers",
          "npc": "INÈS",
          "text": "INÈS compare les traductions de récits anciens apportés de plusieurs continents.",
          "action": "Confronter les sources sans les censurer",
          "effect": {
            "intel": 2
          },
          "result": "Des contradictions sont publiées au lieu d'être dissimulées."
        },
        {
          "id": "quais",
          "name": "Quais des Réfugiés",
          "npc": "LES BATELIERS",
          "text": "Les bateliers accueillent des familles privées de passage terrestre.",
          "action": "Renforcer les abris avec les volontaires",
          "effect": {
            "city": 2,
            "energy": -5
          },
          "result": "Les familles participent aux décisions sur l'accueil."
        }
      ]
    },
    {
      "id": "solenne",
      "name": "SOLENNE",
      "x": 66,
      "y": 23,
      "unlock": 32,
      "description": "Cité alliée des jardins, sanctuaires et guérisseurs.",
      "sites": [
        {
          "id": "jardins",
          "name": "Jardins des Lanternes",
          "npc": "SAMA",
          "text": "Les habitants entretiennent les jardins indépendamment des enjeux sentimentaux des divinités.",
          "action": "Participer à l'entretien des sentiers",
          "effect": {
            "city": 1,
            "trust": 1
          },
          "result": "Les jardins restent ouverts à toutes les communautés."
        },
        {
          "id": "dispensaire",
          "name": "Dispensaire des Collines",
          "npc": "SELMA",
          "text": "SELMA soigne les blessés et décide de l'organisation médicale.",
          "action": "Fournir du matériel sans interférer",
          "effect": {
            "city": 2
          },
          "result": "Les soignants répartissent eux-mêmes les ressources."
        },
        {
          "id": "abbaye",
          "name": "Sanctuaire des Serments",
          "npc": "SOREN",
          "text": "SOREN refuse les sacrifices imposés par les anciens pactes.",
          "action": "Examiner les pactes avec les témoins",
          "effect": {
            "intel": 1,
            "council": 1
          },
          "result": "Les témoins consignent leur désaccord et demandent une révision."
        }
      ]
    },
    {
      "id": "karthos",
      "name": "KARTHOS",
      "x": 85,
      "y": 39,
      "unlock": 55,
      "description": "Territoire ennemi : forteresses, lignes de ravitaillement et plaines brûlées.",
      "sites": [
        {
          "id": "fort",
          "name": "Fort des Cendres",
          "npc": "LES ÉCLAIREURS",
          "text": "Des éclaireurs surveillent les routes. Les civils des alentours ne sont pas assimilés à la garnison.",
          "action": "Observer les patrouilles sans attaquer les civils",
          "effect": {
            "intel": 2,
            "energy": -6
          },
          "result": "Les mouvements de la garnison sont consignés; aucune ville n'est conquise automatiquement."
        },
        {
          "id": "hameau",
          "name": "Hameau des Exilés",
          "npc": "LES HABITANTS",
          "text": "Les villageois réclament de l'eau et refusent d'être traités comme des ennemis.",
          "action": "Acheminer des réserves sous protection",
          "effect": {
            "city": 1,
            "trust": 2,
            "energy": -7
          },
          "result": "Les habitants organisent une distribution indépendante."
        },
        {
          "id": "plaine",
          "name": "Plaine des Étendards",
          "npc": "LES SENTINELLES",
          "text": "Des unités ennemies se disputent un passage. Un affrontement ne réglerait pas toutes les alliances.",
          "action": "Documenter les mouvements militaires",
          "effect": {
            "intel": 2,
            "defense": 1
          },
          "result": "Les défenses alliées reçoivent des renseignements vérifiés."
        }
      ]
    },
    {
      "id": "neralis",
      "name": "NÉRALIS",
      "x": 78,
      "y": 78,
      "unlock": 70,
      "description": "Territoire ennemi : marais, citadelles et zones de serments maudits.",
      "sites": [
        {
          "id": "marais",
          "name": "Marais des Échos",
          "npc": "LES PASSEURS",
          "text": "Les passeurs connaissent les sols instables et choisissent s'ils souhaitent guider CHAYAH.",
          "action": "Financer un passage sûr",
          "effect": {
            "intel": 1,
            "trust": 1,
            "energy": -4
          },
          "result": "Les passeurs restent libres de refuser de nouvelles missions."
        },
        {
          "id": "citadelle",
          "name": "Citadelle des Cohortes",
          "npc": "LES OBSERVATEURS",
          "text": "Des cohortes maudites sont repérées près des murailles, mais leur chaîne de commandement reste à établir.",
          "action": "Enquêter sur les ordres mystiques",
          "effect": {
            "intel": 2,
            "energy": -6
          },
          "result": "Un fragment de document est récupéré; la citadelle reste fortifiée."
        },
        {
          "id": "ruines",
          "name": "Ruines des Pactes",
          "npc": "LES ARCHIVISTES",
          "text": "Des archives fragmentaires parlent de lois plus anciennes que les cités.",
          "action": "Mettre les fragments en sécurité",
          "effect": {
            "intel": 2,
            "council": 1
          },
          "result": "Les fragments sont remis à une commission de plusieurs peuples."
        }
      ]
    }
  ]
};
})();
