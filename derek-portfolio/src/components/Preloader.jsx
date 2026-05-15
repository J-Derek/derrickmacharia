import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg-primary flex flex-col items-center justify-center"
    >
      <div className="relative overflow-hidden mb-4">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="font-display text-4xl md:text-6xl font-bold text-text-primary"
        >
          Derrick Macharia<span className="text-accent">.</span>
        </motion.div>
      </div>
      
      <div className="w-64 h-[1px] bg-border relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-accent"
          initial={{ x: '-100%' }}
          animate={{ x: `${counter - 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      
      <div className="mt-4 font-mono text-sm text-text-muted tracking-widest uppercase">
        {counter}%
      </div>
    </motion.div>
  );
};

export default Preloader;
