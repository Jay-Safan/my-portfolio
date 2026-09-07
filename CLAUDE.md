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
│       ├── FilmGrain.jsx    ← SVG feTurbulence film grain overlay (Hero bg)
│       ├── InteractiveDotGrid.jsx ← canvas mouse-reactive dot grid (Hero bg)
│       ├── ScrollToTop.jsx  ← floating scroll-to-top button
│       ├── AnimatedText.jsx ← reusable word-by-word heading reveal (reduced-motion aware)
│       ├── Marquee.jsx      ← seamless infinite auto-scroll band (Skills tech ticker)
│       ├── AuroraBackground.jsx ← subtle drifting accent blobs (About/Contact bg)
│       ├── CursorGlow.jsx   ← soft accent cursor-follow glow (hover/fine pointers only)
│       └── Footer.jsx
```

## Motion / Animation Notes
- **Reduced motion**: `framer-motion`'s `useReducedMotion()` gates Reveal, Hero (word reveal + parallax), ProjectCard tilt/spotlight, MagneticButton, About portrait parallax. CSS `@media (prefers-reduced-motion)` disables name-shimmer, marquee, aurora.
- **Theme transitions** are scoped: color-fade only applies while `html.theme-transition` is set (toggled for ~400ms by the dark-mode toggle), so normal hovers stay crisp. Previously a universal `*` transition softened every hover.
- **ProjectCard**: minimal hover — gentle lift (`y: -6`) + soft shadow + accent border, a slow image zoom (`scale-1.04`), the existing gradient overlay + slide-up "View live ↗" bar, and an accent underline that wipes in under the title. (The earlier 3D tilt + cursor spotlight were removed.)
- **Skills**: infinite `Marquee` tech band below the grid (pauses on hover, edge-masked).

## Tailwind Custom Colors (extend in CSS or use inline via vars)
All colors are CSS variable-driven:
- `bg-paper` / `text-ink` / `text-muted` / `border-line` / `text-accent` / `bg-accent`
- Dark mode toggled via `html.dark` class on the `<html>` element

## Component Details

### Navbar.jsx
- Clean three-column layout: logo left, links center (absolute), "Hire me" right
- Transparent at top, full-width frosted bar on scroll (`bg-paper/0.8 backdrop-blur-2xl border-b`)
- Sliding highlight pill (framer-motion `layoutId`) on active/hovered nav link
- Active section tracking via IntersectionObserver on section IDs: `home`, `projects`, `skills`, `about`, `contact`
- Staggered entrance animation on page load
- Mobile: hamburger menu with frosted full-width dropdown
- "Hire me" is accent-colored text (no background pill)

### Hero.jsx
- Section id: `home`
- Mono label: "Fullstack & Mobile Developer"
- H1: `Hi, I'm Jay Safan. I build clean, fast, and purposeful web & mobile apps.` ("purposeful" in accent color)
- "Jay Safan" has `.name-shimmer` animated gradient text effect
- Background: `InteractiveDotGrid` (canvas, mouse-reactive dots glow accent) + `FilmGrain` (SVG feTurbulence, shifting noise)
- CTAs: "View my work ↓" (filled ink bg) + "Get in touch" (outlined, solid paper bg, border highlights on hover)
- Chevron scroll indicator fades out on scroll

### Projects.jsx + ProjectCard.jsx
- Section id: `projects`
- ProjectCard extracted to its own file with accent-based statusColor map (`Ongoing` added for Le Medica)
- All projects render as featured (wide) cards for consistency
- Image hover: slow zoom (`scale-105`), gradient overlay fade-in, action bar slides up
- Status badges use accent tokens (not hardcoded Tailwind colors)

**Projects data:**
1. Le Medica — Ongoing — Next.js, TypeScript, Prisma, PostgreSQL — links to le-medica.com. Fullstack internship: AI concierge chat, membership/perks system, treatment-assessment funnel, SEO + blog CMS. Screenshot: `src/assets/lemedica.png` (branded laptop + phone device mockup).
2. ErgoPrima Company Website — Shipped — PHP 8, Tailwind CSS, Vanilla JS, Apache — links to ergoprima.com
3. PutraSportsHub — Completed — Flutter, Firebase, Dart — links to demo video on Google Drive

### Skills.jsx (SkillIcon inline)
- Section id: `skills`
- 4 groups in a 2x2 / 4-col grid:
  - Frontend & Mobile: React, React Native, Next.js, Expo, Vue.js, Flutter, TypeScript, Tailwind CSS
  - Backend: Laravel, PHP, Node.js, Express, MongoDB, MySQL, PostgreSQL, Prisma, Firebase, REST APIs
  - Languages: JavaScript, Python, Java, Dart
  - Tools & Other: Git, AWS, Docker
- Each skill: icon badge (react-icons) + label
- Hover: badge border + text turns accent color

### About.jsx
- Section id: `about`
- Left col (4/12): portrait photo `public/portrait.jpg` (aspect-[4/5], scroll parallax)
- Right col (8/12): heading "Engineer by training, builder by habit."
- Bio paragraphs — Le Medica internship (current), ErgoPrima internship (previous), fullstack range + PutraSportsHub FYP, cloud/AI goals
- Stats row: Currently (Interning @ Le Medica), Freelance (Available now), Full-time (Open to opportunities)

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
| paper | `252 252 250` (cool off-white) | `10 10 12` (near-black) |
| ink | `14 21 37` (deep navy) | `245 245 245` (bright white) |
| muted | `90 96 110` | `115 115 125` |
| line | `230 230 228` (neutral) | `28 28 32` (neutral) |
| accent | `91 124 106` (sage green) | same |

Accent options: sage `#5B7C6A` (current), amber `#C28E5A`, ink blue `#3F5B8A`, terracotta `#A65A3F`

## Dev Commands
```bash
npm run dev      # start local server at localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Git / Commit Conventions
- Commits are authored by Jay (Jay-Safan). Do **not** add a `Co-Authored-By: Claude` trailer or any Claude attribution to commit messages or PR bodies.

## Pending TODOs
- [x] Replace portrait placeholder with real photo in About (`public/portrait.jpg`)
- [x] Fill in 2nd project (PutraSportsHub) with real content
- [x] Add 3rd project with real content (Le Medica)
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
- [x] Navbar redesign: clean three-column layout, frosted bar on scroll, sliding highlight pill
- [x] Hero background effects: interactive dot grid (canvas) + film grain (SVG feTurbulence)
- [x] Hero name shimmer: animated gradient text on "Jay Safan"
- [x] Project card hover: image zoom + gradient overlay
- [x] Color palette update: neutral tones (no warm/yellow tint), near-black dark mode
- [x] UI consistency: standardized hovers, easing, headings, borders, icon sizes across all sections
- [x] Status badges unified to accent-based tokens
- [x] Cursor-follow glow (global)
- [x] Animated section headings (word-by-word reveal) on Projects, Side projects, Skills
- [x] Project card minimal hover (lift + zoom + accent border + title underline wipe)
- [x] Infinite tech marquee in Skills
- [x] Ambient aurora backgrounds behind About + Contact; About portrait scroll parallax
- [x] Magnetic submit button in Contact
- [x] Accessibility: `prefers-reduced-motion` respected across all motion
- [x] Scoped theme-transition (crisp hovers, fade only on theme toggle)
