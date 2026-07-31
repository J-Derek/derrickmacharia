import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useDarkMode } from "../hooks/use-preferences";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { dark, toggle } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-border bg-background/80 backdrop-blur-md">
        <a
          href="#"
          className="font-mono text-sm tracking-widest uppercase text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          AM
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
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
              <span className="font-mono text-sm tracking-widest uppercase">AM</span>
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
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-4xl font-semibold text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
