# Portfolio: de-AI the template, reposition full-stack-first, fix a11y & perf

## Context

The user is a full-stack developer and UI/UX designer building an Awwwards-calibre
portfolio. They pasted a critique (`src/imports/pasted_text/portfolio-critique.md`) of
their *existing* live portfolio and asked whether this Make project shares the same
faults. It does — plus some the critique didn't cover.

The current `src/app/App.tsx` (~950 lines, single file) is a fictional persona: "Alex
Monroe", San Francisco, six years at Vercel/Linear/Stripe, projects named
Pulse/Meridian/Forma/Atelier/Ember, Unsplash stock imagery, and the aphorism "I believe
great design is invisible."

Two decisions have been made:

1. **Stay generic.** Real content (AutoBite/KPLC, CrochetHub, M-Pesa, Nairobi) is *not*
   being wired in this pass. Work is limited to structure, motion, performance, and
   accessibility. The persona stays placeholder.
2. **Ignore `@figma/astraui-kit`.** Its guidelines mandate a left `SidebarNavigation`
   rail, a lavender `brand-tertiary` canvas, and card-per-section layout — all of which
   contradict the top-nav, parchment/chartreuse, hairline-border editorial brief. Its
   runtime package `@figma/astraui` is not installed. Styling is driven entirely by the
   existing tokens in `src/styles/theme.css`.

Intended outcome: a template whose *structure* is engineering-first, keyboard- and
touch-safe, cheap to animate, and shaped so that dropping in real specifics later
produces concrete claims rather than adjectives.

## Constraints

- Figma Make project. No `index.html`, no `vite build`, no dev server commands.
- Do not edit `src/styles/theme.css` tokens — consume them.
- Fonts: only Bricolage Grotesque and DM Mono, already imported in `src/styles/fonts.css`.
- Per Make rules, avoid Tailwind font-size/weight/line-height utilities; the existing
  inline `clamp()` + `fontFamily` style approach is the established pattern here — keep it.

## Defects found (drives the work below)

| # | File / location | Issue |
|---|---|---|
| 1 | `App.tsx:927` | `cursor: none` on root, globally, no `(pointer: fine)` guard — hides the cursor on touch and for anyone who never moves a mouse |
| 2 | `App.tsx:404-478` | Project rows are `motion.div` with hover-only handlers — the entire work index is unreachable by keyboard, and is not a link or button |
| 3 | everywhere | No `prefers-reduced-motion` handling on cursor, marquee, or reveals |
| 4 | `App.tsx:173` | Marquee reverse variant animates `0% → 50%` while forward uses `0% → -50%`; with a doubled list only the forward direction wraps seamlessly |
| 5 | `App.tsx:636-715` | Discover/Define/Design/Deliver — a recognisable AI-template artifact *and* design-consultant framing that misrepresents a full-stack dev |
| 6 | `App.tsx:568-570`, `318`, `756` | Aphorism hero statement + `✦` / `↗` glyph decoration — strong AI tells |
| 7 | `App.tsx:354-359`, `536-541`, `501-506` | Images have no `width`/`height` → layout shift; hero image is `loading="eager"` at 1800px |
| 8 | `App.tsx:439-452` | Project category/role are `hidden md:flex` — metadata simply disappears on mobile rather than reflowing |
| 9 | `App.tsx:212` | Nav has no mobile menu; links vanish under `md` |
| 10 | `App.tsx:279`, `194-254` | Positions the persona as "Product Designer & Developer"; roles read "Lead Designer", "Research & Design" |
| 11 | `App.tsx:128-133` | `mouseover` listener on `window` runs `closest()` three times per event, unthrottled |
| 12 | `App.tsx:921` | Single 950-line file — every section edit touches one file |

## Plan

### 1. Split `App.tsx` into components

Create under `src/app/components/`, each importing tokens via Tailwind classes only:

- `cursor.tsx`, `marquee.tsx`, `nav.tsx`, `hero.tsx`, `work-index.tsx`,
  `about.tsx`, `stack.tsx` (replaces Process), `contact.tsx`, `footer.tsx`
- `src/app/data/projects.ts` — `Project[]` and marquee items, moved out of the component file
- `src/app/hooks/use-preferences.ts` — `useDarkMode` (moved as-is from `App.tsx:96`),
  plus new `useReducedMotion` and `useFinePointer`

`App.tsx` keeps only the default export and section composition.

### 2. Accessibility (highest severity)

- **`useFinePointer`** — `window.matchMedia('(pointer: fine)')`, subscribed to changes.
  Gate *both* the `<Cursor />` render and the root `cursor: none` on it. Never hide the
  system cursor on touch/hybrid devices.
- **`useReducedMotion`** — `matchMedia('(prefers-reduced-motion: reduce)')`. When true:
  no custom cursor, marquee renders as a static row, reveals become opacity-only with
  near-zero duration, hover image appears without spring travel.
- **Work index rows become real `<a>` elements** in a `<ul>/<li>`. Add
  `onFocus`/`onBlur` mirroring `onMouseEnter`/`onMouseLeave` so keyboard traversal
  drives the same active state. Remove `cursor-none` from the row (`App.tsx:413`) —
  the root already handles it when appropriate.
- **Focus-visible ring** on every interactive element using the existing `--ring` token:
  `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`.
  Currently nothing has a visible focus state.
- Floating hover preview gets `aria-hidden="true"` — it is pure decoration and duplicates
  the row's accessible name.
- Marquee wrapper gets `aria-hidden="true"`; the words are decorative and currently
  read out twice (the list is duplicated for the loop).
- Contact form: associate `<label>` to input via `htmlFor`/`id` (currently labels wrap
  nothing), and make the success message `role="status"` `aria-live="polite"`.
- Theme toggle: add `aria-pressed` alongside the existing `aria-label`.

### 3. Reposition engineering-first

- Nav/hero descriptor → developer-led wording; project `role` fields become build roles
  (e.g. "Full stack", "Frontend + API") rather than "Lead Designer".
- **Replace the `Process` section with `Stack`** — an editorial two-column list of
  technical domains (e.g. frontend, backend/APIs, data, infrastructure, design systems)
  built from the same hairline-border rhythm as the work index, not a 4-up card grid.
  This kills the AI-template tell and the design-consultant framing in one move.
- Keep the About section's dual-discipline paragraph — the design/engineering fluency is
  a genuine differentiator — but lead with the engineering side.

### 4. De-AI the template copy and ornament

- Delete the "great design is invisible" aphorism (`App.tsx:568`) and the `✦`/`↗`
  decorative glyphs (`318`, `184`, `756`).
- Rewrite placeholder copy so slots are **specific-shaped**: numbers, latencies,
  integrations, user counts. Example placeholder register —
  `"Cut checkout p95 from 4.1s to 900ms"` rather than `"velocity-first"`. Even as
  placeholders this matters: adjective-shaped slots get filled with adjectives.
- Vary section rhythm — the current every-section-is-`py-24`-with-a-`—Label` cadence is
  itself a machine signature. Let Hero, Work, About, Stack, Contact differ in vertical
  measure and label treatment.
- Replace the About "6+ Years" floating stat with a defensible-by-construction slot
  (projects shipped / systems in production), per critique item #1.

### 5. Performance

- Marquee: single transform-only animation, both directions using a correct
  `0% → -50%` wrap on a doubled list, direction handled by negating travel rather than
  flipping the sign of the endpoint. Add `will-change: transform`.
- Add explicit `width`/`height` to all `<img>` to eliminate CLS; `loading="lazy"` +
  `decoding="async"` on everything below the fold (About portrait, hover previews).
  Reduce the hero image request from `w=1800` to a responsive `srcSet`.
- Preload only the hero image; keep it `eager` but shrink it.
- Cursor: replace the unthrottled `mouseover` + triple `closest()` (`App.tsx:128`) with a
  single `closest('a, button, [data-hover]')` call, and drop the redundant `mouseleave`
  listener in favour of `pointerleave` on `document.documentElement`.
- Gate the `<Cursor />` and hover-preview subtrees behind the fine-pointer check so
  mobile never mounts or runs their spring loops.

### 6. Responsiveness

- Verify a 320px floor. Project rows: instead of `hidden md:flex`, reflow category/year
  onto a second line under the title on narrow viewports so metadata is never lost.
- Add a mobile nav — a full-screen overlay menu toggled by a button, reusing the
  existing `scrollTo` handler (`App.tsx:203`).
- Keep the existing fluid `clamp()` type scale; extend the same treatment to the
  section labels and body copy so nothing is fixed-px.

## Files

- **Modify:** `src/app/App.tsx` (reduced to composition)
- **Create:** the nine component files, `src/app/data/projects.ts`,
  `src/app/hooks/use-preferences.ts` (paths in §1)
- **Do not touch:** `src/styles/theme.css`, `src/styles/fonts.css`,
  `src/app/components/ui/**`, `src/app/components/figma/ImageWithFallback.tsx`

## Verification

1. **Preview renders** — all sections present, no console errors, dark/light toggle
   persists across reload (`localStorage` key `theme`).
2. **Keyboard only** — Tab from the top: skip through nav → hero CTA → every project row
   (each shows a visible focus ring *and* triggers the hover preview) → form fields →
   submit. Nothing unreachable, nothing focusable-but-invisible.
3. **Touch/coarse pointer** — emulate a touch device: the system cursor must be visible,
   `<Cursor />` must not mount, and no hover preview should appear.
4. **Reduced motion** — enable `prefers-reduced-motion: reduce`: marquee static, no
   custom cursor, reveals instant. Page must be fully usable.
5. **Responsive sweep** — 320 / 375 / 768 / 1280 / 1920 and an ultrawide. No horizontal
   scroll (root already has `overflow-x-hidden` — confirm nothing relies on it), no
   clipped headline, project metadata visible at every width.
6. **CLS** — hard reload and watch for reflow as images land; every `<img>` should have
   intrinsic dimensions.
7. **Marquee loop** — watch both strips for ≥30s; neither should visibly jump or drift
   at the wrap point.

## Out of scope — for the real deploy repo, not Figma Make

These come from the critique but need `index.html` / route control this environment
does not expose:

- Open Graph + `twitter:card` meta tags (critique #11)
- `sitemap.xml`, `robots.txt`, per-page `Helmet` titles (#12)
- `sharp` → `devDependencies` (#7)
- PNG → WebP conversion of the ~5 MB logo/screenshot set (#8)
- Route-level code splitting; lazy-load `ProjectDetail` (#9)
- Removing/lazy-loading the three.js background (#6) — note this Make build has **no**
  three.js, so this applies only to the live site
- Content credibility fixes: the "4 Years Experience" claim, project reorder so shipped
  work leads, LinkedIn link, `tel:`-labelled "Schedule Call", name-spelling consistency
  (#1–#5, #13–#17)
