const Marquee = ({ items, speed = 120, reverse = false, className = "" }) => {
  // Ensure the base copy is long enough to fill any ultra-wide screen.
  // 5 copies of the array gives ~4750px of content per wrapper.
  const baseItems = Array(5).fill(items).flat();

  const renderItems = () =>
    baseItems.map((item, i) => (
      <span
        key={i}
        className="flex-shrink-0 text-sm font-mono tracking-widest uppercase text-foreground/40"
      >
        {item}
        <span className="mx-6 text-accent">—</span>
      </span>
    ));

  return (
      <div className={`overflow-hidden ${className}`} aria-hidden="true">
        <div
          className="marquee-track flex whitespace-nowrap w-max"
          style={{
            willChange: "transform",
            animation: `scroll-left ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {/* Copy A */}
          <div className="flex shrink-0 items-center">{renderItems()}</div>
          {/* Copy B — identical */}
          <div className="flex shrink-0 items-center">{renderItems()}</div>
        </div>
      </div>
  );
};

export default Marquee;
