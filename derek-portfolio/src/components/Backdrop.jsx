import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const Backdrop = () => {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Parallax: orbs drift upward at different rates as user scrolls
  const sheenY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const bloomY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const depthY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);

  // Grain animation: shift SVG filter seed to simulate film grain movement
  const grainAnim = reducedMotion
    ? {}
    : {
        animate: { x: ["0%", "1.5%", "-1%", "0.5%", "0%"], y: ["0%", "-1%", "1.5%", "-0.5%", "0%"] },
        transition: { duration: 0.18, ease: "linear", repeat: Infinity },
      };

  const sheenDrift = reducedMotion
    ? {}
    : {
        animate: {
          x: ["0%", "14%", "-6%", "4%", "0%"],
          y: ["0%", "-12%", "8%", "-4%", "0%"],
        },
        transition: { duration: 22, ease: "easeInOut", repeat: Infinity },
      };

  const bloomDrift = reducedMotion
    ? {}
    : {
        animate: {
          x: ["0%", "-18%", "10%", "-5%", "0%"],
          y: ["0%", "14%", "-10%", "6%", "0%"],
        },
        transition: { duration: 30, ease: "easeInOut", repeat: Infinity },
      };

  const depthDrift = reducedMotion
    ? {}
    : {
        animate: {
          x: ["0%", "8%", "-14%", "6%", "0%"],
          y: ["0%", "10%", "-6%", "14%", "0%"],
        },
        transition: { duration: 26, ease: "easeInOut", repeat: Infinity },
      };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Specular sheen — large diffuse radial, upper-left */}
      <motion.div style={reducedMotion ? {} : { y: sheenY }} className="absolute inset-0">
        <motion.div
          {...sheenDrift}
          className="absolute"
          style={{
            top: "-25%",
            left: "-15%",
            width: "80%",
            height: "80%",
            background:
              "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.055) 0%, transparent 68%)",
            willChange: "transform",
          }}
        />
      </motion.div>

      {/* Accent bloom — lime tint, lower-right */}
      <motion.div style={reducedMotion ? {} : { y: bloomY }} className="absolute inset-0">
        <motion.div
          {...bloomDrift}
          className="absolute"
          style={{
            bottom: "-15%",
            right: "-20%",
            width: "65%",
            height: "65%",
            background:
              "radial-gradient(ellipse at center, rgba(200, 255, 71, 0.055) 0%, transparent 65%)",
            willChange: "transform",
          }}
        />
      </motion.div>

      {/* Depth orb — warm/cool tint, center-left */}
      <motion.div style={reducedMotion ? {} : { y: depthY }} className="absolute inset-0">
        <motion.div
          {...depthDrift}
          className="absolute"
          style={{
            top: "30%",
            left: "20%",
            width: "55%",
            height: "55%",
            background:
              "radial-gradient(ellipse at center, rgba(80, 40, 140, 0.07) 0%, transparent 70%)",
            willChange: "transform",
          }}
        />
      </motion.div>

      {/* Legibility scrim — keeps content readable */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(8, 8, 8, 0.3)" }}
      />

      {/* Film grain */}
      <motion.div
        {...grainAnim}
        className="absolute inset-0"
        style={{
          opacity: 0.055,
          mixBlendMode: "overlay",
          filter: "url(#grain)",
        }}
      />

      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Backdrop;
