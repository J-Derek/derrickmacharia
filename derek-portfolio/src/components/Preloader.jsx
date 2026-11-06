import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        const increment = Math.max(4, Math.floor((100 - prev) / 3));
        return Math.min(100, prev + increment);
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (counter < 100) return;
    const timeout = setTimeout(() => onCompleteRef.current?.(), 200);
    return () => clearTimeout(timeout);
  }, [counter]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] bg-bg-primary flex flex-col items-center justify-center px-6"
    >
      <div className="relative overflow-hidden mb-4">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="font-display text-4xl md:text-6xl font-bold text-text-primary text-center"
        >
          Derrick Macharia<span className="text-accent">.</span>
        </motion.div>
      </div>

      <div className="w-64 max-w-full h-px bg-border relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-accent"
          initial={{ x: '-100%' }}
          animate={{ x: `${counter - 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="mt-4 font-mono text-sm text-text-secondary tracking-widest uppercase tabular-nums">
        {counter}%
      </div>
    </motion.div>
  );
};

export default Preloader;
