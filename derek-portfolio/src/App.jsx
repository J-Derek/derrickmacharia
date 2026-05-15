import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { MotionConfig, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollIndicator from './components/ScrollIndicator';

function App() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <ReactLenis root>
      <MotionConfig reducedMotion="user">
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
