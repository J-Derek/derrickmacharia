import { useEffect, useRef, useState } from 'react';
import { motion, useAnimate, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SplitType from 'split-type';
import Magnetic from './Magnetic';
import DynamicBackground from './DynamicBackground';
import profileImg from '../assets/profile.jpg';

const Hero = () => {
  const [scope, animate] = useAnimate();
  const titleRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { types: 'words' });
      return () => splitTitle.revert();
    }
  }, []);

  const name = "Derrick Macharia";
  
  // Animation Sequence
  useEffect(() => {
    const hasAnimated = sessionStorage.getItem('heroAnimated');

    const startSequence = async () => {
      if (hasAnimated) {
        // Skip animation, just show final states
        animate(".char", { opacity: 1, y: 0 }, { duration: 0 });
        animate(".final-dot", { opacity: 1 }, { duration: 0 });
        animate(".i-char-0", { clipPath: 'inset(0% 0 0 0)' }, { duration: 0 });
        animate(".i-char-1", { clipPath: 'inset(0% 0 0 0)' }, { duration: 0 });
        setAnimationStarted(true);
        return;
      }

      // 1. Initial reveal
      await animate(".char", { opacity: 1, y: 0 }, { 
        duration: 0.6, 
        delay: (i) => i * 0.04,
        ease: "easeOut"
      });

      // 2. Target acquisition
      const dotTarget = scope.current.querySelector('.final-dot');
      const i1 = scope.current.querySelector('.i-char-0');
      const i2 = scope.current.querySelector('.i-char-1');
      
      if (!dotTarget || !i1 || !i2) return;

      const containerRect = scope.current.getBoundingClientRect();
      const dotRect = dotTarget.getBoundingClientRect();
      const i1Rect = i1.getBoundingClientRect();
      const i2Rect = i2.getBoundingClientRect();

      const startX = dotRect.left - containerRect.left + (dotRect.width / 2);
      const startY = dotRect.top - containerRect.top + (dotRect.height / 2);
      const target1X = i1Rect.left - containerRect.left + (i1Rect.width / 2);
      const target1Y = i1Rect.top - containerRect.top + 5;
      const target2X = i2Rect.left - containerRect.left + (i2Rect.width / 2);
      const target2Y = i2Rect.top - containerRect.top + 5;

      // Launch position: off-screen left, high up
      const launchX = -150;
      const launchY = target1Y - 100;

      // Reset ball position to off-screen
      await animate(".bouncing-ball", { 
        x: launchX, 
        y: launchY, 
        opacity: 1, 
        scale: 1,
        backgroundColor: "#00FF87" 
      }, { duration: 0 });

      // Hide final dot
      animate(".final-dot", { opacity: 0 }, { duration: 0.1 });
      setAnimationStarted(true);

      // BOUNCE 1: Enter from left, hit i1 (Derrick)
      // Using linear X and easeOutIn Y creates a mathematically perfect parabolic arc (no pointed peaks)
      await animate(".bouncing-ball", { 
        x: [launchX, target1X],
        y: [launchY, target1Y - 220, target1Y], // High dramatic arc
      }, { 
        duration: 1.0, 
        ease: "linear", // Constant horizontal velocity
        y: { ease: ["easeOut", "easeIn"] } // Gravity effect on vertical
      });
      
      // Reveal i1
      animate(".i-char-0", { clipPath: 'inset(0% 0 0 0)', scale: [1, 1.4, 1] }, { duration: 0.3 });
      
      // BOUNCE 2: To i2 (Macharia)
      await animate(".bouncing-ball", { 
        x: [target1X, target2X],
        y: [target1Y, Math.min(target1Y, target2Y) - 100, target2Y],
      }, { 
        duration: 0.6, 
        ease: "linear",
        y: { ease: ["easeOut", "easeIn"] }
      });

      // Reveal i2
      animate(".i-char-1", { clipPath: 'inset(0% 0 0 0)', scale: [1, 1.4, 1] }, { duration: 0.3 });

      // BOUNCE 3: Home (Period)
      await animate(".bouncing-ball", { 
        x: [target2X, startX],
        y: [target2Y, Math.min(target2Y, startY) - 120, startY],
      }, { 
        duration: 0.7, 
        ease: "linear",
        y: { ease: ["easeOut", "easeIn"] }
      });

      // BOUNCE 4: Settling physics bounce 1
      await animate(".bouncing-ball", { 
        y: [startY, startY - 30, startY],
      }, { 
        duration: 0.4, 
        ease: ["easeOut", "easeIn"]
      });

      // BOUNCE 5: Settling physics bounce 2
      await animate(".bouncing-ball", { 
        y: [startY, startY - 10, startY],
      }, { 
        duration: 0.25, 
        ease: ["easeOut", "easeIn"]
      });

      // Swap
      animate(".final-dot", { opacity: 1 }, { duration: 0.1 });
      animate(".bouncing-ball", { opacity: 0 }, { duration: 0.1 });
      
      // Mark as animated for this session
      sessionStorage.setItem('heroAnimated', 'true');
    };

    const timer = setTimeout(startSequence, hasAnimated ? 0 : 1000);
    return () => clearTimeout(timer);
  }, [animate]);

  // Trail Effect Canvas Logic
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      if (scope.current) {
        canvas.width = scope.current.offsetWidth;
        canvas.height = scope.current.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId;
    const trail = [];

    const drawTrail = () => {
      const ball = scope.current?.querySelector('.bouncing-ball');
      
      // Only track if ball exists and is visible
      if (ball && window.getComputedStyle(ball).opacity !== '0') {
        const rect = ball.getBoundingClientRect();
        const parentRect = scope.current.getBoundingClientRect();
        
        // Ensure we are getting valid coordinates
        if (rect.width > 0 && rect.height > 0) {
          const x = rect.left - parentRect.left + (rect.width / 2);
          const y = rect.top - parentRect.top + (rect.height / 2);
          
          // Only push if it moved (prevents pooling dots when stationary)
          const lastPoint = trail[trail.length - 1];
          if (!lastPoint || lastPoint.x !== x || lastPoint.y !== y) {
            trail.push({ x, y, alpha: 1 });
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 1; i < trail.length; i++) {
        trail[i].alpha -= 0.03; // Fade speed
        
        if (trail[i].alpha > 0) {
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.strokeStyle = `rgba(0, 255, 135, ${trail[i].alpha})`; // Light green
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }

      // Cleanup invisible points
      while (trail.length > 0 && trail[0].alpha <= 0) {
        trail.shift();
      }

      animationFrameId = requestAnimationFrame(drawTrail);
    };

    drawTrail();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scope]);

  return (
    <section ref={scope} className="relative min-h-screen flex flex-col overflow-hidden mesh-bg pt-20">
      {/* Trail Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-[998]"
      />

      {/* Bouncing Actor */}
      <div 
        className="bouncing-ball absolute left-0 top-0 w-4 h-4 bg-accent rounded-full z-[999] pointer-events-none opacity-0 shadow-[0_0_20px_rgba(0,255,135,0.8)]"
        style={{ transform: 'translate3d(0,0,0)' }}
      />

      {/* Main Content Wrapper (Grows to take available space and center content) */}
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

          {/* Name */}
          <h1 className="mb-4 font-display text-[clamp(40px,8vw,90px)] leading-[1] font-bold text-text-primary tracking-tight">
            <div className="flex flex-wrap justify-center items-end gap-x-3">
              <div className="block whitespace-nowrap">
                {"Derrick".split("").map((char, index) => {
                  const isI = char.toLowerCase() === 'i';
                  return (
                    <motion.span
                      key={`d-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      className={`char inline-block ${isI ? 'i-char-0' : ''}`}
                      style={isI ? { clipPath: 'inset(35% 0 0 0)' } : {}}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </div>
              <div className="block whitespace-nowrap">
                {"Macharia".split("").map((char, index) => {
                  const isI = char.toLowerCase() === 'i';
                  return (
                    <motion.span
                      key={`m-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      className={`char inline-block ${isI ? 'i-char-1' : ''}`}
                      style={isI ? { clipPath: 'inset(35% 0 0 0)' } : {}}
                    >
                      {char}
                    </motion.span>
                  );
                })}
                <motion.span 
                  initial={{ opacity: 0 }}
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
            transition={{ duration: 0.6, delay: 0.6 }}
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
            transition={{ duration: 0.8, delay: 0.8 }}
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

      {/* Scroll Indicator (In Document Flow) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
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
