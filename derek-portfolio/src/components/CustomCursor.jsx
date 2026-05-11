import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('default');

  useEffect(() => {
    // Only run on desktop/devices with a pointer
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('.cursor-hover') || e.target.classList?.contains('cursor-hover')) {
        setCursorState('view');
      } else if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Hide cursor completely on touch devices
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "var(--color-accent)",
      mixBlendMode: "normal",
      opacity: 1
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "var(--color-accent-dim)",
      border: "1px solid var(--color-accent)",
      mixBlendMode: "screen",
      opacity: 1
    },
    view: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "var(--color-bg-primary)",
      border: "1px solid var(--color-accent)",
      mixBlendMode: "normal",
      opacity: 1
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-opacity duration-300 flex items-center justify-center overflow-hidden"
      variants={variants}
      animate={cursorState}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    >
      <span className={`font-mono text-[10px] font-medium tracking-widest text-accent transition-opacity duration-300 ${cursorState === 'view' ? 'opacity-100' : 'opacity-0'}`}>
        VIEW
      </span>
    </motion.div>
  );
};

export default CustomCursor;
