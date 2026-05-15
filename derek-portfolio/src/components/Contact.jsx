import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, MessageSquare, Phone } from 'lucide-react';

const GithubIcon = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "derrickmacharia2022@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 md:py-56 bg-bg-secondary relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-accent-dim rounded-full blur-[160px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="font-mono text-sm tracking-widest text-accent uppercase block mb-8">
            05 // Get in touch
          </span>
          <h2 className="font-display text-[clamp(48px,9vw,110px)] leading-[0.9] font-bold text-text-primary mb-12 tracking-tighter">
            Let's build<br />
            <span className="text-accent">something.</span>
          </h2>

          <p className="text-xl md:text-2xl text-text-secondary mb-20 max-w-2xl mx-auto leading-relaxed">
            Available for freelance projects, product builds, and innovative software teams. Based in Nairobi — working with clients everywhere.
          </p>

          <div className="mb-24">
            <button
              onClick={handleCopy}
              className="group flex flex-col md:flex-row items-center justify-center gap-6 mx-auto cursor-none"
            >
              <span className="font-display text-2xl md:text-5xl text-text-primary group-hover:text-accent transition-colors duration-500 relative">
                {email}
                <span className="absolute -bottom-3 left-0 w-full h-[2px] bg-accent origin-right scale-x-0 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100"></span>
              </span>
              <div className="p-4 rounded-full bg-bg-elevated border border-border text-text-primary group-hover:bg-accent group-hover:border-accent group-hover:text-bg-primary transition-all duration-500 shadow-xl">
                {copied ? <Check size={28} /> : <Copy size={28} />}
              </div>
            </button>
            <AnimatePresence>
              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-accent font-mono text-sm mt-8 uppercase tracking-widest"
                >
                  Copied to clipboard!
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {[
              { name: 'GitHub', icon: <GithubIcon size={22} />, url: 'https://github.com/J-Derek' },
              { name: 'WhatsApp', icon: <MessageSquare size={22} />, url: 'https://wa.me/254735319205' },
              { name: 'Schedule Call', icon: <Phone size={22} />, url: 'tel:+254735319205' }
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all duration-300 group"
              >
                <span className="text-accent/50 group-hover:text-accent transition-colors">
                  {link.icon}
                </span>
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
