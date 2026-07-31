import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const lenis = useLenis();

  const isHome = location.pathname === '/';

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navLinks = [
    { name: 'Work', href: isHome ? '#work' : '/#work' },
    { name: 'About', href: isHome ? '#about' : '/#about' },
    { name: 'Stack', href: isHome ? '#stack' : '/#stack' },
    { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  const handleLinkClick = (e, href) => {
    const isHash = href.startsWith('#') || href.startsWith('/#');
    if (isHash) {
      const id = href.replace('/#', '#').replace('#', '');
      if (isHome) {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element && lenis) {
          lenis.scrollTo(element, { 
            offset: -80, // Offset by fixed sticky header height
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    }
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-border bg-background/80 backdrop-blur-md">
        <Link
          to="/"
          onClick={(e) => {
            setMobileOpen(false);
            if (isHome && lenis) {
              e.preventDefault();
              lenis.scrollTo(0, {
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              });
            }
          }}
          className="font-mono text-sm tracking-widest uppercase text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          DM
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-sans text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <span className="font-mono text-sm tracking-widest uppercase text-foreground">DM</span>
              <button
                onClick={closeMobile}
                aria-label="Close menu"
                className="w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <X size={18} />
              </button>
            </div>
            <nav
              aria-label="Mobile primary"
              className="flex flex-col justify-center flex-1 px-8 gap-6"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-4xl font-sans font-semibold text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
