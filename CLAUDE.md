# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static HTML/CSS/JS demo project for a LEGO Ninjago page, created in 2015. There is no build pipeline beyond Sass compilation — no npm, no bundler, no test suite.

## Serving the Site

The site must be served from a web server (not opened as a file). Use Python's built-in server from the `src/` directory:

```bash
cd src && python3 -m http.server 8080
```

Then open `http://localhost:8080/ninjago.html`.

## Sass Compilation

Sass source lives in `sass/` and compiles to `src/css/`. Requires the `sass` CLI.

Compile a specific file:
```bash
sass sass/ninjago.scss src/css/ninjago.css
```

Watch for changes during development:
```bash
sass --watch sass/:src/css/
```

Each versioned page has its own entry point (`ninjago.v1.scss` → `ninjago.v1.css`, etc.).

## Dependency Management

Frontend dependencies are managed with Bower:
```bash
bower install
```

Dependencies: `bourbon` (SCSS mixin library), `hover` (CSS hover effects), `jquery-ui`, `neat` (Bourbon grid), `slick`.

## Architecture

### Versioned pages

The project contains multiple iteration versions of the same page. Each version has a matching HTML, SCSS, and JS file:

| Page | Styles | Script |
|---|---|---|
| `src/ninjago.html` | `sass/ninjago.scss` | `src/js/main.js` |
| `src/ninjago.v1.html` – `v4.html` | `sass/ninjago.v1.scss` – `v4.scss` | `src/js/main.v1.js` – `v4.js` |
| `src/ninjago.static.html` | — | — |

`ninjago.html` + `main.js` are the canonical/current version.

### Sass structure

`sass/ninjago.scss` is the entry point and imports partials:
- `_reset.scss` — base reset
- `_footer-styles.scss` — footer layout
- `_custom-animations.scss` — Animate.css integration helpers
- `_carousel.scss` — Owl Carousel overrides
- `_mobilemenu.scss` — off-canvas mobile menu

Bourbon is imported at the top of each entry point (`@import "bourbon/bourbon"`).

### JavaScript architecture

`src/js/main.js` is vanilla jQuery with no module system. Key behaviors:
- **Mobile menu**: CSS checkbox hack (`#offcanvas-menu`) toggles the off-canvas nav; JS enables/disables the checkbox based on viewport width (breakpoint: 992px).
- **Carousel**: Owl Carousel initialized on `#ninjago-carousel` with `backSlide` transition.
- **Lock/unlock interaction**: Season 2 thumbnail has a clickable lock overlay (`#unlockOverlay1`) that animates the lock image then slides away to reveal the enter button.
- **Hover animations**: Seasons 3 & 4 shake the lock on hover using the `.runAnimation()` jQuery plugin defined at the bottom of the file.
- **Custom jQuery plugins**: `.rotate(degrees)` and `.runAnimation(animation, subselector)` are defined inline in `main.js`.

Third-party vendor scripts live in `src/js/vendor/`: jQuery 1.11.2, Bootstrap, Owl Carousel, and Modernizr+Respond.
