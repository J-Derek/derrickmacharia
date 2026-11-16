import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import Reveal from './Reveal';

const Hero = () => {
  const scrollTo = (id) => (e) => {
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView();
    }
  };

  return (
    <section className="flex flex-col justify-end pt-28 pb-10 md:min-h-[100svh] md:pt-32">
      <div className="container-page">
        <Reveal>
          <h1
            className="font-serif leading-[0.95] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(4rem, 12vw, 8.5rem)' }}
          >
            Derrick
            <br />
            Macharia
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p className="text-lg leading-relaxed text-muted md:col-span-6 md:text-xl">
            Software developer in Nairobi, Kenya. I build mobile apps with Flutter and web apps
            with React, from the database to the interface.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:justify-self-end">
            <Link
              to="/#contact"
              onClick={scrollTo('contact')}
              className="rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Get in touch
            </Link>
            <Link
              to="/#work"
              onClick={scrollTo('work')}
              className="link-underline inline-flex items-center gap-2 text-lg"
            >
              View work <ArrowDown size={18} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 md:mt-24"
        >
          <span className="label flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden="true" />
            Open for work
          </span>
          <span className="label">Flutter · React · Node</span>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
