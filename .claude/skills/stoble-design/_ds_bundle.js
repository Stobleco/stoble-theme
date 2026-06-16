/* @ds-bundle: {"format":3,"namespace":"StobleDesignSystem_e96d14","components":[],"sourceHashes":{"ui_kits/website/CartDrawer.jsx":"6df84b7e4434","ui_kits/website/Footer.jsx":"7d5190a033c2","ui_kits/website/Header.jsx":"20369f8c86a4","ui_kits/website/Hero.jsx":"aade3cbd388c","ui_kits/website/Primitives.jsx":"524a9a2ee54e","ui_kits/website/Roasts.jsx":"efc22946ca25","ui_kits/website/Story.jsx":"7a9d8c445e43","ui_kits/website/Subscribe.jsx":"1dd9fa475164"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {
  const __ds_ns = (window.StobleDesignSystem_e96d14 =
    window.StobleDesignSystem_e96d14 || {});

  const __ds_scope = {};

  __ds_ns.__errors = __ds_ns.__errors || [];

  // ui_kits/website/CartDrawer.jsx
  try {
    (() => {
      // Drawer cart - opens from right, shows added items
      function CartDrawer({ open, items, onClose, onInc, onDec, onRemove }) {
        const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
        return /*#__PURE__*/ React.createElement(
          React.Fragment,
          null,
          /*#__PURE__*/ React.createElement('div', {
            className: `sto-cart-scrim ${open ? 'is-open' : ''}`,
            onClick: onClose,
          }),
          /*#__PURE__*/ React.createElement(
            'aside',
            {
              className: `sto-cart ${open ? 'is-open' : ''}`,
              'aria-hidden': !open,
            },
            /*#__PURE__*/ React.createElement(
              'header',
              {
                className: 'sto-cart-head',
              },
              /*#__PURE__*/ React.createElement(
                'h3',
                {
                  className: 'sto-cart-title',
                },
                'your bag',
              ),
              /*#__PURE__*/ React.createElement(
                'button',
                {
                  className: 'sto-icon-btn',
                  'aria-label': 'close',
                  onClick: onClose,
                },
                /*#__PURE__*/ React.createElement(
                  'svg',
                  {
                    width: '20',
                    height: '20',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: '1.8',
                  },
                  /*#__PURE__*/ React.createElement('path', {
                    d: 'm6 6 12 12M18 6 6 18',
                  }),
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-cart-body',
              },
              items.length === 0 &&
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'sto-cart-empty',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-cart-empty-art',
                    },
                    /*#__PURE__*/ React.createElement(Symbol, {
                      tone: 'navy',
                      size: 48,
                    }),
                  ),
                  /*#__PURE__*/ React.createElement(
                    'p',
                    null,
                    'your bag is empty.',
                  ),
                  /*#__PURE__*/ React.createElement(
                    'p',
                    {
                      className: 'sto-cart-empty-sub',
                    },
                    'go pick out something good \u2192',
                  ),
                ),
              items.map((it) =>
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'sto-cart-row',
                    key: it.id,
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-cart-thumb',
                    },
                    /*#__PURE__*/ React.createElement(CoffeeBag, {
                      roast: it.id,
                      name: it.name + '.',
                      sub: it.kind,
                      size: 'xs',
                    }),
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-cart-info',
                    },
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'sto-cart-name',
                      },
                      it.name,
                    ),
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'sto-cart-kind',
                      },
                      it.kind,
                    ),
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        className: 'sto-cart-qty',
                      },
                      /*#__PURE__*/ React.createElement(
                        'button',
                        {
                          onClick: () => onDec(it.id),
                        },
                        '\u2212',
                      ),
                      /*#__PURE__*/ React.createElement('span', null, it.qty),
                      /*#__PURE__*/ React.createElement(
                        'button',
                        {
                          onClick: () => onInc(it.id),
                        },
                        '+',
                      ),
                      /*#__PURE__*/ React.createElement(
                        'button',
                        {
                          className: 'sto-cart-remove',
                          onClick: () => onRemove(it.id),
                        },
                        'remove',
                      ),
                    ),
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-cart-price',
                    },
                    '$',
                    it.price * it.qty,
                  ),
                ),
              ),
            ),
            items.length > 0 &&
              /*#__PURE__*/ React.createElement(
                'footer',
                {
                  className: 'sto-cart-foot',
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'sto-cart-totals',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    null,
                    /*#__PURE__*/ React.createElement('span', null, 'subtotal'),
                    /*#__PURE__*/ React.createElement(
                      'span',
                      null,
                      '$',
                      subtotal,
                    ),
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-cart-fine',
                    },
                    'shipping & taxes calculated at checkout.',
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  Button,
                  {
                    variant: 'primary',
                    size: 'lg',
                    arrow: true,
                  },
                  'checkout',
                ),
                /*#__PURE__*/ React.createElement(
                  'button',
                  {
                    className: 'sto-cart-keep',
                    onClick: onClose,
                  },
                  'keep shopping',
                ),
              ),
          ),
        );
      }
      Object.assign(window, {
        CartDrawer,
      });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: 'ui_kits/website/CartDrawer.jsx',
      error: String((e && e.message) || e),
    });
  }

  // ui_kits/website/Footer.jsx
  try {
    (() => {
      // Footer — site map + brand reinforcement.
      function Footer() {
        const cols = [
          {
            title: 'shop',
            links: [
              'all coffee',
              'subscriptions',
              'merch',
              'gift cards',
              'wholesale',
            ],
          },
          {
            title: 'visit',
            links: ['the cafe', 'workplace', 'events', 'hosting & rentals'],
          },
          {
            title: 'about',
            links: ['our story', 'sourcing', 'the journal', 'careers', 'press'],
          },
          {
            title: 'help',
            links: ['shipping', 'subscription faq', 'returns', 'contact us'],
          },
        ];
        return /*#__PURE__*/ React.createElement(
          'footer',
          {
            className: 'sto-footer',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-footer-top',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-footer-brand',
              },
              /*#__PURE__*/ React.createElement(Wordmark, {
                tone: 'lightgray',
                height: 36,
              }),
              /*#__PURE__*/ React.createElement(
                'p',
                {
                  className: 'sto-footer-addr',
                },
                '418 broadway street',
                /*#__PURE__*/ React.createElement('br', null),
                'chico, california 95928',
                /*#__PURE__*/ React.createElement('br', null),
                /*#__PURE__*/ React.createElement(
                  'a',
                  {
                    href: '#',
                  },
                  'hello@stoblecoffee.com',
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'sto-footer-social',
                },
                /*#__PURE__*/ React.createElement(
                  'a',
                  {
                    href: '#',
                    'aria-label': 'instagram',
                  },
                  /*#__PURE__*/ React.createElement(
                    'svg',
                    {
                      width: '20',
                      height: '20',
                      viewBox: '0 0 24 24',
                      fill: 'none',
                      stroke: 'currentColor',
                      strokeWidth: '1.6',
                    },
                    /*#__PURE__*/ React.createElement('rect', {
                      x: '3',
                      y: '3',
                      width: '18',
                      height: '18',
                      rx: '5',
                    }),
                    /*#__PURE__*/ React.createElement('circle', {
                      cx: '12',
                      cy: '12',
                      r: '4',
                    }),
                    /*#__PURE__*/ React.createElement('circle', {
                      cx: '17.5',
                      cy: '6.5',
                      r: '1',
                      fill: 'currentColor',
                    }),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'a',
                  {
                    href: '#',
                    'aria-label': 'tiktok',
                  },
                  /*#__PURE__*/ React.createElement(
                    'svg',
                    {
                      width: '20',
                      height: '20',
                      viewBox: '0 0 24 24',
                      fill: 'none',
                      stroke: 'currentColor',
                      strokeWidth: '1.6',
                    },
                    /*#__PURE__*/ React.createElement('path', {
                      d: 'M14 3v12.5a3.5 3.5 0 1 1-3.5-3.5',
                    }),
                    /*#__PURE__*/ React.createElement('path', {
                      d: 'M14 3c.5 3 2.5 5 5 5',
                    }),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'a',
                  {
                    href: '#',
                    'aria-label': 'spotify',
                  },
                  /*#__PURE__*/ React.createElement(
                    'svg',
                    {
                      width: '20',
                      height: '20',
                      viewBox: '0 0 24 24',
                      fill: 'none',
                      stroke: 'currentColor',
                      strokeWidth: '1.6',
                    },
                    /*#__PURE__*/ React.createElement('circle', {
                      cx: '12',
                      cy: '12',
                      r: '9',
                    }),
                    /*#__PURE__*/ React.createElement('path', {
                      d: 'M7 10c4-1 8-1 11 1M7.5 13c3-1 6.5-1 9 .5M8 16c2-.7 4.5-.7 6.5.5',
                    }),
                  ),
                ),
              ),
            ),
            cols.map((c) =>
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  key: c.title,
                  className: 'sto-footer-col',
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'sto-footer-col-title',
                  },
                  c.title,
                ),
                /*#__PURE__*/ React.createElement(
                  'ul',
                  null,
                  c.links.map((l) =>
                    /*#__PURE__*/ React.createElement(
                      'li',
                      {
                        key: l,
                      },
                      /*#__PURE__*/ React.createElement(
                        'a',
                        {
                          href: '#',
                        },
                        l,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-footer-bt',
            },
            /*#__PURE__*/ React.createElement(BetterTogether, {
              variant: 'wave',
              tone: 'white',
              height: 64,
            }),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-footer-bottom',
            },
            /*#__PURE__*/ React.createElement(
              'span',
              null,
              '\xA9 2026 stoble coffee co.',
            ),
            /*#__PURE__*/ React.createElement(
              'span',
              null,
              'lovingly roasted in chico, california.',
            ),
            /*#__PURE__*/ React.createElement(
              'span',
              null,
              /*#__PURE__*/ React.createElement(
                'a',
                {
                  href: '#',
                },
                'privacy',
              ),
              '  \xB7  ',
              /*#__PURE__*/ React.createElement(
                'a',
                {
                  href: '#',
                },
                'terms',
              ),
              '  \xB7  ',
              /*#__PURE__*/ React.createElement(
                'a',
                {
                  href: '#',
                },
                'accessibility',
              ),
            ),
          ),
        );
      }
      Object.assign(window, {
        Footer,
      });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: 'ui_kits/website/Footer.jsx',
      error: String((e && e.message) || e),
    });
  }

  // ui_kits/website/Header.jsx
  try {
    (() => {
      // Header — sticky top nav for the website.
      const { useState: useStateHeader } = React;
      function Header({
        cartCount = 0,
        onCart,
        onLogin,
        onNav,
        current = 'shop',
      }) {
        const items = [
          {
            id: 'shop',
            label: 'shop',
          },
          {
            id: 'subscriptions',
            label: 'subscriptions',
          },
          {
            id: 'our-coffee',
            label: 'our coffee',
          },
          {
            id: 'cafe',
            label: 'cafe',
          },
          {
            id: 'journal',
            label: 'journal',
          },
        ];
        return /*#__PURE__*/ React.createElement(
          'header',
          {
            className: 'sto-header',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-header-inner',
            },
            /*#__PURE__*/ React.createElement(
              'a',
              {
                className: 'sto-header-logo',
                href: '#',
                onClick: (e) => {
                  e.preventDefault();
                  onNav && onNav('home');
                },
              },
              /*#__PURE__*/ React.createElement(Wordmark, {
                tone: 'navy',
                height: 26,
              }),
            ),
            /*#__PURE__*/ React.createElement(
              'nav',
              {
                className: 'sto-header-nav',
              },
              items.map((it) =>
                /*#__PURE__*/ React.createElement(
                  'a',
                  {
                    key: it.id,
                    href: '#',
                    className: `sto-header-link ${
                      current === it.id ? 'is-current' : ''
                    }`,
                    onClick: (e) => {
                      e.preventDefault();
                      onNav && onNav(it.id);
                    },
                  },
                  it.label,
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-header-tools',
              },
              /*#__PURE__*/ React.createElement(
                'button',
                {
                  className: 'sto-icon-btn',
                  'aria-label': 'search',
                },
                /*#__PURE__*/ React.createElement(
                  'svg',
                  {
                    width: '18',
                    height: '18',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: '1.8',
                  },
                  /*#__PURE__*/ React.createElement('circle', {
                    cx: '11',
                    cy: '11',
                    r: '7',
                  }),
                  /*#__PURE__*/ React.createElement('path', {
                    d: 'm20 20-3.5-3.5',
                  }),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'button',
                {
                  className: 'sto-icon-btn',
                  'aria-label': 'account',
                  onClick: onLogin,
                },
                /*#__PURE__*/ React.createElement(
                  'svg',
                  {
                    width: '18',
                    height: '18',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: '1.8',
                  },
                  /*#__PURE__*/ React.createElement('circle', {
                    cx: '12',
                    cy: '8',
                    r: '4',
                  }),
                  /*#__PURE__*/ React.createElement('path', {
                    d: 'M4 21c0-4 4-7 8-7s8 3 8 7',
                  }),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'button',
                {
                  className: 'sto-icon-btn sto-cart-btn',
                  'aria-label': 'cart',
                  onClick: onCart,
                },
                /*#__PURE__*/ React.createElement(
                  'svg',
                  {
                    width: '18',
                    height: '18',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: '1.8',
                  },
                  /*#__PURE__*/ React.createElement('path', {
                    d: 'M3 5h3l2.5 11h11l2-8H7',
                  }),
                  /*#__PURE__*/ React.createElement('circle', {
                    cx: '10',
                    cy: '20',
                    r: '1.5',
                  }),
                  /*#__PURE__*/ React.createElement('circle', {
                    cx: '18',
                    cy: '20',
                    r: '1.5',
                  }),
                ),
                cartCount > 0 &&
                  /*#__PURE__*/ React.createElement(
                    'span',
                    {
                      className: 'sto-cart-count',
                    },
                    cartCount,
                  ),
              ),
            ),
          ),
        );
      }
      Object.assign(window, {
        Header,
      });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: 'ui_kits/website/Header.jsx',
      error: String((e && e.message) || e),
    });
  }

  // ui_kits/website/Hero.jsx
  try {
    (() => {
      // Hero — full-bleed navy with serif headline, BT tagline.
      function Hero({ onShop }) {
        return /*#__PURE__*/ React.createElement(
          'section',
          {
            className: 'sto-hero',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-hero-inner',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-hero-text',
              },
              /*#__PURE__*/ React.createElement(
                Eyebrow,
                {
                  color: '#B6C2C6',
                },
                'est. chico, california \xB7 2019',
              ),
              /*#__PURE__*/ React.createElement(
                'h1',
                {
                  className: 'sto-hero-head',
                },
                'a good cup',
                /*#__PURE__*/ React.createElement('br', null),
                'of coffee,',
                /*#__PURE__*/ React.createElement('br', null),
                'shared ',
                /*#__PURE__*/ React.createElement('em', null, 'better'),
                '.',
              ),
              /*#__PURE__*/ React.createElement(
                'p',
                {
                  className: 'sto-hero-sub',
                },
                'we believe coffee should delight more than just your palate \u2014 it should bring people together. lovingly roasted in small batches, here in chico.',
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'sto-hero-cta',
                },
                /*#__PURE__*/ React.createElement(
                  Button,
                  {
                    variant: 'cream',
                    size: 'lg',
                    arrow: true,
                    onClick: onShop,
                  },
                  'shop our coffee',
                ),
                /*#__PURE__*/ React.createElement(
                  Button,
                  {
                    variant: 'ghost-light',
                    size: 'lg',
                    arrow: true,
                  },
                  'visit the cafe',
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-hero-art',
              },
              /*#__PURE__*/ React.createElement(CoffeeBag, {
                roast: 'flagship',
                name: 'our daily cup.',
                sub: 'double-origin \xB7 washed',
              }),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'sto-hero-bt',
                },
                /*#__PURE__*/ React.createElement(BetterTogether, {
                  variant: 'wave',
                  tone: 'white',
                  height: 48,
                }),
              ),
            ),
          ),
        );
      }
      Object.assign(window, {
        Hero,
      });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: 'ui_kits/website/Hero.jsx',
      error: String((e && e.message) || e),
    });
  }

  // ui_kits/website/Primitives.jsx
  try {
    (() => {
      // Stoble — shared UI building blocks for the website kit.
      // Lowercase across the board; serif for headings, sans for furniture.

      const { useState } = React;

      // ─────────────────────────────────────────────────────────────
      // Wordmark — uses the real PNG. Pass tone="navy" | "white" | "lightgray".
      // ─────────────────────────────────────────────────────────────
      function Wordmark({ tone = 'navy', height = 32 }) {
        const src = `../../assets/wordmark-${tone}.png`;
        return /*#__PURE__*/ React.createElement('img', {
          src: src,
          alt: 'stoble',
          style: {
            height,
            display: 'block',
          },
        });
      }
      function Symbol({ tone = 'navy', size = 28 }) {
        const src = `../../assets/symbol-s-${tone}.png`;
        return /*#__PURE__*/ React.createElement('img', {
          src: src,
          alt: '',
          style: {
            height: size,
            width: 'auto',
            display: 'block',
          },
        });
      }

      // ─────────────────────────────────────────────────────────────
      // Button — pill, three styles.
      // ─────────────────────────────────────────────────────────────
      function Button({
        variant = 'primary',
        size = 'md',
        children,
        arrow = false,
        onClick,
        type = 'button',
      }) {
        const cls = `sto-btn sto-btn-${variant} sto-btn-${size}`;
        return /*#__PURE__*/ React.createElement(
          'button',
          {
            className: cls,
            onClick: onClick,
            type: type,
          },
          /*#__PURE__*/ React.createElement('span', null, children),
          arrow &&
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className: 'sto-btn-arrow',
              },
              '\u2192',
            ),
        );
      }

      // ─────────────────────────────────────────────────────────────
      // Eyebrow — uppercase Garnett label above section heads.
      // ─────────────────────────────────────────────────────────────
      function Eyebrow({ children, color }) {
        return /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'sto-eyebrow',
            style: color
              ? {
                  color,
                }
              : undefined,
          },
          children,
        );
      }

      // ─────────────────────────────────────────────────────────────
      // Tagline image — Better Together lockups.
      // ─────────────────────────────────────────────────────────────
      function BetterTogether({
        variant = 'wave',
        tone = 'navy',
        height = 56,
      }) {
        // Only wave is shipped in white. For other variants on dark surfaces,
        // load the navy file and invert it via CSS — preserves visual variety.
        const needsInvert = tone === 'white' && variant !== 'wave';
        const src = needsInvert
          ? `../../assets/bt-${variant}-navy.png`
          : `../../assets/bt-${variant}-${tone}.png`;
        const style = {
          height,
          display: 'block',
        };
        if (needsInvert) style.filter = 'brightness(0) invert(1)';
        return /*#__PURE__*/ React.createElement('img', {
          src: src,
          alt: 'better together',
          style: style,
        });
      }

      // ─────────────────────────────────────────────────────────────
      // CoffeeBag — a faux packaging label used as product imagery.
      // Color flood = roast color; centered cream label with text.
      // ─────────────────────────────────────────────────────────────
      function CoffeeBag({ roast, name, sub, size = 'lg' }) {
        const roastColors = {
          flagship: {
            bg: '#8096A3',
            tint: '#C9D0D2',
          },
          dark: {
            bg: '#556C72',
            tint: '#DDCBC3',
          },
          decaf: {
            bg: '#8BA099',
            tint: '#C0C8CB',
          },
          africa: {
            bg: '#B8A57A',
            tint: '#E4DED0',
          },
          south: {
            bg: '#A56F5C',
            tint: '#F7F0ED',
          },
          central: {
            bg: '#DEBBA8',
            tint: '#D5DCDA',
          },
        };
        const c = roastColors[roast] || roastColors.flagship;
        const labelName = {
          flagship: 'flagship',
          dark: 'dark',
          decaf: 'decaf',
          africa: 'africa',
          south: 'south america',
          central: 'central america',
        }[roast];
        return /*#__PURE__*/ React.createElement(
          'div',
          {
            className: `sto-bag sto-bag-${size}`,
            style: {
              background: c.bg,
            },
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-bag-strip',
              style: {
                color: c.tint,
              },
            },
            /*#__PURE__*/ React.createElement('span', null, 'stoble'),
            /*#__PURE__*/ React.createElement('span', null, '12 oz / 340 g'),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-bag-label',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-bag-roast',
                style: {
                  color: c.bg,
                },
              },
              labelName,
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-bag-name',
              },
              name,
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-bag-sub',
              },
              sub,
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-bag-notes',
                style: {
                  color: c.bg,
                  opacity: 0.7,
                },
              },
              /*#__PURE__*/ React.createElement('span', null, 'notes'),
              /*#__PURE__*/ React.createElement('span', null, '\u2193'),
            ),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-bag-foot',
              style: {
                color: c.tint,
              },
            },
            'better together.',
          ),
        );
      }
      Object.assign(window, {
        Wordmark,
        Symbol,
        Button,
        Eyebrow,
        BetterTogether,
        CoffeeBag,
      });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: 'ui_kits/website/Primitives.jsx',
      error: String((e && e.message) || e),
    });
  }

  // ui_kits/website/Roasts.jsx
  try {
    (() => {
      // RoastsGrid — six product cards for each roast.
      const ROASTS = [
        {
          id: 'flagship',
          name: 'flagship',
          price: 19,
          kind: 'double-origin · washed',
          notes: 'milk chocolate, dried cherry, brown sugar',
          desc: 'our everyday cup. balanced, bright, the one we put in our own pour-overs.',
        },
        {
          id: 'dark',
          name: 'dark',
          price: 19,
          kind: 'double-origin · washed',
          notes: 'dark chocolate, toasted nut, molasses',
          desc: 'for the deep-roast lovers — bold, but never bitter or burnt.',
        },
        {
          id: 'decaf',
          name: 'decaf',
          price: 20,
          kind: 'double-origin · washed',
          notes: 'caramel, baked apple, almond',
          desc: 'all the flavor, none of the jitters. swiss-water processed.',
        },
        {
          id: 'africa',
          name: 'africa',
          price: 22,
          kind: 'single-origin · natural',
          notes: 'blueberry, jasmine, grapefruit zest',
          desc: 'ethiopia guji — jammy, floral, wild like a sunny morning.',
        },
        {
          id: 'south',
          name: 'south america',
          price: 21,
          kind: 'single-origin · washed',
          notes: 'honey, pear, milk chocolate',
          desc: 'colombia huila — smooth, clean, easy-drinking. monday-morning approved.',
        },
        {
          id: 'central',
          name: 'central america',
          price: 21,
          kind: 'single-origin · washed',
          notes: 'stone fruit, brown sugar, cocoa nib',
          desc: 'guatemala antigua — soft body, sweet finish. a quiet showstopper.',
        },
      ];
      function RoastCard({ roast, onAdd }) {
        const [hover, setHover] = useState(false);
        return /*#__PURE__*/ React.createElement(
          'article',
          {
            className: 'sto-roast-card',
            onMouseEnter: () => setHover(true),
            onMouseLeave: () => setHover(false),
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-roast-art',
            },
            /*#__PURE__*/ React.createElement(CoffeeBag, {
              roast: roast.id,
              name: roast.name + '.',
              sub: roast.kind,
              size: 'sm',
            }),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-roast-body',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-roast-head',
              },
              /*#__PURE__*/ React.createElement(
                'h3',
                {
                  className: 'sto-roast-name',
                },
                roast.name,
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'sto-roast-price',
                },
                '$',
                roast.price,
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-roast-kind',
              },
              roast.kind,
            ),
            /*#__PURE__*/ React.createElement(
              'p',
              {
                className: 'sto-roast-desc',
              },
              roast.desc,
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-roast-notes',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'sto-roast-notes-label',
                },
                'notes  \u2193',
              ),
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'sto-roast-notes-text',
                },
                roast.notes,
              ),
            ),
            /*#__PURE__*/ React.createElement(
              Button,
              {
                variant: 'primary',
                size: 'sm',
                arrow: true,
                onClick: () => onAdd(roast),
              },
              hover ? 'add to bag' : 'add to bag',
            ),
          ),
        );
      }
      function RoastsGrid({ onAdd }) {
        return /*#__PURE__*/ React.createElement(
          'section',
          {
            className: 'sto-section sto-roasts',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-section-head',
            },
            /*#__PURE__*/ React.createElement(Eyebrow, null, 'our coffee'),
            /*#__PURE__*/ React.createElement(
              'h2',
              {
                className: 'sto-section-title',
              },
              'six roasts. one promise \u2014 ',
              /*#__PURE__*/ React.createElement(
                'em',
                null,
                'good coffee, honestly told.',
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'p',
              {
                className: 'sto-section-sub',
              },
              "we tell you exactly what's in the bag and who grew it. that's it.",
            ),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-roast-grid',
            },
            ROASTS.map((r) =>
              /*#__PURE__*/ React.createElement(RoastCard, {
                key: r.id,
                roast: r,
                onAdd: onAdd,
              }),
            ),
          ),
        );
      }
      Object.assign(window, {
        ROASTS,
        RoastCard,
        RoastsGrid,
      });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: 'ui_kits/website/Roasts.jsx',
      error: String((e && e.message) || e),
    });
  }

  // ui_kits/website/Story.jsx
  try {
    (() => {
      // Story — split section about the brand + values.
      function StoryBlock() {
        return /*#__PURE__*/ React.createElement(
          'section',
          {
            className: 'sto-section sto-story',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-story-grid',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-story-text',
              },
              /*#__PURE__*/ React.createElement(Eyebrow, null, 'our story'),
              /*#__PURE__*/ React.createElement(
                'h2',
                {
                  className: 'sto-story-head',
                },
                'we\u2019re a small roastery in chico, with a simple idea \u2014 coffee is better when it\u2019s shared.',
              ),
              /*#__PURE__*/ React.createElement(
                'p',
                {
                  className: 'sto-story-body',
                },
                'we started stoble in 2019 because we couldn\u2019t find a coffee shop in town that felt like home. so we made one. we roast every bag ourselves, we know the farmers we buy from by name, and we pay them what their coffee is actually worth.',
              ),
              /*#__PURE__*/ React.createElement(
                'p',
                {
                  className: 'sto-story-body',
                },
                'you don\u2019t have to be a coffee nerd to enjoy our coffee. you just have to be thirsty.',
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'sto-story-cta',
                },
                /*#__PURE__*/ React.createElement(
                  Button,
                  {
                    variant: 'primary',
                    arrow: true,
                  },
                  'read our story',
                ),
                /*#__PURE__*/ React.createElement(
                  Button,
                  {
                    variant: 'secondary',
                    arrow: true,
                  },
                  'meet the team',
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-story-art',
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'sto-story-tile sto-story-tile-1',
                },
                /*#__PURE__*/ React.createElement(BetterTogether, {
                  variant: 'boomerang',
                  tone: 'white',
                  height: 120,
                }),
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'sto-story-tile sto-story-tile-2',
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'sto-story-fact',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-fact-num',
                    },
                    '2019',
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-fact-label',
                    },
                    'founded in chico, ca',
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'sto-story-fact',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-fact-num',
                    },
                    '14',
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-fact-label',
                    },
                    'producer partners',
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'sto-story-fact',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-fact-num',
                    },
                    '$5.40',
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'sto-fact-label',
                    },
                    'avg. green price / lb',
                    /*#__PURE__*/ React.createElement('br', null),
                    '(3x fairtrade min.)',
                  ),
                ),
              ),
            ),
          ),
        );
      }
      Object.assign(window, {
        StoryBlock,
      });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: 'ui_kits/website/Story.jsx',
      error: String((e && e.message) || e),
    });
  }

  // ui_kits/website/Subscribe.jsx
  try {
    (() => {
      // Subscription band — encourage subscribe before footer.
      function SubscribeBand({ onSubscribe }) {
        return /*#__PURE__*/ React.createElement(
          'section',
          {
            className: 'sto-subband',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-subband-inner',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-subband-text',
              },
              /*#__PURE__*/ React.createElement(
                Eyebrow,
                {
                  color: '#B6C2C6',
                },
                'subscription',
              ),
              /*#__PURE__*/ React.createElement(
                'h2',
                {
                  className: 'sto-subband-head',
                },
                'fresh coffee, on your',
                /*#__PURE__*/ React.createElement('br', null),
                'schedule \u2014 never on autopilot.',
              ),
              /*#__PURE__*/ React.createElement(
                'p',
                {
                  className: 'sto-subband-sub',
                },
                "tell us how much you drink and we'll keep you stocked. pause, skip, or change roasts any time, in two clicks.",
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'sto-subband-cta',
                },
                /*#__PURE__*/ React.createElement(
                  Button,
                  {
                    variant: 'cream',
                    size: 'lg',
                    arrow: true,
                    onClick: onSubscribe,
                  },
                  'start a subscription',
                ),
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'sto-subband-fine',
                  },
                  'free shipping over $30 \xB7 cancel any time',
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-subband-art',
              },
              /*#__PURE__*/ React.createElement(BetterTogether, {
                variant: 'braid',
                tone: 'white',
                height: 260,
              }),
            ),
          ),
        );
      }

      // Cafe — visit-us block.
      function CafeBlock() {
        return /*#__PURE__*/ React.createElement(
          'section',
          {
            className: 'sto-section sto-cafe',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sto-cafe-grid',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-cafe-card',
              },
              /*#__PURE__*/ React.createElement('div', {
                className: 'sto-cafe-img',
              }),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'sto-cafe-body',
                },
                /*#__PURE__*/ React.createElement(
                  Eyebrow,
                  null,
                  'downtown chico',
                ),
                /*#__PURE__*/ React.createElement(
                  'h3',
                  {
                    className: 'sto-cafe-name',
                  },
                  '418 broadway',
                ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'sto-cafe-hours',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    null,
                    /*#__PURE__*/ React.createElement(
                      'span',
                      null,
                      'mon \u2014 fri',
                    ),
                    /*#__PURE__*/ React.createElement(
                      'span',
                      null,
                      '6:30a \u2014 5p',
                    ),
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    null,
                    /*#__PURE__*/ React.createElement(
                      'span',
                      null,
                      'sat \u2014 sun',
                    ),
                    /*#__PURE__*/ React.createElement(
                      'span',
                      null,
                      '7a \u2014 5p',
                    ),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  Button,
                  {
                    variant: 'secondary',
                    size: 'sm',
                    arrow: true,
                  },
                  'get directions',
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'sto-cafe-card',
              },
              /*#__PURE__*/ React.createElement('div', {
                className: 'sto-cafe-img sto-cafe-img-2',
              }),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'sto-cafe-body',
                },
                /*#__PURE__*/ React.createElement(
                  Eyebrow,
                  null,
                  'workplace \xB7 coworking',
                ),
                /*#__PURE__*/ React.createElement(
                  'h3',
                  {
                    className: 'sto-cafe-name',
                  },
                  'stoble workplace',
                ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'sto-cafe-hours',
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    null,
                    /*#__PURE__*/ React.createElement(
                      'span',
                      null,
                      'mon \u2014 fri',
                    ),
                    /*#__PURE__*/ React.createElement(
                      'span',
                      null,
                      '7a \u2014 7p',
                    ),
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    null,
                    /*#__PURE__*/ React.createElement('span', null, 'day pass'),
                    /*#__PURE__*/ React.createElement('span', null, '$22'),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  Button,
                  {
                    variant: 'secondary',
                    size: 'sm',
                    arrow: true,
                  },
                  'book a desk',
                ),
              ),
            ),
          ),
        );
      }
      Object.assign(window, {
        SubscribeBand,
        CafeBlock,
      });
    })();
  } catch (e) {
    __ds_ns.__errors.push({
      path: 'ui_kits/website/Subscribe.jsx',
      error: String((e && e.message) || e),
    });
  }
})();
