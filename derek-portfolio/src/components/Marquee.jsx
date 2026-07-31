import { motion, useReducedMotion } from "framer-motion";

const Marquee = ({ items, reverse = false, className = "" }) => {
  const reducedMotion = useReducedMotion();
  const list = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={reducedMotion ? {} : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
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
