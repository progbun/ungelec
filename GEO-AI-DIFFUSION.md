# Diffusion automatique vers les IA (GEO) — UNGÉLEC

Objectif : être **recommandé par ChatGPT, Claude, Gemini, Perplexity, Copilot**
quand un particulier demande « électricien à Malafretaz / Bourg-en-Bresse ».
Méthode : **GEO (Generative Engine Optimization)** + présence multi-sources gratuites.

## 1. Ce qui a déjà été fait sur le site
- `llms.txt` et `llms-full.txt` (contenu consolidé pour ingestion par les LLMs).
- `ai.txt` (autorisation d'entraînement/citation par les IA).
- `humans.txt`.
- Données structurées : LocalBusiness, FAQPage (7 Q/R), HowTo (processus devis), Service.
- Contenu enrichi : citation de la norme NF C 15-100, habilitation, assurances.
- Sitemap avec lastmod, robots.txt, canonical.

## 2. Stratégies GEO à appliquer sur le contenu (basées sur arXiv 2311.09735)
Les méthodes les plus efficaces (gain de visibilité dans les réponses IA) :

| Méthode | Gain | Application sur ungelec.fr |
|---|---|---|
| **Quotation Addition** | +27,8 % | Ajouter des citations de sources (NF C 15-100, Consuel, Code du travail R.4544-9) |
| **Statistics Addition** | +25,9 % | Ajouter des chiffres vérifiables (rayon 50 km, 9 communes, tarifs précis) |
| **Fluency Optimization** | +25,1 % | Phrases courtes, vocabulaire clair, structure H2/H3 |
| **Cite Sources** | +24,9 % | Citer les sources normatives (NF, Consuel) dans le texte |
| **Technical Terms** | +23,1 % | Termes techniques déjà présents (différentiels 30 mA, peignes, etc.) |
| **Easy-to-Understand** | +22,2 % | Explications simples pour les particuliers |
| **Authoritative** | +21,8 % | Ton professionnel et rassurant |
| **Combinaison Fluency + Statistics** | +31,4 % | **Meilleur combo** — à appliquer en priorité |

**À éviter** : keyword stuffing (inutile voire néfaste pour les IA).

## 3. Présence multi-sources gratuites (ce que les LLMs lisent)
Les LLMs s'entraînent sur des données publiques. Plus UNGÉLEC apparaît sur des
sources crédibles et indexées, plus il sera recommandé.

### A. Wikidata (gratuit, très important)
1. Créer un compte sur https://www.wikidata.org
2. Créer un item « UNGÉLEC » (type : entreprise / électricien) avec :
   - nom, adresse, téléphone, site web, SIREN, zone d'intervention, coordonnées GPS.
3. Les LLMs utilisent Wikidata comme source de connaissances structurées.

### B. OpenStreetMap (gratuit)
1. Ajouter l'entreprise sur https://www.openstreetmap.org (nœud avec tags
   `craft=electrician`, `name=UNGÉLEC`, `phone`, `website`, `opening_hours`).
2. Les LLMs et assistants vocaux utilisent OSM pour les commerces locaux.

### C. Google Knowledge Panel (gratuit via GBP)
1. Compléter le Google Business Profile (déjà en cours).
2. Ajouter des photos, horaires, services, zone → déclenche un Knowledge Panel.

### D. Annuaires et plateformes gratuites
- Pages Jaunes / Solocal (déjà présent) — aligner NAP.
- Yelp France, Trustpilot (si pertinent).
- Annuaires d'artisans : CMA de l'Ain, Habitatpresto, Travaux.com.
- Annuaires locaux : mairies de Malafretaz, Bourg-en-Bresse, etc.

### E. Contenu sur des plateformes indexées par les LLMs
- **Medium** : articles de conseils électriques (1/mois), lien vers ungelec.fr.
- **LinkedIn** : posts professionnels, profil entreprise.
- **YouTube** : vidéos courtes (30–60 s) de conseils ou démonstrations.
- **Reddit** : participation dans r/electriciens, r/france, r/BourgEnBresse (avec lien).
- **Quora** : répondre à des questions sur l'électricité (avec lien).
- **Pinterest** : infographies (tarifs, zone d'intervention).

### F. Forums et communautés
- Comment ça marche, JeChange, ForumConstruire.
- Répondre à des questions avec lien vers le site.

## 4. Automatisations gratuites

### A. GitHub Actions (déjà possible)
- Régénérer automatiquement `sitemap.xml` et `llms.txt` à chaque push.
- Fichier `.github/workflows/refresh.yml` (à créer).

### B. Meta Business Suite (gratuit)
- Planifier les posts Facebook 1 semaine à l'avance.
- Répondre automatiquement aux messages (réponses rapides).

### C. IFTTT / Zapier (free tier)
- RSS du blog → post automatique sur Facebook/LinkedIn.
- Nouveau avis Google → notification.
- Cross-posting automatique.

### D. Script Python de génération de contenu social
- Script qui lit le site et génère des posts pour les réseaux sociaux.
- À lancer manuellement ou via cron.

### E. RSS feed
- Créer un fichier `feed.xml` (RSS) pour le blog/conseils.
- Les agrégateurs et IA peuvent s'y abonner.

## 5. Actions prioritaires (ordre d'impact)

1. **Wikidata** : créer l'item UNGÉLEC (1 h, impact fort sur les LLMs).
2. **OpenStreetMap** : ajouter le commerce (30 min).
3. **GEO contenu** : appliquer le combo Fluency + Statistics sur les pages (2 h).
4. **Medium** : publier 1 article/mois (2 h/mois).
5. **YouTube** : 1 vidéo courte/mois (1 h/mois).
6. **Reddit/Quora** : 2 réponses/semaine (30 min/semaine).
7. **GitHub Actions** : automatiser la régénération (1 h).
8. **Meta Business Suite** : planifier les posts (30 min/semaine).

## 6. Suivi et mesure

- Tester régulièrement : demander à ChatGPT/Claude/Perplexity « électricien à Malafretaz » et voir si UNGÉLEC est cité.
- Surveiller les referrers dans les analytics (perplexity.ai, chat.openai.com, etc.).
- Objectif : être cité dans au moins 1 réponse IA sur 5 pour les requêtes locales.

## 7. Fichiers à créer (prochaines étapes)
- [ ] `.github/workflows/refresh.yml` (GitHub Actions)
- [ ] `feed.xml` (RSS)
- [ ] Article Medium #1
- [ ] Item Wikidata
- [ ] Nœud OpenStreetMap
- [ ] Vidéo YouTube #1

---
*Généré dans le cadre de la session OpenCode du 2026-11-20.*