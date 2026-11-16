import profileImg from '../assets/profile.webp';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const TIMELINE = [
  { year: '2025', role: 'Software Engineer', org: 'Freelance' },
  { year: '2024', role: 'Industrial Attaché', org: 'KPLC' },
  { year: '2023', role: 'Developer', org: 'Daystar University' },
];

const About = () => {
  return (
    <section id="about" className="border-t border-border py-16 md:py-28">
      <div className="container-page">
        <SectionHeader title="About" />

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal as="p" className="font-serif text-4xl leading-[1.05] md:text-6xl">
              I design, build and ship complete products on my own, from the first screen to the
              database.
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              I specialize in full-stack development with a strong focus on mobile (Flutter) and
              web (React).
            </Reveal>

            <ul className="mt-12 max-w-xl border-t border-border">
              {TIMELINE.map((item) => (
                <li key={item.year} className="flex items-baseline gap-4 border-b border-border py-3">
                  <span className="label w-10 tabular-nums">{item.year}</span>
                  <span className="text-sm">{item.role}</span>
                  <span className="ml-auto text-right text-sm text-muted">{item.org}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal>
              <img
                src={profileImg}
                alt="Portrait of Derrick Macharia"
                width={626}
                height={893}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-sm object-cover grayscale"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
