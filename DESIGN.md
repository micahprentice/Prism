---
name: Prism product surfaces
description: Night elevation. One house, one price, one button; lamp-white is the only warm color and it always means "on".
colors:
  night: "#070A14"
  night-2: "#0C1020"
  night-3: "#121729"
  night-4: "#1A2036"
  sky-frame: "#0A1226"
  ink: "#EEF1F8"
  ink-2: "#A6AEC2"
  ink-3: "#78829B"
  rule: "rgba(238,241,248,.12)"
  rule-soft: "rgba(238,241,248,.07)"
  lamp: "#FFD98F"
  lamp-deep: "#F2BE5C"
  lamp-ink: "#1A1304"
  lamp-glow: "rgba(255,217,143,.22)"
  warn: "#FF8A7A"
  pink: "#E44B87"
typography:
  headline:
    fontFamily: "Gambetta, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(31px, 4.2vw, 40px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.012em"
  headline-turn:
    fontFamily: "Gambetta, Iowan Old Style, Georgia, serif"
    fontSize: "inherit"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.012em"
  section:
    fontFamily: "Gambetta, Iowan Old Style, Georgia, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  grade-letter:
    fontFamily: "Gambetta, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(120px, 16vw, 188px)"
    fontWeight: 400
    lineHeight: 0.8
    letterSpacing: "-0.04em"
  price:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(46px, 6vw, 62px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  number:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(22px, 2.2vw, 28px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  fine:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "11.5px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  hairline: "2px"
  sm: "4px"
  md: "7px"
  lg: "10px"
  xl: "12px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "28px"
  xl: "44px"
  pad: "clamp(16px, 2.4vw, 40px)"
components:
  button-approve:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.lamp-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "10px 20px"
    height: "60px"
  button-approve-hover:
    backgroundColor: "#FFE3A8"
    textColor: "{colors.lamp-ink}"
  button-approve-active:
    backgroundColor: "{colors.lamp-deep}"
    textColor: "{colors.lamp-ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.small}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "36px"
  pill-text:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "36px"
  dial:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.lg}"
    padding: "3px"
  dial-selected:
    backgroundColor: "rgba(255,217,143,.13)"
    textColor: "{colors.lamp}"
    rounded: "{rounded.md}"
  field:
    backgroundColor: "{colors.night}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "48px"
  slot-booked:
    backgroundColor: "{colors.night-4}"
    textColor: "{colors.ink}"
    typography: "{typography.fine}"
    rounded: "{rounded.md}"
    padding: "8px 9px"
  slot-hold:
    backgroundColor: "rgba(255,217,143,.04)"
    textColor: "{colors.lamp}"
    typography: "{typography.fine}"
    rounded: "{rounded.md}"
    padding: "8px 9px"
  badge-fix:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.lamp-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
---

# Design System: Prism product surfaces

## Overview

Prism's product surfaces live at night. The ground is the color of a blue-hour sky after the photo has been relit (`night`, with two lifted steps for panels and fields), text is cool ink in three weights, and the only warm color on any screen is lamp-white. Lamp-white is never decoration: it means *on*. The selected tier, the scope line a tier includes, the points a business has earned, a held install window, and the single button that commits are all lit; everything else is dark. Prism's pink appears only on the brand mark and the demo strip, never in the product.

Two voices share every screen. Gambetta, a serif with a soft italic, speaks for the homeowner and for the one headline an owner screen gets ("2208 Beechmont Ridge, *lit for the season.*"; "A solid operator leaking leads."). Archivo, wide and tabular, carries every number, label, and line of fact: footage, counts, prices, dates, points. The pairing is the product's argument in type: warmth where a person reads, exactness where money is counted.

Motion is one orchestrated entrance per screen and one signature interaction. On the quote, choosing a tier crossfades a stacked 3:2 render with zero layout shift, rolls the price digits on odometer reels, and lights the scope lamps in sequence from the roofline outward. On the grade, the ruler fills and every earned cell lights in order. Reduced motion collapses all of it to instant state.

## Colors

### Primary

- **Lamp** `#FFD98F` — the only warm color. Fill for the one committing button per screen, the lit scope lamp, earned grade cells, held and newly booked calendar slots, the Fix badge. Text on lamp is `lamp-ink` `#1A1304` (13.7:1).
- **Lamp deep** `#F2BE5C` — pressed state of the approve button; the third step of the revenue ladder.
- **Lamp glow** `rgba(255,217,143,.22)` — the halo ring around a lit lamp; the only glow the system permits, and only around lamp-colored objects.

### Neutral

- **Night** `#070A14` — page ground, tinted from the render's sky. **Night 2** `#0C1020` panels, dial track, calendar slots. **Night 3** `#121729` unlit cells, unlit lamps, ghost hover. **Night 4** `#1A2036` booked slots, the "today" ladder segment. **Sky frame** `#0A1226` is the render frame's background while images load.
- **Ink** `#EEF1F8` (17.5:1 on night), **Ink 2** `#A6AEC2` (8.9:1), **Ink 3** `#78829B` (4.8:1 on night, 4.6:1 on night-2). Ink 3 is the floor for any text 12.5px and up; nothing smaller than 11.5px is set in it.
- **Rule** `rgba(238,241,248,.12)` and **Rule soft** `.07` — the two hairlines. There is no third.

### Tertiary

- **Warn** `#FF8A7A` — a lead that needs a callback, an approval waiting on a window. Text and 7px dot only.
- **Pink** `#E44B87` — the Prism mark and the demo strip's active underline. Not a product color.

### Named Rules

- **Lamp means on.** If an element is lamp-colored, the user can read it as included, earned, selected, or ready to press. Never use lamp for emphasis or ornament.
- **One lit button.** The selected dial segment is a lamp wash (`rgba(255,217,143,.13)` with a lamp hairline), not a fill, so the approve button is the only fully lit object in its column.
- **Sky-tinted ground.** Page and frame backgrounds are sampled from the render's night sky, never neutral gray or pure black.

## Typography

- **Gambetta** (self-hosted 400, 500, 400 italic): the headline, the tier line ("Signature. The economical middle."), section heads, the grade letter, the booked greeting. One headline per screen; its italic turn (`.h1 i`, set in ink-2) is the only italic on the page.
- **Archivo** (variable, self-hosted): everything else, with `font-variant-numeric: tabular-nums` on `body` so columns of footage and dollars align without effort.

### Hierarchy

- Headline: Gambetta 400, `clamp(31px, 4.2vw, 40px)`, 1.06, -0.012em. The address, then the turn.
- Section: Gambetta 400, 22–24px.
- Price: Archivo 600, `clamp(46px, 6vw, 62px)`, -0.035em, digits on odometer reels (`.od` 0.62em wide).
- Figure: Archivo 600, 22–36px, -0.03em (grade points, pipeline totals, fix impact).
- Body 15px / Small 13px / Fine 12.5px, all 400, Archivo.
- Label: Archivo 600, 11.5px, 0.08em tracking, uppercase, ink-3; used for tier group names ("Showcase adds"), legend lines, and column captions. Never placed above a headline.

### Named Rules

- **Quantities are data, states are words.** In any measure column, footage and counts ("112 ft of C9", "12 lights") are tabular Archivo; "Included" is the same size at weight 400 in ink-3.
- **The name survives.** When a header truncates, the person's name comes before the ID. At ≤420px the quote ID moves into the facts list so "Sarah & Tom Whitfield" stays whole.

## Layout

- Horizontal padding `clamp(16px, 2.4vw, 40px)`; owner screens cap content at 1180–1320px.
- Quote at ≥1024px: two columns, `minmax(0, 1.5fr) minmax(420px, 560px)`; the house column is sticky and full height. The render stays a fixed 3:2 (the production slot is 2528×1696), centered in the column — empty night bands on a tall desktop are accepted so the slot stays honest. The right column scrolls; a compact "Signature · $2,450 · Approve" appears in the sticky top bar once the main button leaves the viewport.
- Quote below 1024px: house and tier dial are one sticky block at the top. One Approve in the first viewport; the compact bottom bar appears only after that button has scrolled off. Below 1024px and above phone width, the house is capped at `min(100%, 40vh × 1.5)` so the list keeps room to read.
- The render slot is always `aspect-ratio: 3 / 2` with absolutely positioned layers; tier changes are opacity only. Zero layout shift is a rule, not a goal.
- Owner screens: the pipeline board is four equal columns separated by soft rules at ≥900px and a snap-scrolling row below; the grade's categories are a three-column grid (name, score, cells) collapsing to two.

## Elevation & Depth

Depth comes from the ground stepping lighter (night → night-2 → night-3 → night-4), from hairlines, and from the lamp halo. Nothing floats on a drop shadow except the approve button and the mock-payment sheet.

### Shadow Vocabulary

- **Lamp lift** `0 10px 30px -14px rgba(255,217,143,.55)` — under the approve button; `.7` alpha on hover.
- **Lamp halo** `0 0 0 3px lamp-glow, 0 0 14px 2px rgba(255,217,143,.35)` — around a lit scope lamp; inherited lines carry only the 2px ring at `.12`.
- **Sheet** `0 -20px 60px rgba(0,0,0,.5)` — the bottom sheet / right panel.
- **Sticky house** `0 18px 30px -22px rgba(0,0,0,.9)` — separates the pinned block from scrolling content on phones.

### Named Rules

- **Glow only on lamp.** A colored glow is permitted only around lamp-colored objects, as the lamp's own light. No glow on text, cards, or the ground.

## Shapes

Radii are small and specific: 2px cells, 4px badges, 7px dial segments and calendar slots, 10px ghost buttons and fields, 12px the approve button and the sticky mobile dial, 999px only for text-message and compare pills. Containers are mostly unrounded regions separated by hairlines; the featured pipeline card (10px) and the sheet (16px top corners on phones) are the exceptions.

## Components

### Buttons

- **Approve** — lamp fill, lamp-ink text, two lines (action, then "pay $500 deposit · pick your install day" at 12.5px, 72% opacity), 60px tall, 12px radius, lamp lift shadow. Hover `#FFE3A8`; active translates 1px and drops to lamp-deep. One per screen.
- **Ghost** — 36px, 1px rule border, 10px radius, ink-2 text; hover lifts border to ink-3 and text to ink. **Solid** variant is the lamp fill at the same size.
- **Pill text** — 36px pill with a 14px message glyph: "Text Dale Whitaker". The help channel on every homeowner screen.
- **Quiet link** — underlined, 3px offset, ink-3; lamp on hover. Used for "Switch to Showcase · +$1,750", "Add with Showcase", "ask Dale about other colors", "start over".

### Chips

- **Fix badge** — lamp fill, lamp-ink, 11px label type, 4px radius: "FIX 1".
- **Test mode** — a full-width ink-3 hairline banner at the top of the sheet ("Test mode · no card is charged"); quiet by design, never a chip above the title.

### Cards / Containers

- **Pipeline card** — a grid row (name + amount, place, state line, meta) under a soft rule, no box. The featured card alone gets a night-2 box with a 1px rule, 10px radius, and a 3:2 render thumbnail.
- **Scope line** — `18px 1fr auto` grid: lamp, name, measure; detail text expands under a lit line (`max-height` + opacity). Unlit lines are the upsell: hover previews the tier that adds them and swaps the measure for "Add with Showcase · +$1,750" in place.
- **Calendar slot** — 58px min, 7px radius, label on top (8:00 AM), name below. Booked = night-4; held = dashed lamp hairline with a 4% wash; booked in this session = lamp fill.

### Inputs / Fields

- 48px, night ground, 1px rule, 10px radius, ink text; focus ring is a 2px lamp outline at 3px offset (the global `:focus-visible`). Fields in the mock payment sheet are prefilled with test data.

### Navigation

- **Top bar** — 64px, company name 600/15px over a 12.5px ink-3 subline, action on the right, soft rule beneath. Sticky on the quote at desktop widths with a blurred night backdrop.
- **Demo strip** — 40px, brand mark, numbered screens, "Next". Demo chrome only. Pink lives on the brand mark; the current-screen underline is ink (`currentColor`), and the focus ring is lamp.

### Tier dial

A 3-column radiogroup on a night-2 track with a 1px rule and 10px radius. The indicator is a lamp wash with a lamp hairline that slides (`transform` over 450ms) under the selected segment; the selected label turns lamp. Hover or focus previews that tier on the house by showing it fully and stepping the selected layer back, so a lower tier reads through the stack. Arrow keys move the selection.

### Render stage

`aspect-ratio: 3 / 2`, sky-frame background, five stacked `<img>` layers (dusk, three tiers, daytime photo), 700ms opacity crossfades. On first open (no `?tier=`, no reduced motion) the dusk layer is alone, then Signature crossfades in and the scope lamps sequence. A compare pill toggles a clip-path divider that reveals the homeowner's daytime photo, with a 40px ink grip and two label tags ("Your photo" / tier name); the divider drags and takes arrow keys. A radial spotlight (`.house-spot`) dims everything but the region of the scope line under the pointer.

## Do's and Don'ts

### Do:

- Light things that are on; leave everything else dark. Classic is the house only, Signature is the economical middle, Showcase lights every tree and shrub.
- Put footage, counts, and dates next to every claim. "96 ft of C9", "Week of Jan 5", "41 lost leads a season".
- Use the serif for one line of voice per screen and the sans for every number.
- Crossfade; never reflow. The render slot is 3:2 forever.
- Write the fine print as reassurance: "Nothing else is due until the lights are up."

### Don't:

- Don't use a second warm color, a gradient sky, or lamp as decoration.
- Don't strike through what a tier excludes; show what the next tier adds.
- Don't stack cards in a grid of equal boxes; separate rows with hairlines.
- Don't set uppercase labels above headlines or let the label register lead a section.
- Don't let a chart stand in for a sentence. One ruler, one ladder, one row of cells per category; every number also appears in prose.
