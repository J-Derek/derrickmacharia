import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const lenis = useLenis();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for highlighting active section
  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const sections = ['work', 'about', 'skills', 'experience', 'contact'];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'skills' || id === 'experience' || id === 'about') {
            setActiveSection('about');
          } else {
            setActiveSection(id);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section is prominent in center viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Work', href: isHome ? '#work' : '/#work' },
    { name: 'About', href: isHome ? '#about' : '/#about' },
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
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-bg-primary/80 backdrop-blur-xl' : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-display font-bold text-accent tracking-tighter" 
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (isHome && lenis) {
                e.preventDefault();
                lenis.scrollTo(0, {
                  duration: 1.2,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              }
            }}
          >
            DM
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`transition-all duration-300 text-sm font-medium tracking-wide uppercase relative py-1 ${
                    isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-bg-elevated/50 text-text-primary hover:text-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              to={isHome ? '#contact' : '/#contact'}
              onClick={(e) => handleLinkClick(e, isHome ? '#contact' : '/#contact')}
              className="px-5 py-2 rounded-full bg-accent text-bg-primary font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Hire Me
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-bg-primary flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 left-6 p-2.5 rounded-full bg-bg-elevated/50 text-text-primary hover:text-accent transition-colors"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              className="absolute top-6 right-6 text-text-primary"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-4xl font-display font-medium text-text-primary hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to={isHome ? '#contact' : '/#contact'}
                onClick={(e) => handleLinkClick(e, isHome ? '#contact' : '/#contact')}
                className="mt-8 px-8 py-4 rounded-full bg-accent text-bg-primary font-medium text-xl w-full text-center"
              >
                Hire Me
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
