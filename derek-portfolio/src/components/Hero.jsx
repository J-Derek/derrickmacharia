import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SplitType from 'split-type';
import Magnetic from './Magnetic';
import DynamicBackground from './DynamicBackground';
import profileImg from '../assets/profile.jpeg';

const Hero = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { types: 'words' });
      return () => splitTitle.revert();
    }
  }, []);

  const derrickLetters = "Derrick".split("");
  const machariaLetters = "Macharia".split("");
  
  // Stagger configurations for name transition
  const baseDelay = 0.5;
  const letterStagger = 0.04;

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden mesh-bg pt-20">
      {/* Main Content Wrapper */}
      <div className="flex-grow flex items-center justify-center w-full">
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center text-center py-10">
          
          {/* Top Circular Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-32 h-32 md:w-44 md:h-44 mx-auto mb-6 group"
          >
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/30 transition-colors duration-500"></div>
            <div className="relative z-10 w-full h-full rounded-full border-[3px] border-border overflow-hidden bg-bg-elevated shadow-xl transition-transform duration-500 group-hover:-translate-y-2">
              <img 
                src={profileImg} 
                alt="Derrick Macharia" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Hello Text */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-2"
          >
            <p className="font-sans text-sm md:text-base font-medium text-text-secondary">
              Hello, I'm
            </p>
          </motion.div>

          {/* Name with elegant clean stagger animation */}
          <h1 className="mb-4 font-display text-[clamp(40px,8vw,90px)] leading-[1] font-bold text-text-primary tracking-tight">
            <div className="flex flex-wrap justify-center items-end gap-x-3">
              <div className="block whitespace-nowrap">
                {derrickLetters.map((char, index) => (
                  <motion.span
                    key={`d-${index}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: baseDelay + index * letterStagger,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="char inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="block whitespace-nowrap">
                {machariaLetters.map((char, index) => (
                  <motion.span
                    key={`m-${index}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: baseDelay + (derrickLetters.length + index) * letterStagger,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="char inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: baseDelay + (derrickLetters.length + machariaLetters.length) * letterStagger + 0.1,
                    ease: "easeOut"
                  }}
                  className="final-dot text-accent inline-block ml-1"
                >
                  .
                </motion.span>
              </div>
            </div>
          </h1>

          {/* Professional Identity Label */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-8"
          >
            <h2 ref={titleRef} className="font-mono text-xs md:text-sm tracking-[0.2em] text-text-secondary uppercase">
              Full Stack Developer | UI/UX Designer
            </h2>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <a
                href="/DerrickMachariaCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full font-medium text-text-primary border border-border hover:border-accent hover:text-accent transition-colors bg-bg-elevated/30"
              >
                Download CV
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="bg-text-primary text-bg-primary px-8 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Contact Info
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="w-full pb-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-text-muted uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>
      
      {/* Dynamic Background */}
      <DynamicBackground />
    </section>
  );
};

export default Hero;
