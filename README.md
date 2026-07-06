# Kunal Kumar Dey — Portfolio

Personal portfolio website of **Kunal Kumar Dey**, Software Engineer at SAP & M.Tech CS student at BITS Pilani.

Live: _(link once deployed)_

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router)
- **Language** — TypeScript
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com)
- **Animations** — [Framer Motion](https://www.framer.com/motion/)
- **3D / Particles** — [React Three Fiber](https://r3f.docs.pmnd.rs) + [Three.js](https://threejs.org)
- **Icons** — [lucide-react](https://lucide.dev)
- **Fonts** — Geist Sans / Geist Mono via `next/font`

## Features

- Neobrutalist design — hard black borders, `4px 4px 0` shadows, blue accent (#3B82F6)
- Interactive **starfield background** — particles repel the cursor across the whole page
- **Scroll-triggered animations** on every section (Framer Motion `whileInView`)
- **Hero** with floating tech badges + entrance stagger
- **Bento grid** About section
- **Projects** — 2-column grid on desktop, infinite Tinder-style swipe stack on mobile
- **Journey** timeline with slide-in animation
- **Skills** — hand-tuned SVG word cloud with hover reveal
- **Resume download** button (public/resume.pdf)
- Scroll-to-top floating button
- Mobile hamburger menu with smooth anchor scrolling
- Fully responsive across mobile, tablet, and desktop

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx           # Root layout + fonts + metadata
│   ├── page.tsx             # Composes all sections
│   └── globals.css          # Tailwind + design tokens
├── components/
│   ├── Navbar.tsx           # Sticky nav + mobile menu
│   ├── Hero.tsx             # Hero section
│   ├── About.tsx            # Bento grid
│   ├── Projects.tsx         # Grid (desktop) + swipe stack (mobile)
│   ├── Journey.tsx          # Timeline
│   ├── Skills.tsx           # SVG word cloud
│   ├── Contact.tsx          # Email CTA card
│   ├── HeroScene.tsx        # R3F starfield with cursor repulsion
│   ├── StarField.tsx        # Fixed-position background wrapper
│   ├── ScrollToTop.tsx      # Floating scroll-to-top button
│   └── icons.tsx            # Inline GitHub / LinkedIn SVGs
├── data/
│   └── content.ts           # All static content (personal, skills, journey, projects)
└── public/
    └── resume.pdf           # Downloadable resume
```

## Customization

All content lives in [`data/content.ts`](./data/content.ts). Update the `personal`, `skills`, `projects`, and `journey` objects to tailor the site.

To swap the resume, replace `public/resume.pdf` — the download filename is set in [`components/Hero.tsx`](./components/Hero.tsx).

## Deployment

Deploy to [Vercel](https://vercel.com) in one click — the project is a standard Next.js app with zero extra config needed.

```bash
npm run build
npm start
```

## Contact

- **Email** — kunaldey995@gmail.com
- **GitHub** — [@kunal2303](https://github.com/kunal2303)
- **LinkedIn** — [Kunal Kumar Dey](https://www.linkedin.com/in/kunal-kumar-dey-a9918a249/)

---

© Kunal Kumar Dey
