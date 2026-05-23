# Design: Vite Tooling Migration (Phase 1)

## Goal

Replace Bower and manually managed vendor files with npm + Vite. No code changes — only tooling. This is phase 1 of a broader modernisation effort; subsequent phases will address the JS and CSS code itself.

## Project Structure

```
lego-demo/
  src/               ← Vite root (layout unchanged)
    ninjago.html     ← updated entry point
    ninjago.v*.html  ← left as static files, untouched (will be broken post-migration)
    js/main.js       ← import statements added at top; existing code unchanged
    img/
    fonts/
  sass/              ← unchanged
  vite.config.js     ← new
  package.json       ← new
```

Deleted: `bower.json`, `bower_components/`, `src/js/vendor/`, `src/css/` (custom compiled CSS — now handled by Vite).

## npm Dependencies

| Package | Version | Replaces |
|---|---|---|
| `jquery` | `^3` | `src/js/vendor/jquery-1.11.2.min.js` |
| `bootstrap` | `^3` | `src/js/vendor/bootstrap.min.js` + `src/css/bootstrap*.css` |
| `owl.carousel` | latest | `src/js/vendor/owl.carousel.js` + `src/css/owl.*.css` |
| `animate.css` | latest | `src/css/animate.min.css` |
| `hover.css` | latest | bower `hover` (used for `hvr-shrink` class) |
| `bourbon` | latest | bower `bourbon` (SCSS mixin imports) |

Dev dependencies: `vite`, `sass`

Dropped (not used in code): `modernizr`, `jquery-ui`, `neat`, `slick`

## Vite Config

```js
export default {
  root: 'src',
  build: {
    outDir: '../dist'
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules']  // allows @import "bourbon/bourbon" to resolve
      }
    }
  }
}
```

Single entry point: `src/ninjago.html`. The v1–v4 pages are not wired into the Vite build and will be broken after vendor files are removed. This is acceptable — they are slated for consolidation in a later phase.

## Changes to ninjago.html

- Remove all `<link>` tags for custom CSS (ninjago.css, ninjago-menu.css) — Vite injects compiled output
- Remove all `<script>` vendor tags
- Add one script tag: `<script type="module" src="/js/main.js">`
- Bootstrap and Owl Carousel CSS link tags can also be removed (imported via JS)
- External CDN links (Font Awesome, Google Fonts) remain unchanged

## Changes to main.js

Add imports at the top; all existing code below remains untouched:

```js
import 'animate.css'
import 'hover.css'
import $ from 'jquery'
import 'owl.carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import '../sass/ninjago.scss'
```

**Bootstrap 3 + jQuery global:** Bootstrap 3 is not an ES module — it expects `window.$` and `window.jQuery` to exist. jQuery must be exposed as a global before Bootstrap is loaded. This is handled by adding a Vite `provide` plugin in `vite.config.js`:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'jquery-global',
      transformIndexHtml() {},
      config() {
        return { define: {} }
      }
    }
  ],
  // ...
})
```

In practice: use Vite's built-in `define` or the `@originjs/vite-plugin-commonjs` approach — or simply set `window.$ = window.jQuery = $` at the top of `main.js` before the bootstrap import. The latter is simplest and sufficient for Bootstrap 3.

## Out of Scope (Phase 1)

- Replacing jQuery with vanilla JS
- Replacing Owl Carousel with a modern alternative
- Refactoring SCSS
- Consolidating or redesigning the v1–v4 pages
- Any visual changes
