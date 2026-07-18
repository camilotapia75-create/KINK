# DungeonKing — demo storefront

A fully client-side e-commerce storefront (dark BDSM-gear theme) with no build
step and no backend. Open `index.html` or serve the folder statically; deploys
as-is to Vercel / Netlify / GitHub Pages.

## Features

- Age gate (18+), cookie banner, "Get 10% Off" promo tab
- Sticky announcement bar, search, category mega-nav with dropdowns
- Homepage: hero, trust badges, category cards, featured products, review strip
- Category pages with breadcrumbs, grid/list toggle, and sorting
  (`category.html?c=<cat>&sub=<sub>`, plus computed `sale` and `best-sellers`
  collections and `?q=` search)
- Product pages: image gallery, sale badges, low-stock / out-of-stock states,
  quantity stepper, review histogram + review list + write-a-review (persisted
  to localStorage)
- Slide-out cart drawer with free-shipping progress bar; full cart page
- Checkout: contact/delivery form, shipping methods, working discount codes
  (`HEAT` = 20%, `WELCOME10` = 10%), order summary, and a demo order
  confirmation. **No payment is processed** — wire Stripe/Shopify here for
  production.

## Structure

| Path | Purpose |
|---|---|
| `assets/js/data.js` | All store config, nav, catalog, reviews, page copy — edit this to rebrand/restock |
| `assets/js/app.js` | Shared runtime: chrome rendering, cart, search, placeholder imagery |
| `assets/css/style.css` | Theme |
| `index/category/product/cart/checkout/info.html` | Pages |

Product images are generated SVG placeholders; give any product an
`images: ["/img/foo.jpg", ...]` array in `data.js` to use real photos.

## Going to production

1. Replace placeholder imagery and copy in `data.js`.
2. Swap the demo payment block in `checkout.html` for Stripe Checkout or move
   the catalog onto Shopify/Medusa (note: adult products need a processor that
   allows them — verify before launch).
3. Add real order storage/emails (any lightweight backend or commerce API).
