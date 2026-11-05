# DIVINE SHADOW

## Extension interactive — 175 épisodes (saison I)

La campagne interactive de `novela.html` possède désormais **175 épisodes reliés et 526 scènes**, dont **25 rencontres de combat**. Les 40 premiers épisodes restent jouables ; le dernier cesse d'être une fin de campagne pour ouvrir l'arc de la reconstruction.

L'extension (épisodes 41 à 175) est répartie en **neuf arcs de quinze épisodes** : *Les brûlures de la paix*, *Les villes sans drapeau*, *Le prix des masques*, *Les corps et les promesses*, *Le frère et les impurs*, *Le continent qui brûle*, *Le seuil sans soleil*, *L'Ancien d'avant le temps* et *Les serments qu'on garde*.

**Principaux éléments narratifs :** MARIN est le père adoptif de CHAYAH et légataire de la Mère. SAMA est l'ex-compagne de CHAYAH, avec laquelle persiste une intimité ; elle **ignore** ses sentiments réciproques avec MAILEIZ jusqu'à une révélation effective. Les conséquences de la vérité ou du silence sont conservées sous des drapeaux de sauvegarde. Les mortels conservent leur libre arbitre et peuvent mourir en mode impitoyable. **L'épisode 150** offre la confrontation avec une entité plus ancienne que CHAYAH et le choix de révéler une part de sa puissance, au prix d'énergie et de blessures, sans déduire que toute sa puissance est connue.

**Architecture :** neuf fichiers `novela-arcs-<plage>.js` chargent les intrigues 41–175. `novela-season-175.js` génère leurs scènes et raccorde les décisions, rencontres et fins ; `novela-campaign.js` affiche les ramifications conditionnelles et conserve la sauvegarde existante (`divine-shadow-campaign-v8`). Les épisodes disposent actuellement de trois ou quatre scènes jouables chacun, ce qui constitue une **première version** à enrichir littérairement, et non 175 chapitres longs achevés.

**Vérification :** syntaxe JavaScript correcte, 175 entrées dans l'index, aucune transition manquante et test de navigation complet sur Cloudflare jusqu'à la conclusion au 175e épisode, avec choix de vérité concernant SAMA et révélation de puissance à l'épisode 150.



**DIVINE SHADOW** est un site vitrine narratif et interactif consacré à un univers original de dark fantasy : divinités, humains, conflits, alliances, sentiments et conséquences. Projet indépendant de Base44, hébergé sur Cloudflare Pages.

**Site :** https://divine-shadow.pages.dev  
**Dépôt :** https://github.com/Motherlode94/DIVINE-SHADOW

## État actuel du projet

- **10 personnages présentés**, dont **3 antagonistes**, chacun avec une fiche individuelle.
- Portraits intégrés dans la galerie et les pages de personnage, à partir des fichiers du dossier `assets/`.
- Sections d'accueil : personnages, antagonistes, univers et rencontre CHAYAH–AETHER.
- Pages **Relations** et **Novela**, avec une unique campagne jouable à choix et conséquences.
- Interface responsive et présentation cinématique commune aux fiches.
- **Aucun système d'authentification ni moteur de jeu** : c'est actuellement un site statique narratif.

## Personnages

| N° | Personnage | Rôle ou titre | Page |
| --- | --- | --- | --- |
| 001 | CHAYAH VEHUHIA | Le Réécrivain | [chayah.html](./chayah.html) |
| 002 | AETHER | L'Archiviste | [aether.html](./aether.html) |
| 003 | MAILEIZ | La Flamme Écarlate — **mortelle** | [maileiz.html](./maileiz.html) |
| 004 | SERAPHYRA | La Silencieuse | [seraphyra.html](./seraphyra.html) |
| 005 | VORATHA | La Voyante — concept | [voratha.html](./voratha.html) |
| 006 | LÉA | L'Alchimiste — concept | [lea.html](./lea.html) |
| 007 | SORAYA | La Dominatrice — concept | [soraya.html](./soraya.html) |
| 008 | VAELKOR | Le Roi des Cendres — antagoniste, concept | [vaelkor.html](./vaelkor.html) |
| 009 | NYSSARA | L'Éclipse Vivante — antagoniste, concept | [nyssara.html](./nyssara.html) |
| 010 | ORVANN | Le Chirurgien des Âmes — antagoniste, concept | [orvann.html](./orvann.html) |

### Repères narratifs

- CHAYAH et AETHER sont **meilleurs amis**, divinités indépendantes et égales en dignité.
- MAILEIZ est **mortelle** : la Pyro-Genesis ne lui confère ni immortalité ni résurrection automatique. Son amour pour CHAYAH est réciproque ; il hésite encore à s'engager.
- SERAPHYRA appartient à la même **famille divine** que CHAYAH, sans parenté biologique. Certains de ses sentiments et secrets ne sont pas connus de tous les personnages.
- Les biographies, alliances et capacités marquées **« concept »** ou **« proposition »** restent à valider par le créateur. L'ajout d'une fiche n'officialise pas automatiquement toutes ses hypothèses.
- Les personnages conservent leur libre arbitre ; les conflits et conséquences ne sont pas déterminés à l'avance. Les scènes de la Novela sont exploratoires tant qu'elles ne sont pas validées comme canon.

## Novela interactive — Saison 1 : *La Nuit des Serments*

**[Jouer à la Novela](./novela.html)** : **une seule interface officielle**, sans la démo séparée « Les Non-Dits — trois épisodes / six décisions ». L'ancien chemin `novela-adventure.html` redirige vers `novela.html`.

### Progression de la saison

La saison comporte actuellement **40 épisodes scénarisés et 104 scènes jouables** (soit davantage que le minimum de 25 épisodes demandé), regroupés en cinq mouvements narratifs. **Cela ne signifie pas 40 épisodes d'une heure** : les scènes sont des prototypes courts à développer davantage.

| Épisodes | Mouvement | Objectifs narratifs |
| --- | --- | --- |
| 01–07 | Les Visages de la Cité | Prologue, vie quotidienne, civils, relations, politique, AETHER et MAILEIZ |
| 08–14 | Les Premières Cendres | Réception, disparition de documents, marché, reconnaissances, organisation défensive, première bataille |
| 15–19 | Le Prix des Choix | Secours, reconstruction, découverte de l'arme ennemie, seconde attaque, **choix mortel de MAILEIZ (épisode 19)** |
| 20–24 | Les Enquêtes | Archives, Conseil, expédition, ORVANN, Cendres, contre-opération, frère aux pactes |
| 25–27 | Les Derniers Serments | Sanctuaire, conséquences des pactes, retour devant les habitants et transition vers la guerre des cités |
| 28–32 | La Guerre des Cités | Appels de VALÉDOR, BRUMELAC, SOLENNE et armées humaines ou monstrueuses |
| 33–38 | Les Ordres du Voile | Notables complices, ASTERNE, généraux maudits, secondes demandes de renforts |
| 39–40 | Les Fins du Serment | Jugement des financeurs et assemblée des six cités |

Le joueur sélectionne **Mode Histoire** ou **Mode Impitoyable**, puis découvre un **prologue cinématique en cinq tableaux** raconté par le narrateur : la ville, les divinités, la mortalité de MAILEIZ, les premiers signes de menace et la décision d'entrer dans le récit. Un bouton permet de passer cette introduction.

Le **cheminement des épisodes** n'encombre plus l'écran principal : il est consultable dans le menu **Informations → Épisodes**. Les décisions de la scène utilisent désormais toute la largeur disponible.

### Direction narrative : le secret de CHAYAH

**Règle de la révélation** : CHAYAH ne montre pas toute sa puissance durant la saison actuellement jouable. Une révélation majeure **pourrait se produire à l'épisode 150**, face à une entité plus ancienne que lui, selon les décisions futures du créateur. Ce moment est **une direction scénaristique, non un épisode déjà écrit ou jouable**.

Les combats ne doivent pas devenir des démonstrations de toute-puissance : CHAYAH, immortel, peut saigner, souffrir, subir des fractures, perdre connaissance et échouer à protéger des habitants. Ces conséquences persistent dans la partie. L'immortalité ne signifie pas immunité physique.

Les scènes d'action emploient des descriptions incarnées (perception, mouvement, terrain, conséquences immédiates, réactions des adversaires et des alliés), complétées par des effets visuels abstraits originaux, sans reproduire de scènes ni d'animations de franchises existantes.

### Nouveau système de combat cinématique (prototype)

Le joueur peut choisir **Frappe ciblée, Void Step, Garde, Contre d'appui, Rempart divin, Sceau du réel, Sommation, Repli tactique**, et éventuellement **Rage contenue** après plusieurs deuils. Les compétences dépensent de l'énergie, peuvent transmettre un contrecoup physique à CHAYAH, et les blessures limitent les dégâts des coups suivants.

- **Niveau de lésions (0 à 8)** enregistré et affiché en combat ; blessures durables, même après une victoire.
- **Rage contenue** volontairement limitée : ce n'est ni une transformation divine ni la révélation des pouvoirs scellés.
- Les effets de scène (impacts, anneaux d'énergie, mouvements) sont des animations CSS stylisées. Il ne s'agit **pas de séquences vidéo animées** ou de chorégraphies 3D.
- La sauvegarde passe à `divine-shadow-campaign-v8` pour ne pas mélanger les anciennes parties sans gestion des blessures.

### Fenêtre de statut isekai et compétences

Le menu **Informations → Personnages → Statut — Divinités** présente un affichage inspiré des RPG isekai : **LVL, rang, classe, titre, PV, PM, caractéristiques (FOR, END, AGI, MAG, RES, PER) et liste de compétences**. Les valeurs non établies sont marquées **???**, pas inventées. **Le niveau n'est pas la réserve de PM, et la réserve de PM n'est pas la puissance totale**.

- **CHAYAH** : immortalité confirmée ; pouvoirs partiels de modification du réel, Void Step, sceau et rempart. Son potentiel véritable reste caché.
- **AETHER** : analyse des lois et matérialisation de constructions d'énergie. En combat, l'**Analyse des lois** affaiblit la cible et fournit du renseignement pour **15 PM d'AETHER** ; la **Construction d'énergie** blesse et gêne la formation adverse pour **24 PM d'AETHER**.
- **SERAPHYRA** : pouvoir non officiellement fixé, donc aucune compétence magique arbitraire n'est ajoutée.
- **MAILEIZ** : **mortelle**, mais possède **Pyro-Genesis**, utilisable lors de combats où elle est présente : attaque de flammes et suppression pour **28 points de Force**. Son pouvoir ne lui confère pas l'immortalité.

Ces aptitudes ont des effets de jeu concrets et des coûts propres à chaque personnage. L'interface est un prototype de système de statut, et non un classement canonique des divinités.

### Mécaniques et conséquences

- **CHAYAH** est le protagoniste principal ; son HUD conserve la **Vitalité** et la **Puissance divine** visibles.
- Les humains mortels tels que **MAILEIZ** utilisent leur **Force** ; efforts, repos et fatigue peuvent l'affecter. Ce sont des valeurs de jeu et non une classification canonique des puissances.
- Le menu **Informations** contient Ville, Personnages, Relations, Épisodes et Journal.
- Les choix influencent les secours, les témoignages, les relations, la défense des quartiers, l'avancée ennemie et l'issue des six affrontements tactiques.
- Les PNJ agissent selon des phases de temps. Il s'agit d'initiatives scriptées, **pas d'une IA autonome complète**.
- Au cours de l'**épisode 19**, MAILEIZ, mortelle, se précipite pour protéger une enfant face à une lance ennemie. CHAYAH peut **s'interposer**, **projeter un bouclier et absorber le choc**, ou **ne pas intervenir**. Les blessures et, en mode Impitoyable, une mort possible restent persistantes dans la partie ; une MAILEIZ décédée ne participe plus aux scènes suivantes.
- Les adversaires humains possèdent une jauge de **Force** distincte de la Puissance divine. Les créatures et personnages dont la nature reste à confirmer ne reçoivent pas automatiquement un statut immortel.

La progression est stockée localement dans `localStorage`, sous la clé **`divine-shadow-campaign-v8`**. Le passage aux 27 épisodes a nécessité une nouvelle version : les index des anciennes parties ne sont pas importés automatiquement. Les sauvegardes ne sont pas synchronisées entre appareils.

### Guerre des cités et fins diplomatiques

Six villes sont suivies séparément : VALÉDOR et SOLENNE (alliées), BRUMELAC et ASTERNE (neutres), KARTHOS et NÉRALIS (ennemies). Leur **confiance**, leur **sécurité** et leur **menace** évoluent.

Six appels à l'aide ont lieu aux épisodes **28, 30, 32, 34, 37 et 38**, avec décisions **OUI / NON**. Envoyer des renforts protège la ville mais réduit les unités disponibles chez CHAYAH. Refuser préserve ses moyens mais peut fragiliser une ville et rompre la confiance.

Trois généraux commandent des unités en groupes : DRAEVEN (trois escouades de 7 soldats humains), MORTHYS (deux meutes de 6 monstres), VELKHAR (trois cohortes de 5 maudits). CALDRA VOSS, EDRIC MORN et PRÉLAT VARESS se présentent publiquement comme bienfaiteurs et juges tout en commanditant des violences dans l'ombre. **Le combat représente actuellement un groupe par une réserve de PV agrégée, non une IA individuelle de chaque combattant.**

Plusieurs conclusions sont calculées à partir des villes secourues ou abandonnées, de la diplomatie, des pertes, du sort de MAILEIZ et de la vérité découverte sur le complot. Les nouveaux noms et lieux restent **des propositions de simulation non canoniques**.

### Architecture de la Novela

| Fichier | Utilisation |
| --- | --- |
| `novela.html` | Page publique unique : choix du mode, prologue, scène, HUD, combat et menu d'informations |
| `novela-adventure.css` | Styles responsive, prologue narratif, écran de jeu, combats et menu |
| `novela-campaign-data.js` | Personnages, ressources, combats et scènes de base |
| `novela-season-25.js` | Assemblage de la **saison actuelle de 27 épisodes**, avec 54 scènes et cinématique (nom historique du fichier) |
| `novela-war-data.js` | Cités, armées en groupes, généraux et commanditaires |
| `novela-war-episodes.js` | Épisodes 28–40 et demandes d'aide |
| `novela-campaign.js` | Moteur de simulation : décisions, conséquences, progression, combats, sauvegarde et narration |
| `novela-adventure.html` | Redirection vers la page officielle |
| `novela.js`, `novela-data.js`, `novela-adventure.js`, `novela-adventure-data.js` | Anciennes versions conservées mais non chargées |

### Principes de récit

Les personnages doivent avoir une histoire personnelle, des objectifs, des failles, du libre arbitre et un parcours d'évolution. Les scènes suivent une causalité compréhensible : vie quotidienne → tension → sortie → attaque → défense → pertes → enquête → expédition → conséquences. Les choix critiques ne doivent pas survenir avant que le joueur connaisse les personnages concernés.

**Limites actuelles :** l'ouverture est une cinématique textuelle illustrée (pas une vidéo animée ni une narration vocale), les épisodes sont encore courts, et la simulation demeure fondée sur des événements scriptés. Les mécanismes et événements **exploratoires** ne modifient pas le canon sans validation du créateur.

## Architecture du site

| Fichier | Fonction |
| --- | --- |
| `index.html` | Accueil, galerie des personnages, section antagonistes, univers et rencontre |
| `styles.css` | Styles du site et de ses galeries |
| `script.js` | Navigation mobile et interactions de l'accueil |
| `chayah.html`, `aether.html`, etc. | Dix pages individuelles suivant un même modèle HTML |
| `profile.js` | **Source commune** des données de personnages (nom, image, titre, histoire, pouvoirs, liens) |
| `profile.css` | **Styles communs** aux dix fiches de personnages |
| `relations.html` | Relations et tensions narratives |
| `novela.html`, `novela.js` | Présentation de la Novela et scènes interactives |
| `assets/` | Portraits PNG/JPG utilisés par le site |

### Règles techniques à respecter

1. **Une seule architecture de fiche.** Toute modification de structure ou de mise en page doit être réutilisable pour les dix personnages, sans créer une page visuellement incompatible.
2. **Les chemins doivent correspondre aux fichiers réels.** Le champ `image` dans `profile.js` contient le nom exact du fichier dans `assets/`. Éviter de renommer une image ou d'inventer une variante absente du dépôt.
3. **Même traitement d'affichage.** Les fiches chargent `profile.css` et `profile.js` communs. Les portraits utilisent un conteneur commun avec `object-fit: cover` et `object-position: center center`. Les couleurs d'accent diffèrent selon le personnage.
4. **Ne pas masquer les problèmes par des exceptions répétées.** Comparer les valeurs effectivement appliquées et supprimer les anciennes surcharges contradictoires.
5. **Images avec texte intégré :** le CSS ne supprime pas le lettrage déjà inscrit dans un PNG. Une version de l'illustration sans texte est préférable à un recadrage excessif ; une image d'origine peu définie ne gagne pas en netteté par simple agrandissement.
6. **Versionnement du cache :** actualiser les références CSS/JS dans les pages concernées après une modification afin d'éviter l'affichage d'anciens fichiers.

## Portraits des antagonistes : sources et versions sans texte

Les affiches d'origine `vaelkor_portrait.png`, `nyssara_portrait.png` et `orvann_portrait.png` sont conservées dans `assets/` à titre d'archives. Les cartes et fiches utilisent désormais **`vaelkor_clean.png`**, **`nyssara_clean.png`** et **`orvann_clean.png`** : recadrages sans texte de ces mêmes images, sans changement des visages.

Le script `scripts/clean-antagonist-portraits.py` produit les trois variantes à partir des sources par découpe identique de la partie inférieure contenant le lettrage. Le workflow GitHub Actions `.github/workflows/clean-antagonist-portraits.yml` exécute ce traitement lors de la modification du script ou des affiches et enregistre les résultats dans GitHub. **Ne pas remplacer les PNG propres par les affiches titrées** dans `index.html` ou `profile.js`.

## Lancer en local

Le site utilise **HTML, CSS et JavaScript natifs**, sans compilation, dépendance npm ni étape de build.

Ouvrir `index.html` dans un navigateur, ou servir le dossier à l'aide d'un serveur statique local pour tester les liens et les chemins d'assets dans des conditions proches de l'hébergement :

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

### Portraits des antagonistes

VAELKOR, NYSSARA et ORVANN utilisent désormais les portraits recadrés **sans bande typographique** : `assets/vaelkor_clean.png`, `assets/nyssara_clean.png` et `assets/orvann_clean.png`. Ces fichiers sont les images réellement utilisées dans `index.html` et `profile.js` ; les originaux `*_portrait.png` sont conservés à titre de source. Il n'est plus nécessaire d'utiliser un traitement de recadrage JavaScript ou des réglages de taille propres aux antagonistes.

## Vérifications avant publication

- Confirmer la présence des images référencées dans `assets/`, avec leurs noms et leur casse exacts.
- Ouvrir **chaque fiche** et vérifier les images, les titres longs, le responsive et les liens de retour.
- Comparer les dimensions, le cadrage et la typographie des trois antagonistes aux autres fiches.
- Tester la galerie principale, les liens vers les fiches, le menu mobile et les scènes de la Novela.
- Vérifier la **réussite du déploiement Cloudflare** et, séparément, contrôler le résultat **visuellement sur le site publié**. Une publication réussie ne prouve pas à elle seule que tous les portraits sont bien cadrés.

## Déploiement

**Cloudflare Pages :** [divine-shadow.pages.dev](https://divine-shadow.pages.dev)

- Projet : `divine-shadow`
- Dépôt connecté : `Motherlode94/DIVINE-SHADOW`
- Branche de production : `main`
- Dossier publié : racine `.`
- Commande de build : aucune
- Les mises à jour de `main` déclenchent des déploiements automatiques.

Le dépôt est également compatible avec un hébergement statique équivalent.

## Direction artistique

Ambiance dark fantasy cinématique : fond obsidienne, portraits détaillés, typographie forte et couleurs propres à chaque identité. Les nouveaux personnages doivent avoir des **visages, silhouettes, âges apparents, origines visuelles, costumes et attitudes distincts**, sans répétition mécanique des mêmes traits.

**Principe de gouvernance :** le créateur du projet décide du canon, des illustrations officielles et de toute modification de personnage.


## Population originale — 40 habitants

La page d’accueil présente désormais une section **Peuples & civils** (`#peuples`) avec quarante habitants de la planche d’origine : personnes africaines, arabes, hispaniques/latino-américaines, asiatiques, européennes et personnages des peuples fantastiques. Les filtres permettent de consulter chaque origine sans en déduire une allégeance ou un niveau de pouvoir.

**MARIN** est le père adoptif de CHAYAH, agriculteur africain bantou et **légataire de la Mère**. Cette relation canonique est présentée séparément en haut de la galerie. Les portraits principaux de CHAYAH, AETHER, MAILEIZ et des autres personnages validés restent inchangés.

- `site-population-data.js` : personnages, métiers, origines et relation familiale de MARIN.
- `site-population.js` : cartes de galerie, filtres et coordonnées des quarante vignettes.
- `assets/population/population-atlas.webp` : atlas optimisé issu de la planche originale, utilisé comme source des portraits. L’atlas est une prévisualisation compressée : des portraits haute définition individuels seront nécessaires pour une qualité d’affichage maximale.
