import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, getMeta } from '../data/projects';
import { useFinePointer } from '../hooks/usePreferences';
import SectionHeader from './SectionHeader';

const FILTERS = ['All', 'Mobile', 'Web'];
const PREVIEW = { width: 320, height: 200 };

const isMobileProject = (project) => project.stack.some((s) => /flutter|dart/i.test(s));

function ProjectRow({ project, onHover, onLeave }) {
  const { state, year, category } = getMeta(project);

  return (
    <li
      className="border-b border-border"
      onMouseMove={(e) => onHover(project.id, e.clientX, e.clientY)}
      onMouseLeave={onLeave}
    >
      <Link
        to={`/project/${project.id}`}
        className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-6 md:grid-cols-[3rem_1fr_10rem_8rem_1.5rem] md:py-8"
      >
        <span className="label tabular-nums">{project.number}</span>
        <span className="font-serif text-3xl leading-tight transition-transform duration-300 ease-(--ease-out-soft) group-hover:translate-x-2 md:text-5xl">
          {project.name}
        </span>
        <span className="label col-start-2 md:col-start-auto md:text-right">{category}</span>
        <span className="label col-start-3 row-start-1 tabular-nums md:col-start-auto md:row-start-auto md:text-right">
          {state === 'Pilot' || state === 'Prototype' ? `${state} ${year}` : year}
        </span>
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="hidden self-center text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
        />
      </Link>
    </li>
  );
}

const WorkIndex = () => {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const [filter, setFilter] = useState('All');
  const [cursor, setCursor] = useState({ id: null, x: 0, y: 0 });

  const handleHover = useCallback((id, x, y) => setCursor({ id, x, y }), []);
  const handleLeave = useCallback(() => setCursor({ id: null, x: 0, y: 0 }), []);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => (filter === 'Mobile' ? isMobileProject(p) : !isMobileProject(p)));
  }, [filter]);

  const activeProject = projects.find((p) => p.id === cursor.id);
  const showPreview = finePointer && !reducedMotion && activeProject?.screenshot;

  return (
    <section id="work" className="border-t border-border py-16 md:py-28">
      <div className="container-page">
        <SectionHeader title="Selected work">
          <div className="flex items-baseline gap-6">
            <div role="group" aria-label="Filter projects" className="flex items-baseline gap-5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`border-b pb-1 text-sm transition-colors ${
                    filter === f
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <span className="label tabular-nums" aria-live="polite">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
        </SectionHeader>

        <ul className="border-t border-border">
          {filteredProjects.map((project) => (
            <ProjectRow key={project.id} project={project} onHover={handleHover} onLeave={handleLeave} />
          ))}
        </ul>
      </div>

      {showPreview && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-40 overflow-hidden rounded-sm border border-border bg-card"
          style={{
            width: PREVIEW.width,
            height: PREVIEW.height,
            left: Math.min(cursor.x + 24, window.innerWidth - PREVIEW.width - 16),
            top: Math.max(80, Math.min(cursor.y - PREVIEW.height / 2, window.innerHeight - PREVIEW.height - 16)),
          }}
        >
          <img src={activeProject.screenshot} alt="" className="h-full w-full object-cover object-top" />
        </div>
      )}
    </section>
  );
};

export default WorkIndex;
