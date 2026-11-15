# Site de Mariage — Urlice & José
**Date** : 2026-11-15  
**Auteur** : Brainstorming session

---

## 1. Vision

Site web de mariage pour **Urlice & José**, mariage le **19 décembre 2026** à **Godomey Cococodji Fandji, Bénin**. Direction visuelle **"Nuit de Luxe"** : fond noir profond, illustrations line art inversées (blanc sur noir), typographie mixte script/majuscules, animations riches. Mobile-first.

---

## 2. Stack technique

| Couche | Choix |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | shadcn/ui |
| Styling | Tailwind CSS (thème sombre custom) |
| Animations | Framer Motion |
| Fonts | Great Vibes (script) · Playfair Display (serif) · Cormorant Garamond (body) |
| Formulaires | react-hook-form + zod |
| Déploiement | Vercel |

---

## 3. Thème shadcn customisé

```css
/* globals.css — variables CSS dark theme */
--background: 20 14 10        /* #08080A noir chaud */
--foreground: 245 243 238     /* #F5F3EE blanc ivoire */
--card: 15 15 13              /* #0F0F0D surface */
--border: 37 37 32            /* #252520 bordures subtiles */
--muted: 74 74 70             /* #4A4A46 texte atténué */
--accent: 255 255 255         /* #FFFFFF accent pur */
```

Toutes les variantes shadcn (Button, Input, Card, Badge…) héritent de ces variables.

---

## 4. Traitement des illustrations

Les 6 fichiers `img blanc noire/[1-6].jpg` sont des dessins line art au trait sur fond ivoire. Traitement CSS :

```css
filter: invert(1) brightness(0.88);
mix-blend-mode: screen;
```

Résultat : fond ivoire → noir transparent, lignes noires → blanches lumineuses. Les illustrations flottent sur le fond sombre du site.

---

## 5. Sections (8) — ordre de défilement

| # | ID | Titre | Composants shadcn | Animations |
|---|---|---|---|---|
| 1 | `hero` | Hero | — | Particules canvas · clip-path reveal illustration · stagger text fadeUp |
| 2 | `histoire` | Notre Histoire | Card | Timeline scroll-reveal · dot pulse |
| 3 | `countdown` | Compte à rebours | Badge | Flip number live (setInterval) · scroll reveal |
| 4 | `programme` | Programme | Separator · Badge | Timeline line draw au scroll |
| 5 | `galerie` | Les Mariés | — | Grid reveal stagger · hover scale+brightness |
| 6 | `rsvp` | RSVP | Button · Input · Textarea · Select · Form | Underline focus · submit success |
| 7 | `lieu` | Le Lieu | Separator | Google Maps embed grayscale inversé |
| 8 | `livre-dor` | Livre d'or | Card · Input · Textarea · Button | Message append animate |

---

## 6. Architecture des composants

```
app/
  layout.tsx          — Fonts Google, metadata, globals.css
  page.tsx            — Assemblage des sections
  globals.css         — Variables CSS dark theme + base styles

components/
  ui/                 — shadcn auto-générés (Button, Input, Card…)
  nav.tsx             — Navigation fixe + menu mobile drawer
  hero.tsx            — Canvas particles + illustration reveal + text
  histoire.tsx        — Timeline animée (Framer Motion)
  countdown.tsx       — Compteur live avec flip CSS
  programme.tsx       — Timeline journée
  galerie.tsx         — Grille 2 colonnes illustrations
  rsvp.tsx            — Formulaire react-hook-form + zod
  lieu.tsx            — Infos lieu + iframe Google Maps
  livre-dor.tsx       — Form + liste messages localStorage
  footer.tsx          — Prénoms + verset

lib/
  utils.ts            — cn() helper (shadcn standard)
  countdown.ts        — Hook useCountdown()
  
public/
  images/             — Copies des 6 illustrations JPG
```

---

## 7. Navigation

- **Desktop** : liens texte `font-size: 11px, letter-spacing: 2.5px` dans la navbar fixe
- **Mobile** : burger → `Sheet` shadcn (drawer) avec liens en script 32px
- Logo `"U & J"` en Great Vibes, ancre vers `#hero`

---

## 8. RSVP

Formulaire local (côté client) :
- Champs : nom complet, présence (toggle 2 boutons), nb personnes (Select), message optionnel (Textarea)
- Validation zod : nom requis, présence requise
- Soumission : `console.log` + affichage état success (extensible vers Google Sheets Apps Script)
- Deadline affichée : **1er Décembre 2026**

---

## 9. Livre d'or

- Stockage `localStorage` (côté client, persistant par navigateur)
- Messages préchargés (2 exemples) fusionnés avec ceux du localStorage
- Nouveau message : prepend avec animation Framer Motion `y: 20 → 0`

---

## 10. Performance mobile

- Images : `next/image` avec `priority` sur le hero, `lazy` pour le reste
- Fonts : `next/font/google` (auto-optimisé)
- Canvas particles : `requestAnimationFrame` avec 80 particules max
- Illustrations : WebP auto-converti par Next.js

---

## 11. Ce qui n'est PAS dans ce spec

- Backend / base de données (hors périmètre)
- Authentification des invités par lien personnalisé `?invite=` (feature future)
- Envoi d'email de confirmation (feature future)
- Intégration Google Sheets (endpoint à brancher ultérieurement sur le fetch RSVP)
