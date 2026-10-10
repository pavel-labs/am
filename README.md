# Pavel Piatrovich - Portfolio

Personal portfolio and CV site for Pavel Piatrovich, Frontend Engineer with 6+ years of experience in React, React Native, and TypeScript. Built as a static Next.js app - fully server-rendered, print-ready, and deployable to Vercel in one click.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Fonts | Instrument Serif (display) · Inter (text) via `next/font` |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## Architecture

Structured with **Feature-Sliced Design** (FSD) - layers import only downward:

```
src/
├── app/                  Next.js App Router (layout, page, globals.css)
│
├── content/blog/         Articles as .mdx files - one file per post
│
├── mdx-components.tsx    Required by the App Router - re-exports the MDX element map
│
├── shared/               No project deps - safe to import anywhere
│   ├── config/cv.ts      Single source of truth for all CV data
│   ├── lib/cn.ts         clsx + tailwind-merge utility
│   ├── lib/posts.ts      Reads src/content/blog at build time (front matter + reading time)
│   ├── ui/mdx/           Tailwind element map applied to every article
│   ├── types/            All TypeScript interfaces and types
│   └── ui/               Badge · Button · SectionHeader
│
├── entities/             Business entity cards, import from shared/ only
│   ├── job/              JobCard · ProjectCard
│   ├── skill/            SkillCategoryCard
│   ├── education/        EducationCard · CertificationCard
│   └── contact/          ContactCard
│
└── widgets/              Assembled page sections, import from entities/ + shared/
    ├── header/           Sticky nav with active-section highlight + mobile menu
    ├── hero/             Full-screen intro with marquee
    ├── about/            Summary + tags
    ├── experience/       Timeline with project cards
    ├── skills/           Categorised badge grid
    ├── education/        Degree · Certifications · Language bars
    ├── contact/          Contact cards + CTA
    └── footer/
```

Each slice exposes a single `index.ts` public API - consumers never import from internal `ui/` paths directly.

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint
```

Node >= 20 required (see `engines` in `package.json`).

---

## CV PDF

Drop the PDF at `public/pavel-piatrovich-cv.pdf` - the "Download CV" and "View CV" buttons in the Hero point to it automatically via `PERSONAL.cvPath` in `shared/config/cv.ts`.

---

## Updating Content

All CV data lives in one file: **`src/shared/config/cv.ts`**.

Change anything there - name, jobs, skills, contact links - and the entire site updates. No other files need to be touched for content changes.

---

## Writing Articles

Each post is one `.mdx` file in **`src/content/blog/`**. The filename is the slug, so `react-in-2026.mdx` is served at `/blog/react-in-2026`. Drop a file in, and the list page, the post route and the sitemap pick it up on the next build - nothing is registered by hand.

````mdx
---
title: "React in 2026: what actually changed"
date: "2026-09-01"
tags: ["React", "Server Components"]
dek: >-
  The compiler removed most manual memoization. Server Components stopped being
  controversial.
---

The first paragraph gets the serif drop cap.

## A section heading

- a list item
- another one

> "A pull quote, with the curly quotes typed literally."
````

- **`title`, `date`, `tags`, `dek`** are all required - a missing or malformed field fails the build with the filename. Quote `title` and `date` (every title contains a colon, and an unquoted date parses as a YAML date object); write `dek` as a `>-` block scalar so quotes and dashes need no escaping.
- **Reading time is computed** from the word count at 200 wpm - do not put it in the front matter.
- **Do not leave a blank line between list items.** CommonMark then wraps each item in a paragraph, which breaks the hanging indent around the em dash.
- Standard markdown works throughout - links, `**bold**`, `inline code`, fenced code blocks with a language tag. Because the files are MDX, a React component can also be imported and used inline.
- Article typography lives in `src/shared/ui/mdx/index.tsx`, one entry per HTML element. The lead paragraph's drop cap is the exception: it belongs to `PostBody` as a `p:first-of-type` rule.
- Note for tooling: `next.config.mjs` is `.mjs` rather than `.ts` because `remark-gfm` and `remark-frontmatter` are ESM-only. Turbopack is not used - it only accepts remark plugins as strings and would silently skip them.

---

## Print / PDF Export

Open in Chrome → Print (Cmd+P) → Save as PDF. The site includes a full `@media print` stylesheet:

- White background, dark text
- Header, footer, animations, and decorative elements hidden
- A4 page size with sensible margins
- Page break before the Skills section

---

## Deployment

One-click deploy to Vercel:

1. Push to GitHub
2. Import repo in the Vercel dashboard
3. `VERCEL_PROJECT_PRODUCTION_URL` is set automatically by Vercel for production
4. Deploy

Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) are configured in `next.config.mjs`.

---

## Design Notes

Editorial / print-inspired rather than the usual dark-glass dashboard look:

- Warm paper ground (`#f2efe8`) with near-black ink (`#16150f`); a single burnt-sienna accent (`#9c3b1c`) reserved for links, italics and live state
- Instrument Serif for display and italic emphasis, Inter for text and letterspaced caps labels
- Structure carried by hairline rules and a left margin column - no cards, no rounded corners, no glow, blur or gradients
- Sections numbered `01`-`06` like a printed contents page; figures set with tabular numerals
- Responsive from 320 px - hamburger menu on mobile, full nav on desktop
- `@media print` - the print shortcut opens the real CV PDF instead of printing the page
- Accessible: `aria-hidden` on decorative marks, `aria-label` / `aria-expanded` on controls, visible focus rings, reduced-motion honoured
