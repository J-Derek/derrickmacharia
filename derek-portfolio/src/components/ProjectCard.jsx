import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className="group relative"
    >
      <Link to={`/projects/${project.id}`} className="block border-b border-white/5 py-12 md:py-16 transition-colors duration-500 hover:bg-white/[0.02]">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-4 relative">
          
          {/* Project Name & Number */}
          <div className="col-span-1 md:col-span-4 flex items-baseline gap-4">
            <span className="hidden md:block font-mono text-[10px] text-text-muted group-hover:text-accent transition-colors">
              {project.number || `0${index + 1}`}
            </span>
            <h3 className="font-display text-[clamp(32px,4vw,56px)] leading-[0.9] font-bold text-text-primary tracking-tighter group-hover:text-accent transition-all duration-500 group-hover:translate-x-3">
              {project.name}
            </h3>
          </div>

          {/* Tagline / Outcome */}
          <div className="col-span-1 md:col-span-5 pr-8 md:pr-12">
            <p className="text-xl md:text-2xl text-text-muted leading-tight group-hover:text-text-primary transition-colors duration-500 line-clamp-2">
              {project.tagline || project.problem}
            </p>
          </div>

          {/* Technologies */}
          <div className="hidden md:block col-span-2">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {project.stack.slice(0, 2).map((tech) => (
                <span key={tech} className="font-mono text-[10px] uppercase tracking-widest text-text-muted group-hover:text-text-secondary transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action / Arrow */}
          <div className="col-span-1 md:col-span-1 flex justify-end">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 group-hover:bg-accent group-hover:border-accent group-hover:text-bg-primary transition-all duration-500">
              <ArrowUpRight 
                size={24} 
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
              />
            </div>
          </div>
          
          {/* Hover Line Background Decoration */}
          <motion.div 
            className="absolute -left-6 md:-left-12 top-0 bottom-0 w-1 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"
          />
        </div>
      </Link>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    problem: PropTypes.string.isRequired,
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
    color: PropTypes.string.isRequired,
    tagline: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
