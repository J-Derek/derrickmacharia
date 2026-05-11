import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Magnetic from './Magnetic';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg pt-20">
      {/* Container */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Label */}
          <motion.div variants={fadeVariants} className="mb-6">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-text-secondary uppercase">
              Based in Nairobi, Kenya
            </span>
          </motion.div>

          {/* Name */}
          <div className="mb-6 font-display text-[clamp(64px,10vw,140px)] leading-[0.9] font-bold text-text-primary tracking-tighter">
            <div className="overflow-hidden pb-2">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
              >
                Derek
              </motion.div>
            </div>
            <div className="overflow-hidden pb-4 -mt-4">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
              >
                Macharia<span className="text-accent">.</span>
              </motion.div>
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            variants={fadeVariants}
            className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed mb-6"
          >
            I build software that solves real problems.
          </motion.p>

          {/* Stack Tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-12">
            {['Flutter', 'React', 'Node.js', 'Supabase'].map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs md:text-sm px-4 py-2 rounded-full border border-border bg-bg-elevated/50 text-text-primary"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
            <Magnetic>
              <a
                href="#work"
                className="group flex items-center gap-2 bg-text-primary text-bg-primary px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
              >
                See My Work
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/derek-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-medium text-text-primary border border-border hover:border-accent hover:text-accent transition-colors"
              >
                Download CV
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-text-muted uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
