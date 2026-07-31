import React, { useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { MotionConfig, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollIndicator from './components/ScrollIndicator';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

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
        <CustomCursor />
        <ScrollIndicator />
        <Navbar />
        <main className="min-h-screen">
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
