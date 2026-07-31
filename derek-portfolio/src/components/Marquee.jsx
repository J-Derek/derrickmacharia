import { motion, useReducedMotion } from "framer-motion";

const Marquee = ({ items, reverse = false, className = "" }) => {
  const reducedMotion = useReducedMotion();
  // Render 10 copies to ensure it covers even 4K ultra-wide screens without running out of text
  const list = Array(10).fill(items).flat();

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="flex whitespace-nowrap w-max"
        animate={reducedMotion ? {} : { x: reverse ? ["-10%", "0%"] : ["0%", "-10%"] }}
        transition={
          reducedMotion
            ? {}
            : { duration: 24, ease: "linear", repeat: Infinity }
        }
      >
        {list.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 text-sm font-mono tracking-widest uppercase text-foreground/40"
          >
            {item}
            <span className="mx-6 text-accent">—</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
