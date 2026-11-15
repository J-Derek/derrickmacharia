import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the hash target after navigation, or to the top when there is no hash. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    // Wait a tick so the destination page has mounted and laid out
    const timer = setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
