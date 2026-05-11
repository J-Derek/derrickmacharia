import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

import ProjectCard from './ProjectCard';

const Projects = () => {
  return (
    <section id="work" className="py-24 md:py-32 bg-bg-primary">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-32"
        >
          <span className="font-mono text-sm tracking-widest text-accent uppercase block mb-4">
            Selected Work
          </span>
          <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[1.1] font-semibold text-text-primary max-w-2xl">
            Software built for the real world.
          </h2>
        </motion.div>

        <div className="space-y-32 md:space-y-48">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
