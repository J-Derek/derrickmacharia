import profileImg from '../assets/profile.jpeg';
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const TIMELINE = [
  { year: "2025", role: "Software Engineer", org: "Freelance" },
  { year: "2024", role: "Industrial Attaché", org: "KPLC" },
  { year: "2023", role: "Developer", org: "Daystar University" },
];

const About = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="px-6 md:px-12 py-24 border-t border-border">
      <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Label */}
        <div className="md:col-span-2">
          <h2 className="font-mono text-xs tracking-widest uppercase text-foreground/40">
            About
          </h2>
        </div>

        {/* Bio */}
        <div className="md:col-span-5">
          <motion.p
            initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-semibold leading-snug tracking-tight text-foreground"
          >
            Building products that bridge the gap between complex engineering
            and beautiful, intuitive design.
          </motion.p>

          <motion.p
            initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-foreground/60 leading-relaxed"
          >
            I specialize in full-stack development with a strong focus on mobile (Flutter)
            and web (React). Whether I’m designing a database schema or polishing an
            animation curve, I care deeply about the millimeter details that separate
            good from excellent.
          </motion.p>
        </div>

        {/* Portrait placeholder + timeline */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="overflow-hidden rounded bg-foreground/5 aspect-[4/3]">
            <img
              src={profileImg} alt="Derrick Macharia"
              width={600}
              height={450}
              loading="lazy"
              className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity"
            />
          </div>

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={reducedMotion ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 py-3 border-b border-border last:border-0"
              >
                <span className="font-mono text-xs text-foreground/30 w-10">{item.year}</span>
                <span className="text-sm text-foreground">{item.role}</span>
                <span className="ml-auto font-mono text-xs text-foreground/40">{item.org}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
