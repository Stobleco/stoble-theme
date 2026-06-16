---
name: stoble-design
description: Use this skill to generate well-branded interfaces and assets for Stoble Coffee — a Chico, CA roastery — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files (`colors_and_type.css`, `fonts.css`, `fonts/`, `assets/`, `ui_kits/website/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Always link `fonts.css` and `colors_and_type.css` at the top of any HTML file you produce — they define the entire token system. Logos and Better Together lockups live in `assets/`.

If working on production code, you can copy assets and read the rules in README.md to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.

## key brand rules (do not violate)
- All copy is **lowercase** unless it's a tiny uppercase eyebrow/label.
- Primary surface is the cream `#F4F1ED`, never stark white.
- The brand color is **Stoble Navy `#05414F`** — use it for nearly all ink.
- Typography: **P22 Mackinac** (serif) for headings + body, **Garnett** (sans) for furniture only.
- Roast colors are tied 1:1 to a specific roast — do not use them as decorative accents.
- No emoji. Use Garnett's arrow glyphs (`→ ↓ ↑ ↲`) for directional UI cues, with extra spacing.
- The "Better Together" lockup is the brand's signature — `preview/better-together.html` has a generative SVG version that animates and takes any text.
