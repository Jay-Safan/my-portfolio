# Jay's Portfolio — Claude Code Context

## Project Overview
Personal portfolio for **Muhammad Jay Safan**, a fullstack & mobile developer open to remote and global opportunities.
Single page with sections: Hero, Projects, Skills, About, Contact, Footer.
Domain: `jaysafan.dev`

## Tech Stack
- **React** (via Vite, `--template react`)
- **Tailwind CSS** (via `@tailwindcss/vite` plugin)
- **Geist + Geist Mono** fonts (Google Fonts CDN in index.html)
- **No backend** — contact form wired to Formspree (`formspree.io/f/mdabppwp`)

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
│       ├── Projects.jsx     ← project data, renders ProjectCard
│       ├── ProjectCard.jsx  ← extracted project card component
│       ├── Skills.jsx       ← SkillIcon inline
│       ├── About.jsx
│       ├── Contact.jsx
│       ├── TimeZoneWidget.jsx ← extracted from Contact, React.memo wrapped
│       ├── icons.jsx        ← shared GitHubIcon, LinkedInIcon, EmailIcon
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
- Logo: dot + "Jay"
- Links: Work → `#projects`, Stack → `#skills`, About → `#about`, Contact → `#contact`
- CTA: "Hire me →" on desktop

### Hero.jsx
- Section id: `home`
- Mono label: "Fullstack & Mobile Developer · Fulltime · Remote · Freelance"
- H1: `Hi, I'm Jay. I build clean, fast, and purposeful web apps.` ("purposeful" in italic accent color)
- "Jay" has `.underline-accent` highlight
- Subtext: "Software engineer focused on shipping reliable fullstack products — React on the front, PHP & Node on the back. Currently open to fullstack roles and freelance work."
- CTAs: "View my work ↓" (filled, links to #projects) + "Get in touch" (outlined, links to #contact)
- Availability badge: green pulsing dot + "Freelance — open now" · "Available · Aug 2026"

### Projects.jsx + ProjectCard.jsx
- Section id: `projects`
- ProjectCard extracted to its own file with statusColor map
- All projects render as featured (wide) cards for consistency
- Image hover shows custom linkLabel or "View live ↗" / "Coming soon"

**Projects data:**
1. ErgoPrima Company Website — Shipped — PHP 8, Tailwind CSS, Vanilla JS, Apache — links to ergoprima.com
2. PutraSportsHub — Completed — Flutter, Firebase, Dart — links to demo video on Google Drive

### Skills.jsx (SkillIcon inline)
- Section id: `skills`
- 4 groups in a 2x2 / 4-col grid:
  - Frontend & Mobile: React, React Native, Expo, Vue.js, Flutter, TypeScript, Tailwind CSS
  - Backend: Laravel, PHP, Node.js, Express, MongoDB, MySQL, Firebase, REST APIs
  - Languages: JavaScript, Python, Java, Dart
  - Tools & Other: Git, AWS, Docker
- Each skill: icon badge (react-icons) + label
- Hover: badge border + text turns accent color

### About.jsx
- Section id: `about`
- Left col (4/12): portrait placeholder (stripe-bg, aspect-[4/5]) — real photo still needed
- Right col (8/12): heading "Engineer by training, builder by habit."
- Bio paragraphs — all filled in (ErgoPrima internship, fullstack experience, UPM final year, cloud/AI goals)
- Stats row: Working as (Fullstack Intern), Open to (Fulltime · Remote · Freelance), Availability (Open to opportunities)

### Contact.jsx
- Section id: `contact`
- Left col: heading "Have something in mind?", subtext, email + timezone info
- Right col: form with name, email, message fields
- Validation: inline errors on blur, all fields required, email regex, message min 10 chars
- Submit states: idle → sending → sent (success panel with personalized name)
- Wired to Formspree (`formspree.io/f/mdabppwp`), real email `jay.safan4@gmail.com`

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
- [x] Replace portrait placeholder with real photo in About (`public/portrait.jpg`)
- [x] Fill in 2nd project (PutraSportsHub) with real content
- [ ] Add 3rd project with real content
- [ ] Add "countries visited" section in About (options: flag row, interactive map, passport stamps — undecided)

## Completed
- [x] Fill in About section personal sentences
- [x] Wire contact form to Formspree (`formspree.io/f/mdabppwp`)
- [x] Add real GitHub (`github.com/Jay-Safan`) and LinkedIn URLs in Footer
- [x] Update email to `jay.safan4@gmail.com` across Contact and Footer
- [x] Dark mode toggle (localStorage-persisted, respects system preference)
- [x] Live timezone widget in Contact section (visitor time vs Kuala Lumpur)
- [x] Mobile responsive polish (About profile card layout, section spacing, skills grid)
- [x] Clarified copy across Hero, About stats, Contact
- [x] Refactored: extracted TimeZoneWidget, ProjectCard, shared icons into separate files
- [x] Updated Skills section with full skill set from CV (4 groups, real icons)
- [x] Removed em dashes from all user-facing copy
