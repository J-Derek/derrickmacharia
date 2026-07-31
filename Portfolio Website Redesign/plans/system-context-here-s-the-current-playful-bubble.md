# Richer Motion-driven backdrop

## Context

The question was "can't we use Framer Motion for the background?" — we already do.
`src/app/components/Backdrop.tsx` imports `motion` from `motion/react` (package `motion@12.23.24`,
the current name for Framer Motion) and animates two radial-gradient layers on infinite loops.

The reason it doesn't *read* as animated:

- Opacities are 0.07 (sheen) and 0.04 (bloom) — near-invisible against `--background: #080808`.
- Loop durations are 18s and 24s with only ~12% translation, so motion is below the perceptual threshold.
- Only two layers, both drifting in the same lazy way — no parallax, no depth, no scale/rotation.
- The grain layer is static (no Motion at all).
- Colors are hardcoded `rgba(255,255,255,…)` / `rgba(200,255,71,…)` instead of design-system CSS
  variables, so the backdrop does not follow the theme and breaks in light mode
  (`--background: #f0ede8` — a white sheen is invisible on cream).

Goal: make the backdrop visibly, expressively animated while staying tasteful (Awwwards-level, not
a lava lamp), theme-aware via CSS variables, and fully `prefers-reduced-motion` compliant.

## Approach

### 1. Add backdrop tokens to `src/styles/theme.css`

Add to both the `:root` and `.dark` blocks so the backdrop is theme-driven and user-editable:

```
--backdrop-sheen:   /* dark: rgba(240,237,232,0.16)  light: rgba(12,12,12,0.07) */
--backdrop-bloom:   /* dark: rgba(200,255,71,0.13)   light: rgba(200,255,71,0.18) */
--backdrop-depth:   /* dark: rgba(80,120,255,0.09)   light: rgba(12,12,12,0.05) */
--backdrop-grain-opacity: /* dark: 0.06  light: 0.035 */
```

Reuse the existing `--accent: #c8ff47` hue for the bloom so the backdrop matches the accent already
used by `--ring` and `Hero`/CTA affordances. Expose them in the `@theme inline` block only if a
Tailwind utility is needed — otherwise reference them directly via `var()` in inline `style`.

### 2. Rewrite `src/app/components/Backdrop.tsx`

Keep the current shape (fixed, `inset-0`, `pointer-events-none`, `z-0`, `aria-hidden`) and the
`useReducedMotion()` guard from `src/app/hooks/use-preferences.ts` — reuse that hook, do not add a
new one.

Changes:

- **Three drifting orbs instead of two.** Drive them from a small local `ORBS` array
  (`{ id, color, size, position, duration, path }`) and `.map()` over it with a unique `key`, rather
  than repeating markup. Third orb uses `--backdrop-depth` for cool/warm contrast against the bloom.
- **Bigger, faster, layered motion.** Translate ranges ~25–40% (up from ~12%), durations staggered
  9s / 13s / 17s so the layers never re-sync — that non-repeating interference is what makes it read
  as alive. Add `scale: [1, 1.15, 0.95, 1]` per orb for breathing depth.
- **Blur for softness at higher opacity.** `filter: blur(60px)` on each orb so raising opacity adds
  glow rather than visible gradient edges.
- **Animated grain.** Wrap the grain layer in `motion.div` and animate its `opacity` between
  `var(--backdrop-grain-opacity)` and ~1.5× that on a short (~0.7s) loop for a subtle film shimmer.
  Keep the existing `feTurbulence` + `feColorMatrix` SVG filter (`id="grain"`) as-is.
- **Scroll parallax.** Use `useScroll()` + `useTransform()` from `motion/react` to translate the orb
  container slowly against page scroll (~ -15%), giving depth as the user moves through the page.
- **Reduced motion:** when `useReducedMotion()` is true, render the same orbs with zero `animate`
  props, no scroll transform, and static grain — the composition stays, only movement stops.

### 3. Guard legibility

Add a single `bg-[var(--background)]/40` scrim div above the orbs but below the grain, so the
brighter backdrop never reduces text contrast in `Hero.tsx`, `WorkIndex.tsx`, or `About.tsx`.

## Files

- `src/styles/theme.css` — add the four backdrop tokens to `:root` and `.dark`
- `src/app/components/Backdrop.tsx` — full rewrite (~90 lines)

No other files change; `App.tsx` already renders `<Backdrop />` first and needs no edit.

## Out of scope / noted

`src/app/components/Cursor.tsx` still exists on disk but is imported by nothing — leftover from the
earlier cursor removal. Not touching it as part of this change; flag for a separate cleanup.

## Verification

1. The Vite dev server is already running — check the preview surface, do not run `npm run dev` or
   `vite build`.
2. Dark mode: the orbs should be plainly visible drifting behind the hero, with no hard gradient
   edges and no banding.
3. Toggle to light mode via the existing `useDarkMode()` nav toggle — the backdrop should still be
   visible (dark sheen on cream), not washed out.
4. Scroll from hero to footer — the backdrop should lag behind content (parallax).
5. Enable OS "Reduce motion" and hard-reload — orbs must be present and completely still; grain
   static.
6. Confirm all hero/section text still passes contrast against the brightest orb position.
7. Confirm no hardcoded hex/rgba color literals remain in `Backdrop.tsx` — every color reads from a
   `var(--…)` token.
