# DIVINE SHADOW

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

La saison comporte actuellement **27 épisodes scénarisés et 54 scènes jouables** (soit davantage que le minimum de 25 épisodes demandé), regroupés en cinq mouvements narratifs. **Cela ne signifie pas 27 épisodes d'une heure** : les scènes sont des prototypes courts à développer davantage.

| Épisodes | Mouvement | Objectifs narratifs |
| --- | --- | --- |
| 01–07 | Les Visages de la Cité | Prologue, vie quotidienne, civils, relations, politique, AETHER et MAILEIZ |
| 08–14 | Les Premières Cendres | Réception, disparition de documents, marché, reconnaissances, organisation défensive, première bataille |
| 15–19 | Le Prix des Choix | Secours, reconstruction, découverte de l'arme ennemie, seconde attaque, **choix mortel de MAILEIZ (épisode 19)** |
| 20–24 | Les Enquêtes | Archives, Conseil, expédition, ORVANN, Cendres, contre-opération, frère aux pactes |
| 25–27 | Les Derniers Serments | Sanctuaire, conséquences des pactes, retour devant les habitants, mémoire et épilogue |

Le joueur sélectionne **Mode Histoire** ou **Mode Impitoyable**, puis découvre un **prologue cinématique en cinq tableaux** raconté par le narrateur : la ville, les divinités, la mortalité de MAILEIZ, les premiers signes de menace et la décision d'entrer dans le récit. Un bouton permet de passer cette introduction.

Le **cheminement des épisodes** n'encombre plus l'écran principal : il est consultable dans le menu **Informations → Épisodes**. Les décisions de la scène utilisent désormais toute la largeur disponible.

### Mécaniques et conséquences

- **CHAYAH** est le protagoniste principal ; son HUD conserve la **Vitalité** et la **Puissance divine** visibles.
- Les humains mortels tels que **MAILEIZ** utilisent leur **Force** ; efforts, repos et fatigue peuvent l'affecter. Ce sont des valeurs de jeu et non une classification canonique des puissances.
- Le menu **Informations** contient Ville, Personnages, Relations, Épisodes et Journal.
- Les choix influencent les secours, les témoignages, les relations, la défense des quartiers, l'avancée ennemie et l'issue des trois affrontements tactiques.
- Les PNJ agissent selon des phases de temps. Il s'agit d'initiatives scriptées, **pas d'une IA autonome complète**.
- Au cours de l'**épisode 19**, MAILEIZ, mortelle, se précipite pour protéger une enfant face à une lance ennemie. CHAYAH peut **s'interposer**, **projeter un bouclier et absorber le choc**, ou **ne pas intervenir**. Les blessures et, en mode Impitoyable, une mort possible restent persistantes dans la partie ; une MAILEIZ décédée ne participe plus aux scènes suivantes.
- Les adversaires humains possèdent une jauge de **Force** distincte de la Puissance divine. Les créatures et personnages dont la nature reste à confirmer ne reçoivent pas automatiquement un statut immortel.

La progression est stockée localement dans `localStorage`, sous la clé **`divine-shadow-campaign-v5`**. Le passage aux 27 épisodes a nécessité une nouvelle version : les index des anciennes parties ne sont pas importés automatiquement. Les sauvegardes ne sont pas synchronisées entre appareils.

### Architecture de la Novela

| Fichier | Utilisation |
| --- | --- |
| `novela.html` | Page publique unique : choix du mode, prologue, scène, HUD, combat et menu d'informations |
| `novela-adventure.css` | Styles responsive, prologue narratif, écran de jeu, combats et menu |
| `novela-campaign-data.js` | Personnages, ressources, combats et scènes de base |
| `novela-season-25.js` | Assemblage de la **saison actuelle de 27 épisodes**, avec 54 scènes et cinématique (nom historique du fichier) |
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
