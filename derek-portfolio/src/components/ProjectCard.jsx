import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0;
  const ref = useRef(null);

  // Scroll parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group cursor-hover`}
    >
      {/* Visual / Mockup Side */}
      <div className="w-full lg:w-1/2">
        <Link to={`/projects/${project.id}`}>
          <div className="aspect-[4/3] rounded-2xl bg-bg-elevated border border-border overflow-hidden relative transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[var(--color-accent)] group-hover:shadow-[0_0_30px_var(--color-accent-dim)]">
            <motion.div 
              layoutId={`mockup-${project.id}`}
              className="absolute inset-0 flex items-center justify-center p-8 bg-bg-elevated"
            >
              {/* Abstract Mockup inside the layout component */}
              <motion.div 
                style={{ y }} 
                className="w-full h-full bg-bg-primary rounded-xl border border-border shadow-2xl relative overflow-hidden flex flex-col"
              >
                 <div className="h-8 border-b border-border bg-bg-elevated flex items-center px-4">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
                    </div>
                 </div>
                 <div className="flex-1 flex items-center justify-center bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]">
                    <span className="font-display text-4xl font-bold opacity-20" style={{ color: project.color }}>
                      {project.name}
                    </span>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </Link>
      </div>

      {/* Text Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="flex items-baseline gap-4 mb-6">
          <span className="font-mono text-2xl text-text-muted transition-colors duration-300 group-hover:text-accent">
            {project.number}
          </span>
          <div className="h-[1px] flex-grow bg-border"></div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-[10px] tracking-wider text-text-secondary uppercase border border-border/50 px-2.5 py-1 rounded-sm">
              {tech}
            </span>
          ))}
        </div>

        <h3 className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-4">
          {project.name}
        </h3>

        <p className="text-text-secondary text-lg mb-8 leading-relaxed italic border-l-2 pl-4 border-border">
          "{project.problem}"
        </p>

        <p className="text-text-primary mb-6 leading-relaxed">
          {project.solution}
        </p>

        <ul className="space-y-2 mb-10">
          {project.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
              <span className="text-accent mt-1 block h-1.5 w-1.5 rounded-full bg-accent shrink-0"></span>
              {feature}
            </li>
          ))}
          {project.features.length > 3 && (
            <li className="text-sm text-text-muted pl-4 italic">+ more features</li>
          )}
        </ul>

        <div className="flex items-center gap-6 mt-auto">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-text-primary hover:text-accent transition-colors"
            >
              GitHub <ArrowUpRight size={16} />
            </a>
          )}
          <Link
            to={`/projects/${project.id}`}
            className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-text-primary hover:text-accent transition-colors ml-auto group/btn"
          >
            Case Study <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    problem: PropTypes.string.isRequired,
    solution: PropTypes.string.isRequired,
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    github: PropTypes.string,
    color: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProjectCard;
