# Vite Tooling Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Bower and manually managed vendor files with npm + Vite, and upgrade Bootstrap 3 to Bootstrap 5, without changing the site's visual appearance or interaction code.

**Architecture:** Vite is configured with `src/` as its root. `ninjago.html` becomes a Vite entry point with a single `<script type="module">` tag pointing to `src/js/main.js`. All third-party dependencies are imported at the top of `main.js`; Vite bundles everything and compiles SCSS via the `sass` package. A small `jquery-global.js` module exposes jQuery on `window` so that Owl Carousel (a UMD plugin that reads `window.jQuery`) can find it.

**Tech Stack:** Vite 5, npm, sass, jQuery 3, Bootstrap 5, Owl Carousel 2, animate.css, hover.css, bourbon@4

---

### Task 1: Initialize npm project and install dependencies

**Files:**
- Create: `package.json`

Note: this project has no test suite — it is a static HTML site. Verification throughout this plan means running the Vite dev server and confirming the page renders and interactions work in a browser.

- [ ] **Step 1: Create package.json**

```json
{
  "name": "lego-demo",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "animate.css": "^4.1.1",
    "bootstrap": "^5.3.3",
    "bourbon": "^4.3.4",
    "hover.css": "^2.3.2",
    "jquery": "^3.7.1",
    "owl.carousel": "^2.3.4"
  },
  "devDependencies": {
    "sass": "^1.77.0",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` is created with all packages. No errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: initialize npm project with Vite and dependencies"
```

---

### Task 2: Create vite.config.js

**Files:**
- Create: `vite.config.js`

- [ ] **Step 1: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(import.meta.dirname, 'node_modules')]
      }
    }
  }
})
```

The `loadPaths` entry lets sass resolve `@import "bourbon/bourbon"` from `node_modules/bourbon/` without needing a path prefix in the SCSS source files.

- [ ] **Step 2: Verify Vite can start (it will fail since HTML is not updated yet — that's fine)**

```bash
npm run dev
```

Expected: Vite starts and prints a local URL. Ctrl+C to stop. The page will likely show errors in the browser — ignore them until Task 5 is complete.

- [ ] **Step 3: Commit**

```bash
git add vite.config.js
git commit -m "feat: add Vite configuration"
```

---

### Task 3: Create jQuery global module

**Files:**
- Create: `src/js/jquery-global.js`

Owl Carousel 2 is a UMD module that reads `window.jQuery` at execution time. With Vite's ES module bundling, a bare `import $ from 'jquery'` does not expose jQuery globally. This module sets the global before Owl Carousel is imported.

- [ ] **Step 1: Create src/js/jquery-global.js**

```js
import $ from 'jquery'
window.$ = window.jQuery = $
export default $
```

- [ ] **Step 2: Commit**

```bash
git add src/js/jquery-global.js
git commit -m "feat: expose jQuery globally for Owl Carousel"
```

---

### Task 4: Update main.js with imports

**Files:**
- Modify: `src/js/main.js` (prepend imports only; existing code unchanged)

- [ ] **Step 1: Add imports at the very top of src/js/main.js**

The existing `$(function () { ... })` code starts at line 1. Insert these lines before it:

```js
import 'animate.css'
import 'hover.css'
import $ from './jquery-global.js'
import 'bootstrap'
import 'owl.carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import '../../sass/ninjago.scss'

```

`jquery-global.js` is imported before `owl.carousel` so that `window.jQuery` is set before Owl Carousel's UMD wrapper executes. `bootstrap` comes after jQuery since Bootstrap 5 uses its own JS but coexists without issue.

The SCSS path `../../sass/ninjago.scss` goes up from `src/js/` to the project root, then into `sass/`.

- [ ] **Step 2: Verify the import path to ninjago.scss is correct**

From `src/js/main.js`:
- `../` = `src/`
- `../../` = project root
- `../../sass/ninjago.scss` = `<project-root>/sass/ninjago.scss` ✓

- [ ] **Step 3: Commit**

```bash
git add src/js/main.js
git commit -m "feat: add npm package imports to main.js"
```

---

### Task 5: Update ninjago.html — head and scripts

**Files:**
- Modify: `src/ninjago.html`

- [ ] **Step 1: Replace the entire `<html>` opening and `<head>` with the following**

Replace everything from line 1 through the closing `</head>` tag (line 27) with:

```html
<!doctype html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="HandheldFriendly" content="true">
    <title>Lego.com : Ninjago</title>
    <meta name="description" content="Lego.com : Ninjago">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Exo+2" rel="stylesheet">
  </head>
```

What changed:
- IE conditional comments removed
- `class="no-js"` removed from `<html>`
- `X-UA-Compatible` meta removed
- All local CSS `<link>` tags removed (Bootstrap, Owl, animate, ninjago — all imported via main.js now)
- External CDN links (Font Awesome, Google Fonts) kept

- [ ] **Step 2: Remove the IE browser upgrade block and the vendor script tags at the bottom**

Remove these lines from the `<body>`:

```html
    <!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
```

And remove these lines near the closing `</body>`:

```html
	<script src="js/vendor/jquery-1.11.2.min.js"></script>
    <script src="js/vendor/bootstrap.min.js"></script>
    <script src="js/vendor/owl.carousel.js"></script>

    <script src="js/main.js"></script>
```

Replace those four script lines with one:

```html
    <script type="module" src="/js/main.js"></script>
```

- [ ] **Step 3: Start the dev server and confirm the page loads**

```bash
npm run dev
```

Open the URL Vite prints (e.g. `http://localhost:5173/ninjago.html`). The page should load. There may be visual regressions from Bootstrap class names — those are fixed in Task 6. The carousel and background image should appear.

- [ ] **Step 4: Commit**

```bash
git add src/ninjago.html
git commit -m "feat: update ninjago.html head and scripts for Vite"
```

---

### Task 6: Update ninjago.html — Bootstrap 5 class names

**Files:**
- Modify: `src/ninjago.html`

Apply every class change below. Each change is listed with the exact old string and new string so they can be applied as targeted find-and-replace operations.

- [ ] **Step 1: Update full-width grid columns**

These appear on the top menu row, main content row, and footer row. All four columns (`xs`, `sm`, `md`, `lg`) are set to 12 — they're full-width rows. Collapse to a single `col-12`.

Find: `col-xs-12 col-sm-12 col-md-12 col-lg-12`
Replace: `col-12`

This pattern appears on lines 51, 66, and 163 of the original file.

- [ ] **Step 2: Update season card columns**

Find: `col-xs-12 col-xs-12-override col-sm-6 col-md-3 col-lg-3`
Replace: `col-12 col-xs-12-override col-sm-6 col-md-3 col-lg-3`

This pattern appears 4 times (one per season card). `col-xs-12-override` is a custom CSS class and stays unchanged.

- [ ] **Step 3: Replace glyphicon chevron with Font Awesome**

Font Awesome is already loaded via CDN. Replace the `<span>` that uses a glyphicon:

Find:
```html
<span class="glyphicon glyphicon-chevron-left hidden-lg hidden-md hidden-menu-icon" aria-hidden="true" ></span>
```

Replace:
```html
<i class="fa fa-chevron-left d-md-none hidden-menu-icon" aria-hidden="true"></i>
```

`d-md-none` hides the icon on medium screens and up (≥768px), matching the original `hidden-lg hidden-md` which hid it on md and lg.

- [ ] **Step 4: Update carousel image responsive classes**

There are three image variants per carousel slide (desktop, tablet, mobile). Apply these replacements across all three slides (9 images total):

**Desktop image** (large, hidden on sm and xs):

Find: `class="img-responsive center-block hidden-sm hidden-xs"`
Replace: `class="img-fluid mx-auto d-none d-md-block"`

There is also one instance with a trailing space: `hidden-sm hidden-xs "`— apply the same replacement.

**Tablet image** (medium, hidden on lg, md, and xs — visible on sm only):

Find: `class="img-responsive center-block hidden-lg hidden-md hidden-xs"`
Replace: `class="img-fluid mx-auto d-none d-sm-block d-md-none"`

**Mobile image** (small, hidden on lg, md, sm — visible on xs only):

Find: `class="img-responsive center-block hidden-lg hidden-md hidden-sm"`
Replace: `class="img-fluid mx-auto d-block d-sm-none"`

- [ ] **Step 5: Update remaining img-responsive classes**

All other images use `img-responsive` without hidden-* classes:

Find: `class="img-responsive"`
Replace: `class="img-fluid"`

This applies to the season card images, lock images, and enter button images.

- [ ] **Step 6: Update the homepage-middle row**

Find: `class="row center-block homepage-middle"`
Replace: `class="row mx-auto homepage-middle"`

- [ ] **Step 7: Start the dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:5173/ninjago.html`. Check:
- Background image visible
- Carousel shows slides and arrows work
- Four season cards visible in a row on desktop
- Mobile menu icon (chevron) appears on small screens
- Lock overlays on seasons 3 and 4 show the lock icon
- Clicking the lock on season 2 triggers the unlock animation

- [ ] **Step 8: Commit**

```bash
git add src/ninjago.html
git commit -m "feat: update Bootstrap 3 classes to Bootstrap 5 in ninjago.html"
```

---

### Task 7: Remove legacy files

**Files:**
- Delete: `bower.json`
- Delete: `bower_components/` (directory)
- Delete: `src/js/vendor/` (directory)
- Delete: `src/css/` (directory)

All CSS in `src/css/` is now either served from npm packages via `main.js` imports or compiled from SCSS by Vite. All JS in `src/js/vendor/` is served from npm packages. `bower_components/` is no longer used.

- [ ] **Step 1: Add dist/ and node_modules/ to .gitignore first**

Open `.gitignore` and add:

```
dist/
node_modules/
```

This must happen before the build so `dist/` is never accidentally committed.

- [ ] **Step 2: Delete legacy directories and files**

```bash
rm -rf bower.json bower_components src/js/vendor src/css
```

- [ ] **Step 3: Run a production build to confirm nothing is broken**

```bash
npm run build
```

Expected: Vite outputs to `dist/` with no errors. Warnings about circular dependencies from Owl Carousel are acceptable.

- [ ] **Step 4: Preview the production build**

```bash
npm run preview
```

Open the URL Vite prints (e.g. `http://localhost:4173/ninjago.html`). Verify the same checklist from Task 6 Step 7:
- Background image visible
- Carousel shows slides and arrows work
- Four season cards visible in a row on desktop
- Mobile menu chevron appears on small screens
- Lock overlays on seasons 3 and 4 visible
- Season 2 unlock animation works on click

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove Bower, vendor files, and compiled CSS — now managed by npm and Vite"
```

---

### Task 8: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the dev commands section in CLAUDE.md**

Replace the "Serving the Site" and "Sass Compilation" sections with:

```markdown
## Development

```bash
npm run dev      # start Vite dev server with HMR
npm run build    # production build → dist/
npm run preview  # preview production build locally
```

The entry point is `src/ninjago.html`. Vite serves from `src/` as its root.

SCSS in `sass/` is compiled by Vite via the `sass` package — no separate compilation step needed.
```

Remove the old Sass Compilation and Dependency Management (Bower) sections entirely. Update the Architecture section to note that vendor JS is now managed through npm imports in `src/js/main.js`.

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for Vite-based workflow"
```
