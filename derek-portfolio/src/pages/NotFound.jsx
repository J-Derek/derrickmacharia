import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
      <Helmet>
        <title>404 — Page Not Found | Derrick Macharia</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-6 text-accent-text">
          <Compass className="w-8 h-8" aria-hidden="true" />
        </div>

        <span className="font-mono text-accent-text text-xs tracking-widest uppercase mb-3">Error 404</span>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
          Page not found
        </h1>
        <p className="text-text-secondary text-base mb-8 leading-relaxed">
          The page you are looking for does not exist or has moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-mono text-xs tracking-widest uppercase transition-transform hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
