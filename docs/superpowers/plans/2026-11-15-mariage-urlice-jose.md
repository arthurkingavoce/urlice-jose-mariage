# Mariage Urlice & José — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer un site de mariage Next.js 14 "Nuit de Luxe" — fond noir, illustrations line art inversées, animations Framer Motion, 8 sections, mobile-first, shadcn/ui.

**Architecture:** Application Next.js 14 App Router, single-page avec sections défilantes. Chaque section est un composant autonome assemblé dans `app/page.tsx`. Les 6 illustrations JPG sont copiées dans `public/images/` et traitées en CSS (`filter: invert(1) brightness(0.88); mix-blend-mode: screen`). Le RSVP et le livre d'or sont purement côté client (localStorage), prêts à être branchés sur un endpoint externe.

**Tech Stack:** Next.js 14 · shadcn/ui · Tailwind CSS · Framer Motion · react-hook-form · zod · TypeScript · Google Fonts (Great Vibes, Playfair Display, Cormorant Garamond)

---

## Fichiers à créer

```
(racine du projet = C:\Users\King\Documents\GitHub\Urlice&Jose)
├── app/
│   ├── layout.tsx          — Fonts, metadata, globals.css
│   ├── page.tsx            — Assemblage des 8 sections + Nav + Footer
│   └── globals.css         — Variables CSS dark theme + base styles
├── components/
│   ├── ui/                 — Généré par shadcn CLI (ne pas éditer)
│   ├── nav.tsx             — Navbar fixe + Sheet mobile
│   ├── ornament.tsx        — Séparateur décoratif réutilisable
│   ├── hero.tsx            — Canvas particles + illustration reveal + texte animé
│   ├── histoire.tsx        — Timeline animée (Framer Motion scroll)
│   ├── countdown.tsx       — Compteur live avec hook
│   ├── programme.tsx       — Timeline journée avec line draw
│   ├── galerie.tsx         — Grille 2 colonnes illustrations
│   ├── rsvp.tsx            — Formulaire react-hook-form + zod
│   ├── lieu.tsx            — Infos adresse + Google Maps embed
│   ├── livre-dor.tsx       — Form + localStorage + liste messages
│   └── footer.tsx          — Prénoms script + verset
├── hooks/
│   └── use-countdown.ts    — Hook retournant { days, hours, mins, secs }
├── lib/
│   └── utils.ts            — cn() helper (shadcn standard)
├── public/
│   └── images/
│       ├── 1.jpg … 6.jpg   — Copies des illustrations
├── tailwind.config.ts      — Thème dark custom + fonts
└── components.json         — Config shadcn
```

---

## Task 1 — Bootstrap projet Next.js

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `components.json`, `tsconfig.json`

- [ ] **Vérifier Node.js ≥ 18**

```bash
node --version
# Doit afficher v18.x.x ou supérieur
```

- [ ] **Créer le projet Next.js dans le répertoire courant**

```bash
cd "C:\Users\King\Documents\GitHub\Urlice&Jose"
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

Si la CLI demande de continuer sur un dossier non vide → taper `y`.

- [ ] **Installer les dépendances supplémentaires**

```bash
npm install framer-motion react-hook-form zod @hookform/resolvers
```

- [ ] **Initialiser shadcn/ui**

```bash
npx shadcn@latest init
```

Répondre aux prompts :
- Style → `Default`
- Base color → `Neutral`
- CSS variables → `Yes`

- [ ] **Installer les composants shadcn nécessaires**

```bash
npx shadcn@latest add button input textarea select card badge separator sheet form label
```

- [ ] **Copier les illustrations dans public/images/**

```bash
mkdir -p public/images
cp "img blanc noire/1.jpg" public/images/1.jpg
cp "img blanc noire/2.jpg" public/images/2.jpg
cp "img blanc noire/3.jpg" public/images/3.jpg
cp "img blanc noire/4.jpg" public/images/4.jpg
cp "img blanc noire/5.jpg" public/images/5.jpg
cp "img blanc noire/6.jpg" public/images/6.jpg
```

- [ ] **Vérifier que le projet démarre**

```bash
npm run dev
```

Ouvrir `http://localhost:3000` → page Next.js par défaut visible. Fermer le serveur (`Ctrl+C`).

- [ ] **Commit**

```bash
git init
git add -A
git commit -m "chore: bootstrap Next.js 14 + shadcn/ui + framer-motion"
```

---

## Task 2 — Thème dark custom (globals.css + tailwind.config.ts)

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Remplacer app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 8 8 6;
    --foreground: 245 243 238;
    --card: 15 15 13;
    --card-foreground: 245 243 238;
    --popover: 15 15 13;
    --popover-foreground: 245 243 238;
    --primary: 245 243 238;
    --primary-foreground: 8 8 6;
    --secondary: 25 25 22;
    --secondary-foreground: 154 152 144;
    --muted: 25 25 22;
    --muted-foreground: 100 100 96;
    --accent: 37 37 32;
    --accent-foreground: 245 243 238;
    --destructive: 180 40 40;
    --destructive-foreground: 245 243 238;
    --border: 37 37 32;
    --input: 37 37 32;
    --ring: 154 152 144;
    --radius: 0.25rem;
  }
}

@layer base {
  * { @apply border-border; }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  html { scroll-behavior: smooth; }
}

/* Curseur custom */
body { cursor: none; }
a, button, input, select, textarea, [role="button"] { cursor: none; }
```

- [ ] **Remplacer tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
      },
      fontFamily: {
        script: ["var(--font-script)"],
        serif: ["var(--font-serif)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

- [ ] **Vérifier la compilation**

```bash
npm run build
# Doit se terminer sans erreur TypeScript
```

- [ ] **Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "style: dark theme CSS variables + tailwind config"
```

---

## Task 3 — Layout + Fonts

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Remplacer app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Urlice & José — Mariage 19 Décembre 2026",
  description: "Vous êtes invités au mariage d'Urlice et José, le 19 décembre 2026 à Godomey Cococodji Fandji, Bénin.",
  openGraph: {
    title: "Urlice & José",
    description: "19 Décembre 2026 · Godomey, Bénin",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${greatVibes.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Vérifier**

```bash
npm run dev
```

Ouvrir `http://localhost:3000`. Inspecter l'élément body dans DevTools → vérifier que les CSS variables `--font-script`, `--font-serif`, `--font-body` sont présentes. Fermer (`Ctrl+C`).

- [ ] **Commit**

```bash
git add app/layout.tsx
git commit -m "feat: Google Fonts + metadata layout"
```

---

## Task 4 — Composant Ornament (réutilisable)

**Files:**
- Create: `components/ornament.tsx`

- [ ] **Créer components/ornament.tsx**

```tsx
export function Ornament() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="w-1.5 h-1.5 bg-muted-foreground rotate-45 flex-shrink-0" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add components/ornament.tsx
git commit -m "feat: Ornament decorative separator component"
```

---

## Task 5 — Curseur custom

**Files:**
- Create: `components/cursor.tsx`

- [ ] **Créer components/cursor.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 4}px`;
        dotRef.current.style.top = `${e.clientY - 4}px`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x - 12}px`;
        ringRef.current.style.top = `${ring.current.y - 12}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-2 h-2 bg-foreground rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{ transition: "transform 0.1s ease" }}
      />
      <div
        ref={ringRef}
        className="fixed w-6 h-6 border border-foreground/40 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ transition: "opacity 0.3s ease" }}
      />
    </>
  );
}
```

- [ ] **Commit**

```bash
git add components/cursor.tsx
git commit -m "feat: custom cursor with lag trail"
```

---

## Task 6 — Navigation

**Files:**
- Create: `components/nav.tsx`

- [ ] **Créer components/nav.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const links = [
  { label: "Histoire", href: "#histoire" },
  { label: "Programme", href: "#programme" },
  { label: "Galerie", href: "#galerie" },
  { label: "RSVP", href: "#rsvp" },
  { label: "Lieu", href: "#lieu" },
  { label: "Livre d'or", href: "#livredor" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : ""
      }`}
    >
      <a
        href="#hero"
        className="font-script text-2xl text-foreground/90 hover:text-foreground transition-colors"
      >
        U &amp; J
      </a>

      {/* Desktop */}
      <ul className="hidden md:flex gap-7 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-body text-[11px] tracking-[2.5px] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden text-foreground">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-background border-border flex flex-col items-center justify-center gap-10"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-script text-4xl text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </SheetContent>
      </Sheet>
    </nav>
  );
}
```

- [ ] **Vérifier visuellement**

```bash
npm run dev
```

Ajouter temporairement `<Nav />` dans `app/page.tsx` et vérifier :
- Desktop : liens visibles en haut à droite
- Mobile (DevTools → iPhone) : burger visible, Sheet s'ouvre avec liens en script

- [ ] **Commit**

```bash
git add components/nav.tsx
git commit -m "feat: responsive nav with shadcn Sheet mobile drawer"
```

---

## Task 7 — Section Hero

**Files:**
- Create: `components/hero.tsx`

- [ ] **Créer components/hero.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; life: number; maxLife: number;
    };

    const particles: P[] = [];
    const count = 80;

    const make = (): P => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.4 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.4 + 0.1),
      opacity: Math.random() * 0.5 + 0.1,
      life: 0,
      maxLife: Math.random() * 300 + 200,
    });

    for (let i = 0; i < count; i++) {
      const p = make();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        const alpha = p.opacity * Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,243,238,${alpha.toFixed(3)})`;
        ctx.fill();
        if (p.life >= p.maxLife) Object.assign(p, make(), { life: 0 });
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-end pb-16 overflow-hidden bg-background"
    >
      <ParticlesCanvas />

      {/* Illustration */}
      <div className="absolute inset-0 flex items-start justify-center pt-16 z-10">
        <motion.div
          className="relative h-[72vh] max-h-[600px]"
          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0 0 0)", opacity: 0.92 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <Image
            src="/images/2.jpg"
            alt="Urlice & José"
            width={320}
            height={600}
            priority
            className="h-full w-auto object-contain"
            style={{ filter: "invert(1) brightness(0.88)", mixBlendMode: "screen" }}
          />
          {/* Fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-background to-transparent" />
        </motion.div>
      </div>

      {/* Texte */}
      <div className="relative z-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="font-body text-[10px] tracking-[5px] uppercase text-muted-foreground mb-1"
        >
          Vous êtes invités au mariage de
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="font-script leading-none"
          style={{ fontSize: "clamp(64px, 18vw, 96px)" }}
        >
          <span className="text-foreground">Urlice</span>
          <span className="block font-serif text-lg tracking-[8px] text-muted-foreground italic my-1">
            &amp;
          </span>
          <span className="text-foreground">José</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="font-body text-[11px] tracking-[4px] uppercase text-muted-foreground mt-4"
        >
          19 · Décembre · 2026 · Godomey, Bénin
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[9px] tracking-[3px] uppercase text-muted-foreground/60">
          Découvrir
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-muted-foreground/50 to-transparent"
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
```

- [ ] **Vérifier visuellement**

```bash
npm run dev
```

Ajouter `<Hero />` dans `app/page.tsx`. Vérifier :
- Illustration apparaît progressivement de bas en haut sur fond noir
- Particules flottent
- Texte "Urlice & José" en script visible
- Sur mobile (DevTools) : illustration correctement dimensionnée

- [ ] **Commit**

```bash
git add components/hero.tsx
git commit -m "feat: Hero section with particles, illustration reveal and text animations"
```

---

## Task 8 — Section Notre Histoire

**Files:**
- Create: `components/histoire.tsx`

- [ ] **Créer components/histoire.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { Ornament } from "./ornament";

const events = [
  {
    side: "left" as const,
    label: "La rencontre",
    title: "Un regard qui change tout",
    desc: "C'est lors d'une soirée entre amis que leurs regards se sont croisés pour la première fois. Quelque chose d'indéfinissable, mais inoubliable.",
  },
  {
    side: "right" as const,
    label: "Les premières sorties",
    title: "Chaque moment, un souvenir",
    desc: "Des promenades, des rires, des confidences partagées. Ils ont construit, pas à pas, quelque chose de solide et de beau.",
  },
  {
    side: "left" as const,
    label: "La demande",
    title: "Elle a dit oui",
    desc: "Dans un moment de grâce et d'émotion, José a posé la question qui allait sceller leur destin commun.",
  },
  {
    side: "right" as const,
    label: "19 Décembre 2026",
    title: "Pour l'éternité",
    desc: "Aujourd'hui, ils vous invitent à partager avec eux le plus beau chapitre de leur histoire.",
  },
];

function TimelineItem({
  event,
  index,
}: {
  event: (typeof events)[0];
  index: number;
}) {
  const isLeft = event.side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`flex items-start gap-4 mb-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <p className="font-body text-[10px] tracking-[3px] uppercase text-muted-foreground mb-1">
          {event.label}
        </p>
        <h3 className="font-serif text-lg italic text-foreground mb-2">
          {event.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {event.desc}
        </p>
      </div>
      <div className="flex-shrink-0 mt-1.5 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="w-2.5 h-2.5 rounded-full border border-muted-foreground bg-background"
          whileHover={{ backgroundColor: "rgb(var(--foreground))", borderColor: "rgb(var(--foreground))" }}
        />
      </div>
    </motion.div>
  );
}

export function Histoire() {
  return (
    <section id="histoire" className="py-24 bg-card">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-6"
      >
        <p className="font-body text-[10px] tracking-[4px] uppercase text-muted-foreground mb-2">
          Depuis le début
        </p>
        <h2 className="font-script text-5xl text-foreground">Notre Histoire</h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
      </motion.div>

      <div className="relative max-w-sm mx-auto px-6">
        {/* Ligne centrale verticale */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2" />
        {events.map((e, i) => (
          <TimelineItem key={i} event={e} index={i} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Vérifier visuellement**

Ajouter `<Histoire />` dans `app/page.tsx`. Vérifier :
- Timeline visible avec ligne verticale centrale
- Items alternent gauche/droite
- Animation décalée au scroll

- [ ] **Commit**

```bash
git add components/histoire.tsx
git commit -m "feat: Histoire timeline with Framer Motion scroll animations"
```

---

## Task 9 — Hook useCountdown + Section Countdown

**Files:**
- Create: `hooks/use-countdown.ts`
- Create: `components/countdown.tsx`

- [ ] **Écrire le test pour useCountdown**

Créer `__tests__/use-countdown.test.ts` :

```ts
import { renderHook, act } from "@testing-library/react";
import { useCountdown } from "@/hooks/use-countdown";

describe("useCountdown", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("retourne des valeurs numériques positives pour une date future", () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 25); // +25h
    const { result } = renderHook(() => useCountdown(future));
    expect(result.current.days).toBeGreaterThanOrEqual(0);
    expect(result.current.hours).toBeGreaterThanOrEqual(0);
    expect(result.current.mins).toBeGreaterThanOrEqual(0);
    expect(result.current.secs).toBeGreaterThanOrEqual(0);
  });

  it("retourne 0 pour une date passée", () => {
    const past = new Date(Date.now() - 1000);
    const { result } = renderHook(() => useCountdown(past));
    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.mins).toBe(0);
    expect(result.current.secs).toBe(0);
  });

  it("décrémente les secondes", () => {
    const future = new Date(Date.now() + 10000);
    const { result } = renderHook(() => useCountdown(future));
    const initial = result.current.secs;
    act(() => { jest.advanceTimersByTime(2000); });
    expect(result.current.secs).toBeLessThanOrEqual(initial);
  });
});
```

- [ ] **Installer jest + testing-library**

```bash
npm install -D jest @testing-library/react @testing-library/react-hooks jest-environment-jsdom @types/jest ts-jest
```

Ajouter dans `package.json` :
```json
"jest": {
  "preset": "ts-jest",
  "testEnvironment": "jsdom",
  "moduleNameMapper": { "^@/(.*)$": "<rootDir>/$1" }
},
"scripts": {
  "test": "jest"
}
```

- [ ] **Lancer le test → vérifier qu'il échoue**

```bash
npm test -- --testPathPattern=use-countdown
# Attendu : FAIL — "Cannot find module '@/hooks/use-countdown'"
```

- [ ] **Créer hooks/use-countdown.ts**

```ts
"use client";

import { useEffect, useState } from "react";

type Countdown = { days: number; hours: number; mins: number; secs: number };

function calc(target: Date): Countdown {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function useCountdown(target: Date): Countdown {
  const [state, setState] = useState<Countdown>(() => calc(target));

  useEffect(() => {
    const id = setInterval(() => setState(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return state;
}
```

- [ ] **Lancer le test → vérifier qu'il passe**

```bash
npm test -- --testPathPattern=use-countdown
# Attendu : PASS (3 tests)
```

- [ ] **Créer components/countdown.tsx**

```tsx
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/use-countdown";
import { Ornament } from "./ornament";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[60px]">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-5xl font-bold text-foreground leading-none tracking-tighter"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="font-body text-[8px] tracking-[3px] uppercase text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const target = useMemo(() => new Date("2026-12-19T10:00:00"), []);
  const { days, hours, mins, secs } = useCountdown(target);

  return (
    <section id="countdown" className="py-20 bg-background text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-sm mx-auto px-6"
      >
        <p className="font-body text-[10px] tracking-[4px] uppercase text-muted-foreground mb-10">
          Plus que
        </p>

        <div className="flex justify-center items-start gap-2">
          <Unit value={days} label="Jours" />
          <span className="font-serif text-4xl text-muted-foreground/40 mt-1">:</span>
          <Unit value={hours} label="Heures" />
          <span className="font-serif text-4xl text-muted-foreground/40 mt-1">:</span>
          <Unit value={mins} label="Min" />
          <span className="font-serif text-4xl text-muted-foreground/40 mt-1">:</span>
          <Unit value={secs} label="Sec" />
        </div>

        <div className="max-w-[160px] mx-auto">
          <Ornament />
        </div>
        <p className="font-script text-3xl text-muted-foreground">
          avant le grand jour
        </p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Vérifier visuellement**

```bash
npm run dev
```

Ajouter `<Countdown />` dans `app/page.tsx`. Vérifier que les secondes défilent en temps réel.

- [ ] **Commit**

```bash
git add hooks/use-countdown.ts components/countdown.tsx __tests__/use-countdown.test.ts
git commit -m "feat: useCountdown hook (tested) + Countdown section"
```

---

## Task 10 — Section Programme

**Files:**
- Create: `components/programme.tsx`

- [ ] **Créer components/programme.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { Ornament } from "./ornament";
import { Separator } from "@/components/ui/separator";

const items = [
  { time: "09h00", title: "Accueil des invités", desc: "Rafraîchissements de bienvenue" },
  { time: "10h00", title: "Cérémonie", desc: "L'union d'Urlice & José" },
  { time: "12h30", title: "Séance photos", desc: "Avec les mariés et leurs proches" },
  { time: "14h00", title: "Réception & Déjeuner", desc: "Repas festif et chaleureux" },
  { time: "20h00", title: "Soirée & Danse", desc: "Jusqu'au bout de la nuit" },
];

export function Programme() {
  return (
    <section id="programme" className="py-24 bg-card">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-6"
      >
        <p className="font-body text-[10px] tracking-[4px] uppercase text-muted-foreground mb-2">
          Le 19 Décembre 2026
        </p>
        <h2 className="font-script text-5xl text-foreground">Programme</h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
      </motion.div>

      <div className="relative max-w-sm mx-auto px-8">
        {/* Ligne verticale */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="flex gap-5 mb-8 pl-4 relative"
          >
            {/* Dot */}
            <div className="absolute left-[-3px] top-1.5 w-2 h-2 rounded-full border border-muted-foreground bg-card z-10" />

            <span className="font-body text-[11px] tracking-[1px] text-muted-foreground whitespace-nowrap pt-0.5 min-w-[42px]">
              {item.time}
            </span>
            <div>
              <h3 className="font-serif text-base italic text-foreground">
                {item.title}
              </h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Vérifier visuellement**

```bash
npm run dev
```

Ajouter `<Programme />` dans `app/page.tsx`. Vérifier la timeline avec line verticale et items animés.

- [ ] **Commit**

```bash
git add components/programme.tsx
git commit -m "feat: Programme timeline section"
```

---

## Task 11 — Section Galerie

**Files:**
- Create: `components/galerie.tsx`

- [ ] **Créer components/galerie.tsx**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Ornament } from "./ornament";

const images = [
  { src: "/images/1.jpg", alt: "Urlice & José — tenue de cérémonie", span: 2 },
  { src: "/images/5.jpg", alt: "Moment intime", span: 1 },
  { src: "/images/6.jpg", alt: "Complicité", span: 1 },
  { src: "/images/3.jpg", alt: "Portrait du couple", span: 1 },
  { src: "/images/4.jpg", alt: "Élégance", span: 1 },
];

export function Galerie() {
  return (
    <section id="galerie" className="py-24 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 px-6"
      >
        <p className="font-body text-[10px] tracking-[4px] uppercase text-muted-foreground mb-2">
          Portraits
        </p>
        <h2 className="font-script text-5xl text-foreground">Les Mariés</h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-0.5 max-w-sm mx-auto px-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08 }}
            className={`relative overflow-hidden bg-card ${
              img.span === 2 ? "col-span-2 aspect-[2/1]" : "aspect-[3/4]"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-all duration-700"
              style={{
                filter: "invert(1) brightness(0.82)",
                mixBlendMode: "screen",
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Vérifier visuellement**

```bash
npm run dev
```

Ajouter `<Galerie />`. Vérifier :
- Image 1 en bannière pleine largeur (col-span-2)
- 4 autres en grille 2×2
- Illustrations affichées en blanc sur fond noir (filter invert)

- [ ] **Commit**

```bash
git add components/galerie.tsx
git commit -m "feat: Galerie illustration grid with hover animations"
```

---

## Task 12 — Section RSVP

**Files:**
- Create: `components/rsvp.tsx`
- Create: `__tests__/rsvp-schema.test.ts`

- [ ] **Écrire le test de validation zod**

Créer `__tests__/rsvp-schema.test.ts` :

```ts
import { rsvpSchema } from "@/components/rsvp";

describe("rsvpSchema", () => {
  it("accepte une réponse valide présent", () => {
    const result = rsvpSchema.safeParse({
      name: "Famille Amoussou",
      attendance: "yes",
      guests: "2",
      message: "",
    });
    expect(result.success).toBe(true);
  });

  it("accepte une réponse valide absent", () => {
    const result = rsvpSchema.safeParse({
      name: "Jean Dupont",
      attendance: "no",
      guests: "1",
      message: "Avec vous de tout cœur",
    });
    expect(result.success).toBe(true);
  });

  it("rejette un nom vide", () => {
    const result = rsvpSchema.safeParse({
      name: "",
      attendance: "yes",
      guests: "1",
      message: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("name");
  });

  it("rejette une attendance invalide", () => {
    const result = rsvpSchema.safeParse({
      name: "Test",
      attendance: "maybe",
      guests: "1",
      message: "",
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Lancer le test → vérifier qu'il échoue**

```bash
npm test -- --testPathPattern=rsvp-schema
# Attendu : FAIL — "Cannot find module '@/components/rsvp'"
```

- [ ] **Créer components/rsvp.tsx**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Ornament } from "./ornament";

export const rsvpSchema = z.object({
  name: z.string().min(2, "Veuillez indiquer votre nom"),
  attendance: z.enum(["yes", "no"]),
  guests: z.string(),
  message: z.string().optional(),
});

type RsvpValues = z.infer<typeof rsvpSchema>;

export function Rsvp() {
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");

  const form = useForm<RsvpValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { name: "", attendance: "yes", guests: "2", message: "" },
  });

  function onSubmit(data: RsvpValues) {
    console.log("RSVP:", data);
    // TODO: fetch("/api/rsvp", { method: "POST", body: JSON.stringify(data) })
    setSubmitted(true);
  }

  return (
    <section id="rsvp" className="py-24 bg-card">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 px-6"
      >
        <p className="font-body text-[10px] tracking-[4px] uppercase text-muted-foreground mb-2">
          Confirmez votre présence
        </p>
        <h2 className="font-script text-5xl text-foreground">RSVP</h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
        <p className="font-body text-sm text-muted-foreground mt-2">
          Merci de confirmer avant le{" "}
          <strong className="text-foreground">1er Décembre 2026</strong>
        </p>
      </motion.div>

      <div className="max-w-sm mx-auto px-6">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" exit={{ opacity: 0, y: -16 }}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-[10px] tracking-[3px] uppercase text-muted-foreground">
                          Votre nom complet
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Famille Amoussou…"
                            className="bg-transparent border-0 border-b border-border rounded-none px-0 font-body text-base focus-visible:ring-0 focus-visible:border-muted-foreground"
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attendance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-[10px] tracking-[3px] uppercase text-muted-foreground">
                          Serez-vous présent(e) ?
                        </FormLabel>
                        <div className="flex gap-3 mt-1">
                          {(["yes", "no"] as const).map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => {
                                setAttendance(val);
                                field.onChange(val);
                              }}
                              className={`flex-1 py-2.5 border font-body text-[10px] tracking-[3px] uppercase transition-all duration-200 ${
                                attendance === val
                                  ? "bg-foreground text-background border-foreground"
                                  : "border-border text-muted-foreground hover:border-muted-foreground"
                              }`}
                            >
                              {val === "yes" ? "Avec joie ✓" : "Dans le cœur ✗"}
                            </button>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  {attendance === "yes" && (
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-[10px] tracking-[3px] uppercase text-muted-foreground">
                            Nombre de personnes
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none px-0 font-body focus:ring-0">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-border">
                              {["1", "2", "3", "4", "5+"].map((v) => (
                                <SelectItem key={v} value={v} className="font-body">
                                  {v === "5+" ? "5 personnes ou plus" : `${v} personne${v === "1" ? "" : "s"}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-[10px] tracking-[3px] uppercase text-muted-foreground">
                          Un message (optionnel)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Vos vœux, une pensée…"
                            rows={3}
                            className="bg-transparent border-0 border-b border-border rounded-none px-0 font-body text-base focus-visible:ring-0 focus-visible:border-muted-foreground resize-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full font-body text-[10px] tracking-[4px] uppercase py-5 bg-foreground text-background hover:bg-foreground/90 rounded-none mt-2"
                  >
                    Confirmer ma présence
                  </Button>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <h3 className="font-script text-5xl text-foreground mb-4">Merci !</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Votre présence nous touche profondément.
                <br />
                Urlice & José ont hâte de vous retrouver.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Lancer le test → vérifier qu'il passe**

```bash
npm test -- --testPathPattern=rsvp-schema
# Attendu : PASS (4 tests)
```

- [ ] **Vérifier visuellement**

```bash
npm run dev
```

Ajouter `<Rsvp />`. Vérifier :
- Toggle présent/absent fonctionne (Select nb personnes s'affiche/cache)
- Soumission avec nom vide → message d'erreur visible
- Soumission valide → message de succès animé

- [ ] **Commit**

```bash
git add components/rsvp.tsx __tests__/rsvp-schema.test.ts
git commit -m "feat: RSVP form with react-hook-form + zod validation (tested)"
```

---

## Task 13 — Section Lieu

**Files:**
- Create: `components/lieu.tsx`

- [ ] **Créer components/lieu.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { Ornament } from "./ornament";

export function Lieu() {
  return (
    <section id="lieu" className="pb-0 pt-24 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 px-6"
      >
        <p className="font-body text-[10px] tracking-[4px] uppercase text-muted-foreground mb-2">
          Où nous retrouver
        </p>
        <h2 className="font-script text-5xl text-foreground">Le Lieu</h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-sm mx-auto px-6 mb-10"
      >
        <p className="font-serif text-xl italic text-foreground text-center leading-relaxed mb-8">
          Godomey Cococodji Fandji
          <br />
          <span className="text-sm text-muted-foreground not-italic">
            Abomey-Calavi, Bénin
          </span>
        </p>

        <div className="space-y-0">
          {[
            { icon: "📅", text: "Samedi 19 Décembre 2026" },
            { icon: "🕘", text: "À partir de 09h00" },
            { icon: "📍", text: "Godomey Cococodji Fandji, Abomey-Calavi" },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3 border-b border-border font-body text-sm text-muted-foreground"
            >
              <span className="text-base w-5">{row.icon}</span>
              <span>{row.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Google Maps embed — remplacer l'URL par l'embed exact du lieu */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full h-72 overflow-hidden"
        style={{ filter: "grayscale(1) invert(1) contrast(0.85)" }}
      >
        <iframe
          src="https://maps.google.com/maps?q=Godomey,Abomey-Calavi,Benin&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lieu du mariage"
          className="border-0"
        />
      </motion.div>
    </section>
  );
}
```

- [ ] **Vérifier visuellement**

```bash
npm run dev
```

Ajouter `<Lieu />`. Vérifier la carte Google Maps en noir (filter grayscale+invert) et les infos d'adresse.

- [ ] **Commit**

```bash
git add components/lieu.tsx
git commit -m "feat: Lieu section with inverted Google Maps embed"
```

---

## Task 14 — Section Livre d'or

**Files:**
- Create: `components/livre-dor.tsx`
- Create: `__tests__/livre-dor-storage.test.ts`

- [ ] **Écrire le test localStorage**

Créer `__tests__/livre-dor-storage.test.ts` :

```ts
import { saveMessage, getMessages, type Message } from "@/components/livre-dor";

describe("livre d'or localStorage", () => {
  beforeEach(() => localStorage.clear());

  it("saveMessage stocke un message", () => {
    saveMessage({ name: "Marie", text: "Félicitations !" });
    const msgs = getMessages();
    expect(msgs).toHaveLength(1);
    expect(msgs[0].name).toBe("Marie");
    expect(msgs[0].text).toBe("Félicitations !");
  });

  it("getMessages retourne [] si vide", () => {
    expect(getMessages()).toEqual([]);
  });

  it("plusieurs messages sont empilés", () => {
    saveMessage({ name: "A", text: "Message A" });
    saveMessage({ name: "B", text: "Message B" });
    expect(getMessages()).toHaveLength(2);
  });
});
```

- [ ] **Lancer le test → vérifier qu'il échoue**

```bash
npm test -- --testPathPattern=livre-dor-storage
# Attendu : FAIL — "Cannot find module"
```

- [ ] **Créer components/livre-dor.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Ornament } from "./ornament";

export type Message = { name: string; text: string; id: string };

const STORAGE_KEY = "urlice-jose-messages";
const INITIAL: Message[] = [
  { id: "0", name: "Famille Amoussou", text: "Que votre amour soit aussi fort que votre joie en ce jour. Toutes nos félicitations aux futurs mariés !" },
  { id: "1", name: "Tantine Céline", text: "Urlice et José, vous méritez tout le bonheur du monde. Ce mariage est le début d'une magnifique aventure." },
];

export function getMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveMessage(msg: Omit<Message, "id">): void {
  const msgs = getMessages();
  msgs.push({ ...msg, id: Date.now().toString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

export function LivreDor() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL);

  useEffect(() => {
    const stored = getMessages();
    if (stored.length > 0) setMessages((prev) => [...stored, ...prev]);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const msg: Message = { id: Date.now().toString(), name: name.trim(), text: text.trim() };
    saveMessage({ name: msg.name, text: msg.text });
    setMessages((prev) => [msg, ...prev]);
    setName("");
    setText("");
  }

  return (
    <section id="livredor" className="py-24 bg-card">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 px-6"
      >
        <p className="font-body text-[10px] tracking-[4px] uppercase text-muted-foreground mb-2">
          Vos mots pour eux
        </p>
        <h2 className="font-script text-5xl text-foreground">Livre d'or</h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
      </motion.div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto px-6 mb-12 space-y-5"
      >
        <div>
          <label className="font-body text-[10px] tracking-[3px] uppercase text-muted-foreground block mb-1">
            Votre prénom
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Marie…"
            className="bg-transparent border-0 border-b border-border rounded-none px-0 font-body text-base focus-visible:ring-0"
          />
        </div>
        <div>
          <label className="font-body text-[10px] tracking-[3px] uppercase text-muted-foreground block mb-1">
            Votre message
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Vos vœux les plus sincères…"
            rows={3}
            className="bg-transparent border-0 border-b border-border rounded-none px-0 font-body text-base focus-visible:ring-0 resize-none"
          />
        </div>
        <Button
          type="submit"
          className="w-full font-body text-[10px] tracking-[4px] uppercase py-5 bg-foreground text-background hover:bg-foreground/90 rounded-none"
        >
          Laisser mon message
        </Button>
      </form>

      {/* Messages */}
      <div className="max-w-sm mx-auto px-6 flex flex-col gap-0.5">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background/50 p-5 relative"
            >
              <span className="absolute top-3 left-4 font-serif text-3xl text-muted-foreground/30 leading-none">
                "
              </span>
              <p className="font-body text-sm text-muted-foreground italic leading-relaxed pt-2">
                {msg.text}
              </p>
              <p className="font-body text-[9px] tracking-[2px] uppercase text-muted-foreground/60 mt-3">
                — {msg.name}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Lancer le test → vérifier qu'il passe**

```bash
npm test -- --testPathPattern=livre-dor-storage
# Attendu : PASS (3 tests)
```

- [ ] **Vérifier visuellement**

```bash
npm run dev
```

Ajouter `<LivreDor />`. Vérifier :
- Soumettre un message → apparaît en tête de liste avec animation
- Recharger la page → message toujours présent (localStorage)

- [ ] **Commit**

```bash
git add components/livre-dor.tsx __tests__/livre-dor-storage.test.ts
git commit -m "feat: Livre d'or with localStorage persistence (tested)"
```

---

## Task 15 — Footer

**Files:**
- Create: `components/footer.tsx`

- [ ] **Créer components/footer.tsx**

```tsx
import { Ornament } from "./ornament";

export function Footer() {
  return (
    <footer className="py-16 px-6 text-center bg-background border-t border-border">
      <p className="font-script text-5xl text-foreground mb-2">Urlice & José</p>
      <p className="font-body text-[11px] tracking-[4px] uppercase text-muted-foreground mb-6">
        19 · Décembre · 2026
      </p>
      <div className="max-w-[180px] mx-auto mb-6">
        <Ornament />
      </div>
      <p className="font-body text-[13px] italic text-muted-foreground max-w-xs mx-auto leading-loose">
        « L'amour est patient, l'amour est serviable… il supporte tout, il croit
        tout, il espère tout, il endure tout. »
        <br />
        <span className="not-italic text-[10px] tracking-[2px] uppercase text-muted-foreground/50">
          — 1 Corinthiens 13
        </span>
      </p>
    </footer>
  );
}
```

- [ ] **Commit**

```bash
git add components/footer.tsx
git commit -m "feat: Footer with verse"
```

---

## Task 16 — Assemblage final (page.tsx)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Remplacer app/page.tsx**

```tsx
import { Nav } from "@/components/nav";
import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/hero";
import { Histoire } from "@/components/histoire";
import { Countdown } from "@/components/countdown";
import { Programme } from "@/components/programme";
import { Galerie } from "@/components/galerie";
import { Rsvp } from "@/components/rsvp";
import { Lieu } from "@/components/lieu";
import { LivreDor } from "@/components/livre-dor";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Histoire />
        <Countdown />
        <Programme />
        <Galerie />
        <Rsvp />
        <Lieu />
        <LivreDor />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Build de production**

```bash
npm run build
# Attendu : ✓ compiled successfully
```

- [ ] **Test final complet**

```bash
npm test
# Attendu : PASS (tous les suites)
```

- [ ] **Vérification mobile DevTools**

```bash
npm run dev
```

Dans Chrome DevTools (F12) → Toggle device toolbar → iPhone 14 Pro (390px). Vérifier :
1. Hero : illustration centrée, prénoms lisibles, particules visibles
2. Navigation : burger visible, Sheet fonctionne
3. Histoire : timeline visible, animations au scroll
4. Countdown : chiffres lisibles sur mobile
5. Programme : timeline avec dots alignés
6. Galerie : grille 2 colonnes, image 1 en bannière
7. RSVP : formulaire utilisable, toggle présence fonctionne
8. Lieu : carte visible
9. Livre d'or : message soumis et affiché

- [ ] **Commit final**

```bash
git add app/page.tsx
git commit -m "feat: assemble all 8 sections — wedding site complete"
```

---

## Récapitulatif des tests

| Fichier test | Ce qui est testé |
|---|---|
| `__tests__/use-countdown.test.ts` | Hook retourne valeurs correctes, décrémente |
| `__tests__/rsvp-schema.test.ts` | Schéma zod valide/rejette correctement |
| `__tests__/livre-dor-storage.test.ts` | localStorage save/get/multiple messages |
