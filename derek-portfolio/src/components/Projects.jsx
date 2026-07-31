import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

/**
 * FloatingPreview — mouse-following thumbnail that appears on project hover.
 * Position is spring-animated so it lags slightly behind the cursor.
 * Projects without a screenshot fall back to a logo on the project's brand color.
 */
const FloatingPreview = ({ project, mousePos }) => {
  const springConfig = { stiffness: 280, damping: 28, mass: 0.5 };
  const springX = useSpring(mousePos.x, springConfig);
  const springY = useSpring(mousePos.y, springConfig);

  useEffect(() => {
    springX.set(mousePos.x + 24);
    springY.set(mousePos.y - 70);
  }, [mousePos.x, mousePos.y, springX, springY]);

  const hasVisual = project?.screenshot || project?.logo;

  return (
    <AnimatePresence>
      {project && hasVisual && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 pointer-events-none z-[999] w-72 h-48 rounded-2xl overflow-hidden border border-border/60 shadow-2xl"
          style={{ x: springX, y: springY }}
        >
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt={`${project.name} preview`}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-4"
              style={{ backgroundColor: `${project.color}18`, borderColor: `${project.color}30` }}
            >
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="w-20 h-20 object-contain rounded-2xl"
              />
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: project.color }}>
                {project.status}
              </span>
            </div>
          )}

          {/* Subtle overlay so the image doesn't look raw */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const displayProjects = showAll ? projects : projects.slice(0, 4);

  const handleCollapse = () => {
    setShowAll(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 md:py-40 bg-bg-primary overflow-visible relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredProject(null)}
    >
      {/* Mouse-following project thumbnail preview */}
      <FloatingPreview project={hoveredProject} mousePos={mousePos} />

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
                  onHover={setHoveredProject}
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
    </section>
  );
};

export default Projects;
