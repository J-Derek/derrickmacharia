import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/use-preferences";

const STACK = [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "Go", "Rust (learning)"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    category: "Tooling",
    items: ["Vite", "Docker", "Kubernetes", "Terraform"],
  },
];

export function Stack() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="stack" className="px-6 md:px-12 py-24 border-t border-border">
      <div className="max-w-[1800px] mx-auto w-full">
        <div className="flex items-end justify-between mb-12 border-b border-border pb-4">
          <h2 className="font-mono text-xs tracking-widest uppercase text-foreground/40">
            Tech stack
          </h2>
          <p className="font-mono text-xs text-foreground/30 hidden sm:block">
            Tools I reach for first
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {STACK.map((column, i) => (
            <motion.div
              key={column.category}
              initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background p-8"
            >
              <h3 className="font-mono text-xs tracking-widest uppercase text-foreground/40 mb-6">
                {column.category}
              </h3>
              <ul className="space-y-3">
                {column.items.map((item) => (
                  <li key={item} className="text-foreground text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
