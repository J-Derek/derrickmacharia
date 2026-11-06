import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { projects } from '../data/projects';
import Magnetic from '../components/Magnetic';

const GithubIcon = ({ size }) => <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;

const ProjectDetail = () => {
  const { slug } = useParams();
  const projectIndex = projects.findIndex(p => p.id === slug);
  const project = projects[projectIndex];

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <div className="min-h-screen pb-24">
      <Helmet>
        <title>{project.name} | Derrick Macharia</title>
        <meta name="description" content={project.tagline || project.problem} />
      </Helmet>

      {/* Back + prev/next (sits below the global navbar) */}
      <div className="max-w-[1800px] mx-auto w-full px-6 md:px-12 pt-24 flex items-center justify-between gap-4">
        <Magnetic>
          <Link
            to="/#work"
            className="flex items-center gap-2 bg-card border border-border px-5 py-2.5 rounded-full text-sm font-medium text-foreground hover:border-accent transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" /> All work
          </Link>
        </Magnetic>

        <div className="flex items-center bg-card border border-border rounded-full overflow-hidden">
          <Link
            to={`/project/${prevProject.id}`}
            aria-label={`Previous project: ${prevProject.name}`}
            className="flex items-center justify-center w-10 h-10 text-foreground/60 hover:text-accent-text hover:bg-accent/10 transition-colors"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </Link>
          <span className="px-2 font-mono text-[10px] tracking-widest text-foreground/60 tabular-nums">
            {String(projectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <Link
            to={`/project/${nextProject.id}`}
            aria-label={`Next project: ${nextProject.name}`}
            className="flex items-center justify-center w-10 h-10 text-foreground/60 hover:text-accent-text hover:bg-accent/10 transition-colors"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden">
        <div className="max-w-[1800px] mx-auto w-full px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-accent"></span>
                <span className="font-mono text-sm tracking-widest text-accent-text uppercase">{project.status.startsWith("In") ? "In Development" : "Case Study"}</span>
              </div>
              <h1 className="font-bold text-[clamp(44px,8vw,120px)] leading-[0.95] text-foreground tracking-tighter mb-8 break-words">
                {project.name}<span className="text-accent-text">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed max-w-2xl">
                {project.tagline || project.problem}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-8 mt-12 pt-12 border-t border-border"
            >
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-2">Role</span>
                <span className="text-foreground font-medium">Lead Developer</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-2">Stack</span>
                <span className="text-foreground font-medium">{project.stack.join(", ")}</span>
              </div>
              {project.github && (
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-2">Source</span>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-accent-text hover:underline flex items-center gap-1">
                    GitHub <GithubIcon size={14} />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Mockup / Visual — Screenshot or Logo Fallback */}
      <section className="max-w-[1800px] mx-auto w-full px-6 md:px-12 mb-24">
        <div
          className="aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl bg-card border border-border overflow-hidden relative flex items-center justify-center p-3 md:p-8"
        >
          {project.screenshot ? (
            /* Live project — show real screenshot inside a browser chrome frame */
            <div
              className="w-full h-full bg-background rounded-2xl border border-border shadow-2xl relative overflow-hidden flex flex-col"
            >
              {/* Browser chrome bar */}
              <div className="h-10 min-h-[40px] border-b border-border bg-card flex items-center px-6 shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                </div>
                {project.live && (
                  <div className="ml-6 flex-1 max-w-md">
                    <div className="bg-background/50 rounded-md px-3 py-1 text-[10px] font-mono text-foreground/60 truncate">
                      {project.live}
                    </div>
                  </div>
                )}
              </div>
              {/* Screenshot content */}
              <div className="flex-1 overflow-hidden relative">
                <img 
                  src={project.screenshot} 
                  alt={`${project.name} screenshot`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          ) : (
            /* No screenshot — fallback to logo + name */
            <div 
              className="w-full h-full bg-background rounded-2xl border border-border shadow-2xl relative overflow-hidden flex flex-col"
            >
              <div className="h-10 border-b border-border bg-card flex items-center px-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]">
                <div className="w-32 h-32 rounded-3xl flex items-center justify-center border border-border bg-card shadow-2xl overflow-hidden">
                  {project.logo ? (
                    <img src={project.logo} alt={`${project.name} logo`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-5xl font-bold" style={{ color: project.color }}>
                      {project.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span aria-hidden="true" className="font-sans text-3xl md:text-6xl font-bold opacity-10 uppercase tracking-widest text-center px-4">
                  {project.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project Content */}
      <section className="max-w-[1800px] mx-auto w-full px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-sans text-3xl font-semibold text-foreground mb-6">The Challenge</h3>
              <p className="text-lg text-foreground/60 leading-relaxed">
                {project.problem}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-sans text-3xl font-semibold text-foreground mb-6">The Solution</h3>
              <p className="text-lg text-foreground/60 leading-relaxed">
                {project.solution}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-sans text-3xl font-semibold text-foreground mb-6">Core Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.features.map((feature, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-mono text-xs mb-4">
                      {i + 1}
                    </div>
                    <p className="text-foreground font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h4 className="font-sans text-xl font-bold text-foreground mb-6">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span key={tech} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 bg-background border border-border text-foreground/60 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {project.live && (
                <a 
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-xl font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Live Preview <ExternalLink size={18} />
                </a>
              )}
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-card border border-border text-foreground px-8 py-4 rounded-xl font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  View Source <GithubIcon size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Previous / Next Project Footer */}
      <section className="mt-32 pt-32 border-t border-border max-w-[1800px] mx-auto w-full px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Previous Project */}
          <Link 
            to={`/project/${prevProject.id}`}
            className="group text-left"
          >
            <span className="font-mono text-sm tracking-widest text-foreground/50 uppercase block mb-4">
              ← Previous
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold break-words text-foreground group-hover:text-accent-text transition-colors duration-500">
              {prevProject.name}
            </h2>
            <p className="text-foreground/60 mt-3 text-sm line-clamp-2 max-w-md">
              {prevProject.tagline}
            </p>
          </Link>

          {/* Next Project */}
          <Link 
            to={`/project/${nextProject.id}`}
            className="group text-left md:text-right"
          >
            <span className="font-mono text-sm tracking-widest text-foreground/50 uppercase block mb-4">
              Next →
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold break-words text-foreground group-hover:text-accent-text transition-colors duration-500">
              {nextProject.name}
            </h2>
            <p className="text-foreground/60 mt-3 text-sm line-clamp-2 max-w-md md:ml-auto">
              {nextProject.tagline}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
