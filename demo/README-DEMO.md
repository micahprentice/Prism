# Prism demo (`/demo`)

A clickable, front-end-only demo of three Prism screens. No backend, no real
payments, no real customers. Everything is static and served by the same
Cloudflare Workers assets config as the rest of the site.

| Screen | URL | Who it is for |
|---|---|---|
| Navigator | `/demo/` | the person giving the demo |
| 1 · Homeowner quote | `/demo/quote.html` (`?tier=classic|signature|showcase`) | Sarah Whitfield, on her phone |
| 2 · 180-point inspection | `/demo/grade.html` | Dale, the owner, deciding to buy |
| 3 · Pipeline | `/demo/pipeline.html` | Dale, running the season |
| Alternate quote directions | `/demo/quote.html?dir=1` (twilight listing) · `?dir=3` (product stage) | the design round; kept for comparison |

Approve the quote in the demo and the pipeline reflects it (via
`sessionStorage`, key `prism-demo-booking`). "Start over" on the booked
screen, or "Reset the demo booking" on the pipeline, clears it.

## Files

```
demo/
  index.html            navigator
  quote.html            screen 1 (direction 2, night elevation)
  quote.css  sheet.css  quote styles · mock Stripe sheet
  quote.js              all quote behavior (also used by the alternates)
  data.js               PRISM_QUOTE, PRISM_GRADE, PRISM_PIPELINE sample data
  grade.html            screen 2
  pipeline.html         screen 3
  owner.css             shared tokens for the owner screens
  demo.css              the 40px demo strip
  alt/quote-1.html      direction 1
  alt/quote-3.html      direction 3
  fonts/                self-hosted Gambetta, Zodiak, Supreme, Archivo
  img/                  fictional-home render set (see below)
```

## The render slot

The house is a stack of absolutely positioned `<img>` layers inside a frame
with a fixed `aspect-ratio: 3 / 2`. Switching tiers only changes opacity, so
the layout never moves. The layer order, bottom to top:

1. `dusk` — the homeowner's photo relit to blue hour, unlit. Always visible.
2. one layer per tier (`classic`, `signature`, `showcase`), one visible at a time
3. `day` — the original daytime photo. Only shown by the before/after slider,
   clipped at the divider with `clip-path: inset(...)`.

Production renders from the relight pipeline are **3:2 at 2528×1696**, same
camera across all states. The demo ships a fictional two-story Colonial at
1600×1066 (cropped from the 1600×1195 pipeline output) plus 800px variants
for small screens. Replace `img/*.webp` with a customer's set and nothing
else changes.

Hover or keyboard-focus a scope line and `.house-spot` dims everything but
that region; the region is `scope[i].spot` as percentages of the frame.

## What the real build needs (for Adam & Josh)

**Quote endpoint.** `GET /q/:quoteId` returns the shape of `PRISM_QUOTE` in
`data.js`: company, customer, `scope[]` (one list; each tier lights the first
`tiers[i].lit` lines; each line has `measure`, `detail`, and an optional
`spot`), `tiers[]` with `price`, `monthly`, `image`, `windows[]` (the
installer's held slots), `deposit`, `financing`, `dates`, `render`. Images
are signed URLs to the render set.

**Events.** The quote page should post `quote.opened`, `tier.viewed`
(`{tier}`), `compare.used`, `approve.started`, `window.chosen`,
`deposit.paid`, `booked`. The pipeline's Whitfield timeline is rendered from
exactly these.

**Deposit.** Stripe Checkout or Payment Element in the sheet, amount
`deposit`, metadata `{quoteId, tier, windowId}`. Apple Pay / Google Pay via
the Payment Request button. On `payment_intent.succeeded`: mark the quote
approved, convert the chosen hold into a booking, release the other holds,
send the ICS and the receipt by SMS, move the pipeline card to Scheduled.

**Financing.** `monthly` is computed server-side from the provider's terms;
the page only displays it. If no provider is connected, omit `financing` and
the page hides the "/mo" line.

**Holds.** `windows[]` are real calendar holds owned by the installer. The
page never invents dates. Expire holds with the quote (`validThrough`).

**Grade.** `PRISM_GRADE` is the output shape of the inspection: `categories[]`
with `possible/earned/gain/finding`, `fixes[]` with `revenue`, `points`,
`basis`, and `revenue.current/projected`. The page sums nothing; the server
is the source of truth for every number.

**Pipeline.** `PRISM_PIPELINE.stages[]` and `week[]`; `hold: "Whitfield"`
slots are the quote's `windows[]` mirrored on the installer's calendar.

## Design

See `DESIGN.md` at the repo root for the design system derived from this
build (tokens, type, motion, components).
