import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const [numSegments, setNumSegments] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      // Increased density for a longer vertical presence
      setNumSegments(Math.floor(window.innerHeight / 18));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 items-end pointer-events-none hidden md:flex">
      {Array.from({ length: numSegments }).map((_, i) => {
        const threshold = i / numSegments;
        return (
          <Segment key={i} progress={scrollYProgress} threshold={threshold} />
        );
      })}
    </div>
  );
};

const Segment = ({ progress, threshold }) => {
  // Use useTransform to monitor the scroll progress relative to this segment's threshold
  const active = useTransform(progress, (p) => p >= threshold);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsubscribe = active.on("change", (v) => setIsActive(v));
    return () => unsubscribe();
  }, [active]);

  return (
    <motion.div
      initial={false}
      animate={{
        width: isActive ? 24 : 8,
        backgroundColor: isActive ? '#00FF87' : 'rgba(255, 255, 255, 0.1)',
        opacity: isActive ? 1 : 0.5
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-[1.5px] rounded-full"
    />
  );
};

export default ScrollIndicator;
