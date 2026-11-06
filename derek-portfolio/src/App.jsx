import React, { useState, useCallback } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { MotionConfig, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import DotGridBackground from './components/DotGridBackground';

function App() {
  const location = useLocation();
  const element = useOutlet();

  // Only show preloader on first visit per browser session
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('portfolio-visited');
    } catch {
      return false;
    }
  });

  const handlePreloaderComplete = useCallback(() => {
    try {
      sessionStorage.setItem('portfolio-visited', '1');
    } catch {
      /* storage unavailable */
    }
    setIsLoading(false);
  }, []);

  return (
    <ReactLenis root>
      <MotionConfig reducedMotion="user">
        {/* Preloader sits on top of everything via z-[9999], exits with slide-up animation */}
        <AnimatePresence>
          {isLoading && (
            <Preloader key="preloader" onComplete={handlePreloaderComplete} />
          )}
        </AnimatePresence>

        {/* Main app — renders behind the preloader so content is ready on reveal */}
        <ScrollToTop />
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <DotGridBackground dotColor="var(--foreground)" dotSize={2} dotSpacing={32} />
        </div>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-accent focus:text-accent-foreground font-mono text-xs uppercase tracking-widest"
        >
          Skip to content
        </a>
        <ScrollIndicator />
        <Navbar />
        
        <main id="main" className="min-h-screen relative z-10">
          <AnimatePresence mode="wait">
            {element && React.cloneElement(element, { key: location.pathname })}
          </AnimatePresence>
        </main>
        
        <Footer />
      </MotionConfig>
    </ReactLenis>
  );
}

export default App;

