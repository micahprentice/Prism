---
target: /demo/quote (three directions)
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
target_identity: "file:/workspace/demo/quote.html"
target_fingerprint: "sha256:b2fb17d98a0879cbbf0f4db831904b6c650ae71a35bcb652556b827ba9bfaefa"
target_path: /workspace/demo/quote.html
timestamp: 2026-10-09T15-00-37Z
slug: demo-quote-html
---
Method: dual-agent (A: bc-75a38c65-6e9b-5df8-b597-fff53abccccf, re-run bc-204493b9-e57e-520c-9096-4876e613e170 · B: bc-33938b07-0760-57fe-ae57-a38bbe010397)

# Critique · /demo/quote — three directions, one winner

**Winner: direction 2, the night elevation.** Both design reviews ranked it first independently (26/36 and 25/32 vs 19/36 and 18/36 for the alternates). It is the only direction whose visual system is derived from the thing being sold: the ground is the photo's sky, lamp-white is reserved for "on" (dial indicator, scope lamps, Approve), and the house, price odometer, and lamp sweep answer "what changes" three ways at once. Direction 1 (twilight listing) identifies the house hardest (address as headline) but mis-identifies the transaction as a real-estate listing and dims the product on paper. Direction 3 (product stage) is the Apple canon reproduced, including the blue; swap the photo for headphones and nothing else needs to change.

## Design Health Score (direction 2, as built before fixes)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 4 | dial, odometer, "10 of 15", aria-live, `?tier=` in URL, sticky house on mobile |
| 2 | Match system / real world | 3 | best in-world copy; strikethrough on unlit lines read as "removed" |
| 3 | User control and freedom | 3 | desktop Approve scrolled away; dial still live after booking |
| 4 | Consistency and standards | 3 | two solid lamp blocks (selected dial + Approve) competed |
| 5 | Error prevention | 3 | summary at both sheet steps; `novalidate` form, no error path |
| 6 | Recognition rather than recall | 3 | lamps and group labels; address absent beside the photo on mobile |
| 7 | Flexibility and efficiency | n/a | single-path Persuade surface (arrow keys, deep link, Apple Pay are bonuses) |
| 8 | Aesthetic and minimalist design | 3 | sticky block ~45% of a 390 viewport; empty night bands at 1440 |
| 9 | Error recovery | 2 | no declined-card, expired-quote, or image-failure state |
| 10 | Help and documentation | n/a | "Text Dale" is the help channel |
| **Total** | | **24/32** | **Good; fix batch applied below** |

## Design Specificity Verdict

**LLM assessment:** authored. Lamp-as-indicator, lamp-per-scope-line with inherited/new halos, sequenced lighting, hover-to-spotlight on the house, "Nothing else is due until the lights are up" only make sense for this product. Generic residue: the h1 "Your home, lit for the season." (replaced with the address + italic turn borrowed from direction 1) and an instructional lede.

**Deterministic scan:** 38 findings across the three quote pages, 0 attributed to CSS files, all `line: 0`. For direction 2: 9× `low-contrast` (all one token, `--ink-3 #6E778E` on `#070A14` = 4.42:1, 11.5–13px text), 3× `dark-glow` (lamp halos on dial indicator, Approve, lit scope lamps), 2× `cramped-padding` (`.panel`), 1× `pulsing-dot` (`.cta-busy` in the sheet). Direction 1: `--ink-3` 3.4:1 on paper and 3.9:1 on white, plus `italic-serif-display`. Direction 3: `--ink-3` 4.1:1 on black, white@80% on `#0071E3` 3.6:1.

**False positives:** `cramped-padding` ×2 (the detector did not resolve `clamp()` padding; the panel has ≥24px inset), `pulsing-dot` ×3 (one shared, `display:none`-by-default submit-busy indicator, `aria-hidden`, disabled under reduced motion, counted once per page). Accepted as designed: the three `dark-glow` lamp halos; lamp light glowing on a night page is the product's metaphor and the only warm color on the page.

**Visual overlays:** no browser-mutation tool is exposed in this harness, so no live overlay was injected; evidence came from headless screenshots and static contrast math.

## Priority issues (direction 2) and what was done

- **P0 — Unlit lines read as deletions; upsell path dead.** Strikethrough removed. Each tier boundary is now a group header ("Showcase adds · Switch to Showcase · +$1,750"); hovering an unlit line previews that tier on the house and shows "Add with Showcase · +$1,750" in place of the measure (no layout shift); tap switches tier. *Fixed.*
- **P1 — Sticky house starves the scroll on tablets.** `.house-stage` capped at `40vh × 1.5` wide below 1024px, centered, dial aligned to it; phones unaffected. *Fixed.*
- **P1 — Trust and terms far from the decision.** One line under Approve: license · insured to $2M · ★ 4.9 from 212 reviews; deposit policy ("refundable until 48 hours before install") under Approve and in the pay sheet. *Fixed.*
- **P1 — Dial still live after booking; mobile dial visible on the booked screen.** `setTier` locks when booked; `.dial-m` hidden. *Fixed.*
- **P2 — Two solid lamp blocks.** Selected dial segment is now a lamp wash with a lamp hairline; the Approve is the only fully lit object. *Fixed.*
- **P2 — Desktop Approve scrolls away.** Compact "Signature · $2,450 · Approve" appears in the sticky top bar when the main button leaves the viewport. *Fixed.*
- **P2 — Tertiary ink 4.42:1.** `--ink-3` → `#78829B` (4.8:1 on night, 4.6:1 on night-2) across quote, sheet, owner screens, index; alternates bumped too. *Fixed.*
- **P2 — Names truncated before the quote ID on mobile.** Header reordered to "Prepared for Sarah & Tom Whitfield · Quote FCL-2041". *Fixed.*
- **P2 — Color shown as a fact.** "Warm white (2700K) · ask Dale about other colors" (SMS link). *Fixed.*
- **P3 — Alternates' two-column scope grid scrambled tier groups.** Single column in both alternates. *Fixed.*
- **Open:** empty night bands above/below the 3:2 render at 1440 (kept: the brief fixes the slot at 3:2 with zero layout shift; the frame background is now the render's sky tone); no declined-card / expired-quote states (out of scope for a demo, listed for the real build); "Add with" per-line affordance is hover-only (group header carries it on touch).

## Persona red flags

**Homeowner on a phone at night:** before the fix, 12.5px tertiary text at 4.4:1 carried measures and fine print; the trust block was 14 lines below the Approve. **Investor, 2 minutes:** direction 2 shows the whole mechanism in one desktop viewport; direction 3 showed half a house below a slogan; direction 1 needed a scroll to find the price. **Engineer reading as spec:** `spot` coordinates are percentages of one render set (documented in README-DEMO.md); the form is `novalidate` with no error path (real build).

## Minor observations

- The TEST MODE badge was the first thing read at the trust moment; demoted to a quiet outline.
- The Apple Pay glyph rendered squashed; replaced with the Apple mark + "Pay" in the system face.
- `.is-new` is toggled but has no distinct style beyond the lamp halo; fine.
- Mobile shows two Approve buttons when scrolled to the price (main + bar); accepted, the bar is the thumb target.

## Questions to consider

1. If the tier is a dial, does the lede need to exist at all, or can the address headline and the dial carry the first viewport alone?
2. The before/after slider and the tier dial both answer "what changes." Should Classic → Showcase itself be a slider on the house?
