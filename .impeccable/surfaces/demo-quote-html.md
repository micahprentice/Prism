---
version: 1
slug: "demo-quote-html"
primary_target: "demo/quote.html"
related_targets: ["demo/index.html","demo/grade.html","demo/pipeline.html","demo/alt/quote-1.html","demo/alt/quote-3.html"]
---

# Surface brief: /demo/quote (customer good/better/best quote)

Scope: the homeowner-facing quote for one holiday lighting job (fictional: the Whitfield residence, Louisville, KY). Visitor mode: **Persuade**. The homeowner decides and acts: pick a tier, approve, pay a deposit, book a date.

Audience: a homeowner opening a text-message link on a phone in the evening. Job: understand exactly what each tier puts on the house, trust the company, and say yes without a call. Secondary audience: an investor clicking through the demo, and the engineers who will build this.

Action: Approve & pay deposit (mock Stripe), ending in a confirmation that books an install date.
Proof/content: four consistent renders of the same house (unlit, Classic, Signature, Showcase) in `demo/img/`, labeled as illustrative renders; authored scope lists with footage and counts; three prices from $1,500; financing per month; install/takedown/storage dates.
Constraints: static HTML/CSS/JS; self-hosted fonts in `demo/fonts/`; the founder's bans (no purple/blue gradients, glass, shadcn/Tailwind card grids, rounded-everything, icon-row lists, Inter, chart soup); works at 390 and 1440; AA contrast; reduced motion respected. Alternate directions remain reachable at `?dir=1|2|3`.

## Direction round (seed 597dfe38, assigned index 3, mode persuade)

Rut, kept off the list: the SaaS pricing page (three equal cards, middle one highlighted), its opposite (cream paper invoice with a serif), and the literal "prism/spectrum" reading the splash already owns.

Grounded candidates, by resonance:
1. The lighting designer's night elevation (light is the only ink on a night ground; the plan legend lights up with the house)
2. The Apple product stage (black stage, enormous photo, giant light type, segmented tier picker, sticky buy bar)
3. The twilight listing (real-estate twilight photography on a bone page; price as listing price; scope as the spec table)  ← assigned
4. The neighborhood street (your house among neighbors; declined before the roll: needs fabricated neighbors)
5. The holiday card (framed house on evergreen; too seasonal to survive pressure washing)
6. The install-day work order (crew job sheet; honest, weak on desire)
7. The truck-wrap yard sign (loud signage; wrong register at $4,200)

Built for the critique: dir=1 twilight listing (assigned), dir=2 night elevation (Impeccable's pick, honest risk: the dark-photo-on-dark-page move is familiar), dir=3 Apple product stage (canon-adjacent, the standing exit played straight).

Challenger verdicts (all declined on both axes; each donates one discipline, written as a raise on every built direction):
- Kraków Secession page → declined. Raise "Secession's growth": scope items light in sequence along the house when a tier is chosen; never a fade.
- City-pop airbrush sleeve → declined (gradient sky is banned). Raise "City-pop's horizon": one datum line the photo's eave, the price, and the tier switch all sit on.
- Algorave floor → declined. Raise "Algorave's preview": hover or focus a tier and the house previews that lighting before you commit.
- Nixie laboratory counter → declined. Raise "Nixie's single warm accent": lamp-white is the only warm color on the page; the price rolls between tiers as a visible digit change, not a swap.
- Pickling brine calendar → declined. Raise "Brine calendar's dates": install, takedown, and storage are real dates on the page.
- Memory quilt atlas → declined. Raise "Quilt's provenance": every scope line carries its measurement (feet, count).

## Critique verdict (2026-10-09)

Dual-agent critique (`.impeccable/critique/2026-10-09T15-00-37Z__demo-quote-html.md`): direction 2 confirmed, 24/32. Adopted from the losers: direction 1's address-as-headline with the italic turn; direction 3's compact top-bar approve on desktop. Retired: strikethrough on unlit lines (now the upsell, grouped under "Signature adds / Showcase adds" headers with a switch), solid lamp fill on the selected dial segment (now a lamp wash so the Approve is the only fully lit object). Render set replaced by the fictional Colonial (day, dusk, Classic, Signature, Showcase; same camera), cropped to the 3:2 slot; the compare slider now reveals the homeowner's daytime photo.

## Direction contract (dir=2, night elevation; confirmed by the critique)

THESIS: Your house, relit in front of you. The page refuses the three-equal-cards pricing grid: there is one house, one price, one button, and the tier is a dial that changes what the house looks like.

OWN-WORLD: Night ground tinted from the photo's sky (#070A14 → #0B0C18), lamp-white (#FFE2B0 family) as the only warm color, cool ink for text (#EEF1F8 / #9AA3B8), one hairline rule weight, Prism pink only on the brand mark and the approve button's pressed state. Gambetta for the homeowner voice, Archivo (tabular, wide) for every number and label. Components: a horizontal datum rule, a segmented tier dial, a plan legend whose lines illuminate, a receipt-style summary, a full-width approve bar.

STORY: "This is my house. This is what each level adds. This is the price, and the monthly. I can book it now." The homeowner understands scope by watching the house change, believes the price because every line carries footage and a count, and approves because the date and deposit are plain.

FIRST VIEWPORT (390): company line and address top; the house fills the width directly below, lit for the recommended tier (Signature); under it the tier dial (Classic / Signature / Showcase) sitting on the datum rule with the price and "/mo" rolling beside it; the approve bar fixed at the bottom. (1440): the house occupies the left ~62% at full height; the right column carries address, dial, price, the lit legend, and the approve button on the same datum line as the house's eave.

FORM: night elevation, candidate 1 of my ordered list; built as dir=2; seed key 597dfe38. Code-led (the brief pins "build the directions in code and screenshot them"; the house renders were generated as assets, not as comps).

Signature interaction: choosing a tier crossfades the lit house layer, rolls the price digits, and lights the legend lines in sequence from the roofline outward; hover/focus previews.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
