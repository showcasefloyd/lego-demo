# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static HTML/CSS/JS demo project for a LEGO Ninjago page, created in 2015. The project uses npm + Vite for development and builds.

## Development

```bash
npm run dev      # start Vite dev server with HMR
npm run build    # production build → dist/
npm run preview  # preview production build locally
```

The entry point is `src/ninjago.html`. Vite serves from `src/` as its root.

SCSS in `src/sass/` is compiled by Vite via the `sass` package — no separate compilation step needed.

We are migrating the code from an older code base to newer libraries and architecture.
We should try and address any build time warnings as they come up and strive for a clean build.

Since we are factoring make sure we update this CLAUDE.md to keep up with changes to the project

## Architecture

### Versioned pages

The project contains multiple iteration versions of the same page. Each version has a matching HTML, SCSS, and JS file:

| Page | Styles | Script |
|---|---|---|
| `src/ninjago.html` | `sass/ninjago.scss` | `src/js/main.js` |
| `src/ninjago.v1.html` – `v4.html` | `sass/ninjago.v1.scss` – `v4.scss` | `src/js/main.v1.js` – `v4.js` |
| `src/ninjago.static.html` | — | — |

`ninjago.html` + `main.js` are the canonical/current version. The `ninjago.v*.html` pages are old iteration copies.

### Sass structure

`src/sass/ninjago.scss` is the entry point and imports partials:
- `_reset.scss` — base reset
- `_footer-styles.scss` — footer layout
- `_custom-animations.scss` — Animate.css integration helpers
- `_carousel.scss` — Owl Carousel overrides
- `_mobilemenu.scss` — off-canvas mobile menu

### JavaScript architecture

`src/js/main.js` manages all vendor and application JS via npm imports. Key behaviors:
- **Mobile menu**: CSS checkbox hack (`#offcanvas-menu`) toggles the off-canvas nav; JS enables/disables the checkbox based on viewport width (breakpoint: 992px).
- **Carousel**: Owl Carousel initialized on `#ninjago-carousel` with `backSlide` transition.
- **Lock/unlock interaction**: Season 2 thumbnail has a clickable lock overlay (`#unlockOverlay1`) that animates the lock image then slides away to reveal the enter button.
- **Hover animations**: Seasons 3 & 4 shake the lock on hover using the `.runAnimation()` jQuery plugin defined at the bottom of the file.
- **Custom jQuery plugins**: `.rotate(degrees)` and `.runAnimation(animation, subselector)` are defined inline in `main.js`.

`src/js/jquery-global.js` exposes jQuery globally for Owl Carousel compatibility.

Vendor JS/CSS (jQuery, Bootstrap, Owl Carousel, etc.) is managed through npm imports in `src/js/main.js`.