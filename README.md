# Prism — pre-launch splash

Static site. No build step, no dependencies. `index.html` is the whole page —
the images sit next to it and are referenced by relative path, so keep them
together in the repo root.

Palette is taken from the mark: `#E44B87` pink, `#4998EF` blue, `#99CAF7` light
blue, `#265BA4` navy, on `#0B0C18`. They're CSS variables at the top of the
`<style>` block if you want to shift anything.

```
index.html            the page
logo.png              the mark (transparent, 792x1000)
og-image.png          link preview image (1200x630)
favicon.png           tab icon
apple-touch-icon.png  iOS home-screen icon
.nojekyll             tells GitHub Pages to serve files as-is
```

---

## Before you push: three edits, all in `index.html`

**1. Launch date** — near the top of the `<script>` block at the bottom:

```js
const LAUNCH = new Date("2027-01-17T12:00:00-06:00");
```

Currently 134 days out (Central time). Note that lands on a Sunday — use
`2027-01-18T09:00:00-06:00` if you want a Monday morning launch.

**2. Where signups go** — right below it:

```js
const FORM_ENDPOINT = "";
```

**While this is empty the form confirms but saves nothing.** Any service that
accepts a JSON POST works — Formspree (`https://formspree.io/f/xxxxxxx`), a
Zapier catch hook, or your own route. It sends:

```json
{ "name": "...", "email": "...", "message": "...", "source": "prism-splash-operator" }
```

`source` is `prism-splash-operator` or `prism-splash-investor` depending on
which form the person used, so beta signups and investor interest stay sorted.

**3. Domain — already set.** The `og:url`, `og:image`, `twitter:image`, and
canonical tags all point at `https://getprismpro.com/`. The preview image only
resolves once the site is actually live at that domain.

Still worth a look: the fallback address `hello@getprismpro.com` in the form's
error message needs to be a real inbox, and the footer line is a placeholder.

---

## Push it

```bash
cd prism-site
git init
git add .
git commit -m "Prism pre-launch splash"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

If the repo already exists with an old `index.html`, clone it first, drop these
files in over the top, then `git add . && git commit && git push`.

## Take it live

**GitHub Pages** — repo → Settings → Pages → Source: `main`, folder: `/ (root)`.
Live at `https://YOUR-USERNAME.github.io/YOUR-REPO/` in about a minute. For a
custom domain, add it under Settings → Pages, then point a CNAME record at
`YOUR-USERNAME.github.io` in your DNS.

**Netlify or Vercel** — "Add new site" → import the repo. Leave the build
command empty and the publish directory as the root. Both give you HTTPS and a
custom domain in a few clicks, and redeploy on every push.

Any of the three is free at this traffic level. Netlify is the easiest if you
want a custom domain today.

## Investor link

Anything with `investor` in the URL opens the deck form directly:

```
https://your-domain.com/?investor
```

Useful in your email signature or an outreach follow-up so an investor never
sees the crew-sizing question.
