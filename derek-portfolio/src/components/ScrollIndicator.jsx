import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollIndicator — Two-layer GPU-driven architecture.
 *
 * Background layer: N static grey dashes.
 * Foreground layer: N identical green dashes inside a container.
 * 
 * Instead of animating height (which causes flex children to shrink/squish),
 * we animate the clip-path inset from bottom to top, revealing the dashes
 * flawlessly as you scroll.
 */

const NUM_SEGMENTS = 40;

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();

  // Map scroll 0→1 to an inset bottom value 100%→0%
  const clipPath = useTransform(
    scrollYProgress,
    (v) => `inset(0% 0% ${(1 - Math.min(1, Math.max(0, v))) * 100}% 0%)`
  );

  // We use motion.div with a style template to apply the clip-path
  return (
    <div
      aria-hidden="true"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block pointer-events-none"
    >
      {/* ── Background layer: static dashes with theme-adaptive contrast ── */}
      <div className="flex flex-col gap-2 items-end">
        {Array.from({ length: NUM_SEGMENTS }).map((_, i) => (
          <div
            key={i}
            style={{ width: 8, height: 1.5 }}
            className="rounded-full bg-foreground/20"
          />
        ))}
      </div>

      {/* ── Foreground layer: green dashes, revealed via clip-path ── */}
      <motion.div
        className="absolute inset-0 flex flex-col gap-2 items-end"
        style={{ clipPath }}
      >
        {Array.from({ length: NUM_SEGMENTS }).map((_, i) => (
          <div
            key={i}
            style={{ width: 24, height: 1.5 }}
            className="rounded-full bg-accent flex-shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;
