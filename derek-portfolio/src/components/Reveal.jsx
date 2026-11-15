import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/** Fade-and-rise once when scrolled into view. Disabled by MotionConfig for reduced motion. */
const Reveal = ({ children, delay = 0, className, as = 'div' }) => {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
