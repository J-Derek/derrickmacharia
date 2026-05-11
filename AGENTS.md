# Derek Portfolio - Agent Guide

This document contains essential context and instructions for AI agents working in this repository.

## Project Overview
This is a modern React single-page application (SPA) portfolio site built with Vite, Tailwind CSS v4, and Framer Motion. The project resides in the `derek-portfolio` directory.

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
│   ├── assets/       # Static assets like images and SVGs
│   ├── components/   # Reusable UI components (Hero, Navbar, Projects, etc.)
│   ├── data/         # Static data files (e.g., projects.js)
│   ├── pages/        # Route components (Home, ProjectDetail)
│   ├── styles/       # Global CSS including Tailwind configuration
│   ├── App.jsx       # Root layout component
│   └── main.jsx      # Entry point and router configuration
├── public/           # Public assets (favicon, icons)
├── index.html        # HTML template
├── package.json      # Dependencies and scripts
└── vite.config.js    # Vite configuration
```

## Architectural Patterns & Conventions

### Styling & Theming
The project uses Tailwind CSS v4. Notice that theme customization is handled directly in `src/styles/globals.css` using the new `@theme` directive, rather than a `tailwind.config.js` file:

```css
@theme {
  --color-bg-primary: #080808;
  --color-bg-secondary: #0f0f0f;
  /* ... */
  --color-accent: #00FF87;
}
```
Utility classes follow these custom theme names (e.g., `bg-bg-primary`, `text-accent`).

### Routing
Routing is configured in `src/main.jsx` using React Router's `createBrowserRouter`. 
- `App.jsx` serves as the layout wrapper containing global components like `Navbar`, `Footer`, `CustomCursor`, and `ScrollIndicator`, using `<Outlet />` for page content.
- Nav links handle cross-page navigation smoothly, checking `useLocation().pathname` to toggle between anchor links (`#section`) or full paths (`/#section`).

### Animations
Animations are heavily driven by `framer-motion`. Global animation settings are applied via the `<MotionConfig reducedMotion="user">` wrapper in `App.jsx` to respect user accessibility preferences.

## Gotchas & Important Notes

- **Tailwind v4 Configuration**: Do not look for or try to create a `tailwind.config.js` file. Tailwind v4 uses CSS variables and `@theme` directives in the global CSS file (`src/styles/globals.css`).
- **Working Directory**: The actual project code is nested inside the `derek-portfolio` directory. Make sure you `cd derek-portfolio` or prepend paths with `derek-portfolio/` before executing commands or reading files.
- **Component Extensions**: React components use the `.jsx` extension.
- **Routing and Hash Links**: Pay attention to how `Navbar.jsx` manages links based on the current page (`isHome ? '#work' : '/#work'`). Maintain this pattern when adding new navigational elements to ensure routing works correctly from the `ProjectDetail` page back to the home page anchors.