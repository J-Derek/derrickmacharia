import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <Helmet>
        <title>404 — Page Not Found | Derrick Macharia</title>
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-6 text-accent">
          <Compass className="w-8 h-8" />
        </div>

        <span className="font-mono text-accent text-sm tracking-widest uppercase mb-2">Error 404</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
          Lost in Space
        </h1>
        <p className="text-text-muted text-base mb-8 leading-relaxed">
          The page or route you're looking for doesn't exist, has been moved, or is under construction.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium text-sm transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
