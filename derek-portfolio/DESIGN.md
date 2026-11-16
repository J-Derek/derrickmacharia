# DESIGN.md — Derrick Macharia Portfolio

Style: editorial minimal. Few elements, large serif type, generous space, hairlines, one restrained accent.

## Principles
- One container (`.container-page`, max 1280px) for every section so all edges align.
- Type does the work. The only decoration is the quiet dot field behind the page (`AmbientBackground.jsx`): a slow wave of light drifts across it and dots near the cursor swell and take the accent colour. No gradients, shadows, glass panels, marquees or video backgrounds.
- One accent colour, used only for the availability dot, focus rings, selection and button hover.
- Motion: a single fade-and-rise on scroll (`Reveal.jsx`), plus the dot field. The dot field runs at about 30 fps on one small canvas, pauses when the tab is hidden, and is drawn once (static) for reduced motion.
- No invented content: no metrics, testimonials or client names that are not real.

## Fonts
- Display: Instrument Serif 400. Headlines and project names only. Not italic.
- Body and UI: Inter Tight 400/500/600.
- No monospace. Numbers use `tabular-nums`.

## Tokens (`src/styles/globals.css`)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#f7f7f5` | `#0e0e0d` | Page |
| `--foreground` | `#121211` | `#ecebe7` | Text |
| `--card` | `#eeeeeb` | `#181817` | Image panels |
| `--border` | `rgba(18,18,17,.12)` | `rgba(236,235,231,.14)` | Hairlines |
| `--muted` | `#66665f` | `#a3a29b` | Secondary text, labels |
| `--accent` | `#7c2d12` | `#e0a17a` | Dot, focus, selection, hover fill |
| `--accent-foreground` | `#f7f7f5` | `#0e0e0d` | Text on accent |
| `--danger` | `#b3261e` | `#ff8a80` | Form errors |

Tailwind classes: `bg-background text-foreground bg-card border-border text-muted text-accent bg-accent text-accent-foreground text-danger font-sans font-serif`. Do not use any other colour class.

Theme: light by default, follows the system preference on first visit, then the saved choice (`localStorage.theme`). Set before first paint in `index.html`.

## Type scale
- Hero name: `font-serif`, `clamp(3.25rem, 10vw, 8.5rem)`, line-height 0.95.
- Project title on its page: `clamp(3rem, 9vw, 8rem)`.
- Section statement: `font-serif text-4xl md:text-6xl leading-[1.05]`.
- List title: `font-serif text-3xl md:text-5xl`.
- Lead: `text-lg md:text-xl text-muted`. Body: `text-base` or `text-lg`, `leading-relaxed`.
- `.label`: 13px, medium, uppercase, tracking 0.08em, muted.

## Layout
- Sections: `border-t border-border py-24 md:py-36`, each opened by `SectionHeader`.
- 12-column grid at `md` and up; single column below.
- Radius: `rounded-sm` on images, `rounded-full` on pills. Nothing else is rounded.

## Components
- `.link-underline`: underline grows from the left on hover and focus.
- Buttons: filled pills for the main actions (hero `Get in touch`, contact submit, 404 `Back home`), one outlined pill (Resume). Everything else is a text link.
- Form fields: bottom border only, visible label above.
- Work rows: number, name, category, year; name shifts 8px on hover; image preview follows the pointer on fine pointers only.
