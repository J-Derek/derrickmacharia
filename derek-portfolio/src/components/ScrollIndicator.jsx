import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollIndicator — Two-layer GPU-driven architecture.
 *
 * Background layer: N static grey dashes — pure HTML, zero JS after mount.
 * Foreground layer: N identical green dashes inside a clipping container whose
 *   height is driven directly by scrollYProgress as a MotionValue.
 *
 * This means ZERO React state, ZERO per-segment subscriptions, ZERO re-renders
 * on scroll. Framer Motion updates the clip container height via rAF DOM
 * mutations entirely off the React render cycle.
 */

const NUM_SEGMENTS = 40;

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();

  // Map scroll 0→1 to container height 0%→100% — single MotionValue, no state
  const clipHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block pointer-events-none"
      style={{ position: 'fixed' }}
    >
      {/* ── Background layer: static grey dashes, never re-render ── */}
      <div className="flex flex-col gap-2 items-end">
        {Array.from({ length: NUM_SEGMENTS }).map((_, i) => (
          <div
            key={i}
            style={{ width: 8, height: 1.5 }}
            className="rounded-full bg-white/10"
          />
        ))}
      </div>

      {/* ── Foreground layer: green dashes, clipped by animated height ── */}
      <motion.div
        className="absolute top-0 right-0 overflow-hidden flex flex-col gap-2 items-end"
        style={{ height: clipHeight, width: '100%' }}
      >
        {Array.from({ length: NUM_SEGMENTS }).map((_, i) => (
          <div
            key={i}
            style={{ width: 24, height: 1.5 }}
            className="rounded-full bg-accent"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;
