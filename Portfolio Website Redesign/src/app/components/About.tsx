import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/use-preferences";

const TIMELINE = [
  { year: "2024", role: "Senior Engineer", org: "Stripe" },
  { year: "2022", role: "Staff Engineer", org: "Linear" },
  { year: "2020", role: "Frontend Lead", org: "Figma" },
  { year: "2018", role: "Engineer", org: "Airbnb" },
];

export function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="px-6 md:px-12 py-24 border-t border-border">
      <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Label */}
        <div className="md:col-span-2">
          <h2 className="font-mono text-xs tracking-widest uppercase text-foreground/40">
            About
          </h2>
        </div>

        {/* Bio */}
        <div className="md:col-span-5">
          <motion.p
            initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-semibold leading-snug tracking-tight text-foreground"
          >
            Eight years building products people rely on every day. I care about
            code quality, shipping velocity, and the millimeter details that
            separate good from excellent.
          </motion.p>

          <motion.p
            initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-foreground/60 leading-relaxed"
          >
            I started as a backend engineer and grew into product and design.
            Today I work across the full stack — from database schema to
            animation curve — with a preference for small teams solving hard problems.
          </motion.p>
        </div>

        {/* Portrait placeholder + timeline */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="overflow-hidden rounded bg-foreground/5 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt="Portrait of Alex Monroe"
              width={600}
              height={450}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={reducedMotion ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 py-3 border-b border-border last:border-0"
              >
                <span className="font-mono text-xs text-foreground/30 w-10">{item.year}</span>
                <span className="text-sm text-foreground">{item.role}</span>
                <span className="ml-auto font-mono text-xs text-foreground/40">{item.org}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
