import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "../hooks/use-preferences";

export function Cursor() {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const rafRef = useRef<number | null>(null);

  const springConfig = reducedMotion
    ? { stiffness: 10000, damping: 1000 }
    : { stiffness: 500, damping: 40 };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const s = useSpring(scale, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        rafRef.current = null;
      });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [data-hover]")) {
        scale.set(2.5);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [data-hover]")) {
        scale.set(1);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY, scale]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] top-0 left-0"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      aria-hidden="true"
    >
      <motion.div
        className="rounded-full bg-foreground mix-blend-difference"
        style={{ scale: s, width: 10, height: 10 }}
      />
    </motion.div>
  );
}
