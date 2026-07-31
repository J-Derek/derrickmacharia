import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/use-preferences";
import { Marquee } from "./Marquee";

const NAMES_TICKER = [
  "Alex Monroe",
  "Full-Stack Dev",
  "Product Designer",
  "San Francisco",
  "Open to Projects",
  "Engineering × Design",
];

export function Hero() {
  const reducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section className="relative min-h-screen flex flex-col justify-end pt-16 pb-16 px-6 md:px-12 overflow-hidden">
      {/* Background strip */}
      <div className="absolute inset-x-0 top-1/3 h-px bg-border" aria-hidden="true" />

      <div className="relative z-10 max-w-[1800px] mx-auto w-full">
        <motion.p
          {...fadeUp(0.1)}
          className="font-mono text-xs tracking-widest uppercase text-foreground/40 mb-8"
        >
          Full-stack developer — product designer
        </motion.p>

        <motion.h1
          {...fadeUp(0.2)}
          className="font-bold leading-none tracking-tight text-foreground"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 12rem)",
            fontFamily: "inherit",
          }}
        >
          Alex
          <br />
          Monroe
        </motion.h1>

        <motion.div
          {...fadeUp(0.4)}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-end gap-8 justify-between"
        >
          <p className="max-w-sm text-foreground/60 text-base leading-relaxed">
            Building products at the intersection of engineering and design.
            Based in San Francisco, open to select projects.
          </p>
          <motion.a
            href="#work"
            whileHover={reducedMotion ? {} : { scale: 1.02 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-3 px-6 py-3 border border-foreground text-foreground text-sm font-mono tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            View work
          </motion.a>
        </motion.div>
      </div>

      {/* Hero image strip */}
      <motion.div
        {...fadeUp(0.5)}
        className="mt-16 overflow-hidden rounded"
      >
        <img
          src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1800&q=85"
          alt="Abstract workspace"
          width={1800}
          height={600}
          loading="eager"
          className="w-full h-[240px] md:h-[400px] object-cover"
        />
      </motion.div>

      <motion.div {...fadeUp(0.65)}>
        <Marquee
          items={NAMES_TICKER}
          className="mt-4 py-3 border-t border-border"
        />
      </motion.div>
    </section>
  );
}
