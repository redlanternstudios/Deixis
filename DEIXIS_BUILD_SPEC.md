# DEIXIS BUILD SPEC

**Project:** Deixis Digital Gallery
**Repository:** `redlanternstudios/Deixis`
**Stack:** Next.js 16.2.9 | React 19.2.4 | TypeScript 5 | Tailwind CSS v4
**Status:** 🟢 IN SCAFFOLD — Ready for development

---

## 1. Project Identity

Deixis is a digital gallery — a visual-first platform for showcasing curated art collections. The name comes from the linguistic term for words whose meaning depends on context ("here", "now", "this"). The brand executes on that idea through spatial ambiguity and frame-play.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.9 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Font | Geist (Vercel) — system default |
| Linting | ESLint 9 with `eslint-config-next` |
| Package Manager | npm |

---

## 3. Directory Structure

```
Deixis/
├── DEIXIS_BUILD_SPEC.md          ← (this file)
├── Preliminary_Deixis.md         ← brand reference
├── Deixis_Logo_Variations.md     ← logo asset catalog
├── README.md                     ← project README
├── AGENTS.md                     ← agent instructions (optional)
├── CLAUDE.md                     ← Claude/agent context file
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── src/
    └── app/
        ├── favicon.ico
        ├── globals.css
        ├── layout.tsx
        └── page.tsx
```

---

## 4. Phases

### Phase 0 — Foundation (DONE)
- [x] GitHub repo created (redlanternstudios/Deixis)
- [x] Next.js scaffold committed
- [x] Build spec documented

### Phase 1 — Brand & Layout
- [ ] Set up brand theme in `globals.css` (colors, spacing, typography)
- [ ] Create Hero section component
- [ ] Create responsive grid layout for gallery
- [ ] Navigation bar with minimal branding

### Phase 2 — Core Gallery
- [ ] Image card component (thumbnail + title + artist)
- [ ] Gallery grid page (responsive, masonry or uniform)
- [ ] Collection/filter system
- [ ] Lightbox or expanded view for individual pieces

### Phase 3 — Detail & Interaction
- [ ] Artwork detail page (/artwork/[id])
- [ ] Artist profile component
- [ ] Search and tag filtering

### Phase 4 — Polish & Deploy
- [ ] Responsive audit (mobile/tablet/desktop)
- [ ] Performance optimization (image loading, lazy)
- [ ] Accessibility review
- [ ] Deploy to Vercel

---

## 5. Design Tokens (Placeholder)

These will be finalized during Phase 1:

- **Primary** — Deep charcoal/near-black
- **Accent** — TBD (likely warm gold or muted red)
- **Background** — Off-white or light warm gray
- **Typography** — Geist Sans (headings), Geist Mono (detail)
- **Spacing** — 4px base unit
- **Border radius** — 8px cards, 4px buttons

---

## 6. Performance Targets

- Lighthouse score ≥ 90 on all categories
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Images: next/image with lazy loading

---

## 7. Deployment

- Platform: Vercel (via Next.js)
- Domain: TBD
- CI: GitHub Actions (lint → build → deploy)

---

*Last updated: 2026-06-25*
