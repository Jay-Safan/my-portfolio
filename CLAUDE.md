# Jay's Portfolio — Claude Code Context

## Project Overview
Personal portfolio landing page for Jay, a fullstack developer based in Kuala Lumpur.
Single page with sections: Hero, Projects, Skills, About, Contact, Footer.

## Tech Stack
- **React** (via Vite, `--template react`)
- **Tailwind CSS** (via `@tailwindcss/vite` plugin)
- **Geist + Geist Mono** fonts (Google Fonts CDN in index.html)
- **No backend** — contact form to be wired to Formspree or EmailJS later

## Project Structure
```
my-portfolio/
├── index.html               ← add Google Fonts link tags here
├── vite.config.js           ← must include tailwindcss plugin
├── src/
│   ├── main.jsx
│   ├── index.css            ← CSS variables + Tailwind import
│   ├── App.jsx              ← imports and composes all sections
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── Projects.jsx     ← includes ProjectCard component
│       ├── Skills.jsx       ← includes SkillIcon component
│       ├── About.jsx
│       ├── Contact.jsx
│       └── Footer.jsx
```

## Setup Steps Completed
- [x] Vite + React scaffolded at `/Users/jay/Development/Projects/my-portfolio`
- [x] `npm install` done
- [x] `npm install -D tailwindcss @tailwindcss/vite` done
- [ ] `vite.config.js` not yet updated
- [ ] `src/index.css` not yet updated
- [ ] Components not yet created

## vite.config.js (replace entire file)
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## src/index.css (replace entire file)
```css
@import "tailwindcss";

:root {
  --paper: 250 249 247;
  --ink: 14 21 37;
  --muted: 90 96 110;
  --line: 224 220 212;
  --accent: 194 142 90;
}
html.dark {
  --paper: 14 17 24;
  --ink: 240 238 232;
  --muted: 156 162 175;
  --line: 36 41 53;
}
html, body { background: rgb(var(--paper)); color: rgb(var(--ink)); }
html { scroll-behavior: smooth; }
body { -webkit-font-smoothing: antialiased; }
.reveal { opacity: 0; transform: translateY(14px); transition: opacity .7s ease, transform .7s ease; }
.reveal.in { opacity: 1; transform: none; }
.stripe-bg {
  background-image: repeating-linear-gradient(135deg, rgb(var(--line) / .55) 0 1px, transparent 1px 14px);
}
.underline-accent {
  background-image: linear-gradient(transparent 62%, rgb(var(--accent) / .35) 62%);
  background-repeat: no-repeat;
}
::selection { background: rgb(var(--accent) / .3); }
```

## index.html — add inside <head>
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Tailwind Custom Colors (extend in CSS or use inline via vars)
All colors are CSS variable-driven:
- `bg-paper` / `text-ink` / `text-muted` / `border-line` / `text-accent` / `bg-accent`
- Dark mode toggled via `html.dark` class on the `<html>` element

## Shared Utilities

### Reveal component (used everywhere for scroll animations)
```jsx
import { useEffect, useRef } from 'react'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } })
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export function Reveal({ children, className = '', as: As = 'div', delay = 0 }) {
  const ref = useReveal()
  return (
    <As ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </As>
  )
}
```
> Place this in `src/components/Reveal.jsx` and import it in each section component.

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

### Projects.jsx + ProjectCard.jsx
- Section id: `projects`
- 3 projects in data array (see below)
- Each card: index number, status badge, image placeholder (stripe-bg), title, tagline, description, tech stack pills, optional link
- Image hover shows "View live ↗" or "Coming soon" bar sliding up

**Projects data:**
1. ErgoPrima Company Website — Shipped — PHP 8, Tailwind CSS, Vanilla JS, MySQL
2. [Project Name] — In progress — placeholder
3. [Project Name] — Side project — placeholder

### Skills.jsx + SkillIcon.jsx
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
