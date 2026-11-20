# Plan d'action — Augmenter les vues UNGÉLEC

Date : 2026-11-20
Site : https://ungelec.fr/ (dépôt `progbun/ungelec`)

## 0. Diagnostic (avant corrections)

Le site était **invisible pour Google** : toutes les pages contenaient
`<meta name="robots" content="noindex, nofollow">`. Conséquence : aucune page
n'était indexée, donc aucune vue organique possible. C'était le blocage #1.

Autres problèmes détectés :
- Incohérences de tarifs et de zone entre le site, `llms.txt` et les pages
  locales (ancienne grille 25/40 € vs nouvelle 30/45/60 € ; rayon 30 km vs 50 km).
- `schema.org` `geoRadius` à 30 000 m alors que la zone annoncée est 50 km.
- `manifest.webmanifest` pointait sur `/ungelec/` au lieu de `/`.
- `sitemap.xml` sans `lastmod`, et pages conseils manquantes.
- Aucune fiche Google Business optimisée / pas d'avis.
- Présence Facebook et Solocal (Pages Jaunes) à alimenter.
- Pas de stratégie de contenu longue traîne ni de backlinks locaux.

## 1. Corrections techniques appliquées (commit `fix/seo-indexation`)

- [x] `noindex, nofollow` → `index, follow` sur les 17 pages indexables
  (404.html et merci.html restent en `noindex`).
- [x] Alignement des frais de déplacement sur les 9 pages locales
  (30 / 45 / 60 € + au-delà de 50 km sur devis).
- [x] `geoRadius` : 30 000 → 50 000 m (cohérent avec la zone annoncée).
- [x] `manifest.webmanifest` : `start_url` et `scope` → `/`.
- [x] `llms.txt` réécrit (tarifs, zone 50 km, horaires, pages à jour) pour
  les assistants IA et les crawlers LLM.
- [x] `sitemap.xml` régénéré : 17 URLs, `lastmod`, priorités, pages conseils
  ajoutées.

## 2. Actions à faire maintenant (propriétaire du site)

### A. Google Search Console (gratuit, prioritaire)
1. Créer/valider la propriété `https://ungelec.fr/` dans Google Search Console.
2. Soumettre `https://ungelec.fr/sitemap.xml`.
3. Demander l'indexation manuelle de la page d'accueil et des pages locales.
4. Surveiller l'onglet « Couverture » : viser 17 pages indexées sous 2–4 semaines.
5. Vérifier l'absence d'erreurs (mobile usability, Core Web Vitals).

### B. Google Business Profile (levier #1 pour un artisan local)
1. Revendiquer/vérifier la fiche : https://g.page/r/CTxR1ZUKkInJEBQ
2. Catégorie principale : « Électricien ». Catégories secondaires : « Entrepreneur
   en rénovation », « Service de réparation ».
3. Remplir : horaires, zone de service (50 km), téléphone, site, photos
   (atelier, chantiers avant/après, logo, camionnette si applicable).
4. Ajouter des services détaillés et des photos régulièrement (1 par semaine).
5. Activer la messagerie et les questions/réponses.
6. **Demander un avis Google à chaque client satisfait** (lien direct d'avis).
   Objectif : 10 avis dans les 3 mois, puis 1/mois. Répondre à tous les avis.
7. Publier des « Actualités » Google (offres, réalisations) 1 fois par semaine.

### C. Solocal / Pages Jaunes (lien fourni)
1. Se connecter à https://manager.solocal.com et vérifier la fiche UNGÉLEC.
2. Aligner NAP (Nom, Adresse, Téléphone) strictement avec le site.
3. Ajouter photos, description, horaires, zone, lien site.
4. Vérifier que la fiche est bien indexée et sans doublon.

### D. Facebook (lien fourni)
1. Compléter la page : à propos, coordonnées, horaires, zone, services, lien site.
2. Publier 2–3 fois par semaine : photos de chantiers (avant/après), conseils,
   témoignages clients, rappels de services saisonniers.
3. Répondre rapidement aux messages et commentaires.
4. Inviter les clients satisfaits à aimer la page et laisser un avis.

### E. Annuaires et backlinks locaux (gratuits)
- Pages Jaunes, Yelp France, Trustpilot (si pertinent), annuaires d'artisans
  (Habitatpresto, Travaux.com, Quotatis — attention aux leads payants).
- Chambre de métiers de l'Ain (CMA), annuaire des artisans de l'Ain.
- Fédération française du bâtiment / syndicats locaux si adhésion.
- Partenariats locaux : agences immobilières, syndics, magasins de bricolage
  (Legrand/Schneider partenaires), électriciens confrères pour sous-traitance.
- Mairie de Malafretaz et communes voisines : annuaire des artisans locaux.

### F. Contenu (SEO longue traîne)
- Développer le blog « Conseils » : un article par mois ciblant des requêtes
  locales (ex. « prix tableau électrique Bourg-en-Bresse », « mise aux normes
  électrique Ain », « comment choisir un électricien à Bourg-en-Bresse »).
- Chaque article : 600–1000 mots, H2/H3, FAQ, lien interne vers les pages
  locales et tarifs, appel à l'action (devis).
- Créer des pages pour les communes manquantes si demande réelle
  (Pont-d'Ain, Marboz, Saint-Étienne-du-Bois, etc.).
- Ajouter des témoignages clients (avec accord) sur le site.

### G. Technique complémentaire
- Vérifier les Core Web Vitals (LCP, CLS, INP) via PageSpeed Insights.
- Ajouter des données structurées `Review`/`AggregateRating` une fois des avis
  Google disponibles.
- Mettre en place un suivi : Google Analytics 4 + événements (clic téléphone,
  WhatsApp, envoi formulaire).
- Vérifier le HTTPS/HSTS (déjà activé) et la redirection www → non-www.

### H. Suivi et KPI
- Trafic organique (sessions/mois) — objectif : +50 % en 3 mois.
- Pages indexées dans GSC — objectif : 17/17.
- Position moyenne sur « électricien Malafretaz », « électricien Bourg-en-Bresse ».
- Nombre d'avis Google et note moyenne — objectif : ≥ 4,5 / 5 avec ≥ 10 avis.
- Demandes de devis par mois (formulaire + téléphone + WhatsApp).

## 3. Ce qui est déjà bien fait (à conserver)
- Site rapide, mobile-first, données structurées LocalBusiness + FAQPage.
- Pages locales par commune (bon pour le SEO local).
- Tarifs transparents, devis clair, formulaire avec upload photos.
- Mentions légales et politique de confidentialité.
- Sitemap et robots.txt.

## 4. Ordre de priorité (si temps limité)
1. Google Search Console + sitemap (1 h).
2. Google Business Profile complet + photos (2 h).
3. Demander 5 avis Google aux derniers clients (1 h).
4. Publier sur Facebook 3 posts/semaine (continu).
5. 1 article de blog par mois (2 h/mois).
6. Backlinks locaux (1 h/mois).

---
*Généré dans le cadre de la session OpenCode du 2026-11-20.*