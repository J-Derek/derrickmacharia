# Typography / Motion / Cursor Pass — Implementation Plan

## Context
The site currently uses Bricolage Grotesque + DM Mono via `fonts.css`, but `theme.css` never defines `--font-sans` / `--font-mono` tokens, so Tailwind's default system stack renders everywhere. The brief calls for Inter Tight + JetBrains Mono (Apple-inspired neo-grotesk), a "shiny black" layered backdrop in dark mode, a Motion-powered seamless Marquee ticker, removal of the custom cursor, and `whileHover` affordances on interactive elements—all while preserving `prefers-reduced-motion` and using CSS variables throughout.

---

## Files to modify

### 1. `src/styles/fonts.css`
- Replace Bricolage Grotesque + DM Mono `@import` with:
  ```
  Inter Tight: wght@300;400;500;600;700;800 (italic too)
  JetBrains Mono: wght@300;400;500 (italic too)
  ```

### 2. `src/styles/theme.css`
- Add inside `:root`:
  ```css
  --font-sans: 'Inter Tight', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  ```
- Add inside `.dark` (same values, or identical — font names don't change per mode)
- Add to `@theme inline`:
  ```css
  --font-family-sans: var(--font-sans);
  --font-family-mono: var(--font-mono);
  ```
- Update dark mode `--background` to a richer near-black for depth:
  ```css
  --background: #080808;
  --card: #111111;
  --secondary: #181818;
  --muted: #181818;
  ```
  (light mode stays the same warm off-white)

### 3. `src/app/App.tsx`
- Remove `import { Cursor }` and `import { useFinePointer }`
- Remove `const finePointer = useFinePointer()`
- Remove `{finePointer && <Cursor />}` JSX
- Remove `style={finePointer ? { cursor: "none" } : undefined}` from outer div
- Import and render `<Backdrop />` as first child inside the outer div

### 4. `src/app/components/Backdrop.tsx` — **new file**
A layered "shiny black" background fixed behind all content. Only visible/meaningful in dark mode (light mode it's transparent/invisible so warm off-white shows through naturally).

Layers (bottom → top):
1. **Base**: `bg-background` full-screen fixed div
2. **Radial specular sheen**: a large radial gradient blob (white/10 → transparent) that slowly drifts using `motion` `animate` with `repeat: Infinity, repeatType: "mirror"` — shifts x/y by ~15% over 12s. Respects `prefers-reduced-motion` (static if reduced).
3. **Secondary accent bloom**: smaller radial with accent color at very low opacity (~3%), drifts on a different phase/speed.
4. **Noise grain**: SVG `<feTurbulence>` filter applied as an overlay div at ~4% opacity via `mix-blend-mode: overlay`. Pure CSS, no animation needed.

All positioned `fixed inset-0 pointer-events-none z-0`.

### 5. `src/app/components/Marquee.tsx` — replace CSS animation with Motion
- Import `motion` from `motion/react`
- Use `motion.div` with `animate={{ x: ["0%", "-50%"] }}` (or pixel-based via `useRef` width)
- `transition: { duration: 24, ease: "linear", repeat: Infinity }` for forward
- `transition: { duration: 24, ease: "linear", repeat: Infinity, repeatType: "mirror" }` for reverse (or flip x direction)
- When `reducedMotion` is true, render static list without animation
- Remove the inline `<style>` keyframe block
- Keep `aria-hidden="true"`, keep duplicate items for seamless loop

### 6. `src/app/components/Hero.tsx`
- Import `Backdrop` is **not** needed here (Backdrop lives in App.tsx)
- After the hero image `<motion.div>`, add a **names ticker** section:
  ```tsx
  <Marquee
    items={NAMES_LIST}  // e.g. ["Alex Monroe", "Designer", "Engineer", "Maker", ...]
    className="mt-4 py-3 border-t border-border"
  />
  ```
  Export `NAMES_LIST` from `src/app/data/projects.ts` or define inline.
- Add `whileHover` to the "View work" `<a>` tag — wrap in `motion.a` with `whileHover={{ scale: 1.02 }}` (no-op when reducedMotion)

### 7. Delete `src/app/components/Cursor.tsx`
- File can remain (no side effects from unused file), but cleaner to remove if possible via shell
- The import removal in App.tsx is what matters

---

## Font token wiring detail
Tailwind v4 maps `font-sans` → `var(--font-family-sans)` and `font-mono` → `var(--font-family-mono)`. By adding those `@theme inline` entries pointing to `--font-sans` / `--font-mono`, all existing `font-mono` Tailwind classes in the components will automatically pick up JetBrains Mono, and the base body font becomes Inter Tight without touching any component files.

The `@layer base body` rule already applies `bg-background text-foreground` — we just need Tailwind to know the font family. We'll add:
```css
body {
  font-family: var(--font-sans);
}
```
inside the existing `@layer base` block in `theme.css`.

---

## Verification
1. Reload app in browser — check DevTools Computed > font-family on `body` shows "Inter Tight"
2. Check `font-family` on any `font-mono` element shows "JetBrains Mono"  
3. Verify Marquee animates smoothly and loops without jump
4. Verify no custom cursor dot appears
5. Toggle dark mode — check Backdrop layers visible (specular sheen drifting)
6. Enable `prefers-reduced-motion: reduce` in DevTools — Marquee should be static, Backdrop should not drift
7. Keyboard nav through interactive elements — focus rings still visible
