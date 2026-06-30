# PrismOS — Landing Page

The marketing landing page for **PrismOS**, the operating system for service businesses.
Self-contained and static — no build step, no framework. Push it to a repo and it deploys as-is.

## Deploy

**GitHub Pages**
1. Push this `landing/` folder's contents to a repo (or set Pages to serve from `/landing`).
2. Settings → Pages → deploy from branch → `/ (root)` (or `/landing`).
3. Open `index.html`.

Works the same on Netlify, Vercel, Cloudflare Pages, or any static host — point it at `index.html`.

## Files
- `index.html` — the whole page (HTML + CSS + a few lines of vanilla JS for the pricing toggle).
- `assets/logo-mark-dark.png` — the prism cube mark (nav, hero, footer, favicon).
- `assets/logo-lockup.png` — full lockup (used for social/OG preview).

## Notes
- Fonts load from Google Fonts (Archivo / Archivo Expanded / Hanken Grotesk / JetBrains Mono).
  To go fully offline, self-host them and replace the `<link>` in `<head>`.
- Icons are inline SVG (Lucide). Colors and type come from CSS custom properties in `:root` — edit
  those to retheme.
- The only JavaScript is the Monthly/Annual pricing toggle.

Brand source of truth: the PrismOS design system in the parent project.
