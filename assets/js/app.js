/* DungeonKing — shared runtime: header/footer/nav, cart, search,
   placeholder imagery, age gate, cookie banner, promo tab. */

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const money = (n) => STORE.currency + n.toFixed(2);
const byId = (id) => PRODUCTS.find((p) => p.id === id);
const onSale = (p) => p.compareAt && p.compareAt > p.price;
const salePct = (p) => Math.round((1 - p.price / p.compareAt) * 100);
const inStock = (p) => p.stock === undefined || p.stock > 0;

/* ---------- placeholder product imagery ---------- */
const ICONS = {
  cuffs: '<circle cx="35" cy="55" r="16"/><circle cx="65" cy="45" r="16"/><path d="M47 51l8-3"/>',
  belt: '<path d="M15 50h70"/><rect x="40" y="42" width="20" height="16" rx="2"/><path d="M50 42v16"/>',
  collar: '<circle cx="50" cy="50" r="22"/><circle cx="50" cy="74" r="4"/><path d="M50 78v10"/>',
  rope: '<path d="M30 25c20 10-15 25 10 35s-20 20 8 28"/><path d="M42 25c20 10-15 25 10 35s-20 20 8 28"/>',
  stocks: '<rect x="15" y="40" width="70" height="22" rx="3"/><circle cx="35" cy="51" r="7"/><circle cx="65" cy="51" r="7"/>',
  flogger: '<rect x="45" y="15" width="10" height="30" rx="4"/><path d="M48 45l-14 38M50 45v40M52 45l14 38M49 45l-7 40M51 45l7 40"/>',
  cane: '<path d="M40 20c0-8 20-8 20 0v65"/><path d="M35 82h20"/>',
  crop: '<path d="M50 15v55"/><path d="M50 70c-10 0-16 8-8 14s16-2 8-14z"/><rect x="46" y="12" width="8" height="18" rx="3"/>',
  paddle: '<rect x="38" y="12" width="24" height="42" rx="11"/><rect x="46" y="54" width="8" height="32" rx="3"/>',
  wand: '<circle cx="50" cy="28" r="16"/><path d="M42 42l-4 40c0 6 24 6 24 0l-4-40"/>',
  vibe: '<rect x="42" y="18" width="16" height="55" rx="8"/><circle cx="50" cy="24" r="9"/>',
  rose: '<circle cx="50" cy="42" r="18"/><path d="M40 36c4 8 16 8 20 0M42 48c3 5 13 5 16 0"/><path d="M50 60v22"/>',
  dildo: '<path d="M42 75V38c0-14 16-14 16 0v37"/><ellipse cx="50" cy="80" rx="18" ry="7"/>',
  harness: '<path d="M25 30h50l-8 30H33z"/><path d="M33 60l-4 25M67 60l4 25M40 30l10 15 10-15"/>',
  machine: '<rect x="14" y="55" width="45" height="20" rx="4"/><path d="M59 62h20"/><path d="M79 55v14"/><circle cx="26" cy="82" r="5"/><circle cx="48" cy="82" r="5"/>',
  blindfold: '<path d="M18 50c10-14 22-14 32-6 10-8 22-8 32 6-10 14-22 14-32 6-10 8-22 8-32-6z"/>',
  gag: '<circle cx="50" cy="50" r="14"/><path d="M14 50h22M64 50h22"/><circle cx="50" cy="50" r="5"/>',
  clamps: '<path d="M30 25l10 20M50 25l-10 20M60 25l10 20M80 25l-10 20"/><path d="M40 45c10 14 20 14 30 0" fill="none"/>',
  electro: '<rect x="40" y="45" width="20" height="40" rx="8"/><path d="M50 45V25M44 25c0-10 12-10 12 0"/><path d="M35 20l-6-6M65 20l6-6M50 12V4"/>',
  zapper: '<rect x="44" y="30" width="12" height="55" rx="5"/><path d="M50 30l-8-16h10l-6-12"/>',
  plug: '<path d="M38 62c0-20 4-34 12-34s12 14 12 34"/><ellipse cx="50" cy="66" rx="17" ry="6"/>',
  beads: '<circle cx="50" cy="72" r="12"/><circle cx="50" cy="50" r="9"/><circle cx="50" cy="33" r="7"/><circle cx="50" cy="20" r="5"/>',
};

function imgFor(p, variant = 0) {
  if (p.images) return p.images[variant] || p.images[0];
  const h = (p.hue + variant * 14) % 360;
  const angles = [15, 65, 115, 165][variant % 4];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs><linearGradient id="g" gradientTransform="rotate(${angles})">
      <stop offset="0" stop-color="hsl(${h},60%,14%)"/><stop offset="1" stop-color="hsl(${h},72%,30%)"/>
    </linearGradient></defs>
    <rect width="100" height="100" fill="url(#g)"/>
    <g fill="none" stroke="hsla(${h},50%,88%,.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${ICONS[p.icon] || ICONS.wand}</g>
    <text x="50" y="95" font-size="5" fill="hsla(0,0%,100%,.45)" text-anchor="middle" font-family="sans-serif">${STORE.name}</text>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

/* ---------- deterministic generated reviews ---------- */
const REVIEW_NAMES = ["Alex R.", "Morgan T.", "Casey L.", "Riley P.", "Jordan M.", "Quinn S.", "Devon H.", "Skyler J."];
const REVIEW_TEXTS = [
  "Exactly as described, shipped fast in a plain box.",
  "Quality is way above the price point.",
  "Discreet packaging, quick delivery, happy customer.",
  "Solid construction — this will outlast everything else in the drawer.",
  "Bought one for us and one as a gift. Both hits.",
  "Customer service answered my sizing question within the hour.",
];
function reviewsFor(p) {
  const seeded = REVIEWS[p.id] || [];
  const extra = [];
  if (!seeded.length) {
    const n = 2 + (p.id.length % 3);
    for (let i = 0; i < n; i++) {
      extra.push({
        stars: Math.random ? (p.rating >= 4.8 ? 5 : 4 + ((p.id.charCodeAt(i) + i) % 2)) : 5,
        name: REVIEW_NAMES[(p.id.charCodeAt(0) + i * 3) % REVIEW_NAMES.length],
        text: REVIEW_TEXTS[(p.id.charCodeAt(i % p.id.length) + i) % REVIEW_TEXTS.length],
      });
    }
  }
  const local = JSON.parse(localStorage.getItem("dk_reviews_" + p.id) || "[]");
  return [...local, ...seeded, ...extra];
}
const reviewCount = (p) => reviewsFor(p).length;

/* ---------- stars ---------- */
const stars = (n, cls = "") =>
  `<span class="stars ${cls}" aria-label="${n} out of 5 stars">${"★".repeat(Math.round(n))}${"☆".repeat(5 - Math.round(n))}</span>`;

/* ---------- cart ---------- */
const Cart = {
  read: () => JSON.parse(localStorage.getItem("dk_cart") || "[]"),
  write(items) { localStorage.setItem("dk_cart", JSON.stringify(items)); renderCartBits(); },
  add(id, qty = 1) {
    const items = Cart.read();
    const line = items.find((l) => l.id === id);
    if (line) line.qty += qty; else items.push({ id, qty });
    Cart.write(items);
    openDrawer();
  },
  setQty(id, qty) {
    let items = Cart.read();
    const line = items.find((l) => l.id === id);
    if (line) line.qty = Math.max(1, qty);
    Cart.write(items);
  },
  remove(id) { Cart.write(Cart.read().filter((l) => l.id !== id)); },
  clear() { Cart.write([]); },
  count: () => Cart.read().reduce((n, l) => n + l.qty, 0),
  subtotal: () => Cart.read().reduce((n, l) => n + (byId(l.id)?.price || 0) * l.qty, 0),
};

/* ---------- header / footer ---------- */
function renderChrome() {
  const header = $("#site-header");
  if (header) {
    header.innerHTML = `
      <div class="announce">${STORE.announcement.map((a) => `<span><i class="tick">✓</i> <strong>${a.strong}</strong> ${a.text}</span>`).join("")}</div>
      <div class="masthead">
        <a class="logo" href="index.html"><span class="logo-mark">${STORE.logoMark}</span><span class="logo-text">DUNGEON<br>KING</span></a>
        <form class="search" action="category.html" role="search">
          <input type="search" name="q" placeholder="What are you looking for?" aria-label="Search products">
          <button aria-label="Search">⌕</button>
        </form>
        <div class="mast-actions">
          <button class="icon-btn" id="account-btn" aria-label="Account">👤<span class="chev">⌄</span></button>
          <button class="icon-btn cart-btn" id="cart-btn" aria-label="Cart">🛒<span class="cart-count" id="cart-count">0</span></button>
        </div>
      </div>
      <nav class="mainnav" aria-label="Main">
        ${NAV.map((c) => {
          const href = c.page ? `info.html?page=${c.slug}` : `category.html?c=${c.slug}`;
          const drop = c.subs.length
            ? `<div class="drop">${c.subs.map((s) => `<a href="category.html?c=${c.slug}&sub=${s.slug}">${s.name}</a>`).join("")}</div>`
            : "";
          return `<div class="nav-item"><a class="${c.accent ? "accent" : ""}" href="${href}">${c.name}${c.subs.length ? ' <span class="chev">⌄</span>' : ""}</a>${drop}</div>`;
        }).join("")}
      </nav>`;
    $("#cart-btn").addEventListener("click", openDrawer);
    $("#account-btn").addEventListener("click", () => toast("Accounts are disabled in this demo build."));
  }

  const footer = $("#site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="foot-grid">
        <div>
          <h4>Community</h4>
          <a href="info.html?page=events">${STORE.name} Events</a>
          <a href="info.html?page=about">About Us</a>
          <a href="info.html?page=jobs">Jobs</a>
          <a href="#">Discord</a>
          <a href="#">X / Insta</a>
        </div>
        <div>
          <h4>Media</h4>
          <a href="info.html?page=press">Press Kit</a>
          <a href="info.html?page=affiliates">Affiliates</a>
          <a href="info.html?page=reviews">All Reviews</a>
          <a href="info.html?page=compliance">Compliance</a>
        </div>
        <div>
          <h4>Get 10% Off</h4>
          <p class="foot-note">Join the court. One email a week, first order 10% off with code <strong>WELCOME10</strong>.</p>
          <form class="newsletter" id="newsletter"><input type="email" placeholder="Email address" required><button>Join</button></form>
        </div>
      </div>
      <p class="foot-legal">© ${new Date().getFullYear()} ${STORE.name}. Adults 18+ only. Demo storefront — no real orders are processed. <a href="info.html?page=terms">Terms</a> · <a href="info.html?page=privacy">Privacy</a></p>`;
    $("#newsletter").addEventListener("submit", (e) => {
      e.preventDefault();
      toast("Welcome to the court 👑 — use code WELCOME10 at checkout.");
      e.target.reset();
    });
  }

  document.body.insertAdjacentHTML("beforeend", `
    <div class="drawer-wrap" id="drawer-wrap" hidden>
      <div class="drawer-overlay" id="drawer-overlay"></div>
      <aside class="drawer" role="dialog" aria-label="Your cart"><div id="drawer-body"></div></aside>
    </div>
    <div class="toast" id="toast" hidden></div>
    <button class="promo-tab" id="promo-tab">Get 10% Off</button>`);
  $("#drawer-overlay").addEventListener("click", closeDrawer);
  $("#promo-tab").addEventListener("click", () => toast("First order 10% off — code WELCOME10 at checkout."));

  ageGate();
  cookieBanner();
  renderCartBits();
}

/* ---------- product card ---------- */
function productCard(p, list = false) {
  const oos = !inStock(p);
  return `<a class="card ${list ? "card-list" : ""}" href="product.html?p=${p.id}">
    <div class="card-img">
      ${onSale(p) ? `<span class="sale-flag">Sale -${salePct(p)}%</span>` : ""}
      <img src="${imgFor(p)}" alt="${p.name}" loading="lazy">
    </div>
    <div class="card-info">
      <h3>${p.name}</h3>
      ${oos ? '<p class="oos">Out of stock</p>' : p.stock !== undefined && p.stock <= 5 ? `<p class="oos">${p.stock} in stock</p>` : ""}
      <p class="price">${onSale(p) ? `<s>${money(p.compareAt)}</s> ` : ""}<b>${money(p.price)}</b></p>
      ${list ? `<p class="card-desc">${p.desc}</p>` : ""}
    </div>
  </a>`;
}

/* ---------- cart drawer + count ---------- */
function renderCartBits() {
  const count = $("#cart-count");
  if (count) count.textContent = Cart.count();
  const body = $("#drawer-body");
  if (!body) return;
  const items = Cart.read();
  const sub = Cart.subtotal();
  const remaining = STORE.freeShipThreshold - sub;
  body.innerHTML = `
    <button class="drawer-close" onclick="closeDrawer()" aria-label="Close">✕</button>
    <h2>Your Cart</h2>
    ${items.length === 0 ? '<p class="drawer-empty">Your cart is empty. The dungeon awaits.</p>' : items.map((l) => {
      const p = byId(l.id);
      return `<div class="drawer-line">
        <img src="${imgFor(p)}" alt="">
        <div class="dl-info">
          <p class="dl-name">${p.name}</p>
          <div class="dl-controls">
            <span class="qty"><button onclick="Cart.setQty('${p.id}',${l.qty - 1})">−</button><b>${l.qty}</b><button onclick="Cart.setQty('${p.id}',${l.qty + 1})">+</button></span>
            <button class="link-btn" onclick="Cart.remove('${p.id}')">🗑 Remove</button>
          </div>
        </div>
        <p class="dl-price">${onSale(p) ? `<s>${money(p.compareAt)}</s> ` : ""}<b>${money(p.price * l.qty)}</b></p>
      </div>`;
    }).join("")}
    ${items.length ? `
      <div class="ship-bar">${remaining > 0 ? `Spend <b>${money(remaining)}</b> more to get <b>Free Shipping</b>` : "🎉 You've unlocked <b>Free Shipping</b>"}</div>
      <div class="drawer-totals">
        <p><span>Total products (${Cart.count()})</span><span>${money(sub)}</span></p>
        <p class="tot"><span>Total excluding Tax</span><span>${money(sub)}</span></p>
      </div>
      <a class="btn btn-red" href="cart.html">View cart</a>
      <a class="btn btn-gold" href="checkout.html">Checkout</a>
      <div class="assure">🔒<br>${STORE.returnDays} Day King's Return Policy<br>Always Discreet Shipping</div>
      <div class="pay-icons">${["AMEX","Apple Pay","Diners","Discover","G Pay","JCB","Mastercard","PayPal","UnionPay","Venmo","VISA"].map((x) => `<span>${x}</span>`).join("")}</div>` : ""}`;
}
function openDrawer() { const w = $("#drawer-wrap"); w.hidden = false; requestAnimationFrame(() => w.classList.add("open")); renderCartBits(); }
function closeDrawer() { const w = $("#drawer-wrap"); w.classList.remove("open"); setTimeout(() => (w.hidden = true), 250); }

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.hidden = false; t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove("show"); setTimeout(() => (t.hidden = true), 300); }, 3200);
}

/* ---------- age gate ---------- */
function ageGate() {
  if (localStorage.getItem("dk_adult") === "yes") return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="age-gate" id="age-gate">
      <div class="age-box">
        <span class="logo-mark big">${STORE.logoMark}</span>
        <h2>Adults Only</h2>
        <p>${STORE.name} sells adult products. You must be 18 or older (or the age of majority where you live) to enter.</p>
        <div class="age-actions">
          <button class="btn btn-red" id="age-yes">I am 18 or older — Enter</button>
          <a class="btn btn-ghost" href="https://www.google.com">Leave</a>
        </div>
      </div>
    </div>`);
  $("#age-yes").addEventListener("click", () => {
    localStorage.setItem("dk_adult", "yes");
    $("#age-gate").remove();
  });
}

/* ---------- cookie banner ---------- */
function cookieBanner() {
  if (localStorage.getItem("dk_cookies")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="cookie-bar" id="cookie-bar">
      <span>🍪</span>
      <p>Our shop uses cookies. By clicking on Accept you are agreeing to our <a href="info.html?page=terms">terms of service</a> and <a href="info.html?page=privacy">privacy policy</a>.</p>
      <button class="link-btn" id="cookie-no">Decline</button>
      <button class="btn btn-red small" id="cookie-yes">Accept</button>
    </div>`);
  const done = (v) => { localStorage.setItem("dk_cookies", v); $("#cookie-bar").remove(); };
  $("#cookie-yes").addEventListener("click", () => done("yes"));
  $("#cookie-no").addEventListener("click", () => done("no"));
}

/* ---------- collections ---------- */
function productsForCollection(c, sub, q) {
  let list = PRODUCTS;
  if (q) {
    const needle = q.toLowerCase();
    return list.filter((p) => (p.name + " " + p.desc + " " + p.category + " " + p.sub).toLowerCase().includes(needle));
  }
  if (c === "sale") {
    list = list.filter(onSale);
    if (sub === "sale-toys") list = list.filter((p) => p.category === "sex-toys");
    if (sub === "sale-bondage") list = list.filter((p) => p.category === "bondage");
    return list;
  }
  if (c === "best-sellers") return list.filter((p) => p.best);
  list = list.filter((p) => p.category === c);
  if (sub) list = list.filter((p) => p.sub === sub);
  return list;
}

document.addEventListener("DOMContentLoaded", renderChrome);
