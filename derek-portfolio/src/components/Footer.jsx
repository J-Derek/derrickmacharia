const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">&copy; {new Date().getFullYear()} Derrick Macharia</p>
        <p className="label">Nairobi, Kenya</p>
        <a
          href="https://github.com/J-Derek"
          target="_blank"
          rel="noopener noreferrer"
          className="label link-underline self-start hover:text-foreground sm:self-auto"
        >
          GitHub
        </a>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0 })}
          className="label link-underline self-start hover:text-foreground sm:self-auto"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
