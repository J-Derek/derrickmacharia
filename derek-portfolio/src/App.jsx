import { Outlet } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AmbientBackground from './components/AmbientBackground';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <AmbientBackground />
      <Navbar />
      <main id="main" className="relative z-10 min-h-screen">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
