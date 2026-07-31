const SOCIALS = [
  { label: "GitHub", href: "https://github.com/J-Derek" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

const Footer = () => {
  return (
    <footer className="px-6 md:px-12 py-8 border-t border-border bg-background relative z-10">
      <div className="max-w-[1800px] mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono text-xs text-foreground/30">
          &copy; {new Date().getFullYear()} Derrick Macharia
        </p>
        <nav aria-label="Social links" className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
