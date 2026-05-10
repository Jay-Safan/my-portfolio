# Jay's Portfolio — Claude Code Context

## Project Overview
Personal portfolio for **Muhammad Jay Safan**, a fullstack & mobile developer based in Kuala Lumpur.
Single page with sections: Hero, Projects, Skills, About, Contact, Footer.
Domain: `jaysafan.dev`

## Tech Stack
- **React** (via Vite, `--template react`)
- **Tailwind CSS** (via `@tailwindcss/vite` plugin)
- **Geist + Geist Mono** fonts (Google Fonts CDN in index.html)
- **No backend** — contact form to be wired to Formspree or EmailJS later

## Setup Status — All Done
- [x] Vite + React scaffolded
- [x] Tailwind CSS installed and configured via `@tailwindcss/vite`
- [x] `vite.config.js` updated with tailwindcss plugin
- [x] `src/index.css` updated with CSS variables + Tailwind import
- [x] `index.html` has Geist fonts + full SEO meta tags (OG, Twitter)
- [x] All components created: Navbar, Hero, Projects, Skills, About, Contact, Footer, Reveal

## Project Structure
```
my-portfolio/
├── index.html               ← Geist fonts + SEO meta (OG, Twitter)
├── vite.config.js           ← includes tailwindcss() plugin
├── src/
│   ├── main.jsx
│   ├── index.css            ← CSS variables + @import "tailwindcss"
│   ├── App.jsx              ← imports and composes all sections
│   └── components/
│       ├── Reveal.jsx       ← scroll animation wrapper (IntersectionObserver)
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── Projects.jsx     ← ProjectCard inline
│       ├── Skills.jsx       ← SkillIcon inline
│       ├── About.jsx
│       ├── Contact.jsx
│       └── Footer.jsx
```

## Tailwind Custom Colors (extend in CSS or use inline via vars)
All colors are CSS variable-driven:
- `bg-paper` / `text-ink` / `text-muted` / `border-line` / `text-accent` / `bg-accent`
- Dark mode toggled via `html.dark` class on the `<html>` element

## Component Details

### Navbar.jsx
- Sticky top nav, transparent → frosted glass on scroll (`bg-paper/80 backdrop-blur border-b border-line`)
- Active section tracking via IntersectionObserver on section IDs: `home`, `projects`, `skills`, `about`, `contact`
- Active link shows accent underline
- Mobile hamburger menu (toggle open/close)
- Logo: dot + "Jay" + `/ KL` in mono
- Links: Work → `#projects`, Stack → `#skills`, About → `#about`, Contact → `#contact`
- CTA: "Hire me →" on desktop

### Hero.jsx
- Section id: `home`
- Mono label: "Fullstack Developer · Kuala Lumpur"
- H1: `Hi, I'm Jay. I build clean, fast, and purposeful web apps.` ("purposeful" in italic accent color)
- "Jay" has `.underline-accent` highlight
- Subtext: "Software engineer focused on shipping reliable fullstack products — React on the front, PHP & Node on the back. Currently open to fullstack roles and freelance work."
- CTAs: "View my work ↓" (filled, links to #projects) + "Get in touch" (outlined, links to #contact)
- Availability badge: green pulsing dot + "Available May 2026"

### Projects.jsx (ProjectCard inline)
- Section id: `projects`
- 3 projects in data array (see below)
- Each card: index number, status badge, image placeholder (stripe-bg), title, tagline, description, tech stack pills, optional link
- Image hover shows "View live ↗" or "Coming soon" bar sliding up

**Projects data:**
1. ErgoPrima Company Website — Shipped — PHP 8, Tailwind CSS, Vanilla JS, MySQL
2. [Project Name] — In progress — placeholder
3. [Project Name] — Side project — placeholder

### Skills.jsx (SkillIcon inline)
- Section id: `skills`
- 3 groups: Frontend (React, TypeScript, Tailwind CSS), Backend (Laravel, PHP, Node.js, MySQL, REST APIs), Tools (Git)
- Each skill: monogram badge (2-letter initials in a square) + label
- Hover: badge border + text turns accent color

### About.jsx
- Section id: `about`
- Left col (4/12): portrait placeholder (stripe-bg, aspect-[4/5])
- Right col (8/12): heading "Engineer by training, builder by habit."
- Bio paragraphs — 2 filled, 2 with [FILL IN] placeholders
- Stats row: Based in (Kuala Lumpur MY), Working as (Fullstack dev), Open to (Roles & freelance)

### Contact.jsx
- Section id: `contact`
- Left col: heading "Have something in mind?", subtext, email + timezone info
- Right col: form with name, email, message fields
- Validation: inline errors on blur, all fields required, email regex, message min 10 chars
- Submit states: idle → sending → sent (success panel with personalized name)
- **TODO**: wire to Formspree or EmailJS (currently simulated with setTimeout)

### Footer.jsx
- Logo + copyright "© [year] · Built in Kuala Lumpur."
- Social links: GitHub, LinkedIn, Email (SVG icons, text hidden on mobile)

## Design Tokens
| Token | Light | Dark |
|---|---|---|
| paper | `250 249 247` (warm off-white) | `14 17 24` |
| ink | `14 21 37` (deep navy) | `240 238 232` |
| muted | `90 96 110` | `156 162 175` |
| line | `224 220 212` | `36 41 53` |
| accent | `194 142 90` (muted amber) | same |

Accent options: amber `#C28E5A`, sage `#5B7C6A`, ink blue `#3F5B8A`, terracotta `#A65A3F`

## Dev Commands
```bash
npm run dev      # start local server at localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Pending TODOs
- [ ] Replace portrait placeholder with real photo in About
- [ ] Fill in 2nd and 3rd projects with real content
- [ ] Fill in About section personal sentences
- [ ] Wire contact form to Formspree or EmailJS
- [ ] Add real GitHub and LinkedIn URLs in Footer and Navbar
- [ ] Update email from `hello@example.com` to real email
- [ ] Dark mode toggle (currently hardcoded to dark via TWEAK_DEFAULTS)
