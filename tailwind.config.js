/* ───────────────────────────────────────────────────────────────
   Stoble Coffee — Tailwind theme
   Brand tokens ported from the design-system source (tokens.css).
   Utilities keep the `twcss-` prefix (e.g. twcss-bg-cream,
   twcss-text-navy, twcss-rounded-card, twcss-shadow-2).
   Tokens are mirrored as CSS custom properties in
   assets/stoble-tokens.css for the bespoke SVG / animation work.
   ─────────────────────────────────────────────────────────────── */

module.exports = {
  prefix: 'twcss-',
  content: [
    './layout/*.liquid',
    './templates/*.liquid',
    './templates/customers/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '750px',
      lg: '990px',
      xlg: '1440px',
      x2lg: '1920px',
      pageMaxWidth: '1440px',
    },
    extend: {
      colors: {
        // Primary palette
        navy: '#05414f',
        'mid-gray': '#97a3ae',
        cream: '#f4f1ed',
        'cream-elevated': '#fbfaf7',
        'cream-subtle': '#ece7e0',

        // Semantic ink (text) roles
        ink: '#05414f',
        'ink-muted': '#4e6770',
        'ink-subtle': '#7a8c92',
        'ink-on-dark': '#f4f1ed',
        'ink-on-dark-muted': '#b6c2c6',

        // Hairline border
        hairline: '#dcd6ce',
        'hairline-strong': '#1f4f5a',

        // Secondary palette — one color per roast (use with its named roast)
        roast: {
          flagship: '#8096a3',
          dark: '#556c72',
          decaf: '#8ba099',
          africa: '#b8a57a',
          'south-america': '#a56f5c',
          'central-america': '#debba8',
        },
        // Light text tints to sit on a roast flood of the same name
        'roast-text': {
          flagship: '#c0c8cb',
          dark: '#c9d0d2',
          decaf: '#d5dcda',
          africa: '#e4ded0',
          'south-america': '#ddcbc3',
          'central-america': '#f7f0ed',
        },

        // Status / utility (brand-aligned, not invented)
        positive: '#6e8a6a',
        warning: '#b8a57a',
        negative: '#a56f5c',
      },

      fontFamily: {
        serif: [
          'P22 Mackinac',
          'Cormorant Garamond',
          'Iowan Old Style',
          'Georgia',
          'serif',
        ],
        sans: ['Garnett', 'Inter', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        // keep Dawn-compat alias used by inherited markup
        heading: 'var(--font-heading-family)',
      },

      // Modest brand type scale (size, line-height, tracking)
      fontSize: {
        display: ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h1: ['56px', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        h2: ['40px', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        h3: ['30px', { lineHeight: '1.13', letterSpacing: '-0.015em' }],
        h4: ['22px', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'body-lg': ['18px', { lineHeight: '1.35' }],
        body: ['16px', { lineHeight: '1.25' }],
        'body-sm': ['14.75px', { lineHeight: '1.22' }],
        caption: ['12px', { lineHeight: '1.3' }],
        eyebrow: ['12px', { lineHeight: '1.2', letterSpacing: '0.06em' }],
      },

      letterSpacing: {
        display: '-0.02em',
        heading: '-0.015em',
        caps: '0.06em',
      },

      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
        card: '16px',
        label: '4px',
        pill: '999px',
      },

      boxShadow: {
        1: '0 1px 2px rgba(5, 65, 79, 0.06)',
        2: '0 4px 12px rgba(5, 65, 79, 0.08)',
        3: '0 12px 32px rgba(5, 65, 79, 0.1)',
      },

      maxWidth: {
        'container-sm': '640px',
        'container-md': '960px',
        'container-lg': '1200px',
        'container-xl': '1440px',
      },

      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-soft': 'cubic-bezier(0.55, 0, 0.45, 1)',
        soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        fast: '140ms',
        base: '220ms',
        slow: '360ms',
      },
    },
  },
  plugins: [],
};
