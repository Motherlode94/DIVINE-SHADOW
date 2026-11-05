# DIVINE SHADOW

**DIVINE SHADOW** est un site vitrine narratif et interactif consacré à un univers original de dark fantasy : divinités, humains, conflits, alliances, sentiments et conséquences. Projet indépendant de Base44, hébergé sur Cloudflare Pages.

**Site :** https://divine-shadow.pages.dev  
**Dépôt :** https://github.com/Motherlode94/DIVINE-SHADOW

## État actuel du projet

- **10 personnages présentés**, dont **3 antagonistes**, chacun avec une fiche individuelle.
- Portraits intégrés dans la galerie et les pages de personnage, à partir des fichiers du dossier `assets/`.
- Sections d'accueil : personnages, antagonistes, univers et rencontre CHAYAH–AETHER.
- Pages **Relations** et **Novela**, avec une saison jouable à choix et conséquences.
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

## Novela interactive — *Les Non-Dits* (Saison 1)

La page [novela.html](./novela.html) est désormais une **fiction interactive jouable** et non un simple lecteur de scènes. Elle comprend :

- **3 épisodes enchaînés** : *Le Regard qui reste*, *Deux divinités, une promesse*, *La Cour des silences* ;
- **6 décisions à choix multiples**, avec des conséquences sur les relations, la franchise et les tensions ;
- des **dialogues conditionnels** qui évoluent en fonction des réponses des épisodes précédents ;
- un **journal des décisions**, des indicateurs de relations, un bouton d'annulation du dernier choix et plusieurs fins ;
- une **sauvegarde automatique locale** via `localStorage`, ainsi qu'une commande pour recommencer ;
- un lecteur responsive avec portraits, décor et dialogues, compatible avec les petits écrans.

**Fichiers :** `novela.html` (interface), `novela.css` (présentation), `novela-data.js` (épisodes et embranchements), `novela.js` (moteur de lecture et sauvegarde).

**Règle de continuité :** les décisions ne modifient que la partie en cours. Les scènes restent exploratoires et ne sont pas automatiquement ajoutées au canon officiel. MAILEIZ demeure mortelle, chaque personnage conserve son libre arbitre, et les secrets ne sont pas révélés sans événement narratif explicite.

Pour tester : terminer les trois épisodes avec différentes décisions, confirmer des fins différentes, recharger la page pour retrouver sa progression, puis vérifier l'affichage sur mobile.

## Campagne narrative simulée — *La Nuit des Serments* (prototype v2)

Accessible depuis [novela-adventure.html](./novela-adventure.html), cette campagne est une **tranche jouable** distincte du lecteur de la première saison. Elle suit une chaîne causale de **18 situations**, réparties sur **deux actes** :

1. Réception interrompue → sortie en ville → évacuation du marché → protection des blessés → organisation défensive du Général → bataille de la Porte Ouest → bilan humain → enquête avec AETHER et NADIR → décision du Conseil avec ÉLÉAONOR.
2. Départ hors de la ville → protection ou abandon relatif de voyageurs → enquête au laboratoire d'ORVANN → reconnaissance des ruines → embuscade du capitaine des Cendres → rencontre du frère de CHAYAH lié aux pactes → confrontation de l'Ombre → retour devant le Conseil → épilogue selon le bilan.

### Ce qui est déjà simulé

- **Temps par phases** : les décisions et les tours de combat font avancer la situation. Des attaques ou des initiatives secondaires se déclenchent selon la progression.
- **État de la ville** : sécurité civile, évacués, blessures, défense et progression adverse. La bataille n'est pas indépendante des préparatifs.
- **Initiative des PNJ** : le Général mobilise, MIREN abrite des réfugiés, SELMA soigne, ÉLÉAONOR organise l'aide, AETHER enquête. Leurs activités progressent selon les événements.
- **Relations et conséquences** : MAILEIZ reste libre et mortelle, AETHER peut contester CHAYAH, le Conseil réagit à la façon de gérer les preuves.
- **Combat tactique narratif** : trois affrontements scénarisés, avec attaque, Void Step, garde, sceau, sommation et repli ; les ennemis ripostent à chaque tour.
- **Modes Histoire / Impitoyable** : récupération après défaite avec conséquences, ou fin de route si CHAYAH est neutralisé.
- **Sauvegarde locale indépendante** sous `divine-shadow-campaign-v2`, sans authentification ni synchronisation.

### Architecture

- `novela-campaign-data.js` : chapitres, situations, texte, choix et batailles ;
- `novela-campaign.js` : gestion d'état, chronologie, décisions, initiatives de la ville, combat, bilan et sauvegarde ;
- `novela-adventure.html` et `novela-adventure.css` : interface adaptée ordinateur et mobile.

L'ancien prototype d'exploration `novela-adventure.js` / `novela-adventure-data.js` est conservé dans le dépôt mais **n'est plus chargé** par la page de campagne.

### Direction littéraire et simulation — principes de développement

1. **Personnages autonomes** : motivations, contradictions, failles et décisions indépendantes ; une statistique de relation ne force jamais un sentiment ou un choix.
2. **Récit incarné** : point de vue cohérent, scènes de vie, perception des émotions et conséquences observables, pas une succession de boîtes de dialogue.
3. **Causalité** : une sortie entraîne une rencontre, qui peut déclencher un secours, une alerte, une bataille, une enquête et des conséquences politiques.
4. **Ville vivante** : les habitants travaillent, se soignent, fuient, défendent leurs maisons et répondent aux événements. Le pouvoir divin de CHAYAH n'efface pas leur libre arbitre.
5. **Ennemis motivés** : une embuscade, un repli ou une négociation doivent correspondre à des objectifs ; les antagonistes ne sont pas de simples réserves de points de vie.
6. **Canon sous contrôle du créateur** : le Général, ÉLÉAONOR et le frère aux pactes sont inclus sans inventer de noms ou capacités non validés. MIREN, SELMA, TOMAS et NADIR sont des propositions de civils.

**Limites connues du prototype :** les 18 situations sont encore des scènes scriptées et non un monde ouvert autonome ; l'initiative des PNJ est basée sur des phases, pas une IA de planification avancée ; les combats sont textuels au tour par tour et non des affrontements en temps réel. La profondeur psychologique, les sous-intrigues et la durée des épisodes doivent continuer à être développées.

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
