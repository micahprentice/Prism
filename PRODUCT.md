# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS served by Cloudflare Workers assets (`wrangler.jsonc`, `assets.directory: "."`). No build step, no framework. The `/demo` surface follows the same convention: plain files under `demo/`, self-hosted fonts, no bundler. (Inferred from the repository; the brief did not name a stack.)

## Users

- **Home-service business owners** (holiday lighting first; then pressure washing, window cleaning, junk removal, handyman). Crews of one to a few trucks, running the day from a phone. Job: win more and better jobs, look bigger than they are, stop losing leads to slow follow-up.
- **Homeowners** receiving a quote by text, usually on a phone, often in the evening. Job: understand what they would get, trust the company, and say yes without a phone call.
- **Investors** evaluating the fundraise. Job: see in under two minutes that the product is real, the wedge is sharp, and the playbook is the moat.
- **Prism engineering (Adam, Josh)** who will build the real product. Job: an exact spec of what to build.

## Product Purpose

Prism is the backbone platform for home-service businesses: CRM for customers and affiliates plus operations (quoting, scheduling, dispatch, invoicing). It exists because the software layer is commoditizing; what owners cannot get anywhere else is a growth playbook that takes a business from zero to roughly $4M. Success for the demo (brief, inferred): an investor clicks through three screens in under two minutes and understands the wedge, the quote experience converts a homeowner on a phone, and engineers can build from it.

## Positioning

Tagline: "Run the business you have. Build the business you want."

Mechanism a neighbor could not truthfully copy: the growth playbook, delivered through the product.

1. **Business grading**, a "180-point inspection" of the business across offer, pricing, reviews, lead response time, follow-up, website, ads, and operations.
2. **Productized good/better/best offers** that look Apple-level instead of a Canva quote.
3. **Agentic marketing.**
4. **Financing** on every quote.

Payments will run on Stripe. Stripe is not built; the demo shows it as a clearly labeled mock.

## Operating Context

- Owners quote from the truck or kitchen table; the quote reaches the homeowner as a text-message link and is opened on a phone.
- Holiday lighting is seasonal and date-constrained: approval books an install date; a deposit holds the slot.
- Sample job for the demo: a holiday lighting quote in Louisville, KY; three tiers (Classic / Signature / Showcase); warm white as the default color; prices starting at $1,500. All sample data is fictional and labeled as such.
- The demo lives at `/demo` and is linked by a simple navigator so a visitor can click Quote → Grade → Pipeline in under two minutes.

## Capabilities and Constraints

- Front-end demo only. No backend, no real payments, no real customer data.
- Three screens: customer good/better/best quote (hero, mobile first), owner business-grade report, owner pipeline (leads → quoted → approved → scheduled, with quote view/approve status and a calendar slot).
- Alternate quote directions remain reachable via `?dir=`.
- Must work at 390px and 1440px, with accessible contrast.
- Hard rules from the founder (binding): no purple/blue gradients, no glassmorphism, no default shadcn/Tailwind card grids, no rounded-2xl everything, no emoji/icon-row feature lists, no Inter, no fake-dashboard chart soup. Fonts must be free (Google Fonts or Fontshare), self-hosted or linked.
- Bar (binding, from follow-up): the existing splash and card are the floor, not the target. The quote must feel like opening an Apple product page for your own house; the tier switch must be smooth, immediate, and obvious about what changes; approving must feel effortless and trustworthy.

## Brand Commitments

- Name: Prism (also "PRISM PRO" wordmark on the splash).
- Mark: an isometric folded-ribbon prism in pink `#E44B87`, blues `#4998EF` / `#99CAF7`, navy `#265BA4` (`logo.png`, `assets/logo-lockup.png`). The lockup wordmark is a wide geometric sans with letters colored across the palette.
- Existing site type: Archivo (variable width). Existing ground: near-black `#0B0C18`. The demo should be coherent with this but may push further.
- Voice (inferred from the site): plain, operator-to-operator, short declaratives, no hype.

## Evidence on Hand

- Logo assets in `logo.png`, `assets/`, `card/prism-mark.png`.
- No house photography, no real customer quotes, no real business metrics. Anything that looks like data in the demo is authored sample data and must say so.
- No testimonials or case studies exist; do not fabricate any.

## Product Principles

1. The homeowner's house is the hero; the software recedes.
2. Show the playbook working, not a feature list describing it.
3. Every number is legible at arm's length on a phone.
4. Approval is one decision with no surprises; price, scope, and date are always visible together.
5. Owner screens are working tools first, brand second.

## Accessibility & Inclusion

WCAG AA contrast for all text; keyboard-operable tier switch and checkout; `prefers-reduced-motion` respected; touch targets at least 44px on the quote.
