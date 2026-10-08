/* Prism demo · sample data.
   Everything here is fictional. Falls City Light Co., the Whitfields, the
   address, and every number are authored for the demo. This object is also the
   shape the real quote endpoint should return (see README-DEMO.md). */

window.PRISM_QUOTE = {
  id: "FCL-2041",
  sentOn: "2026-10-08",
  validThrough: "2026-10-22",
  company: {
    name: "Falls City Light Co.",
    owner: "Dale Whitaker",
    phone: "(502) 555-0144",
    license: "KY HIC 10-4471",
    insured: "Insured to $2M · Workers' comp on every crew",
    reviews: { rating: 4.9, count: 212, source: "Google" },
  },
  customer: {
    first: "Sarah",
    names: "Sarah & Tom Whitfield",
    address1: "2208 Beechmont Ridge",
    address2: "Louisville, KY 40205",
  },
  color: "Warm white (2700K)",
  colorOptions: ["Warm white (2700K)", "Pure white", "Red & warm white", "Multi"],
  deposit: 500,
  financing: { months: 12, apr: 0, provider: "Prism Financing" },
  dates: {
    takedown: "Week of Jan 5",
    storage: "Stored and tested by Falls City until next season",
  },
  windows: [
    { id: "w1", day: "Tue, Nov 17", time: "8:00–11:00 AM", note: "Crew of 2, about 3 hours" },
    { id: "w2", day: "Thu, Nov 19", time: "12:30–3:30 PM", note: "Crew of 2, about 3 hours" },
    { id: "w3", day: "Sat, Nov 21", time: "8:00–11:00 AM", note: "Last Saturday before Thanksgiving" },
  ],

  /* The scope is one list. A tier lights the first N lines.
     That is the whole mechanism of the quote: the house and the list
     light up together, and nothing is hidden in a comparison table. */
  scope: [
    { id: "roofline",  name: "Front roofline",             measure: "112 ft of C9",       detail: "Commercial LED C9 bulbs on custom-cut wire, clipped to the eave across both wings. Nothing nailed, nothing stapled.", spot: { x: 50, y: 28, w: 82, h: 8 } },
    { id: "gable",     name: "Center gable outlined",      measure: "28 ft of C9",        detail: "Both rakes of the gable traced to the peak, so the front reads as one shape at night.", spot: { x: 49, y: 20, w: 28, h: 17 } },
    { id: "portico",   name: "Portico roofline",           measure: "18 ft of C9",        detail: "The flat roof over the front door, lit on its front edge and returns.", spot: { x: 50, y: 50, w: 28, h: 7 } },
    { id: "columns",   name: "Four columns wrapped",       measure: "4 columns · 60 ft of minis", detail: "Warm mini lights wound tight and even, top to base. No sag by January.", spot: { x: 50, y: 63, w: 26, h: 28 } },
    { id: "power",     name: "Hidden power & timer",       measure: "Dusk to 11 PM",      detail: "One dusk-to-dawn timer set to your schedule. Cords routed behind trim and under the beds.", spot: null },
    { id: "install",   name: "Install, takedown & storage", measure: "Included",          detail: "Installed in your chosen window. Down the week of Jan 5. Labeled, tested, and stored in our warehouse until next season.", spot: null },

    { id: "hedges",    name: "Hedge nets at the foundation", measure: "8 boxwoods · 48 ft", detail: "Net lights laid over the boxwoods on both sides of the steps, power hidden behind the beds.", spot: { x: 49, y: 79, w: 80, h: 13 } },
    { id: "evergreens", name: "Two evergreens wrapped",    measure: "≈600 ft of minis",   detail: "The pair at the left corner, wrapped so they glow as columns of light.", spot: { x: 10, y: 59, w: 14, h: 46 } },
    { id: "garland",   name: "Portico garland",            measure: "18 ft · lit",        detail: "Evergreen garland along the portico roof, wound with warm minis.", spot: { x: 50, y: 52, w: 28, h: 8 } },
    { id: "wreath",    name: "Front door wreath",          measure: '30" · lit',          detail: "Centered on the door, hung from a padded hook. No holes.", spot: { x: 50, y: 67, w: 9, h: 11 } },

    { id: "ridge",     name: "Full roof outline",          measure: "Ridge & rakes · 74 ft of C9", detail: "The ridge line and every roof edge, so the whole silhouette is drawn at night.", spot: { x: 50, y: 17, w: 74, h: 15 } },
    { id: "tree",      name: "Maple trunk & limb wrap",    measure: "≈1,200 ft of minis", detail: "Trunk and every major limb wrapped tight, so the tree glows instead of twinkling.", spot: { x: 86, y: 42, w: 30, h: 86 } },
    { id: "windows",   name: "Window wreaths",             measure: '10 × 24" · lit',     detail: "One in every front window, centered on the upper sash and lit from the inside.", spot: { x: 50, y: 52, w: 76, h: 42 } },
    { id: "path",      name: "Path lights along the walk", measure: "12 lights",          detail: "Low warm lanterns on both sides of the front walk, timer-fed from the porch.", spot: { x: 45, y: 90, w: 92, h: 14 } },
    { id: "service",   name: "Mid-season service visit",   measure: "Included",           detail: "We come back once in December to check every bulb. If one is out, we fix it the same visit.", spot: null },
  ],

  tiers: [
    { id: "classic",   name: "Classic",   line: "The roofline, done right.",          price: 1500, monthly: 125, lit: 6,  image: "img/classic.webp",   crew: "Crew of 2 · about 3 hours" },
    { id: "signature", name: "Signature", line: "The whole front of the house.",     price: 2450, monthly: 204, lit: 10, image: "img/signature.webp", crew: "Crew of 2 · about 4 hours", recommended: true },
    { id: "showcase",  name: "Showcase",  line: "The house the street remembers.",   price: 4200, monthly: 350, lit: 15, image: "img/showcase.webp",  crew: "Crew of 3 · about 5 hours" },
  ],
  /* Blue-hour relight of the homeowner's photo, unlit. Always the bottom layer. */
  baseImage: "img/dusk.webp",
  /* The homeowner's original daytime photo. Only shown by the before/after compare. */
  photoImage: "img/day.webp",

  /* Render slot. Production renders from the relight pipeline are 3:2 at
     2528×1696 (original photo + one relit render per tier, identical house).
     The demo ships a fictional home at 1600×1066 in the same slot, plus
     800px variants for small screens (img/<name>-800.webp). */
  render: { aspect: "3:2", width: 2528, height: 1696, demoWidth: 1600, demoHeight: 1066, fictional: true, note: "Illustrative render of a fictional home." },
};

/* ---------- owner: the 180-point inspection ---------- */
window.PRISM_GRADE = {
  business: "Falls City Light Co.",
  owner: "Dale Whitaker",
  market: "Louisville, KY",
  period: "2025 season",
  gradedOn: "2026-10-06",
  total: 180,
  earned: 118,
  projected: 152,
  grade: "C+",
  projectedGrade: "B+",
  verdict: "A solid operator leaking leads. The crews are the best thing about this business; the phone is the worst.",
  revenue: { current: 412000, projected: 614000 },
  bands: [["A", 162], ["B", 135], ["C", 108], ["D", 0]],
  categories: [
    { id: "offer",    name: "Offer",              possible: 25, earned: 13, gain: 11, finding: "Single-price quotes, no tiers. Average ticket $1,560 against a market that will pay $2,100 for a clearer offer." },
    { id: "pricing",  name: "Pricing",            possible: 20, earned: 16, gain: 0,  finding: "$10.40 per foot of C9, about 8% under the Louisville median. Room to move once the offer is tiered." },
    { id: "reviews",  name: "Reviews",            possible: 25, earned: 21, gain: 0,  finding: "4.9 from 212 Google reviews. Three from the last 30 days are unanswered." },
    { id: "response", name: "Lead response time", possible: 25, earned: 8,  gain: 14, finding: "Median first reply 3 h 42 m. 51% of leads arrive after 6 PM and wait until morning." },
    { id: "followup", name: "Follow-up",          possible: 20, earned: 9,  gain: 9,  finding: "One touch per quote. 61% of unanswered quotes never hear from you again." },
    { id: "website",  name: "Website",            possible: 20, earned: 15, gain: 0,  finding: "Loads in 4.1 s on a phone. No way to book or request a quote without calling." },
    { id: "ads",      name: "Ads",                possible: 20, earned: 14, gain: 0,  finding: "Google Local Services only. $61 per lead, no retargeting of the 2,300 people who visited last fall." },
    { id: "ops",      name: "Operations",         possible: 25, earned: 22, gain: 0,  finding: "94% of installs on schedule. Storage labeled and tested. This is the part that is already a $4M business." },
  ],
  fixes: [
    { n: 1, category: "response", title: "Answer every lead in under five minutes", how: "Prism's agent texts back in about 90 seconds, day or night, books the site visit, and hands Dale the thread.", from: "3 h 42 m", to: "< 5 min", points: 14, revenue: 64000, basis: "41 lost leads a season at a $1,560 average ticket" },
    { n: 2, category: "offer",    title: "Quote every job in three tiers",            how: "Good, better, best, on the homeowner's own house. Average ticket moves from $1,560 to about $2,140 at the same close rate.", from: "$1,560 avg", to: "$2,140 avg", points: 11, revenue: 91000, basis: "157 quotes a season, same 38% close rate" },
    { n: 3, category: "followup", title: "Follow up three times, automatically",      how: "Day 2, day 5, day 9, each with the quote link. Unanswered quotes close at 22% instead of 9%.", from: "9% late close", to: "22% late close", points: 9, revenue: 47000, basis: "96 unanswered quotes a season" },
  ],
};

/* ---------- owner: the pipeline ---------- */
window.PRISM_PIPELINE = {
  today: "Thu, Oct 8",
  stages: [
    { id: "lead", name: "Leads", cards: [
      { id: "brennan", name: "Brennan", where: "1510 Spring Dr, Louisville", source: "Google LSA", when: "12 min ago", state: "Agent replied in 1 min · site visit Thu 4:30 PM", hot: true },
      { id: "okafor",  name: "Okafor",  where: "Prospect, KY",             source: "Referral · Nguyen", when: "2 h ago", state: "Agent replied · waiting on address" },
      { id: "hadley",  name: "Hadley",  where: "Crescent Hill",            source: "Web form", when: "Yesterday", state: "Site visit Sat 9 AM" },
      { id: "marsh",   name: "Marsh",   where: "St. Matthews",             source: "Phone", when: "2 d ago", state: "Needs callback", warn: true },
    ]},
    { id: "quoted", name: "Quoted", cards: [
      { id: "whitfield", name: "Whitfield", where: "2208 Beechmont Ridge", amount: "$1,500–4,200", sent: "Oct 8, 6:12 PM", views: 3, lastView: "7:42 PM", selected: "Signature", state: "Viewed 3× · Signature open", featured: true },
      { id: "ruiz",  name: "Ruiz",  where: "Audubon Park", amount: "$2,900", sent: "Oct 6", views: 1, lastView: "Oct 6", selected: "Signature", state: "Follow-up 2 goes Fri 9 AM" },
      { id: "patel", name: "Patel", where: "Anchorage",    amount: "$1,750", sent: "Today, 4:05 PM", views: 0, state: "Not opened yet" },
    ]},
    { id: "approved", name: "Approved", cards: [
      { id: "nguyen", name: "Nguyen", where: "Indian Hills", amount: "$2,450", tier: "Signature", state: "Deposit paid · choosing a window", warn: true },
      { id: "sutton", name: "Sutton", where: "Glenview",     amount: "$4,650", tier: "Showcase",  state: "Deposit paid · Thu Nov 19, 8:00 AM" },
    ]},
    { id: "scheduled", name: "Scheduled", cards: [
      { id: "garza", name: "Garza", where: "Highlands",     amount: "$1,650", tier: "Classic",   slot: "Mon Nov 16 · 8:00 AM", crew: "Crew A" },
      { id: "lowe",  name: "Lowe",  where: "Cherokee Park", amount: "$2,380", tier: "Signature", slot: "Mon Nov 16 · 12:30 PM", crew: "Crew A" },
      { id: "kim",   name: "Kim",   where: "Norton Commons", amount: "$5,100", tier: "Showcase", slot: "Wed Nov 18 · 8:00 AM", crew: "Crew B" },
    ]},
  ],
  /* the Whitfield quote's own history, read from Prism's quote events */
  whitfieldTimeline: [
    { t: "Oct 8, 6:12 PM", e: "Quote sent by text" },
    { t: "6:31 PM", e: "Opened on iPhone" },
    { t: "6:33 PM", e: "Viewed Showcase" },
    { t: "7:42 PM", e: "Viewed Signature (3rd open)" },
    { t: "Oct 10, 9:00 AM", e: "Follow-up 1 scheduled", future: true },
  ],
  /* install calendar, week of Nov 16 */
  week: [
    { d: "Mon", n: 16, am: { who: "Garza", crew: "A" },  pm: { who: "Lowe", crew: "A" } },
    { d: "Tue", n: 17, am: { hold: "Whitfield" },        pm: null },
    { d: "Wed", n: 18, am: { who: "Kim", crew: "B" },    pm: null },
    { d: "Thu", n: 19, am: { who: "Sutton", crew: "A" },  pm: { hold: "Whitfield" } },
    { d: "Fri", n: 20, am: null,                         pm: null },
    { d: "Sat", n: 21, am: { hold: "Whitfield" },        pm: null },
  ],
};
