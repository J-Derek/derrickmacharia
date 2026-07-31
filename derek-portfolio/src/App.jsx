import React, { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(
    () => !sessionStorage.getItem('portfolio-visited')
  );

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('portfolio-visited', '1');
    setIsLoading(false);
  };

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
        <div className="fixed inset-0 z-0 pointer-events-auto">
          <DotGridBackground dotColor="var(--foreground)" dotSize={2} dotSpacing={32} />
        </div>
        <ScrollIndicator />
        <Navbar />
        
        <main className="min-h-screen relative z-10">
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

