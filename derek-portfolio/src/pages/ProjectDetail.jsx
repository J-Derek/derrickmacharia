import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
const GithubIcon = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { slug } = useParams();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const projectIndex = projects.findIndex(p => p.id === slug);
  const project = projects[projectIndex];

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <>
      <Helmet>
        <title>{project.name} | Derek Macharia</title>
        <meta name="description" content={project.tagline} />
        <meta property="og:title" content={`${project.name} | Derek Macharia`} />
        <meta property="og:description" content={project.tagline} />
        <meta name="theme-color" content={project.color} />
      </Helmet>
      <article className="pt-32 pb-24 bg-bg-primary min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary font-mono text-sm uppercase tracking-widest mb-12 transition-colors cursor-hover">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xl text-accent">{project.number}</span>
            <div className="h-[1px] flex-grow bg-border"></div>
            <span className="font-mono text-sm text-text-muted">{project.year}</span>
          </div>

          <h1 className="font-display text-[clamp(48px,8vw,100px)] leading-[1.1] font-semibold text-text-primary mb-6" style={{ color: project.color }}>
            {project.name}
          </h1>

          <p className="text-2xl md:text-3xl text-text-secondary font-display leading-tight mb-8">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {project.stack.map(tech => (
              <span key={tech} className="font-mono text-sm px-4 py-2 rounded-full bg-bg-elevated text-text-primary border border-border">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-6">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-bg-elevated hover:bg-bg-secondary border border-border hover:border-accent text-text-primary transition-all cursor-hover">
                <GithubIcon size={18} /> <span className="font-medium text-sm">View Source</span>
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-bg-primary hover:bg-accent/90 transition-all font-medium text-sm cursor-hover">
                <ExternalLink size={18} /> <span>Live Preview</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          layoutId={`mockup-${project.id}`}
          className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl bg-bg-primary border border-border shadow-2xl relative flex flex-col overflow-hidden mb-24"
        >
           <div className="h-10 border-b border-border bg-bg-elevated flex items-center px-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-border"></div>
                <div className="w-3 h-3 rounded-full bg-border"></div>
                <div className="w-3 h-3 rounded-full bg-border"></div>
              </div>
           </div>
           <div className="flex-1 flex items-center justify-center bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]">
              <span className="font-display text-6xl md:text-8xl font-bold opacity-10" style={{ color: project.color }}>
                {project.name}
              </span>
           </div>
        </motion.div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32">
          {/* Left Column - Meta */}
          <div className="md:col-span-4 space-y-12">
            <div>
              <h3 className="font-mono text-sm tracking-widest text-text-muted uppercase mb-4">Role</h3>
              <p className="text-text-primary font-medium">Full Stack Developer</p>
            </div>
            <div>
              <h3 className="font-mono text-sm tracking-widest text-text-muted uppercase mb-4">Timeline</h3>
              <p className="text-text-primary font-medium">{project.year}</p>
            </div>
            <div>
              <h3 className="font-mono text-sm tracking-widest text-text-muted uppercase mb-4">Core Tech</h3>
              <ul className="space-y-2">
                {project.stack.slice(0, 4).map(t => (
                  <li key={t} className="text-text-primary font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }}></span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Narrative */}
          <div className="md:col-span-8 space-y-16">
            <section>
              <h2 className="font-display text-3xl font-semibold text-text-primary mb-6">The Problem</h2>
              <p className="text-lg text-text-secondary leading-relaxed border-l-2 border-border pl-6 py-2 italic">
                "{project.problem}"
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl font-semibold text-text-primary mb-6">The Solution</h2>
              <p className="text-lg text-text-primary leading-relaxed mb-8">
                {project.solution}
              </p>
              
              <h3 className="font-display text-xl font-medium text-text-primary mb-4">Key Features Implemented:</h3>
              <ul className="space-y-4">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-text-secondary bg-bg-elevated p-4 rounded-lg border border-border">
                    <span className="font-mono text-sm mt-0.5" style={{ color: project.color }}>0{i + 1}</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-3xl font-semibold text-text-primary mb-6">Lessons Learned</h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Building {project.name} reinforced the importance of understanding the end-user's operating environment. Real-world constraints often dictate technical decisions more than pure theory does.
              </p>
            </section>
          </div>
        </div>

        {/* Project Navigation */}
        <div className="max-w-4xl mx-auto border-t border-border pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          {prevProject ? (
            <Link to={`/projects/${prevProject.id}`} className="group flex flex-col items-center md:items-start text-center md:text-left cursor-hover">
              <span className="font-mono text-xs tracking-widest text-text-muted uppercase mb-2 flex items-center gap-2">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Prev Project
              </span>
              <span className="font-display text-2xl font-medium text-text-primary group-hover:text-accent transition-colors">
                {prevProject.name}
              </span>
            </Link>
          ) : <div></div>}

          {nextProject ? (
            <Link to={`/projects/${nextProject.id}`} className="group flex flex-col items-center md:items-end text-center md:text-right cursor-hover">
              <span className="font-mono text-xs tracking-widest text-text-muted uppercase mb-2 flex items-center gap-2">
                Next Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="font-display text-2xl font-medium text-text-primary group-hover:text-accent transition-colors">
                {nextProject.name}
              </span>
            </Link>
          ) : <div></div>}
        </div>
      </div>
    </article>
    </>
  );
};

export default ProjectDetail;
