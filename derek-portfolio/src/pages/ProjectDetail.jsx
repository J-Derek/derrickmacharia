import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, getMeta } from '../data/projects';
import Reveal from '../components/Reveal';

const pad = (n) => String(n).padStart(2, '0');

const MetaCell = ({ label, children }) => (
  <div>
    <dt className="label mb-2">{label}</dt>
    <dd className="text-base">{children}</dd>
  </div>
);

const Block = ({ title, children }) => (
  <Reveal className="grid grid-cols-1 gap-4 border-t border-border py-12 md:grid-cols-12 md:gap-8 md:py-16">
    <h2 className="label md:col-span-3">{title}</h2>
    <div className="md:col-span-8 md:col-start-5">{children}</div>
  </Reveal>
);

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="link-underline inline-flex items-center gap-1"
  >
    {children} <ArrowUpRight size={14} aria-hidden="true" />
  </a>
);

const ProjectDetail = () => {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.id === slug);
  const project = projects[index];

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const { state, year } = getMeta(project);
  const chevron =
    'flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground';

  return (
    <article className="container-page pt-28 pb-24">
      <Helmet>
        <title>{project.name} | Derrick Macharia</title>
        <meta name="description" content={project.tagline || project.problem} />
      </Helmet>

      <div className="flex items-center justify-between gap-4">
        <Link to="/#work" className="link-underline inline-flex items-center gap-2 text-sm">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>

        <div className="flex items-center gap-1">
          <Link to={`/project/${prev.id}`} aria-label={`Previous project: ${prev.name}`} className={chevron}>
            <ChevronLeft size={16} aria-hidden="true" />
          </Link>
          <span className="label tabular-nums">
            {pad(index + 1)} / {pad(projects.length)}
          </span>
          <Link to={`/project/${next.id}`} aria-label={`Next project: ${next.name}`} className={chevron}>
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <header className="pt-16 pb-12 md:pt-24 md:pb-16">
        <h1
          className="font-serif leading-[0.95] tracking-[-0.01em] break-words"
          style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
        >
          {project.name}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          {project.tagline || project.problem}
        </p>
      </header>

      <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-y border-border py-8 md:grid-cols-4">
        <MetaCell label="Role">Solo developer</MetaCell>
        <MetaCell label="Status">{[state, year].filter(Boolean).join(', ')}</MetaCell>
        <MetaCell label="Stack">{project.stack.join(', ')}</MetaCell>
        {(project.live || project.github) && (
          <MetaCell label="Links">
            <span className="flex flex-wrap gap-x-5 gap-y-1">
              {project.live && <ExternalLink href={project.live}>Live site</ExternalLink>}
              {project.github && <ExternalLink href={project.github}>Source</ExternalLink>}
            </span>
          </MetaCell>
        )}
      </dl>

      {project.screenshot ? (
        <Reveal className="my-12 flex justify-center overflow-hidden rounded-sm border border-border bg-card md:my-20">
          <img
            src={project.screenshot}
            alt={`Screenshot of ${project.name}`}
            className="h-auto max-h-[80svh] w-auto max-w-full"
          />
        </Reveal>
      ) : project.logo ? (
        <Reveal className="my-12 flex aspect-[16/7] flex-col items-center justify-center gap-5 rounded-sm bg-card md:my-20">
          <img
            src={project.logo}
            alt={`${project.name} logo`}
            width={96}
            height={96}
            className="h-24 w-24 rounded-2xl object-cover"
          />
          <span className="label">{project.name}</span>
        </Reveal>
      ) : (
        <div className="h-12 md:h-20" />
      )}

      <Block title="The challenge">
        <p className="text-xl leading-relaxed">{project.problem}</p>
      </Block>

      <Block title="The solution">
        <p className="text-xl leading-relaxed">{project.solution}</p>
      </Block>

      <Block title="Features">
        <ol className="border-t border-border">
          {project.features.map((feature, i) => (
            <li key={feature} className="flex gap-6 border-b border-border py-5">
              <span className="label w-6 shrink-0 pt-1 tabular-nums">{pad(i + 1)}</span>
              <span className="text-base leading-relaxed">{feature}</span>
            </li>
          ))}
        </ol>
      </Block>

      <nav aria-label="More projects" className="border-t border-border pt-12 md:pt-16">
        <Link to={`/project/${prev.id}`} className="link-underline text-sm text-muted hover:text-foreground">
          Previous: {prev.name}
        </Link>

        <Link to={`/project/${next.id}`} className="group mt-12 block">
          <span className="label">Next project</span>
          <span
            className="mt-3 flex items-baseline gap-4 font-serif leading-[0.95] break-words"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 7rem)' }}
          >
            <span className="transition-transform duration-300 ease-(--ease-out-soft) group-hover:translate-x-2">
              {next.name}
            </span>
          </span>
          <span className="mt-4 block max-w-xl text-muted">{next.tagline}</span>
        </Link>
      </nav>
    </article>
  );
};

export default ProjectDetail;
