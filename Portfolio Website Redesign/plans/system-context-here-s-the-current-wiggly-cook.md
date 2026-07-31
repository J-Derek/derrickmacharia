# Implementation Plan: Portfolio Refactor

## Context
`src/app/App.tsx` is a 944-line monolith with three critical accessibility defects (unconditional `cursor:none`, keyboard-inaccessible work index, no `prefers-reduced-motion` handling), an AI-template Process section, broken reverse marquee, and no mobile nav. The accepted plan is to split it into modular files, fix all defects, replace Process with a Stack section, and de-AI the copy/ornament—keeping the generic "Alex Monroe" placeholder persona for now.

Do NOT edit `src/styles/theme.css` or `src/styles/fonts.css`. Do NOT use `@figma/astraui-kit`.

---

## Files to Create / Modify

### New files
| Path | Purpose |
|---|---|
| `src/app/data/projects.ts` | PROJECTS array + Project type |
| `src/app/hooks/use-preferences.ts` | `useFinePointer()` + `useReducedMotion()` |
| `src/app/components/Cursor.tsx` | Custom cursor (pointer:fine guard) |
| `src/app/components/Marquee.tsx` | Fixed seamless marquee |
| `src/app/components/Nav.tsx` | Top nav + mobile drawer + dark toggle |
| `src/app/components/Hero.tsx` | Full-viewport hero |
| `src/app/components/WorkIndex.tsx` | Keyboard-accessible work rows |
| `src/app/components/About.tsx` | Bio + timeline |
| `src/app/components/Stack.tsx` | Engineering-first tech stack (replaces Process) |
| `src/app/components/Contact.tsx` | Contact form with proper labels |
| `src/app/components/Footer.tsx` | Footer |

### Modified
- `src/app/App.tsx` — thin orchestrator, imports all components above

---

## Implementation Steps

### 1. Data & hooks
- `data/projects.ts`: export `Project` interface + `PROJECTS` array (keep existing 5 projects)
- `hooks/use-preferences.ts`: `useFinePointer` → `window.matchMedia('(pointer:fine)')`, `useReducedMotion` → `window.matchMedia('(prefers-reduced-motion:reduce)')`

### 2. Accessibility fixes
- **Cursor**: wrap in `{useFinePointer && <Cursor />}`, add `style={{cursor:'none'}}` only when fine-pointer detected
- **WorkIndex rows**: change `motion.div` → `motion.li` inside `<ul role="list">`, add `tabIndex={0}`, keyboard handlers `onKeyDown` for Enter/Space to open project, `onFocus`/`onBlur` for preview image
- **Reduced motion**: in `useReducedMotion()`, when true → disable spring animations (pass `duration:0` or skip animate props), disable marquee animation, skip cursor spring
- **Form labels**: add `id` to each input/textarea, add `htmlFor` to each `<label>`
- **Focus rings**: ensure `focus-visible:ring-2 ring-accent` on all interactive elements

### 3. Stack section (replaces Process)
Four columns: Languages (TypeScript, Python, Rust), Frontend (React, Next.js, Tailwind), Backend (Node, Postgres, Redis), Tooling (Vite, Docker, CI/CD). Clean minimal card per column, no AI-isms.

### 4. De-AI / copy cleanup
- Remove aphorism block from Hero ("Design is not just…")
- Remove ✦ and ↗ decorative glyphs throughout
- Remove "Discover / Define / Design / Deliver" entirely (replaced by Stack)
- Hero descriptor: "Full-stack developer and product designer" (plain, honest)

### 5. Performance
- Fix Marquee: duplicate list once (not twice), `forwards` animation only, `animation-play-state:paused` on hover if !reducedMotion
- Add `width` + `height` to all `<img>` elements; use `loading="lazy"` except hero image (`loading="eager"`)
- Throttle cursor `mousemove` with `requestAnimationFrame`
- Mobile nav: render drawer only when open (gate subtree)

### 6. Responsiveness
- Mobile nav: hamburger button (visible < md), full-screen overlay drawer with links
- WorkIndex: on mobile (< md) show static project list (no hover preview), preview image hidden
- Hero font already uses clamp(); ensure minimum 320px floor

---

## Verification
1. `npm run build` (or equivalent) — no TypeScript errors
2. Tab through entire page — all interactive elements reachable and visually focused
3. Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce" — no motion
4. Toggle pointer to coarse (touch) — cursor hidden, no `cursor:none` on body
5. Resize 320px → 1440px — no horizontal overflow, mobile nav appears/works
6. Lighthouse accessibility audit — score ≥ 90
7. Marquee — both strips loop seamlessly with no jump
