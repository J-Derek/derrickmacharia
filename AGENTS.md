# Derek Portfolio - Agent Guide

This document contains essential context and instructions for AI agents working in this repository.

## Project Overview
This is a React single-page application (SPA) portfolio site built with Vite, Tailwind CSS v4, and Framer Motion. It is deployed on Vercel. The project resides in the `derek-portfolio` directory.

## Technology Stack
- **Framework**: React 19 + React Router DOM
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (using the `@tailwindcss/vite` plugin and `@theme` directives in CSS)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Module Type**: ESM (`"type": "module"` in package.json)

## Essential Commands

All commands should be run from within the `derek-portfolio` directory.

- **Install Dependencies**: `npm install`
- **Start Dev Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Run Linter**: `npm run lint`
- **Preview Production Build**: `npm run preview`

## Directory Structure

```
derek-portfolio/
├── src/
│   ├── assets/       # WebP images: logos, screenshots, profile
│   ├── components/   # Navbar, Hero, WorkIndex, About, Stack, Contact, Footer, Reveal, SectionHeader, ScrollToTop, AmbientBackground
│   ├── data/         # projects.js (project list + getMeta helper)
│   ├── hooks/        # usePreferences.js (useFinePointer)
│   ├── pages/        # Home, ProjectDetail, NotFound
│   ├── styles/       # globals.css (Tailwind + theme tokens)
│   ├── App.jsx       # Root layout
│   └── main.jsx      # Entry point and router configuration
├── scripts/          # optimize-images.mjs (one-off image conversion)
├── public/           # favicon, CV, og image
├── DESIGN.md         # Design system: read before changing UI
├── vercel.json       # SPA rewrite for Vercel
├── index.html
├── package.json
└── vite.config.js
```

## Architectural Patterns & Conventions

### Styling & Theming
Tailwind CSS v4. Theme tokens are defined in `src/styles/globals.css` with `@theme`, mapped to CSS variables that switch on `:root[data-theme]`:

```css
@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  /* ... */
}
```
Use only these colour classes: `bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted`, `text-accent`, `bg-accent`, `text-accent-foreground`, `text-danger`. Shared helpers: `.container-page`, `.label`, `.link-underline`. See `derek-portfolio/DESIGN.md`.

### Routing
Routing is configured in `src/main.jsx` using React Router's `createBrowserRouter`.
- `App.jsx` is the layout wrapper (`Navbar`, `ScrollToTop`, `Footer`) with `<Outlet />` for page content.
- Nav links check `useLocation().pathname` to switch between anchor links (`#section`) and full paths (`/#section`).

### Animations
`framer-motion`, through the single `Reveal` component. `<MotionConfig reducedMotion="user">` in `App.jsx` respects accessibility preferences. `AmbientBackground` is the canvas dot field behind the page. Scrolling is native (no smooth-scroll library).

## Gotchas & Important Notes

- **Tailwind v4 Configuration**: Do not look for or try to create a `tailwind.config.js` file. Tailwind v4 uses CSS variables and `@theme` directives in the global CSS file (`src/styles/globals.css`).
- **Working Directory**: The actual project code is nested inside the `derek-portfolio` directory. Make sure you `cd derek-portfolio` or prepend paths with `derek-portfolio/` before executing commands or reading files.
- **Component Extensions**: React components use the `.jsx` extension.
- **Routing and Hash Links**: Pay attention to how `Navbar.jsx` manages links based on the current page (`isHome ? '#work' : '/#work'`). Maintain this pattern when adding new navigational elements to ensure routing works correctly from the `ProjectDetail` page back to the home page anchors.