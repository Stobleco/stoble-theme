# Stoble Design System

A folder-based design system for **Stoble Coffee** — a local coffee roastery in Chico, California.

> *"a good cup of coffee, shared better."*

This system contains the colors, type, fonts, logos, voice rules, and component recreations needed to build on-brand assets for Stoble — websites, slide decks, social posts, packaging mocks, and throwaway prototypes alike.

---

## brand context

Stoble is a small-batch coffee roaster founded in Chico, CA in 2019 by Matt Thiede, Matt Johnston, and Lauren Thiede. They operate a café (418 Broadway), a co-working space (**Stoble Workplace**), and an events arm (**Stoble Events**). Their core thesis: third-wave coffee shouldn't be a velvet rope. Coffee is better when shared — with the farmers who grow it, the team that roasts it, the community that drinks it.

**Audience**: regular coffee drinkers being gently invited up the quality curve. Specialty-coffee-curious. Locals, wholesale buyers, online subscribers.

**Voice**: a friend who knows their craft but never name-drops it. Lowercase, warm, "real talk," with quiet humor. Never precious about coffee.

### sources used
This system was built from these materials, supplied by the user:
- **`STO_StyleGuide_V2.pdf`** — the official 34-page brand guide (V1.2, by Perky Bros). Source of truth for colors, type, logo usage, packaging specs, and social templates.
- **Logo set** — `STO_Wordmark`, `STO_S` (symbol), and `STO_BT-*` (Better Together lockups) in four tones each: navy, white, black, light-gray.
- **Brand fonts** — full P22 Mackinac (Pro + standard) and Garnett families, OTF/TTF, all weights + italics + small-caps.
- **Social profiles** — three Instagram avatar PNGs (primary, events, workplace).

No codebase or Figma file was provided. Components in `ui_kits/website/` are an original recreation built from the style guide and the spirit of the brand — pixel-perfect matching of `stoblecoffee.com` is **not** guaranteed.

---

## index

| File / folder | Purpose |
|---|---|
| `README.md` | This file. Brand context + manifest. |
| `SKILL.md` | Skill manifest. Drop this folder into Claude Code as a Skill. |
| `colors_and_type.css` | All design tokens — CSS variables for colors, type, spacing, radius, shadow, motion. |
| `fonts.css` | `@font-face` declarations for P22 Mackinac + Garnett. |
| `fonts/` | The actual font files (20 weights/styles across both families). |
| `assets/` | Logos, symbol marks, Better Together lockups, social avatars. |
| `preview/` | Small HTML cards for each token group — rendered in the Design System tab. |
| `ui_kits/website/` | React/JSX recreation of the Stoble e-commerce website. |

### ui kits
- **`ui_kits/website/`** — homepage with header, hero, roast lineup, story, cafe, subscribe band, footer, and a working cart drawer. Open `index.html` to interact.

---

## visual foundations

### colors
**Primary** is dominated by one color — **Stoble Navy `#05414F`** — set on a warm cream (`#F4F1ED`) rather than stark white. Mid-gray (`#97A3AE`) is a supporting voice, never the lead. The brand explicitly avoids the austere feeling of `#FFFFFF`; default page background is always the cream.

**Roast palette** is a six-color earthy/bright set, one color per roast:
- Flagship `#8096A3` (slate)
- Dark `#556C72` (deep teal-gray)
- Decaf `#8BA099` (dusty sage)
- Africa `#B8A57A` (sun-baked tan)
- South America `#A56F5C` (warm terracotta)
- Central America `#DEBBA8` (pale clay)

Each pairs with a 20–35 % tint of itself for on-color text. The roast colors are tied 90% to their roast — use them when representing that roast, not as decorative accent.

### type
Two families, both **lowercase 90 % of the time**:
- **P22 Mackinac** (serif) → headlines, long-form, anything conversational. Tracking is *tight* (`-0.015em`). Leading is *modest* (`~1.25` × size — never `1.5+`).
- **Garnett** (sans) → subheads, UI furniture, captions, short technical labels. When set inline with Mackinac, Garnett is **90 % the size** of Mackinac to match x-heights.

Sentence case is acceptable for long-form web body where readability beats vibe. **All caps** is reserved for very small eyebrow/label text only — never for headlines.

### spacing & layout
4-px base grid. Generous outer padding (96–120px on slides; 36px gutters on web). Sections breathe — the brand never feels packed. Cards use modest radii (`8–16px`); never pill-rounded except for buttons.

### backgrounds
Three flavors: **cream** (`#F4F1ED` default), **navy** (full-bleed dark sections), or **roast-color flood** (one solid color, used to differentiate roast-specific content). No gradients, no patterns, no busy photography. Imagery — when used — is hand-drawn illustration in navy, or warm/cool café photography with strong contrast.

### animation
Soft and brief. Default duration `220ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)` (out-soft). No bounces, no spring overshoots, no parallax. Arrow icons in buttons translate `3px` right on hover. The "Better Together" lockups beg for motion — the `preview/better-together.html` card includes a generative SVG version that morphs between curve forms.

### hover states
- Primary buttons: darken navy + 1px lift.
- Secondary/ghost: invert (border becomes fill).
- Cards: 3px lift + soft shadow (`var(--shadow-2)`).
- Links: underline appears as a hairline, not a heavy weight.

### press states
Slight translate-back-to-rest. No scale-down — feels too playful for the brand's grounded posture.

### borders & shadows
**Borders** are hairlines (`1px`) in `#DCD6CE` (warm cream-shadow) on cream, or `rgba(244,241,237,0.18)` on navy. Dashed `1px` lines are used on the brand to separate notes/sub-sections in long copy (e.g. tasting-notes blocks).

**Shadows** are minimal — the brand leans on color + space, not depth. Three steps: `0/1/2 → 0/4/12 → 0/12/32`, all tinted with the navy.

### radii
`xs:2 · sm:4 · md:8 · lg:12 · xl:20 · pill:999`. Cards: `lg/xl`. Inputs: `md`. Buttons: `pill`. Labels (mimicking print packaging): `xs/sm`.

### transparency & blur
Used sparingly — only on the sticky header (cream at 92% + 10px blur), and on cart scrim (navy at 30%). No glassmorphism panels.

### imagery vibe
Warm tones, natural light, cream/tan/teal palette. People-first — the brand's posture is human, not equipment-fetish. Hand-drawn illustrations are the brand's distinct visual signature, used as Easter-egg moments on packaging gussets and as spot illustrations for tasting notes. They are mono-line, monochrome navy, lightly textured.

### corner radii on cards
Cards: `16px`. Bag-style "packaging labels" inside cards: `2–4px` to mimic the actual printed label inserts.

---

## content fundamentals

**Casing**: lowercase, always, except (a) uppercase eyebrow/label micro-text and (b) proper nouns where you'd jar the reader otherwise. Brand name "stoble" is always lowercase.

**Voice attributes**: friendly · enthusiastic · "real talk" · sense of humor. The brand's own phrasing from the guide: *"like a good friend who is easily relatable and able to see the glass (or coffee mug) half-full."*

**Pronouns**: "we" (the team) and "you" (the reader). Never the royal "we." Never corporate "the company."

**Punctuation**: commas, em dashes, and ellipses do the work. Periods are used. Sentences can be short.

**Emoji**: not used in the brand. Don't add them. The brand uses Garnett's arrow glyphs (`→ ↓ ↑ ↲`) instead for directional cues.

**Pro tip from the guide**: when handling technical/educational copy (origin, processing, etc.), don't shy from technical terms — pair them with a friendly tone and conversational vocabulary.

### copy examples
| ✅ on-brand | ❌ off-brand |
|---|---|
| *"a daily ritual worth slowing down for."* | "Premium Specialty Coffee Experience." |
| *"we tell you exactly what's in the bag and who grew it."* | "Our coffee is sourced from the world's finest origins." |
| *"psa: we have a new, too-cool-for-us barista — meet margaret jean."* | "Please welcome our newest team member." |
| *"you should ask matt for his pancake recipe, why rock climbing is the best, or about being a co-founder."* (real business-card copy) | "Co-founder. 15+ years industry experience." |
| *"order → stoblecoffee.com/subscribe"* | "Subscribe today!" |

---

## iconography

**The brand does not use a system icon library.** It also doesn't use emoji.

What it DOES use:
1. **Directional arrows from Garnett's glyph panel** — `← ↖ ↑ ↗ → ↘ ↓ ↙ ↱ ↳ ↰ ↲`. These appear next to CTAs, ordering links (`order → stoblecoffee.com/subscribe`), tasting-note labels (`notes ↓`), and elsewhere as a brand tic. **When placing arrows next to words, add an extra space on each side** (style-guide rule).
2. **Hand-drawn spot illustrations** — for tasting notes on the website and packaging gussets. Mono-line in Stoble Navy, lightly textured. *We do not have any of these in this design system* — if you need one, leave a placeholder and ask the user to provide.
3. **The "s" symbol** (`assets/symbol-s-*.png`) — used as favicon and for moments where the full wordmark won't fit. Behaves like an icon in those contexts.
4. **Sparingly-used UI icons** for ecommerce primitives (search, account, cart) — these are 1.8-stroke-weight line icons drawn directly inline in `Header.jsx`. They sit at the same x-height as Garnett's lowercase letters. No icon font.

**If you need additional icons** (e.g. for a dashboard, an admin tool), use **Lucide** at default 1.5-stroke weight in `currentColor: var(--sto-navy)` — its line style harmonizes with Stoble's hand-drawn illustration mark. Document the substitution wherever you use it.

---

## logo & brand asset usage

### lockups
- **Wordmark** (`assets/wordmark-*.png`) — primary mark. Use whenever possible. Always set in Stoble Navy on light backgrounds, or in white/light-gray on dark.
- **Symbol "s"** (`assets/symbol-s-*.png`) — reserved for favicons, small social avatars, and moments where the full wordmark won't render legibly.
- **Better Together** (`assets/bt-*-*.png`) — playful supporting mark. Four variants in the asset folder (wave, boomerang, smile, braid) — the *primary* lockup is the one printed inside coffee bags as a hidden moment. The generative SVG version in `preview/better-together.html` can morph between forms and take any text — use it on the web for animated moments.

### safe area
One "s-height square" of clear space on every side. No graphic elements (including photos) encroaching.

### minimum sizes
Print: `0.75"` wide. Digital: `72px` wide. Below those the mark loses presence.

### don'ts
No rotation. No stretching. No gradient/stroke/shadow effects. No placement on busy photography. No abbreviation or isolation of wordmark pieces (except the `s` symbol).

---

## flagged substitutions

**None.** All brand fonts (P22 Mackinac + Garnett) were supplied and are loading natively from `fonts/`. No Google Font fallbacks are in use. If you remove the fonts folder, the system falls back to Iowan/Cormorant Garamond for serif and Inter/system-ui for sans — both close-but-not-identical metrically. Re-add the font files for production.

If the user needs additional packaging/spot illustrations — those aren't in this kit. Ask for them.

---

## quick reference

| Need | Use |
|---|---|
| Color of the brand | `var(--sto-navy)` `#05414F` |
| Body text font | `var(--font-serif)` — P22 Mackinac, lowercase |
| Furniture / UI labels | `var(--font-sans)` — Garnett, lowercase, often uppercase tracked at `.06em` for eyebrows |
| Page background | `var(--bg)` `#F4F1ED` (cream — not white) |
| Default radius | `var(--r-md)` `8px` cards; `var(--r-pill)` buttons |
| Brand arrow | the unicode `→` (with extra space) — not an SVG |
| The hidden delight inside the coffee bag | the *Better Together* lockup |
