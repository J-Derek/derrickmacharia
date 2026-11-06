import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLenis } from "lenis/react";
import Marquee from "./Marquee";

const MotionLink = motion.create(Link);

const NAMES_TICKER = [
  "Derrick Macharia",
  "Full-Stack Dev",
  "UI/UX Enthusiast",
  "React & Node",
  "Open to Projects",
  "Engineering × Design",
];

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();

  const scrollToWork = (e) => {
    const el = document.getElementById("work");
    if (el && lenis) {
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    }
  };

  const fadeUp = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section className="relative min-h-screen flex flex-col justify-end pt-32 pb-16 px-6 md:px-12 overflow-hidden">
      <div className="relative z-10 max-w-[1800px] mx-auto w-full">
        <motion.p
          {...fadeUp(0.1)}
          className="font-mono text-xs tracking-widest uppercase text-foreground/40 mb-8"
        >
          Full-stack developer — creative engineer
        </motion.p>

        <motion.h1
          {...fadeUp(0.2)}
          className="font-bold leading-none tracking-tight text-foreground"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 12rem)",
            fontFamily: "inherit",
          }}
        >
          Derrick
          <br />
          Macharia
        </motion.h1>

        <motion.div
          {...fadeUp(0.4)}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-end gap-8 justify-between"
        >
          <p className="max-w-sm text-foreground/60 text-base leading-relaxed">
            Building products at the intersection of engineering and design.
            Crafting elegant, high-performance web experiences.
          </p>
          <MotionLink
            to="/#work"
            onClick={scrollToWork}
            whileHover={reducedMotion ? {} : { scale: 1.02 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-3 px-6 py-3 border border-foreground text-foreground text-sm font-mono tracking-widest uppercase hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
          >
            View work
          </MotionLink>
        </motion.div>
      </div>

      {/* Hero image strip */}
      <motion.div
        {...fadeUp(0.5)}
        className="mt-16 overflow-hidden rounded relative"
      >
        <img
          src="/workspace.jpg"
          alt=""
          aria-hidden="true"
          width={1800}
          height={600}
          loading="eager"
          className="w-full h-[240px] md:h-[400px] object-cover grayscale opacity-80 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      </motion.div>

      <motion.div {...fadeUp(0.65)}>
        <Marquee
          items={NAMES_TICKER}
          className="mt-4 py-3 border-t border-border"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
