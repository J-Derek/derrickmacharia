import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { useFinePointer } from "../hooks/usePreferences";
import { useReducedMotion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";

function ProjectRow({ project, index, onHover, onLeave, active, reducedMotion }) {
  const finePointer = useFinePointer();
  const navigate = useNavigate();

  const handleMouseMove = useCallback(
    (e) => {
      if (finePointer) onHover(project.id, e.clientX, e.clientY);
    },
    [finePointer, onHover, project.id]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(`/project/${project.id}`);
    }
  };

  const handleClick = () => navigate(`/project/${project.id}`);

  const year = project.status.includes('·') ? project.status.split('·')[1].trim() : 'Present';
  const category = project.stack && project.stack.length > 0 ? project.stack[0] : 'Project';

  return (
    <motion.li
      initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
      exit={reducedMotion ? {} : { opacity: 0, y: -16 }}
      transition={{ delay: (index % 5) * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 py-6 border-b border-border cursor-pointer transition-colors ${active ? "text-foreground" : "text-foreground/60 hover:text-foreground"}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={onLeave}
      onFocus={() => finePointer && onHover(project.id, 0, 0)}
      onBlur={onLeave}
      onClick={handleClick}
      tabIndex={0}
      role="link"
      aria-label={`${project.name} — ${category}, ${year}`}
      onKeyDown={handleKeyDown}
    >
      <span className="font-mono text-xs text-foreground/30 w-8 flex-shrink-0">
        {project.number}
      </span>
      <span
        className="flex-1 text-2xl md:text-3xl font-semibold tracking-tight"
        style={{ fontFamily: "inherit" }}
      >
        {project.name}
      </span>
      <span className="sm:ml-auto font-mono text-xs tracking-widest uppercase text-foreground/40 sm:w-56 text-left sm:text-right">
        {category}
      </span>
      <span className="font-mono text-xs text-foreground/30 sm:ml-8 sm:w-12 text-left sm:text-right">
        {year}
      </span>
    </motion.li>
  );
}

function ProjectCard({ project, index, reducedMotion }) {
  const navigate = useNavigate();
  const year = project.status.includes('·') ? project.status.split('·')[1].trim() : 'Present';
  const category = project.stack && project.stack.length > 0 ? project.stack[0] : 'Project';

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 24, scale: 0.98 }}
      animate={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? {} : { opacity: 0, y: -24, scale: 0.98 }}
      transition={{ delay: (index % 6) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/project/${project.id}`)}
      className="group cursor-pointer flex flex-col gap-4"
      tabIndex={0}
      role="link"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/project/${project.id}`);
        }
      }}
    >
      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted border border-border/50 relative">
        {project.screenshot ? (
          <img 
            src={project.screenshot} 
            alt={project.name} 
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-border/20 flex items-center justify-center font-mono text-foreground/30 text-xs">No image</div>
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">{project.name}</h3>
          <span className="font-mono text-xs text-foreground/30">{year}</span>
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/40">{category}</span>
      </div>
    </motion.div>
  );
}

const WorkIndex = () => {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const [cursor, setCursor] = useState({ id: null, x: 0, y: 0 });
  const [filter, setFilter] = useState('All'); // 'All' | 'Mobile' | 'Web'
  const [layout, setLayout] = useState('list'); // 'list' | 'grid'

  const activeProject = projects.find((p) => p.id === cursor.id);

  const handleHover = useCallback((id, x, y) => setCursor({ id, x, y }), []);
  const handleLeave = useCallback(() => setCursor({ id: null, x: 0, y: 0 }), []);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => {
      const hasFlutter = p.stack.some(s => s.toLowerCase().includes('flutter') || s.toLowerCase().includes('dart'));
      if (filter === 'Mobile') return hasFlutter;
      if (filter === 'Web') return !hasFlutter; // Assume if not Flutter, it's web (React, Node, TS)
      return true;
    });
  }, [filter]);

  return (
    <section id="work" className="px-6 md:px-12 py-24 max-w-[1800px] mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-border pb-6 gap-6 md:gap-0">
        <div className="flex flex-col gap-2">
          <h2 className="font-mono text-xs tracking-widest uppercase text-foreground/40">
            Selected work
          </h2>
          <span className="font-mono text-xs text-foreground/30">{filteredProjects.length} projects</span>
        </div>

        <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-end">
          {/* Filters */}
          <div className="flex items-center gap-4 border border-border/50 rounded-full px-3 py-1.5 bg-card/50 backdrop-blur-sm">
            {['All', 'Mobile', 'Web'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full transition-colors ${filter === f ? 'bg-foreground text-background' : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center gap-2 border border-border/50 rounded-full px-2 py-1.5 bg-card/50 backdrop-blur-sm hidden sm:flex">
            <button
              onClick={() => setLayout('list')}
              className={`p-1.5 rounded-full transition-colors ${layout === 'list' ? 'bg-foreground text-background' : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'}`}
              aria-label="List view"
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded-full transition-colors ${layout === 'grid' ? 'bg-foreground text-background' : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'}`}
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[50vh]">
        <AnimatePresence mode="wait">
          {layout === 'list' ? (
            <motion.ul 
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              role="list" 
              className="relative"
            >
              {filteredProjects.map((project, i) => (
                <ProjectRow
                  key={`list-${project.id}`}
                  project={project}
                  index={i}
                  onHover={handleHover}
                  onLeave={handleLeave}
                  active={cursor.id === project.id}
                  reducedMotion={reducedMotion}
                />
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={`grid-${project.id}`}
                  project={project}
                  index={i}
                  reducedMotion={reducedMotion}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center font-mono text-sm text-foreground/40 uppercase tracking-widest">
            No projects found.
          </div>
        )}
      </div>

      {/* Floating preview — fine pointer only */}
      {finePointer && !reducedMotion && activeProject && activeProject.screenshot && layout === 'list' && (
        <div
          className="pointer-events-none fixed z-40 w-72 h-44 overflow-hidden rounded shadow-2xl transition-opacity duration-200"
          style={{
            left: cursor.x + 24,
            top: cursor.y - 88,
            opacity: cursor.id ? 1 : 0,
          }}
          aria-hidden="true"
        >
          <img
            src={activeProject.screenshot}
            alt=""
            width={288}
            height={176}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </section>
  );
};

export default WorkIndex;
