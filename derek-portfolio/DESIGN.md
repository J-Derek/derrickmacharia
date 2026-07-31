# DESIGN.md — Derrick Macharia Portfolio Design System

> **Style Identity:** Split Studio (Awwwards-grade Editorial Minimal)  
> **Source of Truth:** Derived from Hallmark DNA extraction + Claude Opus 5 Review & HCI Principles  
> **Target Base:** React 19 + Tailwind CSS v4 + Framer Motion  

---

## 1. Design Philosophy & HCI Principles

- **Fitts's Law:** All touch & click targets must be >= 44x44px with generous padding.
- **Hick's Law:** Clear visual hierarchy per section — maximum 1 primary CTA above the fold.
- **Miller's Law & Ergonomics:** Max-width container capped at 1320px to maintain optimal line-lengths (50–75 characters) for reading.
- **Affordances & Consequence Matching:** Interactive elements carry hover lifts (`transform: translateY(-2px)`), high-contrast focus rings, and explicit cursor cues.
- **Anti-AI-Slop:** No invented metrics, no generic centered heroes, no emoji icons, no raw hex improvisation.

---

## 2. Color Palette & Contrast Tokens

### Dark Mode (Default — `paper L < 30`)
| Token Name | Value | Usage / Description |
|------------|-------|---------------------|
| `--background` | `#080808` | Deep near-black background |
| `--foreground` | `#f0ede8` | Warm off-white primary text |
| `--card` | `#111111` | Surface fill for cards & containers |
| `--border` | `rgba(240, 237, 232, 0.1)` | Hairline section & row borders |
| `--muted-foreground` | `#7a7774` | Secondary text / metadata |
| `--accent` | `#c8ff47` | Electric lime for glows, badges, borders |
| `--accent-foreground` | `#0c0c0c` | Text ON lime elements (WCAG AAA) |
| `--accent-text` | `#b5f524` | Text-colored accent (passes 4.5:1 contrast against `#080808`) |
| `--ring` | `#c8ff47` | Accessible focus ring color |

### Light Mode (`.dark` removed)
| Token Name | Value | Usage / Description |
|------------|-------|---------------------|
| `--background` | `#f0ede8` | Warm parchment off-white |
| `--foreground` | `#0c0c0c` | Ink black primary text |
| `--card` | `#e8e4de` | Muted cream card surface |
| `--border` | `rgba(12, 12, 12, 0.12)` | Dark hairline borders |
| `--muted-foreground` | `#6b6862` | Secondary text |
| `--accent` | `#008c4a` | Deep emerald green for accessible text/links |
| `--accent-foreground` | `#ffffff` | Text ON accent elements |
| `--ring` | `#008c4a` | Focus ring color |

---

## 3. Typography System

| Role | Font Family | Weights | Fluid Scale / Size |
|------|-------------|---------|-------------------|
| **Display (H1)** | `Inter Tight`, sans-serif | 700 / Bold | `clamp(3.2rem, 7.5vw, 6.5rem)` |
| **Section Head (H2)** | `Inter Tight`, sans-serif | 600 / SemiBold | `clamp(2rem, 4vw, 3.5rem)` |
| **Subhead (H3)** | `Inter Tight`, sans-serif | 500 / Medium | `clamp(1.25rem, 2vw, 1.75rem)` |
| **Body Text** | `Inter Tight`, sans-serif | 400 / Normal | `1rem` (16px), line-height `1.65` |
| **Labels & Eyebrows** | `JetBrains Mono`, monospace | 400 / 500 | `0.75rem` (12px), `tracking-[0.16em]` uppercase |

> **Hard Rule:** Headings are ALWAYS upright (`font-style: normal`). No italicized display headers.

---

## 4. Backdrop & Motion Rules

### Backdrop Structure (`Backdrop.jsx`)
- **Layer 1:** Base background (`bg-background`).
- **Layer 2:** Specular Sheen — `radial-gradient` (top-left off-axis highlight).
- **Layer 3:** Accent Bloom — `radial-gradient` with lime tint (bottom-right).
- **Layer 4:** Depth Orb — `radial-gradient` (center-left).
- **Layer 5:** Film Grain — Inline SVG `<feTurbulence>` filter with `mix-blend-mode: overlay` at 4–5% opacity.
- **Parallax:** Driven via Framer Motion `useScroll()` + `useTransform()`.
- **GPU Optimization:** `will-change: transform` on animated blobs.

### Microinteractions & Easing
- **Primary Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Apple/Linear smooth feel).
- **Hover Lift:** `scale(1.02)` or `translateY(-2px)` with 180ms transition.
- **Focus Rings:** `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`.
- **Reduced Motion:** When `prefers-reduced-motion: reduce` is active, all background drift stops, reveal animations collapse to instant opacity crossfades (`duration: 0.1`).

---

## 5. Component Specifications

### Navbar (`Navbar.jsx`)
- Fixed header (`h-16`), `backdrop-blur-md bg-background/80`, hairline bottom border.
- Left: "DM" logo in `JetBrains Mono`.
- Right: Work, About, Contact links + Theme Toggle button + Mobile Drawer.

### Hero (`Hero.jsx`)
- Eyebrow: `FULL-STACK DEVELOPER — PRODUCT DESIGNER`.
- Display Headline: Fluid clamp `Derrick Macharia`.
- Concise 2-line value proposition focusing on shipping real products (KPLC AutoBite, CrochetHub, Kiu Fresh, M-Pesa).
- "View Work" primary CTA + "Download CV" secondary.
- Embedded skills ticker (`Marquee.jsx`) flush beneath hero.

### Work Index (`WorkIndex.jsx`)
- Editorial table layout displaying Derrick's 11 real projects.
- Columns: Number (`01`–`11`), Title, Stack/Category, Year/Status.
- Floating Preview: 288x176px image container following cursor (guarded by `(pointer: fine)` and `!prefers-reduced-motion`).
- Keyboard Accessible: `tabIndex={0}`, `Enter`/`Space` triggers detail view or live URL.

### Tech Stack (`Stack.jsx`)
- 4-Column Grid with hairline `border` trick:
  1. **Languages & Frameworks** (Flutter, Dart, React, Next.js, TypeScript, Node.js)
  2. **Frontend & Design** (Tailwind CSS, Framer Motion, Figma, UI/UX Research)
  3. **Backend & Databases** (Supabase, Firebase, PostgreSQL, REST APIs, M-Pesa STK)
  4. **Tooling & Infra** (Vite, Git, GitHub, Docker, Vercel, Netlify)

### Contact (`Contact.jsx`)
- `5+7` split layout.
- Direct Email: `derrickmacharia2022@gmail.com` with 1-click copy feature.
- Location: Nairobi, Kenya.
- Fully labeled contact form with real-time success feedback.

---

## 6. Verification & Quality Gates

1. **Accessibility Gate:** 100% keyboard navigable with visible focus indicators.
2. **Performance Gate:** Zero WebGL/Three.js overhead; steady 60fps scroll.
3. **Contrast Gate:** WCAG AA (minimum 4.5:1 ratio) on all body text and labels in both dark and light modes.
4. **Responsive Gate:** Perfect scaling from 320px floor up to 2560px ultrawide without horizontal scroll.
