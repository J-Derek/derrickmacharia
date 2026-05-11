const Footer = () => {
  return (
    <footer className="py-8 border-t border-border mt-24">
      <div className="container mx-auto px-6 text-center">
        <p className="text-text-muted text-sm font-mono tracking-widest uppercase">
          Designed & built by Derek Macharia &middot; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
