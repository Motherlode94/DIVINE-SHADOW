# DIVINE SHADOW

> Univers original de dark fantasy et campagne narrative interactive centrée sur CHAYAH VEHUHIA, les habitants des six cités, leurs choix et leurs conséquences.

[**Site en ligne**](https://divine-shadow.pages.dev/) · [**Jouer à la Novela**](https://divine-shadow.pages.dev/novela.html) · [**Relations**](https://divine-shadow.pages.dev/relations.html)

## État du projet — novembre 2026

| Système | Contenu |
|---|---|
| Saison I — La Nuit des Serments | **225 épisodes**, **686 scènes** (index narratif, scènes générées et scènes originales) |
| Arcs prolongés | 176–200 : *Les Héritiers du Silence* ; 201–225 : *Les Neuf Serments* |
| Carte du continent | **6 cités** : Valédor, Brumelac, Asterne, Solenne, Karthos et Néralis |
| Exploration annexe | **18 lieux visitables**, rencontres et interventions locales |
| Progression | Épisodes séquentiels, pas de saut de chapitre |
| Combats | Phases 1/2, phase rapprochée si l'ennemi survit à **50 % de PV ou moins**, combos 0–4, 7 catégories d'ennemis illustrées |
| Sauvegarde | LocalStorage, clé `divine-shadow-campaign-v8` ; nouvelles données du monde ajoutées sans réinitialisation |
| Hébergement | Cloudflare Pages, publication depuis la branche `main` de GitHub |

Le projet est **une Novela jouable sur site web**, pas un monde ouvert 3D. Le système d'exploration est une **carte schématique et narrative** : ses visites ne remplacent ni les scènes des épisodes ni la simulation d'une ville en temps réel. Certaines images sont des illustrations d'ambiance ou des SVG stylisés, et non des visuels réalistes uniques pour chaque lieu.

### Exploration du continent

| Cité | Situation | Déblocage | Lieux |
|---|---|---:|---|
| Valédor | Alliée | Épisode 1 | Quartier du Palais, terres de MARIN, marché |
| Brumelac | Neutre | Épisode 28 | Maison des Cartographes, col, carrière |
| Asterne | Neutre | Épisode 30 | Port, Bibliothèque des Mers, quais |
| Solenne | Alliée | Épisode 32 | Jardins, dispensaire, sanctuaire |
| Karthos | Ennemie | Épisode 55 | Fort des Cendres, hameau, plaine |
| Néralis | Ennemie | Épisode 70 | Marais, citadelle, ruines |

La carte peut être ouverte depuis la campagne. Voyager consomme des phases ; les passages en territoire hostile coûtent davantage. Chaque lieu propose une intervention, des habitants concernés et une trace persistante dans la sauvegarde. Les événements de visite sont uniques par partie ; revisiter ne cumule pas indéfiniment les récompenses.

### Interface de lecture

- Progression de saison au-dessus de l'illustration et du texte, avec barre d'avancement.
- Accès rapide **Lire la scène / Décisions / Carte du monde**.
- Portrait connu du personnage présent ; sinon, image d'ambiance explicitement distinguée.
- Carte avec codes d'alliance, position actuelle, lieux et rencontres.
- Mises en page adaptées aux mobiles, navigation clavier et indication des actions.
- Combat : retours d'impact, dégâts infligés/subis et compétences accessibles au corps à corps.

## Dialogues cinématiques

La campagne dispose d’un panneau de dialogue intégré aux scènes hors combat : portraits issus des assets du dépôt lorsqu’une correspondance exacte existe, indicateur de tonalité (urgence, gravité, réflexion), bouton pour avancer ou lire le texte complet, et choix narratifs conservés dans le panneau de décisions. Les premières répliques attribuées proviennent des textes des scènes 1, 2, 4, 6, 7, 8 et 9. Pour les autres scènes, un court extrait du texte original est présenté comme **narration**, sans attribuer de fausses paroles à un personnage. Les personnages sans portrait confirmé utilisent un monogramme neutre. La sauvegarde reste en version 8 ; le dialogue reprend dans la scène en cours.

**Important :** les tonalités sont des effets de présentation, pas de nouvelles expressions faciales illustrées ou des affirmations de nouveaux pouvoirs. Le dialogue ne ressuscite aucun personnage décédé et ne change pas les conséquences existantes.

## Personnages et cohérence

CHAYAH est africain, immortel mais physiquement vulnérable aux blessures. MARIN est son **père adoptif**, à la suite de la volonté de sa mère. AETHER agit comme conseiller et allié autonome. SAMA et MAILEIZ conservent leur libre arbitre ; **MAILEIZ est mortelle**. Les routes où un personnage meurt ne doivent pas le faire revenir sans événement explicite. Les populations des cités sont diverses : aucune origine ne prédétermine un pouvoir, une profession ou une allégeance.

L'épisode 150 confronte CHAYAH à une présence antérieure à lui ; ses choix de révélation de puissance restent conditionnels. Les niveaux et rangs non validés sont affichés comme inconnus plutôt qu'inventés.

Les personnages et intrigues non encore ratifiés par le créateur demeurent des **propositions** : ne pas les traiter comme canon automatiquement.

## Modes et combat

**Mode Histoire :** la défaite peut permettre une continuation avec blessures et conséquences. **Mode Impitoyable :** la neutralisation peut clore la route ; les victimes et décisions restent importantes.

- Phase 1 : frappe, défense, Void Step, sceaux et interventions alliées conditionnelles.
- Phase 2 : Jab, Balayage, Saisie et Brise-garde avec combos et déséquilibre.
- Raccourcis `1`–`4` pour les quatre techniques rapprochées lorsqu'elles sont proposées.
- La phase 2 n'est pas un second ennemi ni une résurrection : elle intervient au cours du même combat.

## Structure des fichiers

| Fichiers | Responsabilité |
|---|---|
| `index.html`, `styles.css`, `script.js` | Site vitrine |
| `novela.html`, `novela-adventure.css` | Interface de campagne et mise en page |
| `novela-campaign-data.js`, `novela-season-25.js` | Base narrative |
| `novela-war-data.js`, `novela-war-episodes.js` | Cités, armées, guerre |
| `novela-arcs-41-55.js` à `novela-arcs-161-175.js` | Intrigues de l'extension |
| `novela-season-175.js`, `novela-season-200.js`, `novela-season-225.js` | Génération et raccordement des épisodes |
| `novela-world-data.js` | Carte continentale, six cités, 18 lieux |
| `novela-divinities.js` | Statuts divins et capacités connues |
| `novela-campaign.js` | Moteur des choix, combat, sauvegarde et exploration |
| `assets/cast/`, `assets/enemies/` | Portraits et SVG des adversaires |

L'ordre des scripts dans `novela.html` est important : charger les données, les extensions puis `novela-campaign.js` en dernier. Les SVG d'adversaires sont des premières représentations stylisées et ne remplacent pas des sprites animés complets.

## Développement et contrôles

Le site est statique : pour le prévisualiser localement, lancer un serveur HTTP dans le dossier du projet (par exemple `python -m http.server 8000`), puis ouvrir `http://localhost:8000/novela.html`.

Avant publication :

1. Vérifier la syntaxe des scripts et le chargement des extensions dans l'ordre.
2. Vérifier le compteur à **225**, les transitions de scènes et la conclusion.
3. Tester les deux modes de combat, le passage sous 50 % de PV et les raccourcis.
4. Tester la carte depuis une sauvegarde existante et une nouvelle partie, y compris les limites de déblocage.
5. Contrôler les illustrations manquantes, l'affichage mobile et l'état de déploiement Cloudflare.

Le déploiement Cloudflare Pages est configuré depuis le dépôt GitHub `Motherlode94/DIVINE-SHADOW`, branche `main`. Un commit déclenche une nouvelle publication ; **un déploiement lancé ne signifie pas encore qu'il a réussi**.

## Limites connues et évolutions prévues

- Dialogues des épisodes tardifs encore à approfondir : les 225 épisodes ne correspondent pas à 225 chapitres littéraires longs et finalisés.
- Carte continentale schématique, sans déplacements libres 3D ni intérieurs navigables.
- Certaines scènes réutilisent des ambiances visuelles ; tous les PNJ et régions n'ont pas leurs propres illustrations.
- Les combats utilisent des illustrations et animations d'interface, pas un système de rigging corporel complet.
- Vérifications visuelles en navigateur et tests de sauvegardes à renforcer.

---
**DIVINE SHADOW** — Projet narratif original. Les développements exploratoires n'établissent pas à eux seuls le canon de l'auteur.
