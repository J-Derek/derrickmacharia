import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { PROJECTS, Project } from "../data/projects";
import { useFinePointer, useReducedMotion } from "../hooks/use-preferences";

function ProjectRow({
  project,
  index,
  onHover,
  onLeave,
  active,
  reducedMotion,
}: {
  project: Project;
  index: number;
  onHover: (id: number, x: number, y: number) => void;
  onLeave: () => void;
  active: boolean;
  reducedMotion: boolean;
}) {
  const finePointer = useFinePointer();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (finePointer) onHover(project.id, e.clientX, e.clientY);
    },
    [finePointer, onHover, project.id]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (project.url) window.open(project.url, "_blank");
    }
  };

  return (
    <motion.li
      initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 py-6 border-b border-border cursor-pointer transition-colors ${active ? "text-foreground" : "text-foreground/60 hover:text-foreground"}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={onLeave}
      onFocus={() => finePointer && onHover(project.id, 0, 0)}
      onBlur={onLeave}
      tabIndex={0}
      role="article"
      aria-label={`${project.title} — ${project.category}, ${project.year}`}
      onKeyDown={handleKeyDown}
    >
      <span className="font-mono text-xs text-foreground/30 w-8 flex-shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className="flex-1 text-2xl md:text-3xl font-semibold tracking-tight"
        style={{ fontFamily: "inherit" }}
      >
        {project.title}
      </span>
      <span className="sm:ml-auto font-mono text-xs tracking-widest uppercase text-foreground/40 sm:w-56 text-left sm:text-right">
        {project.category}
      </span>
      <span className="font-mono text-xs text-foreground/30 sm:ml-8 sm:w-12 text-left sm:text-right">
        {project.year}
      </span>
    </motion.li>
  );
}

export function WorkIndex() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const [cursor, setCursor] = useState<{ id: number | null; x: number; y: number }>({
    id: null,
    x: 0,
    y: 0,
  });

  const activeProject = PROJECTS.find((p) => p.id === cursor.id);

  const handleHover = useCallback((id: number, x: number, y: number) => {
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
        <span className="font-mono text-xs text-foreground/30">{PROJECTS.length} projects</span>
      </div>

      <ul role="list" className="relative">
        {PROJECTS.map((project, i) => (
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
      {finePointer && !reducedMotion && activeProject && (
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
            src={activeProject.image}
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
}
