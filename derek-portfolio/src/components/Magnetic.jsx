import { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import PropTypes from 'prop-types';

export default function Magnetic({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const springConfigOuter = { stiffness: 100, damping: 15, mass: 0.1 };
  const springConfigInner = { stiffness: 150, damping: 15, mass: 0.1 };

  const springX = useSpring(0, springConfigOuter);
  const springY = useSpring(0, springConfigOuter);
  
  const springInnerX = useSpring(0, springConfigInner);
  const springInnerY = useSpring(0, springConfigInner);

  useEffect(() => {
    springX.set(position.x * 0.2);
    springY.set(position.y * 0.2);
    springInnerX.set(position.x * 0.35);
    springInnerY.set(position.y * 0.35);
  }, [position, springX, springY, springInnerX, springInnerY]);

  return (
    <motion.div
      style={{ position: 'relative', x: springX, y: springY, display: 'inline-block' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      <motion.div style={{ x: springInnerX, y: springInnerY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
};
