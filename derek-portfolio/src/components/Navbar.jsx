import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SECTIONS = ['Work', 'About', 'Stack', 'Contact'];

const readTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(readTheme);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const navLinks = SECTIONS.map((name) => {
    const id = name.toLowerCase();
    return { name, id, href: isHome ? `#${id}` : `/#${id}` };
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0e0e0d' : '#f7f7f5');
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable */
    }
  };

  // Lock page scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  // Close the menu if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => e.matches && setMobileOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleSectionClick = (e, id) => {
    setMobileOpen(false);
    if (!isHome) return; // the router navigates to /#id and ScrollToTop handles it
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      // Let the menu's scroll lock release before scrolling
      requestAnimationFrame(() => target.scrollIntoView());
    }
  };

  const handleHomeClick = (e) => {
    setMobileOpen(false);
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0 });
    }
  };

  const themeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  const iconButton =
    'flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-background/85 backdrop-blur">
        <div className="container-page flex h-full items-center justify-between gap-6">
          <Link to="/" onClick={handleHomeClick} className="font-serif text-xl leading-none">
            Derrick Macharia
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.href}
                onClick={(e) => handleSectionClick(e, link.id)}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://github.com/J-Derek"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/DerrickMachariaCV.pdf"
              download
              className="mr-2 hidden rounded-full border border-foreground/40 px-4 py-1.5 text-sm transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground md:inline-flex"
            >
              Resume
            </a>
            <button type="button" onClick={toggleTheme} aria-label={themeLabel} className={iconButton}>
              {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              className={`${iconButton} md:hidden`}
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-background"
          >
            <div className="container-page flex h-16 shrink-0 items-center justify-between border-b border-border">
              <span className="font-serif text-xl leading-none">Derrick Macharia</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                autoFocus
                className={iconButton}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={(e) => handleSectionClick(e, link.id)}
                  className="self-start font-serif text-5xl leading-tight"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://github.com/J-Derek"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start font-serif text-5xl leading-tight"
              >
                GitHub
              </a>
            </nav>

            <div className="container-page shrink-0 border-t border-border py-6">
              <a
                href="/DerrickMachariaCV.pdf"
                download
                className="inline-flex rounded-full border border-border px-5 py-2.5 text-sm"
              >
                Download resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
