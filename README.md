# DIVINE SHADOW

> Univers original de dark fantasy et campagne narrative interactive centrée sur CHAYAH VEHUHIA, les habitants des six cités, leurs choix et leurs conséquences.

[**Site en ligne**](https://divine-shadow.pages.dev/) · [**Jouer à la Novela**](https://divine-shadow.pages.dev/novela.html) · [**Relations**](https://divine-shadow.pages.dev/relations.html)

## Révision éditoriale — personnages et rythme (première passe)

Une première réécriture a été intégrée dans `novela-literary-revision.js` **après** le chargement des épisodes 1–225 : **27 scènes des épisodes 1–11** reçoivent des passages narratifs et dialogues plus développés. Les introductions et motifs des personnages sont conservés et approfondis : MARIN (père adoptif), CHAYAH, MAILEIZ, AETHER, SERAPHYRA, MIREN, SELMA, TOMAS, ÉLÉAONOR et NADIR. Les indices concernant les routes et sceaux sont préparés avant les attaques ; aucun antagoniste n'est déclaré coupable sans enquête.

Onze parcours de personnages disposent désormais d'une grille **désir / contradiction / étapes / évolution**, visible progressivement dans **Informations → Arcs personnages**. Certaines conséquences de choix initiaux réapparaissent dans des scènes ultérieures (réserves médicales, documents d'archives, organisation des secours), sans effacer les branches déjà jouées.

**Limite éditoriale :** ce n'est pas encore une réécriture des 225 épisodes. Les scènes 12–225 et notamment les épisodes 28–40 demeurent en grande partie succincts. La guerre commence toujours vers l'épisode 12 : une restructuration intégrale de la chronologie est un chantier séparé, qui devra préserver les identifiants de sauvegarde et les conditions de mortalité. Les nouveaux passages appartiennent à cette version exploratoire, et ne ratifient pas de nouveaux pouvoirs ou destins canoniques.

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

### Préférences de lecture (v1)

La Novela dispose maintenant de réglages de lecture : augmentation/diminution de la taille du texte (14 à 22 px), masquage facultatif de l'illustration et dernier choix enregistré dans la partie. Les préférences visuelles sont enregistrées séparément dans `divine-shadow-reader-v1` pour éviter d'altérer la sauvegarde des décisions. L'historique conserve les 20 derniers choix narratifs par partie.

## Monde vivant — simulation par phases

La carte contient un simulateur de quartier : **6 régions, 18 lieux et 12 modèles d'événements locaux**. Les activités des habitants et des groupes évoluent avec les phases (aube, jour, crépuscule et nuit). Les incidents peuvent être réglés par les populations locales à expiration, même sans intervention de CHAYAH. L'aide et l'observation sont des options facultatives, avec coût d'énergie ou gain modéré de renseignement ; aucune décision n'impose une victoire militaire, une relation ou une résurrection.

La simulation dépend du **temps de jeu**, pas de l'horloge réelle : elle progresse pendant les actions et les voyages. Les incidents durent huit phases ; leurs résultats sont consignés dans les sauvegardes et accessibles via **Informations → Monde vivant**. L'interface de la carte montre les habitants, leurs occupations et les incidents actifs. Les régions débloquent leurs activités suivant la progression de l'histoire.

Cette première version est un **modèle de simulation narratif**, pas encore une IA qui déplace physiquement des PNJ sur une scène 3D. Les événements sont des propositions de gameplay et ne changent pas le canon établi.

## Systèmes RPG — inventaire, réputation, quêtes et journal

Le dossier **Informations** propose désormais trois onglets supplémentaires : **Inventaire**, **Quêtes** et **Réputation**, ainsi qu'un journal d'événements filtrable.

- **Inventaire documentaire** : preuves, notes de terrain, documents du Conseil et archives apparaissent seulement lorsque leurs conditions de découverte sont réellement remplies. On peut les sélectionner pour examiner leur provenance. Aucun équipement ou pouvoir non validé n'est accordé.
- **Réputation par cité** : combine la confiance diplomatique déjà calculée par le moteur avec la reconnaissance des habitants (au plus +4 par région), obtenue seulement la première fois que l'on aide dans un lieu. Une visite répétée ne donne pas une récompense supplémentaire.
- **Quêtes** : six objectifs liés aux flags et aux données de la campagne (évacuation, enquête, Conseil, renforts, exploration des cités et des lieux). Le joueur peut épingler une quête, visible près des décisions. La progression suit les événements existants, sans créer de scènes ni forcer de choix.
- **Journal** : affiche les événements persistants et permet de filtrer les choix, les voyages et les combats. Le journal existant de sauvegarde reste la source des événements.

Les nouveaux champs sont initialisés à la demande dans la **sauvegarde v8** : les parties existantes ne sont pas remises à zéro. Les documents acquis antérieurement sont déduits des drapeaux et des visites présents.

## Combat avancé et interconnexion RPG

Quatre postures physiques : **équilibrée**, **offensive** (+20 % de dégâts physiques, +25 % de riposte), **défensive** (−20 % de dégâts physiques, −30 % de riposte) et **mobile** (riposte réduite, entrée à 3 énergie). Un changement de posture est autorisé par tour. Au corps à corps : **Feinte** (esquive, ouverture) et **Riposte** (contre, 8 énergie). Ce ne sont pas de nouveaux pouvoirs divins.

Les combats conservent un historique des 30 derniers résultats, une quête tactique suit trois victoires ou retraits négociés, et les résultats modifient légèrement la tension et le moral de la région courante. Les changements sont consignés au journal. Les dialogues et décès restent inchangés. Animations via l'interface, pas encore de rigging corporel.

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
