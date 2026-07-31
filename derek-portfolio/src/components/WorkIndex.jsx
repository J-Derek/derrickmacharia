import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { useFinePointer } from "../hooks/usePreferences";
import { useReducedMotion } from "framer-motion";

function ProjectRow({
  project,
  index,
  onHover,
  onLeave,
  active,
  reducedMotion,
}) {
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

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  const year = project.status.includes('·') ? project.status.split('·')[1].trim() : 'Present';
  const category = project.stack && project.stack.length > 0 ? project.stack[0] : 'Project';

  return (
    <motion.li
      initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: (index % 5) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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

const WorkIndex = () => {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const [cursor, setCursor] = useState({
    id: null,
    x: 0,
    y: 0,
  });

  const activeProject = projects.find((p) => p.id === cursor.id);

  const handleHover = useCallback((id, x, y) => {
    setCursor({ id, x, y });
  }, []);

  const handleLeave = useCallback(() => {
    setCursor({ id: null, x: 0, y: 0 });
  }, []);

  return (
    <section id="work" className="px-6 md:px-12 py-24 max-w-[1800px] mx-auto w-full">
      <div className="flex items-end justify-between mb-12 border-b border-border pb-4">
        <h2 className="font-mono text-xs tracking-widest uppercase text-foreground/40">
          Selected work
        </h2>
        <span className="font-mono text-xs text-foreground/30">{projects.length} projects</span>
      </div>

      <ul role="list" className="relative">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            onHover={handleHover}
            onLeave={handleLeave}
            active={cursor.id === project.id}
            reducedMotion={reducedMotion}
          />
        ))}
      </ul>

      {/* Floating preview — fine pointer only */}
      {finePointer && !reducedMotion && activeProject && activeProject.screenshot && (
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
