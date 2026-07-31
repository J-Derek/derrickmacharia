import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 400, damping: 28, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('.cursor-hover')) {
        setCursorState('view');
      } else if (e.target.closest('a') || e.target.closest('button')) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseEnterDoc = () => setIsVisible(true);
    const handleMouseLeaveDoc = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnterDoc);
    document.addEventListener('mouseleave', handleMouseLeaveDoc);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnterDoc);
      document.removeEventListener('mouseleave', handleMouseLeaveDoc);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY]);

  const sizes = {
    default: 16,
    hover: 48,
    view: 80
  };

  const size = sizes[cursorState];

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        backgroundColor: cursorState === 'view' ? 'var(--color-bg-primary)' : 'var(--color-accent)',
        border: cursorState === 'default' ? 'none' : '1px solid var(--color-accent)',
      }}
    >
      {cursorState === 'view' && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[10px] font-bold tracking-widest text-accent"
        >
          VIEW
        </motion.span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
