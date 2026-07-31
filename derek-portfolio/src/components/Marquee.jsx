import { useReducedMotion } from "framer-motion";

const Marquee = ({ items, reverse = false, className = "" }) => {
  const reducedMotion = useReducedMotion();
  // Render 10 copies to ensure it covers even 4K ultra-wide screens without running out of text
  const list = Array(10).fill(items).flat();

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="flex whitespace-nowrap w-max"
        style={
          reducedMotion
            ? {}
            : {
                animation: `marquee 40s linear infinite`,
                animationDirection: reverse ? "reverse" : "normal",
              }
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
      </div>
    </div>
  );
};

export default Marquee;
