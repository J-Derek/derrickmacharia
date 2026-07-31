export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  url?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Pulse",
    category: "Product Design / Engineering",
    year: "2024",
    description:
      "Real-time analytics dashboard for distributed systems. Built with React, WebSockets, and a custom charting layer that renders 50k data points at 60fps.",
    tags: ["React", "TypeScript", "WebSockets", "D3"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: 2,
    title: "Meridian",
    category: "Full-Stack / Design System",
    year: "2024",
    description:
      "Component library and design system powering three product teams. Tokens-first architecture with automated Figma sync and per-team theming.",
    tags: ["Design Systems", "Storybook", "Figma API", "CSS"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: 3,
    title: "Forma",
    category: "iOS / Engineering",
    year: "2023",
    description:
      "Spatial audio tools for music producers. Custom Swift DSP pipeline processing audio in under 3ms latency with a native Metal-rendered waveform editor.",
    tags: ["Swift", "Metal", "CoreAudio", "AVFoundation"],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
  },
  {
    id: 4,
    title: "Atelier",
    category: "Web / Commerce",
    year: "2023",
    description:
      "E-commerce platform for independent fashion labels. Server components, edge caching, and a custom checkout flow that cut conversion drop-off by 34%.",
    tags: ["Next.js", "Postgres", "Stripe", "Vercel"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  },
  {
    id: 5,
    title: "Ember",
    category: "Infrastructure / DevTools",
    year: "2022",
    description:
      "Internal deployment CLI for a 40-person engineering org. Replaced a fragile bash maze with a typed Go binary, cutting deploy times from 18 min to 4 min.",
    tags: ["Go", "Docker", "Kubernetes", "Terraform"],
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5734c3d5?w=800&q=80",
  },
];

export const MARQUEE_ITEMS = [
  "Full-Stack Engineering",
  "Product Design",
  "Design Systems",
  "iOS Development",
  "Infrastructure",
  "Open Source",
];
