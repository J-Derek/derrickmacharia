import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { useFinePointer } from "../hooks/usePreferences";
import { useReducedMotion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";

function getMeta(project) {
  const year = project.status.includes('·') ? project.status.split('·')[1].trim() : 'In dev';
  const category = project.stack && project.stack.length > 0 ? project.stack[0] : 'Project';
  return { year, category };
}

function ProjectRow({ project, index, onHover, onLeave, active, reducedMotion }) {
  const finePointer = useFinePointer();
  const { year, category } = getMeta(project);

  const handleMouseMove = useCallback(
    (e) => {
      if (finePointer) onHover(project.id, e.clientX, e.clientY);
    },
    [finePointer, onHover, project.id]
  );

  return (
    <motion.li
      initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
      exit={reducedMotion ? {} : { opacity: 0, y: -16 }}
      transition={{ delay: (index % 5) * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={onLeave}
      className="border-b border-border"
    >
      <Link
        to={`/project/${project.id}`}
        onBlur={onLeave}
        aria-label={`${project.name} — ${category}, ${year}`}
        className={`group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 py-6 transition-colors ${active ? "text-foreground" : "text-foreground/60 hover:text-foreground focus-visible:text-foreground"}`}
      >
        <span className="font-mono text-xs text-foreground/40 w-8 flex-shrink-0">
          {project.number}
        </span>
        <span className="flex-1 text-2xl md:text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2">
          {project.name}
        </span>
        <span className="sm:ml-auto font-mono text-xs tracking-widest uppercase text-foreground/50 sm:w-56 text-left sm:text-right">
          {category}
        </span>
        <span className="font-mono text-xs text-foreground/40 sm:ml-8 sm:w-16 text-left sm:text-right">
          {year}
        </span>
      </Link>
    </motion.li>
  );
}

function ProjectCard({ project, index, reducedMotion }) {
  const { year, category } = getMeta(project);

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 24, scale: 0.98 }}
      animate={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? {} : { opacity: 0, y: -24, scale: 0.98 }}
      transition={{ delay: (index % 6) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/project/${project.id}`} className="group flex flex-col gap-4 rounded-lg">
        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-card border border-border relative">
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt=""
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              loading="lazy"
            />
          ) : project.logo ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-3">
              <img
                src={project.logo}
                alt=""
                loading="lazy"
                className="w-16 h-16 object-contain rounded-xl opacity-90 group-hover:scale-105 transition-transform"
              />
              <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/50">{project.name}</span>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-foreground/40 text-xs">
              {project.name}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-accent-text transition-colors">
              {project.name}
            </h3>
            <span className="font-mono text-xs text-foreground/40 shrink-0">{year}</span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/50">{category}</span>
        </div>
      </Link>
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
    return projects.filter((p) => {
      const isMobile = p.stack.some((s) => /flutter|dart/i.test(s));
      return filter === 'Mobile' ? isMobile : !isMobile;
    });
  }, [filter]);

  return (
    <section id="work" className="px-6 md:px-12 py-24 max-w-[1800px] mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-border pb-6 gap-6 md:gap-0">
        <div className="flex flex-col gap-2">
          <h2 className="font-mono text-xs tracking-widest uppercase text-foreground/40">
            Selected work
          </h2>
          <span className="font-mono text-xs text-foreground/40" aria-live="polite">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-end">
          {/* Filters */}
          <div role="group" aria-label="Filter projects" className="flex items-center gap-1 border border-border rounded-full px-2 py-1.5 bg-card/60 backdrop-blur-sm">
            {['All', 'Mobile', 'Web'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-colors ${filter === f ? 'bg-foreground text-background' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Layout Toggle */}
          <div role="group" aria-label="Layout" className="hidden sm:flex items-center gap-1 border border-border rounded-full px-2 py-1.5 bg-card/60 backdrop-blur-sm">
            <button
              onClick={() => setLayout('list')}
              className={`p-1.5 rounded-full transition-colors ${layout === 'list' ? 'bg-foreground text-background' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'}`}
              aria-label="List view"
              aria-pressed={layout === 'list'}
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded-full transition-colors ${layout === 'grid' ? 'bg-foreground text-background' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'}`}
              aria-label="Grid view"
              aria-pressed={layout === 'grid'}
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
          <div className="py-24 text-center font-mono text-sm text-foreground/50 uppercase tracking-widest">
            No projects found.
          </div>
        )}
      </div>

      {/* Floating preview — fine pointer only */}
      {finePointer && !reducedMotion && activeProject && activeProject.screenshot && layout === 'list' && (
        <div
          className="pointer-events-none fixed z-40 w-72 h-44 overflow-hidden rounded shadow-2xl transition-opacity duration-200"
          style={{
            left: Math.min(cursor.x + 24, window.innerWidth - 300),
            top: Math.max(80, Math.min(cursor.y - 88, window.innerHeight - 190)),
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
