import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

import ProjectCard from './ProjectCard';
import { useRef } from 'react';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const displayProjects = showAll ? projects : projects.slice(0, 4);

  const handleCollapse = () => {
    setShowAll(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-40 bg-bg-primary overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
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
          <div className="hidden md:grid grid-cols-12 pb-6 border-b border-white/5 text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
            <div className="col-span-4">Project</div>
            <div className="col-span-5">Outcome</div>
            <div className="col-span-2">Technologies</div>
            <div className="col-span-1 text-right">Link</div>
          </div>
          
          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {displayProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
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
                className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all duration-300 font-mono text-xs uppercase tracking-widest"
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
                className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all duration-300 font-mono text-xs uppercase tracking-widest"
              >
                <Minus size={16} />
                Collapse Archive
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
