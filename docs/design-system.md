# Joist Design System

Joist is an online DIY and building-supplies shop for people who do the work themselves: weekend renovators, landlords, and small trades buying timber, fixings, tools, paint and plumbing. The brand behaves like a good builders' merchant counter. It knows its stock, gives straight answers, and doesn't waste your time.

**Tagline:** Build it right.

Browsable version with live component previews: https://claude.ai/artifact/9hLKDnBC22X4bmwG9EoCmc

---

## 1. Content guidelines

- Write like the person behind the trade counter: plain, specific, practical. Say what it is, what it fits, and when it arrives.
- Address the customer as "you". Joist is "we" only in service copy ("We'll text you when it's loaded").
- Lead with the spec. The product title carries the grade and the size: "Treated C16 Timber 47 × 100 mm × 2.4 m", not "Premium Garden Timber".
- Metric first, imperial in brackets when the trade still uses it: "47 × 100 mm (4×2)", "12.5 mm plasterboard (½ in)". Use the real multiplication sign `×`, with spaces.
- Prices always state the unit: "£4.85 per length", "£32.00 per m²", "£6.40 per box of 200". Say "inc. VAT" or "ex. VAT".
- Stock is concrete: "42 in stock at Leeds depot", "Low stock: 6 left", "Out of stock, back 14 Oct". Never "Limited availability".
- Buttons are verbs: "Add to trolley", "Reserve for collection", "Calculate quantity".
- No exclamation marks, no emoji.
- Write headings and badges in sentence case in the source. CSS uppercases them.

---

## 2. Logo

The mark is a "J" drawn as a steel joist section: a top flange, a web, and a bottom flange that hooks up. It sits in a hi-vis yellow square with 4px corners. The wordmark letters are block-cut on the same 7-unit stroke.

| File | Use |
| --- | --- |
| `public/brand/joist-wordmark.svg` | Mark + graphite letters, on white and light surfaces |
| `public/brand/joist-wordmark-reverse.svg` | Mark + white letters, on `graphite-900` (header, footer) |
| `public/brand/joist-mark.svg` | Mark only: favicon, app icon, anything under 120px wide |

Rules:

- Clear space: half the mark's height on every side. Minimum height 24px.
- Don't recolour the square, outline the mark, or set the name in a font.
- In the storefront, use the `app-joist-logo` component (`src/app/joist/logo/joist-logo.ts`). It renders the SVG inline, and its letters take `currentColor`.

---

## 3. Color

### Palette

| Token | Hex | Usage |
| --- | --- | --- |
| `hivis-500` | `#ffc20e` | Brand yellow. Primary action fill, logo square, cart count. Never as text on white. |
| `hivis-600` | `#e6a800` | Hover/pressed state of `hivis-500` fills. |
| `hivis-100` | `#fff3c4` | Warning and low-stock backgrounds. |
| `hivis-800` | `#8a5300` | Warning / low-stock text. |
| `blueprint-700` | `#1d3f8f` | Links, active tabs, selected facets, focus ring. |
| `blueprint-800` | `#152e6b` | Hover on links and blueprint fills. |
| `blueprint-100` | `#e6ecf8` | Info message backgrounds, selected row tint. |
| `graphite-900` | `#1c1e1f` | Ink (body text, headings). Header and footer bar. |
| `graphite-800` | `#2a2d2f` | Raised panels on the graphite header (menus, flyouts). |
| `graphite-700` | `#3a3d3f` | Dividers on graphite surfaces. |
| `concrete-600` | `#6a6c68` | Muted text: captions, SKU labels, helper text. |
| `concrete-400` | `#8a8c87` | Form control borders. |
| `concrete-300` | `#c8c9c4` | Decorative borders only (image frames, skeletons). |
| `concrete-200` | `#e3e3df` | Hairline dividers, card outlines, disabled button fill. |
| `concrete-50` | `#f4f4f1` | Sunken areas: facet sidebar, cart summary, image wells. |
| `white` | `#ffffff` | Default surface. |
| `level-700` | `#1f7a3e` | Success / in stock (always with a word or icon). |
| `level-100` | `#e5f3ea` | Success and in-stock background. |
| `brick-700` | `#b3261e` | Error / out of stock / sale price (always with a word or icon). |
| `brick-100` | `#fbeae8` | Error and out-of-stock background. |

### Semantic roles

| Role | Maps to | Usage |
| --- | --- | --- |
| `surface` | `white` | Page and card background |
| `surface-sunken` | `concrete-50` | Recessed panels |
| `ink` | `graphite-900` | Default text |
| `ink-muted` | `concrete-600` | Secondary text |
| `ink-inverse` | `white` | Text on graphite bars |
| `line` | `concrete-200` | Dividers, card outlines |
| `line-control` | `concrete-400` | Input, select, checkbox borders |
| `action` / `action-hover` | `hivis-500` / `hivis-600` | The one primary action per view |
| `on-action` | `graphite-900` | Label on action fills |
| `link` / `link-hover` | `blueprint-700` / `blueprint-800` | Links on light surfaces |
| `focus` | `blueprint-700` | Focus ring on light surfaces (`hivis-500` on graphite) |

### Contrast (WCAG 2)

| Pair | Ratio |
| --- | --- |
| `graphite-900` on `white` | 16.7:1 |
| `graphite-900` on `hivis-500` | 10.3:1 |
| `graphite-900` on `hivis-600` | 7.9:1 |
| `blueprint-700` on `white` | 9.7:1 |
| `blueprint-700` on `concrete-50` | 8.8:1 |
| `white` on `graphite-900` | 16.7:1 |
| `hivis-500` on `graphite-900` | 10.3:1 |
| `concrete-600` on `white` | 5.3:1 |
| `concrete-600` on `concrete-50` | 4.8:1 |
| `level-700` on `level-100` | 4.7:1 |
| `brick-700` on `brick-100` | 5.6:1 |
| `hivis-800` on `hivis-100` | 5.7:1 |
| `concrete-400` border on `white` | 3.4:1 (non-text) |
| `blueprint-700` focus ring on `hivis-500` | 6.0:1 (non-text) |

Don't set `concrete-600` text on `concrete-200` (4.1:1).

### Rules

- Pages are mostly `surface` and `ink`. Yellow is for the logo, the single primary action per view, and the cart count.
- Header and footer are solid `graphite-900`. Text and links on them are `ink-inverse`, and hover turns them `hivis-500`.
- Signal colours always come with a word or icon. Colour never carries the meaning on its own.

---

## 4. Typography

| Family | Stack | Role |
| --- | --- | --- |
| `display` | Barlow Condensed 600/700 | Headings h1–h3, hero lines, buttons, prices. Uppercase except prices. |
| `body` | Barlow 400/500/600/700 | Running text, product titles, labels. |
| `mono` | IBM Plex Mono 400/500 | Dimensions, spec values, SKUs. |

Fonts are self-hosted with `@fontsource` (Latin subset) in `src/styles/joist/_fonts.scss`.

### Type scale

| Style | Family | Size / line height | Weight | Notes |
| --- | --- | --- | --- | --- |
| `display-xl` | display | 56 / 56 | 700 | Hero banners only, uppercase, +0.01em |
| `h1` | display | 40 / 44 | 700 | Page titles, uppercase |
| `h2` | display | 32 / 36 | 700 | Section headings, uppercase |
| `h3` | display | 24 / 28 | 600 | Card and panel headings, uppercase |
| `price` | display | 28 / 32 | 700 | Tabular numerals (36/40 on product page) |
| `h4` | body | 20 / 26 | 600 | Product titles, form sections, sentence case |
| `body-lg` | body | 18 / 28 | 400 | Product descriptions |
| `body` | body | 16 / 24 | 400 | Default text |
| `body-sm` | body | 14 / 20 | 400 | Helper text, captions |
| `label` | body | 13 / 16 | 600 | Badges, table headers, uppercase, +0.06em |
| `spec` | mono | 14 / 20 | 400 | Dimensions, spec values |
| `sku` | mono | 12 / 16 | 500 | Product codes |

---

## 5. Spacing, shape, elevation

### Spacing (4px grid)

| Token | Value | Usage |
| --- | --- | --- |
| `space-1` | 4px | Icon-to-label gap, badge padding |
| `space-2` | 8px | Related controls, chip padding |
| `space-3` | 12px | Input padding, logo padding in header |
| `space-4` | 16px | Card padding, phone page gutter |
| `space-6` | 24px | Card grid gap |
| `space-8` | 32px | Section gap on phones |
| `space-12` | 48px | Section gap on desktop |
| `space-16` | 64px | Hero and footer vertical padding |

Page max width: 1280px.

### Radius

Square-cut, like sawn stock.

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | 2px | Inputs, badges, image wells |
| `radius-md` | 4px | Buttons, cards, modals, logo square |
| `radius-pill` | 999px | Cart count only |

### Elevation

Structure comes from hairlines and flat fills, not shadows.

| Token | Value | Usage |
| --- | --- | --- |
| `shadow-card` | `0 1px 0 #e3e3df` | Resting product cards |
| `shadow-raised` | `0 6px 16px rgba(28, 30, 31, 0.14)` | Menus, mini-cart, modals, card hover |

### Focus

Every interactive element shows a 2px solid `focus` outline with a 2px offset. On graphite bars the ring is `hivis-500`.

---

## 6. Iconography and imagery

- Icons: Spartacus's Font Awesome 7 Free (solid), 16px or 20px, in `ink` (or `ink-inverse` on graphite). Use a signal colour only next to the matching status word. No emoji.
- Product shots: on white or `concrete-50`, square crop, the product filling about 80% of the frame.
- Lifestyle photography: real work in progress (dust, offcuts, tools in hand). No spotless showrooms.

---

## 7. Components

### Button

| Variant | Style | Spartacus class |
| --- | --- | --- |
| Primary | `action` fill, `on-action` label, 2px border | `.btn-primary` |
| Secondary | `surface` fill, 2px `ink` border and label | `.btn-secondary` |
| Link | Underlined `link` text | `.btn-link` |

- Labels are `display` 700, 18px, uppercase, +0.04em. Default height 48px, small 40px.
- One primary button per view.
- Disabled: `concrete-200` fill, `concrete-600` label. Say why in the label ("Out of stock") or next to it.

### Stock badge

`label` style, `space-1` × `space-2` padding, `radius-sm`, with an 8px dot in the text colour.

| State | Colours | Example |
| --- | --- | --- |
| In stock | `level-700` on `level-100` | IN STOCK · 42 AT LEEDS |
| Low stock (≤10) | `hivis-800` on `hivis-100` | LOW STOCK · 6 LEFT |
| Out of stock | `brick-700` on `brick-100` | OUT OF STOCK · BACK 14 OCT |
| Trade price | `hivis-500` on `graphite-900`, no dot | TRADE PRICE |

### Price tag

- Price in `price` style, `ink`.
- Sale: price in `brick-700`, previous price below in `body-sm`, `ink-muted`, struck through, with the word "Was".
- Always followed by a unit line in `body-sm` `ink-muted`: "per 2.4 m length · inc. VAT".

### Spec table

- Two columns: `<th scope="row">` label in `label` style (`ink-muted`), value in `spec` (mono, tabular numerals).
- `line` hairlines between rows, no outer border. `surface` background when inside a sunken panel, otherwise `surface-sunken`.
- Row order: dimensions → grade/rating → finish → weight. Metric first; add a "Nominal" imperial row only when the trade uses it.

### Product card

- Contents, in order: image well, SKU (`sku`), title (`h4`, linked, max 3 lines), stock badge, price tag, full-width primary button.
- `surface`, 1px `line` border, `radius-md`, `shadow-card`, which becomes `shadow-raised` on hover. Padding `space-4`, grid gap `space-6`.
- Image well: square, `concrete-50`, `radius-sm`.

---

## 8. Implementation in this storefront

| File | What it does |
| --- | --- |
| `src/styles-config.scss` | Feeds the palette into Spartacus's `--cx-color-*` variables (`primary` = `blueprint-700`, `background-dark` = `graphite-900`, …). Must come before `@spartacus/styles`. |
| `src/styles/joist.scss` | Entry point for all Joist styles. It is the **last** entry in `angular.json` `styles`, after the Spartacus feature stylesheets. |
| `src/styles/joist/_fonts.scss` | Self-hosted Barlow, Barlow Condensed, IBM Plex Mono. |
| `src/styles/joist/_tokens.scss` | Every token as a `--joist-*` CSS custom property. |
| `src/styles/joist/_spartacus.scss` | Global restyling: body and heading type, links, buttons, form controls and checkboxes, header, footer, focus colour. |
| `src/styles/joist/_product.scss` | Commerce components: product grid cards, list items, carousels, search suggestions, product page price/SKU/stock badge, spec table. |
| `src/styles/joist/_layout.scss` | Page header (breadcrumb + `<h1>`), site context selector, tabs, delivery method tiles, image thumbnails, facets, footer, consent banner, global messages, modals. |
| `src/styles/joist/_cart.scss` | Cart line items, order summary panel, checkout progress, address/payment cards. |
| `src/app/joist/joist.providers.ts` | `provideJoist()`, registered in `app.config.ts`. Wires every Joist replacement into Spartacus through outlets (`OutletPosition.REPLACE`) and CMS component mappings. |
| `src/app/joist/header/` | `app-joist-header` replaces the `cx-header` outlet: a hi-vis service strip (with site links and language/currency), a graphite bar (logo, search, account, trolley) and a category bar. Phones use the Spartacus navigation drawer. |
| `src/app/joist/footer/` | `app-joist-footer` replaces the `cx-footer` outlet: trade-account band, Joist navigation columns, depot hours, legal line. The CMS Footer slot is kept for consent and scroll-to-top only. |
| `src/app/joist/mini-cart/` | `app-joist-mini-cart` replaces the CMS `MiniCartComponent` with a yellow trolley button showing count and total. |
| `src/app/joist/account/` | `app-joist-account-link` replaces the CMS `LoginComponent`: "Sign in / Account" for guests, a greeting and account link once signed in. |
| `src/app/joist/home/` | Homepage sections. `app-joist-hero` (Section1: headline and blueprint cut list), `app-joist-departments` (Section2A), `app-joist-services` (Section4). Section2B, 2C and 5 are retired with `app-joist-empty-slot`. Section3 keeps the CMS product carousels. |
| `src/app/joist/catalog/joist-departments.data.ts` | The eight Joist departments used by the homepage and footer. They link to search until the catalogue has matching categories. |
| `src/app/joist/product/joist-item-details.ts` | Replaces the `ProductListOutlets.ITEM_DETAILS` outlet on listing cards and rows: SKU, rating, stock badge, price with unit line. |
| `src/app/joist/product/joist-product-intro.ts` | Replaces the CMS `ProductIntroComponent`: SKU chip and rating with a jump-to-reviews link. It extends the Spartacus class to keep that behaviour. |
| `src/app/joist/product/joist-product-summary.ts` | Replaces the CMS `ProductSummaryComponent`: large price, VAT line, summary and depot promises. |
| `src/app/joist/product/joist-product-list.ts` | Replaces the CMS product list, grid and search-results components. It extends the Spartacus list, so sorting, pagination and view mode keep working, but always opens on the card grid. The toolbar shows the result count, sort and view toggle. |
| `src/app/joist/product/joist-product-card.ts` | Listing card: image well, name, `app-joist-item-details`, and a compact add-to-trolley button. It provides its own `ProductListItemContext`. |
| `src/app/joist/product/joist-add-to-cart.ts` | Replaces the CMS `ProductAddToCartComponent`. It extends the Spartacus component, so cart updates, stock rules, pickup-in-store and the added dialog are unchanged. On the product page it's a bordered buy box; in cards it's just the button. |
| `src/app/joist/cart/joist-cart-totals.ts` | Replaces the CMS `CartTotalsComponent`: a graphite "Trolley summary" with a free-delivery meter (threshold `JOIST_FREE_DELIVERY_THRESHOLD`, 75 in the cart currency) and totals. |
| `src/styles/joist/_plp.scss`, `_pdp.scss` | Listing rows, filters, active-filter chips and pagination; product page grid (7:5 gallery and buy column), gallery well, tabs spacing. |
| `src/app/joist/mega-nav/` | `app-joist-mega-nav` replaces the CMS `CategoryNavigationComponent`, using the CMS tree from `NavigationService`. On desktop, department buttons (disclosure pattern, `aria-expanded`) open a full-width panel: department title and "Shop all" link, category columns, and a click-and-collect tile. It opens on hover or click and closes on Escape (focus returns to the button), on focus or click outside, and on navigation. Below lg it's an accordion inside the hamburger drawer. |
| `src/app/joist/compare/` | Product comparison. `JoistCompareService` holds up to 4 product codes (`JOIST_COMPARE_LIMIT`), persisted in localStorage, and loads their details, price, stock and classifications. `app-joist-compare-toggle` ("Compare", `aria-pressed`) sits on product cards and the product-page intro, and is disabled with a hint when the list is full. `app-joist-compare-tray` is a fixed graphite bar with the picks, "Compare n" and "Clear all", with changes announced in a live region. `app-joist-compare-dialog` is a native modal `<dialog>`: product columns with remove and add-to-trolley, then overview and specification rows built by `buildCompareSections`, a "Show differences only" filter, and differing rows marked with a hi-vis edge. The tray is rendered by the footer, so it's on every page. |
| `src/app/joist/logo/joist-logo.ts` | `app-joist-logo`, rendered in the `SiteLogo` slot and in the footer. |
| `src/app/joist/page-header/joist-page-header.ts` | `app-joist-page-header` renders the Spartacus breadcrumb in `BottomHeaderSlot`. The backend CMS leaves that slot empty, so without it pages have no `<h1>`. On the homepage it is visually hidden. |
| `src/styles/joist/_header.scss`, `_home.scss` | Styles for the Spartacus components inside the Joist header and footer, and the homepage slot layout. |
| `public/brand/`, `public/favicon.svg` | Logo files. |

Conventions:

- Use `var(--joist-*)` tokens in component styles. Don't hard-code hex values.
- Joist styles load after all Spartacus stylesheets, so equal-specificity rules win. When a Spartacus rule is more specific, match its selector depth rather than using `!important`. The one exception is `--cx-color-visual-focus`, which Spartacus sets with `!important`.
- Spartacus sets `$font-family-sans-serif` without `!default`, so Joist font stacks are applied in CSS, not through Sass variables.

Known gaps:

- The storefront has a light theme only.
- Low stock can't be shown yet, because Spartacus's add-to-cart markup has no low-stock state. It needs a component override.
- The trade price badge isn't wired to any data yet.
- "Trolley" wording is set through translation overrides in `joist.providers.ts` (add-to-cart, dialog, cart heading). The cart page title "Your Shopping Cart" comes from the CMS.
- The mobile layout (hamburger menu) hasn't been checked.
