import { useEffect } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, ExternalLink, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';
import Magnetic from '../components/Magnetic';

const GithubIcon = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const projectIndex = projects.findIndex(p => p.id === slug);
  const project = projects[projectIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <Helmet>
        <title>{project.name} | Derrick Macharia</title>
        <meta name="description" content={project.tagline || project.problem} />
      </Helmet>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <Magnetic>
          <button 
            onClick={() => navigate("/")}
            className="pointer-events-auto flex items-center gap-2 bg-bg-elevated/80 backdrop-blur-md border border-border px-5 py-2.5 rounded-full text-sm font-medium text-text-primary hover:border-accent/50 transition-all"
          >
            <ArrowLeft size={16} /> Back Home
          </button>
        </Magnetic>
        
        <div className="pointer-events-auto hidden md:flex items-center gap-2 bg-bg-elevated/80 backdrop-blur-md border border-border px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest text-text-muted">
          <Link to="/" className="hover:text-accent transition-colors">Work</Link>
          <ChevronRight size={12} />
          <span className="text-text-primary">{project.name}</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-accent"></span>
                <span className="font-mono text-sm tracking-widest text-accent uppercase">Case Study</span>
              </div>
              <h1 className="font-display text-[clamp(48px,8vw,120px)] leading-[0.9] font-bold text-text-primary tracking-tighter mb-8">
                {project.name}<span className="text-accent">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl">
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
                <span className="block font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">Role</span>
                <span className="text-text-primary font-medium">Lead Developer</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">Stack</span>
                <span className="text-text-primary font-medium">{project.stack.join(", ")}</span>
              </div>
              {project.github && (
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">Source</span>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                    GitHub <GithubIcon size={14} />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Mockup / Visual Transition */}
      <section className="container mx-auto px-6 md:px-12 mb-24">
        <motion.div 
          layoutId={`mockup-container-${project.id}`}
          className="aspect-[16/9] md:aspect-[21/9] rounded-3xl bg-bg-elevated border border-border overflow-hidden relative flex items-center justify-center p-8 md:p-16"
        >
          <motion.div 
            layoutId={`mockup-content-${project.id}`}
            className="w-full h-full bg-bg-primary rounded-2xl border border-border shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="h-10 border-b border-border bg-bg-elevated flex items-center px-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-border"></div>
                <div className="w-3 h-3 rounded-full bg-border"></div>
                <div className="w-3 h-3 rounded-full bg-border"></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]">
              <div className="w-32 h-32 rounded-3xl flex items-center justify-center border border-border bg-bg-elevated shadow-2xl overflow-hidden">
                {project.logo ? (
                  <img src={project.logo} alt={`${project.name} logo`} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-5xl font-bold" style={{ color: project.color }}>
                    {project.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="font-display text-4xl md:text-6xl font-bold opacity-10 uppercase tracking-widest">
                {project.name}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Project Content */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-3xl font-semibold text-text-primary mb-6">The Challenge</h3>
              <p className="text-lg text-text-secondary leading-relaxed">
                {project.problem}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-3xl font-semibold text-text-primary mb-6">The Solution</h3>
              <p className="text-lg text-text-secondary leading-relaxed">
                {project.solution}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-3xl font-semibold text-text-primary mb-6">Core Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.features.map((feature, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-bg-elevated border border-border hover:border-accent/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-mono text-xs mb-4">
                      {i + 1}
                    </div>
                    <p className="text-text-primary font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
            <div className="p-8 rounded-2xl bg-bg-elevated border border-border">
              <h4 className="font-display text-xl font-bold text-text-primary mb-6">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span key={tech} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 bg-bg-primary border border-border text-text-secondary rounded-md">
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
                  className="w-full flex items-center justify-center gap-3 bg-text-primary text-bg-primary px-8 py-4 rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Live Preview <ExternalLink size={18} />
                </a>
              )}
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-bg-elevated border border-border text-text-primary px-8 py-4 rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  View Source <GithubIcon size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="mt-32 pt-32 border-t border-border container mx-auto px-6 md:px-12 text-center">
        <span className="font-mono text-sm tracking-widest text-text-muted uppercase">Next Case Study</span>
        <Link 
          to={`/projects/${nextProject.id}`}
          className="group block mt-8"
        >
          <h2 className="font-display text-5xl md:text-8xl font-bold text-text-primary group-hover:text-accent transition-colors duration-500">
            {nextProject.name}
          </h2>
          <div className="flex justify-center mt-8">
            <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-bg-primary transition-all duration-500">
              <ArrowRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default ProjectDetail;
