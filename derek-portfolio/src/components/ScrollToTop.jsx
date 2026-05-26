import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // If a hash exists in the destination URL (e.g. from cross-page or same-page link click)
    if (hash) {
      // Small timeout to guarantee components have mounted and layout has computed coordinates
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { 
              offset: -80, // Account for fixed sticky header height
              duration: 1.2, 
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium expo-out curve
            });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);

      return () => clearTimeout(timer);
    } else {
      // Otherwise scroll to top immediately
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash, lenis]);

  return null;
};

export default ScrollToTop;
