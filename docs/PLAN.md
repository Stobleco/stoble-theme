# Stoble Coffee — Shopify Theme Build Plan

**Status:** Planning draft for review. No production code written yet.
**Base theme:** [TrellisCommerce/shopify-tailwind-starter-base](https://github.com/TrellisCommerce/shopify-tailwind-starter-base) — a **maintained fork of Shopify Dawn (tracks v15.2.0)** with Tailwind CSS pre-wired (Tailwind CLI build, `twcss-` class prefix), Prettier + Husky, and Theme Check / Lighthouse GitHub Actions. We fork *this* rather than Dawn directly, so we inherit Tailwind + the Dawn upgrade path in one go.
**Design source:** Direction 4 ("restrained + warm") — the approved pick per `index.html` and the chat transcripts in `bundle/stoble-coffee-website/chats/`.
**Author:** Initial pass — mark this up and we'll iterate before any code.

> **Tailwind note (applies throughout):** Everywhere this plan says "custom CSS in `assets/stoble.css`," read it as **Tailwind utility classes (`twcss-` prefix) configured against our brand tokens in `tailwind.config.js`**, compiled by the Tailwind CLI to `assets/app.css`. Brand tokens (navy, cream, roast colors, type scale, radii, motion) are ported from `tokens.css` into `tailwind.config.js → theme.extend` AND mirrored as CSS custom properties for the bespoke SVG/animation bits. Hand-written CSS is reserved for the signature treatments (tilted photos, `CircleSticker`, `better-together`) that don't map cleanly to utilities. See §3.1.

---

## 0. TL;DR — read this first

We're converting the approved D4 mockups (`d4.jsx` homepage + product, `subscriptions-v3.jsx` subscription page) into a custom Shopify Online Store 2.0 theme forked from Dawn. The architecture leans entirely on **sections, blocks, theme settings, and metaobjects** so Sadie and Al can run the site without touching code.

**Things you should handle / decide before we start the build phase:**

1. **Node version.** You're on **Node v25.8.0**. Shopify CLI officially supports the **Node 20.x / 22.x LTS** lines. Node 25 is odd-numbered/non-LTS and routinely trips up the CLI's theme commands. **Recommendation: install `nvm` and pin Node 22 LTS for this project** (details in §1). This is the single most likely thing to bite us on day one.
2. **Shopify CLI is not installed** on this machine yet. We'll install it via Homebrew or npm (§1).
3. **Store access.** I'll need to authenticate the CLI against the Stoble store. You'll need to confirm I have a **staff account with "Themes" permission** (or Partner/collaborator access) on the production Shopify store.
4. **Git remote.** This repo currently has **no remote** and is a *design-explorations* repo, not a theme repo. Decision needed: do we build the theme **in a new repo** (recommended) or in a `theme/` subfolder of this one? See §3.
5. **Ruby** 3.4.1 is present but **not required** — the modern Shopify CLI is Node-based. No action needed.
6. The subscription page is **already wired to live Recharge selling-plan IDs and Shopify variant IDs** (`subscriptions-v3.jsx`). That's gold — it tells us exactly how Recharge is configured today (§7).

---

## 1. Local development setup

Concrete, ordered steps. Assumes macOS (you're on darwin 25.5.0) and comfort in the terminal.

### 1.1 Pin the right Node version

The CLI is fussy about Node. Install `nvm` if you don't have it, then pin Node 22 LTS:

```bash
# install nvm (skip if already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# restart shell, then:
nvm install 22
nvm use 22
node -v   # should print v22.x
```

We'll add a `.nvmrc` containing `22` to the theme repo so `nvm use` auto-selects it.

> Why not Node 25? Shopify CLI targets active LTS (20/22). Non-LTS releases periodically break `shopify theme dev`'s bundled tooling. Pinning 22 removes a whole class of "works on my machine" problems.

### 1.2 Install Shopify CLI

Two options; **Homebrew is cleaner on macOS** because it sidesteps global npm permission issues:

```bash
# Recommended:
brew tap shopify/shopify
brew install shopify-cli

# Or via npm (uses the Node you pinned above):
npm install -g @shopify/cli@latest

shopify version   # confirm it installs
```

### 1.3 Authenticate against the Stoble store

```bash
shopify theme dev --store stoblecoffee.myshopify.com
# or log in explicitly first:
shopify auth logout   # clears any stale session
```

The first `theme` command opens a browser to authenticate. I'll need **staff access with the "Themes" permission** on the store (Settings → Users and permissions), or Partner collaborator access. Confirm the exact `*.myshopify.com` handle — the public domain is `stoblecoffee.com` but the CLI wants the internal handle.

### 1.4 Get the base theme — **fork `TrellisCommerce/shopify-tailwind-starter-base`**

We fork the **Trellis Tailwind starter** (a maintained Dawn fork with Tailwind already wired) rather than Dawn directly. This gives us Tailwind tooling, Prettier/Husky, and the Theme Check / Lighthouse CI for free, while still preserving the Dawn upgrade path (Trellis tracks upstream Dawn; we track Trellis).

Per the Trellis README, the intended setup is **fork → enable Actions → clone → `npm install`**, then connect the GitHub repo in the Shopify admin (Themes → Add theme → connect from GitHub) for the GitHub-integration deploy flow, and use `shopify theme dev` for local development.

```bash
# 1. Fork TrellisCommerce/shopify-tailwind-starter-base to your account,
#    renaming it stoble-theme (gh does both in one step):
gh repo fork TrellisCommerce/shopify-tailwind-starter-base \
  --fork-name stoble-theme --clone=false

# 2. Clone OUR fork into the theme directory (a sibling of design-explorations):
git clone git@github.com:<owner>/stoble-theme.git "../stoble-theme"
cd ../stoble-theme

# 3. Wire upstreams: `origin` = our fork; `trellis` = the starter we forked.
#    (Trellis itself tracks Shopify/dawn, so we add dawn too for direct cherry-picks.)
git remote add trellis https://github.com/TrellisCommerce/shopify-tailwind-starter-base.git
git remote add dawn https://github.com/Shopify/dawn.git
git fetch trellis && git fetch dawn

# 4. Pin Node + install deps:
echo "22" > .nvmrc        # (the starter may already ship one — keep theirs if so)
nvm use
npm install               # Tailwind, Prettier, Husky, theme tooling
```

> **Enable Actions** in the forked repo's GitHub *Actions* tab (forks have Actions disabled by default) so Theme Check + Lighthouse CI run. The GitHub→Shopify theme connection is optional but is Trellis's recommended deploy path; it coexists with the `shopify theme push` flow in §1.7.

### 1.5 Create a development theme (previews real store data, never touches live)

```bash
shopify theme dev --store stoblecoffee.myshopify.com
```

`shopify theme dev` spins up a **temporary development theme** on the store (it appears in the admin theme list as a hidden dev theme, auto-deleted after ~7 days of inactivity). It serves your local files at `http://127.0.0.1:9292`, pulling **live products, collections, metaobjects, and customers** from the store — so previews are realistic — **without affecting the published theme or any unpublished theme**. It includes **hot reload**: save a `.liquid`/`.css`/`.js` file and the browser updates in place.

Keep this running in a dedicated terminal while building.

### 1.6 Git strategy

- **Trunk:** `main` is the deployable trunk.
- **Feature branches:** one per section/template, e.g. `feat/section-hero`, `feat/template-coffee-pdp`, `feat/recharge-pdp`. Short-lived, squash-merge into `main`.
- **Dawn updates:** `git fetch upstream && git merge upstream/main` on a `chore/dawn-upgrade` branch, resolve conflicts (kept minimal by §3's discipline), QA on a dev theme, then merge.
- **Commit hygiene:** conventional-ish prefixes (`feat:`, `fix:`, `chore:`, `style:`). Never commit `.shopify/`, secrets, or `node_modules`. Add a `.gitignore` covering `.shopify/`, `*.env`, `.DS_Store`.
- **Source of truth is git, not the store.** We push *from* local to the store, never edit theme code in the admin. (Content — section settings, metaobject values — *is* edited in the admin; that's expected and lives in the store, not git. More in §3.4.)

### 1.7 Safe deploy flow (push → QA → publish)

```bash
# 1. Push to a NAMED unpublished theme (creates/updates it, never publishes):
shopify theme push --unpublished --theme "Stoble v3 — staging"

# subsequent pushes to that same theme:
shopify theme push --theme "Stoble v3 — staging"

# 2. QA: open the preview link the CLI prints, or in admin: Themes → ... → Preview.
#    Click through homepage, a coffee PDP, collection, subscriptions, cart, checkout.

# 3. When approved, publish from the admin (Themes → Publish) — deliberately a
#    manual, human step, not a CLI flag, so publishing is always a conscious act.
```

- Use `shopify theme pull` only to retrieve content/settings changes editors made in the admin (e.g. `--only templates/*.json,config/settings_data.json`) so we don't clobber their work.
- **Never** run `shopify theme push` against the live theme directly. Always push to the named staging theme.

### 1.8 Environment variables & secrets

Theme code itself holds **no secrets** — Shopify handles auth via the CLI session. The only "config" we manage:

- **`shopify.theme.toml`** (committed): defines named theme environments so we can do `shopify theme push -e staging` without retyping flags.
- **Public, non-secret keys** (Klaviyo **public** API key, Recharge selling-plan IDs, Meta Pixel ID) belong in **theme settings** (`settings_schema.json`), set by editors in the admin — not in `.env`. They're public by nature (they ship to the browser).
- **No private/secret API keys** should ever live in the theme. Klaviyo private keys, Recharge admin tokens, etc. stay server-side (Shopify app integrations), never in Liquid.
- `.gitignore` will still include `.env` as a guardrail.

### 1.9 Recommended editor setup

- **VS Code** + the official **Shopify Liquid** extension (`Shopify.theme-check-vscode`) — Liquid syntax highlighting, autocomplete, and Theme Check inline.
- **Theme Check** (ships with the CLI): `shopify theme check` in CI and locally; catches Liquid errors, undefined objects, performance issues, accessibility lints.
- **Prettier** with `prettier-plugin-liquid` for consistent Liquid/JSON/CSS formatting. Add a `.prettierrc` and an `.editorconfig`.
- Optional: a pre-commit hook (husky or a simple git hook) running `shopify theme check` + `prettier --check`.

---

## 2. Mockup analysis

### 2.1 What I read

- `index.html` — the concept index. Confirms **Direction 4 is the "current pick"**, with D1 kept as reference and D2/D3 dropped.
- `d4.jsx` — homepage (`D4Home`) and coffee product page (`D4Product`). The real design lives here; `d4-home.html`/`d4-product.html` are thin bootstrappers that mount the JSX via in-browser Babel.
- `subscriptions-v3.jsx` — the chosen subscription landing page (`D4SubscriptionsV3`), already wired to live Recharge selling plans + Shopify variant IDs.
- `shared.jsx` — shared primitives: `Nav`, `StdFooter`, `Btn`, `Eyebrow`, `CircleSticker` (the rotating tasting-note disc), `BT`/`better-together` animated wordmark, and the **`ROASTS` data array** (the real spring-2026 lineup).
- `tokens.css` / `fonts.css` — the design system: navy `#05414F` + cream `#F4F1ED`, per-roast secondary colors, P22 Mackinac (serif) + Garnett (sans), modest type scale, all-lowercase convention.
- `styles.css`, `styles-4.css`, `styles-subscriptions.css` — the actual D4 + subscription CSS we'll port.
- `bundle/.../chats/` — transcripts confirming D4 = "D1 content simplicity + D3 warm palette + tilted/drop-shadow photo treatment."

### 2.2 What's clear

- **Brand voice & system:** all-lowercase everything (including proper nouns — "by yeisson vargas", "inza, cauca, colombia"); serif headlines with an italic accent phrase (the `<em>` in every headline, in a warmer accent color); sans for furniture/eyebrows; uppercase only on eyebrows.
- **Signature visual treatments (these are the brand, not decoration):**
  - **Tilted photos with drop shadows** — images treated as physical objects, slightly rotated.
  - **Circular tasting-note sticker** (`CircleSticker`) — coral disc with tasting notes wrapping the circumference, gently wobbling. Appears on hero and PDP.
  - **"Better together" animated wordmark** (`better-together.js`) — generative SVG that morphs a phrase through wave/arch/smile/boomerang forms. Used near the email signup and footer.
  - **Product cards with hover swap** — default shows the packaging "shot" (transparent PNG on a roast-tinted panel); on hover reveals a lifestyle photo. Inline grind selector + "add to bag — $price".
  - **Roast-tinted color panels** — each roast carries its own secondary color used as the card/lead background tint.
- **Homepage section order (D4Home):** hero (seasonal release) → release/event strip → story ("why us") → lineup grid (3 shown + "shop all") → subscription pitch (navy, with a pre-filled sub card) → reviews (3 cards) → wholesale + pop-up duo tiles → email signup (with better-together) → footer.
- **Coffee PDP order (D4Product):** breadcrumb → gallery (roast-tinted lead with shot + sticker, plus tilted lifestyle tiles) → info (eyebrow, headline, origin line, pitch, tasting-notes row, grind swatches, size swatches, purchase card with one-time/subscribe toggle + frequency + price) → tasting profile → grower (sage flood, tilted farm photos, facts grid) → related (3 cards) → footer.
- **Subscription page order (v3):** stripped landing nav (logo only) → picker section (headline "30% off first order", a compact grind/size/frequency "select" strip, then 4 roast cards each with its own "start subscription" CTA) → reviews → FAQ → stripped landing footer.
- **The lineup data is real:** flagship, dark, decaf, wildflower, el proceso, la cristalina, la colina, lovebird (limited). El Proceso is the current featured release with full origin/producer content.

### 2.3 What's ambiguous / open (flagging, not guessing)

1. **No collection ("shop all") mockup exists.** The brief asks for a "collection page with shop hero above the grid," but there's no D4 collection design. I'll need to compose it from existing parts (a hero band reusing hero styles + the product-card grid). **Need your sign-off on that composition** (§11 Q1).
2. **No content/landing template mockup.** The "generic content/landing page for QR campaigns" has no design. I'll build a flexible section-driven template from the same component vocabulary. **Need confirmation of what a QR landing typically needs** (§11 Q2).
3. **No cart, account, search, or 404 mockups.** Brief says "functional but not heavily designed." I'll reskin Dawn's defaults with brand tokens (fonts/colors/lowercase) and leave structure as Dawn ships it. Confirm that's acceptable.
4. **Subscription page vs. PDP subscribe — two different mechanisms.** The subscription landing (v3) uses **Recharge cart permalinks with hard-coded variant + selling-plan IDs**; the PDP purchase card shows a one-time/subscribe toggle that should use **native Shopify selling plans**. We need to decide whether the PDP uses the same permalink approach or native selling-plan add-to-cart (§7, §11 Q5).
5. **`better-together.js` is a custom canvas/SVG animation.** It's lightweight but it's bespoke JS. Confirm we keep it (it's a brand signature) — I'd keep it but lazy-load it and respect `prefers-reduced-motion` (§12).
6. **Decaf vs. lineup mismatch.** `ROASTS` (homepage) lists `lovebird` and omits `decaf`; the subscription page lists `decaf` and omits some single-origins. The lineup is clearly **seasonal and editor-managed** — which is exactly why this should be collection/metaobject-driven, not hard-coded. Confirms the architecture direction.
7. **Reviews are hard-coded quotes in the mockup.** Decide: editor-managed blocks (simple, no integration) vs. a reviews app (Judge.me/Okendo/Loox) pulling real reviews (§11 Q4). The mockups imply curated quotes, so blocks are the pragmatic default.
8. **"el proceso" headline uses a manual `<br/>` line break** ("a honey-/processed/*red bourbon*."). Editors can't easily hand-place line breaks in a text field. I'll expose headline as rich text or provide a "highlight phrase" field rather than baking breaks (§9).
9. **Fonts are licensed (P22 Mackinac, Garnett).** The GHL export swapped to Google Fonts. For the real theme we should **self-host the licensed `.otf`/`.ttf` files** (present in `fonts/`) as theme assets — confirm we have web-embedding rights for both (§11 Q6, §12).

### 2.4 Questions I'd want answered before building (consolidated in §11)

See §11. The blocking ones: store handle + my access (Q0), collection/landing/account scope (Q1–Q3), PDP subscribe mechanism (Q5), font licensing (Q6).

---

## 3. Dawn fork strategy (keeping the upgrade path sane)

**Goal:** customize heavily while still being able to absorb Shopify's Dawn updates without a painful rewrite.

### 3.1 The core principle: *add, don't edit*

Dawn updates touch Dawn's own files. Every Dawn file we modify is a future merge conflict. So:

- **New, namespaced files wherever possible.** Custom sections/snippets get a `stoble-` prefix: `sections/stoble-hero.liquid`, `sections/stoble-featured-release.liquid`, `snippets/stoble-coffee-card.liquid`. These never conflict with upstream because Dawn will never ship a file by that name.
- **Styling is Tailwind-first.** Brand tokens (navy/cream/roast colors, type scale, radii, shadows, motion) are ported from `tokens.css` into `tailwind.config.js → theme.extend`, so utilities read as `twcss-bg-cream`, `twcss-text-navy`, `twcss-rounded-card`, etc. The Tailwind CLI compiles `assets/app-tailwind.css` → `assets/app.css` (already wired by the starter). We control precedence by ordering `app.css` after Dawn's `base.css` in `layout/theme.liquid` (the starter exposes this) so our utilities win where needed. We avoid editing `base.css` directly.
  - **Tokens still get mirrored as CSS custom properties** in one `assets/stoble-tokens.css` (direct port of `tokens.css`) — Tailwind handles layout/spacing/color utilities, but the bespoke SVG/canvas signatures (`CircleSticker`, `better-together`, tilted-photo shadows) reference the vars directly.
  - **Per-section bespoke CSS** that doesn't map to utilities lives in scoped `{% stylesheet %}` blocks inside each `stoble-*` section file.
- **Settings additions** go at the end of `config/settings_schema.json` in a clearly marked "Stoble" group. Reordering/editing existing Dawn settings = conflicts, so we append.
- **Touch Dawn's own sections only when unavoidable** (e.g. `header.liquid`, `footer.liquid`, `theme.liquid` for font loading + global CSS include). Keep these edits **small and well-commented** (`{% comment %} STOBLE: ... {% endcomment %}`) so conflicts are trivial to resolve.

### 3.2 Upstream tracking

As set up in §1.4: `upstream = Shopify/dawn`. To take a Dawn update:

```bash
git fetch upstream
git checkout -b chore/dawn-upgrade-YYYY-MM
git merge upstream/main
# resolve conflicts — should be confined to the handful of Dawn files we touched
shopify theme push --unpublished --theme "Dawn upgrade QA"
# QA, then merge to main
```

Because 90%+ of our work is in `stoble-*` files, conflicts cluster in the 3–4 Dawn files we deliberately edit. Realistic and maintainable.

### 3.3 What we keep from Dawn as-is

- Cart drawer/page logic, predictive search, localization, the JS component primitives (`global.js`, custom elements like `<product-form>`, `<cart-items>`, `<modal-dialog>`), accessibility scaffolding, image `srcset`/lazy-load helpers, `theme-check` config. Reusing these is how we hit the performance targets cheaply (§performance).

### 3.4 Where the theme repo should live (decision needed)

**Recommendation: a new, separate git repo** (`stoble-theme`), *not* a subfolder of this design-explorations repo. Reasons: it's a Dawn fork with Dawn's full history as upstream; mixing it with the Vite/React explorations would muddy both. This `design explorations` repo stays the design source of truth and reference; the theme repo is the build. We can keep this `PLAN.md` here and copy it into the theme repo's `/docs`.

> Note on content vs. code: section *settings* and metaobject *values* live in the store database, not git. `config/settings_data.json` and `templates/*.json` we treat as code (they define defaults/structure) but expect editors to diverge from them in the live store. We periodically `theme pull` those to capture editor changes, and we're disciplined about not clobbering them on push.

---

## 4. Section inventory

Legend: **NEW** = net-new custom section · **MOD** = modification/reskin of a Dawn default · **KEEP** = Dawn default used essentially as-is.

All sections below are designed to be **dragged, reordered, duplicated, hidden, and configured** in the theme editor. Every text/image/link is a setting or block — nothing hard-coded.

| # | Section (file) | Type | Where used | Settings & blocks |
|---|---|---|---|---|
| 1 | **`stoble-hero`** | NEW | homepage, collection, landing | Settings: eyebrow text, headline (rich text w/ highlight phrase), body, CTA label, **CTA target (link OR Coffee Release metaobject reference OR product)**, background image, image overlay meta (vol. label + status e.g. "shipping now"), color scheme (navy/cream/roast-tint), text alignment. |
| 2 | **`stoble-release-strip`** | NEW | homepage | Toggle on/off, message rich text (with dot indicator), link label + url. This is the events/shipping bar under the hero. |
| 3 | **`stoble-featured-release`** | NEW | homepage | **Coffee Release metaobject reference** (the core editor control — pick a release and the whole section populates: name, origin, notes, hero image, sticker notes, linked product). Plus override fields (eyebrow, CTA label) and color scheme. |
| 4 | **`stoble-story`** | NEW | homepage, landing | Eyebrow, headline (rich text), body blocks (repeatable paragraph blocks), **stat blocks** (number + label, repeatable), CTA blocks (label + link, repeatable), two image pickers (the tilted photo pair), color scheme (clay flood). |
| 5 | **`stoble-coffee-grid`** | NEW | homepage, collection | Header (eyebrow/headline/body), **collection picker** (which collection feeds the grid) OR manual product blocks, products-to-show count, "shop all" CTA. Renders `stoble-coffee-card` snippet with hover swap + inline grind + add-to-bag. |
| 6 | **`stoble-subscription-pitch`** | NEW | homepage | Eyebrow, headline (rich text), body, primary CTA (→ subscriptions page), fine print. **Pre-filled sub-card block:** roast label, size, grind, frequency options (pill blocks), price + discount text, CTA. Color scheme (navy). |
| 7 | **`stoble-reviews`** | NEW | homepage, subscriptions | Header. **Review blocks** (repeatable): quote, name, sub-label (e.g. "subscriber · 2 years"), optional avatar image, star count. (Default: editor-managed blocks. Optional future: reviews-app source — see §11 Q4.) |
| 8 | **`stoble-duo-tiles`** | NEW | homepage | 2 (or N) **tile blocks**: background image, eyebrow, headline (rich text), body, CTA label + link, overlay tint. Used for wholesale + pop-up. |
| 9 | **`stoble-email-signup`** | NEW | homepage, footer-area, landing | Eyebrow, headline (rich text), body, **Klaviyo list/form selector** (form ID or list ID as setting), placeholder text, button label, success message, toggle for the "better together" animated wordmark + its color. (Klaviyo wiring §8.) |
| 10 | **`stoble-coffee-pdp-gallery`** | NEW | coffee product template | Pulls from product + linked Coffee Release metaobject: roast-tint color, lead "shot" image, **tasting-note sticker** (notes from metaobject), tilted lifestyle tiles (from metaobject lifestyle images, with fallback to product media). |
| 11 | **`stoble-coffee-pdp-info`** | NEW | coffee product template | Eyebrow, headline (product title + producer accent), origin line (from metaobject), pitch, tasting-notes row, **grind selector** (maps to variant option), **size selector** (maps to variant option), **purchase card** (one-time/subscribe toggle, frequency pills, price, add-to-bag) — see §7. Ships-fine text. |
| 12 | **`stoble-tasting-profile`** | NEW | coffee product template | Eyebrow, headline (rich text), body, **note-pill blocks**, **spec blocks** (label + value, e.g. acidity/body/sweetness/finish). Pulls defaults from metaobject, editor-overridable. |
| 13 | **`stoble-producer-spotlight`** | NEW | coffee product template, homepage | **Producer metaobject reference** (or Coffee Release → producer). Kicker, headline (rich text), story paragraphs, **facts grid blocks** (farm/region/elevation/varietal/process/green price), tilted photo pair, color scheme (sage flood). |
| 14 | **`stoble-related`** | NEW | coffee product template | Header, source (Shopify product recommendations OR manual product blocks OR collection), count. Renders coffee cards. |
| 15 | **`stoble-faq`** | NEW | subscriptions, landing, pages | Header, **FAQ blocks** (question + answer rich text). |
| 16 | **`stoble-subscription-picker`** | NEW | subscriptions template | The v3 picker: header (with "30% off" highlight), **grind/size/frequency "select" strip** (option blocks with badges), **roast cards** (blocks: name, sub, blurb, tasting notes, shot image OR image grid, roast color, price, selling-plan/variant mapping). Recharge wiring §7. Fine print. |
| 17 | **`stoble-announcement-bar`** | MOD | global (header group) | Reskin Dawn's announcement bar: toggle, message blocks (rotating), link, color scheme, **free-shipping callout** variant. Brand fonts/lowercase. |
| 18 | **`header` / `stoble-header`** | MOD | global | Reskin Dawn header to match `Nav`: wordmark logo (navy), lowercase menu, search/account/cart icons, cart pip. Keep Dawn's menu + cart-drawer logic; restyle only. |
| 19 | **`footer` / `stoble-footer`** | MOD | global | Reskin Dawn footer to `StdFooter`: wordmark, address block, social icons, 4 link columns (Dawn menu blocks), the **"better together" wave wordmark**, legal row. Optionally an inline Klaviyo signup block. |
| 20 | **`stoble-rich-text` / `stoble-editorial`** | NEW | pages, landing | General-purpose long-form block stack (headline, rich text, image, pull-quote, CTA) for story/editorial content and QR landings. |
| 21 | **`main-product` (coffee)** | MOD | non-coffee products | For merch/gift cards keep Dawn's `main-product` mostly as-is, reskinned. Coffee products use the custom PDP sections (10–14). |
| — | **Cart / search / 404 / account** | KEEP+reskin | respective templates | Dawn defaults, restyled with brand tokens. No structural changes. |

**Net-new count:** ~16 custom sections + 1 shared card snippet + the `better-together` script asset. **Modified Dawn sections:** header, footer, announcement bar, main-product. Everything else from Dawn is kept.

---

## 5. Metaobject schemas

Two metaobject definitions. We create these in Shopify admin together once you approve the schema (out of scope to create now). Field types use Shopify's metaobject field type names.

### 5.1 `coffee_release` — **Coffee Release**

The single source of truth for a coffee's editorial content. Powers the PDP, the homepage featured-release section, and release pages.

| Field key | Label | Type | Required | Notes / example |
|---|---|---|---|---|
| `release_name` | release name | Single line text | ✅ | "el proceso" |
| `vol_label` | volume label | Single line text | — | "vol. 04" |
| `linked_product` | linked product | Product reference | ✅ | The Shopify product this release sells. Drives PDP + price. |
| `producer` | producer | Metaobject reference → `producer` | — | Reuse across releases by the same grower. |
| `origin_country` | origin country | Single line text | — | "colombia" |
| `region` | region | Single line text | — | "inza, cauca" |
| `varietal` | varietal | Single line text | — | "red bourbon" |
| `process` | process | Single line text | — | "honey · 12-day" |
| `elevation` | elevation | Single line text | — | "1,750–1,900 m" (text, because of the en-dash range) |
| `green_price` | green price (fob) | Single line text | — | "$5.85 / lb fob" — transparency stat |
| `short_pitch` | short pitch | Multi-line text | — | The one-liner under the headline. |
| `tasting_notes` | tasting notes | List · Single line text | — | ["raspberry","summer melon","baby's breath"] — feeds the sticker + pills. |
| `tasting_profile` | tasting profile (long) | Rich text | — | Paragraph for the tasting section. |
| `acidity` | acidity | Single line text | — | "bright, juicy" |
| `body` | body | Single line text | — | "silky, light" |
| `sweetness` | sweetness | Single line text | — | "honeyed" |
| `finish` | finish | Single line text | — | "long, floral" |
| `accent_color` | accent / roast color | Color | — | The roast tint (e.g. `#2B5BD7`). Falls back to a default if empty. |
| `hero_image` | hero image | File reference (image) | — | Lifestyle/landscape hero. |
| `shot_image` | packaging shot | File reference (image) | — | Transparent PNG of the bag. |
| `lifestyle_images` | lifestyle images | List · File reference (image) | — | The tilted gallery tiles. |
| `status` | status | Single line text (list: active/archived/coming-soon) | — | Lets editors stage a release. |
| `shipping_status` | shipping status | Single line text | — | "shipping now" overlay chip. |
| `release_date` | release date | Date | — | For sorting/"new arrival" logic. |

**Why a metaobject and not just product metafields?** Releases are referenced from multiple places (homepage hero, featured section, PDP, future release archive) and a release ≈ a product but with richer editorial framing. A metaobject gives one editable record reused everywhere — change it once, it updates the PDP *and* the homepage. (If you'd rather keep everything on the product, we can mirror these as product metafields instead — see §11 Q7. My recommendation is the metaobject.)

### 5.2 `producer` — **Producer** (recommended, for reuse)

Worth having: producers recur (a grower may have multiple lots/releases over seasons), and the grower spotlight is a brand pillar.

| Field key | Label | Type | Required | Notes / example |
|---|---|---|---|---|
| `name` | name | Single line text | ✅ | "yeisson vargas" |
| `farm_name` | farm | Single line text | — | "vargas family" |
| `region` | region | Single line text | — | "inza, cauca" |
| `country` | country | Single line text | — | "colombia" |
| `bio` | story | Rich text | — | The multi-paragraph grower story. |
| `portrait_image` | portrait | File reference (image) | — | |
| `farm_images` | farm images | List · File reference (image) | — | The tilted farm photo pair. |
| `partner_since` | partner since | Single line text or Date | — | For "14 producer partners" type stats. |

Required: `name`. Everything else optional so editors can publish progressively.

### 5.3 Editor workflow these enable

- Monthly featured coffee swap = **edit one `coffee_release` record** (or point the homepage hero/featured section at a different release). No code, no developer.
- New producer = add a `producer` record once, reference it from every release they grow.

---

## 6. Template plan

OS 2.0 JSON templates so everything is section-driven and editable. Liquid templates only where logic demands it.

| Template | Action | Notes |
|---|---|---|
| `templates/index.json` | **NEW (JSON)** | Homepage. Composed entirely of the custom sections in order: announcement → hero → release-strip → story → coffee-grid → subscription-pitch → reviews → duo-tiles → email-signup. Fully reorderable. |
| `templates/product.coffee.json` | **NEW (JSON)** | Coffee PDP. Sections: pdp-gallery → pdp-info → tasting-profile → producer-spotlight → related. Assigned to coffee products via the product's **template suffix** (`coffee`). |
| `templates/product.json` | **KEEP/MOD** | Default Dawn product template for merch, gift cards, the subscription "product." Reskinned only. |
| `templates/collection.json` | **NEW (JSON)** | Shop. `stoble-hero` (shop hero) above `stoble-coffee-grid` (or Dawn's `main-collection-product-grid` reskinned with our card). Confirm composition (§11 Q1). |
| `templates/page.json` | **KEEP/MOD** | Default page — reskinned Dawn `main-page`. |
| `templates/page.landing.json` | **NEW (JSON)** | QR/campaign landing. Section-driven from the flexible vocabulary (hero, editorial, duo-tiles, email-signup, faq, reviews). Editors build campaign pages by adding sections (§9). |
| `templates/page.subscriptions.json` | **NEW (JSON)** | Subscription landing. `stoble-subscription-picker` + `stoble-reviews` + `stoble-faq`. (Could also be a collection/product template — see §7/§11 Q5.) |
| `templates/page.contact.json` | KEEP/MOD | Dawn contact, reskinned. |
| `templates/cart.json` | KEEP/reskin | Dawn cart, brand tokens only. |
| `templates/search.json` | KEEP/reskin | Dawn search, brand tokens only. |
| `templates/404.json` | KEEP/reskin | Dawn 404, brand-styled, friendly lowercase copy + a link back to shop. |
| `templates/customers/*` | KEEP/reskin | Account/login/register/order — Dawn defaults, brand tokens. Functional, light design. |
| `templates/blog.json`, `article.json` | KEEP/MOD | "The Journal" — Dawn blog reskinned (nav references a journal). Confirm if in scope. |

**Coffee vs. non-coffee products:** we set a **template suffix** of `coffee` on coffee products (bulk-editable in admin or via metafield-based logic) so they render `product.coffee.json`; everything else falls back to `product.json`. This keeps the rich PDP scoped to coffee without forcing it on merch/gift cards.

---

## 7. Recharge integration approach

**Current reality (from `subscriptions-v3.jsx`):** Recharge is already live on the store. We have real **selling-plan IDs** per frequency and **variant IDs** per roast/grind/size:

```
selling plans:  1w → 1392672829 · 2w → 1352990781 · 4w → 1353023549 · 6w → 1353056317
discount code:  coffee-club-30  (must allow Subscription purchase types)
```

This tells us Recharge is configured with **Shopify-native selling plans** (the modern "Recharge on Shopify Checkout" model), which is the good case — subscriptions flow through Shopify's own checkout via `selling_plan` line-item properties.

### 7.1 PDP subscribe (recommended approach)

Use **native Shopify selling plans**, not hard-coded permalinks, on the coffee PDP:

- The custom `stoble-coffee-pdp-info` purchase card reads `product.selling_plan_groups` in Liquid and renders the one-time/subscribe toggle + frequency pills from that data (so if Recharge plans change in admin, the UI updates with zero code changes).
- "Add to bag" submits to `/cart/add` with the chosen `id` (variant) and, if "subscribe" is selected, the matching `selling_plan` id — standard Dawn `<product-form>` mechanics. Dawn already supports selling plans; we restyle the UI to match the mockup.
- Grind/size selectors map to the product's variant options; the frequency pills map to selling-plan allocations.

**Fallback if Recharge/selling plans aren't present** (e.g. plan group removed, app paused): the card detects an empty `selling_plan_groups` and renders **one-time purchase only** — no broken subscribe toggle. Graceful degradation, no JS errors.

### 7.2 Subscription landing page

Keep the **proven v3 flow**: each roast card builds a Shopify cart permalink with the variant + selling-plan + discount, handing off to checkout. But move the hard-coded IDs out of code:

- Variant/selling-plan IDs become **section/block settings** (or read live from product JSON), so editors/admins can update them without a developer when the subscription product is rebuilt.
- Better still where feasible: drive the picker from the actual subscription product's variants + `selling_plan_groups` so IDs are never hand-maintained. (The permalink approach stays as the checkout mechanism since it pre-applies the discount cleanly.)
- The `coffee-club-30` discount + the double-encoding quirk documented in `subscriptions-v3.jsx` are preserved as-is (that logic is hard-won — we port it verbatim and comment it).

### 7.3 Settings needed

- `recharge_subscription_product` (product picker) — the subscription product.
- `recharge_discount_code` (text) — first-order discount.
- Optional per-frequency selling-plan ID overrides (text) — only if we can't read them live.

### 7.4 Widget vs. custom

I recommend **our custom selling-plan UI** over Recharge's drop-in widget: the mockup's purchase card and picker are bespoke and the native selling-plan data is already available. Recharge's injected widget would fight our styling and add JS weight. We only fall back to Recharge's hosted widget if we discover the store uses Recharge's *legacy* checkout (not selling-plan based) — to be confirmed (§11 Q5).

---

## 8. Klaviyo integration approach

Klaviyo is **new** (the current GHL build uses Meta Pixel; email is moving to Klaviyo).

### 8.1 Strategy

- **Load `klaviyo.js` (Onsite) once, globally**, gated behind a theme setting holding the **Klaviyo public API key (company ID)** — public by design, safe in the browser. Loaded `defer`/async so it doesn't block render.
- **Signup forms — two paths, recommend native Klaviyo embeds:**
  1. **Klaviyo-hosted embedded forms** (by **form ID**): editors build/style the form in Klaviyo, we drop the embed div where the `stoble-email-signup` section renders. Form IDs are **section settings** so footer vs. inline vs. landing can use different forms. Pro: editors manage forms in Klaviyo, no redeploys. Con: slightly less control over markup.
  2. **Custom-styled form posting to Klaviyo's client API** (subscribe endpoint) with **list ID** as a setting. Pro: pixel-perfect to the mockup's email form. Con: we own the markup + success/error states.
- **Recommendation:** use the **custom-styled form** for the homepage/footer signup (to match the mockup exactly, including the "better together" treatment), posting to Klaviyo with the **list ID as a theme/section setting**. Use **hosted embeds** for any popup/flyout campaigns editors want to run themselves.
- **List IDs / form IDs as settings, never hard-coded** — so editors can repoint lists per campaign and we never redeploy for a list change.
- **Events:** rely on the official **Klaviyo ↔ Shopify integration** for viewed-product / added-to-cart / placed-order events (configured in Klaviyo, not the theme). The theme only needs the onsite script + identify call. This keeps the theme thin.
- **Back-in-stock:** Klaviyo's back-in-stock can be added on PDP later via their snippet if wanted (out of scope for v1 unless requested).

### 8.2 Settings needed

- `klaviyo_public_key` (text) — company/public API key.
- `klaviyo_newsletter_list_id` (text) — default newsletter list.
- Per-section `klaviyo_form_id` / `klaviyo_list_id` overrides (text).

---

## 9. Editor experience notes

One line per major section on how a non-technical editor (Sadie/Al) updates it. This is the litmus test for the whole architecture.

- **Hero:** *Theme editor → Home → Hero → swap the image, edit the headline, and pick which release/product the button links to.* Monthly swap = one section, ~2 minutes.
- **Featured release:** *Pick a different Coffee Release from a dropdown — the whole section repopulates (image, notes, origin, link).* No retyping content that already lives on the release.
- **Release strip / announcement bar:** *Toggle on/off and edit the message + link. Use it for events or free-shipping callouts.*
- **Story:** *Edit the headline and paragraphs as rich text; update the two photos; edit the stat numbers as blocks.*
- **Coffee grid:** *Choose which collection feeds the grid (or hand-pick products); set how many show.* Seasonal lineup changes happen by editing the collection, not the theme.
- **Subscription pitch:** *Edit the copy and the pre-filled sample card (roast/size/grind/frequency labels) as fields; the button points at the subscriptions page.*
- **Reviews:** *Add/remove/reorder review blocks; each is quote + name + sub-label + optional photo + stars.*
- **Duo tiles (wholesale/pop-up):** *Each tile is a block: image, headline, copy, button. Add a third tile by duplicating a block.*
- **Email signup:** *Pick the Klaviyo list/form; edit the headline and button label; toggle the animated wordmark.*
- **Coffee PDP:** *Almost everything comes from the linked Coffee Release metaobject — edit the release record once and the PDP, homepage hero, and any release page all update.* Grind/size come from Shopify variants; subscribe options from Recharge plans.
- **Producer spotlight:** *Pick a Producer record; story and facts populate automatically.*
- **Subscription picker:** *Edit roast cards as blocks (name, blurb, notes, image, price); the grind/size/frequency options are blocks with "most popular" badges.*
- **Footer:** *Edit the address, social links, and the four link columns (standard Shopify menus); optionally an inline signup.*
- **QR landing pages:** *Create a new page, choose the "landing" template, then add/stack sections (hero, editorial, tiles, signup) like building blocks.*

**Headline line-breaks & highlight phrase:** rather than asking editors to place `<br>` tags, headline fields are **rich text** (they can bold/italicize the accent phrase) and/or expose a separate "highlight phrase" field that we render in the warm accent color + serif italic. This preserves the signature look without technical fiddling.

**All-lowercase brand convention — recommendation:** **enforce via CSS** (`text-transform: lowercase`) on brand heading/eyebrow/nav classes, exposed as a single **theme setting toggle** ("force lowercase styling," default on). Rationale: editors type naturally (good for SEO, screen readers, and proper nouns in source), while the rendered site stays on-brand automatically. The eyebrow class is the one intentional `text-transform: uppercase`. We do **not** rely on editor discipline alone — too fragile across two non-technical editors. (Edge cases like acronyms are absent from this brand, so lowercase-everything is safe here.)

---

## 10. Build order & rough effort estimates

Estimates assume one developer, in ideal-ish days. Sequenced so we always have something previewable.

### Phase 0 — Setup & foundation (~1.5–2 days)
1. Pin Node 22, install CLI, authenticate, fork Dawn, set up upstream + repo (§1, §3). *(0.5d)*
2. Port the design system: `stoble-tokens.css` (from `tokens.css`), self-host fonts as assets, font-face declarations, global `stoble.css`, lowercase enforcement toggle, color-scheme setup. *(0.5–1d)*
3. Reskin header + footer + announcement bar (sections 17–19). *(0.5d)*

### Phase 1 — Metaobjects & data (~1 day)
4. Create `coffee_release` + `producer` metaobject definitions together (after schema approval). Populate El Proceso + Vargas as the reference record. *(0.5d)*
5. Set coffee products' `coffee` template suffix; map variant options (grind/size). *(0.5d)*

### Phase 2 — Homepage (~3–4 days)
6. `stoble-hero`, `stoble-release-strip`. *(0.75d)*
7. `stoble-featured-release` (metaobject-driven) + `stoble-coffee-card` snippet (hover swap, inline grind, add-to-bag). *(1d)*
8. `stoble-story`, `stoble-coffee-grid`, `stoble-subscription-pitch`. *(1d)*
9. `stoble-reviews`, `stoble-duo-tiles`, `stoble-email-signup` (+ `better-together` asset, lazy-loaded). *(0.75d)*
10. Assemble `templates/index.json`, wire defaults. *(0.5d)*

### Phase 3 — Coffee PDP (~3 days)
11. `stoble-coffee-pdp-gallery` (sticker, tilted tiles, roast tint). *(1d)*
12. `stoble-coffee-pdp-info` (selectors + purchase card + native selling plans, §7). *(1d)*
13. `stoble-tasting-profile`, `stoble-producer-spotlight`, `stoble-related`; assemble `product.coffee.json`. *(1d)*

### Phase 4 — Collection, subscriptions, landing (~2.5–3 days)
14. `templates/collection.json` (shop hero + grid). *(0.5d)*
15. `stoble-subscription-picker` + Recharge wiring (§7) + `page.subscriptions.json`. *(1.5d)*
16. `stoble-faq`, `stoble-editorial`, `page.landing.json`. *(0.5–1d)*

### Phase 5 — Integrations (~1.5 days)
17. Klaviyo (global script + forms + settings, §8). *(0.75d)*
18. UTM/fbclid preservation through cart→checkout; port Meta pixel custom events if retained. *(0.5–0.75d)*

### Phase 6 — Cart/account/search/404 reskin + polish (~2 days)
19. Reskin Dawn cart/search/404/customer templates with brand tokens. *(0.75d)*
20. Responsive QA, accessibility pass, `prefers-reduced-motion`, performance tuning to hit Lighthouse targets. *(1.25d)*

**Rough total: ~14–17 dev-days** for a polished v1, excluding content entry and review cycles. Phases 2–3 are the bulk; 0–1 unblock everything and should go first.

---

## 11. Open questions (please decide before coding)

- **Q0 — Access:** What's the store's `*.myshopify.com` handle, and can you grant me staff access with the "Themes" permission (or Partner collaborator access)?
- **Q1 — Collection page:** No collection mockup exists. OK for me to compose it as `stoble-hero` (shop hero) + `stoble-coffee-grid`? Any filtering/sorting requirements?
- **Q2 — QR landing pages:** What does a typical QR campaign landing need? (Single offer + signup? Event info? A specific product?) This shapes the `page.landing` section set.
- **Q3 — Cart/account/search/404:** Confirm "reskin Dawn defaults, don't redesign" is acceptable for these.
- **Q4 — Reviews:** Editor-managed quote blocks (my default), or integrate a reviews app (Judge.me / Okendo / Loox) for real, syncing reviews? Is one already installed?
- **Q5 — Subscription mechanism:** Is Recharge on the **modern Shopify-native selling-plan checkout** (what the IDs suggest) or **legacy Recharge checkout**? This decides native selling-plan PDP vs. Recharge widget. Should the PDP subscribe and the subscription landing use the same mechanism?
- **Q6 — Fonts:** Do we have web-embedding licenses for **P22 Mackinac** and **Garnett** to self-host on the storefront? (The GHL export fell back to Google Fonts, which suggests this may be unresolved.)
- **Q7 — Content modeling:** Confirm the **metaobject** approach for Coffee Release (my recommendation) vs. product metafields only.
- **Q8 — Journal/blog:** Is "the journal" (blog) in scope for this build, or later? Nav references it.
- **Q9 — Merch / gift cards / wholesale:** Are there non-coffee products needing templates now? Is wholesale a Shopify page/form, an app, or external?
- **Q10 — Analytics:** Keep the Meta Pixel custom events from the GHL build, or is tracking moving fully to Shopify + Klaviyo? Any GA4?
- **Q11 — Domain/launch:** This is currently a GoHighLevel-hosted funnel + a separate Shopify store. Is this theme replacing the *entire* `stoblecoffee.com` storefront, and what's the cutover plan?

---

## 12. Risks & tradeoffs

1. **Signature visual treatments vs. Dawn's conventions.** The tilted/drop-shadow photos, wobbling tasting-note sticker, and morphing "better together" wordmark are bespoke and not Dawn-native. *Resolution:* build them as self-contained sections/snippets with scoped CSS + a small lazy-loaded JS asset; respect `prefers-reduced-motion` (disable the wobble/morph animations). Risk is low but it's custom surface area to maintain across Dawn upgrades — mitigated by the *add-don't-edit* discipline (§3).

2. **`CircleSticker` auto-fit logic is React + runtime measurement.** In Liquid we either (a) render the SVG `textPath` with a sensible fixed `textLength` per notes count, or (b) port the measure-and-fit as a tiny vanilla-JS custom element. *Resolution:* prefer a CSS/SVG-only approximation with a JS enhancement; avoid shipping React. Keeps JS weight near-zero (performance target).

3. **`better-together.js` JS weight.** It's a brand signature but it's animation JS. *Resolution:* lazy-load on intersection, gate on reduced-motion, and consider a static PNG fallback (the `brand/bt-*.png` assets already exist) for first paint / low-power devices.

4. **Recharge permalink fragility.** The subscription landing depends on hard-coded variant + selling-plan IDs and a double-encoded discount permalink. If the subscription product is rebuilt, those break silently. *Resolution:* move IDs to settings or read them live from product JSON; add a build-time/Theme-Check note; preserve the documented encoding quirk verbatim.

5. **Lowercase enforcement & SEO.** Forcing lowercase via CSS (not in source) is correct for SEO/accessibility, but if any future content genuinely needs caps (a partner brand name), the global rule fights it. *Resolution:* the toggle is global-default-on but we keep a `.allow-caps` utility class for the rare exception.

6. **Font licensing (see Q6).** If we lack web-embed rights for Mackinac/Garnett, the brand look degrades. *Resolution:* confirm licensing now; if blocked, choose the closest licensed alternatives and flag the visual delta before build.

7. **Metaobject ↔ product coupling.** If an editor deletes a `coffee_release` that a homepage section references, the section must fail gracefully. *Resolution:* every metaobject-driven section has empty-state handling (hide cleanly or show a placeholder in the editor only).

8. **Performance targets (Lighthouse 80+ mobile, LCP < 2.5s).** Achievable on Dawn, but at risk from: large hero images, the custom JS, and webfont loading. *Resolution:* Shopify `image_url`/`image_tag` with responsive `srcset` + `loading="lazy"` below the fold; `fetchpriority="high"` + preload on the LCP hero image; `font-display: swap` + preload the two most-used font cuts; defer all non-critical JS; keep custom CSS lean and section-scoped. Budget a dedicated tuning pass (Phase 6).

9. **Two editors, shared store.** Concurrent theme-editor changes + our `theme push` can clobber each other. *Resolution:* the push→staging→publish discipline (§1.7), `theme pull` of settings before pushing, and never editing code in admin.

10. **GHL → Shopify cutover.** The live funnel runs on GoHighLevel; this theme is Shopify-native. Migrating funnel traffic, pixels, and any GHL-only automations is a project unto itself (Q11) and out of this theme's scope, but flagged so it isn't a launch-day surprise.

---

## Appendix — key reference files in this repo

- Design: `d4.jsx` (home + PDP), `subscriptions-v3.jsx` (subscription page), `shared.jsx` (Nav/Footer/cards/ROASTS data), `index.html` (concept index, confirms D4).
- System: `tokens.css`, `fonts.css`, `styles.css`, `styles-4.css`, `styles-subscriptions.css`.
- Brand assets: `brand/` (wordmarks, symbols, better-together marks), `fonts/` (Mackinac + Garnett), `photos/`, `products/` (shots + lifestyle).
- Integration reference: `ghl/main-subscriptions-v3.jsx` (asset-map pattern, Recharge/Meta wiring), `subscriptions-v3.jsx` (live Recharge selling-plan + variant IDs, discount permalink logic).
- Intent/history: `bundle/stoble-coffee-website/chats/` (design decisions), `bundle/stoble-coffee-website/README.md`.






