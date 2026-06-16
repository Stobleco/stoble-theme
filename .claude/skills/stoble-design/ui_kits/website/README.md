# Stoble Website UI Kit

A high-fidelity recreation of the Stoble Coffee e-commerce experience.

## screens
- **Homepage** (`index.html`) — sticky header, navy hero with bag-shaped product mockup, six-roast lineup, story block with stats, two-card cafe/workplace promo, navy subscription band, full footer. Includes a working cart drawer that opens on "add to bag" and supports qty +/−/remove.

## components
| File | Component |
|---|---|
| `Primitives.jsx` | `Wordmark`, `Symbol`, `Button`, `Eyebrow`, `BetterTogether`, `CoffeeBag` |
| `Header.jsx` | Sticky top nav with cart count + icon buttons |
| `Hero.jsx` | Navy full-bleed hero with serif headline + tagline |
| `Roasts.jsx` | `RoastCard` (single product) + `RoastsGrid` (3-up of all six roasts) |
| `Story.jsx` | Split section: story copy + stats panel |
| `Subscribe.jsx` | `SubscribeBand` (CTA band) + `CafeBlock` (two-location card row) |
| `Footer.jsx` | Navy footer with 4 link columns + Better Together mark |
| `CartDrawer.jsx` | Right-side slide-in cart with line items and totals |

## styles
- All styles live in `site.css` (component-scoped) and inherit tokens from `../../colors_and_type.css`.

## notes
- The `CoffeeBag` component is a faked "packaging label" rendered in CSS — it stands in for real product photography. On Shopify it should be swapped for actual lifestyle shots; see `preview/product-card.html` for the photo-slot version of the card.
- Cart drawer state is in-memory only — there's no real cart or checkout.
- No real codebase or Figma was provided; this is built from the V1.2 PDF style guide and the brand assets.
