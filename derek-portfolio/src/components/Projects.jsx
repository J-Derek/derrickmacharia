import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

import ProjectCard from './ProjectCard';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const displayProjects = showAll ? projects : projects.slice(0, 4);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  const handleCollapse = () => {
    setShowAll(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="work" 
      ref={sectionRef} 
      className="py-24 md:py-40 bg-bg-primary overflow-visible relative"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <span className="font-mono text-sm tracking-widest text-accent uppercase block mb-6">
              02 // Selected Works
            </span>
            <h2 className="font-display text-[clamp(40px,8vw,90px)] leading-[0.95] font-bold text-text-primary tracking-tighter">
              Software built<br />for the real world.
            </h2>
          </div>
          <div className="md:mb-4">
            <p className="text-text-secondary max-w-xs text-lg leading-relaxed">
              A curated collection of digital solutions focused on efficiency, accessibility, and real-world impact.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col">
          <div className="hidden md:grid grid-cols-12 pb-6 border-b border-border text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
            <div className="col-span-4">Project</div>
            <div className="col-span-5">Outcome</div>
            <div className="col-span-2">Technologies</div>
            <div className="col-span-1 text-right">Link</div>
          </div>
          
          <div className="flex flex-col">
            <AnimatePresence>
              {displayProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onHover={setActiveProject}
                />
              ))}
            </AnimatePresence>
          </div>

          {!showAll && projects.length > 4 && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-12 flex justify-center"
            >
              <button
                onClick={() => setShowAll(true)}
                className="group flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-accent hover:text-accent transition-all duration-300 font-mono text-xs uppercase tracking-widest bg-bg-secondary/50 backdrop-blur-sm"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                View Full Archive ({projects.length - 4} more)
              </button>
            </motion.div>
          )}

          {showAll && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 flex justify-center"
            >
              <button
                onClick={handleCollapse}
                className="group flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-accent hover:text-accent transition-all duration-300 font-mono text-xs uppercase tracking-widest bg-bg-secondary/50 backdrop-blur-sm"
              >
                <Minus size={16} />
                Collapse Archive
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Image Preview */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              x: mousePos.x - 150, // Center relative to 300px width
              y: mousePos.y - 150,
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.5 }}
            className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[100] hidden md:block overflow-hidden rounded-2xl shadow-2xl border border-white/10"
          >
            <div className="w-full h-full relative bg-bg-elevated flex items-center justify-center p-12">
              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-20 blur-3xl transition-colors duration-500"
                style={{ backgroundColor: activeProject.color }}
              />
              <img 
                src={activeProject.logo} 
                alt={activeProject.name}
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
