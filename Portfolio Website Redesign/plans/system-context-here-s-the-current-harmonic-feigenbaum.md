# Typography, Motion Background, Ticker & Cursor Pass

## Context

The portfolio is structurally solid after the 11-file refactor, but three things are undercutting the "Awwwards-level, human, not-AI" goal:

1. **The custom font was never actually applied.** `src/styles/fonts.css` imports Bricolage Grotesque + DM Mono, but `src/styles/theme.css`'s `@theme inline` block defines colors, radii and sidebar tokens — and no `--font-sans` / `--font-mono`. Tailwind therefore falls back to its default system stack across the entire site. Every `font-mono` class in `Nav.tsx`, `Hero.tsx`, `Marquee.tsx` etc. is resolving to the generic monospace fallback. This is the single biggest reason the type reads as generic.
2. **The background is flat.** `Hero.tsx` renders one `absolute inset-x-0 top-1/3 h-px bg-border` divider over a solid `--background`. In dark mode that's a dead `#0c0c0c` field with no depth — the "too shallow" the user described. No specular sheen, no grain, no motion.
3. **The custom cursor is a liability.** `Cursor.tsx` + `cursor: none` in `App.tsx` hides the native pointer on all fine-pointer devices. It costs three global listeners plus three springs per frame, it's the thing overlapping the ticker in the attached screenshot, and the user has now asked for the normal pointer back.

The horizontal skills ticker (`Marquee.tsx`) should be restored as a deliberate, prominent full-bleed band directly beneath the hero image, upgraded from raw CSS keyframes to Motion.

**Outcome:** Inter Tight / JetBrains Mono applied site-wide via design-system tokens, a layered "shiny black" Motion background that gives the dark mode real depth, a proper Motion-driven ticker under the hero image, and the native cursor back — with `prefers-reduced-motion` respected throughout.

---

## 1. Wire up the typography

**`src/styles/fonts.css`** — replace the single `@import` with the Inter Tight + JetBrains Mono Google Fonts import. Keep it as the only `@import url(...)` and keep it at the top of the file (per project font rules). Load Inter Tight 400/500/600/700 and JetBrains Mono 400/500 only — no more weights than the design uses, to keep the request small.

**`src/styles/theme.css`** — add to the `@theme inline` block (this is the actual fix):

```css
--font-sans: 'Inter Tight', ui-sans-serif, system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
```

Also add, alongside the existing `:root` tokens, two type-behaviour tokens so the Apple-ish precision is expressible without hardcoding: `--tracking-display: -0.03em` and `--tracking-mono: 0.16em`. Reference them via `@theme inline` as `--tracking-display` / `--tracking-mono` so `tracking-display` / `tracking-mono` become real Tailwind utilities.

In the `@layer base` block, add `font-family: var(--font-sans)` and `-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;` to `body`. Inter Tight at large display sizes needs antialiasing to avoid looking heavy.

**`src/app/components/Hero.tsx`** — the `<h1>` currently carries `fontFamily: "inherit"` in its inline style, which was a workaround for the missing token. Remove that inline `fontFamily` and replace the ad-hoc `tracking-tight` with `tracking-display`. Keep the `clamp()` font-size (it is intentional fluid display type, not a Tailwind size class).

Sweep the other components for the same pattern: every `font-mono tracking-widest` eyebrow (`Nav.tsx`, `Hero.tsx`, `Marquee.tsx`, `WorkIndex.tsx`, `About.tsx`, `Stack.tsx`, `Contact.tsx`, `Footer.tsx`) becomes `font-mono tracking-mono`. This is a mechanical find-and-replace of one class name — no need to enumerate each site.

## 2. "Shiny black" layered background

New file **`src/app/components/Backdrop.tsx`** — a single `fixed inset-0 -z-10 pointer-events-none` element rendered once from `App.tsx`, above `<Nav />`. It composes four layers, all token-derived (no raw hex), so the user can retheme from CSS:

- **Base** — `bg-background`.
- **Specular sheen** — two large, very low-opacity `radial-gradient`s built from `color-mix(in oklch, var(--accent) 12%, transparent)` and `color-mix(in oklch, var(--foreground) 8%, transparent)`, blurred heavily. This is what makes black read as *polished* black rather than flat ink: an off-axis highlight plus a cooler falloff.
- **Drift** — the two sheen blobs are `motion.div`s animated on `x`/`y`/`scale` with 24–32s durations, `repeat: Infinity`, `repeatType: "mirror"`, `ease: "easeInOut"`. Deliberately slow and desynchronised so it never reads as a loop.
- **Grain** — a static inline SVG `feTurbulence` data-URI at ~3% opacity with `mix-blend-mode: overlay`. Grain is what kills the plasticky AI-gradient look; it must be static (a moving grain layer is a repaint-per-frame tax for no visual gain).

Performance rules for this component:
- Animate **only** `transform` and `opacity`. Never `filter`, `background-position`, or `box-shadow`.
- Put `will-change: transform` on the two moving blobs and nothing else.
- Read `useReducedMotion()` from `src/app/hooks/use-preferences.ts` (already exists — reuse it, do not add a second implementation). When reduced, render the identical layers with zero animation, so the depth survives but the motion doesn't.
- The whole thing is `aria-hidden="true"`.

**`src/app/components/Hero.tsx`** — delete the lone `h-px bg-border` divider strip; the Backdrop now supplies the depth. Keep `overflow-hidden` on the section.

## 3. Restore the horizontal ticker under the hero image

**`src/app/components/Marquee.tsx`** — rewrite the animation to Motion while keeping the current props (`items`, `reverse`, `className`) so `App.tsx` needs no signature change:

- Drop the inline `<style>` keyframes block entirely — injecting a `<style>` tag per Marquee instance means the two instances in `App.tsx` each inject a duplicate.
- Duplicate the item list twice (not once) and animate a single `motion.div` from `x: 0` to `x: "-50%"` with `repeat: Infinity, ease: "linear", duration: 30`. Two copies with a `-50%` translate is the seamless-loop invariant; verify the flex container has no trailing gap that would break it.
- Under reduced motion, render the list statically with `overflow-x: auto` so the content is still reachable.
- Keep `aria-hidden="true"` — this is decorative, and the same skills are already stated as real text in the Stack section.

**`src/app/App.tsx`** — move the first `<Marquee>` so it sits flush against the bottom of the hero image with no gap, and make it full-bleed. Style it as a proper band: `border-y border-border`, `bg-foreground/[0.02]`, `py-5`. Keep the second reversed instance after `<WorkIndex />` as the section rhythm break it already is.

## 4. Remove the custom cursor

- Delete **`src/app/components/Cursor.tsx`**.
- **`src/app/App.tsx`** — remove the `Cursor` import, the `{finePointer && <Cursor />}` render, and the `style={finePointer ? { cursor: "none" } : undefined}` wrapper. The root `<div>` loses its `style` prop entirely.
- `useFinePointer` in `src/app/hooks/use-preferences.ts` becomes unused — **keep the hook** (it is a general-purpose utility and the pattern is worth preserving) but remove the now-dead import from `App.tsx`.
- The hover affordance the cursor provided is replaced in-place: interactive elements in `WorkIndex.tsx` get a Motion `whileHover` on the row (a small `x` nudge + `bg-foreground/[0.03]`), which is a stronger and more accessible signal than a scaling dot, and it works on touch/keyboard focus too.

---

## Design-system note

`@figma/astraui-kit` is in `package.json`, and its `guidelines/setup.md` asks for a sibling `@figma/astraui` install plus a `ThemeProvider` root wrapper. **None of that is currently wired up, and the site is instead built on the bespoke shadcn-style tokens in `theme.css`.** Adopting Astra now would mean rebuilding the whole editorial layout against a different component library — well outside the scope of a font/motion/cursor pass, and it would discard the custom design language. This plan therefore stays on the existing `theme.css` tokens and uses CSS variables for every color, radius and font. Flagging it so the migration is a deliberate, separate decision rather than something silently skipped.

## Files touched

| File | Change |
|---|---|
| `src/styles/fonts.css` | Swap to Inter Tight + JetBrains Mono import |
| `src/styles/theme.css` | Add `--font-sans` / `--font-mono` / tracking tokens; body font + antialiasing |
| `src/app/components/Backdrop.tsx` | **New** — layered shiny-black Motion background |
| `src/app/components/Marquee.tsx` | Motion-driven seamless ticker, no injected `<style>` |
| `src/app/components/Cursor.tsx` | **Delete** |
| `src/app/App.tsx` | Mount Backdrop, drop Cursor + `cursor:none`, reposition ticker |
| `src/app/components/Hero.tsx` | Drop `fontFamily: inherit` and the divider strip; `tracking-display` |
| `src/app/components/WorkIndex.tsx` | `whileHover` row affordance replacing the cursor cue |
| `Nav / About / Stack / Contact / Footer` | `tracking-widest` → `tracking-mono` on mono eyebrows |

## Verification

Do not run `vite build` or `npm run dev` — the dev server is already running; check the preview surface.

1. **Fonts actually applied** — inspect the `<h1>` in the preview and confirm computed `font-family` is `Inter Tight`, not the system stack. This is the specific bug being fixed, so verify it by computed style, not by eye.
2. **Both themes** — toggle dark/light via the Nav button. Confirm the sheen reads as polished depth in dark mode and stays subtle (not muddy) in light mode; confirm no raw hex leaked in by changing `--background` in `theme.css` and seeing the Backdrop follow.
3. **Ticker seam** — watch one full 30s loop at a wide viewport and confirm there is no visible jump at the wrap point.
4. **Cursor** — confirm the native pointer is visible everywhere, and that hovering a `WorkIndex` row gives the new nudge/tint.
5. **Reduced motion** — enable `prefers-reduced-motion: reduce` in DevTools rendering panel. Backdrop layers must still be present but static; ticker must be static and horizontally scrollable; hero fade-ups must not animate.
6. **Performance** — record a few seconds in the Performance panel while scrolling and confirm the Backdrop produces no layout or paint work (transform/opacity only) and holds 60fps.
7. **Keyboard** — tab through the whole page and confirm focus rings are visible against the new background, particularly over the ticker band and the hero.
