/* DungeonKing — store configuration & catalog.
   Everything brand- or merch-specific lives in this file: swap STORE, NAV,
   PRODUCTS and PAGES to rebrand or restock without touching app code. */

const STORE = {
  name: "DungeonKing",
  logoMark: "DK",
  tagline: "Dungeon-grade gear, delivered discreetly",
  currency: "$",
  freeShipThreshold: 119,
  returnDays: 101,
  announcement: [
    { strong: "FREE Shipping", text: "on US orders over $119" },
    { strong: "Always", text: "Discreet Packages", swap: true },
    { strong: "101 Day King's Promise", text: "Return Policy" },
  ],
  promoLine: "SALE ENDING! Xtra 20% Off Now - use code: HEAT",
  coupons: { HEAT: 20, WELCOME10: 10 },
  shippingMethods: [
    { id: "standard", name: "Standard Shipping (3-6 days)", price: 6.95, freeOverThreshold: true },
    { id: "express", name: "Express Shipping (1-2 days)", price: 14.95, freeOverThreshold: false },
  ],
};

/* Navigation. `slug` matches PRODUCTS[].category / .sub, except the two
   computed collections: "sale" (any product with compareAt) and
   "best-sellers" (products flagged best:true). */
const NAV = [
  { slug: "sale", name: "SALE", accent: true, subs: [
    { slug: "sale", name: "All Deals" },
    { slug: "sale-toys", name: "Toy Deals" },
    { slug: "sale-bondage", name: "Bondage Deals" },
  ]},
  { slug: "bondage", name: "Bondage Toys", blurb: "Leather, Steel & Rope", subs: [
    { slug: "leather", name: "Leather Restraints" },
    { slug: "steel", name: "Steel Bondage" },
    { slug: "rope", name: "Rope" },
    { slug: "furniture", name: "Dungeon Furniture" },
  ]},
  { slug: "impact", name: "Impact Toys", blurb: "Floggers, Canes and Crops", subs: [
    { slug: "floggers", name: "Floggers" },
    { slug: "canes-crops", name: "Canes & Crops" },
    { slug: "paddles", name: "Paddles" },
  ]},
  { slug: "sex-toys", name: "Sex Toys", blurb: "Machines, Wands & More", subs: [
    { slug: "sex-machines", name: "Sex Machines" },
    { slug: "vibrators", name: "Vibrators" },
    { slug: "wands", name: "Wands" },
    { slug: "dildos", name: "Dildos" },
    { slug: "strap-ons", name: "Strap On Gear" },
  ]},
  { slug: "sensory", name: "Sensory Toys", blurb: "Blindfolds, Gags & Nipple Clamps", subs: [
    { slug: "blindfolds", name: "Blindfolds" },
    { slug: "gags", name: "Gags" },
    { slug: "nipple-clamps", name: "Nipple Clamps" },
  ]},
  { slug: "electro", name: "Electro Sex", blurb: "Wands & Zappers", subs: [
    { slug: "electro-wands", name: "Electro Wands" },
    { slug: "zappers", name: "Zappers" },
  ]},
  { slug: "anal", name: "Anal Toys", blurb: "Plugs & Beads", subs: [
    { slug: "plugs", name: "Plugs" },
    { slug: "beads", name: "Beads" },
  ]},
  { slug: "best-sellers", name: "Best Sellers", subs: [] },
  { slug: "advice", name: "Advice", page: true, subs: [] },
  { slug: "events", name: "Events", page: true, subs: [] },
];

/* Product images are generated placeholders (see app.js imgFor). `hue`
   tints the placeholder; `icon` picks the silhouette. Replace with real
   photo paths by adding `images: ["/img/...jpg", ...]` to any product. */
const PRODUCTS = [
  { id: "leather-restraint-kit", name: "Full Submission: Signature Leather Restraint Kit", category: "bondage", sub: "leather",
    price: 179.97, rating: 4.9, featured: true, best: true, hue: 0, icon: "cuffs",
    desc: "Our flagship eight-piece restraint kit in full-grain leather: wrist and ankle cuffs, collar, connector chains and locking hardware. Built to hold, padded to last all night." },
  { id: "padded-wrist-cuffs", name: "Padded Leather Wrist Cuffs", category: "bondage", sub: "leather",
    price: 49.97, rating: 4.8, hue: 8, icon: "cuffs",
    desc: "Buckling wrist cuffs with plush neoprene padding and heavy D-rings. Comfortable for marathon sessions, strong enough for real struggle." },
  { id: "bondage-belt-pair", name: "Leather Bondage Belt Pairs", category: "bondage", sub: "leather",
    price: 24.97, rating: 4.7, featured: true, hue: 350, icon: "belt",
    desc: "Matched pairs of roller-buckle bondage belts. Cinch thighs, ankles or elbows — endlessly versatile, endlessly sold out. Grab them while they're here." },
  { id: "steel-collar-lead", name: "Heavy Steel Collar & Lead", category: "bondage", sub: "steel",
    price: 89.0, rating: 4.9, hue: 210, icon: "collar",
    desc: "Polished stainless collar with hex-key closure and a matching 36\" lead. Cold, heavy, and unmistakably serious." },
  { id: "hemp-rope-30", name: "Natural Hemp Bondage Rope — 30ft", category: "bondage", sub: "rope",
    price: 24.97, compareAt: 29.99, rating: 4.8, hue: 35, icon: "rope",
    desc: "Conditioned 6mm hemp in a 30-foot hank. Broken in, low-stretch, and ready for your first (or five-hundredth) tie." },
  { id: "wooden-stocks", name: "Thin Line Wooden Bondage Stocks", category: "bondage", sub: "furniture",
    price: 289.97, rating: 5.0, stock: 4, featured: true, hue: 25, icon: "stocks",
    desc: "Hand-finished hardwood stocks with cam-lock closures in walnut, cherry or oak. Heirloom-grade dungeon furniture, made in small batches." },
  { id: "suede-flogger", name: "Braided Suede Flogger", category: "impact", sub: "floggers",
    price: 79.97, compareAt: 99.97, rating: 4.9, best: true, hue: 275, icon: "flogger",
    desc: "Forty suede falls on a braided leather handle. Thuddy, balanced, and gorgeous in motion — the flogger we reach for first." },
  { id: "rattan-cane-duo", name: "Rattan Cane Duo", category: "impact", sub: "canes-crops",
    price: 34.97, rating: 4.6, hue: 45, icon: "cane",
    desc: "Two hand-straightened rattan canes — one whippy, one stout. Classic sting with a classic soundtrack." },
  { id: "riding-crop", name: "Classic Riding Crop", category: "impact", sub: "canes-crops",
    price: 29.97, rating: 4.7, hue: 15, icon: "crop",
    desc: "Leather-wrapped shaft, looped keeper, satisfying crack. The starter impact toy that never gets retired." },
  { id: "studded-paddle", name: "Studded Leather Paddle", category: "impact", sub: "paddles",
    price: 44.97, compareAt: 54.97, rating: 4.8, hue: 0, icon: "paddle",
    desc: "Double-layer bridle leather with a studded face on one side, smooth on the other. Two moods, one paddle." },
  { id: "mini-pulse-wand", name: "Pulse Point Mini Wand by DK", category: "sex-toys", sub: "wands",
    price: 12.0, compareAt: 16.99, rating: 5.0, featured: true, best: true, hue: 352, icon: "wand",
    desc: "The Pulse Point Mini Wand may be small, but it delivers big, satisfying vibrations exactly where you want them. With ten patterns, a silky silicone head and USB charging, it punches far above its price." },
  { id: "core-power-wand", name: "Core Power Wand by DK", category: "sex-toys", sub: "wands",
    price: 89.97, rating: 4.9, best: true, hue: 345, icon: "wand",
    desc: "Our full-size cordless wand: deep rumbly power, an hour of runtime, and a head that takes every DK attachment." },
  { id: "little-devil-vibe", name: "Little Devil Precision Vibrator", category: "sex-toys", sub: "vibrators",
    price: 14.0, compareAt: 19.99, rating: 4.7, hue: 300, icon: "vibe",
    desc: "A pinpoint-tip vibrator with two swappable heads for precise, devilish sensation. Small toy, wicked results." },
  { id: "air-pulse-pro", name: "Air-Pulse Stimulator Pro 2", category: "sex-toys", sub: "vibrators",
    price: 59.7, rating: 4.8, stock: 0, hue: 30, icon: "vibe",
    desc: "Touch-free air-pulse technology in a rose-gold body. Currently out of stock — join the waitlist and we'll email you the moment it lands." },
  { id: "rose-air-vibe", name: "Rose Rechargeable Air-Pulse Vibrator — Pink", category: "sex-toys", sub: "vibrators",
    price: 55.0, rating: 4.6, stock: 0, hue: 320, icon: "rose",
    desc: "The viral rose, done right: sealed silicone, magnetic charging, and eleven suction levels. Restocking soon." },
  { id: "crimson-dragon-dildo", name: "Crimson Dragon Fantasy Dildo", category: "sex-toys", sub: "dildos",
    price: 74.97, rating: 4.9, hue: 355, icon: "dildo",
    desc: "A dual-density platinum silicone fantasy piece with a suction base and serious presence. Poured in-house, one at a time." },
  { id: "classic-dildo-7", name: "Classic Realistic Dildo — 7\"", category: "sex-toys", sub: "dildos",
    price: 39.97, rating: 4.5, hue: 20, icon: "dildo",
    desc: "Body-safe silicone, harness-compatible base, no-nonsense shape. A dependable classic for a reason." },
  { id: "pegging-harness-kit", name: "Pro Pegging Strap-On Harness Kit", category: "sex-toys", sub: "strap-ons",
    price: 119.97, rating: 4.9, best: true, hue: 340, icon: "harness",
    desc: "A padded jock-style harness with dual O-rings plus our 6\" silicone dildo. Everything you need to peg like a pro, in one box." },
  { id: "thrust-machine-pro", name: "Thrust Machine Pro", category: "sex-toys", sub: "sex-machines",
    price: 649.0, rating: 5.0, featured: true, hue: 260, icon: "machine",
    desc: "Variable-speed thrusting machine with quick-lock adapter, remote, and a whisper-quiet motor rated for hours of continuous duty." },
  { id: "padded-blindfold", name: "Padded Leather Blindfold", category: "sensory", sub: "blindfolds",
    price: 34.97, rating: 4.8, best: true, hue: 0, icon: "blindfold",
    desc: "Total blackout in glove-soft leather with red piping. Elastic strap, zero pressure points, endless anticipation." },
  { id: "breathable-ball-gag", name: "Breathable Ball Gag", category: "sensory", sub: "gags",
    price: 27.97, compareAt: 34.97, rating: 4.7, hue: 356, icon: "gag",
    desc: "A vented silicone ball on an adjustable leather strap. All of the look, none of the jaw ache." },
  { id: "nipple-clamps", name: "Adjustable Nipple Clamps with Chain", category: "sensory", sub: "nipple-clamps",
    price: 19.97, rating: 4.6, hue: 220, icon: "clamps",
    desc: "Screw-adjustable clamps with rubber tips and a connecting chain — dial the pinch from whisper to wow." },
  { id: "aurora-electro-kit", name: "Aurora Electro Wand Essentials Kit by DK", category: "electro", sub: "electro-wands",
    price: 159.97, compareAt: 227.99, rating: 4.9, featured: true, best: true, hue: 270, icon: "electro",
    desc: "A complete violet-style electro wand kit: handle, five glass electrodes and a padded case. Crackling, theatrical, unforgettable." },
  { id: "zapper-2", name: "Shock Stick Zapper 2.0 by DK", category: "electro", sub: "zappers",
    price: 39.99, compareAt: 49.99, rating: 4.7, featured: true, hue: 5, icon: "zapper",
    desc: "Three power levels of pocket lightning. The 2.0 adds a safety cap, USB-C, and a much more evil crackle." },
  { id: "training-plug-set", name: "Silicone Training Plug Set", category: "anal", sub: "plugs",
    price: 44.97, rating: 4.8, best: true, hue: 330, icon: "plug",
    desc: "Three graduated platinum-silicone plugs with flared bases. Start small, take your time, level up." },
  { id: "steel-beads", name: "Polished Steel Anal Beads", category: "anal", sub: "beads",
    price: 32.97, rating: 4.6, hue: 215, icon: "beads",
    desc: "Weighty graduated steel beads with a solid pull-ring. Warm them, chill them, love them." },
];

/* Seeded reviews for hero products; other products get deterministic
   generated reviews (see app.js). */
const REVIEWS = {
  "mini-pulse-wand": [
    { stars: 5, name: "Gabriel B.", text: "For the size it's incredibly powerful" },
    { stars: 5, name: "Dana R.", text: "Bought as a stocking stuffer, became the daily driver." },
    { stars: 5, name: "Priya S.", text: "Quiet, cute, charges fast. No complaints at this price." },
    { stars: 5, name: "Marcus T.", text: "Pattern 7 is unfair. Five stars." },
    { stars: 5, name: "Lee W.", text: "Travel-sized but not travel-powered. Impressed." },
    { stars: 5, name: "Sam K.", text: "Second one I've bought — first was 'borrowed' permanently." },
  ],
  "leather-restraint-kit": [
    { stars: 5, name: "Victoria M.", text: "The leather quality is genuinely dungeon-grade. Worth every cent." },
    { stars: 5, name: "Andre P.", text: "Hardware is heavy and quiet. Cuffs are comfy for hours." },
    { stars: 4, name: "Jules F.", text: "Runs slightly large — size down the collar. Otherwise flawless." },
  ],
  "aurora-electro-kit": [
    { stars: 5, name: "Nikki D.", text: "The crackle alone is worth it. Theatrical and delicious." },
    { stars: 5, name: "Owen C.", text: "Case is a nice touch. All five electrodes arrived intact." },
    { stars: 4, name: "Harper L.", text: "Learning curve, but the manual is actually good." },
  ],
};

const QUOTE_STRIP = { stars: 5, text: "Quick shipping, good selection, friendly customer service", author: "David K., Verified buyer" };

/* Simple info pages rendered by info.html?page=… */
const PAGES = {
  advice: { title: "Advice", body: `<h3>New to the dungeon?</h3><p>Start slow, talk first, and buy quality. Our guides cover negotiation, safewords, aftercare, and how to pick your first restraint, impact toy, or electro kit.</p><h3>Care & cleaning</h3><p>Leather wants conditioner, silicone wants mild soap, steel wants a polish. Every DungeonKing product page lists exact care instructions.</p><h3>Safety first</h3><p>Keep safety shears within reach for rope, avoid joints with impact play, and never leave a restrained partner alone. When in doubt, go lighter and slower.</p>` },
  events: { title: "DungeonKing Events", body: `<p>Meet us on the road — workshops, markets, and demo nights.</p><h3>Upcoming</h3><p><strong>Aug 14</strong> — Rope Fundamentals workshop (21+)<br><strong>Sep 2</strong> — Leather care clinic, free with any purchase<br><strong>Oct 30</strong> — Halloween market pop-up</p>` },
  about: { title: "About Us", body: `<p>DungeonKing exists because cheap gear breaks at the worst possible moment. We design, test, and stand behind dungeon-grade equipment — and back it with a ${STORE.returnDays}-day return promise and discreet shipping, always.</p>` },
  jobs: { title: "Jobs", body: `<p>We're a small crew of makers, testers, and shippers. Open roles are posted here when we have them — right now we're hiring a <strong>fulfillment lead</strong> and a <strong>leatherworker (part-time)</strong>. Write to jobs@ with your story.</p>` },
  press: { title: "Press Kit", body: `<p>Logos, product photography, and founder bios for media use. Email press@ for the full kit and interview requests.</p>` },
  affiliates: { title: "Affiliates", body: `<p>Earn 15% on every referred order with 30-day cookies, monthly payouts, and a dedicated affiliate manager. Apply with your channel links.</p>` },
  reviews: { title: "All Reviews", body: `<p>Every review on DungeonKing is from a verified buyer. Browse any product page for its full review history — here are some recent favorites:</p><blockquote>"Quick shipping, good selection, friendly customer service" — David K.</blockquote><blockquote>"The leather quality is genuinely dungeon-grade." — Victoria M.</blockquote><blockquote>"For the size it's incredibly powerful" — Gabriel B.</blockquote>` },
  compliance: { title: "Compliance", body: `<p>DungeonKing sells adult products to adults. All customers must be 18+ (or the age of majority in their jurisdiction). We verify age at checkout where required by law, package every order discreetly, and never sell customer data.</p>` },
  terms: { title: "Terms of Service", body: `<p>Demo terms: this is a demonstration storefront. No real orders are processed and no payment details are collected.</p>` },
  privacy: { title: "Privacy Policy", body: `<p>Demo policy: cart contents and preferences are stored only in your own browser (localStorage). Nothing is transmitted to a server.</p>` },
};
